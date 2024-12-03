/* build cli bin */

import { defineConfig } from 'tsup'

export default defineConfig({
  clean: true,
  entry: ['src/bin/cli.ts'],
  outDir: 'dist/bin',
  format: ['esm'],
  target: 'esnext',
  sourcemap: true,
  dts: true,
  minify: true,
})
