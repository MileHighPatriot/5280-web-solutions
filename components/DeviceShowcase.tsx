"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/data/projects";

/**
 * A laptop and phone showing a whole site. The screens scroll through the full
 * page on hover (mouse) or when the showcase is on screen (touch devices).
 * "loop" keeps them scrolling up and down, for case study pages.
 */
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

  useEffect(() => {
    const el = ref.current;
    // Mouse users get hover; touch devices scroll the screens when the showcase is in view.
    if (!el || mode === "loop" || window.matchMedia("(hover: hover)").matches) return;
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), { threshold: 0.65 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [mode]);

  const screenClass = mode === "loop" ? "screen-loop" : "screen-scroll";

  return (
    <div ref={ref} data-active={active || undefined} className="device-showcase relative pr-[9%] pb-[6%]">
      {/* Laptop */}
      <div className="rounded-t-[0.9rem] bg-[#0b1117] p-[2.2%] pb-[1.6%] shadow-2xl shadow-navy/30 ring-1 ring-white/10">
        <div className={`${screenClass} aspect-[16/10] rounded-[0.35rem] bg-navy-3`}>
          <Image
            src={project.images.fullDesktop}
            alt={`Full ${project.name} home page on a laptop`}
            width={960}
            height={3600}
            sizes={sizes}
            priority={priority}
            className="w-full"
          />
        </div>
      </div>
      <div aria-hidden="true" className="relative -mx-[5%] h-[0.9rem] rounded-b-[0.9rem] bg-gradient-to-b from-[#c9cfd6] to-[#8d97a3] sm:h-4">
        <span className="absolute top-0 left-1/2 h-1.5 w-[16%] -translate-x-1/2 rounded-b-md bg-[#79838f]" />
      </div>

      {/* Phone */}
      <div className="absolute right-0 bottom-0 w-[25%] rounded-[1.1rem] bg-[#0b1117] p-[1.6%] shadow-2xl shadow-navy/40 ring-1 ring-white/15 sm:rounded-[1.4rem]">
        <div className={`${screenClass} ${mode === "loop" ? "screen-loop-phone" : ""} aspect-[9/19] rounded-[0.8rem] bg-navy-3 sm:rounded-[1.05rem]`}>
          <Image
            src={project.images.fullMobile}
            alt={`Full ${project.name} home page on a phone`}
            width={440}
            height={5866}
            sizes="160px"
            priority={priority}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}
