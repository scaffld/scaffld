import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { brand, services, waLink } from "@/constant/site";
import { InkLayer } from "@/components/InkLayer";
import { ServiceIcon } from "@/components/svg/ServiceIcon";
import { useSmoothScroll } from "@/components/SmoothScroll";
import { Observer } from "gsap/Observer";
import { gsap, useGSAP } from "@/lib/gsap";

gsap.registerPlugin(Observer);

const pad = (n) => String(n).padStart(2, "0");
const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Card slots around the active row (reference: polaroids fanned left / centre / right) */
const SLOTS = {
  desktop: {
    "-1": { x: "-37vw", y: "16vh", rotation: -21, autoAlpha: 1, scale: 0.92 },
    0: { x: "17vw", y: "-4vh", rotation: 3, autoAlpha: 1, scale: 1 },
    1: { x: "37vw", y: "4vh", rotation: 19, autoAlpha: 1, scale: 0.92 },
    before: { x: "-60vw", y: "60vh", rotation: -45, autoAlpha: 0, scale: 0.8 },
    after: { x: "60vw", y: "-60vh", rotation: 45, autoAlpha: 0, scale: 0.8 },
  },
  mobile: {
    "-1": { x: "-58vw", y: "24vh", rotation: -18, autoAlpha: 1, scale: 0.85 },
    0: { x: "0vw", y: "21vh", rotation: 2, autoAlpha: 1, scale: 1 },
    1: { x: "58vw", y: "18vh", rotation: 16, autoAlpha: 1, scale: 0.85 },
    before: { x: "-90vw", y: "60vh", rotation: -40, autoAlpha: 0, scale: 0.8 },
    after: { x: "90vw", y: "-20vh", rotation: 40, autoAlpha: 0, scale: 0.8 },
  },
};

function Card({ s, i }) {
  return (
    <div
      data-card={i}
      aria-hidden="true"
      className="absolute top-1/2 left-1/2 w-[clamp(9.5rem,17vw,16rem)] bg-cream p-[clamp(0.55rem,1.1vw,1rem)] pb-[clamp(2.2rem,3.6vw,3.3rem)] text-cream will-change-transform"
    >
      <div className="relative grid aspect-[4/5] place-items-center bg-dark">
        <ServiceIcon name={s.key} className="w-1/2" strokeWidth={1.6} />
        <span className="absolute top-2 left-2.5 text-small opacity-70">{pad(i + 1)}</span>
      </div>
      <p className="absolute right-[clamp(0.55rem,1.1vw,1rem)] bottom-[clamp(0.55rem,1vw,0.9rem)] left-[clamp(0.55rem,1.1vw,1rem)] truncate font-display text-[clamp(0.9rem,1.4vw,1.35rem)] text-dark">{s.short}</p>
    </div>
  );
}

