/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["localhost", "raw.githubusercontent.com"],
  },
};

module.exports = nextConfig;
