/**
 * One-shot codemod: add `loading="lazy"` and `decoding="async"` to every
 * <img> tag in src/ that doesn't already declare loading. Safe to re-run.
 *
 * Run: node scripts/add-lazy-loading.mjs
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.resolve(__dirname, "..", "src");

let filesChanged = 0;
let tagsChanged = 0;

async function walk(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full);
    else if (/\.(tsx|jsx)$/.test(entry.name)) await transform(full);
  }
}

async function transform(file) {
  const code = await fs.readFile(file, "utf8");
  let changed = 0;
  // Match each <img ...> opening tag (attributes stop at the first '>').
  const next = code.replace(/<img\b([^>]*?)(\/?)>/g, (full, attrs, slash) => {
    if (/\bloading\s*=/.test(attrs)) return full;        // already has it
    changed++;
    return `<img loading="lazy" decoding="async"${attrs}${slash}>`;
  });
  if (changed) {
    await fs.writeFile(file, next);
    filesChanged++;
    tagsChanged += changed;
    console.log(`${path.relative(SRC, file).padEnd(34)} +${changed}`);
  }
}

await walk(SRC);
console.log(`\nDone. Added lazy loading to ${tagsChanged} <img> tags across ${filesChanged} files.`);
