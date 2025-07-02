import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    port: 8080, // hoặc port bạn đang dùng
    host: true, // để bind vào 0.0.0.0
    allowedHosts: ['swp490-ltc-admin.onrender.com'],
  }
})
