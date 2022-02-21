const { withFaust } = require('@faustjs/next');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    "includePaths": [ "node_modules" ]
  },
  images: {
    domains: ['localhost']
  }
}

module.exports = withFaust(nextConfig);
