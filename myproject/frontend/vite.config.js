import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
    plugins: [react()],
    build: {
        outDir: '../../static/dist',
        emptyOutDir: true,
        rollupOptions: {
            output: {
                entryFileNames: 'main.js',
                assetFileNames: 'main.[ext]',
            },
        },
    },
    server: {
        port: 5173,
    },
});
