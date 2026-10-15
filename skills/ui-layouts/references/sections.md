# Section → layout map

The catalog was drawn as heroes, but most layouts work for other page sections too. Use this map to pick a layout **automatically** for every section you build. Do not ask the user which layout to use unless they asked for options. Say what you picked in one line, e.g. `Hero → L09 Arch Frame (5 room photos, short title)`. A layout the user names always wins.

## 1. Classify the section

Work out the section type from the user's request, the page outline or the existing markup (heading text, `id`/`class` names, content). If a section fits two types, use the one that matches its main content.

## 2. Pick from the map

Go down the rows for that section type and take the first one whose content signal matches.

| Section | Content signal | Layout |
|---|---|---|
| **Hero** | one wide photo, strong headline | L01 Title Banner |
| | one tall portrait / person / editorial | L02 Anchored Split |
| | app or SaaS screenshot | L03 Centered Showcase |
| | single product with price | L14 Product Spotlight |
| | several products / premium gear | L15 Angular Bento |
| | 3–6 slides with titles (rooms, tours, events) | L09 Arch Frame |
| | 6–8 small images, playful brand | L04 Orbit Scatter |
| | 8–14 gallery items | L06 Perspective Tunnel |
| | 3 key visuals (fashion, music, posters) | L10 Light Smear Carousel |
| | many content types (video + text + cards) | L13 Bento Triptych, or L08 Warped Collage when 3D is wanted |
| | startup, huge title, two CTAs | L16 Arc Halo |
| | one launch CTA, bold brand | L12 Stepped Funnel |
| | no imagery, one strong sentence | L05 Minimal Center |
| **Features / services** | 4–7 items of mixed weight | L13 Bento Triptych |
| | premium / outdoor / sport product features | L15 Angular Bento |
| | 2–3 big features | L02 Anchored Split, repeated with sides alternating |
| | one feature + product screenshot | L03 Centered Showcase |
| **About / story / team** | portrait or team photo + text | L02 Anchored Split |
| | place photo (restaurant, venue, studio) | L01 Title Banner |
| | manifesto, values, no photo | L05 Minimal Center |
| **Gallery / portfolio / work** | 3 hero pieces | L10 Light Smear Carousel |
| | 6–8 pieces, playful | L04 Orbit Scatter |
| | 8–14 pieces | L06 Perspective Tunnel |
| | case studies, collections, timeline | L07 Spiral Ring |
| | archive, posters, 15+ pieces | L11 Cascading Deck |
| **Product / shop** | single product detail | L14 Product Spotlight |
| | product range, 3–5 products | L15 Angular Bento |
| **Slideshow content** (rooms, events, tour dates, testimonials with photos) | 3–12 items with index + title | L09 Arch Frame |
| **Press / blog / media mix** | video + articles + quotes | L08 Warped Collage (3D) or L13 Bento Triptych |
| **Stats / numbers** | 3–6 numbers | L13 Bento Triptych (one number per tile) |
| **CTA / signup / closing** | one action, bold | L12 Stepped Funnel |
| | two actions, product launch | L16 Arc Halo |
| | quiet, text-led | L05 Minimal Center |

No row fits → use the closest **CSS** layout. Don't force a 3D one.

## 3. Page-level rules

Run these over the whole page after picking each section:

1. **No repeats.** Each layout appears at most once per page. The only exception is the alternating L02 pattern for features. If a pick is already used, take the next matching row.
2. **One 3D section per page** (L06, L07, L08, L10, L11), unless **3D mode** is on (§5). Every other section stays CSS. If two sections want 3D, give it to the one higher on the page and use the CSS fallback or the next row for the other.
3. **Rhythm.** Alternate dense and airy sections. Never put two bento layouts (L13, L15) next to each other, and follow a busy section with a calm one (L05, L01, L02).
4. **Hero sets the tone.** Later sections reuse the hero's radius, gap and image treatment. Don't introduce a new visual language halfway down the page.

## 4. Adapting a hero layout to an inner section

- **Drop the Nav region.** Only the hero carries navigation.
- The heading becomes `<h2>`, and the display size steps down one level (about `clamp(36px, 5vw, 80px)`).
- Height is `auto` with generous padding (`clamp(64px, 10vw, 160px)` block). Never use `100svh` below the hero.
- Use a `<section>` with `aria-labelledby` pointing at its heading.
- 3D in an inner section renders only while it is in view (IntersectionObserver) and must not block scrolling. Scroll-driven 3D (L11) gets a bounded scroll range, so it never traps the wheel.

## 5. 3D mode: the user explicitly asks for three.js

**Trigger.** The user explicitly names three.js, WebGL, React Three Fiber / R3F, "3D website" or "immersive". Mentioning a 3D product model alone only switches L14 to its GLB variant, not the whole page. In 3D mode, map the **whole page** so 3D runs through it as one coherent experience, rather than a single effect bolted on.

**Map.** Use this table instead of §2. Tags: **3D** = full scene, **3D-lite** = parallax planes / one mesh behind DOM, **CSS** = no canvas.

| Section | Content signal | 3D-mode layout |
|---|---|---|
| **Hero** (always 3D) | 8–14 images / work | L06 Perspective Tunnel (3D) |
| | 3 key visuals | L10 Light Smear Carousel (3D) |
| | collections, case studies | L07 Spiral Ring (3D) |
| | mixed media (video + text + cards) | L08 Warped Collage (3D) |
| | archive, 15+ posters | L11 Cascading Deck (3D) |
| | single product | L14 Product Spotlight with GLB model (3D) |
| | few images, playful | L04 Orbit Scatter as parallax planes (3D-lite) |
| | text-led startup, no imagery | L16 Arc Halo with torus segment (3D-lite) |
| **Gallery / portfolio** | by item count, as in §2 | whichever of L06 / L07 / L10 / L11 the hero didn't use (3D) |
| **Product** | single product | L14 with GLB model (3D) |
| **Press / media mix** | video + articles | L08 Warped Collage (3D), if the hero isn't L08 |
| **Features / about / stats** | text-heavy | stay **CSS** (L13, L15, L02, L05). Optionally 3D-lite image tilt on hover. Text sections never get a scene. |
| **CTA / closing** | two actions | L16 Arc Halo with torus segment (3D-lite) |
| | one action | L12 Stepped Funnel (CSS). Steps may rise in with depth on scroll. |

**Rules for a page that makes sense:**
1. **Max 3 full 3D sections** per page (hero + 2). Everything else is CSS or 3D-lite.
2. **Never two 3D sections next to each other.** A CSS section sits between them as a rest beat.
3. **No pattern twice.** Tunnel, spiral, bend, smear, cascade and model each appear at most once.
4. **One scene language.** All 3D sections share the camera FOV, lighting/environment, damping speed, image grade and post-processing. They should feel like rooms of the same building, not demos from three sites.
5. **One WebGL context.** Use a single fixed `<Canvas>` with drei `<View>` per section (`three-patterns.md` → Multiple 3D sections), not one Canvas per section.
6. **Story order.** The hero is the strongest effect (it sets the world). The middle 3D section is calmer, and the closing CTA is 3D-lite at most.
7. Every 3D section still keeps its DOM text, its static fallback and pauses off-screen (§4). On mobile, only the hero keeps 3D. Other sections use their CSS fallback.

State the map with tags, e.g. `Hero → L06 Tunnel (3D) · Features → L13 Bento (CSS) · Work → L07 Spiral (3D) · About → L02 Split (CSS) · CTA → L16 Arc Halo (3D-lite)`.
