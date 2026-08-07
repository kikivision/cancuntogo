# CancunToGo — Resort Expansion Plan

Written 2026-08-06. Pick this up **late next week (≥ Aug 12–14)** — see Timing.

---

## The bet

Add resorts, and differentiate every resort page on **precise coastal position +
per-resort sargassum exposure** — the two things jetandswim structurally cannot
cover, because it's a global site.

Position means the real highway kilometre marker and which way the beach faces.
In the Hotel Zone that's Blvd. Kukulcán and the pivot at Punta Cancún; down the
coast it's Hwy 307. Start with the Hotel Zone, where the contrast is sharpest —
but the moat is *depth on one airport catchment*, not a boundary around the
strip.

Retitle away from "adults-only swim-up." That's jetandswim's franchise and we
are currently bidding against ourselves with a weaker site.

---

## What the data actually said (Jul 8 – Aug 4, GSC)

| Metric | Value |
|---|---|
| Impressions | 860 (up from 22 the prior 28d) |
| Clicks | **0** |
| Avg position | 59.7 |
| URLs earning any impressions | **7** |

**The July 20 canonical-extensionless-URL commit worked.** Impressions went
1–10/day → 30–40/day the very next day, now 50–90/day. That fixed the plumbing.
What it revealed is that there isn't much behind it yet.

Page-level, ranked by position (not volume):

| Page | Impr | Position |
|---|---|---|
| `/` | 11 | 16.0 |
| `/guides/cancun-sargassum-season` | 147 | **31.9** ← best content page |
| `/guides/cancun-hotel-zone-vs-riviera-maya` | 71 | 51.6 |
| `/resorts/` | 188 | 62.3 |
| `/guides/best-time-to-visit-cancun` | 246 | 79.7 |

Two conclusions drove this plan:

1. **Sargassum is the strongest page on the site.** Nobody owns *per-property*
   sargassum exposure. The live-conditions angle is blocked (USF data licensing
   + three incumbents), but "which resort" is wide open. That's the wedge.
2. **Drop the "best time to visit Cancun" cluster.** ~40 near-identical query
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

## The site split — settled (Aug 7)

### The scope test: do they fly into CUN to get there?

**If a traveller flies into Cancún airport to reach it, it belongs on
CancunToGo.** That's the whole test. Not the Hotel Zone, not the Cancún
municipal boundary — the airport catchment.

That includes: the Hotel Zone, downtown Cancún, the Palace properties south of
Punta Nizuc, Puerto Morelos, Punta Sam, Playa Mujeres, Isla Mujeres, Playa del
Carmen, the Riviera Maya and Tulum.

**jetandswim is a niche cut, not a territory:** adults-only + outstanding
swim-up suites, which happens to skew Riviera Maya. The two sites therefore
*overlap on geography by design*, and that's fine — the plan already concluded
"fix the framing, keep the properties."

Two earlier versions of this rule were wrong and are superseded:

- ~~"if a property isn't on Blvd. Kukulcán (or immediately adjacent), it belongs
  on jetandswim"~~ — never the rule.
- ~~"CancunToGo = the Cancún municipality"~~ — too narrow; it excluded Puerto
  Morelos and Punta Sam, which are separate municipalities but plainly CUN
  arrivals.

Hyatt Zilara **Cancún** and Hyatt Zilara **Riviera Maya** are genuinely different
properties — not a duplicate.

### What this means for the angle (it survives, and scales)

The bet was never "Hotel Zone only." It was **depth on one destination**, which
jetandswim structurally can't match because it's a global site. A wider
catchment doesn't weaken that — it's more ground jetandswim still can't cover
property-by-property.

The km-marker device scales with it, which is the lucky part. Mexican coastal
addresses on this stretch are *already* given as highway kilometre markers, so
every sub-destination has a real, checkable number:

| Sub-destination | Marker used | Section heading |
|---|---|---|
| Hotel Zone | Blvd. Kukulcán km | *Where it sits on the Hotel Zone* |
| Cancún, off-strip | Carr. Cancún–Chetumal (Hwy 307) km | *Where it sits on the Cancún coast* |
| Riviera Maya / Puerto Morelos / Tulum | Carr. Federal 307 km | *Where it sits on the Riviera Maya* |

Moon Palace already demonstrates the second row (Hwy 307, Km 340). Note that
Hwy 307 markers **descend** going south from Cancún, so they order the coast
for free.

The sargassum angle gets *stronger* down the coast, not weaker: the Riviera Maya
is the most affected stretch in the region, and per-property exposure there is
even less well covered than in the Hotel Zone.

**Every resort page already carries an "Airport / ~N min from CUN" fact** — so
the scope test is, conveniently, already a field on the page.

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

Eligible scope is the whole CUN catchment (see the split above), but **do the
Hotel Zone first anyway.** Not because of the rule — because of the angle. The
km-marker + orientation story is sharpest where the coastline turns, and the
Hotel Zone's pivot at Punta Cancún produces a genuine low/moderate/high spread
across properties a few kilometres apart. That contrast is the thing worth
being known for; it's a weaker read along the straighter, uniformly-exposed
Riviera Maya coast.

So: finish the Hotel Zone, then expand down Hwy 307 once the angle is proven.
Puerto Morelos is the most interesting early exception — it sits behind a
close-in barrier reef, which is a real, checkable beach-condition story of
exactly the kind this site is trying to own.

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
   or do those go to jetandswim?~~ **Closed.** The test is the airport
   catchment: if they fly into CUN to get there, it's ours. Puerto Morelos and
   Punta Sam are in, despite being separate municipalities. Moon Palace stays,
   and now leads with its real Hwy 307 marker under a *Where it sits on the
   Cancún coast* heading rather than faking a Kukulcán number.
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
