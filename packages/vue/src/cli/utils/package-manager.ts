import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { join } from 'node:path'

type Manager = 'npm' | 'yarn' | 'pnpm' | 'bun'

const lockFiles: { file: string; manager: Manager }[] = [
  { file: 'package-lock.json', manager: 'npm' },
  { file: 'yarn.lock', manager: 'yarn' },
  { file: 'pnpm-lock.yaml', manager: 'pnpm' },
  { file: 'bun.lock', manager: 'bun' },
]

export class PackageManager {
  constructor(
    private cwd: string,
    public readonly manager: Manager = 'npm',
  ) {
    for (const { file, manager } of lockFiles) {
      if (existsSync(join(cwd, file))) {
        this.manager = manager
      }
    }
  }

  installed(name: string) {
    const commands: { [key in Manager]: string[] } = {
      npm: ['list'],
      yarn: ['list'],
      pnpm: ['list'],
      bun: ['pm', 'ls'],
    }

    const newLocal = spawnSync(this.manager, [...commands[this.manager], name, '--depth=0'], {
      cwd: this.cwd,
      stdio: 'pipe',
    })
    return newLocal.status === 0
  }

  install(name: string) {
    if (this.installed(name)) {
      return true
    }

    const commands: { [key in Manager]: string[] } = {
      npm: ['install', name],
      yarn: ['add', name],
      pnpm: ['add', name],
      bun: ['pm', 'add', name],
    }

    const newLocal = spawnSync(this.manager, commands[this.manager], {
      cwd: this.cwd,
      stdio: 'pipe',
    })
    return newLocal.status === 0
  }
}
