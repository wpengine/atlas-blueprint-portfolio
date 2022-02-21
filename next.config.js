const { withFaust } = require('@faustjs/next');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    "includePaths": [ "node_modules" ]
  }
}

module.exports = withFaust(nextConfig);
