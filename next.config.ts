import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
    remotePatterns:[
      {
        protocol:'https',
        hostname:'links.papareact.com',
        pathname:'/**'
      },
      {
        protocol:'https',
        hostname:'logos-world.net',
        pathname:'/**'
      }
    ]
  }
};

export default nextConfig;
