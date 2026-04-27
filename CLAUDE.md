# Bakes Bay — Project Context

Marketing website for Bakes Bay, a multi-cuisine café + bakery + kitchen with four branches in Coimbatore, India.

Status: in development on `master`. Not yet deployed to `bakesbay.com`.

---

## Business facts

**Locations (all in Coimbatore):**
1. **Main Branch** — Maruthamalai Main Road, Vadavalli
2. **Branch II** — Siruvani Road Junction, Vadavalli
3. **Branch III** — Grand Bei Market, opp. JC Bus Station, Vadavalli
4. **Branch IV** — Thondamuthur Main Road, near PSG School, Vedapatti

**Contact:**
- Phones: `+91 8438 499 833` (primary, used for WhatsApp), `+91 9363 687 805`
- Email: `bakesbay.care@gmail.com`
- Socials: `@bakesbay` on Instagram, Facebook, Twitter
- Hours: Everyday, 11am – 11pm

**Menu themes** (display order in Menu.astro):
Coffee · Café Starters · Continental · Pizza · Chinese · Bakery · Pastries · Cakes · Desserts · Beverages

**Prices are intentionally not shown anywhere** — `menu.json` is name-only, `Menu.astro` renders no prices, no `text-price` spans exist in rendered output. Pricing is discussed via WhatsApp. Don't reintroduce prices without an explicit request.

Bakery / Pastries / Cakes render as descriptive blocks with WhatsApp CTA. The `cakes` theme has `"link": "/cakes"` — its menu tile routes to the dedicated cakes page instead of an in-page anchor, and the in-page theme block is skipped.

**Canonical taglines:**
- Hero headline: "Bake Your Day"
- Hero kicker: "Bakes Bay — Live Baking"

---

## Tech stack

- **Astro 6** (static output)
- **Tailwind CSS 4** via `@tailwindcss/vite`
- **GSAP 3** + ScrollTrigger for scroll animations
- **Lenis** smooth scroll (exposed on `window.__lenis`)
- **React 19** — only `CustomCursor.jsx` uses `client:load`; everything else is Astro
- Fonts: Fraunces (display), DM Sans (body), Caveat (script), JetBrains Mono (mono)

---

## Design system

See `DESIGN.md` for the full token spec. Palette quick reference:

| Token | Hex | Use |
|---|---|---|
| `cream` | `#FAF3E7` | primary background |
| `ivory` | `#FFF6E9` | surface alt |
| `caramel` | `#C8935B` | accents, prices, script text |
| `cocoa` | `#5C3A21` | primary body text |
| `sage` | `#8BB8B0` | brand colour + CTAs |
| `forest` | `#2F4A3F` | sage hover state |
| `butter`, `espresso`, `strawberry`, `pistachio` | — | subordinate tokens |

Typography classes: `.text-display-xl` / `-lg` / `-md` (Fraunces italic), `.text-label` (JetBrains Mono uppercase), `.text-script` (Caveat), `.text-price` (Mono caramel).

Utility treatments: `.texture-paper` (noise overlay), `.underline-hand` (wobble SVG underline), `.tilt-left` / `.tilt-right` / `.tilt-slight`.

---

## Component architecture

- Sections live in `src/components/*.astro`, composed in `src/pages/index.astro`
- Pages: `src/pages/index.astro` (homepage), `src/pages/cakes.astro` (full cake catalog)
- Menu data: `src/data/menu.json` (themes → groups → items; `descriptive: true` themes skip groups and render a paragraph; `link` field routes the tile to an external page instead of an in-page anchor)
- Animations centralised in `src/scripts/animations.js` (one function per section, invoked after preloader)
- Design tokens + global styles: `src/styles/global.css` using Tailwind's `@theme`
- SVG illustrations: `src/components/illustrations/*.astro`

**Section order in index.astro:**
`Hero → Marquee → About → Craft → Menu → Gallery → Celebrations → Timeline → Visit → Contact → Footer`

Note: the component file is still named `Celebrations.astro` but it now renders as **"06 — Cakes & Custom Cakes"** with a 4-tile cake grid and dual CTAs (browse `/cakes`, WhatsApp a custom order). Don't rename the file without updating every import.

Section labels are numbered 01–09 in order (Hero unlabelled). Don't renumber without updating every section's `text-label` span.

---

## Running the site

```bash
npm run dev                              # Astro dev, port 4321 (falls back to 4322 if busy)
npm run build                            # static build to dist/
cloudflared tunnel --url http://localhost:4321   # public sharing via trycloudflare.com
```

`astro.config.mjs` includes `server.allowedHosts: ['.trycloudflare.com']` so Quick Tunnels don't hit Vite's "Blocked request" page.

---

## Working preferences (observed over past sessions)

- Short, terse responses — avoid trailing summaries unless asked
- No emojis in code, docs, or replies
- Commit only when explicitly asked; never proactively
- Commit style: multi-line subject-first, "why" over "what", `Co-Authored-By` trailer
- For non-trivial changes: propose a plan, flag doubts, wait for approval before executing
- `prompt.md` and `bakebay cakes.pdf` are user artifacts — leave untracked unless asked

---

## Known open items

**Broken / missing**
- **`public/og-image.jpg` doesn't exist** but is referenced in `Layout.astro` → social previews are blank.
- **Hero has three `<h1>` tags** ("Bake", "Your", "Day") — bad for SEO; should be one semantic H1 with visual line breaks.

**Deferred**
- **SEO plan (Tiers 1–4)** drafted but deferred: robots.txt, sitemap (`@astrojs/sitemap` not installed), canonical tag, FAQ schema, Google Business Profile setup, geo coordinates in JSON-LD.
- **Cake catalog PDF** — `bakebay cakes.pdf` (100 pages) is present but unused. `/cakes` now exists with Unsplash placeholders; real photos from the PDF would replace them once the user exports to images (`pdftoppm` unavailable in this environment).
- **Real photos** — everything is currently Unsplash placeholders. User explicitly said "use placeholders" for now.

---

## Recent narrative pivots (so future sessions don't accidentally undo them)

1. **Dark → warm cream bakery theme** (commit `57f6f1d`)
2. **Dessert-bar positioning → multi-cuisine café + bakery + kitchen** (commit `9aef4a8`). The menu, About copy, Craft pillars, Marquee, Hero kicker, Timeline, Footer and Layout JSON-LD all reflect this. Don't revert to a falooda-only narrative.
3. **Prices removed site-wide.** `menu.json` is name-only; all quotes happen via WhatsApp. Don't reintroduce prices without explicit user instruction.
4. **Cakes elevated to a dedicated page.** `/cakes` exists with 4-category gallery (Classic · Celebration · Custom · Tiered). Homepage section 06 (component still named `Celebrations.astro`) links to `/cakes` and offers a WhatsApp custom-cake CTA.
5. **Hero kicker shortened to "Bakes Bay — Live Baking"** (previously included Café · Kitchen).
6. **About section no longer mentions Vadavalli / Vedapatti in prose.** Those neighbourhood names still appear in `Layout.astro` JSON-LD, meta description, and `Visit.astro` branch cards — keep them there; they're load-bearing for local SEO and directions.
