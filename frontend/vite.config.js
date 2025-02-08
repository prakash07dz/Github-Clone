import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(),
    tailwindcss(),
  ],
  base: '/',
  server: {
    // Enable history mode for React Router
    hmr: true,
  },
  build: {
    outDir: 'dist',
  },
});
