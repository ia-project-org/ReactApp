import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from "node:path";
import {viteStaticCopy} from "vite-plugin-static-copy";
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
 plugins: [
   react(),
   nodePolyfills({
     include: ['buffer', 'process', 'util', 'stream'],
     globals: {
       Buffer: true,
       global: true,
       process: true,
     },
   }),
   viteStaticCopy({
     targets: [{ 
       src: './src/assets/**/*',
       dest: 'assets'
     }],
     hook: 'writeBundle'
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
   include: ['sockjs-client']
 }
});