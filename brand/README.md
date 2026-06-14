# CancunToGo — Brand assets

The complete logo set for CancunToGo. Every asset is generated from the same mark: the **Georgia wordmark** + **amber sun** + **pale-blue waves**.

## Colors

| Token | Hex       | Use |
|-------|-----------|-----|
| Deep  | `#005F87` | Primary background, wordmark on light |
| Pale  | `#90D7EC` | Waves, "ToGo" accent on dark |
| Amber | `#E8A838` | Sun, "ToGo" accent on light, CTAs |
| Ink   | `#181F26` | Body text, monochrome-black logo |

**Typeface:** wordmark is Georgia (serif), bold. UI/body uses Plus Jakarta Sans.

## Logo files (vector — source of truth)

| File | Use |
|------|-----|
| `logo-primary.svg` | Primary stacked logo, for **dark / deep-blue** backgrounds (white wordmark). |
| `logo-primary-light.svg` | Stacked logo, for **light / white** backgrounds (deep-blue wordmark). |
| `logo-horizontal.svg` | Horizontal lockup (icon + wordmark) for dark backgrounds — headers, email signatures. |
| `logo-horizontal-light.svg` | Horizontal lockup for light backgrounds. |
| `logo-mono-white.svg` | Single-color white — photos, overlays, one-color print. |
| `logo-mono-black.svg` | Single-color ink (`#181F26`). |
| `icon.svg` | Icon / submark (sun + waves only), transparent, for dark backgrounds. |
| `icon-light.svg` | Icon / submark for light backgrounds. |
| `app-icon.svg` | Full-bleed square tile (deep-blue bg) — master for Apple touch & PWA icons. |

## Favicon & app icons (raster — generated)

Generated into the **repo root** (where the site references them) and `brand/`:

| File | Size | Use |
|------|------|-----|
| `../favicon.svg` | vector | Modern browsers (rounded-square tile). |
| `../favicon-32.png`, `../favicon-16.png` | 32, 16 | PNG fallback. |
| `../favicon.ico` | 16/32/48 | Legacy browsers. |
| `../apple-touch-icon.png` | 180 | iOS home screen. |
| `icon-192.png`, `icon-512.png` | 192, 512 | PWA / Android. |
| `avatar-512.png` | 512 | Social profile avatar. |

## Regenerating the raster icons

The PNG/ICO files are built from `../favicon.svg` (rounded tile) and `app-icon.svg` (full-bleed tile):

```bash
npm install      # one-time, installs sharp + png-to-ico
npm run build:icons
```

Edit the SVGs, then re-run `npm run build:icons` to refresh every raster.

> **Note:** The wordmark logos are intentionally vector-only. Georgia renders differently across rasterizers, so the SVGs are the faithful source — export PNGs from a Georgia-capable tool (browser, Figma, Canva) if you need raster wordmark files.
