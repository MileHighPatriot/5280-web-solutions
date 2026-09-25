import type { CSSProperties } from "react";
import { LogoMark } from "@/components/Logo";

/**
 * Faint decorative art that fills the empty side of a section.
 * Place it as the first child of a `relative isolate overflow-clip` element (not overflow-hidden,
 * which would stop the scroll-driven drawing from following the page);
 * it sits behind the content (-z-10) and is hidden from screen readers.
 *
 * - numerals: a huge outlined "5280" bleeding off the right edge
 * - topo:     topographic contour lines, like a trail map
 * - logo:     the mountain mark, oversized and faded
 * - ridge:    a mountain ridge along the bottom with an "elev. 5,280 ft" marker
 *
 * The art draws itself in: on page load for headers (`animate="load"`), or as the
 * section scrolls into view (the default). The CSS lives under "Backdrop art" in globals.css.
 */
export type BackdropVariant = "numerals" | "topo" | "logo" | "ridge";

export default function Backdrop({
  variant,
  dark = false,
  seed = 1,
  animate = "scroll",
  className = "",
}: {
  variant: BackdropVariant;
  /** Draw in cream for navy sections. */
  dark?: boolean;
  /** Changes the contour layout, so repeated topo backdrops don't match. */
  seed?: number;
  /** "load" for art that's on screen when the page opens; "scroll" to draw it as it comes into view. */
  animate?: "load" | "scroll";
  className?: string;
}) {
  const ink = dark ? "text-cream" : "text-navy";
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 -z-10 select-none bd-${animate} ${ink} ${className}`}
    >
      {variant === "numerals" ? <Numerals dark={dark} /> : null}
      {variant === "topo" ? <Topo seed={seed} dark={dark} /> : null}
      {variant === "logo" ? (
        <LogoMark
          draw
          className={`absolute top-6 -right-12 h-[clamp(16rem,34vw,32rem)] w-auto ${dark ? "opacity-[0.07]" : "opacity-[0.06]"}`}
        />
      ) : null}
      {variant === "ridge" ? <Ridge dark={dark} /> : null}
    </div>
  );
}

function Numerals({ dark }: { dark: boolean }) {
  return (
    <span
      className="bd-rise absolute -top-[0.12em] -right-[0.06em] text-[clamp(9rem,27vw,25rem)] leading-none font-black tracking-[-0.05em] text-transparent"
      style={{ WebkitTextStroke: `2px ${dark ? "color-mix(in srgb, var(--color-cream) 8%, transparent)" : "color-mix(in srgb, var(--color-navy) 9%, transparent)"}` }}
    >
      5280
    </span>
  );
}

/* Contour rings are generated once at build time from a small seeded random generator. */
function rng(seed: number) {
  let s = seed * 9301 + 49297;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function contours(seed: number) {
  const rand = rng(seed);
  const peaks = [
    { x: 1000 + rand() * 250, y: 60 + rand() * 160, rings: 13 },
    { x: 1350 + rand() * 150, y: 480 + rand() * 200, rings: 10 },
    { x: 120 + rand() * 300, y: 620 + rand() * 120, rings: 7 },
  ];
  const rings: { d: string; index: boolean }[] = [];
  for (const peak of peaks) {
    const phase = rand() * Math.PI * 2;
    for (let k = 1; k <= peak.rings; k++) {
      const r = k * 30;
      let d = "";
      for (let a = 0; a <= 360; a += 6) {
        const t = (a * Math.PI) / 180;
        const rr = r * (1 + 0.13 * Math.sin(3 * t + k * 0.5 + phase) + 0.07 * Math.cos(5 * t - k * 0.3));
        d += `${a ? "L" : "M"}${(peak.x + rr * Math.cos(t)).toFixed(1)} ${(peak.y + rr * 0.72 * Math.sin(t)).toFixed(1)}`;
      }
      rings.push({ d: `${d}Z`, index: k % 5 === 0 });
    }
  }
  return rings;
}

function Topo({ seed, dark }: { seed: number; dark: boolean }) {
  const base = dark ? 0.06 : 0.07;
  return (
    <svg
      viewBox="0 0 1440 800"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      fill="none"
    >
      {contours(seed).map((ring, i) => (
        <path
          key={i}
          d={ring.d}
          pathLength={1}
          className="bd-draw"
          style={{ "--i": i } as CSSProperties}
          stroke="currentColor"
          strokeOpacity={ring.index ? base * 1.9 : base}
          strokeWidth={ring.index ? 1.6 : 1}
        />
      ))}
    </svg>
  );
}

const RIDGE =
  "M0 100 L90 84 150 92 240 58 300 74 380 44 440 70 520 52 600 80 690 36 760 64 830 50 900 76 980 12 1050 58 1120 42 1200 70 1290 46 1360 76 1440 60";

function Ridge({ dark }: { dark: boolean }) {
  return (
    <div className="bd-ridge absolute inset-x-0 bottom-0 h-20 sm:h-28">
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="bd-wipe absolute inset-0 h-full w-full">
        <path d={`${RIDGE} L1440 120 L0 120 Z`} fill="currentColor" fillOpacity={dark ? 0.05 : 0.045} />
        <path
          d={RIDGE}
          fill="none"
          stroke="currentColor"
          strokeOpacity={dark ? 0.2 : 0.18}
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      {/* Summit marker, placed in HTML so it doesn't stretch with the ridge */}
      <span className="bd-pop absolute top-[10%] left-[68.05%] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange" />
      <span className="bd-fade absolute top-[10%] right-[31.95%] mr-3 -translate-y-1/2 font-mono text-[0.62rem] tracking-[0.25em] whitespace-nowrap opacity-60">
        ELEV. 5,280 FT
      </span>
    </div>
  );
}
