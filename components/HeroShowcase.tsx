"use client";

import Image from "next/image";
import { useState } from "react";
import type { Project } from "@/data/projects";

/**
 * A small browser window in the hero that cycles through the live concept sites, so visitors
 * see real work in the first few seconds. Each site's progress bar is a CSS animation; when it
 * finishes, the next site shows. That keeps timing in CSS: hovering or focusing pauses the bar,
 * and with reduced motion the bars don't run, so nothing advances on its own.
 */
export default function HeroShowcase({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState(0);
  // Screenshots mount as they're needed (the one showing plus the next), then stay mounted so
  // fading back to one never re-downloads it. First load fetches two, not all of them.
  const [mounted, setMounted] = useState(() => new Set([0, 1 % projects.length]));
  const project = projects[active];
  const show = (i: number) => {
    setActive(i);
    setMounted((prev) => new Set(prev).add(i).add((i + 1) % projects.length));
  };
  const next = () => show((active + 1) % projects.length);

  return (
    <section
      aria-label="Concept sites we've built"
      className="showcase group/showcase overflow-hidden rounded-2xl bg-navy-ink/75 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] ring-1 ring-cream/15 backdrop-blur-md"
    >
      {/* Browser bar */}
      <div className="flex items-center gap-3 border-b border-cream/10 px-4 py-2.5">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-cream/25" />
          <span className="h-2 w-2 rounded-full bg-cream/25" />
          <span className="h-2 w-2 rounded-full bg-cream/25" />
        </span>
        <span className="flex min-w-0 flex-1 items-center gap-2 rounded-full bg-cream/8 px-3 py-1 font-mono text-[0.68rem] text-mist">
          <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-orange" />
          <span className="truncate">{new URL(project.url).host}</span>
        </span>
      </div>

      {/* Screen: every screenshot is stacked; the active one fades in. */}
      <div className="relative aspect-[16/10] bg-navy">
        {projects.map((p, i) =>
          mounted.has(i) ? (
            <Image
              key={p.slug}
              src={p.images.desktop}
              alt={i === active ? `${p.name} homepage` : ""}
              aria-hidden={i !== active}
              fill
              sizes="380px"
              fetchPriority="low"
              className={`object-cover object-top transition-opacity duration-700 ${i === active ? "opacity-100" : "opacity-0"}`}
            />
          ) : null,
        )}
      </div>

      <div className="px-4 pt-3.5 pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="t-mono truncate text-[0.62rem] text-mist">Concept project · {project.industry}</p>
            <p className="mt-1 truncate font-bold text-cream">{project.name}</p>
          </div>
          <a
            href={project.url}
            target="_blank"
            rel="noopener"
            className="shrink-0 rounded-full px-3 py-1.5 text-sm font-bold text-orange ring-1 ring-orange/40 transition-colors hover:bg-orange hover:text-navy"
          >
            View live <span aria-hidden="true">↗</span>
            <span className="sr-only"> (opens {project.name} in a new tab)</span>
          </a>
        </div>

        {/* One bar per site: click to jump, and the active bar fills while it's on screen. */}
        <div className="mt-3.5 flex gap-1.5">
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
