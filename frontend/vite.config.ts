import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import {resolve} from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  preview: {
    port: 8000
  },
  server: {
    port: 8000,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://localhost:8003',
        changeOrigin: true,
      }
    }
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        'service-worker': resolve(__dirname, 'src/service-worker.ts')
      },
      output: {
        entryFileNames: chunk => {
          if (chunk.name == 'service-worker') {
            return `[name].js`
          }
          return `assets/[name].[hash].js`
        },
      }
    }
  },
  plugins: [react()],
})
