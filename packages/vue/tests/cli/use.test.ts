import { describe, expect, it, MockInstance } from 'vitest'

import { vol } from 'memfs'

import { command as use } from '$/commands/use'
import packageJson from '$/package'
import mockFs from '@__mocks__/fs'
import mockHttp from '@__mocks__/http'
import { spawnSync } from 'node:child_process'
import { program, run } from './helpers'

program.addCommand(use)

beforeAll(mockDefaultProcessRun)
mockHttp()

vi.mock('node:fs')
mockFs()

vi.mock('node:child_process')

describe('`use` command`', () => {
  it('delivers particular `<Action>` component without dependencies', async () => {
    vol.fromJSON({
      [process.cwd() + '/package-lock.json']: '{}',
    })
    // `npm list webui`
    mockProcessRun(false)
    // `npm list @vueuse/core`
    mockProcessRun(true)

    await run('use', ['action'])

    expect(vol.existsSync('./src/components/ui/Action.vue')).toBeTruthy()

    const processOptions = {
      cwd: process.cwd(),
      stdio: 'pipe',
    }

    expect(spawnSync).toHaveBeenCalledWith(
      'npm',
      ['list', packageJson.name, '--depth=0'],
      processOptions,
    )

    expect(spawnSync).toHaveBeenCalledWith('npm', ['install', packageJson.name], processOptions)
  })

  it('delivers `<Dialog>` component with dependencies', async () => {
    mockProcessRun(true) // `npm list webui` to check if it's installed

    mockProcessRun(false) // `npm list @vueuse/core`

    mockProcessRun(true) // `npm install @vueuse/core`

    await run('use', ['dialog'])

    expect(vol.existsSync('./src/components/ui/Dialog.vue')).toBeTruthy()
    expect(vol.existsSync('./src/components/ui/Action.vue')).toBeTruthy()

    // expect(spawnSync).toHaveBeenCalledWith('npm', ['install', packageJson.name], processOptions)
    expect(spawnSync).hasBeenCalled('npm', ['install', '@vueuse/core'])
  })

  it('delivers component only once even if it is required as "used" in any of user requested component', async () => {
    // when call npm list package-name
    mockProcessRun(true)
    mockProcessRun(true)
    const consoleSpy = vi.spyOn(console, 'log')

    /* run command with tested arguments */
    await run('use', ['dialog', 'action'])

    expect(consoleSpy).hasBeenCalledTimes(
      'Component `<Action>` has been saved to .../vue/src/components/ui/Action.vue',
    )

    consoleSpy.mockRestore()
  })

  it('overrides existing component files when --force option is used', async () => {
    vol.fromJSON({
      [process.cwd() + '/package-lock.json']: '{}',
      './src/components/ui/Action.vue': '<template>Old Content</template>',
    })
    mockProcessRun({ status: 1 })
    mockProcessRun({ status: 0 })

    await run('use', ['action', '--force'])

    const newContent = vol.readFileSync('./src/components/ui/Action.vue', 'utf-8')
    expect(newContent).not.toBe('<template>Old Content</template>')
  })

  it('prompts for component location when default path is used', async () => {
    vol.fromJSON({
      [process.cwd() + '/package-lock.json']: '{}',
    })
    mockProcessRun({ status: 1 })
    mockProcessRun({ status: 0 })

    // const promptSpy = vi.spyOn(prompts, 'prompt').mockResolvedValueOnce({ value: './custom/path' })

    await run('use', ['action'])

    expect(vol.existsSync('./custom/path/Action.vue')).toBeTruthy()

    // promptSpy.mockRestore()
  })
})

const defaultProcessReturn = {
  pid: 1234,
  output: [],
  stdout: Buffer.from(''),
  stderr: Buffer.from(''),
  status: 0,
  signal: null,
}

function mockDefaultProcessRun() {
  vi.mocked(spawnSync).mockReturnValue(defaultProcessReturn)
}

function mockProcessRun(success = true) {
  vi.mocked(spawnSync).mockReturnValueOnce({ ...defaultProcessReturn, status: success ? 0 : 1 })
}

expect.extend({
  hasBeenCalled(received: typeof spawnSync, ...args: Parameters<typeof spawnSync>) {
    const pass = vi
      .mocked(received)
      .mock.calls.some(call => JSON.stringify(call.slice(0, -1)) === JSON.stringify(args))

    return {
      pass,
      message: () =>
        pass
          ? 'spawnSync was called with the expected arguments'
          : 'spawnSync was not called with the expected arguments',
    }
  },

  hasBeenCalledTimes(received: MockInstance<typeof Function>, text: string, times: number = 1) {
    const pass = received.mock.calls.filter(call => call[0].includes(text)).length === times

    return {
      pass,
      message: () =>
        pass
          ? received.getMockName() + ' was called ' + times + ' times'
          : received.getMockName() + ' was not called ' + times + ' times',
    }
  },
})
