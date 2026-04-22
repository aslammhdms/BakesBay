Build a visually stunning, award-worthy static website for "Bakes Bay," a warm artisan bakery and dessert café in Coimbatore, India. This is a design showcase first, informational site second — aim for the craft you'd see featured on Awwwards, Godly, or SiteInspire. Use Astro + Tailwind CSS + GSAP. No backend, no e-commerce — just a beautifully crafted, appetite-inducing digital experience.

Design Philosophy
Think artisan bakery storefront meets warm editorial food magazine. The site should feel like the golden-hour glow of a bakery window at 7am — buttery, inviting, handcrafted. Focus on the textures of baking: crusty bread, glossy glazes, dusted sugar, stoneware, linen, wooden boards, warm ovens. Fruit appears as a natural garnish — the strawberry on the falooda, the mint on the mojito — not as a dominant decorative theme.
References to emulate:

Artisan bakery branding (Lune Croissanterie, Tartine, Du Pain et des Idées, Poilâne)
Warm, earthy café websites with rich food photography
Editorial food magazines (Cherry Bombe, The Gourmand, Kinfolk)
Hand-lettered bakery chalkboard aesthetics, kraft paper, linen textures


Art Direction — A Warm, Foody Palette
Build around warm bakery neutrals as the foundation. The brand's sage teal is a recurring accent, not a dominator. Fruit colors appear sparingly, mostly in photography rather than as UI blocks.
Primary palette (bakery warmth):

Cream (primary background): #FAF3E7
Warm ivory (secondary surface): #FFF6E9
Butter yellow: #F5DFA8
Caramel: #C8935B
Cocoa brown: #5C3A21
Deep espresso (text): #2B1D14

Brand anchor:

Sage teal: #8BB8B0 — used for the logo, select headings, and one or two accent sections
Deep forest green: #2F4A3F — secondary text on light backgrounds

Subtle fruit accents (use sparingly — for hover states, small icons, single section backgrounds):

Strawberry pink: #E89B9B (used once or twice, not everywhere)
Soft pistachio: #BDD4A3

How to use color:

The site reads as a warm, buttery cream palette throughout — cream, ivory, caramel, cocoa. This is the bakery mood.
Sage teal is the brand signature — appears in the logo, headline accents, section numbers, the WhatsApp button, and occasional dividers.
Deep cocoa and caramel carry the typography and price accents.
Fruit colors appear only in: real food photography, small illustrated garnishes on menu items, and one feature section (Celebrations) for contrast.
Textures matter more than fruit: use subtle paper grain, linen texture, or a soft noise overlay on backgrounds to add warmth. Think kraft paper, baker's parchment, stoneware.

Typography — artisan & editorial:

Display: Fraunces or Recoleta — for buttery, confident headlines. Use italic and the optical display size generously.
Body: DM Sans or General Sans — friendly, readable, slightly rounded.
Accent script: Caveat — used sparingly for handwritten baker's notes ("fresh daily", "made with love"), like chalkboard annotations.
Labels/prices: JetBrains Mono in caramel or cocoa — gives a receipt/menu-card feel.
Strong type scale contrast: body 16px, section headlines 140–200px, let them breathe.

Layout principles:

Editorial magazine rhythm — asymmetric, generous whitespace, intentional overlap of photo and text.
Subtle paper/parchment texture on backgrounds.
Hand-drawn underlines, small flourishes, a baker's annotation style.
Photos occasionally tilted like polaroids (−2° to +2°) on a pinboard.
Organic curved section dividers — like the edge of a rolled dough — instead of hard straight lines.
Illustrations used minimally: a wheat sprig, a whisk, a rolling pin, steam curls — bakery motifs, not fruit-heavy.


Motion & Interaction

