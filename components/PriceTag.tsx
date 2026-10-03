import { money, tiers, yearOne } from "@/data/pricing";

/** The most popular plan as a tilted price card for the orange Pricing header. */
export default function PriceTag() {
  const tier = tiers.find((t) => t.highlight) ?? tiers[1];
  const highlights = [tier.features[0], tier.features[1], tier.features[3]].filter(Boolean);

  return (
    <div
      aria-hidden="true"
      className="relative mx-auto w-[min(24rem,88%)] -rotate-[3deg] rounded-[1.75rem] bg-navy p-7 text-cream shadow-[0_50px_90px_-30px_rgba(0,24,51,0.75)] ring-1 ring-white/15 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:rotate-0 sm:p-9"
    >
      <div className="flex items-center justify-between gap-4">
        <span className="t-mono whitespace-nowrap text-mist">{tier.name} plan</span>
        {tier.highlight ? (
          <span className="whitespace-nowrap rounded-full bg-orange px-3 py-1 text-xs font-bold tracking-wide text-navy uppercase">
            {tier.highlight}
          </span>
        ) : null}
      </div>
      <p className="t-display mt-7 whitespace-nowrap text-[clamp(3.25rem,6.5vw,5rem)] leading-[0.85]">
        {money(tier.monthly)}
        <span className="ml-1 font-sans text-xl font-semibold tracking-normal text-mist">/mo</span>
      </p>
      <p className="mt-4 font-mono text-sm text-mist">
        + {money(tier.setupFee)} setup · {money(yearOne(tier))} full first year
      </p>
      <div className="my-6 h-px bg-cream/15" />
      <ul className="grid gap-3 text-[0.95rem]">
        {highlights.map((feature) => (
          <li key={feature} className="flex gap-3">
            <span className="mt-2 h-2 w-2 shrink-0 bg-orange" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}
