import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  {
    extends: './vitest.config.ts',
    test: {
      name: 'spec',
      include: ['**/*.spec.ts'],
    },
  },
  {
    extends: './vitest.config.ts',
    test: {
      environment: 'node',
      name: 'cli',
      include: ['tests/bin/**/*.test.ts'],
    },
  },
])
