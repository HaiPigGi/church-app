/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'config.api.parokistmarkusmelak.org',
        port: '',
      },
    ],
  },
};

module.exports = nextConfig;
