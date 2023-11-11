import { defineConfig } from 'tsup'

export default defineConfig({
  minify: true,
  dts: true,
  format: ['cjs', 'esm'],
  sourcemap: true,
  clean: true,
  entry: ['src/index.ts'],
  outDir: 'dist',
  treeshake: true,
})
