import path from "node:path";
import type { NextConfig } from "next";

// `npm run pages` builds the live site for 5280webs.com (served by GitHub Pages from docs/,
// with public/CNAME). GITHUB_PAGES=true builds the old github.io preview under /5280-web-solutions
// instead; it's only useful if the custom domain is ever removed.
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
