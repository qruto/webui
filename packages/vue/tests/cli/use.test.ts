import { describe, expect, it } from 'vitest'

import { vol } from 'memfs'

import { command as use } from '$/commands/use'
import mockHttp from '@__mocks__/http'
import { program, run } from './helpers'

program.addCommand(use)

vi.mock('node:fs')
vi.mock('node:fs/promises')

beforeEach(() => {
  vol.reset()
  vol.mkdirSync(process.cwd(), { recursive: true })
})

mockHttp()

describe('CLI testing', () => {
  it('copies particular component with `use` command', async () => {
    await run('use', ['button'])

    expect(vol.existsSync('./src/components/ui/Button.vue')).toBeTruthy()
  })
})
