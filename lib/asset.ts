const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefix a `/public` path with the base path (set for the GitHub Pages preview). */
export function asset(path: string) {
  return `${basePath}${path}`;
}
