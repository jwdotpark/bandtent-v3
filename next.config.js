// eslint-disable-next-line

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  /* config options here */
  compress: true,
  swcMinify: true,
  // webpack: (config, { isServer }) => {
  //   if (isServer) {
  //     config.externals.push('_http_common')
  //   }
  //   return config
  // },
  // target: 'serverless',
}

module.exports = nextConfig
