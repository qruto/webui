import type { AvailableCommands } from '$/index'
import program from '$/program'
import $prompts from 'prompts'

export { program }

export async function run(
  name: AvailableCommands,
  components: string[] = [],
  flags: string[] = [],
  prompts?: string[],
) {
  $prompts.inject(prompts || [])

  await program.parseAsync(['node', 'webui', name, ...components, ...flags])
}
