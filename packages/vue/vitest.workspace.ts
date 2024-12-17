import type { WorkspaceProjectConfiguration } from 'vitest/config'

export default [
  {
    extends: './vitest.config.ts',
    test: {
      environment: 'jsdom',
      name: 'spec',
      include: ['tests/**/*.spec.ts'],
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
] satisfies WorkspaceProjectConfiguration[]
