/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["en-US"],
    defaultLocale: "en-US",
  },
  env: {
    BACKEND_URL: "http://localhost:8080",
  },
  serverRuntimeConfig: {
    BACKEND_URL: "http://localhost:8080",
  },
  images: {
    domains: ["localhost"],
  },
};

module.exports = nextConfig;
