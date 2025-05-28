// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true, // auto-open browser on dev start
  },
  build: {
    outDir: 'dist',
  },
});
