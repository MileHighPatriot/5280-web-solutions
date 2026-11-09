import { industries } from "@/data/industries";
import { site } from "@/data/site";

/**
 * Two slow lines of text moving in opposite directions: who we build for, and where.
 * Pure CSS (see "Ticker" in globals.css). Each list is rendered twice so the loop has no seam,
 * and the whole strip is decorative: the same industries and cities are listed as real links
 * and text elsewhere on the page.
 */
function Row({
  items,
  reverse = false,
  className,
}: {
  items: string[];
  reverse?: boolean;
  className: string;
}) {
  return (
    <div className="ticker overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
      <ul
        className={`ticker-track flex w-max ${reverse ? "ticker-reverse" : ""} ${className}`}
      >
        {[...items, ...items].map((item, i) => (
          <li
            key={i}
            className="flex items-center gap-7 pr-7 whitespace-nowrap"
          >
            {item}
            <span className="h-1 w-1 rounded-full bg-orange" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Ticker() {
  return (
    <div
      aria-hidden="true"
      className="grid gap-3 border-y border-cream/10 bg-navy-ink py-5 select-none"
    >
      <Row
        items={industries.map((industry) => industry.label)}
        className="t-h3 text-cream/85"
      />
      <Row
        items={site.cities}
        reverse
        className="font-mono text-xs tracking-[0.2em] text-mist uppercase"
      />
    </div>
  );
}
