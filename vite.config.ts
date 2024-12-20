import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from "node:path";
import {viteStaticCopy} from "vite-plugin-static-copy";
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: './src/assets/**/*',
          dest: 'assets'
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
      'process': 'process/browser',
      crypto: 'crypto-browserify',
    },
  },
  build: {

    chunkSizeWarningLimit: 4000,
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
    include: ['sockjs-client'],
    esbuildOptions: {
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true,
        }),
        NodeModulesPolyfillPlugin(),
      ],
    },
  },
});