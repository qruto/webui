/// <reference types="vite/client" />
/// <reference types="vitest/globals" />

import type { spawnSync } from 'node:child_process'
import 'vitest'

declare module 'vitest' {
  interface Assertion {
    hasBeenCalled(...arguments: Parameters<typeof spawnSync>)
    hasBeenCalledTimes(text: string, times: number = 1)
  }

  interface AsymmetricMatchersContaining {
    toBeDivisibleBy(expected: number): void
  }
}
