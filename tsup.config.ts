import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  outDir: 'dist',
  format: ['cjs'],
  minify: true,
  splitting: false,
  bundle: true,
  noExternal: ['@actions/core', '@actions/github'],
})
