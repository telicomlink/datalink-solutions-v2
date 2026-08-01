#!/usr/bin/env node
/**
 * One-shot: converts the source photography to WebP and drops the JPGs.
 * Kept in the repo so re-adding artwork follows the same path.
 */
import sharp from "sharp";
import { readdirSync, statSync, unlinkSync } from "node:fs";
import { join } from "node:path";

const DIR = "src/assets";
let before = 0;
let after = 0;

for (const file of readdirSync(DIR).filter((f) => f.endsWith(".jpg"))) {
  const src = join(DIR, file);
  const out = src.replace(/\.jpg$/, ".webp");
  const meta = await sharp(src).metadata();
  await sharp(src).webp({ quality: 78, effort: 6 }).toFile(out);

  const b = statSync(src).size;
  const a = statSync(out).size;
  before += b;
  after += a;
  console.log(
    `${file.padEnd(26)} ${meta.width}x${meta.height}  ${(b / 1024).toFixed(0)}K -> ${(a / 1024).toFixed(0)}K`,
  );
  unlinkSync(src);
}

if (before) {
  console.log(
    `\nTOTAL ${(before / 1024).toFixed(0)}K -> ${(after / 1024).toFixed(0)}K  (-${(100 - (after / before) * 100).toFixed(0)}%)`,
  );
} else {
  console.log("No JPGs left to convert.");
}
