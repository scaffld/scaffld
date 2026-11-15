import { useEffect } from "react";
import { ArrowLink } from "@/components/ArrowLink";

export function NotFound() {
  useEffect(() => {
    document.title = "Not found — SCAFFLD®";
  }, []);
  return (
    <main id="main" className="site-grid min-h-svh content-center gap-y-8 pt-24 pb-sec" data-nav="dark">
      <p className="col-span-12 text-main md:col-span-3">(404)</p>
      <div className="col-span-12 md:col-span-9">
        <h1 className="font-display text-display">This page isn&apos;t here.</h1>
        <p className="mt-6 max-w-md text-large">It may have moved, or never existed.</p>
        <ArrowLink to="/" className="mt-10 font-display text-h2">
          Back to the index
        </ArrowLink>
      </div>
    </main>
  );
}
