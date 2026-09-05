import { fileURLToPath } from 'node:url';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next.js 16's supported browsers already implement the legacy ES polyfills.
  turbopack: {
    resolveAlias: {
      '../build/polyfills/polyfill-module': './lib/browser-polyfills.js',
    },
  },
  webpack(config) {
    config.resolve.alias['../build/polyfills/polyfill-module'] =
      fileURLToPath(new URL('./lib/browser-polyfills.js', import.meta.url));
    return config;
  },
  experimental: {
    inlineCss: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
