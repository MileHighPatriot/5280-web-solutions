import type { ReactNode } from "react";
import Backdrop, { type BackdropVariant } from "@/components/ui/Backdrop";
import { Eyebrow } from "@/components/ui/Section";

/** Navy page intro that continues the header, with a thin orange ridge underneath. */
export default function PageHeader({
  eyebrow,
  title,
  lede,
  actions,
  backdrop,
  seed,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  actions?: ReactNode;
  /** Faint art for the empty right side of the header. */
  backdrop?: BackdropVariant;
  seed?: number;
}) {
  return (
    <header className="relative isolate overflow-hidden bg-navy text-cream">
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
      <svg
        viewBox="0 0 1600 60"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-10 w-full sm:h-14"
      >
        <path
          d="M0 44 L120 30 L210 38 L330 18 L420 30 L520 12 L640 34 L760 22 L880 36 L1010 8 L1110 28 L1230 20 L1350 34 L1470 24 L1600 32 V60 H0 Z"
          fill="#f4efe6"
        />
        <path
          d="M0 44 L120 30 L210 38 L330 18 L420 30 L520 12 L640 34 L760 22 L880 36 L1010 8 L1110 28 L1230 20 L1350 34 L1470 24 L1600 32"
          fill="none"
          stroke="#e07a3f"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </header>
  );
}
