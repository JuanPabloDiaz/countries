/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: process.env.NODE_ENV === 'production',
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
        hostname: 'res.cloudinary.com',
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
