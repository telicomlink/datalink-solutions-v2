# Brand assets

Source artwork for the TelicomLink identity. **This folder is not served.**

It used to sit in `public/`, which meant all 55 MB of it — mockups, the
17k-pixel brand sheet, 8192px PNG/JPG exports — was copied verbatim into every
production build. Nothing here is fetched at runtime.

## What the site actually uses

The header and footer lockup is inlined as SVG in
[`src/components/site/Logo.tsx`](../src/components/site/Logo.tsx), taken from:

| Mark     | Source                                | Tightened viewBox   |
| -------- | ------------------------------------- | ------------------- |
| Icon     | `TelicomLink/Logo_Files/V2/Icon/IconLogo_SVG.svg`   | `498 574 1052 900`  |
| Wordmark | `TelicomLink/Logo_Files/V2/Title/TitleLogo_SVG.svg` | `238 924 1572 200`  |

The originals are drawn on a square 2048x2048 canvas with a large empty
margin — the icon artwork only occupies the middle ~51% x 44%. Rendering that
raw viewBox at header height is why the logo appeared cropped to half size.
Both marks are re-cut to their true bounding box so the height you set is the
height you get.

Fills use `currentColor` so the accent comes from `--tl-accent`, keeping the
build free of hardcoded hex values.

`public/favicon.png` and `public/apple-touch-icon.png` are generated from the
same icon path data.
