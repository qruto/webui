import type { UserConfig } from 'vite'

import { resolve } from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import { writeFileSync, chmod } from 'node:fs'
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
    // {
    //   name: 'add-shebang',
    //   closeBundle: () => {
    //     const outFile = resolve(__dirname, 'dist/bin/webui-cli.js')
    //     const content = `#!/usr/bin/env node\n` + require('fs').readFileSync(outFile, 'utf8')
    //     writeFileSync(outFile, content)
    //     chmod(outFile, 0o755)
    //   },
    // },
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src/bin', import.meta.url)),
    },
  },
} satisfies UserConfig
