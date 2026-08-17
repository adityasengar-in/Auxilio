import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    proxy: {
      '/llm-api': {
        target: 'https://api.x.ai',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/llm-api/, ''),
      },
    },
  },
})
