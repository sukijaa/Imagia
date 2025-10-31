import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // This is the new part for Shadcn aliasing
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // This is the new part for the proxy
  server: {
    proxy: {
      // Send all /api requests to our backend
      '/api': {
        target: 'http://localhost:8000', // Our backend port
        changeOrigin: true,
        secure: false,
      },
    },
  },
})