 import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Any request from the frontend that starts with "/api"
      // will be forwarded to the backend server at localhost:5001
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
        secure: false, // Sometimes needed for localhost development
      },
    },
  },
})