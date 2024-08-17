import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: './src/test/setup.js',
    include: ['src/**/*.spec.{js,jsx}'],
  },
  build: {
    outDir: '.vite/renderer/main_window',
    sourcemap: true,
  },
  resolve: {
    alias: {
      '@': '/src/renderer',
    },
  },
});
