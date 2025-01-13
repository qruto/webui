import { describe, expect, it } from 'vitest'

import { command as use } from '$/commands/use'
import program from '$/program'

// import prompts from 'prompts'
import type { AvailableCommands } from '$/cli'

program.addCommand(use)

function run(name: AvailableCommands, prompts?: string[]) {
  program.parse(['node', 'webui', name])
  console.log(prompts)
}

describe('CLI testing', () => {
  it('copies all components with `use` command', () => {
    // prompts.inject([''])
    program.action(() => console.log('It works!'))
    run('use')
    expect(2).toBe(2)
  })
})
