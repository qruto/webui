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
  const logSpy = vi.spyOn(console, 'log').mockImplementation(() => '')

  afterEach(() => logSpy.mockReset())

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
    mockProcessResult(`npm list ${packageJson.name} --depth=0`, true)
    mockProcessResult('npm list @vueuse/core --depth=0', false)
    mockProcessResult('npm install @vueuse/core', true)

    await run('use', ['dialog'])

    expect(vol.existsSync('./src/components/ui/Dialog.vue')).toBeTruthy()
    expect(vol.existsSync('./src/components/ui/Action.vue')).toBeTruthy()

    expect(execAsync).hasBeenCalled('npm install @vueuse/core')
  })

  it('delivers component only once even if it is required as "used" in any of user requested component', async () => {
    await run('use', ['dialog', 'action'])

    expect(logSpy).hasBeenCalledTimes('Component `<Action>`')
    expect(logSpy).hasBeenCalledTimes('delivered to: vue/src/components/ui/Action.vue')
  })

  it('handles SIGINT (Ctrl+C) gracefully', async () => {
    const processExitSpy = vi.spyOn(process, 'exit').mockImplementation(() => {
      throw new Error('process.exit should not be called in tests')
    })

    const processKillSpy = vi.spyOn(process, 'kill').mockImplementation(() => true)

    const runPromise = run('use', ['action'])

    process.emit('SIGINT')

    await expect(runPromise).rejects.toThrow('process.exit should not be called in tests')

    expect(processKillSpy).toHaveBeenCalledWith(process.pid, 'SIGINT')

    processExitSpy.mockRestore()
    processKillSpy.mockRestore()
  })

  it('installs general dependencies and required component package dependencies', async () => {
    mockProcessResult(`npm list ${packageJson.name} --depth=0`, false)
    mockProcessResult(`npm install ${packageJson.name}`, true)

    mockProcessResult('npm list @vueuse/core', false)
    mockProcessResult('npm install @vueuse/core', true)

    await run('use', ['dialog'])

    expect(execAsync).hasBeenCalled(`npm list ${packageJson.name} --depth=0`)
    expect(execAsync).hasBeenCalled(`npm install ${packageJson.name}`)
    expect(logSpy).hasBeenCalledTimes(`Installed \`${packageJson.name}\` library`)

    expect(execAsync).hasBeenCalled('npm list @vueuse/core --depth=0')
    expect(execAsync).hasBeenCalled('npm install @vueuse/core')
    expect(logSpy).hasBeenCalledTimes('Installed `@vueuse/core` library')
  })

  it('overrides existing component files when --force option is used', async () => {
    vol.fromJSON({
      [process.cwd() + '/package-lock.json']: '{}',
      './src/components/ui/Action.vue': '<template>Old Content</template>',
    })

    mockProcessResult('npm list @vueuse/core', false)
    mockProcessResult('npm install @vueuse/core', true)

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
