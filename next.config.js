/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      'localhost',
      'raw.githubusercontent.com',
      'storage.googleapis.com'
    ]
  }
}

module.exports = nextConfig
