import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vite.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ['react-helmet-async']
  },
  plugins: [react()],
})
