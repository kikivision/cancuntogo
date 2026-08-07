# CancunToGo — Resort Expansion Plan

Written 2026-08-06. Pick this up **late next week (≥ Aug 12–14)** — see Timing.

---

## The bet

Add resorts, and differentiate every resort page on **Hotel Zone geography +
per-resort sargassum exposure** — the two things jetandswim structurally cannot
cover, because it's a global site.

Retitle away from "adults-only swim-up." That's jetandswim's franchise and we
are currently bidding against ourselves with a weaker site.

---

## What the data actually said (Jul 8 – Aug 4, GSC)

| Metric | Value |
|---|---|
| Impressions | 860 (up from 22 the prior 28d) |
| Clicks | **0** |
| Avg position | 59.7 |
| URLs earning any impressions | **10** |

> Verified against the API 2026-08-07 (`data/gsc/2026-08-07-pre-pr4/`).
> Impressions, clicks and position all reproduce exactly. The URL count was
> wrong — **10**, not 7 — and the page table below was missing half the site.

**The July 20 canonical-extensionless-URL commit worked.** Impressions went
1–10/day → 30–40/day the very next day, now 50–90/day. That fixed the plumbing.
What it revealed is that there isn't much behind it yet.

Page-level, ranked by position (not volume):

| Page | Impr | Position |
|---|---|---|
| `/` | 11 | 16.0 |
| `/guides/cancun-sargassum-season` | 147 | **31.9** ← best content page |
| `/resorts/hard-rock/` | 29 | **35.6** |
| `/resorts/secrets-mirabel-cancun/` | 15 | **45.4** |
| `/guides/cancun-hotel-zone-vs-riviera-maya` | 71 | 51.6 |
| `/guides/cancun-vs-tulum` | 37 | 61.4 |
| `/resorts/` | 188 | 62.3 |
| `/resorts/le-blanc` | 113 | 64.3 |
| `/guides/best-time-to-visit-cancun` | 246 | 79.7 |
| `/guides/` | 3 | 80.3 |

Three conclusions drove this plan:

1. **Sargassum is the strongest page on the site.** Nobody owns *per-property*
   sargassum exposure. The live-conditions angle is blocked (USF data licensing
   + three incumbents), but "which resort" is wide open. That's the wedge.
2. **Individual resort pages are the second-best content type.** Hard Rock
   (35.6) and Secrets Mirabel (45.4) both outrank the `/resorts/` index (62.3)
   on a fraction of the impressions. The two resort pages that rank are beating
   the hub that lists them — which is the argument for *more resort pages*, not
   a better index. Le Blanc at 64.3 on 113 impressions is the counter-example
   and worth understanding before Phase 2 (it's the most-linked resort page and
   the worst-ranking one).
3. **Drop the "best time to visit Cancun" cluster.** ~40 near-identical query
   permutations, position 74–100, against TripAdvisor / Expedia / Lonely Planet.
   It's soaking up a third of our impressions and will never convert. Don't add
   to it; don't optimize it.

### Not the problem: page depth

Existing resort pages average **~1,530 words**. jetandswim's Mexico resort pages
average **~600** and rank at position 8–10. Depth is already 2.5× ahead of what's
beating us. **Do not lengthen existing pages.** The gap is count (8 vs 61) and
angle.

### Not broken, just young

jetandswim's prior 28-day window (Jun 10 – Jul 7, when it was ~2.5 months old)
ran ~875 impressions. CancunToGo just did 860 at 7.5 weeks. Same curve, slightly
ahead of schedule. jetandswim's clicks only showed up in month three. Zero clicks
at position 60 is normal for the age — not a signal to panic or rebuild.

---

## Pre-merge snapshot (pulled 2026-08-07, PR #4 still open)

Captured while `main` was untouched by PR #4, because once it merges that
boundary is gone permanently. Raw CSVs: `data/gsc/2026-08-07-pre-pr4/`.
GSC anchor day 2026-08-05.

| Window | Clicks | Impr | Avg pos |
|---|---|---|---|
| Previous 28d (Jun 11 – Jul 8) | 2 | 23 | 52.7 |
| Baseline 28d (Jul 8 – Aug 4) | 0 | 860 | 59.7 |
| Current 28d (Jul 9 – Aug 5) | 0 | 928 | 58.4 |

The 28-day aggregate barely moved. **The daily series is where the story is** —
and it says something the averages hide. Sargassum page, by day:

