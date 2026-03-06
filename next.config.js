/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["i.imgur.com"],
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
