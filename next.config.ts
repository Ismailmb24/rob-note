import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // ... other configurations ...
  lint: {
    ignoreDuringBuilds: true,
    ignoreFile: '.eslintignore',
  },
  ignorePath: '.eslintignore',
};

export default nextConfig;
