import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    root: "src/",
    server: {
        port: process.env.PORT || 5173,
        host: '0.0.0.0'
    },
    preview: {
        port: process.env.PORT || 4173,
        host: '0.0.0.0',
        allowedHosts: ['madisonridgechiropractic.onrender.com']
    },
    build: {
        outDir: "../dist",
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: resolve(__dirname, "src/index.html"),
                reviewUs: resolve(__dirname, "src/review_us/index.html"),
            },
        },
    },
});
