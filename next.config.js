/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'Bissau.svg',
      },
    ],
  },
  // Disable static optimization for all pages to ensure fresh data
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    // Disable static generation for all pages
    appDir: true,
  }
}

module.exports = nextConfig
