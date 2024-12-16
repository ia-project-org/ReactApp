import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from "node:path";

// https://vitejs.dev/config/
  export default defineConfig({
    plugins: [react()],
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
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/setupTests.ts'],
    },

    build: {
      // generate .vite/manifest.json in outDir
      manifest: true,
      rollupOptions: {
        // overwrite default .html entry
        input: './src/main.tsx',
      },
    },
    optimizeDeps: {
      include: ['sockjs-client']
    }
});