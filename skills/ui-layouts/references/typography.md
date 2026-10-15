# Typography that doesn't look AI-generated

Generated sites tend to share the same tells: Inter everywhere, every heading weight 600, a Tailwind default scale, gradient text, everything centered. Typography is the fastest way to spot them. If the project already has brand fonts, use them and only apply the rules from section 3 onward.

## 1. Fonts to avoid as the display face

When there's no brand font, don't reach for these defaults: **Inter, Roboto, Open Sans, Poppins, Montserrat, Lato, Nunito, Raleway, Arial / `system-ui`**. Also avoid these overused combos: **Space Grotesk on everything**, **Playfair Display + Inter**, **Poppins + gradient**.
Inter and system fonts are fine for small UI text (forms, tables), but never for the H1.

## 2. Pick a pairing by brand character

Max **2 families**, plus optionally a mono for meta labels and numbers. Pick a pairing from the brand's character, not from habit, and leave a one-line CSS comment saying why (`/* warm, crafted: guesthouse */`).

| Character | Display | Text | Source |
|---|---|---|---|
| Editorial, luxury, fashion | Instrument Serif, Fraunces (opsz), Gambetta | Hanken Grotesk, Switzer | Google / Fontshare |
| Tech, SaaS, developer | Geist, Bricolage Grotesque, General Sans | Geist, Hanken Grotesk + Geist Mono / JetBrains Mono | Google / Fontshare |
| Warm, crafted (food, hospitality, local) | Fraunces (soft, wonk), Young Serif, Erode | Schibsted Grotesk, Familjen Grotesk | Google / Fontshare |
| Bold, sport, outdoor | Archivo (wdth 62–125), Big Shoulders Display, Clash Display | Archivo, Switzer | Google / Fontshare |
| Creative studio, playful | Syne, Unbounded, Cabinet Grotesk | Satoshi, Manrope | Google / Fontshare |
| Minimal, architecture, art | Satoshi, Neue Montreal\*, Supreme | the same family, lighter weight | Fontshare / Pangram |
| Classic, trust (law, finance, health) | Newsreader, Zodiak, Sentient | Source Sans 3, Switzer | Google / Fontshare |

\* Licensed fonts (Neue Montreal, PP Editorial…) only when the project already owns them.

**Diacritics:** for non-English content, check the font's glyph coverage before choosing it. Czech needs `ě š č ř ž ý á í é ů ú ď ť ň`. Load the `latin-ext` subset. A font that falls back mid-word is an immediate fail.

## 3. Scale and weight

- **Fluid scale with a real ratio** (1.25–1.414), not `text-4xl/2xl/base`. Display `clamp(48px, 8vw, 144px)`, H2 `clamp(36px, 5vw, 80px)`, body 16–18px. The H1 is ≥ 4× the body size.
- **Weight contrast, not weight 600 everywhere.** Either display at 300–400 with large size (refined), or 700–900 tight (bold). Body text uses 400, and emphasis uses 500. Use no more than 3 weights per page.
- **Tracking:** display `-0.02` to `-0.04em`, body `0`, and uppercase meta labels `+0.06` to `+0.1em` at 11–13px. Never letter-space body text, and never set body text in uppercase.
- **Leading:** display 0.9–1.05, H2 1.05–1.15, body 1.5–1.6. Measure 45–70ch.

## 4. Details that read as designed

- `text-wrap: balance` on headings, `text-wrap: pretty` on paragraphs. No orphans in the H1.
- `font-variant-numeric: tabular-nums` for prices, stats and counters. `lining-nums` in tables.
- Use variable-font axes where they exist (`opsz` on Fraunces/Newsreader, `wdth` on Archivo, `SOFT`/`WONK` on Fraunces) and stylistic sets (`font-feature-settings: "ss01"`) for character.
- Use real typography characters: `’` and `“ ”` (Czech `„ “`), `–` for ranges, `×`, `…`. Czech: non-breaking space after single-letter prepositions and conjunctions (`v k s z o u a i`) and between a number and its unit (`5 km`, `120 Kč`).
- Sentence case for headings and buttons. Title Case only if the brand uses it.
- Mix styles with restraint. One italic serif word inside a sans headline is a strong move, but use it **at most once per page**, because it is also turning into a cliché.

## 5. AI tells to never ship

- Gradient-filled headline text (`background-clip: text` with a rainbow or purple-blue gradient).
- Emoji in headings or bullet lists.
- Every section centered. Left-align the body text, and only center short heroes and CTAs.
- Three identical cards with a 2-word title + one-line description + icon.
- Generic copy: "Unlock the power of…", "Elevate your…", "Seamless", "Revolutionize", "In today's fast-paced world". Write specific nouns and real numbers instead.
- Same font size for the eyebrow, caption and button.

## 6. Loading

- Self-host or use `next/font` (`display: 'swap'`, subsets including `latin-ext`). Fontshare fonts: download the woff2, don't hotlink in production.
- Preload only the display face's weight that renders the LCP heading.
- Match the fallback metrics (`size-adjust`, `ascent-override`, or `next/font`'s `adjustFontFallback`), so the swap causes no layout shift.
