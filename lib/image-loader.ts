import { asset } from "@/lib/asset";

type LoaderProps = { src: string; width: number; quality?: number };

/** Static hosting has no resizer: serve the original file; width only varies the cache key. */
export default function imageLoader({ src, width }: LoaderProps) {
  const url = src.startsWith("/") ? asset(src) : src;
  return `${url}?w=${width}`;
}
