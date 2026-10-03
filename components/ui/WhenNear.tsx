"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Holds its children back until the visitor scrolls within `margin` of this spot.
 * Native lazy loading isn't enough for a heavy image just below the fold: Chrome starts
 * those up to 1,250px early, so on a phone it downloads alongside the hero photo and
 * counts against the first paint. Give the wrapper its own size (e.g. an aspect ratio)
 * so nothing shifts when the children arrive.
 */
export default function WhenNear({
  children,
  className,
  margin = "600px",
}: {
  children: ReactNode;
  className?: string;
  margin?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        setNear(true);
      },
      { rootMargin: margin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [margin]);

  return (
    <div ref={ref} className={className}>
      {near ? children : null}
    </div>
  );
}
