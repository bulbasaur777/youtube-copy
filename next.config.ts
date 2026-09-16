import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "astatic.trovocdn.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.trovo.live",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
