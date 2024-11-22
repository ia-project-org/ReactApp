import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',  // Make sure jsdom is used to simulate a browser environment
    globals: true,          // This allows global usage of test, expect, and vi
    setupFiles: './setupTests.js',  // Point to your setup file
    reporters: [
      'default',
      ['junit', { suiteName: 'UI tests' }],
      'lcov',
    ],
    coverage: {
      reporter: ['lcov', 'text', 'json'], // 'lcov' generates the report in a format SonarQube can read
      all: true,
      exclude: ['node_modules/**', 'tests/**'], 
    },
  }
})
