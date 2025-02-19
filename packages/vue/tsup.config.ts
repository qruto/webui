/* build cli bin */

import { defineConfig } from 'tsup'

export default defineConfig({
  clean: true,
  entry: { 'webui-cli': 'src/cli/index.ts' },
  outDir: 'dist/bin',
  format: ['esm'],
  target: 'esnext',
  sourcemap: true,
  dts: true,
  minify: true,
  tsconfig: './tsconfig.cli.json',
})
