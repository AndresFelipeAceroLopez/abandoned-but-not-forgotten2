import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Sitio estático: GitHub Pages / Netlify / Vercel. Cambia `base` si se publica en un subdirectorio.
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three', '@react-three/fiber', '@react-three/drei'],
        },
      },
    },
  },
});
