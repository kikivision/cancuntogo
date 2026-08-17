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
