<div align="center">

# hero-layouts

**16 premium hero section layouts as a Claude skill.**
Bento, split, arc, stepped funnel, perspective tunnel, spiral ring, warped collage, light-smear carousel, cascading deck…
with ready build recipes in CSS grid and three.js / React Three Fiber.

[![npm](https://img.shields.io/npm/v/hero-layouts?color=cb3837&logo=npm)](https://www.npmjs.com/package/hero-layouts)
[![license](https://img.shields.io/npm/l/hero-layouts)](LICENSE)
[![Claude skill](https://img.shields.io/badge/Claude-skill-d97757)](https://docs.claude.com/en/docs/claude-code/skills)

</div>

---

## Why

Ask an AI for a landing page and you usually get the same thing: centered headline, two buttons, gradient blob. This skill gives Claude a catalog of layouts taken from high-end design references, plus strict rules for turning them into **finished, production-grade sections** — real content, accessible markup, a static fallback for every 3D effect and a proper mobile layout.

## Install

**Globally** — available in every project (`~/.claude/skills/hero-layouts`):

```bash
npx hero-layouts --global
```

**Into the current project** (`./.claude/skills/hero-layouts`, commit it with your repo):

```bash
npx hero-layouts
```

**As a dev dependency** — the skill is copied on every `npm install`, so the whole team stays on the same version:

```bash
npm i -D hero-layouts
```

> **Update:** run the same command again (`npx hero-layouts@latest …`). The installer replaces the old copy.
>
> **pnpm / bun** block install scripts by default — use the `npx` variant there.

## Usage

Nothing to configure. Ask Claude for a hero, landing page, portfolio or product page and the skill loads automatically.

Let it choose:

> Build a hero for our coffee roastery landing page. We have 3 product photos and one CTA.

Or name a layout:

> Make the hero for the guesthouse site as **L09 Arch Frame**, with the 5 room photos as slides.

Claude reads your content (number of images, title length, CTAs…), picks or suggests 2–3 fitting layouts, then builds the chosen one.

## Layouts

| ID | Name | Type | Best for |
|----|------|------|----------|
| L01 | Title Banner | CSS | Strong headline + one wide photo (restaurants, guesthouses) |
| L02 | Anchored Split | CSS | Editorial / portfolio, one tall portrait image |
| L03 | Centered Showcase | CSS | SaaS / app — headline, CTA, product screenshot below |
| L04 | Orbit Scatter | CSS / 3D-lite | Creative studio, many small images, playful |
| L05 | Minimal Center | CSS | Text-led, agency, manifesto, no imagery |
| L06 | Perspective Tunnel | **3D** | Gallery / portfolio with 8–14 items, "journey" feel |
| L07 | Spiral Ring | **3D** / CSS | Collections, case studies, timeline of work |
| L08 | Warped Collage | **3D** | Content-rich brand: media + text + cards floating |
| L09 | Arch Frame | CSS (SVG mask) | Slideshow with index number + title, event, tour |
| L10 | Light Smear Carousel | **3D** shader | Fashion, music, posters — 3 hero visuals |
| L11 | Cascading Deck | **3D** | Archive / editorial, many posters, scroll-driven |
| L12 | Stepped Funnel | CSS (clip-path) | Bold launch page, single CTA |
| L13 | Bento Triptych | CSS grid | Brand / product overview with many small modules |
| L14 | Product Spotlight | CSS grid (+3D model) | E-shop product hero: image, badge, price, CTA |
| L15 | Angular Bento | CSS clip-path | Premium product / outdoor / sport brand |
| L16 | Arc Halo | CSS / 3D-lite | Startup landing, huge title, two CTAs |

## Built-in rules

The skill makes Claude follow these on every build:

- **No wireframes** — placeholder regions are always filled with real content, typography and your brand palette.
- **Text stays in the DOM** — headings and CTAs are HTML (SEO, a11y); three.js renders only imagery and background.
- **3D is progressive enhancement** — `prefers-reduced-motion`, no WebGL or low-end mobile get a static composition.
- **One hero, one idea** — a single signature effect per section.
- **Mobile first-class** — every layout has its own collapse rule, checked at 375 px with no horizontal scroll.
- **Performance** — capped DPR, paused off-screen rendering, LCP image never blocked by the canvas.

## Stack

- **React / Next.js:** `@react-three/fiber`, `@react-three/drei`, optional `@react-three/postprocessing`
- **Vanilla:** `three` with the same math
- **Animation:** GSAP or Framer Motion for DOM, `useFrame` + damping for 3D, Lenis or drei `ScrollControls` for scroll

The skill only contains instructions — it adds no runtime dependencies to your project.

## What's inside

```
skill/
├── SKILL.md                      rules, workflow, decision table
└── references/
    ├── layouts.md                all 16 layouts: regions, grid recipe, mobile rule
    └── three-patterns.md         R3F code: tunnel, spiral, bend + smear shaders,
                                  cascade, parallax planes, product model
```

## Contributing

Ideas for new layouts or fixes are welcome — open an issue or a PR. New layouts should include regions, a grid recipe and a mobile rule, following the format in `skill/references/layouts.md`.

## License

[MIT](LICENSE) © Bob Čermák
