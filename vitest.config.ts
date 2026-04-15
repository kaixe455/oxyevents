import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'happy-dom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        '.astro/',
        '**/*.config.*',
        '**/mockData.ts',
        '**/*.d.ts',
      ],
    },
    include: ['src/**/*.test.ts', 'src/**/*.test.js', 'tests/**/*.test.ts'],
    exclude: ['node_modules', 'dist', '.astro'],
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@layouts': path.resolve(__dirname, './src/layouts'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@buttons': path.resolve(__dirname, './src/components/buttons'),
      '@forms': path.resolve(__dirname, './src/components/forms'),
      '@modals': path.resolve(__dirname, './src/components/modals'),
    },
  },
});
