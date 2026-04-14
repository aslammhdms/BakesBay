# Bakes Bay — Design System

## Color Tokens

| Token          | Hex       | Usage                                      |
|----------------|-----------|---------------------------------------------|
| `dark`         | `#0A0A0A` | Base background, near-black warm            |
| `dark-surface` | `#141413` | Card/surface layering, charcoal             |
| `sage`         | `#8BB8B0` | Primary accent (from brand logo), CTAs      |
| `gold`         | `#C9A96E` | Secondary accent — prices, labels, details  |
| `cream`        | `#F5F1E8` | Primary text, warm off-white (never pure #FFF) |
| `muted`        | `#8A8680` | Secondary text, captions, meta info         |

### Contrast Ratios (against `dark` #0A0A0A)
- `cream` on `dark`: 15.4:1 (AAA)
- `sage` on `dark`: 5.8:1 (AA)
- `gold` on `dark`: 5.3:1 (AA)
- `muted` on `dark`: 3.6:1 (AA Large only — use for labels/meta ≥14px bold or ≥18px)

## Typography

### Font Families
| Role    | Family              | Weight(s)       | Usage                           |
|---------|---------------------|-----------------|---------------------------------|
| Display | Cormorant Garamond  | 300–700, italic | Headlines, pull quotes, hero    |
| Body    | Inter               | 300–600         | Paragraphs, descriptions        |
| Mono    | JetBrains Mono      | 300–500         | Prices, labels, section numbers |

### Type Scale (CSS classes)
| Class             | Size                           | Line Height | Letter Spacing |
|-------------------|--------------------------------|-------------|----------------|
| `.text-display-xl`| `clamp(3.5rem, 10vw, 12rem)`  | 0.9         | -0.02em        |
| `.text-display-lg`| `clamp(2.5rem, 6vw, 7rem)`    | 0.95        | -0.01em        |
| `.text-display-md`| `clamp(1.75rem, 4vw, 4rem)`   | 1.1         | normal         |
| `.text-label`     | `0.75rem`                      | normal      | 0.1em          |
| `.text-price`     | `0.875rem`                     | normal      | normal         |

## Spacing System

Uses Tailwind's default spacing scale (1 unit = 0.25rem).

| Pattern         | Value     | Usage                        |
|-----------------|-----------|------------------------------|
| Section padding | `py-24 md:py-40` | Vertical section breathing room |
| Horizontal pad  | `px-6 md:px-12`  | Content side margins         |
| Section gap     | `mb-16 md:mb-24` | Between header and content   |
| Element gap     | `gap-3 md:gap-4` | Grid/flex item spacing       |

## Animation Timings

| Animation               | Duration | Easing              | Trigger               |
|--------------------------|----------|----------------------|------------------------|
| Preloader stroke         | 2000ms   | `power2.inOut`       | Page load              |
| Preloader curtain wipe   | 800ms    | `power3.inOut`       | After stroke complete  |
| Hero headline reveal     | 1000ms   | `power3.out`         | After preloader        |
| Hero image fade          | 1200ms   | `power2.out`         | After preloader        |
| Scroll reveals (general) | 800ms    | `power2.out`         | ScrollTrigger 60-70%   |
| Menu horizontal scroll   | scrub    | `none` (linear)      | Pinned scroll          |
| Gallery item reveal      | 800ms    | `power2.out`         | ScrollTrigger 70%      |
| Marquee ticker           | 40s      | `linear` (infinite)  | CSS animation          |
| WhatsApp pulse           | 3s       | `ease-in-out` (infinite) | CSS animation      |
| Hover transitions        | 300-700ms| `ease` (CSS default) | Mouse enter/leave      |

### Reduced Motion
All animations respect `prefers-reduced-motion: reduce`:
- GSAP animations are skipped entirely
- Lenis smooth scroll is disabled (native scroll)
- CSS animations set to `0.01ms` duration
- Preloader is removed immediately
- All content is visible without animation

## Breakpoints

| Name   | Min Width | Key Layout Changes                           |
|--------|-----------|----------------------------------------------|
| Mobile | 0         | Single column, vertical menu, no cursor      |
| `md`   | 768px     | Two-column layouts, horizontal menu scroll   |
| `lg`   | 1024px    | Full gallery grid, larger nav overlay links   |

## Component Architecture

All components are Astro (`.astro`) except `CustomCursor.jsx` (React island, `client:load`).
Animation logic is centralized in `src/scripts/animations.js`.
Menu data lives in `src/data/menu.json`.
