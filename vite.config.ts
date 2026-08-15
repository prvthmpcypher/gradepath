import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        calculator: resolve(__dirname, 'calculator.html'),
        about: resolve(__dirname, 'about.html'),
        docs: resolve(__dirname, 'docs.html'),
        contact: resolve(__dirname, 'contact.html'),
      },
    },
  },
});
