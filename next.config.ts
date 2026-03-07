import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  output: "export",
  trailingSlash: false,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  images: { unoptimized: true },
};

export default nextConfig;
