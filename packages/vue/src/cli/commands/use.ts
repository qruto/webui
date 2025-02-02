import packageJson from '$/package'
import registry, { ComponentName } from '$/registry'
import { PackageManager } from '$/utils/package-manager'
import { Command } from 'commander'
import { existsSync, promises as fs } from 'node:fs'
import $path from 'node:path'
import prompts from 'prompts'
import { z } from 'zod'

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

    let path = options.path

    if (path === DEFAULT_COMPONENTS_PATH) {
      path = (await prompt.location()).value
    }

    if (options.components?.length) {
      await deliverComponents(options.components, path, options.cwd)

      console.log('All components have been processed.')
    }
  })

const prompt = {
  location: async () =>
    await prompts({
      type: 'text',
      name: 'value',
      message: 'Choose component location',
      initial: DEFAULT_COMPONENTS_PATH,
    }),
}

async function deliverComponents(
  components: ('action' | 'dialog' | 'details')[],
  path: string,
  cwd: string,
) {
  await Promise.all(
    components.map(async componentName => {
      componentName = componentName.charAt(0).toUpperCase() + componentName.slice(1)

      const component = {
        name: componentName,
        url: `${registry.origin}/${componentName}.vue`,
        content: '',
        path: '',
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
    }),
  )
}
