/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async rewrites() {
    return [
      {
        source: '/courses/:id/checkout',
        destination: '/courses/checkout',
      },
    ];
  },
};

module.exports = nextConfig;
