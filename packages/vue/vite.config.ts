import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts';
import packageJson from './package.json';

const packageName = packageJson.name.split('/').pop() || packageJson.name;
const toPascalCase = (string: string) =>
  (string.match(/[a-z]+/gi) || [])
    .map((word) => word.charAt(0).toUpperCase() + word.substring(1).toLowerCase())
    .join('');

console.log('here', toPascalCase(packageName))

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs', 'umd', 'iife'],
      name: 'WebUI',
      fileName: 'webui'
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
  plugins: [vue(), dts({
    tsconfigPath: './tsconfig.lib.json',
    rollupTypes: true,
  })],
  // test: {},
});
