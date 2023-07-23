/// <reference types="vitest" />

import { fileURLToPath } from 'url'

import { defineConfig } from 'vitest/config'
import React from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [React()],
  resolve: {
    alias: [
      {
        find: '~',
        replacement: fileURLToPath(new URL('src', import.meta.url)),
      },
      {
        find: '@pages',
        replacement: fileURLToPath(new URL('src/pages', import.meta.url)),
      },
      {
        find: '@components',
        replacement: fileURLToPath(new URL('src/components', import.meta.url)),
      },
      {
        find: '@api',
        replacement: fileURLToPath(new URL('src/api', import.meta.url)),
      },
      {
        find: '@utils',
        replacement: fileURLToPath(new URL('src/utils', import.meta.url)),
      },
      {
        find: '@hooks',
        replacement: fileURLToPath(new URL('src/hooks', import.meta.url)),
      },
      {
        find: '@styles',
        replacement: fileURLToPath(new URL('src/styles', import.meta.url)),
      },
      {
        find: '@types',
        replacement: fileURLToPath(new URL('src/types', import.meta.url)),
      },
    ],
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.ts',
    coverage: {
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        '**/node_modules/**',
        '**/modules/**',
        '**/*.spec.ts',
        '**/*.spec.tsx',
      ],
    },
    exclude: ['**/tests/**', '**/tests-examples/**', '**/node_modules/**'],
  },
})
