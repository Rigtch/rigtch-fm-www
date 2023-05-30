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
