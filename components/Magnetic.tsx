"use client";

import { useEffect } from "react";

/**
 * One page-wide listener that lets any [data-magnet] element lean a few pixels toward the cursor
 * while it's hovered, then spring back. It sets the CSS `translate` property, which stacks with
 * (rather than replaces) any transform the element already has. Mouse and pen only, and off under
 * reduced motion.
 */
export default function Magnetic() {
  useEffect(() => {
    if (
      !window.matchMedia("(pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    let current: HTMLElement | null = null;
    const release = () => {
      if (current) current.style.translate = "";
      current = null;
    };
    const onMove = (event: PointerEvent) => {
      const target =
        (event.target as Element | null)?.closest<HTMLElement>(
          "[data-magnet]",
        ) ?? null;
      if (target !== current) release();
      if (!target) return;
      current = target;
      const box = target.getBoundingClientRect();
      const x = (event.clientX - (box.left + box.width / 2)) * 0.16;
      const y = (event.clientY - (box.top + box.height / 2)) * 0.26;
      target.style.translate = `${x.toFixed(1)}px ${y.toFixed(1)}px`;
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", release);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", release);
      release();
    };
  }, []);

  return null;
}
