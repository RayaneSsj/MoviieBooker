import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',  // Assure que les chemins sont corrects
  build: {
    outDir: 'dist',  // Emplacement correct pour le build
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    port: 5173,
    open: true,
  },
  preview: {
    port: 4173,  // Port pour la prévisualisation
  },
});
