#!/usr/bin/env node
/**
 * Vendors the six self-hosted webfont weights from @fontsource into
 * public/fonts, where they get stable, preloadable URLs.
 *
 * Run after bumping any @fontsource package.
 */
import { copyFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const OUT = join(ROOT, "public", "fonts");

const FILES = [
  ["inter", "inter-latin-400-normal.woff2"],
  ["inter", "inter-latin-500-normal.woff2"],
  ["inter", "inter-latin-600-normal.woff2"],
  ["inter-tight", "inter-tight-latin-600-normal.woff2"],
  ["inter-tight", "inter-tight-latin-700-normal.woff2"],
  ["jetbrains-mono", "jetbrains-mono-latin-500-normal.woff2"],
];

mkdirSync(OUT, { recursive: true });

for (const [pkg, file] of FILES) {
  copyFileSync(join(ROOT, "node_modules", "@fontsource", pkg, "files", file), join(OUT, file));
  console.log(`✓ ${file}`);
}
