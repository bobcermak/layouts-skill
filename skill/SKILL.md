---
name: hero-layouts
description: Catalog of 16 distinctive hero/landing section layouts (bento, split, arc, stepped, orbit, perspective tunnel, spiral ring, warped collage, light-smear carousel, cascading deck…) with build recipes in CSS grid and three.js / React Three Fiber. Use whenever building or redesigning a hero section, landing page, portfolio or product page that should look premium and not templated.
---

# Hero Layouts

A library of hero section layouts collected from high-end design references. Use it to pick a layout that fits the content, then build it as a **real, finished section** — never as a wireframe.

## Hard rules

1. **Wireframe colors are placeholders.** The pastel blocks in the references (pink nav, blue title, purple image…) only mark regions. Never ship pastel boxes labeled "Title" / "Image". Fill every region with real content, real typography and the project's own palette/brand.
2. **Text stays in the DOM.** Headings, copy and CTAs are HTML (SEO, a11y, selectable). three.js renders imagery, cards and background only — never the H1.
3. **3D is progressive enhancement.** Every 3D layout must have a static fallback: `prefers-reduced-motion`, no WebGL, or low-end mobile → render the same composition with plain `<img>` + CSS transforms.
4. **One hero, one idea.** Don't stack two 3D effects in one section. Pick one signature move.
5. **Mobile first-class.** Each layout below has a mobile collapse rule — implement it, don't just shrink.

## Workflow

1. Read the content you have: How many images? Is there a product, a number, a video? How long is the title? Is there one CTA or two?
2. Pick a layout from the decision table below (or let the user pick — show 2–3 candidate IDs with one line each).
3. Open `references/layouts.md` for that layout's structure, grid recipe and mobile rule.
4. If the layout is marked **3D**, open `references/three-patterns.md` and use the matching pattern.
5. Build, then check: real content everywhere, fallback works, no horizontal scroll at 375px, LCP image not blocked by the canvas.

## Decision table

| ID | Name | Type | Best for |
|----|------|------|----------|
| L01 | Title Banner | CSS | Strong headline + one wide hero photo (restaurants, guesthouses) |
| L02 | Anchored Split | CSS | Editorial / portfolio, one tall portrait image |
| L03 | Centered Showcase | CSS | SaaS / app — headline, CTA, product screenshot below |
| L04 | Orbit Scatter | CSS / 3D-lite | Creative studio, many small images, playful |
| L05 | Minimal Center | CSS | Text-led, agency, manifesto, no imagery |
| L06 | Perspective Tunnel | **3D** | Gallery/portfolio with 8–14 items, "journey" feel |
| L07 | Spiral Ring | **3D** / CSS | Collections, case studies, timeline of work |
| L08 | Warped Collage | **3D** | Content-rich brand: media + text + cards floating |
| L09 | Arch Frame | CSS (SVG mask) | Slideshow with index number + title, event, tour |
| L10 | Light Smear Carousel | **3D** shader | Fashion, music, posters — 3 hero visuals |
| L11 | Cascading Deck | **3D** | Archive / editorial, many posters, scroll-driven |
| L12 | Stepped Funnel | CSS (clip-path) | Bold launch page, single CTA |
| L13 | Bento Triptych | CSS grid | Brand/product overview with many small modules |
| L14 | Product Spotlight | CSS grid (+3D model opt.) | E-shop product hero: image, badge, price, CTA |
| L15 | Angular Bento | CSS clip-path | Premium product / outdoor / sport brand |
| L16 | Arc Halo | CSS / 3D-lite | Startup landing, huge title, two CTAs |

## Stack defaults

- React / Next.js: `@react-three/fiber`, `@react-three/drei`, optionally `@react-three/postprocessing`. Load the canvas with `next/dynamic(..., { ssr: false })`.
- Vanilla: `three` + the same math from `references/three-patterns.md`.
- Animation: GSAP or `framer-motion` for DOM, `useFrame` + damping (`THREE.MathUtils.damp`) for 3D. Scroll via Lenis or drei `ScrollControls`.
- Canvas: `dpr={[1, 1.75]}`, `gl={{ antialias: true, alpha: true }}`, pause rendering when off-screen (`frameloop="demand"` + IntersectionObserver, or drei `<PerformanceMonitor>`).
