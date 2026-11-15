import { useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { brand, nav, social, waLink, WHATSAPP_DISPLAY } from "@/constant/site";
import { useSmoothScroll } from "./SmoothScroll";
import { BrandMark } from "./svg/BrandMark";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { onFirstView } from "@/lib/useReveal";

/* Deterministic "pile" so layout is stable between renders */
function seeded(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}
const GLYPHS = "SCAFFLDWEBSTUDIOSCAFFLD".split("");

function GlyphPile() {
  const ref = useRef(null);
  const pieces = useMemo(() => {
    const r = seeded(7);
    return GLYPHS.map((ch, i) => ({
      ch,
      mark: i % 7 === 3,
      left: (i / GLYPHS.length) * 100 - 3 + (r() - 0.5) * 5,
      bottom: (i % 2 ? 22 : 0) + r() * 12 - 8,
      rot: (r() - 0.5) * 150,
      size: 0.9 + r() * 0.45,
      delay: r() * 0.9,
    }));
  }, []);

  useGSAP(
    (_ctx, contextSafe) => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const els = gsap.utils.toArray("[data-glyph]", ref.current);
        gsap.set(els, { autoAlpha: 0 });
        // Glyphs drop and settle into the pile when the panel comes into view
        return onFirstView(
          [ref.current],
          contextSafe(() => {
            els.forEach((el) => {
              gsap.fromTo(
                el,
                { y: -(ref.current.offsetHeight + 200), rotation: Number(el.dataset.rot) * 0.2, autoAlpha: 1 },
                { y: 0, rotation: Number(el.dataset.rot), duration: 1.4 + Number(el.dataset.delay) * 0.4, delay: Number(el.dataset.delay), ease: "bounce.out" },
              );
            });
          }),
          "0px 0px -15% 0px",
        );
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} aria-hidden="true" className="relative mx-site h-[clamp(14rem,32vw,28rem)] overflow-hidden bg-dark text-cream">
      {pieces.map((p, i) => (
        <span
          key={i}
          data-glyph=""
          data-rot={p.rot}
          data-delay={p.delay}
          className="absolute block leading-none"
          style={{
            left: `${p.left}%`,
            bottom: `${p.bottom}%`,
            transform: `rotate(${p.rot}deg)`,
            fontSize: `calc(clamp(4.5rem, 14vw, 13rem) * ${p.size})`,
            WebkitTextStroke: "0.045em currentColor",
          }}
        >
          {p.mark ? <BrandMark className="size-[0.75em]" strokeWidth={14} /> : <span className="font-display">{p.ch}</span>}
        </span>
      ))}
    </div>
  );
}

export function Footer() {
  const { scrollTo } = useSmoothScroll();
  const year = new Date().getFullYear();
  const linkCls = "link-u inline-block w-fit py-1";

  return (
    <footer className="bg-primary pt-sec text-ink" data-nav="dark">
      <div className="site-grid gap-y-10">
        <p className="col-span-12 max-w-md text-large md:col-span-6">
          {brand.tagline}.
          <br />
          {brand.support}.
        </p>

        <div className="col-span-12 md:col-span-6">
          <p className="font-display text-h1 text-dark" aria-hidden="true">
            Say <span className="text-cream">/ Hello</span>
          </p>
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="group/col">
              <p className="border-b border-current pb-3 text-main">Contact</p>
              <ul className="mt-4 grid pl-1 text-main">
                <li>
                  <a className={linkCls} href={waLink("Hi SCAFFLD, I'd like to talk about a website.")} target="_blank" rel="noreferrer">
                    WhatsApp {WHATSAPP_DISPLAY}
                  </a>
                </li>
                {social.map((s) => (
                  <li key={s.label}>
                    <a className={linkCls} href={s.href} target="_blank" rel="noreferrer">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <nav aria-label="Footer">
              <p className="border-b border-current pb-3 text-main">Index</p>
              <ul className="mt-4 grid pl-1 text-main">
                {nav.map((n) => (
                  <li key={n.to}>
                    <Link className={linkCls} to={n.to}>
                      {n.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link className={linkCls} to="/terms">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="col-span-12 grid grid-cols-12 gap-x-4 pt-sec-sm text-main">
          <p className="col-span-6">
            {brand.name}®/{brand.version}
          </p>
          <p className="col-span-3 hidden md:block">({year})</p>
          <p className="col-span-6 text-right md:col-span-3">
            <button type="button" className="link-u" onClick={() => scrollTo("top")}>
              Back to top
            </button>
          </p>
        </div>
      </div>
      <div className="pt-3 pb-site">
        <GlyphPile />
      </div>
    </footer>
  );
}
