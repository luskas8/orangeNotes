import react from '@vitejs/plugin-react';
import { loadEnv } from 'vite';
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from 'vitest/config';

/** @type {import('vite').UserConfig} */
export default ({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

    return defineConfig({
        plugins: [react(), tsconfigPaths({ root: "../" })],
        root: 'src',
        build: {
            outDir: '../dist',
        },
        test: {
            globals: true,
            environment: 'jsdom',
            setupFiles: ['../.test/setup.js'],
            include: ['**/*(*.)?{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
            exclude: ['node_modules', 'dist', '.idea', '.git', '.cache'],
            reporters: 'default',
        },
        server: {
            watch: {
                usePolling: true,
            },
        },
    });
}
