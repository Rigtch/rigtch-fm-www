import StylelintPlugin from 'stylelint-webpack-plugin'

import './app/config/env.js'

/** @type {import('next').NextConfig} */
export default {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'iili.io',
        port: '',
      },
    ],
  },
}
