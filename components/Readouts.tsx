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

function useCountUp(target: number, active: boolean, decimals = 0) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    // With reduced motion the value lands on the first frame instead of counting up.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now();
    const duration = reduce ? 1 : 1400;
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 4);
      setValue(Number((target * eased).toFixed(decimals)));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, active, decimals]);
  return value;
}

function Cell({ reading, active }: { reading: Reading; active: boolean }) {
  const value = useCountUp(reading.value, active, reading.decimals);
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
  const [active, setActive] = useState(false);
  const [load, setLoad] = useState<number | null>(null);

  useEffect(() => {
    const read = () => setLoad(measureLoad());
    if (document.readyState === "complete") read();
    else window.addEventListener("load", read, { once: true });

    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
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
    { label: "Reply time", value: 1, unit: "business day", note: "Usually sooner. Call or text anytime." },
  ];

  return (
    <section aria-label="At a glance" data-glow className="relative isolate overflow-clip border-t border-cream/10 bg-navy-ink">
      <Blueprint className="opacity-60" />
      <div ref={ref} className="container-x grid grid-cols-2 gap-x-6 lg:grid-cols-4 lg:gap-x-0">
        {readings.map((reading) => (
          <Cell key={reading.label} reading={reading} active={active} />
        ))}
      </div>
    </section>
  );
}
