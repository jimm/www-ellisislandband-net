import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
      // Externalize React to use CDN version
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
});
