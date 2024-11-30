import { resolve } from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

import vue from '@vitejs/plugin-vue'

export default defineConfig({
  build: {
    lib: {
      fileName: 'webui',
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs', 'umd', 'iife'],
      name: 'WebUI',
    },
    sourcemap: true,
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
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
})
