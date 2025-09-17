import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL("https://www.jdsports.cy/**")],
  },
};

export default nextConfig;
