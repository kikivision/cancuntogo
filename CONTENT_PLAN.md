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

- **Do not ship anything before ~Aug 12–14.** The Aug 3 sargassum callout update
  is still uncrawled; shipping on top of it destroys the clean read on whether
  seasonal freshness moves that page. That read is worth having.
- Phase 1 retrofit → wait 3–4 weeks → judge → Phase 2.
- Don't stack changes mid-measurement.

---

## Open questions for when you're back

1. Extract shared CSS / move to a generator before or after Phase 2?
2. Does the Hotel Zone line hold for Puerto Morelos and Punta Sam properties, or
   do those go to jetandswim?
3. Should `/guides/best-time-to-visit-cancun` be pruned, consolidated, or just
   left to rot un-optimized?
