import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    root: "src/",
    server: {
        port: process.env.PORT || 5173,
        host: '0.0.0.0',
        proxy: {
            // Proxy API requests to the Express server
            '/send-appointment-request': {
                target: 'https://madisonridgechiropractic.onrender.com',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/send-appointment-request/, '')
            }
        }
    },
    preview: {
        port: process.env.PORT || 4173,
        host: '0.0.0.0',
        allowedHosts: ['madisonridgechiropractic.onrender.com']
    },
    build: {
        outDir: "../dist", // <-- change here: relative to src/, puts dist in project root
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: resolve(__dirname, "src/index.html"),
                reviewUs: resolve(__dirname, "src/review_us/index.html"),
                contact: resolve(__dirname, "src/contact/index.html"),
                schedule: resolve(__dirname, "src/schedule/index.html"),
            },
        },
    },
});