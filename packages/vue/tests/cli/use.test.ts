import { describe, expect, it, vi } from 'vitest'

import { command as use } from '$/commands/use'
import program from '$/program'
import $prompts from 'prompts'

import type { AvailableCommands } from '$/index'
import registry from '$/registry'
import { existsSync, promises as fs } from 'node:fs'

program.addCommand(use)

async function run(
  name: AvailableCommands,
  components: string[] = [],
  flags: string[] = [],
  prompts?: string[],
) {
  $prompts.inject(prompts || [])

  await program.parseAsync(['node', 'webui', name, ...components, ...flags])
}

vi.mock('node:fs', () => ({
  existsSync: vi.fn().mockReturnValue(true),
  promises: {
    mkdir: vi.fn(),
    writeFile: vi.fn(),
  },
}))

const fetchResponseMock = {
  ok: true,
  text: () => Promise.resolve('content'),
}

function mockResponse(content: string, ok = true) {
  fetchResponseMock.text = () => Promise.resolve(content)
  fetchResponseMock.ok = ok
}

vi.stubGlobal(
  'fetch',
  vi.fn(() => Promise.resolve(fetchResponseMock)),
)

describe('CLI testing', () => {
  // it('copies all components with `use` command', async () => {
  //   // run('use', [button])
  //   expect(fetch).toHaveBeenCalled()
  // })

  it('copies specific components with `use` command', async () => {
    await run('use', ['button'])
    expect(fetch).toHaveBeenCalledWith(`${registry.origin}/ButtonExample.vue`)
  })

  it('prompts for component location if default path is used', async () => {
    run('use', [], ['custom/path'])
    expect($prompts.inject).toHaveBeenCalledWith(['custom/path'])
  })

  it('creates directory if it does not exist', async () => {
    existsSync.mockReturnValue(false)
    run('use', ['Button'])
    expect(fs.mkdir).toHaveBeenCalled()
  })

  it('overrides existing component files if --force flag is used', async () => {
    run('use', ['Button', '--force'])
    expect(fs.writeFile).toHaveBeenCalled()
  })
})
