import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  devIndicators: {
    buildActivity: true,
    buildActivityPosition: 'bottom-right',
  },
};

module.exports = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