Custom cursor on desktop: a small cream dot that morphs into a label ("taste", "view", "order") on interactive elements.
Smooth scrolling via Lenis.
Scroll-driven animations: headlines reveal word by word, photos parallax gently, menu items slide in with a soft stagger.
Hero entrance: logo draws in, headline reveals via mask-slide, hero photo fades in with a gentle Ken Burns zoom.
Marquee ticker in caramel: "FRESHLY BAKED · HANDCRAFTED · FALOODA · LASSI · MADE DAILY IN COIMBATORE ·" scrolling slowly in big italic serif.
Hover states: menu items shift horizontally with a small caramel dot sliding in beside them; gallery photos scale and straighten from their tilt.
Subtle ambient motion: steam rising from a dessert photo in the hero, a whisk icon that gently spins on hover.
Timing: warm and unhurried (600–1000ms, gentle easing). Respect prefers-reduced-motion.


Section-by-Section Design Brief
1. Preloader (2s)
Cream background, faint paper texture. Logo draws in sage teal, tagline "Bake Your Day" fades in letter by letter in italic serif. Subtle curtain wipe in caramel reveals the site.
2. Navigation
Minimal top bar on cream — wordmark left, a pill-shaped "Menu" button in sage teal on the right. Opens a full-screen overlay in warm ivory with a parchment texture. Huge cocoa-brown italic serif links (Home, About, Menu, Gallery, Celebrations, Visit). Each link hover reveals a tilted photo of a relevant bake/dessert floating beside it.
3. Hero
Cream background, subtle paper grain. Left 60%: oversized headline "Bake / Your / Day" in Fraunces italic — cocoa brown, with the word "Your" in sage teal. Small handwritten caramel note below: "handcrafted in Coimbatore, since [year]". A tiny wheat-sprig illustration beside the tagline. Right 40%: a hero image of a signature dessert (Royal Falooda or a cake) with warm golden light, slight tilt. Caramel ticker runs across the bottom.
4. About — "Our Story"
Warm ivory background with paper texture. Editorial two-column: portrait photo of the craft (hands kneading dough, a baker plating dessert, steam rising) on one side; body copy with a large caramel drop cap, italic pull quote, and a handwritten signature line at the end. Section labeled "02 — Our Craft" in sage teal mono. A small flourish — a whisk or rolling pin line-drawing — tucked into the margin.
5. Menu — the centerpiece
This is where the design earns its keep, but it stays foody and warm, not fruity. Layout: horizontal scroll panels on desktop, vertical sections on mobile. Each category has its own mood but all live in the warm bakery palette:

Falooda panel — cream background with a tilted hero photo of Royal Falooda on a linen napkin, a single strawberry garnish as a subtle illustration. Massive italic serif "Falooda" in cocoa. Items listed with cocoa serif names and caramel mono prices, dotted leader between.
Mojito panel — soft pistachio-tinted cream background, minimal mint sprig illustration. Category title in deep forest.
Lassi & Cocktails panel — butter yellow background, tilted photo of a lassi in a stoneware glass, hand-drawn whisk line art. Items in cocoa.
Tender Coconut panel — warm ivory background with sage teal accents, photo of tender coconut dessert. A single minimal coconut-half line illustration.

Each panel: massive italic category name, a centered hero photo (slightly tilted, warm-lit, on rustic backdrop — linen, wood, stoneware), items with delicate dotted leaders and a tiny caramel dot bullet. Items stagger in as the panel enters view. No heavy fruit illustrations — just occasional minimal line-art garnishes where they naturally belong.
Menu data (in src/data/menu.json):

Falooda: Royal ₹170, Dry Fruit Mixed ₹180, Butterscotch ₹160, Mango ₹160, Strawberry ₹160, Mini ₹140
Mojito: Green Apple ₹100, Blue Curacao ₹100, Passion Fruit ₹100, Virgin ₹100
Lassi & Cocktails: Mango Lassi ₹70, Vanilla Lassi ₹70, Strawberry Lassi ₹70, Plain Lassi ₹70, Pineapple Lime ₹50, Strawberry Lime ₹50, Grape Lime ₹50, Lemon Masala Soda ₹50
Tender Coconut: Special ₹130, Strawberry ₹120, Vanilla ₹120, Chocolate ₹120, Butterscotch ₹120, Mango ₹120

