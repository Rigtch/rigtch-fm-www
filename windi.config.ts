import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  extract: {
    include: ['**/*.{js,ts,jsx,tsx}'],
    exclude: ['node_modules', '.git', '.next'],
  },
})
