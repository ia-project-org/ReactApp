import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react'
import path from 'path'

// Vitest configuration
export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    globals: true,            // Enable globals like `describe`, `it`, `expect`
    environment: 'jsdom',      // Ensure jsdom is used for DOM testing
    setupFiles: './src/setupTests.ts', // Automatically import necessary setups
    coverage: {
      reporter: ['text', 'lcov'],
    },
  },
})
