# CancunToGo — Resort Expansion Plan

Written 2026-08-06. Pick this up **late next week (≥ Aug 12–14)** — see Timing.

---

## The bet

Add resorts, and differentiate every resort page on **precise coastal position +
per-resort sargassum exposure** — the two things jetandswim structurally cannot
cover, because it's a global site.

Position means the real kilometre marker and which way the beach faces — in the
Hotel Zone, Blvd. Kukulcán and the pivot at Punta Cancún. The moat is *depth on
Cancún*, which a global site can't match property-by-property. Scope stops where
Cancún stops; see the split below.

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

### Two-day-old resort pages are already the best-ranking thing on the site

The current-window page export (12 URLs, up from 10) has a result worth pulling
out, because nothing else in this plan records it:

| Page | Impr | Position | Note |
|---|---|---|---|
| `/resorts/moon-palace-grand/` | 7 | **28.7** | live since Aug 4 |
| `/guides/cancun-sargassum-season` | 178 | 29.7 | was 31.9 |
| `/resorts/hard-rock/` | 31 | 33.5 | was 35.6 |
| `/resorts/secrets-mirabel-cancun/` | 18 | 41.3 | was 45.4 |
| `/resorts/grand-fiesta-americana/` | 10 | 56.1 | live since Aug 4 |
| `/resorts/` | 207 | 61.9 | the hub still trails |

**Moon Palace The Grand is the best-ranking page on the entire site** — 28.7,
just ahead of the sargassum guide — on a page that had been live for about two
days at the anchor date. Grand Fiesta Americana, same age, is already earning
impressions too.

Treat the exact number as noise: 7 impressions is far too small a sample, and
both pages were published straight into the Aug 3–5 sitewide shift, which is
precisely the confound above. What is *not* noise is the direction — new resort
pages get picked up fast and land mid-range immediately, and all four
established resort pages improved. That's the Phase 2 thesis showing up in data
before Phase 2 has shipped. Re-check both at the Aug 11–12 pull, when they'll
have a week of history instead of two days.

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
   not lift the homepage to position 1. This reads as a site-wide re-evaluation.
3. **The best candidate is `123f459`, Aug 4 at 10:17 ET** — verified against git
   history. It rewrote internal links from relative to root-absolute across
   **24 files** and bumped `sitemap.xml` `lastmod` to 2026-08-03: a sitewide
   link-graph change plus a fresh crawl signal, landing one day before a
   sitewide re-evaluation. That's the same lever as the Jul 20 canonical commit
   this plan already credits with the first impressions jump.

   Two earlier readings are ruled out. It was **not** "the four resort pages
   merged Aug 4" — only **two** landed that day (Moon Palace `eed6b2e`, Grand
   Fiesta Americana `b24d503`); Hard Rock is Jun 19 and Secrets Mirabel Jun 16,
   seven weeks earlier. And the callout's Pacific-day math is exact: 23:34 ET is
   20:34 PT, leaving 3h26m of GSC-day Aug 3.

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

~~**Mitigation: take one more snapshot immediately before merging PR #4** (~Aug
11–12, once the shift has settled).~~

### That mitigation is spent — PR #4 merged Aug 7 (210738d, 10:41 ET)

Five days before the planned snapshot, and while the sitewide shift was still
unsettled. There is now no post-shift / pre-PR line and there cannot be one.
The Aug 7 baseline in `data/gsc/2026-08-07-pre-pr4/` is a genuine pre-PR line,
just not a post-shift one.

**The fix is a control group, and one already exists in the data.** PR #4
edited 12 pages and left the rest of the site alone, so the sitewide shift hits
both groups while PR #4 hits only one. Compare the *difference* between them,
not either one's raw movement.

| Treatment — edited by PR #4 | Aug 7 pos | Control — untouched | Aug 7 pos |
|---|---|---|---|
| `/guides/cancun-sargassum-season` | 29.7 | `/` | 13.7 |
| `/resorts/moon-palace-grand/` | 28.7 | `/guides/` | 49.4 |
| `/resorts/hard-rock/` | 33.5 | `/guides/cancun-hotel-zone-vs-riviera-maya` | 51.6 |
| `/resorts/secrets-mirabel-cancun/` | 41.3 | `/guides/cancun-vs-tulum` | 59.5 |
| `/resorts/grand-fiesta-americana/` | 56.1 | `/resorts/` | 61.9 |
| `/resorts/le-blanc` | 63.6 | `/guides/best-time-to-visit-cancun` | 79.6 |

