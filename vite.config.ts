import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { loadEnv } from 'vite';

/** @type {import('vite').UserConfig} */
export default ({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

    return defineConfig({
        plugins: [react()],
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
