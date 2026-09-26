import Link from "next/link";
import Button from "@/components/ui/Button";
import { flatFee, money, tiers, yearOne } from "@/data/pricing";

/** Homepage pricing at a glance. The full breakdown lives on /pricing. */
export default function PricingPreview() {
  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
      <div className="reveal lg:col-span-5">
        <p className="t-mono text-mist">Pricing</p>
        <h2 id="pricing-preview" className="t-h2 mt-5 text-balance">
          Clear prices. <span className="text-orange">No surprises.</span>
        </h2>
        <p className="t-lede mt-5 text-mist">
          A professional site built for a small setup fee, then one low monthly price. Or pay once and
          own it outright.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/pricing/">See full pricing</Button>
          <Button href="/pricing/#plan-finder" variant="outline-light">
            Help me choose
          </Button>
        </div>
      </div>

      <div className="reveal grid gap-3 lg:col-span-7">
        {tiers.map((tier) => (
          <Link
            key={tier.id}
            href={`/contact/?plan=${tier.id}`}
            className={`group grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-1 rounded-2xl px-6 py-5 transition-[background-color,translate] duration-300 hover:translate-x-1 sm:px-7 ${
              tier.highlight ? "bg-cream text-navy" : "bg-cream/[0.06] ring-1 ring-cream/10 hover:bg-cream/10"
            }`}
          >
            <span className="flex items-center gap-3">
              <span className="text-xl font-extrabold tracking-tight">{tier.name}</span>
              {tier.highlight ? (
                <span className="rounded-full bg-orange px-2.5 py-0.5 text-[0.7rem] font-bold uppercase tracking-wide text-navy">
                  {tier.highlight}
                </span>
              ) : null}
            </span>
            <span className="text-right">
              <span className="text-3xl font-extrabold tracking-tight">{money(tier.monthly)}</span>
              <span className={tier.highlight ? "text-stone" : "text-mist"}>/mo</span>
            </span>
            <span className={`text-sm ${tier.highlight ? "text-stone" : "text-mist"}`}>{tier.summary}</span>
            <span className={`text-right text-sm ${tier.highlight ? "text-stone" : "text-mist"}`}>
              + {money(tier.setupFee)} setup · {money(yearOne(tier))} year one
            </span>
          </Link>
        ))}
        <p className="px-2 pt-2 text-sm text-mist">
          Prefer to own it outright? Flat-fee builds from {money(flatFee.buildMin)}, plus{" "}
          {money(flatFee.hostingMin)}/mo hosting.
        </p>
      </div>
    </div>
  );
}
