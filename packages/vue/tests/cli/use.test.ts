import { describe, expect, it, vi } from 'vitest'

import type { MockInstance } from 'vitest'

import { vol } from 'memfs'

import { command as use } from '$/commands/use'
import packageJson from '$/package'
import { program, run } from './helpers'

import { execAsync } from '$/utils/shell'
import mockFs from '@__mocks__/fs'
import mockHttp from '@__mocks__/http'

import type { exec, PromiseWithChild } from 'node:child_process'

program.addCommand(use)

beforeAll(mockDefaultProcessRun)
mockHttp()

vi.mock('node:fs')
mockFs()

vi.mock('$/utils/shell')

describe('`use` command', () => {
  it('delivers particular `<Action>` component without dependencies', async () => {
    vol.fromJSON({
      [process.cwd() + '/package-lock.json']: '{}',
    })

    mockProcessResult(`npm list ${packageJson.name} --depth=0`, false)
    mockProcessResult('npm list @vueuse/core', true)

    await run('use', ['action'])

    expect(vol.existsSync('./src/components/ui/Action.vue')).toBeTruthy()

    const options = {
      cwd: process.cwd(),
    }

    expect(execAsync).toHaveBeenCalledWith(`npm list ${packageJson.name} --depth=0`, options)

    expect(execAsync).toHaveBeenCalledWith(`npm install ${packageJson.name}`, options)
  })

  it('delivers `<Dialog>` component with dependencies', async () => {
    mockProcessResult(true) // `npm list webui` to check if it's installed

    mockProcessResult(false) // `npm list @vueuse/core`

    mockProcessResult(true) // `npm install @vueuse/core`

    await run('use', ['dialog'])

    expect(vol.existsSync('./src/components/ui/Dialog.vue')).toBeTruthy()
    expect(vol.existsSync('./src/components/ui/Action.vue')).toBeTruthy()

    // expect(execasync).toHaveBeenCalledWith('npm', ['install', packageJson.name], processOptions)
    expect(execAsync).hasBeenCalled('npm', ['install', '@vueuse/core'])
  })

  it('delivers component only once even if it is required as "used" in any of user requested component', async () => {
    const consoleSpy = vi.spyOn(console, 'log')

    /* run command with tested arguments */
    await run('use', ['dialog', 'action'])

    expect(consoleSpy).hasBeenCalledTimes('Component `<Action>`')
    expect(consoleSpy).hasBeenCalledTimes('delivered to: vue/src/components/ui/Action.vue')

    consoleSpy.mockRestore()
  })

  it('installs general dependencies and required component package dependencies', async () => {
    const logSpy = vi.spyOn(console, 'log')

    mockProcessResult(false) // `npm list webui`
    mockProcessResult(true) // `npm install webui`

    mockProcessResult(false) // `npm list @vueuse/core`
    mockProcessResult(true) // `npm install @vueuse/core`

    await run('use', ['dialog'])

    expect(execAsync).hasBeenCalled('npm', ['list', packageJson.name, '--depth=0'])
    expect(execAsync).hasBeenCalled('npm', ['install', packageJson.name])
    expect(logSpy).hasBeenCalledTimes('Installed `' + packageJson.name + '` library')

    expect(execAsync).hasBeenCalled('npm', ['list', '@vueuse/core', '--depth=0'])
    expect(execAsync).hasBeenCalled('npm', ['install', '@vueuse/core'])
    expect(logSpy).hasBeenCalledTimes('Installed `' + packageJson.name + '` library')

    logSpy.mockRestore()
  })

  it('overrides existing component files when --force option is used', async () => {
    vol.fromJSON({
      [process.cwd() + '/package-lock.json']: '{}',
      './src/components/ui/Action.vue': '<template>Old Content</template>',
    })
    mockProcessResult({ status: 1 })
    mockProcessResult({ status: 0 })

    await run('use', ['action', '--force'])

    const newContent = vol.readFileSync('./src/components/ui/Action.vue', 'utf-8')
    expect(newContent).not.toBe('<template>Old Content</template>')
  })

  it('prompts for component location when default path is used', async () => {
    vol.fromJSON({
      [process.cwd() + '/package-lock.json']: '{}',
    })
    mockProcessResult({ status: 1 })
    mockProcessResult({ status: 0 })

    // const promptSpy = vi.spyOn(prompts, 'prompt').mockResolvedValueOnce({ value: './custom/path' })

    await run('use', ['action'])

    expect(vol.existsSync('./custom/path/Action.vue')).toBeTruthy()

    // promptSpy.mockRestore()
  })
})

function mockDefaultProcessRun() {
  vi.mocked(execAsync).mockResolvedValue({ stdout: 'success', stderr: '' })
}

function mockProcessResult(command: string, success = true) {
  const mocked = vi.mocked(execAsync)

  mocked.mockImplementationOnce((cmd: string) => {
    let result = Promise.resolve({ stdout: '', stderr: '' })

    if (cmd === command) {
      if (success) {
        result = Promise.resolve({ stdout: 'success', stderr: '' })
      } else {
        result = Promise.reject(new Error('fail'))
      }
    }

    return result as PromiseWithChild<{ stdout: string; stderr: string }>
  })
}

expect.extend({
  hasBeenCalled(received: typeof exec, ...args: Parameters<typeof exec>) {
    const pass = vi
      .mocked(received)
      .mock.calls.some(call => JSON.stringify(call.slice(0, -1)) === JSON.stringify(args))

    return {
      pass,
      message: () =>
        pass
          ? 'exec was called with the expected arguments'
          : 'exec was not called with the expected arguments',
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
