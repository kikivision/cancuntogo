# Working notes for agents on cancuntogo

## Deploys — batch them

**Every push to `main` triggers a Netlify build.** In one session on 2026-08-12
that produced 18 builds, 5 of which changed nothing that gets served.

- **Batch site changes.** Accumulate on a branch and merge once, when there's
  something worth looking at. Don't merge each piece as it's finished — several
  of those 18 were sequential edits to the same pages inside an hour.
- **Doc-only commits get `[skip ci]`** in the message. Netlify honours it, and
  it costs nothing.
- **Plan and doc edits go straight to `main`.** No branch, no PR — they're
  notes. Code gets a PR.

There is deliberately **no `netlify.toml`**. All build config lives in the
Netlify dashboard, so adding one would override those settings — don't create it
without first checking the dashboard's publish directory and build command.

## The site

Static HTML, no build step. **The Netlify publish directory is the repo root**,
which is why `_redirects` force-404s `CONTENT_PLAN.md`, `README.md`,
`package.json` and `/data/*` — otherwise they'd be served publicly.

Shared stylesheets in `assets/css/`, linked by every page:

| File | Covers |
|---|---|
| `resort.css` | Resort page layout, header, footer, gallery, lightbox |
| `wave-meter.css` | Sargassum level meter — shared with the guides |
| `advisor.css` | The "Plan with me" CTA block |
| `nav.css` | Mobile nav sizing. **Must be linked last**, after any inline `<style>` — it relies on source order to beat equal-specificity rules. |

### Traps worth knowing

- **`resort.css` line 23 resets `margin: 0` on `*`.** That overrides the
  browser's own `margin: auto` on `<dialog>` and pins modals to the top-left.
  The lightbox needs `margin: auto` set explicitly; the comment there says so.
  Anything else relying on UA-stylesheet centring will hit the same thing.
- **Resort pages come in two URL shapes** — `resorts/x.html` served at
  `/resorts/x`, and `resorts/x/index.html` served at `/resorts/x/`. Canonicals
  and sitemap entries must match the shape exactly.
- **Image files are mislabelled.** Several `.jpg` files hold WebP or AVIF data.
  Browsers cope; the server sends the wrong MIME type. Renaming touches every
  reference, so it hasn't been done.
- Two resort galleries (Grand Fiesta Americana, Moon Palace) are **commented
  out** pending photos, with the expected filenames listed inline. That's
  deliberate, not a bug.

## Dated content, and when it next goes stale

Facts with an expiry date are hardcoded in the HTML with nothing to flag them.
They were all found by grep in one sweep on 2026-09-15 after several had gone
quietly wrong. Check this list before assuming the site is current.

| What | Where | Next stale |
|---|---|---|
| Hard Rock closure notice | `resorts/hard-rock/index.html`, card + blurb in `resorts/index.html` | **2026-12-15**, when it reopens — the page and the index card both say closed |
| Mirabel "one of the newest" | `resorts/secrets-mirabel-cancun/index.html` | **2026-10-31**, when Amàre Cancún (Curio Collection) opens |
| Sargassum conditions banner | `guides/cancun-sargassum-season.html`, the `.alert` at the top | **Monthly in season.** It is labelled with the month, so a stale one is obvious and embarrassing |
| `(2026 Guide)` in titles | 5 guide `<title>` tags | **January 2027** |
| "Freshly renovated in 2026" | `resorts/hyatt-zilara.html`, `resorts/index.html`, honeymoon guide | Through 2027; "freshly" ages faster than the year does |

Two lessons from that sweep worth keeping:

- **Grep the whole site, not the page you think it lives on.** "Brand new" for
  Mirabel appeared in nine places across three files — hero badge, index card
  tag and blurb, meta description, JSON-LD `reviewBody`, and four spots in the
  body. The `<title>` was missed on the first pass because it said "New" rather
  than "brand new".
- **A tense can rot even when the dates are right.** Hard Rock's copy carried
  the correct closure window for six weeks while reading as though the
  renovation were still ahead of it.

### House style

**American spellings.** Two passes were needed on 2026-09-15 because the first
matched whole words, so `\bmetres\b` never caught the 55 `kilometres` in the
file. Scan by substring against roots — `colour`, `centre`, `metre`, `neighbour`,
`programme`, `travell`, `organis`, `-our`, `-re`, `-ise` — not by whole word.

## Scripts

```
node scripts/sitemap-lastmod.mjs           # rewrite sitemap lastmod from git
node scripts/sitemap-lastmod.mjs --check   # report drift, exit 1, don't write
node scripts/url-inspect.mjs               # GSC index status for a URL
```

**Run `sitemap-lastmod.mjs` after any content change.** The dates had drifted
two months behind, which told Google nothing had changed across the window in
which everything changed.

Both need local gcloud ADC for anything hitting Google. See `data/gsc/README.md`.

## What can and can't be checked, by environment

**This depends on where the agent is running — don't assume the container.**

Running **locally on the Mac** (gcloud ADC present, normal egress):

- **GSC works.** Both `scripts/url-inspect.mjs` and Search Analytics pulls run
  fine off local ADC. See `data/gsc/README.md`.
- **The live site works.** `curl https://cancuntogo.com/...` reaches production,
  so a deploy can be verified directly — status codes, live HTML, whether a
  correction actually shipped. Do this instead of asking a human.
- **Local preview** is `npx serve` on :4321 via `.claude/launch.json` (clean
  URLs, matching Netlify), not `python3 -m http.server`.

Running in the **Claude Code remote container**: no credentials and
`cancuntogo.com` is egress-blocked, so GSC and the live site are both out of
reach and do need a human.

**Netlify deploy status needs a human either way** — there are no Netlify
credentials anywhere. The usual workaround is Netlify's commit status on GitHub
(`gh api repos/kikivision/cancuntogo/commits/<sha>/status`), but that is a proxy,
not the source: during the 2026-08-17 GitHub outage the PR #16 merge built
normally at 15:37 UTC while GitHub showed zero statuses for it. **A missing
status is not a missing build.** Confirm a deploy by curling the live URL, not
by trusting the check.

Historical GSC pulls live in `data/gsc/`, one directory per snapshot.
