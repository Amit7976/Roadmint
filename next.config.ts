// next.config.ts

// @ts-ignore
import withPWA from "next-pwa";
import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
};

export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
})(config);
