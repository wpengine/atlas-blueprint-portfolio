const { withFaust, getWpHostname } = require('@faustwp/core');

/**
 * @type {import('next').NextConfig}
 **/
module.exports = withFaust({
  reactStrictMode: true,
  sassOptions: {
    includePaths: ['node_modules'],
    quietDeps: true,
    silenceDeprecations: ['import', 'global-builtin'],
  },
  images: {
    remotePatterns: [
      {
        hostname: getWpHostname(),
      },
    ],
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
});
