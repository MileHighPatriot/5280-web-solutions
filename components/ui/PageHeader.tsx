import type { ReactNode } from "react";
import Backdrop, { type BackdropVariant } from "@/components/ui/Backdrop";
import Blueprint from "@/components/ui/Blueprint";
import { Eyebrow } from "@/components/ui/Section";

/**
 * Page intro under the site header, with a thin ridge underneath. Navy continues the header;
 * orange is the bold version (big type, a faded 5280, and a visual on the right).
 */
export default function PageHeader({
  eyebrow,
  title,
  lede,
  actions,
  backdrop,
  seed,
  tone = "navy",
  visual,
  into = "cream",
  long = false,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  actions?: ReactNode;
  /** Faint art for the empty right side of the header. */
  backdrop?: BackdropVariant;
  seed?: number;
  tone?: "navy" | "orange";
  /** Right-hand visual for the orange header (stacks under the text on small screens). */
  visual?: ReactNode;
  /** Color of the section below, which the ridge fills into. */
  into?: "cream" | "navy";
  /** A smaller orange headline for titles longer than a few words. */
  long?: boolean;
}) {
  if (tone === "orange") {
    return (
      <header className="relative isolate overflow-hidden bg-orange text-navy-ink">
        <span
          aria-hidden="true"
          className="t-display pointer-events-none absolute -bottom-[6vw] -left-[2vw] -z-10 text-[34vw] leading-[0.8] text-navy-ink/[0.09] select-none lg:text-[28vw]"
        >
          5280
        </span>
        <div className="container-x relative grid items-center gap-12 pt-14 pb-24 sm:pt-20 sm:pb-32 lg:grid-cols-12 lg:gap-8">
          <div className="min-w-0 lg:col-span-7">
            <p className="t-mono fade-up flex items-center gap-3">
              <span aria-hidden="true" className="h-2 w-2 bg-navy-ink" />
              {eyebrow}
            </p>
            <h1
              className={`t-display fade-up mt-6 text-balance ${
                long ? "max-w-[16ch] text-[clamp(2.3rem,5.2vw,4.25rem)]" : "max-w-[12ch] text-[clamp(2.6rem,7vw,5.5rem)]"
              }`}
              style={{ animationDelay: "60ms" }}
            >
              {title}
            </h1>
            {lede ? (
              <p className="t-lede fade-up mt-7 max-w-xl text-pretty" style={{ animationDelay: "120ms" }}>
                {lede}
              </p>
            ) : null}
            {actions ? (
              <div className="fade-up mt-9 flex flex-wrap gap-3" style={{ animationDelay: "180ms" }}>
                {actions}
              </div>
            ) : null}
          </div>
          {visual ? (
            <div className="fade-up min-w-0 lg:col-span-5" style={{ animationDelay: "160ms" }}>
              {visual}
            </div>
          ) : null}
        </div>
        <Ridge line="stroke-navy-ink" fill={into === "navy" ? "fill-navy" : "fill-cream"} />
      </header>
    );
  }

  return (
    <header data-glow className="relative isolate overflow-hidden bg-navy text-cream">
      <Blueprint className="opacity-70" />
      {backdrop ? <Backdrop variant={backdrop} seed={seed} dark animate="load" /> : null}
      <div className="container-x relative z-10 pt-14 pb-20 sm:pt-20 sm:pb-28">
        <Eyebrow className="fade-up text-mist">{eyebrow}</Eyebrow>
        <h1 className="t-h1 fade-up mt-5 max-w-[18ch] text-balance" style={{ animationDelay: "60ms" }}>
          {title}
        </h1>
        {lede ? (
          <p className="t-lede fade-up mt-6 max-w-2xl text-pretty text-mist" style={{ animationDelay: "120ms" }}>
            {lede}
          </p>
        ) : null}
        {actions ? (
          <div className="fade-up mt-8 flex flex-wrap gap-3" style={{ animationDelay: "180ms" }}>
            {actions}
          </div>
        ) : null}
      </div>
      <Ridge line="stroke-orange" fill={into === "navy" ? "fill-navy" : "fill-cream"} />
    </header>
  );
}

function Ridge({ line, fill }: { line: string; fill: string }) {
  return (
    <svg
      viewBox="0 0 1600 60"
      preserveAspectRatio="none"
      aria-hidden="true"
      className="absolute inset-x-0 bottom-0 h-10 w-full sm:h-14"
    >
      <path
        d="M0 44 L120 30 L210 38 L330 18 L420 30 L520 12 L640 34 L760 22 L880 36 L1010 8 L1110 28 L1230 20 L1350 34 L1470 24 L1600 32 V60 H0 Z"
        className={fill}
      />
      <path
        d="M0 44 L120 30 L210 38 L330 18 L420 30 L520 12 L640 34 L760 22 L880 36 L1010 8 L1110 28 L1230 20 L1350 34 L1470 24 L1600 32"
        fill="none"
        className={line}
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
