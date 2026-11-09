"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, ViewTransition } from "react";
import type { Project } from "@/data/projects";

/**
 * Every concept site in one swipeable row. It's a plain scrolling list with scroll-snap, so
 * touch, trackpad, and keyboard (tab through the links) all work with no carousel library;
 * the arrow buttons just scroll it one card at a time.
 */
export default function WorkReel({ projects }: { projects: Project[] }) {
  const list = useRef<HTMLUListElement>(null);
  const step = (direction: 1 | -1) => {
    const el = list.current;
    if (!el) return;
    const card = el.querySelector("li");
    el.scrollBy({
      left: direction * ((card?.clientWidth ?? 320) + 24),
      behavior: "smooth",
    });
  };

  return (
    <div>
      <ul
        ref={list}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto overscroll-x-contain pt-2 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {projects.map((project, i) => (
          <li
            key={project.slug}
            className="w-[78vw] max-w-[23rem] shrink-0 snap-start sm:w-[23rem]"
          >
            <Link href={`/work/${project.slug}/`} className="group block">
              <ViewTransition
                name={`project-${project.slug}`}
                share="morph"
                default="none"
              >
                <span className="relative block aspect-[16/10] overflow-hidden rounded-2xl bg-navy-3 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)] ring-1 ring-cream/10 transition-[box-shadow] duration-300 group-hover:ring-orange/70 group-hover:shadow-[0_30px_70px_-28px_rgba(251,79,20,0.55)]">
                  <Image
                    src={project.images.desktop}
                    alt={`${project.name} homepage`}
                    fill
                    sizes="(min-width: 640px) 368px, 78vw"
                    className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  />
                </span>
              </ViewTransition>
              <span className="t-mono mt-5 flex items-center justify-between gap-3 text-[0.65rem] text-mist">
                <span className="truncate">
                  <span className="text-orange-soft">
                    {String(i + 1).padStart(2, "0")}
                  </span>{" "}
                  · {project.industry}
                </span>
                <span
                  aria-hidden="true"
                  className="text-base text-orange transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
              <span className="t-h3 mt-1.5 block">{project.name}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex items-center justify-between gap-4">
        <p className="text-sm text-mist">
          <span className="sm:hidden">Swipe to see all {projects.length}.</span>
          <span className="max-sm:hidden">
            Concept projects. Real client work is added as it launches.
          </span>
        </p>
        <div className="flex gap-2 max-sm:hidden">
          {([-1, 1] as const).map((direction) => (
            <button
              key={direction}
              type="button"
              onClick={() => step(direction)}
              aria-label={
                direction === 1 ? "Next projects" : "Previous projects"
              }
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-cream ring-1 ring-cream/25 transition-colors hover:bg-orange hover:text-navy hover:ring-orange"
            >
              <svg
                viewBox="0 0 16 16"
                fill="none"
                className={`h-4 w-4 ${direction === -1 ? "rotate-180" : ""}`}
              >
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
