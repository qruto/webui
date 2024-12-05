import type { UserConfig } from 'vite'

import { fileURLToPath, URL } from 'node:url'
import dts from 'vite-plugin-dts'

export default {
  build: {
    lib: {
      fileName: 'library-cli',
      entry: fileURLToPath(new URL('src/bin/cli.ts', import.meta.url)),
      formats: ['cjs'],
    },

    outDir: 'dist/bin',

    sourcemap: true,
  },

  plugins: [
    dts({
      tsconfigPath: './tsconfig.cli.json',
      staticImport: true,
      entryRoot: 'src/bin',
      insertTypesEntry: true,
    }),
  ],

  resolve: {
    alias: {
      $: fileURLToPath(new URL('./src/bin', import.meta.url)),
    },
  },
} satisfies UserConfig
