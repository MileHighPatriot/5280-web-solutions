import path from "node:path";
import type { NextConfig } from "next";

// `npm run pages` builds a preview for https://milehighpatriot.github.io/5280-web-solutions/.
// A normal build targets the real domain (5280webs.com) at the root.
const isPagesPreview = process.env.GITHUB_PAGES === "true";
const basePath = isPagesPreview ? "/5280-web-solutions" : "";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  output: "export",
  images: { loader: "custom", loaderFile: "./lib/image-loader.ts" },
  trailingSlash: true,
  turbopack: { root: path.join(__dirname) },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  ...(isPagesPreview ? { basePath, assetPrefix: basePath } : {}),
};

export default nextConfig;
