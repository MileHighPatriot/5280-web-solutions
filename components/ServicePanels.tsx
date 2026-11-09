import Link from "next/link";
import type { ReactNode } from "react";
import { services } from "@/data/services";

/**
 * The four services, each with a small looping demo of the thing itself in place of an icon:
 * a page assembling, a before/after wipe, a speed score filling, and a map pin landing on a
 * listing. The demos are CSS only (see "Service demos" in globals.css) and hold their finished
 * state under reduced motion.
 */
const demos: Record<string, ReactNode> = {
  "new-websites": (
    <span className="svc-build absolute inset-0">
      <i className="top-[12%] left-[8%] h-[9%] w-[84%] bg-cream/25" />
      <i className="top-[28%] left-[8%] h-[44%] w-[48%] bg-orange" />
      <i className="top-[28%] left-[60%] h-[20%] w-[32%] bg-cream/25" />
      <i className="top-[52%] left-[60%] h-[20%] w-[32%] bg-cream/25" />
      <i className="top-[79%] left-[8%] h-[10%] w-[84%] bg-cream/15" />
    </span>
  ),
  redesigns: (
    <span className="absolute inset-0">
      <span className="absolute inset-0 bg-gradient-to-br from-[#05070d] to-[#12224a]">
        <span className="absolute top-[30%] right-[10%] h-[10%] w-[38%] rounded-sm bg-[#22e3ff]" />
        <span className="absolute top-[50%] right-[10%] h-[10%] w-[24%] rounded-sm bg-[#ffb020]" />
      </span>
      <span className="svc-wipe absolute inset-0 bg-[#d0d0d0] p-[8%] font-serif text-[0.6rem] leading-tight font-bold text-[#b00000]">
        HOT SPECIALS!!!
        <span className="mt-1 block h-[38%] w-[55%] border border-dashed border-[#888] bg-[#bdbdbd]" />
      </span>
      <span className="svc-handle absolute inset-y-0 left-0 w-full">
        <span className="absolute inset-y-0 left-0 w-0.5 -translate-x-1/2 bg-cream" />
        <span className="absolute top-1/2 left-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cream ring-2 ring-orange" />
      </span>
    </span>
  ),
  "hosting-care": (
    <span className="absolute inset-0 grid place-items-center">
      <svg viewBox="0 0 80 80" className="h-[72%]">
        <circle
          cx="40"
          cy="40"
          r="32"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.15"
          strokeWidth="6"
        />
        <circle
          className="svc-ring"
          cx="40"
          cy="40"
          r="32"
          fill="none"
          stroke="#35d08a"
          strokeWidth="6"
          strokeLinecap="round"
          pathLength="100"
          strokeDasharray="100"
          transform="rotate(-90 40 40)"
        />
        <text
          x="40"
          y="47"
          textAnchor="middle"
          className="fill-cream font-mono text-[1.25rem] font-medium"
        >
          100
        </text>
      </svg>
    </span>
  ),
  "get-found": (
    <span className="absolute inset-0 bg-[linear-gradient(rgba(245,243,238,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(245,243,238,0.08)_1px,transparent_1px)] bg-[size:1.4rem_1.4rem]">
      <span className="svc-pin absolute top-[18%] left-[18%] h-5 w-5 rotate-[-45deg] rounded-[50%_50%_50%_0] bg-orange shadow-[0_0_18px_rgba(251,79,20,0.9)]" />
      <span className="svc-listing absolute right-[7%] bottom-[12%] left-[36%] rounded-md bg-cream px-2 py-1.5 text-[0.62rem] leading-tight font-bold text-navy">
        Your business
        <span className="block font-semibold text-rust">★★★★★ · Open now</span>
      </span>
    </span>
  ),
};

export default function ServicePanels() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {services.map((service) => (
        <Link
          key={service.id}
          href={`/services/#${service.id}`}
          data-glow
          className="glow-card reveal group relative grid grid-cols-[6.5rem_1fr] items-start gap-x-4 rounded-2xl bg-cream/[0.05] p-4 [--glow-a:0.16] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] ring-1 ring-orange/20 backdrop-blur-sm transition-[translate,box-shadow] duration-300 hover:-translate-y-1 hover:ring-orange/70 hover:shadow-[0_18px_40px_-18px_rgba(251,79,20,0.55)] sm:flex sm:flex-col sm:p-5"
        >
          <span
            aria-hidden="true"
            className="svc-viz relative block aspect-square w-full overflow-hidden rounded-xl bg-black/45 text-cream ring-1 ring-cream/10 sm:aspect-[16/10]"
          >
            {demos[service.id]}
          </span>
          <span className="flex h-full flex-col sm:mt-5">
            <span className="t-h3 block">{service.title}</span>
            <span className="mt-2 line-clamp-3 text-[0.95rem] leading-relaxed text-mist sm:mt-3 sm:line-clamp-none sm:text-base">
              {service.short}
            </span>
            <span className="mt-auto block pt-3 text-sm font-bold text-orange-soft sm:pt-5">
              Learn more{" "}
              <span
                aria-hidden="true"
                className="inline-block transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </span>
          </span>
        </Link>
      ))}
    </div>
  );
}
