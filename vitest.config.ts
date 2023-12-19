/// <reference types="vitest" />

import { fileURLToPath } from 'url'

import { defineConfig } from 'vitest/config'
import React from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [React()],
  resolve: {
    alias: [
      {
        find: '@app',
        replacement: fileURLToPath(new URL('app', import.meta.url)),
      },
      {
        find: '@tests',
        replacement: fileURLToPath(new URL('tests', import.meta.url)),
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
        '**/.next/**',
        '**/modules/**',
        '**/pages/**',
        '**/types/**',
        '**/constants/**',
        '**/tests/**',
        '**/index.ts',
        '**/*.config.ts',
        '**/*.config.js',
        '**/*.d.ts',
        '**/*.svg.*',
        '**/*.spec.ts',
        '**/*.spec.tsx',
        '.eslintrc.cjs',
      ],
      all: true,
    },
    exclude: ['**/tests/**', '**/node_modules/**'],
  },
})