```
Jul 30  14 impr  pos 42.4      Aug 03  13 impr  pos 19.6
Jul 31   9 impr  pos 47.1      Aug 04  16 impr  pos 12.1
Aug 01  14 impr  pos 52.1      Aug 05  31 impr  pos 19.5   ← biggest day ever
Aug 02  17 impr  pos 40.9
```

### Do not credit this to the Aug 3 callout

Tempting, and probably wrong, for two independent reasons:

1. **Timing doesn't fit.** `cb68dac` (August conditions callout) deployed Aug 3
   at 23:34 ET. GSC days run on Pacific time, so it was live for roughly the
   last 3 hours of GSC-day Aug 3 — it cannot explain Aug 3's move from 40.9 to
   19.6 across that whole day. `8fdfb44` (federal anti-sargassum plan) landed
   Aug 4 evening. Only **Aug 5** is fully downstream of both, and that's one day.
2. **It isn't confined to that page.** On Aug 5 the whole site moved: `/` to
   pos 1.0, `/guides/` to 3.0, `/resorts/hard-rock/` to 4.0, Secrets Mirabel to
   21.0, and even `best-time-to-visit` from 79.6 to 43.0. Editing one guide does
   not lift the homepage to position 1. This reads as a site-wide re-evaluation
   — most plausibly Google settling the Jul 20 canonical-URL change, or a crawl
   refresh picking up the four resort pages merged Aug 4.

### Query level: position moved, intent didn't

Queries on `/guides/cancun-sargassum-season` went 31 → 34. All three new ones
are permutations of demand we already had (`sargassum cancun september`,
`when does cancun have the most seaweed`, `best time of year to visit riviera
maya avoiding sargassum`). So the callout — to whatever extent it did anything —
improved *ranking on existing queries* rather than pulling in new sargassum
intent. Still zero clicks anywhere on the site, which is what position 12–20
buys you: that's page two.

### What this costs us

The clean read the Timing section was protecting is now partly spent. A
site-wide shift started ~Aug 3, and PR #4 will land on top of it, so an Aug 17
diff against this baseline contains both effects mixed together.

**Mitigation: take one more snapshot immediately before merging PR #4** (~Aug
11–12, once the shift has settled). That gives a post-shift, pre-PR line, and
the PR is then measured against *that* rather than against a boundary the shift
already crossed. Same pull, new directory under `data/gsc/`.

---

## No self-cannibalization on properties (verified)

Checked, and the property split is clean:

- **CancunToGo = Hotel Zone proper** — Le Blanc, Live Aqua, Secrets The Vine,
  Hyatt Ziva Cancún, Hyatt Zilara Cancún, Hard Rock Cancún, Breathless Cancún
  Soul, Secrets Mirabel Cancún.
- **jetandswim = Playa Mujeres / Riviera Maya / Playa del Carmen.**

Hyatt Zilara **Cancún** and Hyatt Zilara **Riviera Maya** are genuinely different
properties — not a duplicate. Keep the geographic line clean as we expand: if a
property isn't on Blvd. Kukulcán (or immediately adjacent), it belongs on
jetandswim, not here.

**Where we DO collide:** framing. Current titles read "Adults-Only Swim-Up
Suites," which is jetandswim's exact niche (its content schema has `adults_only`
and `swim_up` as booleans). Also `sargassum-season-mexico-swim-up-rooms` on
jetandswim vs `cancun-sargassum-season` here. Fix the framing, keep the properties.

---

## Phase 1 — Retrofit the existing 8 (do this first)

Cheaper than new pages and it proves the angle before we scale it.

1. **Add two new sections to the existing template** (see below): *Where it sits
   on the Hotel Zone* and *Sargassum exposure*.
2. **Retitle** all 8 away from "adults-only swim-up" toward Hotel-Zone framing.
3. Leave word count alone.

If positions on the 8 move over 3–4 weeks, Phase 2 is validated. If they don't,
we've spent days instead of weeks finding that out.

---

## Phase 2 — New resorts

Target **~20 Hotel Zone properties total** (from 8). Candidate list below is from
general knowledge and **must be demand-checked before writing** — see Sourcing.

Rough tiers to validate:

- **Likely high demand:** Grand Fiesta Americana Coral Beach, Ritz-Carlton
  Cancún, JW Marriott Cancún, Riu Palace Las Americas, Riu Cancún, Hyatt Regency
  Cancún, Dreams Sands Cancún, Fiesta Americana Condesa.
