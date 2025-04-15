import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias['pdfjs-dist/build/pdf'] = path.resolve(
        __dirname,
        'node_modules/pdfjs-dist/legacy/build/pdf.js'
      );
      config.resolve.alias['pdfjs-dist/build/pdf.worker.min'] = path.resolve(
        __dirname,
        'node_modules/pdfjs-dist/legacy/build/pdf.worker.min.js'
      );
    }
    return config;
  },
};

export default nextConfig;