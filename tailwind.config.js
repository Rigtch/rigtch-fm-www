/**
 * @type {import('@types/tailwindcss/tailwind-config').TailwindConfig}
 */
module.exports = {
  content: [
    '**/*.{ts,tsx}',
    './public/**/*.html',
    './node_modules/flowbite-react/**/*.js',
  ],
  plugins: [require('flowbite/plugin')],
  theme: {
    extends: require('./src/config/colors').colors,
  },
}
