# DIFF — SCAFFLD build vs. crl-2026.webflow.io

Mode: **REFERENCE ONLY** (see [RECON.md](RECON.md) §7).
The layout, grid, type scale, spacing rhythm and motion follow the reference. Everything brand-specific is SCAFFLD's.

## Intentional deviations

### Brand and content (by design)
| Reference | This build | Why |
|---|---|---|
| CRL wordmark, "Creative Reference Library®" lockup | SCAFFLD ticket mark + StampRSPK wordmark + "Web / Studio®" | Not our brand |
| Giant CRL / A / P letterform artwork (WebGL) | Original compositions of the SCAFFLD ticket mark (`public/shapes/*.svg`), as inline-able SVG | Their artwork; client chose no WebGL |
| Third-party portraits, book covers, quotes (Virgil Abloh, etc.) | Service illustrations and the SCAFFLD mark on cards; no photos | Not ours; real people; no SCAFFLD photography exists yet |
| Library: 20 media entries | Services wheel: 5 service lines, item counts from real data | SCAFFLD content |
| About: Resources, Principles, Creatives slider, Use case | Services accordion, Packages, Process slider, Why, Questions, Principle band, Contact | SCAFFLD content in the same section patterns |
| Footer "DES / DEV" credits for the original designers | "Say / Hello": SCAFFLD contact + index | Their credits |
| **Prices** | **None anywhere.** The pricing section, IDR amounts, price-based FAQ answers and form budget ranges are all removed. Packages show scope only; "How much does a website cost?" now says quotes are given on request | Client instruction |

### Visual system (client decisions)
- **Colour:** the reference is warm grey `#A1A098` / black / white. This build uses **`#ED3140` red as the majority surface**, `#2A2424` ink, and `#F7F2E9` cream.
- **Small text on red uses `#140F0F`:** `#2A2424` on red is only 3.7:1, which fails WCAG AA for small text. `#140F0F` is 4.6:1. Large type still uses `#2A2424`.
- **Type:** the reference's Neue Haas Grotesk 65 Medium (commercial) is replaced by the client's fonts.
  - **Befafes** (hand-drawn) sets display words.
  - **SF UI Display Light** sets body copy, numerals and labels. Befafes has no digits or symbols, so `(2026)`, `(5)`, `®` and so on render in SF.
  - **StampRSPK** sets the logo wordmark only.
  - Large statements use SF Light instead of a medium grotesk, so they read lighter than the reference.
- **Body text minimum:** `text-main` bottoms out at 13px instead of the reference's 12px, because SF Light is thinner than NHG Medium.
- **Fonts are subset to woff2** in `public/fonts/` (SF went from 178 KB to 12 KB). The original TTF/OTF files were dropped: every supported browser loads woff2.

### Effects (client chose "Library wheel" only)
| Reference | This build |
|---|---|
| WebGL (Three.js) letterform shader | Static SVG letterforms. On Index, the shape rises on load with a subtle pointer parallax. Text inverts to cream where it crosses the shape, using a CSS mask built from the same SVG (`components/InkLayer.jsx`) |
| Matter.js physics footer | GSAP `bounce.out` drop into a fixed, deterministic pile. No collision physics, so glyphs can overlap |
| Custom cursor | Not built |
| Library wheel (GSAP Observer + fanned polaroids) | Built: wheel, touch, arrow keys and ↑/↓ buttons. Cards fan out (prev / active / next). There's a Wheel ⇄ List toggle, and the List view is the accessible, scrollable fallback |
| Lightbox / video | Not applicable (no media) |

### Layout adjustments
- **Footer index column:** the reference fades the second footer column until hover. Here it's full strength, because faded text on red fails contrast.
- **Section counters:** on About the badge counts SCAFFLD's six sections. The reference's counter logic (e.g. ④ on several strips) wasn't determinable.
- **About hero:** it runs slightly taller than one viewport at 1440×900 because it has six index rows (the reference has four).
- **Index on mobile:** the "Enter Library" link becomes "Explore services". Bottom-right "J/B" becomes "About the studio · Start a project →".

## Couldn't replicate exactly (and why)
- **Motion timing:** taken from easing and duration counts in the reference bundle (mostly `power3.out` at 1s), not frame-by-frame measurement, because headless capture is static.
- **Mobile menu:** the reference's open state was never captured. Ours is a full-screen ink panel with staggered links.
- **Reference shader and cursor behaviour:** unknown, see RECON §6.
- **Tablet (768–991px):** follows the reference's Webflow breakpoints (991/767/479). The Index layout switches to the column-4 composition at ≥992px, as the reference does.

## Verification
- `npm run lint`: clean. `npm run build`: passes. Route-level code splitting is on: the Index JS is ~137 KB gzip, About 6 KB, Services 3 KB.
- **Lighthouse 12** (mobile, simulated throttling) against the production build:

  | Page | Performance | Accessibility | LCP | TBT | CLS |
  |---|---|---|---|---|---|
  | `/` | 97 | 100 | 2.2 s | 100 ms | 0 |
  | `/services` | 96 | 100 | 2.3 s | 20 ms | 0 |
  | `/about` | 94 | 100 | 2.6 s | 130 ms | 0 |
  | `/terms` | 96 | 100 | 2.4 s | 40 ms | 0 |

- **Interaction checks in headless Chrome:**
  - Services wheel responds to keyboard and mouse wheel, deep links (`/services#care`) work, and the List toggle restores scrolling.
  - About: the accordion is exclusive, the process slider works, the FAQ toggles, and form validation focuses the first invalid field.
  - The mobile menu opens and closes with Esc. Terms renders 14 clauses in EN and ID. The 404 page works.
  - No prices on any page. No console errors or warnings.
- **Not run:** a real EmailJS submission. It would send a live email to the studio inbox.
