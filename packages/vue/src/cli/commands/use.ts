import packageJson from '$/package'
import registry from '$/registry'
import { PackageManager } from '$/utils/package-manager'
import { Command } from 'commander'
import { existsSync, promises as fs } from 'node:fs'
import $path from 'node:path'
import prompts from 'prompts'
import { z } from 'zod'

import { intro } from '$/program'
import type { ComponentMeta, ComponentName } from '$/registry'
import { default as cli, Terminal } from '$/services/cli'

export const name = 'use' as const
const DEFAULT_COMPONENTS_PATH = './src/components/ui'

const terminal = new Terminal()

export const optionsSchema = z.object({
  components: z
    .array(z.enum([...registry.components.map(c => c.name)] as [ComponentName, ...ComponentName[]]))
    .optional(),
  yes: z.boolean(),
  force: z.boolean(),
  path: z.string(),
  cwd: z.string(),
})

export const command = new Command()
  .name(name)
  .argument('[components...]', 'leave it empty to use all components or list the components to use')
  .option('-y, --yes', 'skip prompts', false)
  .option('-f, --force', 'override existing component files', false)
  .option('-p, --path <path>', 'specify the path to copy the files to', DEFAULT_COMPONENTS_PATH)
  .option(
    '-c, --cwd <cwd>',
    'the working directory. defaults to the current directory.',
    process.cwd(),
  )
  .action(async (components: ComponentName[], optionsRaw) => {
    const options = optionsSchema.parse({
      components,
      cwd: $path.resolve(optionsRaw.cwd),
      ...optionsRaw,
    })

    console.log(cli.highlight.magenta(intro))

    const packageManager = new PackageManager(options.cwd)

    if (!await terminal.showLoadingUntilDone(
      packageManager.installed(packageJson.name),
      `checking ${cli.highlight.bold(packageJson.name)}...`,
      ['🔧', '⚙️','🔨', '🔩', '🛠️'],
    )) {
      if (await terminal.showLoadingUntilDone(
        packageManager.install(packageJson.name),
        `installing ${cli.highlight.bold(packageJson.name)} library...`,
        ['🔧', '⚙️','🔨', '🔩', '🛠️'],
      )) {
        console.log(`${cli.highlight.bold(packageJson.name)} library has been successfully installed.`)
        cli.newLine()
      } else {
        console.error(`${cli.highlight.bold(packageJson.name)} library installation failed.`)
      }
    }

    let componentNames = options.components
    let path = options.path

    if (!componentNames?.length) {
      componentNames = (await prompt.components()).value as ComponentName[]
    }

    if (path === DEFAULT_COMPONENTS_PATH) {
      path = (await prompt.location()).value
    }

    cli.newLine()

    await deliverComponents(packageManager)(componentNames, path, options.cwd)
  })

const onCancel = () => process.emit('SIGINT')

const prompt = {
  location: async () =>
    await prompts({
      type: 'text',
      name: 'value',
      message: 'Choose component location',
      initial: DEFAULT_COMPONENTS_PATH,
    }, { onCancel }
  ),
  components: async () =>
    await prompts({
      type: 'autocompleteMultiselect',
      name: 'value',
      message: 'Pick components',
      choices: registry.components.map(c => ({
        title: `<${c.name.charAt(0).toUpperCase() + c.name.slice(1)}>`,
        value: c.name,
      })),
      hint: '- Space to select. Return to submit',
    }, { onCancel }),
}

function deliverComponents(packageManager: PackageManager, asUsed = false) {
  const delivered: ComponentName[] = []

  return async (components: ('action' | 'dialog' | 'details')[], path: string, cwd: string) => {
    await Promise.all(
      components.map(async name => {
        const meta = registry.components.find(c => c.name === name) as ComponentMeta

        const componentName = name.charAt(0).toUpperCase() + name.slice(1)

        const component = {
          name: componentName as ComponentName,
          url: `${registry.origin}/${componentName}.vue`,
          content: '',
          path: '',
          dependencies: 'dependencies' in meta ? meta.dependencies : undefined,
          used: 'used' in meta ? meta.used : undefined,
        }

        async function fetchAndSave() {
            const response = await fetch(component.url)

          if (!response.ok) {
            console.error(`Failed to fetch ${component.name} from ${component.url}`)
            return
          }

          component.content = await response.text()
          component.path = $path.join(cwd, path, `${component.name}.vue`)

          const componentsDir = $path.dirname(component.path)

          if (!existsSync(componentsDir)) {
            await fs.mkdir(componentsDir, { recursive: true })
          }

          await fs.writeFile(component.path, component.content)
        }

        await terminal.showLoadingUntilDone(fetchAndSave())

        const trimmedPath = `${$path.join(cli.highlight.bold($path.basename(cwd)), path)}/${$path.basename(component.path)}`

        if (!asUsed && delivered.length > 0) {
          cli.newLine()
        }

        console.log(
          (asUsed ? cli.highlight.yellow('↳ uses component') : 'Component') +
            ` \`${cli.highlight.magenta(`<${component.name}>`)}\``,
        )
        console.log(meta.illustration)
        console.log('delivered to: ' + cli.highlight.underline(cli.highlight.italic(trimmedPath)))
        cli.newLine()

        delivered.push(name)

        if (component.dependencies) {
          for (const dependency of component.dependencies) {
            if (!await terminal.showLoadingUntilDone(
              packageManager.installed(dependency),
              `checking ${cli.highlight.bold(dependency)}...`,
              ['🔧', '⚙️','🔨', '🔩', '🛠️'],
            )) {
              if (await terminal.showLoadingUntilDone(
                packageManager.install(dependency),
                `installing ${cli.highlight.bold(dependency)}...`,
                ['🔧', '⚙️','🔨', '🔩', '🛠️'],
              )) {
                console.log(`${cli.highlight.gray('↳ installed library')} ${cli.highlight.bold(dependency)}`)
              } else {
                console.error(
                  `Failed to install dependency ${cli.highlight.bold(dependency)} for component \`${cli.highlight.magenta(componentName)}\`.`,
                )
              }
            }
          }
        }

        const used = component.used?.filter(c => !delivered.includes(c) && !components.includes(c))
        // const used = component.used?.filter(c => !delivered.includes(c))
        // console.log(cli.highlight.red('used:'), used, name, delivered)
        if (used?.length) {
          // cli.newLine()
          // console.log(`↘ `)
          // Simple loading animation with three rotating dots

          // delivered.push(
          //   ...(await terminal.showLoadingUntilDone(
          //     deliverComponents(packageManager, true)([...used], path, cwd),
          //     'sdfsdfsdf'
          //   )),
          delivered.push(
            ...await deliverComponents(packageManager, true)([...used], path, cwd),
          )
        }

        return component
      }),
    )

    return delivered
  }
}
