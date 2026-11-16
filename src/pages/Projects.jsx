import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { brand, projects, waLink } from "@/constant/site";
import { InkLayer } from "@/components/InkLayer";
import { useSmoothScroll } from "@/components/SmoothScroll";
import CircularGallery from "@/components/CircularGallery";

const pad = (n) => String(n).padStart(2, "0");

/* CircularGallery parses colours on a canvas, so it needs a literal value (--color-cream). */
const CREAM = "#f7f2e9";
const LABEL_FONT = '300 30px "SF UI Display", ui-sans-serif, system-ui, sans-serif';
// No `description` here: the details row below already shows it, so the opened card stays uncaptioned.
const ITEMS = projects.map((p) => ({ image: p.image, text: p.title }));

const discuss = (p) => waLink(`Hi SCAFFLD, I saw ${p.title} — I'd like a ${p.type.toLowerCase()} like it.`);

function Carousel({ onUnsupported }) {
  const gallery = useRef(null);
  const [active, setActive] = useState(0);
  const p = projects[active];

  // Arrow keys anywhere on the page; the gallery handles (and prevents) them itself when focused.
  useEffect(() => {
    const onKey = (e) => {
      if (e.defaultPrevented) return;
      if (["ArrowRight", "ArrowDown", "PageDown"].includes(e.key)) (e.preventDefault(), gallery.current?.next());
      if (["ArrowLeft", "ArrowUp", "PageUp"].includes(e.key)) (e.preventDefault(), gallery.current?.prev());
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="relative h-svh overflow-hidden">
      <div className="absolute inset-x-0 top-[14vh] bottom-[clamp(8rem,20vh,11rem)]">
        <CircularGallery
          ref={gallery}
          items={ITEMS}
          textColor={CREAM}
          font={LABEL_FONT}
          itemAspect={16 / 9}
          itemSize={0.95}
          gap={0.16}
          bend={2}
          borderRadius={0.025}
          wave={0.6}
          shadow={0.3}
          scrollEase={0.06}
          onActiveChange={setActive}
          onUnsupported={onUnsupported}
          aria-label="Projects"
        />
      </div>

      {/* Active project details */}
      <div className="site-grid absolute inset-x-0 bottom-[calc(var(--spacing-site)+3.25rem)] items-end gap-y-2 text-main" aria-live="polite">
        <p className="col-span-12 md:col-span-3">
          <span className="tabular-nums opacity-60">({pad(active + 1)})</span> {p.type} — {p.place}
        </p>
        <p className="col-span-12 hidden max-w-md md:col-span-5 md:block">{p.description}</p>
        <p className="col-span-12 md:col-span-4 md:text-right">
          <a href={discuss(p)} target="_blank" rel="noreferrer" className="link-u inline-block py-1">
            Build something like this ↗
          </a>
        </p>
      </div>

      {/* Bottom bar */}
      <div className="site-grid absolute inset-x-0 bottom-0 items-end pb-site text-main">
        <p className="col-span-4 md:col-span-3">
          {brand.name}® / &apos;{brand.year.slice(2)}
        </p>
        <div className="col-span-4 flex gap-2 md:col-span-6">
          <button type="button" onClick={() => gallery.current?.prev()} className="grid size-9 place-items-center bg-cream text-dark" aria-label="Previous project">
            ←
          </button>
          <button type="button" onClick={() => gallery.current?.next()} className="grid size-9 place-items-center bg-cream text-dark" aria-label="Next project">
            →
          </button>
        </div>
        <p className="col-span-4 text-right tabular-nums md:col-span-3">
          {pad(active + 1)} / {pad(projects.length)}
        </p>
      </div>
    </div>
  );
}

function List() {
  return (
    <ol className="pt-[17vh] pb-sec">
      {projects.map((p, i) => (
        <li key={p.key} id={p.key} className="site-grid hairline items-start gap-y-4 py-8">
          <span className="col-span-2 text-h2 md:col-span-3">{i + 1}</span>
          <div className="col-span-10 md:col-span-4">
            <h2 className="font-display text-h2">{p.title}</h2>
            <p className="mt-2 text-main opacity-70">
              {p.type} — {p.place}
            </p>
            <p className="mt-4 max-w-md text-main">{p.description}</p>
            <a href={discuss(p)} target="_blank" rel="noreferrer" className="link-u mt-4 inline-block text-main">
              Build something like this ↗
            </a>
          </div>
          <img
            src={p.image}
            alt={`${p.title} — ${p.type.toLowerCase()} homepage`}
            width="1920"
            height="1080"
            loading="lazy"
            decoding="async"
            className="col-span-12 aspect-video w-full bg-dark object-cover md:col-span-5"
          />
        </li>
      ))}
      <li className="site-grid pt-10 text-main">
        <p className="col-span-12 md:col-span-6 md:col-start-4">
          Have a project in mind?{" "}
          <Link className="link-u" to="/about#contact">
            Tell us what you need →
          </Link>
        </p>
      </li>
    </ol>
  );
}

export function Projects() {
  const { lock, unlock } = useSmoothScroll();
  const [view, setView] = useState("carousel");
  const [webgl, setWebgl] = useState(true);
  const mode = webgl ? view : "list";

  useEffect(() => {
    document.title = "Projects — SCAFFLD® Web Studio";
  }, []);

  // The carousel is a single locked screen; the list scrolls normally.
  useEffect(() => {
    if (mode !== "carousel") return;
    window.scrollTo(0, 0);
    lock();
    return unlock;
  }, [mode, lock, unlock]);

  return (
    <main id="main" className="relative text-ink" data-nav="dark">
      <InkLayer shape="shapes/projects.svg" invert={false} className={mode === "carousel" ? "h-svh" : "min-h-svh"}>
        <h1 className="sr-only">Projects</h1>
        {webgl && (
          <div className="site-x absolute top-[11vh] left-0 z-10 text-main" role="group" aria-label="View">
            {["carousel", "list"].map((v, i) => (
              <button
                key={v}
                type="button"
                aria-pressed={view === v}
                onClick={() => setView(v)}
                className={`min-h-6 px-1 py-1 capitalize first:pl-0 transition-opacity ${view === v ? "" : "opacity-60 hover:opacity-100"}`}
              >
                {v}
                {i === 0 && <span className="opacity-45">,&nbsp;</span>}
              </button>
            ))}
          </div>
        )}
        {mode === "carousel" ? <Carousel onUnsupported={() => setWebgl(false)} /> : <List />}
      </InkLayer>
    </main>
  );
}
