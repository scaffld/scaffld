/** Line illustrations for the five services (paths use pathLength=1 so they can be drawn in). */
const P = {
  web: ["M4 8h40v32H4z", "M4 15h40", "M10 22h16", "M10 28h22", "M10 34h10"],
  app: ["M4 6h40v36H4z", "M16 6v36", "M22 34V24", "M30 34V16", "M38 34V20"],
  shop: ["M8 16h32l-3 26H11z", "M17 16v-4a7 7 0 0 1 14 0v4", "M18 26h12"],
  design: ["M24 4l12 16-12 22-12-22z", "M24 4v22", "M4 44h40", "M24 26a3 3 0 1 0 0 .1"],
  care: ["M24 6a18 18 0 1 0 18 18", "M24 24l10-10", "M42 6v8h-8", "M24 24h.1"],
};

export function ServiceIcon({ name, className = "size-12", strokeWidth = 2 }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      {P[name].map((d, i) => (
        <path key={i} d={d} pathLength="1" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="square" data-icon-path="" />
      ))}
    </svg>
  );
}
