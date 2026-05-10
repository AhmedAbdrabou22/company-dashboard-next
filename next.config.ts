import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     remotePatterns: [],
//   },
// };

// export default nextConfig;

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["react-icons", "recharts"],
  },
  images: {
    remotePatterns: [],
  },
};