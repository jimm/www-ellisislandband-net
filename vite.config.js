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
    // Generate library mode output
    lib: {
      entry: resolve(__dirname, 'src/schedule/index.jsx'),
      name: 'ScheduleApp',
      formats: ['iife'], // Immediately Invoked Function Expression for browser
      fileName: 'schedule.bundle'
    },
    rollupOptions: {
      output: {
        // Ensure bundle is self-contained
        inlineDynamicImports: true
      }
    }
  }
});
