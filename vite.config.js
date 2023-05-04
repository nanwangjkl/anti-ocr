import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/anti-ocr/',
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  plugins: [solidPlugin()]
})
