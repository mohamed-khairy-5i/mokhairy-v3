"use client";

import { useEffect, useRef } from "react";

/**
 * RevealRoot — GSAP ScrollTrigger batch reveal.
 * Any element with [data-reveal] fades/slides in once; keeps a reduced-motion escape hatch.
 */
export default function RevealRoot() {
  const done = useRef(false);

  useEffect(() => {
    if (done.current) return;
    done.current = true;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!els.length) return;

    if (reduce) {
      els.forEach((el) => el.setAttribute("data-revealed", ""));
      return;
    }

    let cleanup = () => {};
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      els.forEach((el) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(18px)";
      });

      const st = ScrollTrigger.batch("[data-reveal]", {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.08,
            overwrite: true,
            onComplete: () => batch.forEach((el) => el.setAttribute("data-revealed", "")),
          }),
      });

      // re-measure when late layout shifts move things (font swap, lazy images)
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      const ro = new ResizeObserver(() => refresh());
      ro.observe(document.body);
      const t1 = setTimeout(refresh, 700);
      const t2 = setTimeout(refresh, 1800);

      // anything already in viewport on load
      ScrollTrigger.refresh();
      cleanup = () => {
        window.removeEventListener("load", refresh);
        ro.disconnect();
        clearTimeout(t1);
        clearTimeout(t2);
        st.forEach((s) => s.kill());
        ScrollTrigger.getAll().forEach((s) => s.kill());
      };
    })();

    return () => cleanup();
  }, []);

  return null;
}
