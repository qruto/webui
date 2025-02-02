import { describe, expect, it } from 'vitest'

import { vol } from 'memfs'

import { command as use } from '$/commands/use'
import mockFs from '@__mocks__/fs'
import mockHttp from '@__mocks__/http'
import { program, run } from './helpers'

program.addCommand(use)

mockHttp()

vi.mock('node:fs')
mockFs()

describe('CLI testing', () => {
  it('copies particular component with `use` command', async () => {
    await run('use', ['action'])

    expect(vol.existsSync('./src/components/ui/Action.vue')).toBeTruthy()
  })
})
