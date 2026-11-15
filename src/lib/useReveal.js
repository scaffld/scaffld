import { SplitText } from "gsap/SplitText";
import { gsap, useGSAP, MOTION_OK } from "./gsap";

gsap.registerPlugin(SplitText);

/**
 * Run `fn(el)` once, when `el` first enters the viewport. IntersectionObserver
 * needs no layout reads, unlike one ScrollTrigger per element (long pages
 * spent ~1s in style/layout recalculating dozens of triggers).
 */
export function onFirstView(elements, fn, rootMargin = "0px 0px -8% 0px") {
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        fn(e.target);
      }),
    { rootMargin },
  );
  elements.forEach((el) => io.observe(el));
  return () => io.disconnect();
}

/**
 * Scroll entrances for a section. Markup opts in with attributes:
 *  - data-reveal   fade + rise (reference: 1s, power3.out)
 *  - data-split    per-line masked rise for statements and headings (SplitText),
 *                  split lazily on first view
 * Content is visible by default; animation only runs when motion is allowed.
 */
export function useReveal(scope) {
  useGSAP(
    (_ctx, contextSafe) => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(scope);

        const reveals = q("[data-reveal]");
        if (reveals.length) gsap.set(reveals, { autoAlpha: 0, y: 32 });
        const stopReveal = onFirstView(
          reveals,
          contextSafe((el) => gsap.to(el, { autoAlpha: 1, y: 0, duration: 1, ease: "power3.out", delay: Number(el.dataset.delay || 0) })),
        );

        const splits = q("[data-split]");
        if (splits.length) gsap.set(splits, { autoAlpha: 0 });
        const stopSplit = onFirstView(
          splits,
          contextSafe((el) => {
            gsap.set(el, { autoAlpha: 1 });
            SplitText.create(el, {
              type: "lines",
              mask: "lines",
              autoSplit: true,
              aria: "none", // keep the text itself readable; aria-label is invalid on <p>
              onSplit: (self) =>
                gsap.from(self.lines, { yPercent: 105, duration: 1.25, ease: "power4.out", stagger: 0.08, delay: Number(el.dataset.delay || 0) }),
            });
          }),
          "0px",
        );

        return () => {
          stopReveal();
          stopSplit();
        };
      });
    },
    { scope },
  );
}
