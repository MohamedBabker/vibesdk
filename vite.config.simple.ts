import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';

// Simplified Vite config for development without Cloudflare Workers
export default defineConfig({
	optimizeDeps: {
		exclude: ['format', 'editor.all'],
		include: ['monaco-editor/esm/vs/editor/editor.api'],
		force: true,
		rollupOptions: {
			external: ['@cloudflare/workers-types']
		}
	},

	plugins: [
		react(),
		svgr(),
		tailwindcss(),
	],

	resolve: {
		alias: {
			debug: 'debug/src/browser',
			'@': path.resolve(__dirname, './src'),
			'shared': path.resolve(__dirname, './shared'),
			'worker': path.resolve(__dirname, './worker'),
		},
	},

	define: {
		'process.env.NODE_ENV': JSON.stringify(
			process.env.NODE_ENV || 'development',
		),
		global: 'globalThis',
	},

	server: {
		allowedHosts: true,
		port: 5173,
		host: true,
	},

	cacheDir: 'node_modules/.vite',

	build: {
		sourcemap: true,
	},
});
