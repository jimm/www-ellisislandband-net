import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Define process.env for browser compatibility
    'process.env.NODE_ENV': JSON.stringify('production')
  },
  build: {
    // Output to js/dist directory so Jekyll can include it
    outDir: 'js/dist',
    rollupOptions: {
      input: {
        schedule: resolve(__dirname, 'src/schedule/index.jsx'),
        'song-list': resolve(__dirname, 'src/song-list/index.jsx'),
        'image-modal': resolve(__dirname, 'src/shared/index.jsx')
      },
      output: {
        // Use ES modules format (supported by all modern browsers)
        format: 'es',
        entryFileNames: '[name].bundle.js'
      }
    }
  }
});
