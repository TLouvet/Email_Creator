import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Email_Creator',
  resolve: {
    alias: {
      '@app': '/src',
    },
  },
});
