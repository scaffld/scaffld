import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { brand, home, services } from "@/constant/site";
import { InkLayer } from "@/components/InkLayer";
import { ArrowLink } from "@/components/ArrowLink";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

/**
 * Paragraph that starts at column 4 with a hanging "(n)" label, then wraps back
 * under columns 1–3 (≥992px) — the reference's signature body-copy shape.
 * Below 992px it runs full width with the label indent only, as on the reference.
 */
function IndexedParagraph({ n, lead, children, labelClassName = "w-[calc(25%-0.25rem)]", spacer = false }) {
  return (
    <p className="text-main leading-[1.2]" data-hero-fade="">
      {spacer && <span aria-hidden="true" className="float-left hidden h-[6em] w-[calc(50%+0.5rem)] lg:block" />}
      <span className={`inline-block ${labelClassName}`}>({n})</span>
      {lead && <span>{lead} </span>}
      {children}
    </p>
  );
}

function HomeContent() {
  return (
    <div className="flex min-h-svh flex-col px-site pt-24 pb-site md:pt-20 lg:grid lg:grid-cols-12 lg:grid-rows-[auto_1fr_auto] lg:gap-x-4 lg:pt-3">
      {/* (1) intro — full width under the nav, or cols 1–6 starting at col 4 on desktop */}
      <div className="order-3 mt-10 md:order-1 md:mt-0 lg:order-none lg:col-span-6">
        <IndexedParagraph n={1} lead={`${brand.name}®`} spacer>
          {home.intro}
        </IndexedParagraph>
      </div>

      {/* Display row */}
      <div className="order-1 md:order-2 md:flex md:flex-1 md:items-center lg:order-none lg:col-span-12 lg:row-start-2">
        <div className="grid w-full grid-cols-12 items-center gap-x-4">
          <h1 className="col-span-12 font-display text-display md:col-span-6" data-hero-line="">
            {brand.name}
            <span className="ml-[0.05em] align-top font-sans text-[0.3em] leading-none">®</span>
          </h1>
          <p className="col-span-6 font-display text-display md:col-span-3" data-hero-line="">
            /Studio
          </p>
          <p className="col-span-6 text-right text-display md:col-span-3" data-hero-line="">
            ({brand.year})
          </p>
          <div className="col-span-12 mt-8 md:hidden" data-hero-fade="">
            <ArrowLink to="/projects" className="font-display text-h1">
              See projects
            </ArrowLink>
            <hr className="hairline mt-8 border-0" />
          </div>
        </div>
      </div>

      {/* (2) approach */}
      <div className="order-4 mt-6 md:order-3 md:mt-0 lg:order-none lg:col-span-3 lg:col-start-4 lg:row-start-3 lg:self-end">
        <IndexedParagraph n={2} labelClassName="w-[calc(25%-0.25rem)] lg:w-[calc(50%+0.5rem)]">
          {home.approach}
        </IndexedParagraph>
      </div>

      {/* Service index */}
      <nav
        aria-label="Services index"
        className="order-5 mt-10 text-main leading-4 md:order-4 md:mt-5 lg:order-none lg:col-span-3 lg:col-start-1 lg:row-start-3 lg:mt-0 lg:self-end"
        data-hero-fade=""
      >
        <ul>
          {services.map((s) => (
            <li key={s.key}>
              <Link to="/about#services" className="link-u inline-block py-1">
                ({s.items.length}) {s.short}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Links */}
      <div
        className="order-6 mt-10 flex items-end gap-6 text-main md:order-5 md:mt-5 md:justify-end lg:order-none lg:col-span-6 lg:col-start-7 lg:row-start-3 lg:mt-0 lg:self-end"
        data-hero-fade=""
      >
        <Link to="/about" className="link-u inline-block py-1">
          About the studio
        </Link>
        <Link to="/about#contact" className="link-u inline-block py-1">
          Start a project →
        </Link>
      </div>
    </div>
  );
}

export function Home() {
  const ref = useRef(null);

  useEffect(() => {
    document.title = "SCAFFLD® — Websites for every kind of business";
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const layer = ref.current;
        gsap.fromTo(layer, { "--sy": "70vh" }, { "--sy": "0vh", duration: 1.6, ease: "expo.out" });
        gsap.from("[data-hero-line]", { yPercent: 40, autoAlpha: 0, duration: 1.1, stagger: 0.08, ease: "power3.out", delay: 0.15 });
        gsap.from("[data-hero-fade]", { autoAlpha: 0, y: 16, duration: 0.8, stagger: 0.04, ease: "power3.out", delay: 0.2 });

        // Pointer parallax on the letterform (both the shape and its text mask move together)
        if (!window.matchMedia("(pointer: fine)").matches) return;
        const onMove = (e) => {
          const x = (e.clientX / window.innerWidth - 0.5) * -28;
          const y = (e.clientY / window.innerHeight - 0.5) * -18;
          gsap.to(layer, { "--sx": `${x}px`, "--sy": `${y}px`, duration: 1.2, ease: "power3.out", overwrite: "auto" });
        };
        window.addEventListener("pointermove", onMove);
        return () => window.removeEventListener("pointermove", onMove);
      });
    },
    { scope: ref },
  );

  return (
    <main id="main" className="overflow-hidden" data-nav="dark">
      <InkLayer ref={ref} shape="shapes/home.svg" className="min-h-svh text-ink">
        <HomeContent />
      </InkLayer>
    </main>
  );
}
