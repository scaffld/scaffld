# SCAFFLD® — Web Studio

Marketing site for SCAFFLD, a web studio that builds websites and digital products for every kind of business.

**Stack:** Vite 8 · React 19 · React Router 7 · Tailwind CSS 4 · GSAP 3 (ScrollTrigger, SplitText, Observer) · Lenis

## Quick start

Requires Node.js 20.19+ (for Vite 8).

```bash
npm install
cp .env.example .env   # optional, see "Inquiry form"
npm run dev            # http://localhost:5173
```

| Script | Purpose |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the production build |
| `npm run lint` | ESLint |

## Project structure

```text
public/
  fonts/          Subset woff2 brand fonts (self-hosted)
  shapes/         Letterform artwork, one SVG per page
  favicon.svg
  og-image.png    Social share image
src/
  constant/site.js  All copy and contact data
  components/       Nav, Footer, InkLayer, InquiryForm, Accordion, …
  components/svg/   BrandMark / Logo, service icons
  lib/              GSAP setup, scroll-reveal hook, Terms markdown parser
  pages/            One file per route
  terms/            Terms of service (EN + ID markdown)
  index.css         Tailwind theme: colours, fonts, fluid type, grid
```

Imports use the `@/` alias for `src/`.

## Pages

| Route | File | Notes |
| --- | --- | --- |
| `/` | `src/pages/Home.jsx` | Single-screen index. Text inverts where it crosses the giant mark (`InkLayer`). |
| `/services` | `src/pages/Services.jsx` | Wheel driven by scroll, keys or touch, with a Wheel ⇄ List toggle. `#web`, `#app`, `#shop`, `#design` and `#care` deep-link to a service. |
| `/about` | `src/pages/About.jsx` | Services accordion, packages, process slider, why us, FAQ, contact form. |
| `/terms` | `src/pages/Terms.jsx` | Renders `src/terms/term.md` (EN) and `term-id.md` (ID). |

Only Home is in the main bundle. The other routes and the footer are lazy-loaded.

## Editing content

- **Copy, services, packages, process, FAQ, form options, WhatsApp number and social links:** `src/constant/site.js`.
- **Terms:** the markdown files in `src/terms/`. The parser supports headings, paragraphs, nested lists, `---`, `**bold**` and `_italic_`.
- **No prices are published.** Packages list scope and delivery estimates only; quotes are given on request.

## Design tokens

Defined in the `@theme` block of `src/index.css`.

- **Colours:** `primary` #ED3140 (main surface), `dark` #2A2424 (ink), `cream` #F7F2E9, and `ink` #140F0F for small text on red (meets WCAG AA).
- **Fonts:** `font-display` Befafes · `font-sans` SF UI Display Light · `font-stamp` StampRSPK (logo only). Befafes has no digits or symbols, so numerals and `®` are set in SF.
- **Fluid scale:** `text-display`, `text-h1`–`text-h3`, `text-large`, `text-medium`, `text-main`, `text-small`, plus `px-site` and `py-sec*`. Everything scales linearly between 320px and 1920px viewports.
- **Grid:** `.site-grid` has 12 columns, a 1rem gutter and a fluid page margin.

Each file in `public/shapes/` both paints the letterform and masks the inverted text, so the two always line up.

## Inquiry form

`src/components/InquiryForm.jsx` sends via EmailJS when these are set in `.env`:

```dotenv
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
```

The template receives `name`, `company`, `email`, `reply_to` and `message`.
If the variables aren't set, the form opens WhatsApp with the inquiry pre-filled and tells the visitor. It never shows a fake "sent" state.

## Accessibility and motion

- When the visitor's system requests reduced motion (`prefers-reduced-motion: reduce`), all animation is skipped. Content is always visible without JS animation.
- Keyboard support includes a skip link, visible focus, a mobile menu that closes with Esc, arrow keys on the Services wheel, and ARIA-wired accordions and slider.

## Deployment

`npm run build` outputs a static site to `dist/`. It's a single-page app, so the host must rewrite unknown paths to `/index.html` (an SPA fallback on Vercel, Netlify, etc.). Set the EmailJS variables in the host's environment settings before building.

## Further docs

- [RECON.md](RECON.md): analysis of the reference site (tokens, components, interactions).
- [DIFF.md](DIFF.md): intentional deviations from the reference, plus Lighthouse and interaction-check results.
