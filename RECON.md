# RECON — crl-2026.webflow.io

Reference: <https://crl-2026.webflow.io/> ("CRL® — Creative Reference Library", V.01, 2026).
Footer credits **Josh Bendall** (design) and **Bamoj / S•BJ®** (development). This is their site, not SCAFFLD's.
**Recommended mode: REFERENCE ONLY.** Replicate the layout, grid, spacing, type scale and motion. Replace the brand, logo, letterform artwork, copy and photos with SCAFFLD material.

Captured 2026-11-13 with headless Chrome 157 at 1440 / 1024 / 768 / 390 px.
The raw captures (viewport screenshots, computed-style dumps, network logs) were working files and are no longer kept; the findings below are the record.

---

## 1. Pages

| Route | Title | Height @1440 | Behaviour |
|---|---|---|---|
| `/` (Index) | Creative Reference Library \| CRL | 900 px, one screen, no scroll | Full-bleed hero with a giant WebGL letterform behind the type |
| `/library` | The Library \| Creative References… | 900 px, one screen | 20 entries in a scroll-driven "wheel" with tilted polaroid cards; Wheel/List toggle; lightbox |
| `/about` | About CRL® \| Inside the Creative Reference Library | 7558 px | Long scroll: hero → index → resources accordion → principles → featured-creatives slider → use case → footer |

## 2. Design tokens

### Colour (Webflow `--swatch--*`)
| Token | Value | Used for |
|---|---|---|
| black | `#000000` | Text on light sections, dark section bg, letterform fill |
| light | `#FFFFFF` | Text on dark/grey, light section bg |
| dark ("brand" theme bg) | `#A1A098` | Warm-grey page bg (Index, About resources/use case) |
| grey | `#D9D9D9` | Slider arrow buttons |
| brand | `#C6FB50` | Lime; only defined as a link hover colour, not seen in captures |
| dark-faded | `#3532331A` | Hairline borders on light |
| light-faded | `#FFFFFF1A` | Hairline borders on dark |
| library bg | `#000` + `#1A1A1A` letterform | Library page |

Themes are applied per section with `.u-theme-light | -dark | -brand`, which swap the text, background, border and button vars.

### Typography
- **Family:** "Neue Haas Grotesk Text Pro", 65 Medium (one woff2 from the Webflow CDN, a **commercial** font). Fallback is Arial.
- Oswald 200–700 is loaded through WebFont.js but **no visible text uses it** (likely leftover).
- Almost everything is weight **500**; there are two 700 instances on mobile.
- Letter-spacing is -0.01em on body and -0.03em on display/headings. Line-height is mostly **1.0**, with 1.1 / 1.3 for multi-line paragraphs.
- Fluid scale: `clamp()` interpolates linearly between 320 px (20rem) and 1920 px (120rem) viewports.

| Style | Min (320) | Max (1920) | Computed @1440 | Computed @390 | LH | LS |
|---|---|---|---|---|---|---|
| display | 2.3125rem | 7.5rem | 95.1 px | 40.6 px | 1 | -0.03em |
| h1 | 1.5rem | 5.625rem | 70.2 px | — | 1 | -0.03em |
| h2 | 1.25rem | 4.25rem | 53.6 px | 26.9 px | 1 | -0.03em |
| h3 | 1.1875rem | 2.5rem | 33.7 px | — | 1.1 | -0.03em |
| h4 | 1.25rem | 2rem | | | | |
| h5 / h6 | 1rem | 1.5 / 1.25rem | | | | |
| text-xlarge | 1.85rem | 4rem | | | | |
| text-large | 0.875rem | 2rem | 26.6 px | 14.8 px | 1.3 | -0.03em |
| text-medium | 0.6875rem | 1.5rem | | | | |
| text-main (body / nav / meta) | 0.7475rem | 1rem | 14.79 px | 12.14 px | 1 | -0.01em |
| text-small | 0.65rem | 0.85rem | | | | |
| superscript (Library²⁰, ®) | — | — | 8 px | 8 px | 1 | |

