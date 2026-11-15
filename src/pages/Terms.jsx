import { useEffect, useMemo, useRef, useState } from "react";
import termEn from "@/terms/term.md?raw";
import termId from "@/terms/term-id.md?raw";
import { parseMarkdown, inline } from "@/lib/markdown";
import { Strip } from "@/components/Strip";
import { useReveal } from "@/lib/useReveal";

function Inline({ text }) {
  return inline(text).map((tok, i) =>
    tok.b ? <strong key={i}>{tok.b}</strong> : tok.i ? <em key={i}>{tok.i}</em> : <span key={i}>{tok.t}</span>,
  );
}

/** Group the flat markdown blocks into numbered clauses (split on h2). */
function toClauses(blocks) {
  const head = [];
  const clauses = [];
  for (const b of blocks) {
    if (b.type === "h2") clauses.push({ title: b.text, body: [] });
    else if (b.type === "hr") continue;
    else if (clauses.length) clauses[clauses.length - 1].body.push(b);
    else head.push(b);
  }
  return { head, clauses };
}

function Body({ b }) {
  if (b.type === "ul")
    return (
      <ul className="mt-3 grid gap-1.5">
        {b.items.map((it, j) => (
          <li key={j} className="grid grid-cols-[1.25rem_1fr]">
            <span aria-hidden="true">—</span>
            <div>
              <Inline text={it.text} />
              {it.children && (
                <ul className="mt-1.5 grid gap-1 opacity-80">
                  {it.children.map((c, k) => (
                    <li key={k}>
                      · <Inline text={c} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ul>
    );
  return (
    <p className="mt-3">
      <Inline text={b.text} />
    </p>
  );
}

export function Terms() {
  const ref = useRef(null);
  const [lang, setLang] = useState("en");
  const { head, clauses } = useMemo(() => toClauses(parseMarkdown(lang === "en" ? termEn : termId)), [lang]);
  useReveal(ref);

  useEffect(() => {
    document.title = "Terms of Service — SCAFFLD®";
  }, []);

  const raw = head.find((b) => b.type === "h1")?.text ?? "Terms of Service";
  const title = raw.charAt(0) + raw.slice(1).toLowerCase(); // sentence case
  const meta = head.filter((b) => b.type === "p");

  return (
    <main id="main" ref={ref} className="bg-cream pt-20 pb-sec-md text-ink" data-nav="dark" lang={lang}>
      <Strip label="Terms" n={1} />
      <div className="site-grid gap-y-8 pt-sec-lg">
        <h1 className="col-span-12 font-display text-display md:col-span-9 md:col-start-4">{title}</h1>
        <div className="col-span-12 text-main md:col-span-3 md:row-start-2">
          <div role="group" aria-label="Language" className="flex gap-4">
            {[
              ["en", "English"],
              ["id", "Bahasa Indonesia"],
            ].map(([k, label]) => (
              <button key={k} type="button" aria-pressed={lang === k} onClick={() => setLang(k)} className={lang === k ? "underline underline-offset-4" : "opacity-60 hover:opacity-100"}>
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="col-span-12 text-main md:col-span-6 md:col-start-4 md:row-start-2">
          {meta.map((b, i) => (
            <p key={i} className={i ? "mt-1 opacity-70" : ""}>
              <Inline text={b.text} />
            </p>
          ))}
        </div>
      </div>

      <ol className="site-x mt-sec">
        {clauses.map((c, i) => (
          <li key={c.title} className="grid grid-cols-12 gap-x-4 gap-y-3 border-t border-current/40 py-6">
            <span className="col-span-2 text-main md:col-span-3">({i + 1})</span>
            <h2 className="col-span-10 font-display text-h3 md:col-span-3">{c.title.replace(/^\d+\.\s*/, "")}</h2>
            <div className="col-span-10 col-start-3 max-w-xl text-main leading-[1.4] md:col-span-6 md:col-start-auto">
              {c.body.map((b, j) => (
                <Body key={j} b={b} />
              ))}
            </div>
          </li>
        ))}
      </ol>
    </main>
  );
}
