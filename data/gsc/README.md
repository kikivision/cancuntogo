# GSC snapshots

Google Search Console exports for `sc-domain:cancuntogo.com`, one directory per
pull. These exist so the effect of a change can be measured against a window
that was captured *before* the change shipped — once `main` moves, the old
boundary is gone.

Source is the Search Analytics API, not the GSC UI export, so the numbers are
reproducible. Auth is local gcloud Application Default Credentials
(`kikidailey@gmail.com`, `webmasters.readonly` scope) — no keys in the repo.

## Snapshots

| Directory | Pulled | Captures |
|---|---|---|
| `2026-08-07-pre-pr4/` | 2026-08-07 | State of `main` before PR #4 (Hotel Zone position + sargassum exposure) merged. GSC anchor day 2026-08-05. |

## What's in each snapshot

| File | Dimensions | Window |
|---|---|---|
| `cancuntogo-pages-baseline-jul08-aug04.csv` | page | Jul 8 – Aug 4 (the window recorded in `CONTENT_PLAN.md`) |
| `cancuntogo-pages-current-*.csv` | page | trailing 28d ending on the anchor |
| `cancuntogo-pages-prior-*.csv` | page | the 28d before that |
| `cancuntogo-sargassum-queries-baseline-*.csv` | query, filtered to `/guides/cancun-sargassum-season` | Jul 8 – Aug 4 |
| `cancuntogo-sargassum-queries-current-*.csv` | query, same filter | trailing 28d |
| `cancuntogo-daily.csv` | date | Jul 8 – anchor |

Columns are `clicks, impressions, ctr` (as a percentage, not a fraction) and
`position`. A `position` of `0.0` means the day had no impressions at all — it
is not a rank.

## Reproducing a pull

`POST searchAnalytics/query` against
`https://www.googleapis.com/webmasters/v3/sites/sc-domain%3Acancuntogo.com/`,
with a bearer token from `gcloud auth application-default print-access-token`.
Node needs `NODE_OPTIONS=--use-system-ca` for outbound HTTPS on this machine.

Two things that will bite if you skip them:

- **Anchor to the freshest settled day, not to yesterday.** GSC finishes
  processing a day 2–3 days late, so "last 28 days ending yesterday" silently
  returns a short window and biases every delta downward. Probe a busy property
  for its last date-dimension row and use that as the end date for *both*
  periods. `scripts/traffic-window.mjs` in the `sunstate-trades` repo does this
  (`lastSettledDate` / `buildWindows`).
- **Page filters need the full URL.** Use a `dimensionFilterGroups` filter with
  `dimension: page, operator: contains` — the `page` dimension comes back as an
  absolute URL, so a bare path won't match an equality filter.