### Layout & spacing
- **Grid:** 12 columns with a 1rem gutter. Page margin is fluid from 0.5rem (320 px) to 1.5rem (1440 px), measured at **12 px** each side @1440.
- Content runs full-bleed; there's no max-width container (viewport-max 120rem).
- A strong **two-column split at about 25% / 50% / 75%**: labels sit at x=12, body copy starts at x≈370 px (col 4), right-hand items at x≈728 (col 7).
- Spacing scale `--size--*` is fluid, roughly 50% at the min viewport. Examples: 1rem→0.625, 2rem→1.125, 5rem→2.5, 10rem→5, 16rem→8.
- Section padding tokens: xsmall 0.75 · small 2.5 · main 5 · medium 7 · large 10 · xlarge 12 · xxlarge 16 rem.
- **Radius:** 0 everywhere, except circular counter badges and the cursor dot.
- **Shadows:** none.
- **Borders:** 1 px hairlines between index rows.
- **Breakpoints (Webflow defaults):** ≤991, ≤767, ≤479. Also `min-width:768` and `prefers-reduced-motion` media queries, so the original **does** respect reduced motion.

## 3. Component inventory

**Global**
- **Nav (fixed, transparent):** logo lockup on the left (bold "CRL" wordmark plus "Creative / Reference Library®" set in two lines); links Index · Library²⁰ · About on the right. The active link is underlined. On mobile this collapses to a "Menu" text button. The logo shows a glitch/duplicate-offset effect (visible in a footer capture).
- **Section header strip:** `(Label)` top-left, `CRL® / V.01` at the col-4 start, and a counter badge on the right (filled dot plus outlined circle with a number, e.g. ●④).
- **Bottom meta bar** (Index/About hero): `CRL® / V.01` bottom-left, `Scroll` or `J/B` bottom-right.

**Index (`/`)**
- Hero: an outsized black letterform shape fills the viewport behind the text. It renders on a `<canvas>` using a texture SVG (`CRL-home-texture.svg`) through WebGL/Three.js.
- Display row: "CRL®" (col 1), "/V.01" (col 4), "(2026)" (right-aligned).
- Two numbered intro paragraphs `(1)` / `(2)` at col 4: text-main, white, with the first line indented by a hanging label.
- Bottom-left category index: `(2) Books … (2) Films & documentaries`.
- Mobile (390): the stack reorders. Title, then /V.01 (2026), then an underlined "Enter Library" link, then a hairline, then paragraphs.

**Library (`/library`)**
- Black bg with a giant `#1A1A1A` letterform.
- Rows show number (col 1), title (h2 size, col 4) and year (right). The active row is white; inactive rows are about 30% opacity.
- Polaroid cards (photo inside a white mat, rotated about ±20°) fan out around the active row.
- "Wheel, List" view toggle at top-left. `'26` at bottom-left.
- Clicking an entry opens a lightbox with a play button (video).

**About (`/about`)**
1. Hero on white with a giant grey `#A1A098` "AB" letterform. Statement paragraph at h2 size with a col-4 indent on the first line. A text-large sub-paragraph at col 7. A 4-row numbered index `(1) Featured Creatives / (2) Principles / (3) Materials / (4) Use Cases` with hairlines.
2. Resources section (grey): strip header, then "The Resources (5)" at h1/display, then an accordion of 5 white bars `(n) Category`. The open bar turns black and shows square thumbnail cards with white mats.
3. Principles (white): strip header, then a large statement with a first-line indent, then a numbered principles list.
4. Featured creatives slider: `1 / 4` progress bar, ←/→ square grey buttons, portrait in a black mat, quote at h3 size, then name and title. The large number sits on the left and the year on the right.
5. "Enter Library →" CTA row with a black dot.
6. Use case (grey): an angled black polygon band behind a large white statement.
7. **Footer (white):** "DES / DEV" credits in two columns with social links (the second column is faded until hovered), then a `CRL®/V.01 · (2026) · Back to top` bar, then a **black panel where letter glyphs fall and pile up under physics** (Matter.js).

## 4. Interactions & motion
Libraries are loaded from a custom bundle (`crl-2k26.vercel.app/main.js`, 897 KB) plus jQuery and Webflow:
**GSAP** (with ScrollTrigger, Flip and Observer), **Lenis**, **Three.js / WebGL** (5 canvases on About), and **Matter.js**.
Webflow IX2 is not used; every animation is custom JS.

