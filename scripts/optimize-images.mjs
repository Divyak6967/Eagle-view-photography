/**
 * In-place image optimizer for the photography site.
 *
 * What it does:
 *   - Walks public/Images recursively.
 *   - Backs up every original (untouched) to image-originals-backup/ at the
 *     repo root (this folder is git-ignored and NOT deployed).
 *   - Resizes anything wider/taller than MAX_EDGE down to MAX_EDGE.
 *   - Re-encodes JPG/PNG in place at sensible quality (same filename, so NO
 *     code references break).
 *   - Also emits a .webp sibling next to each image for <picture> use.
 *
 * Run:  npm run optimize:images
 * Safe to re-run: it skips files it has already processed (originals are read
 * from the backup, so quality never degrades on a second pass).
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SRC_DIR = path.join(ROOT, "public", "Images");
const BACKUP_DIR = path.join(ROOT, "image-originals-backup");

const MAX_EDGE = 2000;        // longest side in px — plenty for full-screen display
const JPEG_QUALITY = 80;
const WEBP_QUALITY = 78;
const PNG_COMPRESSION = 9;

const RASTER = new Set([".jpg", ".jpeg", ".png"]);

let totalBefore = 0;
let totalAfter = 0;
let count = 0;

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(full);
    } else {
      await process(full);
    }
  }
}

async function process(file) {
  const ext = path.extname(file).toLowerCase();
  if (!RASTER.has(ext)) return;

  const rel = path.relative(SRC_DIR, file);
  const backupPath = path.join(BACKUP_DIR, rel);

  // Ensure we always optimize from the pristine original.
  let sourcePath = file;
  try {
    await fs.access(backupPath);
    sourcePath = backupPath;                 // already backed up → re-encode from backup
  } catch {
    await fs.mkdir(path.dirname(backupPath), { recursive: true });
    await fs.copyFile(file, backupPath);     // first run → save pristine copy
  }

  const beforeBytes = (await fs.stat(sourcePath)).size;

  const base = sharp(sourcePath, { failOn: "none" })
    .rotate()                                // respect EXIF orientation
    .resize(MAX_EDGE, MAX_EDGE, { fit: "inside", withoutEnlargement: true });

  // 1) Re-encode in place, same extension (keeps every <img src> working).
  const tmp = file + ".tmp";
  if (ext === ".png") {
    await base.clone().png({ compressionLevel: PNG_COMPRESSION, palette: true }).toFile(tmp);
  } else {
    await base.clone().jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toFile(tmp);
  }
  await fs.rename(tmp, file);

  // 2) Emit a .webp sibling (e.g. img1.jpg -> img1.webp).
  const webpPath = file.slice(0, -ext.length) + ".webp";
  await base.clone().webp({ quality: WEBP_QUALITY }).toFile(webpPath);

  const afterBytes = (await fs.stat(file)).size;
  totalBefore += beforeBytes;
  totalAfter += afterBytes;
  count++;
  const pct = ((1 - afterBytes / beforeBytes) * 100).toFixed(0);
  console.log(
    `${rel.padEnd(40)} ${(beforeBytes / 1048576).toFixed(2)}MB -> ${(afterBytes / 1048576).toFixed(2)}MB  (-${pct}%)`
  );
}

console.log(`Optimizing images in ${SRC_DIR}\nOriginals backed up to ${BACKUP_DIR}\n`);
await walk(SRC_DIR);
console.log(
  `\nDone. ${count} images: ${(totalBefore / 1048576).toFixed(1)}MB -> ${(totalAfter / 1048576).toFixed(1)}MB ` +
  `(${((1 - totalAfter / totalBefore) * 100).toFixed(0)}% smaller). WebP siblings also written.`
);
