import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from "node:path";
import {viteStaticCopy} from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: './src/assets/**/*',  // Changé pour inclure les sous-dossiers
          dest: 'assets'         // Chemin de destination explicite
        }
      ],
      hook: 'writeBundle' // S'assure que la copie se fait à la fin du build
    })
  ],
  define: {
    'global': 'window',
    'process.env': {}
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      'global': 'window',
      'process': 'process/browser'
    },
  },
  build: {

    chunkSizeWarningLimit: 1000,
    manifest: true,
    rollupOptions: {
      input: './index.html',
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
  optimizeDeps: {
    include: ['sockjs-client']
  }
});