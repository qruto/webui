import registry from '$/registry'
import { Command } from 'commander'
import { existsSync, promises as fs } from 'node:fs'
import $path from 'node:path'
import prompts from 'prompts'
import { z } from 'zod'

export const name = 'use' as const
const DEFAULT_COMPONENTS_PATH = './src/components/ui'

export const optionsSchema = z.object({
  components: z.array(z.string()).optional(),
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
  .action(async (components, optionsRaw) => {
    const options = optionsSchema.parse({
      components,
      cwd: $path.resolve(optionsRaw.cwd),
      ...optionsRaw,
    })

    let path = options.path

    if (path === DEFAULT_COMPONENTS_PATH) {
      const response = await prompts({
        type: 'text',
        name: 'value',
        message: 'Choose component location',
        initial: DEFAULT_COMPONENTS_PATH,
      })

      path = response.value
    }

    if (options.components?.length) {
      options.components.forEach(async component => {
        const componentName = component.charAt(0).toUpperCase() + component.slice(1)
        const componentUrl = `${registry.origin}/${componentName}Example.vue`
        const response = await fetch(componentUrl)

        if (!response.ok) {
          console.error(`Failed to fetch ${component} from ${componentUrl}`)
          return
        }

        const componentContent = await response.text()
        const componentPath = $path.join(options.cwd, path, `${component}.vue`)
        const componentsDir = $path.dirname(componentPath)

        if (!existsSync(componentsDir)) {
          await fs.mkdir(componentsDir, { recursive: true })
        }

        await fs.writeFile(componentPath, componentContent)

        console.log(`Component ${component} has been saved to ${componentPath}`)
      })
    }
  })
