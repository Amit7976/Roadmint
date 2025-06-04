// next.config.js

const withPWA = require("next-pwa")({
    dest: "public",
    register: true,
    skipWaiting: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
    reactStrictMode: true,
    // Other config options
});

module.exports = nextConfig;
  