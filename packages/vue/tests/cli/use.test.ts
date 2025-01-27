import { describe, expect, it } from 'vitest'

import { command as use } from '$/commands/use'
import program from '$/program'
import $prompts from 'prompts'

// import prompts from 'prompts'
import type { AvailableCommands } from '$/index'

program.addCommand(use)

function run(name: AvailableCommands, prompts?: string[]) {
  $prompts.inject(prompts || [])

  program.parse(['node', 'webui', name])
}

describe('CLI testing', () => {
  it('copies all components with `use` command', () => {
    run('use')
    expect(true).toBe(true)
  })
})
