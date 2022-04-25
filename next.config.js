// eslint-disable-next-line

// https://github.com/serverless-nextjs/serverless-next.js/issues/1749
// const CopyWebpackPlugin = require('copy-webpack-plugin')

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  /* config options here */
  reactStrictMode: true,
  compress: true,
  swcMinify: true,
  env: {
    S3_UPLOAD_KEY: process.env.S3_UPLOAD_KEY,
    S3_UPLOAD_SECRET: process.env.S3_UPLOAD_SECRET,
    S3_UPLOAD_BUCKET: process.env.S3_UPLOAD_BUCKET,
    S3_UPLOAD_REGION: process.env.S3_UPLOAD_REGION,
    DATABASE_URL_WITH_SCHEMA: process.env.DATABASE_URL_WITH_SCHEMA,
    DATABASE_URL: process.env.DATABASE_URL,
    SHADOW_DATABASE_URL: process.env.SHADOW_DATABASE_URL,
    EMAIL_SERVER_USER: process.env.EMAIL_SERVER_USER,
    EMAIL_SERVER_PASSWORD: process.env.EMAIL_SERVER_PASSWORD,
    EMAIL_SERVER_HOST: process.env.EMAIL_SERVER_HOST,
    EMAIL_SERVER_PORT: process.env.EMAIL_SERVER_PORT,
    EMAIL_FROM: process.env.EMAIL_FROM,
    AUTH_GITHUB_ID: process.env.AUTH_GITHUB_ID,
    AUTH_GITHUB_SECRET: process.env.AUTH_GITHUB_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_URL_INTERNAL: process.env.NEXTAUTH_URL_INTERNAL,
    SECRET: process.env.SECRET,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    PRISMA_QUERY_ENGINE_BINARY: process.env.PRISMA_QUERY_ENGINE_BINARY,
  },
  target: 'experimental-serverless-trace',
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('_http_common')
    }
    return config
  },
  // webpack: (config, { isServer }) => {
  //   if (isServer) {
  //     config.externals.push('_http_common')
  //   }
  //   config.plugins.push(
  //     new CopyWebpackPlugin({
  //       patterns: [
  //         {
  //           from: '../../node_modules/.prisma/client/schema.prisma',
  //           to: './',
  //         },
  //         {
  //           from: '../../node_modules/.prisma/client/libquery_engine-rhel-openssl-1.0.x.so.node',
  //           to: './',
  //         },
  //       ],
  //     })
  //   )
  //   return config
  // },
}

module.exports = nextConfig