`/resorts/` being a control is the useful accident here — it's the hub for every
treated page, it earns real volume (207 impressions), and PR #4 never touched
it. If the resort pages improve against Aug 7 and `/resorts/` doesn't, that gap
is PR #4 rather than the crawl.

Caveats to hold: this isn't a randomised assignment — the treated set is the
resort pages, which were already the fastest-improving content type before the
PR. And `/guides/hyatt-ziva-vs-zilara` earned no impressions in the baseline, so
it has no before-value and can't be measured, only watched.

**Still pull Aug 11–12.** It's no longer a pre-PR line, but it separates the
shift's settled level from the PR's later effect, so the Aug 17–24 read has a
nearer comparison point than a boundary the shift had already crossed.

---

## The site split — settled (Aug 7)

### The scope: Cancún. Actually Cancún.

**CancunToGo covers Cancún** — the Hotel Zone, downtown, and the resort
coastline south to Punta Nizuc and the Palace properties. That's it. If you'd
hesitate before calling a place "Cancún" in conversation, it doesn't go here.

**IN:** the Hotel Zone (Blvd. Kukulcán, Km 1–25) · downtown Cancún · the
resort strip south of Punta Nizuc, incl. Moon Palace The Grand

**OUT:** Puerto Morelos · Playa Mujeres · Playa del Carmen · Akumal · Tulum ·
the Riviera Maya generally

**jetandswim** takes everything down the coast, and within it the niche cut:
adults-only + outstanding swim-up suites. The two sites barely overlap on
geography — the collision was always framing, not properties.

**Isla Mujeres** is the one useful nuance. As a *destination* it's out — no
resort pages there. As a *day trip from Cancún* it's squarely in, and it's
already earning its place: the sargassum guide points at Playa Norte as the
reliable clear-water escape when the strip is bad. Guide content yes, resort
pages no.

Three earlier versions of this rule are superseded:

- ~~"if a property isn't on Blvd. Kukulcán (or immediately adjacent), it belongs
  on jetandswim"~~ — too narrow the wrong way; it would have exiled Moon Palace,
  which is plainly Cancún.
- ~~"the whole CUN airport catchment"~~ — far too wide; it swept in the entire
  Riviera Maya down to Tulum. The airport test settled Moon Palace and then
  kept going.
- ~~"CUN catchment minus the Riviera Maya"~~ — still reached past Cancún into
  Puerto Morelos, which is jetandswim's side of the line.

The through-line across all three attempts: **the airport test was doing work
the word "Cancún" already does.** Keep the name honest and the scope answers
itself.

Hyatt Zilara **Cancún** and Hyatt Zilara **Riviera Maya** are genuinely different
properties — not a duplicate. Only the Cancún one is ours.

### What this means for the angle

The bet was never "Hotel Zone only." It's **depth on one destination**, which
jetandswim structurally can't match because it's a global site. The tighter
scope helps here rather than hurting: a site called CancunToGo that stops where
Cancún stops is a cleaner promise than one quietly annexing Tulum, and the
depth-per-property bar is easier to hold across ~20 properties in one place
than across 130 km of coast.

The km-marker device covers everything in scope, because Mexican coastal
addresses here are *already* given as highway kilometre markers — so every page
has a real, checkable number. With the scope settled there are only two cases:

| Where | Marker used | Section heading |
|---|---|---|
| Hotel Zone (the other 9, and nearly all of Phase 2) | Blvd. Kukulcán km | *Where it sits on the Hotel Zone* |
| Cancún, off-strip | Carr. Cancún–Chetumal (Hwy 307) km | *Where it sits on the Cancún coast* |

Moon Palace already demonstrates row two (Hwy 307, Km 340), and will likely stay
the only one — almost everything in scope is on Kukulcán, which is exactly why
the km marker works as a signature device.

