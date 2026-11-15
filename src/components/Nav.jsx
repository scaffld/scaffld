import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { nav, waLink } from "@/constant/site";
import { Logo } from "./svg/BrandMark";
import { gsap, MOTION_OK } from "@/lib/gsap";

/**
 * Fixed, transparent nav. Its ink switches to cream over any section marked
 * data-nav="light" (dark backgrounds), like the reference's per-theme header.
 */
export function Nav() {
  const { pathname, hash } = useLocation();
  const [light, setLight] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    const probe = () => {
      const y = 32;
      const hit = [...document.querySelectorAll("[data-nav]")].find((el) => {
        const r = el.getBoundingClientRect();
        return r.top <= y && r.bottom > y;
      });
      setLight(hit?.dataset.nav === "light");
    };
    probe();
    window.addEventListener("scroll", probe, { passive: true });
    window.addEventListener("resize", probe);
    const t = setTimeout(probe, 300);
    return () => {
      window.removeEventListener("scroll", probe);
      window.removeEventListener("resize", probe);
      clearTimeout(t);
    };
  }, [pathname]);

  // Close the menu when the route changes (adjusting state during render)
  const [route, setRoute] = useState(pathname + hash);
  if (route !== pathname + hash) {
    setRoute(pathname + hash);
    if (open) setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      gsap.from(panelRef.current, { clipPath: "inset(0 0 100% 0)", duration: 0.8, ease: "expo.inOut" });
      gsap.from(panelRef.current.querySelectorAll("[data-item]"), { yPercent: 110, duration: 0.9, stagger: 0.06, delay: 0.25, ease: "power3.out" });
    });
    panelRef.current?.querySelector("a")?.focus();
    const btn = btnRef.current;
    return () => {
      root.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      mm.revert();
      btn?.focus();
    };
  }, [open]);

  const tone = open ? "text-cream" : light ? "text-cream" : "text-ink";

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${tone}`}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:bg-dark focus:px-3 focus:py-2 focus:text-cream">
        Skip to content
      </a>
      <nav aria-label="Primary" className="flex items-center justify-between gap-6 px-site pt-3">
        <Link to="/" aria-label="SCAFFLD Web Studio — index" className="relative z-10">
          <Logo />
        </Link>

        <ul className="hidden items-center gap-8 text-main md:flex">
          {nav.map((n) => (
            <li key={n.to}>
              {n.to.includes("#") ? (
                <Link to={n.to} className="link-u pb-0.5">
                  {n.label}
                </Link>
              ) : (
                <NavLink to={n.to} end={n.to === "/"} className="link-u pb-0.5">
                  {n.label}
                  {n.count != null && <sup>{String(n.count).padStart(2, "0")}</sup>}
                </NavLink>
              )}
            </li>
          ))}
        </ul>

        <button
          ref={btnRef}
          type="button"
          className="relative z-10 py-2 text-main md:hidden"
          aria-expanded={open}
          aria-controls="menu-panel"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {open && (
        <div id="menu-panel" ref={panelRef} className="fixed inset-0 flex flex-col justify-between bg-dark px-site pt-24 pb-8 text-cream md:hidden">
          <ul className="grid gap-1">
            {nav.map((n, i) => (
              <li key={n.to} className="overflow-hidden">
                <Link to={n.to} data-item="" className="flex items-baseline gap-4 py-1">
                  <span className="w-8 text-small opacity-60">({i + 1})</span>
                  <span className="font-display text-[3.4rem] leading-[1.05]">{n.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="hairline flex items-end justify-between pt-4 text-main">
            <a href={waLink("Hi SCAFFLD, I'd like to talk about a website.")} target="_blank" rel="noreferrer" className="link-u">
              WhatsApp ↗
            </a>
            <span className="opacity-70">SCAFFLD® / V.01</span>
          </div>
        </div>
      )}
    </header>
  );
}