function Wheel({ active, setActive }) {
  const ref = useRef(null);
  const busy = useRef(false);

  const go = useCallback(
    (dir) => {
      if (busy.current) return;
      const next = Math.min(services.length - 1, Math.max(0, active + dir));
      if (next === active) return;
      busy.current = true;
      setActive(next);
      setTimeout(() => (busy.current = false), reduced() ? 50 : 750);
    },
    [active, setActive],
  );

  // Wheel / touch / keyboard input
  useEffect(() => {
    const obs = Observer.create({
      target: window,
      type: "wheel,touch",
      wheelSpeed: -1,
      tolerance: 12,
      preventDefault: true,
      onDown: () => go(-1),
      onUp: () => go(1),
    });
    const onKey = (e) => {
      if (["ArrowDown", "PageDown", "ArrowRight"].includes(e.key)) (e.preventDefault(), go(1));
      if (["ArrowUp", "PageUp", "ArrowLeft"].includes(e.key)) (e.preventDefault(), go(-1));
    };
    window.addEventListener("keydown", onKey);
    return () => {
      obs.kill();
      window.removeEventListener("keydown", onKey);
    };
  }, [go]);

  // Animate rows, cards and details whenever the active service changes
  useGSAP(
    () => {
      const d = reduced() ? 0 : 1;
      const mobile = window.matchMedia("(max-width: 767px)").matches;
      const slots = mobile ? SLOTS.mobile : SLOTS.desktop;
      const gap = mobile ? 44 : 50;

      gsap.utils.toArray("[data-row]").forEach((row, i) => {
        const off = i - active;
        gsap.to(row, {
          y: `${off * gap}vh`,
          autoAlpha: off === 0 ? 1 : Math.abs(off) === 1 ? 0.3 : 0,
          duration: 1 * d,
          ease: "power3.out",
        });
      });
      gsap.utils.toArray("[data-card]").forEach((card, i) => {
        const off = i - active;
        const slot = off < -1 ? slots.before : off > 1 ? slots.after : slots[off];
        gsap.to(card, { ...slot, xPercent: -50, yPercent: -50, duration: 1.1 * d, ease: "power3.out", zIndex: off === 0 ? 3 : 2 });
      });
      const paths = ref.current.querySelectorAll(`[data-card="${active}"] [data-icon-path]`);
      gsap.fromTo(paths, { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.2 * d, stagger: 0.08 * d, ease: "power2.inOut", delay: 0.3 * d });
      gsap.fromTo("[data-detail]", { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.8 * d, stagger: 0.04 * d, ease: "power3.out", delay: 0.25 * d });
    },
    { scope: ref, dependencies: [active] },
  );

  const s = services[active];

  return (
    <div ref={ref} className="relative h-svh overflow-hidden">
      {/* Rows */}
      <ol className="absolute inset-x-0 top-[17vh] md:top-[19vh]" aria-label="Services">
        {services.map((sv, i) => (
          <li key={sv.key} data-row="" className="site-grid absolute inset-x-0 top-0 items-start">
            <span className="col-span-2 text-h2 tabular-nums md:col-span-3">{i + 1}</span>
            <h2 className="col-span-8 md:col-span-6">
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-current={i === active ? "true" : undefined}
                tabIndex={Math.abs(i - active) > 1 ? -1 : 0}
                className="text-left font-display text-h2"
              >
                {sv.title}
              </button>
            </h2>
            <span className="col-span-2 text-right text-h2 tabular-nums md:col-span-3">({pad(sv.items.length)})</span>
          </li>
        ))}
      </ol>

      {/* Active service details */}
      <div className="site-grid pointer-events-none absolute inset-x-0 top-[calc(17vh+5.5rem)] md:top-[calc(19vh+clamp(4rem,9vw,8.25rem))]" aria-live="polite">
        <div className="pointer-events-auto col-span-12 md:col-span-4 md:col-start-4">
          <p className="max-w-sm text-main leading-[1.25]" data-detail="">
            {s.value}
          </p>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1 text-main">
            {s.items.map((it, j) => (
              <li key={it} className="flex gap-2" data-detail="">
                <span className="opacity-60 tabular-nums">({j + 1})</span>
                {it}
              </li>
            ))}
          </ul>
          <a
            href={waLink(`Hi SCAFFLD, I'm interested in ${s.title}.`)}
            target="_blank"
            rel="noreferrer"
            className="link-u mt-5 inline-block text-main"
            data-detail=""
          >
            Discuss {s.short.toLowerCase()} on WhatsApp ↗
          </a>
        </div>
      </div>

      {/* Fanned cards */}
      <div className="pointer-events-none absolute inset-0">
        {services.map((sv, i) => (
          <Card key={sv.key} s={sv} i={i} />
        ))}
      </div>

      {/* Bottom bar */}
      <div className="site-grid absolute inset-x-0 bottom-0 items-end pb-site text-main">
        <p className="col-span-4 md:col-span-3">
          {brand.name}® / &apos;{brand.year.slice(2)}
        </p>
        <div className="col-span-4 flex gap-2 md:col-span-6">
          <button type="button" onClick={() => go(-1)} disabled={active === 0} className="grid size-9 place-items-center bg-cream text-dark disabled:opacity-40" aria-label="Previous service">
            ↑
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            disabled={active === services.length - 1}
            className="grid size-9 place-items-center bg-cream text-dark disabled:opacity-40"
            aria-label="Next service"
          >
            ↓
          </button>
        </div>
        <p className="col-span-4 text-right tabular-nums md:col-span-3" aria-live="polite">
          {pad(active + 1)} / {pad(services.length)}
        </p>
      </div>
    </div>
  );
}

