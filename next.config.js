const { withFaust } = require('@faustjs/next');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = withFaust();
