import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // GitHub Pages deployment configuration
  // For user/org pages (username.github.io): use '/'
  // For project pages (username.github.io/repo-name): use '/repo-name/'
  base: '/',

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Generate source maps for debugging (optional, disable for smaller builds)
    sourcemap: false,
    // Optimize build
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true,
      },
    },
    // Chunk size warnings
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
        },
      },
    },
  },

  server: {
    port: 5173,
    open: true,
  },

  preview: {
    port: 4173,
    open: true,
  },
})
