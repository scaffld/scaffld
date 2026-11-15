/**
 * The SCAFFLD ticket symbol, rebuilt as a vector from the logo: a square ticket
 * with two punched corners and a diagonal fold. Paths use pathLength=1 so a
 * parent can draw them with stroke-dashoffset.
 */
const MARK_OUTLINE = "M0 0H75.4A18.4 18.4 0 0 0 100 24.3V94Q100 100 94 100H21.2A18.3 18.3 0 0 0 0 74.4Z";
const MARK_FOLD = "M0 0L99 99";

export function BrandMark({ className = "", strokeWidth = 8, title }) {
  return (
    <svg
      viewBox="-6 -6 112 112"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : "true"}
      aria-label={title}
    >
      <path d={MARK_OUTLINE} pathLength="1" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round" data-mark="" />
      <path d={MARK_FOLD} pathLength="1" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" data-mark="" />
    </svg>
  );
}

/**
 * Logo lockup, after the reference's "mark + two-line descriptor" pattern:
 * symbol + SCAFFLD wordmark (StampRSPK, as on the printed logo) + "Web / Studio®".
 */
export function Logo({ compact = false, className = "" }) {
  return (
    <span className={`group inline-flex items-center gap-2 ${className}`}>
      <BrandMark className="size-7 transition-transform duration-700 ease-[var(--ease-out-3)] group-hover:rotate-90 md:size-8" />
      <span className="font-stamp text-[1.45rem] leading-none tracking-tight md:text-[1.7rem]">SCAFFLD</span>
      {!compact && (
        <span className="hidden text-small leading-[1.05] sm:block">
          Web
          <br />
          Studio®
        </span>
      )}
    </span>
  );
}
