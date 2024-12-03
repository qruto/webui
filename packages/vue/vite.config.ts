import type { UserConfig } from 'vite'

import { fileURLToPath, URL } from 'node:url'
import dts from 'vite-plugin-dts'

import vue from '@vitejs/plugin-vue'

export default {
  build: {
    lib: {
      fileName: 'webui',
      entry: fileURLToPath(new URL('src/entry.ts', import.meta.url)),
      formats: ['es', 'cjs', 'umd', 'iife'],
      name: 'WebUI',
    },

    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },

    sourcemap: true,
  },

  plugins: [
    dts({
      tsconfigPath: './tsconfig.lib.json',
      staticImport: true,
      entryRoot: 'src',
      insertTypesEntry: true,
    }),

    vue(),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  test: {
    globals: true,
  },
} satisfies UserConfig
