# Layout catalog

Region names follow the reference wireframes. Grid recipes assume a 12-column container (`max-width: 1440px`, `padding-inline: clamp(16px, 4vw, 48px)`). The outer hero is usually a rounded card (`border-radius: clamp(16px, 2vw, 32px)`) sitting on a darker or neutral page background — that framing is part of the look.

---

## L01 Title Banner
Regions: Nav (full width) · Title (cols 1–9, top) · empty breathing space (cols 10–12) · Image (full width, bottom ~55%).
```css
.hero{display:grid;grid-template-columns:repeat(12,1fr);grid-template-rows:auto minmax(28vh,auto) minmax(45vh,1fr)}
.title{grid-column:1/10;grid-row:2;align-self:center}
.image{grid-column:1/-1;grid-row:3;object-fit:cover}
```
Content: oversized headline (clamp(48px, 8vw, 128px)), tight leading. The empty top-right corner is deliberate — put nothing there, or a tiny meta label.
Mobile: title full width, image 60svh below.

## L02 Anchored Split
Regions: Nav · Title anchored bottom-left (cols 1–5) · Image tall right (cols 7–12, full hero height).
```css
.title{grid-column:1/6;align-self:end;padding-bottom:4vh}
.image{grid-column:7/-1;grid-row:1/-1;aspect-ratio:4/5}
```
Mobile: image first (aspect 4/5), title below.

## L03 Centered Showcase
Regions: Nav · centered stack Title → Caption → CTA (cols 3–10) · wide Image/screenshot peeking from bottom (cols 2–11), cropped by the hero's bottom edge.
Tip: image `translateY(10%)` and hero `overflow:hidden` so it feels like it continues. Subtle parallax on scroll.
Mobile: stack stays centered; image 100% width.

## L04 Orbit Scatter
Regions: Nav · centered Title · 6–8 small portrait Images scattered around it · Supporting text bar at bottom (full width).
Positions (% of hero, image center): (8,20) (35,25) (88,25) (22,52) (70,52) (62,80) — vary sizes 90–140px wide, slight rotations ±6°.
Motion: each image drifts on its own sine (amplitude 6–12px, period 6–11s); mouse parallax with different depth per image (0.2–1.0).
3D-lite: render images as planes in three.js at different z for real parallax (see `three-patterns.md` → Parallax Planes).
Mobile: keep 4 images, smaller, around the title; hide the rest.

## L05 Minimal Center
Regions: Nav · Label (eyebrow) · Title · gap · Caption · CTA. All centered, cols 4–9.
Content is everything: one great sentence. Add one quiet motion: text reveal by line (mask + translateY) or animated gradient on one word.
Mobile: same, left-aligned is acceptable.

## L06 Perspective Tunnel — 3D
Regions: corner chrome only (Logo top-left, Menu top-right, small labels bottom-left/right e.g. "SPACE" / "FUTURE") · horizontal row of ~12 cards that are huge at the edges and tiny in the center, angled toward the viewer like walls of a corridor.
Build: cards on a cylinder/corridor, camera looking down its axis. See `three-patterns.md` → Tunnel.
Interaction: drag / wheel scrolls cards along the corridor (infinite loop), hovered card lifts.
CSS fallback: flex row, each card `transform: perspective(1200px) rotateY(±(i-center)*8deg) scale(...)`.
Mobile: vertical tunnel (cards above/below) or switch to a swipe carousel.

## L07 Spiral Ring — 3D / CSS
Regions: Cards/Images/Text tiles arranged on a ring; size grows along the ring (tiny on one side, large on the other), creating a spiral-into-depth feel. Hero card frame, mostly empty center → put the title in the center.
Build: items on a circle (radius R), scale = lerp(0.3, 1.6, t), z = lerp(-4, 2, t). Rotate the whole ring on scroll; the item reaching the "large" spot becomes the featured one (show its caption).
Mobile: smaller radius, 8 items max.

## L08 Warped Collage — 3D
Regions: Title card, Text cards, Image cards, one central Media (video with play button), scattered with gaps; each panel is slightly curved/bent like paper.
Build: planes with vertex bending (`three-patterns.md` → Bend Shader), each with its own bend amount and rotation. Mouse moves = subtle bend + parallax. Text panels can be DOM overlaid with drei `<Html transform>` or rendered to texture.
Mobile: becomes a vertical masonry with mild CSS `rotate` and skew; keep the media card first.

