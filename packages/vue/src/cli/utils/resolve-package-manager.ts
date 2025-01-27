import { existsSync } from 'fs'
import { join } from 'path'

type PackageManager = 'npm' | 'yarn' | 'pnpm' | 'bun'

const lockFiles: { file: string; manager: PackageManager }[] = [
  { file: 'package-lock.json', manager: 'npm' },
  { file: 'yarn.lock', manager: 'yarn' },
  { file: 'pnpm-lock.yaml', manager: 'pnpm' },
  { file: 'bun.lock', manager: 'bun' },
]

export function resolvePackageManager(cwd: string): PackageManager {
  for (const { file, manager } of lockFiles) {
    if (existsSync(join(cwd, file))) {
      return manager
    }
  }

  return 'npm'
}
