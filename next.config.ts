import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  turbopack: { root: path.join(__dirname) },
};

export default nextConfig;
