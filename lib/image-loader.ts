import { asset } from "@/lib/asset";
import manifest from "@/lib/image-manifest.json";

type LoaderProps = { src: string; width: number; quality?: number };

const sizes = manifest as Record<string, number[]>;

/**
 * Static hosting has no resizer, so scripts/optimize-images.mjs pre-builds WebP
 * copies at set widths. Serve the smallest one that covers the requested width
 * (or the largest there is). Images not in the manifest are served as-is.
 */
export default function imageLoader({ src, width }: LoaderProps) {
  const widths = sizes[src];
  if (!widths) {
    const url = src.startsWith("/") ? asset(src) : src;
    return `${url}?w=${width}`;
  }
  const pick = widths.find((w) => w >= width) ?? widths[widths.length - 1];
  return asset(`/_img${src.replace(/\.[^.]+$/, "")}-${pick}.webp`);
}
