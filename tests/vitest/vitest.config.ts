// import utils
import path from 'node:path';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@packages/ui': path.resolve(__dirname, '../../packages/ui/src'),
      '@packages/validators': path.resolve(
        __dirname,
        '../../packages/validators/src'
      ),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      lines: 80,
      functions: 80,
      branches: 75,
      statements: 80,
      include: ['../../apps/*/src/**', '../../packages/*/src/**'],
      exclude: ['**/*.test.ts', '**/*.test.tsx', '**/*.config.*'],
    },
  },
});
