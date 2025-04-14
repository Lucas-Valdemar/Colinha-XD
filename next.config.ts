import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias['pdfjs-dist'] = 'pdfjs-dist/build/pdf.js';
    }
    return config;
  },
};

export default nextConfig;