# 2026-08-17 — pre-Phase-2 snapshot

Pulled 2026-08-17. GSC anchor day **2026-08-15** (the last settled day; GSC
finishes a day 2–3 days late, so this is not "yesterday").

Captures the state of `main` **before any Phase 2 resort page was written**, and
immediately after the Aug 12 crawl burst that moved the nine previously-silent
URLs into the index. See "Addendum — 2026-08-17" in `CONTENT_PLAN.md`.

| Window | Dates |
|---|---|
| current | 2026-07-19 – 2026-08-15 |
| prior | 2026-06-21 – 2026-07-18 |
| daily series | 2026-07-08 – 2026-08-15 |

## Files

| File | Dimensions |
|---|---|
| `cancuntogo-daily.csv` | date |
| `cancuntogo-pages-current-2026-07-19-2026-08-15.csv` | page, current window |
| `cancuntogo-pages-prior-2026-06-21-2026-07-18.csv` | page, prior window |
| `cancuntogo-queries-sitewide-2026-07-19-2026-08-15.csv` | query, **site-wide** |
| `cancuntogo-sargassum-queries-current-2026-07-19-2026-08-15.csv` | query, filtered to `/guides/cancun-sargassum-season` |
| `cancuntogo-index-coverage-2026-08-17.csv` | URL Inspection, all 21 sitemap URLs |

Two files here that the `2026-08-07-pre-pr4` snapshot doesn't have:

- **`cancuntogo-queries-sitewide-*.csv`** — the first site-wide query export ever
  pulled. `CONTENT_PLAN.md` listed this under "what would actually settle it" as
  the way to order the Phase 2 candidates by first-party demand. It doesn't
  settle that (no unbuilt candidate has impressions, by definition), but it is
  what surfaced the comparison-format finding and the seaweed/sargassum gap.
- **`cancuntogo-index-coverage-2026-08-17.csv`** — `coverageState` and
  `lastCrawlTime` per URL, from the URL Inspection API. Diff `lastCrawlTime`
  against `git log -1 --pretty=%ad -- <file>` to see which pages Google is
  holding a stale copy of.

Columns are `clicks, impressions, ctr` (percentage, not fraction) and `position`.
A `position` of `0.0` in the daily series means no impressions that day — it is
not a rank.

## Caveat on the index-coverage file

The URL Inspection API is eventually consistent. Three URLs reported
`URL is unknown to Google` on one pass and `Discovered - currently not indexed`
minutes later, on the same day. The values captured here are the second,
coherent reading. Re-check before drawing a conclusion from a single read.

## Reproducing

Same recipe as `../README.md` — Search Analytics `searchAnalytics/query` plus
`urlInspection/index:inspect`, bearer token from local gcloud ADC, Node with
`NODE_OPTIONS=--use-system-ca`.
