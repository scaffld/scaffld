import { Link } from "react-router-dom";
import { brand, nav, social, waLink, WHATSAPP_DISPLAY } from "@/constant/site";
import { useSmoothScroll } from "./SmoothScroll";
import FallingText from "./FallingText";

/* Drag only with a mouse/trackpad — on touch the letters must not swallow page scroll. */
const FINE_POINTER = window.matchMedia("(pointer: fine)").matches;

/* The wordmark drops into a physics pile when the footer scrolls into view. */
function GlyphFall() {
  return (
    <div aria-hidden="true" className="mx-site h-[clamp(14rem,32vw,28rem)] overflow-hidden bg-dark text-cream">
      <FallingText
        text="SCAFFLD WEB STUDIO"
        split="letters"
        trigger="scroll"
        highlightWords={["SCAFFLD"]}
        accentColor="var(--color-primary)"
        gravity={1}
        bounciness={0.35}
        scatter={0.85}
        stagger={0.035}
        draggable={FINE_POINTER}
        cursorPush={0.6}
        fontSize="clamp(3rem, 9vw, 9rem)"
        textClassName="box-border max-w-full self-start px-[0.2em] pt-[0.15em] text-center font-display leading-[1.05] text-balance"
        style={{ WebkitTextStroke: "0.045em currentColor" }}
      />
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
        <GlyphFall />
      </div>
    </footer>
  );
}
