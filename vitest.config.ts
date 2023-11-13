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
        replacement: fileURLToPath(new URL('', import.meta.url)),
      },
      {
        find: '@pages',
        replacement: fileURLToPath(new URL('pages', import.meta.url)),
      },
      {
        find: '@layouts',
        replacement: fileURLToPath(new URL('layouts', import.meta.url)),
      },
      {
        find: '@sections',
        replacement: fileURLToPath(new URL('sections', import.meta.url)),
      },
      {
        find: '@components',
        replacement: fileURLToPath(new URL('components', import.meta.url)),
      },
      {
        find: '@context',
        replacement: fileURLToPath(new URL('context', import.meta.url)),
      },
      {
        find: '@hooks',
        replacement: fileURLToPath(new URL('hooks', import.meta.url)),
      },
      {
        find: '@config',
        replacement: fileURLToPath(new URL('config', import.meta.url)),
      },
      {
        find: '@api',
        replacement: fileURLToPath(new URL('api', import.meta.url)),
      },
      {
        find: '@common',
        replacement: fileURLToPath(new URL('common', import.meta.url)),
      },
      {
        find: '@utils',
        replacement: fileURLToPath(new URL('utils', import.meta.url)),
      },
      {
        find: '@assets',
        replacement: fileURLToPath(new URL('assets', import.meta.url)),
      },
      {
        find: '@styles',
        replacement: fileURLToPath(new URL('styles', import.meta.url)),
      },
      {
        find: '@types',
        replacement: fileURLToPath(new URL('types', import.meta.url)),
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
      ],
      all: true,
    },
    exclude: ['**/tests/**', '**/tests-examples/**', '**/node_modules/**'],
  },
})
