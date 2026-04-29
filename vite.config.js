import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true
  },
  css: {
    devSourcemap: false
  },
  optimizeDeps: {
    exclude: []
  },
  build: {
    sourcemap: false
  }
})
