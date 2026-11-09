"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Project } from "@/data/projects";

/**
 * The hero's centrepiece: a laptop and a phone that play through the live concept sites, so
 * visitors see real work in the first few seconds. Each site's progress bar is a CSS animation;
 * when it finishes, the next site shows. That keeps timing in CSS: hovering or focusing pauses
 * the bar, and with reduced motion the bars don't run, so nothing advances on its own.
 */
export default function HeroShowcase({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState(0);
  // Screenshots mount as they're needed (the one showing plus the next), then stay mounted so
  // fading back to one never re-downloads it. First load fetches two, not all of them.
  const [mounted, setMounted] = useState(
    () => new Set([0, 1 % projects.length]),
  );
  // The screenshots wait until the page has loaded and gone idle, so they never compete with
  // the hero photo for the first paint. Until then the screens show their dark background.
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const canIdle = typeof window.requestIdleCallback === "function";
    let id = 0;
    const start = () => {
      id = canIdle
        ? window.requestIdleCallback(() => setReady(true), { timeout: 2000 })
        : window.setTimeout(() => setReady(true), 600);
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => {
      window.removeEventListener("load", start);
      if (canIdle) window.cancelIdleCallback(id);
      else window.clearTimeout(id);
    };
  }, []);
  const project = projects[active];
  const show = (i: number) => {
    setActive(i);
    setMounted((prev) => new Set(prev).add(i).add((i + 1) % projects.length));
  };
  const next = () => show((active + 1) % projects.length);

  const stack = (kind: "desktop" | "mobile", sizes: string) =>
    projects.map((p, i) =>
      ready && mounted.has(i) ? (
        <Image
          key={p.slug}
          src={p.images[kind]}
          alt={i === active && kind === "desktop" ? `${p.name} homepage` : ""}
          aria-hidden={i !== active || kind === "mobile"}
          fill
          sizes={sizes}
          fetchPriority="low"
          className={`object-cover object-top transition-opacity duration-700 ${i === active ? "opacity-100" : "opacity-0"}`}
        />
      ) : null,
    );

  return (
    <section
      aria-label="Concept sites we've built"
      className="showcase group/showcase relative"
    >
      {/* Warm light behind the devices */}
      <div
        aria-hidden="true"
        className="absolute -inset-x-10 -top-6 bottom-10 -z-10 bg-[radial-gradient(closest-side,rgba(251,79,20,0.34),transparent)]"
      />
      <div className="relative pr-[7%] pb-[5%]">
        {/* Laptop */}
        <div className="rounded-t-2xl border-[0.5rem] border-b-[0.6rem] border-[#0b1422] bg-navy shadow-[0_40px_90px_-30px_rgba(0,0,0,0.95)] ring-1 ring-cream/10 sm:border-[0.6rem]">
          <div className="relative aspect-[16/10] overflow-hidden rounded-md">
            {stack(
              "desktop",
              "(min-width: 1024px) 560px, (min-width: 640px) 520px, 85vw",
            )}
          </div>
        </div>
        <div
          aria-hidden="true"
          className="-mx-[3.5%] h-2.5 rounded-b-2xl bg-gradient-to-b from-[#c9d0d9] to-[#7b8594] sm:h-3"
        />
        {/* Phone */}
        <div className="absolute right-0 bottom-0 w-[23%] rounded-[1.15rem] border-[0.3rem] border-[#0b1422] bg-navy shadow-[0_24px_50px_-16px_rgba(0,0,0,0.95)] ring-1 ring-cream/15 sm:rounded-[1.6rem] sm:border-[0.4rem]">
          <div className="relative aspect-[9/19] overflow-hidden rounded-[0.85rem] sm:rounded-[1.2rem]">
            {stack("mobile", "(min-width: 640px) 140px, 22vw")}
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-2xl bg-cream/[0.06] px-4 pt-3.5 pb-3 ring-1 ring-orange/25 backdrop-blur-md">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="t-mono truncate text-[0.62rem] text-mist">
              <span
                aria-hidden="true"
                className="mr-2 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-orange align-middle"
              />
              Concept project · {project.industry}
            </p>
            <p className="mt-1 truncate font-bold text-cream">{project.name}</p>
          </div>
          <a
            href={project.url}
            target="_blank"
            rel="noopener"
            className="shrink-0 rounded-full px-3 py-1.5 text-sm font-bold text-orange ring-1 ring-orange/40 transition-colors hover:bg-orange hover:text-navy"
          >
            View live <span aria-hidden="true">↗</span>
            <span className="sr-only">
              {" "}
              (opens {project.name} in a new tab)
            </span>
          </a>
        </div>

        {/* One bar per site: click to jump, and the active bar fills while it's on screen. */}
        <div className="mt-2.5 flex gap-1.5">
          {projects.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              onClick={() => show(i)}
              aria-label={`Show ${p.name}`}
              aria-current={i === active}
              className="group/bar relative h-5 flex-1 cursor-pointer"
            >
              <span className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 overflow-hidden rounded-full bg-cream/15 transition-colors group-hover/bar:bg-cream/30">
                {i === active ? (
                  <span
                    key={active}
                    onAnimationEnd={next}
                    className="showcase-progress absolute inset-0 origin-left rounded-full bg-orange"
                  />
                ) : null}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
