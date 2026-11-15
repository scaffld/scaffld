/**
 * Giant letterform behind content, with text that inverts where it crosses the
 * shape (reference: white type over black letterforms). The same SVG paints the
 * shape and masks a cream copy of the content, so the two always line up.
 * The copy is aria-hidden and inert; the real content stays in the a11y tree.
 */
export function InkLayer({ ref, shape, fit = "cover", py = "50%", children, className = "", innerClassName = "", invert = true, invertClassName = "text-cream", ...rest }) {
  const vars = { "--shape": `url(${shape})`, "--fit": fit, "--py": py };
  return (
    <div ref={ref} className={`relative isolate ${className}`} style={vars} {...rest}>
      <div aria-hidden="true" className="shape-bg" data-shape="" />
      <div className={`relative ${innerClassName}`}>{children}</div>
      {invert && (
        <div aria-hidden="true" inert className={`shape-mask pointer-events-none select-none ${invertClassName}`} data-shape="">
          <div className={innerClassName}>{children}</div>
        </div>
      )}
    </div>
  );
}