| Interaction | Where | Details (from bundle and captures) |
|---|---|---|
| Smooth scroll | All | Lenis |
| WebGL letterform texture | Index, Library, About | Three.js canvas rendering the giant glyph art; likely a pointer/scroll distortion shader (stills only) |
| Wheel navigation | Library | GSAP Observer captures wheel/touch so rows rotate through the active position; polaroids re-fan (likely Flip) |
| Wheel ⇄ List toggle | Library | Probably Flip-animated layout change |
| Lightbox with video | Library, About resources | Play-button overlay |
| Custom cursor | Site-wide (51 `cursor` rules) | Dot/label cursor, details not captured |
| Accordion | About resources | Open bar inverts to black and reveals thumbnails |
| Slider | About creatives | 1/4 progress bar plus arrow buttons |
| Section counters | About strips | ●④ badges update per section |
| Logo glitch | Nav | Duplicated, offset text layers |
| Physics footer | About footer | Glyph bodies drop and stack (Matter.js) |
| Text and element reveals | Throughout | `power3.out` dominates (40×); durations 1s (33×), 0.4–0.5s, 1.5s; also `expo.inOut`, `power4.out`, `sine.out` |
| Hovers | Links/buttons | Theme-var swap (bg/border/text); faded footer column goes to full opacity |

## 5. Fonts
- **Neue Haas Grotesk Text Pro 65 Medium** is commercial (Monotype), so it can't be copied.
- Closest free match: **Inter Tight 500** or **Inter Display 500** (Google Fonts). Both have very similar proportions, but the R, G and a are narrower than NHG. Another option is "Instrument Sans" 500.
- Alternatively, use SCAFFLD's own fonts already in `/public`: StampRSPK (display) and SF UI Display **Light only**. Neither matches the reference's medium grotesk.

## 6. Couldn't determine / not verified
- The exact shader behaviour of the WebGL letterforms, the cursor design and the lightbox styling. Headless capture only records static frames.
- The mobile menu's open state, the Library wheel scroll physics, the List view, and the accordion/slider transition timings. These come from the bundle's easing/duration counts, not frame-accurate measurement.
- Whether there are page transitions between routes. There's no Barba/Swup; it may be in-bundle.
- Hover colours on dark sections (brand lime `#C6FB50` is defined but wasn't observed).

## 7. Mapping to SCAFFLD (proposed) and conflicts to resolve
| Reference | SCAFFLD equivalent |
|---|---|
| Index (one-screen hero) | Home: "SCAFFLD® /V.01 (2026)" style display row, intro paragraphs, service-category index (no counts invented) |
| Library wheel (20 entries) | Services wheel (5 service lines plus their sub-items), or Work once real projects exist |
| About long scroll | About → Services accordion → Principles/Process → Why → FAQ → Contact/inquiry |
| DES/DEV physics footer | Falling "SCAFFLD" glyphs, WhatsApp/social, back to top |
| CRL letterform artwork | SCAFFLD ticket-mark / wordmark shapes (our own artwork) |
| Third-party portraits and book covers | Removed or placeholders. Not reused (not ours, and they show real people) |

**Prices:** removed everywhere on your instruction. That covers the Pricing section, the IDR values in the service "related" rows, the price-based FAQ answers ("redesign starts from…", "maintenance at IDR 300,000…"), and the IDR budget ranges in the inquiry form.

### Decisions (confirmed 2026-11-13)
1. **Mode:** REFERENCE ONLY. Layout, grid, type scale, spacing and motion are replicated; brand, artwork, copy and imagery are SCAFFLD's.
2. **Stack:** keep **Vite + React (JS)**, not Next.js/TS. Images use `<img>` with explicit width/height instead of `next/image`. "Typecheck" in Phase 4 becomes ESLint plus a production build.
3. **Type:** revised by the client to SCAFFLD's own fonts.
   - **Befafes** (hand-drawn, from `/public`) for display words.
   - **SF UI Display Light** for body copy, numerals and labels. Befafes has no digits or symbols, so these fall back to SF.
   - **StampRSPK** for the logo wordmark only.
   - Colours: **#ED3140 is the majority surface**, with **#2A2424** as ink; the reference grey becomes red.
4. **Effects:** the **Library-style wheel** only (GSAP Observer/Flip, no new dependency).
   - No physics footer: a static/animated SCAFFLD glyph panel instead.
   - No WebGL: giant letterforms become animated inline SVG.
   - No custom cursor.
5. **No prices** anywhere on the site.
