import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@vercel/analytics/react"],
  },
};

export default nextConfig;