- **Strong niche pull:** Nizuc Resort & Spa, Temptation Cancún, Royalton CHIC
  Cancún, Wyndham Alltra Cancún, Grand Oasis Sens.
- **Fill-in:** Krystal Cancún, Panama Jack Cancún, Occidental Tucancún, Sandos
  Cancún, Presidente InterContinental, Beach Palace, Sun Palace, Seadust.

Order by **search demand × how badly the incumbents cover sargassum/beach
position**, not by how nice the resort is.

---

## Page template

The existing 8 share a consistent structure — match it exactly:

```
Hero (badges, h1, location, book CTA)
Why we picked it
Highlights
Who it's for
✓ Stay here if…  /  ✕ Skip it if…
Good to know
Things to do nearby
Gallery
Ready to book <name>?
```

**Add two sections** (the differentiator):

- **Where it sits on the Hotel Zone** — km marker on Blvd. Kukulcán, which
  stretch of beach, lagoon vs ocean side, what's walkable, distance to Punta
  Cancún nightlife and to the airport.
- **Sargassum exposure** — which way the beach faces, how exposed it is in peak
  season (roughly Apr–Aug), whether the resort runs active cleanup/barriers,
  and whether there's a pool-first fallback if the beach is bad that week.

That second section is the moat. It's also the thing that links naturally back to
`/guides/cancun-sargassum-season`, our best-ranking page — build the internal
links in both directions.

---

### Icons for the two new sections

Resort pages currently have **no icons at all** — 1 SVG per page (the header
logo), everything else is text pills (`.badge`, `--pale` background).

- **Km marker → a Blvd. Kukulcán roadside marker post** with the real number in
  it (`KM 9.5`). Blvd. Kukulcán has actual km signage, so it's a recognizable
  object from the destination rather than a generic map pin — and the icon
  carries the data instead of decorating it. Amber (`--amber #E8A838`) post
  reads well against the deep blue. Ownable: nobody else does per-resort km
  positioning, so it becomes a signature mark. Scales into a Hotel Zone strip
  map later.
- **Sargassum → a three-state wave glyph**, low / moderate / high, reusing the
  existing `brand/wave-*.svg` assets (aqua → amber → sunset). Keep this one
  restrained, not cute — it's the honest-utility section and a jaunty icon
  undercuts the trust we're trying to build there.

## Sourcing / verification (do not skip)

**The angle only works if the geography is accurate.** A wrong km marker or a
made-up beach orientation makes these pages worse than not having them, and it
poisons the one thing we're differentiating on.

Before writing, source and verify per resort:
- km marker on Blvd. Kukulcán
- beach orientation / which side of the peninsula
- sargassum exposure and mitigation (resort-published + recent traveler reports)

I did **not** verify km markers when drafting this — treat every number in the
candidate list as unsourced.

### The real bottleneck: images

Each existing resort has exactly **5 images** in `assets/resorts/<slug>/`:
`hero.jpg` plus 4 feature shots. 12 new resorts = **60 images** to source, name,
and place. That's the schedule driver, not the writing.

Also note: pages are standalone HTML with **inline CSS duplicated per file**. At
20+ resorts that duplication becomes a real maintenance cost — worth deciding
whether to extract a shared stylesheet or move to a generator *before* tripling
the page count, not after.

---

## Timing

- **Do not ship anything before ~Aug 12–14.** Still holds, but the reason has
  changed. As of the 2026-08-07 pull the Aug 3 callout *is* crawled — Aug 4 and
  Aug 5 both have data. What's happening instead is a site-wide position shift
  that started ~Aug 3 and hasn't settled. Shipping into an unsettled shift is
  the thing to avoid now; the "uncrawled callout" framing above is obsolete.
- **Snapshot GSC again right before merging PR #4** (~Aug 11–12) so the PR is
  measured against a settled line. See the pre-merge snapshot section.
- Phase 1 retrofit → wait 3–4 weeks → judge → Phase 2.
- Don't stack changes mid-measurement.

---

## Open questions for when you're back

1. Extract shared CSS / move to a generator before or after Phase 2?
2. Does the Hotel Zone line hold for Puerto Morelos and Punta Sam properties, or
   do those go to jetandswim?
3. Should `/guides/best-time-to-visit-cancun` be pruned, consolidated, or just
   left to rot un-optimized?