function List() {
  return (
    <ol className="pt-[17vh] pb-sec">
      {services.map((s, i) => (
        <li key={s.key} id={s.key} className="site-grid hairline items-start gap-y-4 py-8">
          <span className="col-span-2 text-h2 md:col-span-3">{i + 1}</span>
          <div className="col-span-10 md:col-span-6">
            <h2 className="font-display text-h2">{s.title}</h2>
            <p className="mt-4 max-w-md text-main">{s.value}</p>
            <ul className="mt-4 grid gap-x-4 gap-y-1 text-main sm:grid-cols-2">
              {s.items.map((it, j) => (
                <li key={it}>
                  <span className="opacity-60">({j + 1})</span> {it}
                </li>
              ))}
            </ul>
          </div>
          <span className="col-span-12 text-h2 md:col-span-3 md:text-right">({pad(s.items.length)})</span>
        </li>
      ))}
      <li className="site-grid pt-10 text-main">
        <p className="col-span-12 md:col-span-6 md:col-start-4">
          Need something else? <Link className="link-u" to="/about#contact">Tell us what you need →</Link>
        </p>
      </li>
    </ol>
  );
}

export function Services() {
  const { hash } = useLocation();
  const { lock, unlock } = useSmoothScroll();
  const initial = Math.max(0, services.findIndex((s) => `#${s.key}` === hash));
  const [active, setActive] = useState(initial);
  const [view, setView] = useState("wheel");

  useEffect(() => {
    document.title = "Services — SCAFFLD® Web Studio";
  }, []);

  // The wheel is a single locked screen; the list scrolls normally.
  useEffect(() => {
    if (view !== "wheel") return;
    window.scrollTo(0, 0);
    lock();
    return unlock;
  }, [view, lock, unlock]);

  // Follow in-app links to /services#key (e.g. the Index page's service list)
  const [prevHash, setPrevHash] = useState(hash);
  if (hash !== prevHash) {
    setPrevHash(hash);
    const i = services.findIndex((s) => `#${s.key}` === hash);
    if (i >= 0) {
      setActive(i);
      setView("wheel");
    }
  }

  useEffect(() => {
    if (view === "wheel") history.replaceState(null, "", `#${services[active].key}`);
  }, [active, view]);

  return (
    <main id="main" className="relative" data-nav="dark">
      <InkLayer shape="/shapes/services.svg" invert={false} className={view === "wheel" ? "h-svh" : "min-h-svh"}>
        <h1 className="sr-only">Services</h1>
        <div className="site-x absolute top-[11vh] left-0 z-10 text-main" role="group" aria-label="View">
          {["wheel", "list"].map((v, i) => (
            <button key={v} type="button" aria-pressed={view === v} onClick={() => setView(v)} className={`min-h-6 px-1 py-1 capitalize first:pl-0 transition-opacity ${view === v ? "" : "opacity-60 hover:opacity-100"}`}>
              {v}
              {i === 0 && <span className="opacity-45">,&nbsp;</span>}
            </button>
          ))}
        </div>
        {view === "wheel" ? <Wheel active={active} setActive={setActive} /> : <List />}
      </InkLayer>
    </main>
  );
}
