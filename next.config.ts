import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  env:{
    AUTH_NEXT_URL:process.env.AUTH_NEXT_URL
  }
};

export default nextConfig;
