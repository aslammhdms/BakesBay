# Bakes Bay

A visually stunning static website for **Bakes Bay**, a premium dessert cafe in Coimbatore, India. Built with editorial design principles — dark, cinematic, and atmospheric.

## Tech Stack

- **[Astro](https://astro.build)** v6 — Static site generator
- **[Tailwind CSS](https://tailwindcss.com)** v4 — Utility-first styling
- **[GSAP](https://gsap.com)** + ScrollTrigger — Scroll-driven animations
- **[Lenis](https://lenis.darkroom.engineering)** — Smooth scrolling
- **[React](https://react.dev)** — Custom cursor island component

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The dev server runs at `http://localhost:4321`.

## Project Structure

```
src/
  components/
    Preloader.astro      # SVG stroke animation + curtain wipe
    Nav.astro            # Fixed top bar with mix-blend-difference
    NavOverlay.astro     # Full-screen navigation with hover previews
    Hero.astro           # Asymmetric hero with parallax image
    Marquee.astro        # Infinite ticker strip
    About.astro          # Editorial two-column story section
    Menu.astro           # Horizontal scroll menu container
    MenuPanel.astro      # Individual category panel
    Gallery.astro        # Collage grid with hover effects
    Celebrations.astro   # Full-bleed background CTA section
    Visit.astro          # Split-screen map + info
    Contact.astro        # Large serif contact section
    Footer.astro         # Minimal footer
    WhatsAppFab.astro    # Floating WhatsApp button
    CustomCursor.jsx     # React island — custom cursor
  data/
    menu.json            # Menu items and prices
  layouts/
    Layout.astro         # Base HTML layout with meta/SEO
  pages/
    index.astro          # Main page assembly
  scripts/
    animations.js        # GSAP + Lenis animation orchestrator
  styles/
    global.css           # Tailwind config, design tokens, type scale
public/
  favicon.svg
  logo.svg
```

## Deployment

### Netlify
```bash
npm run build
# Deploy the `dist/` directory
```

Or connect the repo to Netlify with:
- **Build command:** `npm run build`
- **Publish directory:** `dist`

### Cloudflare Pages
Same build settings. Astro static output works out of the box.

### Vercel
```bash
npx vercel
```

## Design System

See [DESIGN.md](./DESIGN.md) for the full design system documentation including color tokens, typography scale, spacing system, and animation timings.

## Key Features

- Scroll-driven animations with GSAP ScrollTrigger
- Horizontal-scrolling menu section (desktop), vertical stack (mobile)
- SVG stroke preloader with session-gated display
- Custom cursor with hover states (disabled on touch devices)
- Full-screen navigation overlay with image previews
- `prefers-reduced-motion` support throughout
- JSON-LD Restaurant schema for SEO
- WCAG AA color contrast compliance
