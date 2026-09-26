"use client";

import { useEffect, useRef } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/#_-+";

/**
 * Text that "decodes" from random characters, left to right, the first time it
 * scrolls into view. Screen readers and search engines only ever see the real text;
 * the scramble runs on an aria-hidden copy. Skipped with reduced motion.
 * Best on monospace labels, where the width doesn't jump.
 *
 * Text that's already on screen when this mounts is left alone: the server HTML has been
 * showing it since first paint (up to a couple of seconds on a phone), so scrambling it
 * after hydration reads as a glitch rather than an effect.
 *
 * The scramble can never be the resting state: a timer and a tab-hidden check both force
 * the real text if animation frames stall, and headless browsers (screenshot bots) skip it.
 */
export default function Decode({ text, duration = 750 }: { text: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || navigator.webdriver || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    let safety = 0;

    const finish = () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(safety);
      el.textContent = text;
    };
    const onHide = () => document.hidden && finish();

    const run = () => {
      document.addEventListener("visibilitychange", onHide);
      safety = window.setTimeout(finish, duration + 150);
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const settled = Math.floor(progress * text.length);
        let out = "";
        for (let i = 0; i < text.length; i++) {
          const ch = text[i];
          out += i < settled || ch === " " || ch === "·" ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0];
        }
        el.textContent = out;
        if (progress < 1) frame = requestAnimationFrame(tick);
        else finish();
      };
      frame = requestAnimationFrame(tick);
    };

    // The first callback reports where the text is at mount.
    let first = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const alreadyVisible = first && entry.intersectionRatio > 0;
        first = false;
        if (alreadyVisible) observer.disconnect();
        else if (entry.isIntersecting) {
          observer.disconnect();
          run();
        }
      },
      { threshold: 1 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onHide);
      finish();
    };
  }, [text, duration]);

  return (
    <>
      <span className="sr-only">{text}</span>
      <span ref={ref} aria-hidden="true">
        {text}
      </span>
    </>
  );
}