Note the sargassum angle is now scoped to where it's *hardest to get right*
rather than where it's most dramatic. The Riviera Maya is the worst-affected
stretch in the region, but it's also fairly uniform — nearly every property
reads "high." Cancún is the interesting case precisely because the coastline
turns, so neighbouring resorts genuinely differ. That contrast is the product.

Every resort page carries an "Airport / ~N min from CUN" fact. That's now just a
useful trip-planning number, not the scope test — a Tulum resort would have one
too.

**Where we DO collide:** framing. Titles used to read "Adults-Only Swim-Up
Suites," which is jetandswim's exact niche (its content schema has `adults_only`
and `swim_up` as booleans). Also `sargassum-season-mexico-swim-up-rooms` on
jetandswim vs `cancun-sargassum-season` here. ✅ Framing fixed in Phase 1;
properties kept.

---

## Phase 1 — Retrofit the existing pages ✅ DONE (Aug 7, on branch, unshipped)

Cheaper than new pages and it proves the angle before we scale it.

1. ✅ **Added two new sections to the template**: *Where it sits on the Hotel
   Zone* (amber km-marker post) and *Sargassum exposure* (three-wave level meter).
2. ✅ **Retitled** away from "adults-only swim-up" toward Hotel-Zone/km framing.
3. ✅ Word count left alone — the new sections add ~200 words each, no padding.
4. ✅ Bonus: extracted the duplicated inline CSS to `assets/css/resort.css`
   (open question #1, half-answered — see below).

Note the count was **10, not 8** — Grand Fiesta Americana Coral Beach and Moon
Palace The Grand already had pages when this plan was written. GFA is listed as
a Phase 2 candidate below; it's already live.

If positions on the 10 move over 3–4 weeks, Phase 2 is validated. If they don't,
we've spent days instead of weeks finding that out.

### Verified geography (sourced Aug 7 — this is the moat, keep it accurate)

The strip pivots at **Punta Cancún, ~Km 9**. North of it the beach faces
Bahía de Mujeres, sheltered behind Isla Mujeres → low sargassum. South of it
the beach faces the open Caribbean and takes the Atlantic drift head-on →
exposure climbs the further south you go. Orientation is the single biggest
predictor; everything below derives from it.

| Resort | Marker | Beach faces | Exposure |
|---|---|---|---|
| Breathless Cancún Soul | Km 4.5 | North — Bahía de Mujeres | **Low** |
| Grand Fiesta Americana Coral Beach | Km 9.5 | North — Punta Cancún | **Low** |
| Hyatt Ziva Cancún | Km 9.5 | Three sides, N & E (headland) | **Low** |
| Le Blanc | Km 10 | East | Moderate |
| Hyatt Zilara Cancún | Km 11.5 | East | Moderate |
| Live Aqua | Km 12.5 | East | Moderate |
| Hard Rock Cancún | Km 14.5 | East (Retorno del Rey) | **High** |
| Secrets The Vine | Km 14.5 | East (Retorno del Rey) | **High** |
| Secrets Mirabel | Km 19.5 | East (nr Playa Delfines) | **High** |
| Moon Palace The Grand | Carr. Chetumal Km 340 | East — *outside the Hotel Zone* | **High** |

**Two factual errors found and fixed while sourcing this:**

1. `hyatt-zilara` was labelled **Punta Cancún**. It isn't — Zilara is at
   **Km 11.5**, ~2 km south of Ziva. (Ziva was formerly Dreams Cancún on the
   headland; Zilara was formerly The Royal in Cancún.)
2. Consequently `/guides/hyatt-ziva-vs-zilara` was wrong throughout — it claimed
   the two "sit right next to each other on the tip of Punta Cancún" and scored
   Location as a **tie**, in the intro, the table, the FAQ and the FAQ JSON-LD.
   Rewritten: location is now the guide's sharpest differentiator (Ziva's
   sheltered north aspect vs Zilara's east-facing exposure), which is the angle
   doing real work on an existing page.

Resort-specific *mitigation* claims (barriers, cleanup crews) were deliberately
kept general — only the state/federal programme and "most beachfront resorts
rake daily" are sourced. Geography carries the specificity; don't invent
per-property cleanup detail to fill the section.

---

## Phase 2 — New resorts

Target **~20 properties total** (from 10). Candidate list below is from general
knowledge and **must be demand-checked before writing** — see Sourcing.

Eligible scope is Cancún — **no Puerto Morelos, no Riviera Maya, no Tulum**
(see the split above). In practice that means the Hotel Zone, which is where the
angle is strongest anyway: the km-marker + orientation story is sharpest where
the coastline turns, and the pivot at Punta Cancún produces a genuine
low/moderate/high spread across properties a few kilometres apart. That contrast
is the thing worth being known for.

**~20 is now a ceiling, not a waypoint.** The Hotel Zone holds roughly that many
properties worth writing about, so the target is "cover Cancún properly," not
"keep going until we hit a number." When the candidate list below is exhausted,
the growth move is depth and freshness on the existing set — and more guides
that use the position data — not another destination.

Rough tiers to validate:

- **Likely high demand:** ~~Grand Fiesta Americana Coral Beach~~ (done —
  page already live), Ritz-Carlton Cancún, JW Marriott Cancún, Riu Palace Las
  Americas, Riu Cancún, Hyatt Regency Cancún, Dreams Sands Cancún, Fiesta
  Americana Condesa.
- **Strong niche pull:** Nizuc Resort & Spa, Temptation Cancún, Royalton CHIC
  Cancún, Wyndham Alltra Cancún, Grand Oasis Sens.
- **Fill-in:** Krystal Cancún, Panama Jack Cancún, Occidental Tucancún, Sandos
  Cancún, Presidente InterContinental, Beach Palace, Sun Palace, Seadust.

Order by **search demand × how badly the incumbents cover sargassum/beach
position**, not by how nice the resort is.

---

## Page template

All 10 existing pages share a consistent structure — match it exactly:

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

- **Do not ship anything before ~Aug 12–14.** The Aug 3 sargassum callout update
  is still uncrawled; shipping on top of it destroys the clean read on whether
  seasonal freshness moves that page. That read is worth having.
- Phase 1 retrofit → wait 3–4 weeks → judge → Phase 2.
- Don't stack changes mid-measurement.

---

## Open questions for when you're back

1. ~~Extract shared CSS~~ **done** — `assets/css/resort.css`, ~80 KB of
   duplication removed across the 10 pages, and all asset/favicon paths
   normalised to root-absolute (the old `../` and `../../` paths resolved
   correctly only by accident under clean URLs). **Still open: a generator.**
   The 10 pages now share styling but still duplicate header, footer, nav,
   advisor CTA and the Viator block by hand. At 20+ pages that's the next thing
   to hurt — worth deciding before Phase 2, not after.
2. ~~Does the Hotel Zone line hold for Puerto Morelos and Punta Sam properties,
   or do those go to jetandswim?~~ **Closed — they go to jetandswim.** Scope is
   Cancún: Hotel Zone, downtown, and the strip south to Punta Nizuc. Moon Palace
   stays (it's Cancún) and leads with its real Hwy 307 marker under a *Where it
   sits on the Cancún coast* heading rather than faking a Kukulcán number.
   Everything past Cancún — Puerto Morelos, Playa Mujeres, the Riviera Maya,
   Tulum — is jetandswim's.
3. Should `/guides/best-time-to-visit-cancun` be pruned, consolidated, or just
   left to rot un-optimized?
4. **Missing gallery images (pre-existing).** Grand Fiesta Americana and Moon
   Palace The Grand ship with `hero` only — 8 gallery images across the two are
   referenced but absent, so those `.shot` tiles render as empty pale boxes.
   Confirms the plan's own point that images, not writing, are the schedule
   driver.

## What was NOT done, and why

Phase 2 itself — no new resort pages were written. The plan gates it behind
Phase 1 plus a 3–4 week measurement read, and Phase 1 had not been started when
this work began. Everything above is the prerequisite: the template, the icons,
the verified-geography method, and the shared stylesheet that Phase 2's page
count would otherwise have multiplied.

Nothing here has shipped — it's on a branch, unmerged, so the Aug 12–14 freeze
and the clean read on the Aug 3 sargassum callout are both intact.
