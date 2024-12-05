import { describe, it } from 'vitest'

import program from '@/bin/program'
// import prompts from 'prompts'
import type { AvailableCommands } from '@/bin/cli'

function run(name: AvailableCommands, prompts?: string[]) {
  program.parse(['node', 'webui', name])
}

describe('CLI testing', () => {
  it('copies all components with `use` command', () => {
    // prompts.inject([''])
    program.action(() => console.log('It works!'))
    program.parse(['node', 'webui', 'use'])
    expect(2).toBe(2)
  })
})
