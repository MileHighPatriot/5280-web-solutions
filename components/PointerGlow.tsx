"use client";

import { useEffect } from "react";

/**
 * One page-wide pointer listener that feeds the cursor position to every
 * [data-glow] element under the pointer, as --mx / --my (px, relative to that
 * element). CSS uses it for the blueprint spotlight and the card glow.
 * Mouse and pen only; touch screens don't get a hover effect.
 */
export default function PointerGlow() {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    let frame = 0;
    let last: PointerEvent | null = null;

    const apply = () => {
      frame = 0;
      if (!last) return;
      let el = (last.target as Element | null)?.closest<HTMLElement>("[data-glow]") ?? null;
      while (el) {
        const rect = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${last.clientX - rect.left}px`);
        el.style.setProperty("--my", `${last.clientY - rect.top}px`);
        el = el.parentElement?.closest<HTMLElement>("[data-glow]") ?? null;
      }
    };

    const onMove = (event: PointerEvent) => {
      last = event;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
