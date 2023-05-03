import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/anti-ocr/',
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
