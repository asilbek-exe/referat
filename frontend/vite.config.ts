import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Get base path from environment variable or default to root
// For GitHub Pages, this should be your repository name (e.g., '/Nasiba-holajon/')
const base = process.env.VITE_BASE_PATH || '/'

export default defineConfig({
  base: base,
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})

