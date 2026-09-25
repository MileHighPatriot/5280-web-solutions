// Pre-builds resized WebP copies of every photo in /public, because static hosting
// (GitHub Pages) has no image resizer. lib/image-loader.ts then serves the smallest
// copy that covers the width the browser asks for.
//
//   public/work/foo.jpg  ->  public/_img/work/foo-384.webp, foo-750.webp, ...
//   lib/image-manifest.json lists the widths made for each image.
//
// Runs before `dev`, `build`, and `pages`. Images whose copies are already newer
// than the original are skipped, so it's fast after the first run.
import { mkdir, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const publicDir = path.join(root, "public");
const outDir = path.join(publicDir, "_img");
const manifestPath = path.join(root, "lib", "image-manifest.json");

// Matches Next's default deviceSizes/imageSizes that the loader is asked for.
const WIDTHS = [256, 384, 640, 750, 828, 1080, 1200, 1920];
const QUALITY = 76;

async function* photos(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (full !== outDir) yield* photos(full);
    } else if (/\.(jpe?g|png)$/i.test(entry.name) && entry.name !== "logo.png") {
      yield full;
    }
  }
}

const mtime = (file) =>
  stat(file).then(
    (s) => s.mtimeMs,
    () => 0,
  );

const manifest = {};
let made = 0;

for await (const file of photos(publicDir)) {
  const rel = "/" + path.relative(publicDir, file).split(path.sep).join("/");
  const { width: original } = await sharp(file).metadata();
  const widths = [...WIDTHS.filter((w) => w < original), original];
  manifest[rel] = widths;

  const base = path.join(outDir, rel.replace(/\.[^.]+$/, ""));
  await mkdir(path.dirname(base), { recursive: true });
  const sourceTime = await mtime(file);
  for (const width of widths) {
    const target = `${base}-${width}.webp`;
    if ((await mtime(target)) > sourceTime) continue;
    await sharp(file).resize({ width }).webp({ quality: QUALITY }).toFile(target);
    made++;
  }
}

await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
console.log(`optimize-images: ${Object.keys(manifest).length} images, ${made} new WebP files`);
