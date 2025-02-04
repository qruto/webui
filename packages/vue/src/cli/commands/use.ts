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
import cli from '$/services/cli'

export const name = 'use' as const
const DEFAULT_COMPONENTS_PATH = './src/components/ui'

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

    if (!packageManager.install(packageJson.name)) {
      console.error(`Failed to install the core ${packageJson.name} package.`)
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

const prompt = {
  location: async () =>
    await prompts({
      type: 'text',
      name: 'value',
      message: 'Choose component location',
      initial: DEFAULT_COMPONENTS_PATH,
    }),
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
    }),
}

function deliverComponents(packageManager: PackageManager) {
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
          await new Promise(resolve => setTimeout(resolve, 3000))
        }

        await showLoadingUntilDone(fetchAndSave(), 'delivery')

        const trimmedPath = `.../${$path.join($path.basename(cwd), path)}/${$path.basename(component.path)}`
        console.log(
          `Component \`${cli.highlight.magenta(`<${component.name}>`)}\` has been saved to ${cli.highlight.italic(trimmedPath)}`,
        )

        delivered.push(name)

        if (component.dependencies) {
          for (const dependency of component.dependencies) {
            if (!packageManager.install(dependency)) {
              console.error(
                `Failed to install dependency ${dependency} for component ${componentName}.`,
              )
            }
          }
        }

        // const used = component.used?.filter(c => !delivered.includes(c) && !components.includes(c))
        const used = component.used?.filter(c => !delivered.includes(c))
        // console.log(cli.highlight.red('used:'), used, name, delivered)
        if (used?.length) {
          console.log(`\`<${component.name}>\` requires additional components...`)
          // Simple loading animation with three rotating dots

          delivered.push(...(await deliverComponents(packageManager)([...used], path, cwd)))
        }

        return component
      }),
    )

    return delivered
  }
}

async function showLoadingUntilDone<T>(promise: Promise<T>, text: string = 'loading') {
  let stage = 0

  const frames = ['...🚚', '..🚚', '.🚚', '🚚']

  // hide cursor
  process.stdout.write('\x1B[?25l')
  const loading = setInterval(() => {
    process.stdout.write('\r\x1b[K')
    process.stdout.write(`\r${text} ${frames[stage]}`)
    stage = (stage + 1) % frames.length
  }, 300)

  const result = await promise

  // show cursor
  process.stdout.write('\x1B[?25h')
  clearInterval(loading)

  // Clear the line after loading is done
  process.stdout.write('\r\x1b[K')

  return result
}
