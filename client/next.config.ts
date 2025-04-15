import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gotrip-appdir.vercel.app',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
      }
    ],
  },
};

export default nextConfig;
