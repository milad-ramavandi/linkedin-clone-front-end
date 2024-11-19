import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: { URL: "https://linkedin-clone-ckxsagf2s-miladramavandis-projects.vercel.app"},
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "links.papareact.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "logos-world.net",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
