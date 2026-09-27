import { industries, industryGroups } from "@/data/industries";

/** Industry count and the six groups as a tilted card for the orange Industries header. */
export default function IndustryCount() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto w-[min(24rem,88%)] rotate-[3deg] rounded-[1.75rem] bg-navy p-7 text-cream shadow-[0_50px_90px_-30px_rgba(0,24,51,0.75)] ring-1 ring-white/15 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:rotate-0 sm:p-9"
    >
      <p className="t-mono text-mist">Industries we build for</p>
      <p className="t-display mt-6 text-[clamp(6rem,12vw,9rem)] leading-[0.8] text-orange">{industries.length}</p>
      <ul className="mt-8 grid gap-2.5 border-t border-cream/15 pt-6 font-mono text-sm">
        {industryGroups.map((group, index) => (
          <li key={group.title} className="flex gap-3">
            <span className="text-orange">0{index + 1}</span>
            {group.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
