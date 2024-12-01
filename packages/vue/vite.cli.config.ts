import type { UserConfig } from 'vite'

import { resolve } from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import dts from 'vite-plugin-dts'

export default {
  build: {
    lib: {
      fileName: () => 'webui-cli.js',
      entry: resolve(__dirname, 'src/bin/cli.ts'),
      formats: ['cjs'],
    },
    outDir: 'dist/bin',

    sourcemap: true,
  },

  plugins: [
    dts({
      tsconfigPath: './tsconfig.node.json',
      staticImport: true,
      entryRoot: 'src/bin',
    }),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src/bin', import.meta.url)),
    },
  },
} satisfies UserConfig
