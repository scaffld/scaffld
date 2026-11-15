import { Link } from "react-router-dom";

const Arrow = () => (
  <svg viewBox="0 0 24 24" className="arrow size-[0.9em] shrink-0 transition-transform duration-500 ease-[var(--ease-out-3)] group-hover:translate-x-1.5" aria-hidden="true">
    <path d="M2 12h19M13 4l8 8-8 8" fill="none" stroke="currentColor" strokeWidth="2" />
  </svg>
);

/** Large text link with an arrow, e.g. "Enter Library →" in the reference. */
export function ArrowLink({ to, href, children, className = "", ...rest }) {
  const cls = `group inline-flex items-center gap-[0.35em] ${className}`;
  const body = (
    <>
      <span className="link-u">{children}</span>
      <Arrow />
    </>
  );
  if (href)
    return (
      <a href={href} className={cls} {...rest}>
        {body}
      </a>
    );
  return (
    <Link to={to} className={cls} {...rest}>
      {body}
    </Link>
  );
}
