"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { Project } from "@/data/projects";

/**
 * A laptop and phone showing a whole site. With a mouse, the screens scroll through
 * the full page on hover. Touch screens can't hover, so there the screens loop up and
 * down while the showcase is on screen, with a Pause/Play button.
 * "loop" keeps them scrolling up and down, for case study pages.
 *
 * The full-page screenshots are heavy, so hover-mode showcases (which sit below the
 * first screen) load them only once the page has finished loading and gone idle,
 * about a second after load. Until then the screens show their navy background.
 * That keeps them from competing with the hero photo on first load.
 */
const hoverQuery = "(hover: hover)";
const subscribeHover = (onChange: () => void) => {
  const query = window.matchMedia(hoverQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

export default function DeviceShowcase({
  project,
  mode = "hover",
  priority = false,
  sizes = "(min-width: 1024px) 420px, (min-width: 640px) 50vw, 100vw",
}: {
  project: Project;
  mode?: "hover" | "loop";
  priority?: boolean;
  sizes?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [paused, setPaused] = useState(false);
  const [full, setFull] = useState(priority || mode === "loop");
  // The server renders the mouse version; touch devices switch after hydration.
  const canHover = useSyncExternalStore(subscribeHover, () => window.matchMedia(hoverQuery).matches, () => true);
  const touch = mode === "hover" && !canHover;

  useEffect(() => {
    if (full) return;
    // Safari has no requestIdleCallback, so fall back to a short timeout there.
    const canIdle = typeof window.requestIdleCallback === "function";
    let idleId = 0;
    const upgrade = () => {
      idleId = canIdle
        ? window.requestIdleCallback(() => setFull(true), { timeout: 2500 })
        : window.setTimeout(() => setFull(true), 1200);
    };
    if (document.readyState === "complete") upgrade();
    else window.addEventListener("load", upgrade, { once: true });
    return () => {
      window.removeEventListener("load", upgrade);
      if (canIdle) window.cancelIdleCallback(idleId);
      else window.clearTimeout(idleId);
    };
  }, [full]);

  useEffect(() => {
    const el = ref.current;
    // Touch devices only play the loop while the showcase is in view.
    if (!el || !touch) return;
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [touch]);

  const loop = mode === "loop" || touch;
  const screenClass = loop ? "screen-loop" : "screen-scroll";

  return (
    <div
      ref={ref}
      data-paused={(touch && (!active || paused)) || undefined}
      className="device-showcase relative pr-[9%] pb-[6%]"
    >
      {touch ? (
        // Sits above the card's full-size link, so tapping it doesn't open the case study.
        <button
          type="button"
          onClick={() => setPaused((value) => !value)}
          aria-pressed={paused}
          className="absolute bottom-0 left-0 z-10 inline-flex translate-y-1/2 items-center gap-1.5 rounded-full bg-cream/10 px-3 py-1.5 font-mono text-[0.65rem] font-medium uppercase tracking-widest text-cream backdrop-blur motion-reduce:hidden"
        >
          <span aria-hidden="true">{paused ? "▶" : "❚❚"}</span>
          {paused ? "Play preview" : "Pause preview"}
        </button>
      ) : null}
      {/* Laptop */}
      <div className="rounded-t-[0.9rem] bg-[#0b1117] p-[2.2%] pb-[1.6%] shadow-2xl shadow-navy/30 ring-1 ring-white/10">
        <div className={`${screenClass} aspect-[16/10] rounded-[0.35rem] bg-navy-3`}>
          {full ? (
            <Image
              src={project.images.fullDesktop}
              alt={`Full ${project.name} home page on a laptop`}
              width={960}
              height={3600}
              sizes={sizes}
              loading={priority ? "eager" : undefined}
              fetchPriority={priority ? "high" : undefined}
              className="w-full fade-in"
            />
          ) : null}
        </div>
      </div>
      <div
        aria-hidden="true"
        className="relative -mx-[5%] h-[0.9rem] rounded-b-[0.9rem] bg-gradient-to-b from-[#c9cfd6] to-[#8d97a3] sm:h-4"
      >
        <span className="absolute top-0 left-1/2 h-1.5 w-[16%] -translate-x-1/2 rounded-b-md bg-[#79838f]" />
      </div>

      {/* Phone */}
      <div className="absolute right-0 bottom-0 w-[25%] rounded-[1.1rem] bg-[#0b1117] p-[1.6%] shadow-2xl shadow-navy/40 ring-1 ring-white/15 sm:rounded-[1.4rem]">
        <div
          className={`${screenClass} ${loop ? "screen-loop-phone" : ""} aspect-[9/19] rounded-[0.8rem] bg-navy-3 sm:rounded-[1.05rem]`}
        >
          {full ? (
            <Image
              src={project.images.fullMobile}
              alt={`Full ${project.name} home page on a phone`}
              width={440}
              height={5866}
              sizes="160px"
              loading={priority ? "eager" : undefined}
              fetchPriority={priority ? "high" : undefined}
              className="w-full fade-in"
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
