import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { execAsync } from './shell'

type Manager = 'npm' | 'yarn' | 'pnpm' | 'bun'

const lockFiles: { file: string; manager: Manager }[] = [
  { file: 'package-lock.json', manager: 'npm' },
  { file: 'yarn.lock', manager: 'yarn' },
  { file: 'pnpm-lock.yaml', manager: 'pnpm' },
  { file: 'bun.lock', manager: 'bun' },
]

export class PackageManager {
  constructor(
    public readonly cwd: string,
    public readonly manager: Manager = 'npm',
  ) {
    for (const { file, manager } of lockFiles) {
      if (existsSync(join(cwd, file))) {
        this.manager = manager
      }
    }
  }

  async installed(name: string): Promise<boolean> {
    const commands: { [key in Manager]: string[] } = {
      npm: ['list'],
      yarn: ['list'],
      pnpm: ['list'],
      bun: ['pm', 'ls'],
    }

    try {
      await execAsync([this.manager, ...commands[this.manager], name, '--depth=0'].join(' '), {
        cwd: this.cwd,
      })

      return true
    } catch {
      return false
    }
  }

  async install(name: string): Promise<boolean> {
    try {
      if (await this.installed(name)) {
        return true
      }

      const commands: { [key in Manager]: string[] } = {
        npm: ['install'],
        yarn: ['add'],
        pnpm: ['add'],
        bun: ['pm', 'add'],
      }

      await execAsync([this.manager, ...commands[this.manager], name].join(' '), { cwd: this.cwd })

      return true
    } catch {
      return false
    }
  }
}
