import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from "node:path";

// https://vitejs.dev/config/
  export default defineConfig({
  plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
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

});