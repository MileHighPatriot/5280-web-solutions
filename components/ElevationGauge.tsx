"use client";

import { useEffect, useRef, useState } from "react";

const SUMMIT = 5280;

/**
 * A thin gauge on the right edge of wide screens that climbs to 5,280 ft as the page scrolls,
 * a mile of elevation from the top of the page to the bottom. Decorative: hidden from screen
 * readers, off below xl (phones already have the progress bar under the header), and it only
 * moves a transform, so it costs nothing to scroll.
 */
export default function ElevationGauge() {
  const rail = useRef<HTMLDivElement>(null);
  const [feet, setFeet] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      rail.current?.style.setProperty("--p", progress.toFixed(4));
      setFeet(
        progress > 0.995 ? SUMMIT : Math.round((progress * SUMMIT) / 10) * 10,
      );
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={rail}
      aria-hidden="true"
      className="pointer-events-none fixed top-1/2 right-4 z-40 hidden h-[44vh] w-px -translate-y-1/2 bg-cream/20 mix-blend-difference xl:block"
    >
      <span className="absolute -top-5 right-0 font-mono text-[0.58rem] tracking-[0.18em] whitespace-nowrap text-cream/60">
        5,280
      </span>
      <span className="absolute inset-x-[-1px] bottom-0 h-full origin-bottom scale-y-[var(--p,0)] bg-cream" />
      <span className="absolute right-0 bottom-[calc(var(--p,0)*100%)] flex translate-y-1/2 items-center gap-2">
        <span className="font-mono text-[0.62rem] tracking-[0.16em] whitespace-nowrap text-cream tabular-nums">
          {feet.toLocaleString("en-US")} FT
        </span>
        <span className="-mr-[3px] h-[7px] w-[7px] rounded-full bg-cream" />
      </span>
    </div>
  );
}
