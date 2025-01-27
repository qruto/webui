import type { WorkspaceProjectConfiguration } from 'vitest/config'

export default [
  {
    extends: './vitest.config.ts',
    test: {
      name: 'browser',
      include: ['tests/**/*.test.ts'],
      exclude: ['tests/cli/**/*.test.ts'],
      browser: {
        enabled: true,
        name: 'webkit',
        provider: 'playwright',
        // https://playwright.dev
        providerOptions: {},
      },
    },
  },
  {
    extends: './vitest.config.ts',
    test: {
      name: 'node',
      include: ['tests/cli/**/*.test.ts'],
      environment: 'node',
    },
  },
] satisfies WorkspaceProjectConfiguration[]
