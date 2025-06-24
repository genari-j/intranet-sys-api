import { defineConfig } from 'tsup'

export default defineConfig({
	entry: ['src/server.ts'],
	outDir: 'dist',
	format: ['cjs'],
	bundle: true,
	minify: true,
	clean: true,
	splitting: false,
	sourcemap: false,
	dts: false,
	target: 'node20',
})
