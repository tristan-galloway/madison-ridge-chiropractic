import { defineConfig } from 'vite'

export default defineConfig({
    server: {
        port: process.env.PORT || 5173,
        host: '0.0.0.0'
    },
    preview: {
        port: process.env.PORT || 4173,
        host: '0.0.0.0',
        allowedHosts: ['madisonridgechiropractic.onrender.com']
    }
})
