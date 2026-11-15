import { useEffect, useId, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { brand, services, packages, included, extras, customNote, process, why, faqs, contact, waLink, WHATSAPP_DISPLAY, social } from "@/constant/site";
import { InkLayer } from "@/components/InkLayer";
import { Strip } from "@/components/Strip";
import { Accordion } from "@/components/Accordion";
import { ArrowLink } from "@/components/ArrowLink";
import { InquiryForm } from "@/components/InquiryForm";
import { ServiceIcon } from "@/components/svg/ServiceIcon";
import { BrandMark } from "@/components/svg/BrandMark";
import { useSmoothScroll } from "@/components/SmoothScroll";
import { useReveal } from "@/lib/useReveal";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";

const SECTIONS = [
  { id: "services", label: "The Services" },
  { id: "packages", label: "The Packages" },
  { id: "process", label: "The Process" },
  { id: "why", label: "Why SCAFFLD" },
  { id: "questions", label: "Questions" },
  { id: "contact", label: "Contact" },
];

/** Large statement with the reference's column-4 first-line indent. */
function Statement({ children, className = "", as: Tag = "p" }) {
  return (
    <Tag className={`text-h2 ${className}`} data-split="">
      <span aria-hidden="true" className="indent-col4" />
      {children}
    </Tag>
  );
}

/* ---------------- 1. Hero ---------------- */
function Hero() {
  const { scrollTo } = useSmoothScroll();
  return (
    <section aria-labelledby="about-title" className="relative bg-cream text-ink" data-nav="dark">
      <InkLayer shape="/shapes/about.svg" invert={false} className="min-h-svh">
        <div className="site-grid min-h-svh grid-rows-[1fr_auto_auto] gap-y-8 pt-24 pb-site">
          <h1 id="about-title" className="col-span-12 self-center text-h1" data-split="">
            <span aria-hidden="true" className="indent-col4" />
            {brand.name}® builds websites and digital solutions for every kind of business — shaped around what each one actually needs.
          </h1>
          <div className="col-span-12 md:col-span-4 md:col-start-7">
            <p className="text-large" data-reveal="">
              Not every business needs the same website. We help you find the right solution — and build it properly.
            </p>
            <ol className="mt-8 text-main">
              {SECTIONS.map((s, i) => (
                <li key={s.id} className="hairline border-current/60" data-reveal="" data-delay={i * 0.05}>
                  <a
                    href={`#${s.id}`}
                    onClick={(e) => (e.preventDefault(), scrollTo(s.id))}
                    className="group grid grid-cols-[1fr_2fr] py-2.5 transition-[padding] duration-500 hover:pl-2"
                  >
                    <span>({i + 1})</span>
                    <span className="link-u w-fit">{s.label}</span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
          <div className="col-span-12 flex justify-between text-main">
            <span>
              {brand.name}® / {brand.version}
            </span>
            <span>Scroll</span>
          </div>
        </div>
      </InkLayer>
    </section>
  );
}

/* ---------------- 2. Services (accordion) ---------------- */
function ServicesBlock() {
  const items = services.map((s) => ({
    key: s.key,
    title: s.short,
    count: s.items.length,
    content: (
      <div className="grid gap-8 pt-2 md:grid-cols-12 md:gap-4">
        <div className="md:col-span-7">
          <p className="font-display text-h3">{s.title}</p>
          <p className="mt-3 max-w-md text-main">{s.value}</p>
          <ul className="mt-6 grid gap-x-4 gap-y-1.5 text-main sm:grid-cols-2">
            {s.items.map((it, j) => (
              <li key={it}>
                <span className="opacity-60">({j + 1})</span> {it}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-start gap-4 md:col-span-5 md:justify-end">
          {[0, 1].map((k) => (
            <div key={k} className="w-[clamp(7rem,11vw,10rem)] bg-cream p-[clamp(0.6rem,1vw,0.9rem)]">
              <div className={`grid aspect-square place-items-center ${k ? "bg-primary text-ink" : "bg-dark text-cream"}`}>
                {k ? <BrandMark className="w-1/2" strokeWidth={7} /> : <ServiceIcon name={s.key} className="w-1/2" strokeWidth={1.6} />}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  }));

  return (
    <section id="services" aria-labelledby="services-title" className="bg-primary pb-sec-md text-ink" data-nav="dark">
      <Strip label="The Services" n={1} />
      <div className="site-grid items-end pt-sec-lg pb-sec-sm">
        <h2 id="services-title" className="col-span-9 font-display text-display" data-split="">
          The Services
        </h2>
        <p className="col-span-3 text-right text-display" data-reveal="">
          ({services.length})
        </p>
      </div>
      <div className="site-x">
        <Accordion items={items} defaultOpen={0} />
      </div>
    </section>
  );
}

/* ---------------- 3. Packages (no prices) ---------------- */
function Packages() {
  const { scrollTo } = useSmoothScroll();
  return (
    <section id="packages" aria-labelledby="packages-title" className="bg-dark pb-sec-md text-cream" data-nav="light">
      <Strip label="The Packages" n={2} />
      <div className="site-grid pt-sec-lg">
        <h2 id="packages-title" className="sr-only">
          The Packages
        </h2>
        <Statement className="col-span-12 md:pr-[16%]">
          Three standard packages cover the most common needs. Each is quoted after a short conversation about your business.
        </Statement>
      </div>

      <ol className="site-grid mt-sec gap-y-12">
        {packages.map((p, i) => (
          <li key={p.name} className="col-span-12 border-t border-cream/40 pt-4 md:col-span-4" data-reveal="" data-delay={i * 0.08}>
            <div className="flex items-baseline justify-between text-main">
              <span>({i + 1})</span>
              <span className="opacity-70">≈ {p.days} days</span>
            </div>
            <h3 className="mt-6 font-display text-h1">{p.name}</h3>
            <p className="mt-3 max-w-xs text-main opacity-80">{p.summary}</p>
            <ul className="mt-6 grid gap-1.5 text-main">
              {p.features.map((f) => (
                <li key={f} className="flex gap-2">
                  <span aria-hidden="true" className="text-primary">
                    —
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>

      <div className="site-grid mt-sec gap-y-8 text-main">
        <div className="col-span-12 border-t border-cream/40 pt-4 md:col-span-4" data-reveal="">
          <p className="opacity-70">Every package includes</p>
          <p className="mt-3 text-large">{included.join(" · ")}</p>
        </div>
        <div className="col-span-12 border-t border-cream/40 pt-4 md:col-span-4" data-reveal="">
          <p className="opacity-70">Also available</p>
          <p className="mt-3 text-large">{extras.join(" · ")}</p>
        </div>
        <div className="col-span-12 border-t border-cream/40 pt-4 md:col-span-4" data-reveal="">
          <p className="opacity-70">Something more specific?</p>
          <p className="mt-3">{customNote}</p>
          <a
            href="#contact"
            onClick={(e) => (e.preventDefault(), scrollTo("contact"))}
            className="group mt-5 inline-flex items-center gap-2 text-large"
          >
            <span className="link-u">Request a quote</span>
            <span aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-1.5">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------------- 4. Process (slider) ---------------- */
function ProcessSlider() {
  const [i, setI] = useState(0);
  const ref = useRef(null);
  const total = process.length;
  const step = process[i];
  const next = process[i + 1];

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo("[data-slide]", { autoAlpha: 0, x: 24 }, { autoAlpha: 1, x: 0, duration: 0.8, stagger: 0.06, ease: "power3.out" });
      gsap.fromTo("[data-slide-mark] [data-mark]", { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.2, stagger: 0.2, ease: "power2.inOut" });
    },
    { scope: ref, dependencies: [i] },
  );

  const btn = "grid size-10 place-items-center bg-cream-2 text-dark transition-colors hover:bg-dark hover:text-cream disabled:opacity-40 disabled:hover:bg-cream-2 disabled:hover:text-dark";

  return (
    <div ref={ref} className="site-grid mt-sec gap-y-8" role="group" aria-roledescription="carousel" aria-label="Process steps">
      <div className="col-span-12 md:col-span-3">
        <p className="text-main tabular-nums">
          {i + 1} / {total}
        </p>
        <div className="relative mt-4 h-px bg-current/20">
          <span className="absolute inset-y-0 left-0 bg-current transition-[width] duration-700 ease-[var(--ease-out-3)]" style={{ width: `${((i + 1) / total) * 100}%`, height: 2, top: -0.5 }} />
        </div>
        <div className="mt-8 flex gap-1.5">
          <button type="button" className={btn} onClick={() => setI((v) => Math.max(0, v - 1))} disabled={i === 0} aria-label="Previous step">
            ←
          </button>
          <button type="button" className={btn} onClick={() => setI((v) => Math.min(total - 1, v + 1))} disabled={i === total - 1} aria-label="Next step">
            →
          </button>
        </div>
      </div>

      <div className="col-span-12 grid gap-8 md:col-span-6 md:grid-cols-6 md:gap-4" aria-live="polite">
        <div className="w-2/3 bg-dark p-[8%] text-primary md:col-span-2 md:w-auto" data-slide="" data-slide-mark="">
          <BrandMark className="aspect-square w-full" strokeWidth={3} />
        </div>
        <div className="flex flex-col justify-end md:col-span-4">
          <p className="text-h1 tabular-nums" data-slide="">
            {String(i + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-4 font-display text-h2" data-slide="">
            {step.title}
          </h3>
          <p className="mt-3 text-medium" data-slide="">
            {step.text}
          </p>
        </div>
      </div>

      <div className="col-span-12 self-end text-main md:col-span-3 md:text-right">
        {next ? (
          <button type="button" className="opacity-60 transition-opacity hover:opacity-100" onClick={() => setI(i + 1)}>
            Next — {next.title}
          </button>
        ) : (
          <span className="opacity-60">Then: ongoing support</span>
        )}
      </div>
    </div>
  );
}

function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="bg-cream pb-sec-md text-ink" data-nav="dark">
      <Strip label="The Process" n={3} />
      <div className="site-grid pt-sec-lg">
        <h2 id="process-title" className="sr-only">
          The Process
        </h2>
        <Statement className="col-span-12 md:pr-[16%]">From first message to launch — six clear steps, and support after that.</Statement>
      </div>
      <ProcessSlider />
    </section>
  );
}

/* ---------------- 5. Why ---------------- */
function Why() {
  return (
    <section id="why" aria-labelledby="why-title" className="bg-primary pb-sec-md text-ink" data-nav="dark">
      <Strip label="Why SCAFFLD" n={4} />
      <div className="site-grid pt-sec-lg">
        <h2 id="why-title" className="col-span-12 font-display text-display" data-split="">
          Built around your business.
        </h2>
      </div>
      <ol className="mt-sec site-x">
        {why.map((w, i) => (
          <li key={w.title} className="grid grid-cols-12 gap-x-4 gap-y-2 border-t border-current/50 py-5" data-reveal="">
            <span className="col-span-2 text-main md:col-span-3">({i + 1})</span>
            <h3 className="col-span-10 font-display text-h3 md:col-span-4">{w.title}</h3>
            <p className="col-span-10 col-start-3 text-main md:col-span-5 md:col-start-auto">{w.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ---------------- 6. Questions ---------------- */
function Questions() {
  const [open, setOpen] = useState(0);
  const uid = useId();
  return (
    <section id="questions" aria-labelledby="faq-title" className="bg-primary pb-sec text-ink" data-nav="dark">
      <Strip label="Questions" n={5} className="hairline border-current/50" />
      <div className="site-grid gap-y-10 pt-sec-lg">
        <h2 id="faq-title" className="col-span-12 font-display text-display md:col-span-3" data-split="">
          Good questions
        </h2>
        <ul className="col-span-12 md:col-span-9">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            const id = `${uid}-${i}`;
            return (
              <li key={f.q} className="border-t border-current/50" data-reveal="">
                <h3>
                  <button
                    type="button"
                    id={`${id}-q`}
                    aria-expanded={isOpen}
                    aria-controls={`${id}-a`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="grid w-full grid-cols-[2.75rem_1fr_auto] items-baseline gap-2 py-4 text-left md:grid-cols-[4rem_1fr_auto]"
                  >
                    <span className="text-main">({i + 1})</span>
                    <span className="text-large">{f.q}</span>
                    <span aria-hidden="true" className={`text-large transition-transform duration-500 ${isOpen ? "rotate-45" : ""}`}>
                      +
                    </span>
                  </button>
                </h3>
                <div id={`${id}-a`} role="region" aria-labelledby={`${id}-q`} className="acc" data-open={isOpen} inert={!isOpen}>
                  <div>
                    <p className="max-w-xl pb-6 pl-[3.25rem] text-main md:pl-[4.5rem]">{f.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ---------------- 7. Use case band ---------------- */
function UseCase() {
  return (
    <section aria-label="Principle" className="relative overflow-hidden bg-primary py-sec-md text-cream" data-nav="dark">
      <div className="site-x">
        <div className="flex items-center gap-4 pb-sec text-ink" data-reveal="">
          <span aria-hidden="true" className="size-5 rounded-full bg-current" />
          <ArrowLink to="/services" className="font-display text-h2">
            Explore the services
          </ArrowLink>
        </div>
        <div className="relative">
          <svg viewBox="0 0 1416 370" preserveAspectRatio="none" className="absolute inset-0 h-full w-full text-dark" aria-hidden="true">
            <path d="M0 0H1160L1416 110V370H1060L470 170H0Z" fill="currentColor" data-band="" />
          </svg>
          <div className="relative grid grid-cols-12 gap-x-4 gap-y-6 pt-[clamp(2rem,5vw,4rem)] pb-[clamp(4rem,10vw,9rem)]">
            <p className="col-span-12 pt-2 text-main md:col-span-3" data-reveal="">
              (principle)
            </p>
            <Statement className="col-span-12 md:pr-[16%]">{brand.principle}</Statement>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- 8. Contact ---------------- */
function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative bg-dark text-cream" data-nav="light">
      <InkLayer shape="/shapes/contact.svg" invert={false} className="pb-sec-md">
        <Strip label="Contact" n={6} />
        <div className="site-grid gap-y-12 pt-sec-lg">
          <div className="col-span-12 md:col-span-5">
            <h2 id="contact-title" className="font-display text-display" data-split="">
              {contact.heading}
            </h2>
            <p className="mt-8 max-w-sm text-large" data-reveal="">
              {contact.copy}
            </p>
            <div className="mt-10 grid gap-2 text-main" data-reveal="">
              <span className="opacity-70">Fastest reply</span>
              <a className="link-u w-fit text-h3" href={waLink("Hi SCAFFLD, I'd like to talk about a website.")} target="_blank" rel="noreferrer">
                WhatsApp {WHATSAPP_DISPLAY}
              </a>
              <ul className="mt-3 flex gap-6">
                {social.map((s) => (
                  <li key={s.label}>
                    <a className="link-u" href={s.href} target="_blank" rel="noreferrer">
                      {s.label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7" data-reveal="">
            <InquiryForm />
          </div>
        </div>
      </InkLayer>
    </section>
  );
}

export function About() {
  const ref = useRef(null);
  const { hash } = useLocation();
  const { scrollTo } = useSmoothScroll();
  useReveal(ref);

  useEffect(() => {
    document.title = "About — SCAFFLD® Web Studio";
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  }, []);

  useEffect(() => {
    if (!hash) return;
    const t = setTimeout(() => {
      ScrollTrigger.refresh();
      scrollTo(hash.slice(1), { immediate: true });
    }, 120);
    return () => clearTimeout(t);
  }, [hash, scrollTo]);

  return (
    <main id="main" ref={ref}>
      <Hero />
      <ServicesBlock />
      <Packages />
      <Process />
      <Why />
      <Questions />
      <UseCase />
      <Contact />
    </main>
  );
}
