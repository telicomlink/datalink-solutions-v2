#!/usr/bin/env node
/**
 * Design-system guard. Runs before every build.
 *
 * Fails the build on the things that are easy to reintroduce by accident and
 * expensive to find later:
 *   1. href="#"                       — dead links must never ship
 *   2. hex colours outside tokens.css — one source of truth for colour
 *   3. raw px/rem in utility classes  — spacing and sizing come from tokens
 *
 * Spacing itself is enforced structurally: styles.css sets `--spacing: initial`
 * and re-declares only the allowed steps, so off-scale utilities (p-5, gap-3.5)
 * cannot be generated at all.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const TOKENS_FILE = join("src", "styles", "tokens.css");

/** Non-token literals that are legitimately not spacing or colour. */
const ALLOWED_ARBITRARY = [
  /^\d+(\.\d+)?px$/, // hairlines and blur radii — see ALLOWED_PX below
  /^var\(--tl-/, // token reference
  /^calc\(/, // token arithmetic
  /^color-mix\(/, // token alpha derivation
  /^color:var\(--tl-/, // text-[color:var(--tl-…)]
  /^\d+(\.\d+)?\/\d+(\.\d+)?$/, // aspect ratios: 4/3, 16/9, 16/10
  /^\d+ch$/, // measure caps: 20ch, 60ch
  /^\d+fr_/, // grid templates
  /^current=page$/, // aria variant
  /^[a-z-]+(,[a-z-]+)+$/, // transition-property lists, not values
];

/** The only bare px values allowed: rule thickness and the blur radius. */
const ALLOWED_PX = new Set(["1px", "2px", "12px", "10px", "14px", "18px", "28px"]);

const files = [];
(function walk(dir) {
  for (const entry of readdirSync(dir)) {
    if (entry === "node_modules" || entry === "dist" || entry.startsWith(".")) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full);
    else if (/\.(tsx?|css|html)$/.test(full)) files.push(full);
  }
})(ROOT);

const errors = [];
const add = (file, line, msg) =>
  errors.push(`${relative(ROOT, file).split(sep).join("/")}:${line}  ${msg}`);

for (const file of files) {
  const rel = relative(ROOT, file);
  const isTokens = rel === TOKENS_FILE;
  const isGenerated = rel.includes("routeTree.gen");
  if (isGenerated) continue;

  const lines = readFileSync(file, "utf8").split(/\r?\n/);

  lines.forEach((text, i) => {
    const n = i + 1;

    // 1. dead links
    if (/href=["']#["']/.test(text)) add(file, n, `dead link: href="#"`);

    // 2. hex colours
    if (!isTokens) {
      for (const hex of text.match(/#[0-9a-fA-F]{3,8}\b/g) ?? []) {
        // index.html theme-color is documented as the one exception.
        if (rel.endsWith("index.html") && /theme-color/.test(text)) continue;
        add(file, n, `hardcoded hex ${hex} — move it to ${TOKENS_FILE}`);
      }
    }

    // 3. raw values in Tailwind arbitrary brackets
    for (const match of text.match(/(?:^|[\s"'`])[a-z-]+-\[([^\]]+)\]/g) ?? []) {
      const value = match.slice(match.indexOf("[") + 1, -1);
      if (ALLOWED_ARBITRARY.some((re) => re.test(value))) {
        if (/^\d+(\.\d+)?px$/.test(value) && !ALLOWED_PX.has(value)) {
          add(file, n, `raw px "${value}" — use a spacing or radius token`);
        }
        continue;
      }
      add(file, n, `non-token arbitrary value "${value}"`);
    }
  });
}

/*
 * 4. Every spacing step a component uses must exist in the theme.
 *
 * `--spacing: initial` means Tailwind cannot derive steps on the fly, so a
 * utility with an undeclared step is silently dropped from the stylesheet
 * instead of erroring. That is how `inset-x-0` went missing and collapsed the
 * fixed header into a shrink-to-fit box packed against the left edge.
 */
const SPACING_PREFIXES = [
  "p", "px", "py", "pt", "pb", "pl", "pr",
  "m", "mx", "my", "mt", "mb", "ml", "mr",
  "gap", "gap-x", "gap-y", "space-x", "space-y",
  "inset", "inset-x", "inset-y", "top", "bottom", "left", "right",
  "w", "h", "size", "min-w", "min-h", "max-w", "max-h",
  "translate-x", "translate-y", "basis",
];

const declared = new Set(
  [...readFileSync(join(ROOT, "src", "styles.css"), "utf8").matchAll(/--spacing-(\d+):/g)].map(
    (m) => m[1],
  ),
);

const utilityRe = new RegExp(
  `(?:^|[\\s"'\`])-?(${SPACING_PREFIXES.join("|")})-(\\d+(?:\\.\\d+)?)(?=$|[\\s"'\`])`,
  "g",
);

for (const file of files.filter((f) => f.endsWith(".tsx"))) {
  readFileSync(file, "utf8")
    .split(/\r?\n/)
    .forEach((text, i) => {
      for (const [, prefix, step] of text.matchAll(utilityRe)) {
        if (!declared.has(step)) {
          add(
            file,
            i + 1,
            `"${prefix}-${step}" has no --spacing-${step} — Tailwind will drop this utility silently`,
          );
        }
      }
    });
}

if (errors.length) {
  console.error(`\n✗ design-system check failed (${errors.length} issue(s)):\n`);
  for (const e of errors) console.error(`  ${e}`);
  console.error("");
  process.exit(1);
}

console.log("✓ design-system check passed");
