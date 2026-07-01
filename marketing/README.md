# Marketing templates

One set of templates for **all three sister brands** — CancunToGo,
Sky & Swim and Jet & Swim. You change the brand; the logo, colours and
wordmark change with it.

## Files

| File | What it is |
|------|------------|
| `brand-kit.js` | The shared brand registry — wordmark, logo mark and colour "moods" per brand. **Edit brands here.** |
| `instagram-post.html` | Editable 1080 × 1080 post. |
| `instagram-story.html` | Editable 1080 × 1920 story. |
| `email-header.html` | Paste-ready, email-safe header (tables + inline styles). |
| `export.mjs` | Renders the templates + transparent logo PNGs (optional helper). |
| `marks/` | Generated transparent logo PNGs (for email / Canva / decks). |
| `exports/` | Generated sample images. |

## Switching brand

In any social template, set two attributes on `<body>`:

```html
<body data-brand="skyandswim" data-mood="teal">
```

| Brand | Moods available |
|-------|-----------------|
| `cancuntogo` | `sunset` (primary), `flamingo`, `aqua` |
| `skyandswim` | `teal` (primary), `crimson` |
| `jetandswim` | `slate` *(placeholder — see below)* |

Then edit the campaign text in the marked block and export.

## Exporting

**Easiest:** open the `.html` in a browser and screenshot at the native size
(1080×1080 for posts, 1080×1920 for stories).

**Scripted:** `node marketing/export.mjs` (needs `npm i -D playwright`) renders
the sample set into `exports/` and the transparent logo marks into `marks/`.

For **email**, copy the `<table>` from `email-header.html` into your email
tool and point the `<img src>` at a hosted copy of the matching mark in
`marks/` (host it on your site or any public URL).

## Adding / fixing a brand

Each brand is one block in `brand-kit.js`:

```js
skyandswim: {
  wordmark: 'Sky <span class="a2">&amp;</span> Swim', // a2 = accent colour
  accent2: '#C0392B',
  mark: (paint) => `<path d="…droplet…" fill="${paint}"/>`, // your logo, paint = fill OR stroke
  defaultMood: 'teal',
  moods: { teal: { grad: [['0','#BCDDE0'],['1','#2E6B79']], bg:'#12343C', glow:'…', accent:'#7FC2D4' } },
},
```

- `mark(paint)` returns the logo's inner SVG; use `paint` as the `fill`
  (solid shapes like the droplet) or the `stroke` (line shapes like the waves).
- `grad` is the logo gradient; `bg`/`glow`/`accent` set the canvas mood.

> **Jet & Swim is a placeholder.** Its real logo and palette aren't in here
> yet — drop in the logo path/SVG and brand colours and it'll work like the
> others. (Sky & Swim's droplet + teal/crimson are reconstructed from its
> site; tweak the exact hexes against your source files if needed.)
