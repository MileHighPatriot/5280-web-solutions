import type { Metadata } from "next";
import { ogCopy } from "@/data/og";
import { openGraphBase, site } from "@/data/site";

/**
 * Page metadata with its own share card. `path` has a trailing slash and is the canonical, so og:url
 * always equals the canonical. Share copy comes from data/og.ts; a path with no entry there returns no
 * openGraph/twitter, so the page keeps the layout's shared card.
 *
 * Next replaces a parent's whole `openGraph` / `twitter` object (shallow merge), so openGraphBase and the
 * twitter card and image are spread back in here.
 */
export function pageMeta({
  title,
  description,
  path,
}: {
  title?: Metadata["title"];
  description?: string;
  path: string;
}): Metadata {
  const meta: Metadata = { alternates: { canonical: path } };
  if (title !== undefined) meta.title = title;
  if (description !== undefined) meta.description = description;
  const og = ogCopy[path];
  if (!og) return meta;
  const url = new URL(path, site.url).toString();
  return {
    ...meta,
    openGraph: { ...openGraphBase, title: og.title, description: og.description, url },
    twitter: { card: "summary_large_image", title: og.title, description: og.description, images: ["/og.png"] },
  };
}
