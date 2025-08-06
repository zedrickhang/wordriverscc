/** @type {import('next').NextConfig} */
import withPWA from 'next-pwa';
import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['html5.gamedistribution.com'],
  },
};

const pwaConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/html5\.gamedistribution\.com\/.*/i,
      handler: 'NetworkOnly',
    },
  ],
});

if (process.env.NODE_ENV === "development") {
  await setupDevPlatform();
}

export default pwaConfig(nextConfig);