## L09 Arch Frame
Regions: Number (left, e.g. "01") · Image (center rectangle) · Title (right) · small pager bottom ("01 / 12" left, arrows right). Top and bottom are big concave arcs cut out of the frame, making the image sit in a waisted window.
Build: SVG `<mask>` or `clip-path: path()` on the background layer; the side panels have rounded inner corners that follow the arcs. Slide transition: image swaps with a wipe, number rolls (odometer).
Mobile: arcs become shallower, Number above image, Title below.

## L10 Light Smear Carousel — 3D shader
Regions: three portrait posters, center one sharp and upright, side ones angled and **smeared into long chromatic light trails** flowing out to the edges. Bottom toolbar optional. "Drag to explore" hint.
Build: `three-patterns.md` → Smear Shader. Side cards stretch UVs along x toward the screen edge with color separation. On drag, cards rotate around and smear strength follows velocity.
Fallback: center image + two blurred side images with `filter: blur(8px) saturate(1.6)` and a gradient mask.

## L11 Cascading Deck — 3D
Regions: many posters/cards falling in a diagonal stream from top-left to bottom-right, overlapping, with depth; edges near the viewer get chromatic aberration. Small meta label top-right ("ARCHIVE Nº 06").
Build: planes along a curve (CatmullRom from top-left-far to bottom-right-near), each rotated slightly around z and y. Scroll moves items along the curve. Post: `ChromaticAberration` + slight `Noise`.
Fallback: CSS stacked cards with transforms on a diagonal.
Mobile: vertical stream.

## L12 Stepped Funnel
Regions: Nav · Title, Subtitle, CTA in the center · background split in two colors where the boundary is a symmetric staircase descending to the center (a pixel-V).
Build: `clip-path: polygon(...)` with ~5 steps per side on the upper shape. Animate steps in one by one on load (stagger by 60ms). Optional: steps react to cursor x.
Mobile: 3 steps per side.

## L13 Bento Triptych
Regions: Nav · left column: Title (big), Media, Text · center: tall Image · right column: Card, Text, CTA.
```css
.hero{display:grid;grid-template-columns:1fr 1.15fr .8fr;grid-template-rows:1.4fr .7fr .7fr;gap:12px}
.title{grid-area:1/1/2/2}.media{grid-area:2/1/3/2}.text1{grid-area:3/1/4/2}
.image{grid-area:1/2/4/3}
.card{grid-area:1/3/2/4}.text2{grid-area:2/3/3/4}.cta{grid-area:3/3/4/4}
```
Each tile: radius 16–24px, own background shade. Hover: tile scales 1.01 and reveals detail.
Mobile: Title → Image → rest as 2-col mini-bento.

## L14 Product Spotlight
Regions: header row (Logo · Navigation pill · Icon · CTA) · vertical Slider/progress (left) · Media thumbnail (bottom-left) · tall Product image (center) · Badge, Title, Price, CTA stacked bottom-right.
Optional 3D: replace product image with a GLB model in drei `<Stage>` + `<PresentationControls>`, auto-rotate slowly.
Mobile: product image top, info block below, slider becomes dots.

## L15 Angular Bento
Regions: header (Logo · Nav pill · CTA) · Title panel (with Thumb, Text, two Buttons) top-left · Image top-right · Image bottom (wide) · Product bottom-right. Panels have **chamfered/angled edges** that interlock with consistent gaps.
Build: CSS grid + `clip-path: polygon()` per panel; keep gap uniform by offsetting polygons by the same amount. Rounded corners: use SVG `path` masks with small radii instead of raw polygons.
Mobile: drop angles to simple stacked rounded cards, keep one diagonal cut as accent.

## L16 Arc Halo
Regions: header bar (Logo · Navigation · Icon) · big semicircular band (background shape) behind · huge Title box centered at the bottom of the arc · Text · two CTAs · small footer text.
Build: arc = SVG path or `border-radius:50%` ring clipped to top half. Animate the arc's gradient slowly rotating; or 3D-lite: a torus segment in three.js with soft material behind the DOM title.
Mobile: arc scales to width, title clamp(40px, 12vw, 72px).
