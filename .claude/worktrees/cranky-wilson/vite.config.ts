import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        // Separa vendor code do código da aplicação para melhor cache entre deploys.
        // Quando apenas o código do site muda, o browser reutiliza os chunks de vendor.
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-ui': [
            'lucide-react',
            'yet-another-react-lightbox',
            'react-compare-slider',
            'sonner',
          ],
        },
      },
    },
  },
})
