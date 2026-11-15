import { useId, useState } from "react";

/**
 * Bar accordion (reference: About › Resources). Closed bars are cream; the open
 * bar inverts to ink. Items: [{ key, title, count?, content }]
 */
export function Accordion({ items, defaultOpen = 0, className = "" }) {
  const [open, setOpen] = useState(defaultOpen);
  const uid = useId();
  return (
    <ul className={`grid gap-[clamp(0.75rem,1.6vw,1.5rem)] ${className}`}>
      {items.map((it, i) => {
        const isOpen = open === i;
        const id = `${uid}-${i}`;
        return (
          <li key={it.key} className={`transition-colors duration-500 ${isOpen ? "bg-dark text-cream" : "bg-cream text-ink hover:bg-white"}`} data-reveal="">
            <h3>
              <button
                type="button"
                id={`${id}-h`}
                aria-expanded={isOpen}
                aria-controls={`${id}-p`}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex w-full items-baseline justify-between gap-6 px-[clamp(1rem,1.7vw,1.5rem)] py-[clamp(0.9rem,1.6vw,1.4rem)] text-left"
              >
                <span className="text-h3">
                  {it.count != null && <span className="font-sans">({it.count}) </span>}
                  <span className="font-display">{it.title}</span>
                </span>
                <span aria-hidden="true" className={`text-main transition-transform duration-500 ${isOpen ? "rotate-45" : ""}`}>
                  +
                </span>
              </button>
            </h3>
            <div id={`${id}-p`} role="region" aria-labelledby={`${id}-h`} className="acc" data-open={isOpen} inert={!isOpen}>
              <div>
                <div className="px-[clamp(1rem,1.7vw,1.5rem)] pb-[clamp(1rem,1.7vw,1.5rem)]">{it.content}</div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
