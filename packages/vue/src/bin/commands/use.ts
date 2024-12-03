import { Command } from 'commander'
import { z } from 'zod'

export const optionsSchema = z.object({
  components: z.array(z.string()).optional(),
  yes: z.boolean(),
  force: z.boolean(),
  path: z.string(),
})

const use = new Command()
  .name('use')
  .argument(
    '?[components...]',
    'leave it empty to use all components or list the components to use',
  )
  .option('-y, --yes', 'skip prompts', false)
  .option('-f, --force', 'override existing component files', false)
  .option('-p, --path <path>', 'specify the path to copy the files to', './src/components/ui')
  .action((components, optionsRaw) => {
    const options = optionsSchema.parse({
      components,
      ...optionsRaw,
    })

    console.log(options)
  })

export default use
