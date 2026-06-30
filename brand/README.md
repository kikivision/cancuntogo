# CancunToGo — Brand assets

The CancunToGo identity is built on one mark: **three waves**. It stays
constant; colour, warmth and scale flex by context.

## Colours

| Token | Hex | Use |
|-------|-----------|-----|
| Deep | `#08405A` | App-icon / favicon tile, dark surfaces |
| Nav blue | `#005F87` | Site navigation & hero background |
| Sunset | `#F6C45A` → `#EE8A5A` → `#2E9AB5` | **Primary** wave gradient — site, favicon, hero |
| Aqua (top→bottom) | `#9FD8E6` → `#1E7191` | Cool alternate — calmer contexts |
| Hot flamingo | `#FF9E84` → `#FB3F86` → `#DC1F72` | Party / social / promo |
| Amber | `#E8A838` | CTA buttons, accents (site) |
| Ink | `#181F26` | Body text, one-colour-black mark |

**Typeface:** wordmark is Georgia (serif), bold. UI/body uses Plus Jakarta Sans.

## The wave mark — colourways (vector, transparent)

| File | Use |
|------|-----|
| `wave-sunset.svg` | **Primary** submark — site nav, favicon, everyday. |
| `wave-aqua.svg` | Cool alternate — calmer / water-forward contexts. |
| `wave-flamingo.svg` | Party variant — social posts, promos, adults-only. |
| `wave-white.svg` | One-colour white — over photos / dark surfaces. |
| `wave-ink.svg` | One-colour deep (`#08405A`) — light surfaces, print. |
| `icon.svg` | Alias of the primary (sunset) submark. |
| `icon-light.svg` | Ink submark for light backgrounds. |

## Logo lockups (mark + wordmark)

| File | Use |
|------|-----|
| `logo-horizontal.svg` | Horizontal lockup for **dark** backgrounds. |
| `logo-horizontal-light.svg` | Horizontal lockup for **light** backgrounds. |
| `logo-primary.svg` | Stacked lockup + descriptor, dark background. |
| `logo-primary-light.svg` | Stacked lockup, light background. |
| `logo-mono-white.svg` | Single-colour white. |
| `logo-mono-black.svg` | Single-colour ink (`#181F26`). |
| `app-icon.svg` | Full-bleed square tile (deep-blue bg) — master for Apple touch & PWA icons. |

> The site nav uses an inline version of the horizontal lockup with the
> sunset gradient (`#F6C45A` → `#EE8A5A` → `#2E9AB5`), which reads warmly
> on the `#005F87` navigation bar and echoes the amber CTA buttons.

## Favicon & app icons (raster — generated)

Generated into the **repo root** and `brand/`:

| File | Size | Use |
|------|------|-----|
| `../favicon.svg` | vector | Modern browsers (rounded tile). |
| `../favicon-32.png`, `../favicon-16.png` | 32, 16 | PNG fallback. |
| `../favicon.ico` | 16/32/48 | Legacy browsers. |
| `../apple-touch-icon.png` | 180 | iOS home screen. |
| `icon-192.png`, `icon-512.png` | 192, 512 | PWA / Android. |
| `avatar-512.png` | 512 | Social profile avatar. |

## Regenerating the raster icons

The PNG/ICO files are built from `../favicon.svg` (rounded tile) and
`app-icon.svg` (full-bleed tile):

```bash
npm install      # one-time, installs sharp + png-to-ico
npm run build:icons
```

Edit the SVGs, then re-run `npm run build:icons` to refresh every raster.

> **Note:** The wordmark lockups are intentionally vector-only. Georgia renders
> differently across rasterizers, so the SVGs are the faithful source — export
> PNGs from a Georgia-capable tool (browser, Figma, Canva) if you need raster
> wordmark files.
