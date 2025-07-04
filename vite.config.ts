import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Enable network access for mobile testing
    port: 5173
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})