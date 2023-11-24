import StylelintPlugin from 'stylelint-webpack-plugin'

/** @type {import('next').NextConfig} */
export default {
  reactStrictMode: true,
  webpack: config => {
    config.plugins.push(new StylelintPlugin())

    return config
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        port: '',
      },
    ],
  },
}
