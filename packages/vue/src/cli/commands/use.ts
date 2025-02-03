import packageJson from '$/package'
import registry from '$/registry'
import { PackageManager } from '$/utils/package-manager'
import { Command } from 'commander'
import { existsSync, promises as fs } from 'node:fs'
import $path from 'node:path'
import prompts from 'prompts'
import { z } from 'zod'

import type { ComponentMeta, ComponentName } from '$/registry'

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
  return async (components: ('action' | 'dialog' | 'details')[], path: string, cwd: string) =>
    await Promise.all(
      components.map(async componentName => {
        const meta = registry.components.find(c => c.name === componentName) as ComponentMeta

        componentName = componentName.charAt(0).toUpperCase() + componentName.slice(1)

        const component = {
          name: componentName,
          url: `${registry.origin}/${componentName}.vue`,
          content: '',
          path: '',
          dependencies: 'dependencies' in meta ? meta.dependencies : undefined,
          used: 'used' in meta ? meta.used : undefined,
        }

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

        console.log(`Component ${component.name} has been saved to ${component.path}`)

        if (component.dependencies) {
          for (const dependency of component.dependencies) {
            if (!packageManager.install(dependency)) {
              console.error(
                `Failed to install dependency ${dependency} for component ${componentName}.`,
              )
            }
          }
        }

        // not copy already existed
        if (component.used) {
          await deliverComponents(packageManager)([...component.used], path, cwd)
        }
      }),
    )
}
