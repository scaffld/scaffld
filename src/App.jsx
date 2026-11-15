import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Nav } from "@/components/Nav";
import { Home } from "@/pages/Home";

// Index ships in the main bundle; other routes load on demand.
const Services = lazy(() => import("@/pages/Services").then((m) => ({ default: m.Services })));
const About = lazy(() => import("@/pages/About").then((m) => ({ default: m.About })));
const Terms = lazy(() => import("@/pages/Terms").then((m) => ({ default: m.Terms })));
const NotFound = lazy(() => import("@/pages/NotFound").then((m) => ({ default: m.NotFound })));
const Footer = lazy(() => import("@/components/Footer").then((m) => ({ default: m.Footer })));

/* Index and Services are single-screen pages, like the reference; the rest scroll and end in the footer. */
const NO_FOOTER = ["/", "/services"];

function ScrollReset() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  const { pathname } = useLocation();
  return (
    <SmoothScroll>
      <ScrollReset />
      <Nav />
      <Suspense fallback={<div className="min-h-svh bg-primary" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {!NO_FOOTER.includes(pathname) && <Footer />}
      </Suspense>
    </SmoothScroll>
  );
}
