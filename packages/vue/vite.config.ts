import type { UserConfig } from 'vite'

import { fileURLToPath, URL } from 'node:url'
import dts from 'vite-plugin-dts'
import tsconfigPaths from 'vite-tsconfig-paths'

import vue from '@vitejs/plugin-vue'

export default {
  build: {
    lib: {
      fileName: 'webui',
      entry: fileURLToPath(new URL('src/index.ts', import.meta.url)),
      formats: ['es'],
      // name: 'WebUI',
    },

    rollupOptions: {
      external: ['vue'],
    },

    sourcemap: true,
  },

  plugins: [
    dts({
      tsconfigPath: './tsconfig.lib.json',
      staticImport: true,
      entryRoot: 'src',
      insertTypesEntry: true,
      rollupTypes: true,
    }),

    vue(),

    tsconfigPaths(),
  ],
} satisfies UserConfig