6. Gallery — "The Craft"
Cream background, paper texture. Collage-style pinboard layout — warm food photos of varying sizes, each tilted slightly, some with a thin caramel frame, some with a torn-kraft-paper sticker caption in handwritten script ("mango lassi · friday bake"). Focus on texture-rich shots: steam, sugar dust, glossy glazes, buttery crusts, stoneware, linen. Hover straightens the photo and gently fades neighbors.
7. Celebrations — "For the Occasions That Matter"
This is the one section where warm color breaks through. Full-bleed caramel or soft strawberry background with a tilted photo of a celebration cake. Large cream italic serif pull quote: "We bake for your birthdays, anniversaries, and every quiet victory in between." Small hand-drawn confetti-like flourishes — tiny dashes, not full illustrations. CTA button in sage teal: "Enquire on WhatsApp →" with an animated arrow.
8. Visit — "Find Us"
Split screen. Left: a custom cream-toned map (warm tones, not Google default gray). Right: cream background with paper texture, huge serif address in cocoa, hours, phone in deep forest, decorated with handwritten caramel annotations — arrows, underlines, a small "we're here!" note pointing to the address. "Get Directions ↗" as a handwritten-style link.
9. Contact & Footer
Background: sage teal — the full brand moment. Massive cream italic serif "Let's Talk". Email and phone as huge cream serif words with hand-drawn caramel underlines. Socials as minimal line-drawn icons in cream. Footer: cream logo, mono-font quick links, and a final handwritten line: "Handcrafted in Coimbatore · © 2026 Bakes Bay."
10. Floating WhatsApp button
Sage teal circle with a cream WhatsApp icon, gentle pulse. On hover, a small speech bubble pops out: "let's chat!" in handwritten script.

Technical Requirements

Astro 4+ with Tailwind CSS (extended theme with all bakery tokens), GSAP + ScrollTrigger, Lenis for smooth scroll.
Astro's <Image /> for AVIF/WebP with blur-up placeholders.
All illustrations as inline SVGs — wheat sprig, whisk, rolling pin, mint leaf, strawberry, coconut half, steam curls. Keep the set minimal (6–8 icons max).
Subtle paper/grain texture as a repeating PNG or SVG overlay on cream sections, opacity ~5%.
Custom cursor as a React island; disabled on touch devices.
Respect prefers-reduced-motion.
Fully responsive — genuinely redesigned for mobile. Horizontal menu scroll becomes vertical stacks, type scales down thoughtfully, cursor disabled.
Lighthouse: 95+ Performance, 100 Accessibility, 100 SEO, 100 Best Practices.
SEO: meta tags, a warm custom OG image (cream bg, logo, tagline, one dessert photo), JSON-LD Restaurant schema.
Accessibility: WCAG AA contrast (verify caramel-on-cream and sage-on-cream carefully), meaningful alt text, keyboard-navigable.

Project Structure
/src
  /components
    Preloader.astro
    Nav.astro
    NavOverlay.astro
    Hero.astro
    Marquee.astro
    About.astro
    Menu.astro
    MenuPanel.astro
    Gallery.astro
    Celebrations.astro
    Visit.astro
    Contact.astro
    Footer.astro
    WhatsAppFab.astro
    CustomCursor.jsx
    /illustrations (Wheat.astro, Whisk.astro, RollingPin.astro, Mint.astro, Strawberry.astro, Coconut.astro, Steam.astro — inline SVGs)
  /data/menu.json
  /layouts/Layout.astro
  /pages/index.astro
  /styles/global.css (design tokens, type scale, paper texture, Lenis styles)
  /scripts/animations.js
/public
  logo.svg, og-image.jpg, favicon.svg, paper-texture.png, fonts/
Include a README.md (setup + deployment for Netlify/Cloudflare Pages) and a DESIGN.md documenting the color system, type scale, spacing, illustration library, and animation timings.
Placeholder images: use Unsplash URLs — pick warm, golden-hour, texture-rich bakery and dessert photography (search: artisan bakery, falooda, lassi, dessert café, warm food photography, stoneware, linen dessert). Avoid bright flat stock shots; favor moody-warm, editorial food photography with natural light.

Deliverable: A complete, polished Astro project that feels like a warm artisan bakery brand — buttery, handcrafted, and quietly confident. When someone lands on it, they should feel the golden glow of a bakery window at sunrise. Don't ship it until it's portfolio-worthy.