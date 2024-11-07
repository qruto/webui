/// <reference types="vitest" />
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import packageJson from './package.json';

const packageName = packageJson.name.split('/').pop() || packageJson.name;
const toPascalCase = (string) =>
  string
    .match(/[a-z]+/gi)
    .map((word) => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase())
    .join('');

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs', 'umd', 'iife'],
      name: toPascalCase(packageName),
      fileName: 'webui'
    },
  },
  plugins: [dts({ rollupTypes: true })],
  test: {},
});
