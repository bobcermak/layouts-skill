---
name: ui-layouts
description: Catalog of 16 distinctive section layouts with reference wireframes (bento, split, arc, stepped, orbit, perspective tunnel, spiral ring, warped collage, light-smear carousel, cascading deck…), an automatic section → layout map (hero, features, about, gallery, product, CTA…), anti-AI typography rules and build recipes in CSS grid and three.js / React Three Fiber. Use whenever building or redesigning a hero, landing page, page section, portfolio or product page that should look premium and not templated.
---

# UI Layouts

A library of section layouts collected from high-end design references, each with a reference image in `assets/layouts/`. Use it to pick a layout for every section automatically, then build it as a **real, finished section**, never as a wireframe.

## Hard rules

1. **Wireframe colors are placeholders.** The pastel blocks in the references (pink nav, blue title, purple image…) only mark regions. Never ship pastel boxes labeled "Title" / "Image". Fill every region with real content, real typography and the project's own palette/brand. L10 and L11 are screenshots of real builds: copy the effect, not their sample photos, posters or the capture toolbar at the bottom.
2. **Text stays in the DOM.** Headings, copy and CTAs are HTML (SEO, a11y, selectable). three.js renders imagery, cards and background only — never the H1.
3. **3D is progressive enhancement.** Every 3D layout must have a static fallback: `prefers-reduced-motion`, no WebGL, or low-end mobile → render the same composition with plain `<img>` + CSS transforms.
4. **One hero, one idea.** Don't stack two 3D effects in one section. Pick one signature move.
5. **Mobile first-class.** Each layout below has a mobile collapse rule — implement it, don't just shrink.

## Workflow

1. **List the sections** you are building (one hero, or a whole page: hero, features, about, gallery, CTA…). For each one, read the content: How many images? Is there a product, a number, a video? How long is the title? Is there one CTA or two?
2. **Pick a layout per section automatically** with `references/sections.md` (section → layout map + page-level rules: no repeats, one 3D section per page, rhythm). Don't ask. State the picks in one line each (`Hero → L09 Arch Frame (5 room photos)`). Only show 2–3 candidates when the user asks for options. A layout the user names always wins.
3. **Look at the reference image** for each picked layout (`assets/layouts/Lxx-*.png`, linked in `references/layouts.md`) and match its proportions and region placement. Then read that layout's grid recipe and mobile rule.
4. If the layout is marked **3D**, open `references/three-patterns.md` and use the matching pattern.
5. **Choose type with `references/typography.md`** (pairing by brand character, banned defaults, AI tells), then apply the **Craft** section below.
6. Build, then check: real content everywhere, fallback works, no horizontal scroll at 375px, LCP image not blocked by the canvas, none of the AI tells from `typography.md` §5.

## Decision table

Hero picks at a glance. For other sections, use `references/sections.md`.

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

## Craft

The layout is half the result — the other half is type, spacing and motion. If the project has a brand, use it. If it doesn't, don't fall back to defaults; make deliberate choices:

- **Type:** follow `references/typography.md`. Pick the pairing by brand character, never Inter/Roboto/Poppins/Montserrat as the display face, and use no gradient headline text. Display: `clamp(48px, 8vw, 144px)`, `line-height: 0.9–1.0`, `letter-spacing: -0.02 to -0.04em`. Body 16–18px, `line-height: 1.5`, max 60ch.
- **Scale & contrast:** big jumps between levels (H1 ≥ 4× the body size). Small meta labels in uppercase, 11–13px, `letter-spacing: 0.08em`. Contrast in size makes it look premium, not decoration.
- **Spacing:** one scale (4/8 px base), generous outer padding (`clamp(16px, 4vw, 48px)`), consistent gaps inside bento grids (8–16px). Leave the deliberate empty areas empty.
- **Color:** 1 background, 1 ink, 1 accent; the accent appears 1–3 times max (CTA, one word, one detail). Ink is near-black/near-white, never pure `#000` on `#fff` for large areas.
- **Images:** consistent treatment (same crop ratio family, same grade/tone). Real photos > stock > nothing; no placeholder gradients.
- **Motion:** entrance stagger 40–80ms, durations 400–900ms, easing `cubic-bezier(0.16, 1, 0.3, 1)` (expo-out) for reveals; nothing bounces. Hover 150–250ms. Total intro under 1.2s, CTA usable immediately.
- **Details that sell it:** rounded hero card on a contrasting page, a tiny meta line ("Est. 2019 · Prague"), real numbers, one micro-interaction on the CTA.

## Stack defaults

- React / Next.js: `@react-three/fiber`, `@react-three/drei`, optionally `@react-three/postprocessing`. Load the canvas with `next/dynamic(..., { ssr: false })`.
- Vanilla: `three` + the same math from `references/three-patterns.md`.
- Animation: GSAP or `framer-motion` for DOM, `useFrame` + damping (`THREE.MathUtils.damp`) for 3D. Scroll via Lenis or drei `ScrollControls`.
- Canvas: `dpr={[1, 1.75]}`, `gl={{ antialias: true, alpha: true }}`, pause rendering when off-screen (`frameloop="demand"` + IntersectionObserver, or drei `<PerformanceMonitor>`).
