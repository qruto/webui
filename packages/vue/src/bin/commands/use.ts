import { Command } from 'commander'
import { z } from 'zod'
import prompts from 'prompts'

const DEFAULT_COMPONENTS_PATH = './src/components/ui'

export const optionsSchema = z.object({
  components: z.array(z.string()).optional(),
  yes: z.boolean(),
  force: z.boolean(),
  path: z.string(),
})

const use = new Command()
  .name('use')
  .argument('[components...]', 'leave it empty to use all components or list the components to use')
  .option('-y, --yes', 'skip prompts', false)
  .option('-f, --force', 'override existing component files', false)
  .option('-p, --path <path>', 'specify the path to copy the files to', DEFAULT_COMPONENTS_PATH)
  .action(async (components, optionsRaw) => {
    const options = optionsSchema.parse({
      components,
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

    console.log(path) // => { value: 24 }
  })

export default use
