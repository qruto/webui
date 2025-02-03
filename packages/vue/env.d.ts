/// <reference types="vite/client" />
/// <reference types="vitest/globals" />

import type { spawnSync } from 'node:child_process'
import 'vitest'

declare module 'vitest' {
  interface Assertion {
    hasBeenCalled(...arguments: Parameters<typeof spawnSync>)
  }

  interface AsymmetricMatchersContaining {
    toBeDivisibleBy(expected: number): void
  }
}
