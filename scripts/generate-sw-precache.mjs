import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join, relative } from "path";

const OUT_DIR = "out";
const SW_PATH = join(OUT_DIR, "sw.js");

const PRECACHE_EXTENSIONS = new Set([
  ".html", ".js", ".css", ".json", ".txt", ".woff", ".woff2",
]);

function collectFiles(dir, base = dir) {
  const entries = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      entries.push(...collectFiles(full, base));
    } else {
      const rel = "./" + relative(base, full);
      if (rel === "./sw.js") continue;
      if (rel.endsWith(".map")) continue;
      const ext = rel.slice(rel.lastIndexOf("."));
      if (!PRECACHE_EXTENSIONS.has(ext)) continue;
      entries.push(rel);
    }
  }
  return entries;
}

const files = collectFiles(OUT_DIR);
const sw = readFileSync(SW_PATH, "utf-8");

// Replace the placeholder PRECACHE_URLS array with the full file list
const updated = sw.replace(
  /const PRECACHE_URLS = \[[\s\S]*?\];/,
  `const PRECACHE_URLS = ${JSON.stringify(files, null, 2)};`
);

writeFileSync(SW_PATH, updated);
console.log(`Precache manifest: ${files.length} files injected into sw.js`);
