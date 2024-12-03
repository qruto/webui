import { defineConfig } from 'tsup'

export default defineConfig({
  clean: true,
  dts: true,
  entry: ['src/bin/cli.ts'],
  format: ['esm'],
  sourcemap: true,
  minify: true,
  target: 'esnext',
  outDir: 'dist/bin',
})
