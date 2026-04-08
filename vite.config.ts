import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 1100,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined

          if (
            id.includes('/react/') ||
            id.includes('/react-dom/') ||
            id.includes('/react-router-dom/')
          ) {
            return 'vendor-react'
          }

          if (id.includes('/framer-motion/')) {
            return 'vendor-motion'
          }

          if (
            id.includes('/@react-three/drei/') ||
            id.includes('/three-stdlib/') ||
            id.includes('/camera-controls/') ||
            id.includes('/maath/') ||
            id.includes('/meshline/') ||
            id.includes('/troika-three-text/') ||
            id.includes('/troika-three-utils/') ||
            id.includes('/troika-worker-utils/') ||
            id.includes('/suspend-react/') ||
            id.includes('/@react-three/fiber/') ||
            id.includes('/react-reconciler/') ||
            id.includes('/its-fine/') ||
            id.includes('/react-use-measure/')
          ) {
            return 'vendor-three-react'
          }

          if (id.includes('/three/')) {
            return 'vendor-three-core'
          }

          return undefined
        },
      },
    },
  },
})
