"use client";

import { useEffect, useRef, useState } from "react";
import Blueprint from "@/components/ui/Blueprint";
import { site } from "@/data/site";

/**
 * Instrument-style strip under the hero. The first reading is real: how long this
 * page took to load in the visitor's own browser. If it was slow (bad connection),
 * that cell switches to a plain statement instead of showing an unflattering number.
 */

type Reading = { label: string; value: number; decimals?: number; unit: string; note: string };

const FAST_ENOUGH = 2.5; // seconds, Google's "good" threshold

function measureLoad(): number | null {
  const [nav] = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
  if (!nav || !nav.domContentLoadedEventEnd) return null;
  return nav.domContentLoadedEventEnd / 1000;
}

/**
 * The server HTML carries the real numbers, so crawlers, link previews, and slow phones never
 * see zeros. The count-up is an extra on top: it only runs when the strip starts below the fold.
 * The values drop to 0 while off screen, then count up as it scrolls in.
 */
type Phase = "rest" | "armed" | "run";

function useCountUp(target: number, phase: Phase, decimals = 0) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (phase !== "run") return;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start) / 1400, 1);
      setProgress(1 - Math.pow(1 - t, 4));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    // If the tab is hidden mid-count (rAF pauses), land on the real number.
    const settle = () => document.hidden && setProgress(1);
    document.addEventListener("visibilitychange", settle);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("visibilitychange", settle);
    };
  }, [phase]);
  if (phase === "rest") return target;
  return Number((target * (phase === "armed" ? 0 : progress)).toFixed(decimals));
}

function Cell({ reading, phase }: { reading: Reading; phase: Phase }) {
  const value = useCountUp(reading.value, phase, reading.decimals);
  return (
    <div className="border-cream/10 py-6 lg:border-l lg:px-8 lg:first:border-l-0 lg:first:pl-0">
      <p className="t-mono flex items-center gap-2 text-mist">
        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-orange" />
        {reading.label}
      </p>
      <p className="mt-2 font-mono text-2xl font-medium tracking-tight text-cream tabular-nums sm:text-4xl">
        {value.toLocaleString("en-US", { minimumFractionDigits: reading.decimals ?? 0 })}
        <span className="ml-1.5 text-sm text-orange sm:text-base">{reading.unit}</span>
      </p>
      <p className="mt-1 text-sm text-mist">{reading.note}</p>
    </div>
  );
}

export default function Readouts() {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("rest");
  const [load, setLoad] = useState<number | null>(null);

  useEffect(() => {
    const read = () => setLoad(measureLoad());
    if (document.readyState === "complete") read();
    else window.addEventListener("load", read, { once: true });

    const el = ref.current;
    const still =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches || navigator.webdriver;
    if (!el || still) return;
    // The first callback reports where the strip is at mount. Already on screen: leave the
    // real numbers alone. Below the fold: zero them now and count up when they scroll in.
    let first = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const onScreen = entry.isIntersecting;
        if (first) {
          first = false;
          if (onScreen) return observer.disconnect();
          return setPhase("armed");
        }
        if (onScreen) {
          setPhase("run");
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      window.removeEventListener("load", read);
    };
  }, []);

  const fast = load !== null && load <= FAST_ENOUGH;
  const readings: Reading[] = [
    fast
      ? {
          label: "Load time",
          value: load!,
          decimals: 2,
          unit: "s",
          note: "This page, measured just now in your browser",
        }
      : { label: "Custom built", value: 100, unit: "%", note: "No templates. Designed for your business." },
    { label: "Service area", value: site.cities.length, unit: "cities", note: "Fort Collins to Colorado Springs" },
    { label: "Your team", value: 1, unit: "developer", note: "Start to finish. No call centers." },
    { label: "Reply time", value: 1, unit: "business day", note: `Usually sooner. Calls & texts ${site.hours}.` },
  ];

  return (
    <section aria-label="At a glance" data-glow className="relative isolate overflow-clip border-t border-cream/10 bg-navy-ink">
      <Blueprint className="opacity-60" />
      <div ref={ref} className="container-x grid grid-cols-2 gap-x-6 lg:grid-cols-4 lg:gap-x-0">
        {readings.map((reading) => (
          <Cell key={reading.label} reading={reading} phase={phase} />
        ))}
      </div>
    </section>
  );
}
