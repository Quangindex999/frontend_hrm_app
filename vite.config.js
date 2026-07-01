import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api-hr': {
        target: process.env.VITE_HR_URL || 'https://100.88.26.35:7084',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api-hr/, ''),
      },
      '/api-attend': {
        target: process.env.VITE_ATTEND_URL || 'https://100.127.134.32:7108',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api-attend/, ''),
      },
      '/api-payroll': {
        target: process.env.VITE_PAYROLL_URL || 'https://100.77.67.34:7300',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api-payroll/, ''),
      },
    },
  },
})
