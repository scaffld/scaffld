import { brand } from "@/constant/site";

/** Filled dot + outlined numbered circle, as on the reference's section strips. */
function Counter({ n, className = "" }) {
  return (
    <span className={`inline-flex items-center gap-1 ${className}`}>
      <span className="sr-only">Section {n}</span>
      <span aria-hidden="true" className="size-[1.45em] rounded-full bg-current" />
      <span aria-hidden="true" className="grid size-[1.45em] place-items-center rounded-full border border-current text-[0.7em] leading-none tabular-nums">
        {n}
      </span>
    </span>
  );
}

/** Section header strip: (Label) · SCAFFLD® / V.01 · counter */
export function Strip({ label, n, className = "" }) {
  return (
    <div className={`site-grid items-start pt-4 text-main ${className}`} data-reveal="">
      <p className="col-span-6 max-w-[7.5rem] leading-[1.1] md:col-span-3">({label})</p>
      <p className="hidden md:col-span-6 md:block">
        {brand.name}® / {brand.version}
      </p>
      <div className="col-span-6 flex justify-end md:col-span-3">
        <Counter n={n} className="text-[1.15rem]" />
      </div>
    </div>
  );
}
