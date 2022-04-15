// eslint-disable-next-line

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  /* config options here */
  compress: true,
  swcMinify: true,
  async headers() {
    return [
      {
        source: '/font/font.woff2',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
