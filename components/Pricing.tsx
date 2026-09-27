import Link from "next/link";
import { Arrow, Check, Dash } from "@/components/ui/Button";
import {
  alternativeColumns,
  alternatives,
  comparison,
  everyBuild,
  addOnPrice,
  editPrice,
  extraPagePrice,
  flatFee,
  launchOffer,
  money,
  moneyRange,
  monthlyTerms,
  tiers,
  yearOne,
  type Tier,
} from "@/data/pricing";

/**
 * The two ways to work together, kept visually separate: the recommended
 * monthly plans first, then the flat-fee build as a lighter alternative.
 * Pure markup, no client JavaScript.
 */
export default function Pricing({
  headingLevel = "h2",
  intro = true,
}: {
  headingLevel?: "h1" | "h2";
  /** Off when the page header already introduces the two options (the Pricing page). */
  intro?: boolean;
}) {
  const Heading = headingLevel;
  // Everything below steps down one level from the page heading, so the outline never skips a level.
  const Sub = headingLevel === "h1" ? "h2" : "h3";
  const tierHeading = headingLevel === "h1" ? "h3" : "h4";

  return (
    <div>
      {intro ? (
        <div className="mx-auto max-w-3xl text-center">
          <p className="t-mono text-stone">Simple, upfront pricing</p>
          <Heading
            className={`${headingLevel === "h1" ? "t-h1" : "t-h2"} mt-4 text-balance`}
          >
            Two ways to work with us
          </Heading>
          <p className="t-lede mt-5 text-pretty text-stone">
            Spread the cost with a monthly plan, or pay once and own your site
            outright. Either way you get a custom site built by a real person on
            the Front Range.
          </p>
          <nav
            aria-label="Pricing options"
            className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"
          >
            <a
              href="#monthly"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-navy px-5 py-3 text-sm font-bold text-cream"
            >
              <span className="rounded-full bg-orange px-2 py-0.5 text-[0.7rem] font-bold uppercase tracking-wide text-navy">
                Recommended
              </span>
              Monthly plans
            </a>
            <a
              href="#flat-fee"
              className="inline-flex items-center justify-center rounded-full border-2 border-navy/15 px-5 py-3 text-sm font-bold transition-colors hover:border-navy"
            >
              One-time flat-fee build
            </a>
          </nav>
          <p className="mt-5 text-sm text-stone">
            Not sure which fits?{" "}
            <Link
              href="/pricing/#plan-finder"
              className="font-bold text-ember underline underline-offset-4"
            >
              Try the 30-second plan finder
            </Link>
          </p>
        </div>
      ) : null}

      {/* Path 1: monthly plans */}
      <section
        id="monthly"
        aria-labelledby="monthly-title"
        className={intro ? "mt-14 sm:mt-20" : undefined}
      >
        <div className="rounded-[1.75rem] bg-sand/70 p-4 ring-1 ring-navy/10 sm:p-6 lg:p-10">
          <div className="flex flex-col gap-6 px-2 pt-2 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="flex flex-wrap items-center gap-3">
                <span className="t-mono text-stone">
                  Option 1 · Monthly plan
                </span>
                <span className="rounded-full bg-orange px-3 py-1 text-xs font-bold uppercase tracking-wide text-navy">
                  Recommended
                </span>
              </div>
              <Sub
                id="monthly-title"
                className="mt-4 text-[clamp(1.6rem,3vw,2.35rem)] font-extrabold leading-tight tracking-tight text-balance"
              >
                No big upfront cost. Get a professional site built for a small
                setup fee.
              </Sub>
            </div>
            <ul className="grid shrink-0 gap-2 text-[0.95rem] text-stone lg:text-right">
              <li>
                <strong className="text-navy">
                  {monthlyTerms.minimumMonths}-month minimum
                </strong>
                , then month-to-month
              </li>
              <li>Buy your site outright any time</li>
            </ul>
          </div>

          <p className="mx-2 mt-6 rounded-xl bg-navy px-5 py-4 text-[0.95rem] text-cream">
            <strong className="text-orange">{launchOffer.label}:</strong> new
            clients go month-to-month from day one, with no{" "}
            {monthlyTerms.minimumMonths}-month minimum. Leave in the first year
            and you can keep your site with a buyout, which gets smaller every
            month you stay.
          </p>

          <div className="mt-8 grid gap-4 lg:grid-cols-3 lg:gap-5">
            {tiers.map((tier) => (
              <TierCard key={tier.id} tier={tier} heading={tierHeading} />
            ))}
          </div>

          <p className="mt-5 px-2 text-center text-sm text-stone">
            The setup fee is a one-time payment made upfront, separate from your
            monthly price. Prices shown are starting rates for the page count on
            each plan. Need more? Extra pages are {addOnPrice(extraPagePrice)}.
          </p>
        </div>
      </section>

      {/* Every build includes */}
      <section
        aria-labelledby="every-build"
        className="mx-auto mt-14 max-w-5xl sm:mt-16"
      >
        <Sub id="every-build" className="t-mono text-center text-stone">
          Included with every website, either way
        </Sub>
        <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
          {everyBuild.map((item) => (
            <li key={item} className="flex gap-2.5 text-[0.975rem]">
              <Check className="mt-0.5 text-ember" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Path 2: flat-fee build */}
      <section
        id="flat-fee"
        aria-labelledby="flat-fee-title"
        className="mx-auto mt-14 max-w-5xl sm:mt-16"
      >
        <div className="rounded-[1.5rem] border-2 border-dashed border-navy/20 bg-paper p-6 sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
            <div>
              <span className="t-mono text-stone">
                Option 2 · Flat-fee build
              </span>
              <Sub id="flat-fee-title" className="t-h3 mt-3 text-balance">
                Prefer to pay once and own it outright?
              </Sub>
              <p className="mt-5 flex flex-wrap items-baseline gap-x-2">
                <span className="text-4xl font-extrabold tracking-tight">
                  {moneyRange(flatFee.buildMin, flatFee.buildMax)}
                </span>
                <span className="text-stone">one-time build</span>
              </p>
              <p className="mt-2 text-[0.95rem] text-stone">
                then{" "}
                <strong className="text-navy">
                  {moneyRange(flatFee.hostingMin, flatFee.hostingMax)}/mo
                </strong>{" "}
                hosting after launch
              </p>
              <Link
                href="/contact/?plan=flat-fee"
                className="group mt-7 inline-flex w-full items-center justify-center gap-2.5 rounded-full border-2 border-navy px-6 py-3.5 font-bold transition-colors hover:bg-navy hover:text-cream sm:w-auto"
              >
                Request a quote
                <Arrow className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </div>
            <div>
              <ul className="grid gap-3">
                {flatFee.features.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <Check className="mt-0.5 text-ember" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-5 rounded-xl bg-sand/70 px-4 py-3 text-sm text-stone">
                Hosting on the flat-fee plan doesn&rsquo;t include edits.
                Changes are billed à la carte at {addOnPrice(editPrice)}.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/** Feature rows shown on a plan card before the rest fold under "more features". */
const visibleFeatures = 5;

type Row = { text: string; bold?: boolean; excluded?: boolean };

function FeatureRow({ row, featured }: { row: Row; featured: boolean }) {
  return (
    <li
      className={`flex gap-2.5 ${row.bold ? "font-bold" : ""} ${row.excluded ? (featured ? "text-mist" : "text-stone") : ""}`}
    >
      {row.excluded ? (
        <Dash className="opacity-70" />
      ) : (
        <Check className={featured ? "text-orange" : "text-ember"} />
      )}
      {row.text}
    </li>
  );
}

function TierCard({
  tier,
  heading: TierHeading,
}: {
  tier: Tier;
  heading: "h3" | "h4";
}) {
  const featured = Boolean(tier.highlight);
  const rows: Row[] = [
    ...(tier.includesPrevious
      ? [{ text: tier.includesPrevious, bold: true }]
      : []),
    ...tier.features.map((feature) => ({
      text: feature,
      excluded: feature.startsWith("No "),
    })),
  ];
  // Collapse only when it hides at least two rows; hiding a single line isn't worth a click.
  const shown =
    rows.length - visibleFeatures >= 2 ? visibleFeatures : rows.length;

  return (
    <article
      aria-labelledby={`tier-${tier.id}`}
      className={`relative flex flex-col rounded-2xl p-6 transition-[translate,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/15 sm:p-7 ${
        featured
          ? "bg-navy text-cream shadow-xl shadow-navy/20 ring-2 ring-orange"
          : "bg-paper ring-1 ring-navy/10"
      }`}
    >
      {tier.highlight ? (
        <p className="absolute -top-3 left-6 rounded-full bg-orange px-3 py-1 text-xs font-bold uppercase tracking-wide text-navy">
          {tier.highlight}
        </p>
      ) : null}

      <TierHeading
        id={`tier-${tier.id}`}
        className="text-xl font-extrabold tracking-tight"
      >
        {tier.name}
      </TierHeading>
      <p
        className={`mt-2 text-[0.95rem] leading-snug lg:min-h-[4.1rem] ${featured ? "text-mist" : "text-stone"}`}
      >
        {tier.summary}
      </p>

      <p className="mt-6 flex items-baseline gap-1">
        <span className="text-5xl font-extrabold tracking-tight">
          {money(tier.monthly)}
        </span>
        <span className={featured ? "text-mist" : "text-stone"}>/month</span>
      </p>

      {/* Setup fee on its own line so it's never mistaken for part of the monthly price. */}
      <p
        className={`mt-4 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 rounded-xl px-4 py-3 ${
          featured ? "bg-navy-3 text-cream" : "bg-sand/70 text-navy"
        }`}
      >
        <span className="font-bold">+ {money(tier.setupFee)} setup fee</span>
        <span
          className={`text-xs font-semibold ${featured ? "text-orange-soft" : "text-ember"}`}
        >
          One-time, paid upfront
        </span>
      </p>
      <p
        className={`mt-2 px-1 text-sm ${featured ? "text-mist" : "text-stone"}`}
      >
        Year one:{" "}
        <strong className={featured ? "text-cream" : "text-navy"}>
          {money(yearOne(tier))}
        </strong>{" "}
        total
        <span className="block text-xs">
          {money(tier.setupFee)} setup + {monthlyTerms.minimumMonths} ×{" "}
          {money(tier.monthly)}/month
        </span>
      </p>

      <div className="mt-6 flex-1 text-[0.95rem]">
        <ul className="grid gap-3">
          {rows.slice(0, shown).map((row) => (
            <FeatureRow key={row.text} row={row} featured={featured} />
          ))}
        </ul>
        {shown < rows.length ? (
          // Flex column + order-last puts "Show fewer" under the extra rows where browsers allow styling <details>.
          <details className="group mt-3 flex flex-col">
            <summary
              className={`order-last inline-flex cursor-pointer items-center gap-2 self-start rounded-full py-1 text-sm font-bold group-open:mt-3 ${featured ? "text-orange" : "text-ember"}`}
            >
              <span className="group-open:hidden">
                + {rows.length - shown} more features
              </span>
              <span className="hidden group-open:inline">Show fewer</span>
            </summary>
            <ul className="grid gap-3">
              {rows.slice(shown).map((row) => (
                <FeatureRow key={row.text} row={row} featured={featured} />
              ))}
            </ul>
          </details>
        ) : null}
      </div>

      <Link
        href={`/contact/?plan=${tier.id}`}
        aria-label={`Get started with the ${tier.name} plan`}
        className={`group mt-8 inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3.5 font-bold transition-colors ${
          featured
            ? "bg-orange text-navy hover:bg-orange-soft"
            : "bg-navy text-cream hover:bg-navy-3"
        }`}
      >
        Get started
        <Arrow className="transition-transform duration-300 group-hover:translate-x-0.5" />
      </Link>
    </article>
  );
}

/** Side-by-side monthly plan comparison: a table on wide screens, stacked rows on phones. */
export function ComparisonTable() {
  return (
    <>
      <div className="overflow-hidden rounded-2xl bg-paper ring-1 ring-navy/10 max-md:hidden">
        <table className="w-full border-collapse text-left text-[0.95rem]">
          <caption className="sr-only">Monthly plan comparison</caption>
          <thead>
            <tr className="border-b border-navy/10">
              <th
                scope="col"
                className="p-5 font-mono text-xs font-medium uppercase tracking-widest text-stone"
              >
                Monthly plans
              </th>
              {tiers.map((tier) => (
                <th
                  key={tier.id}
                  scope="col"
                  className={`p-5 text-center ${tier.highlight ? "bg-navy text-cream" : ""}`}
                >
                  <span className="block text-lg font-extrabold">
                    {tier.name}
                  </span>
                  <span
                    className={`block text-sm font-normal ${tier.highlight ? "text-mist" : "text-stone"}`}
                  >
                    {money(tier.monthly)}/mo + {money(tier.setupFee)} setup
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparison.map((row) => (
              <tr
                key={row.label}
                className="border-b border-navy/10 last:border-0"
              >
                <th scope="row" className="px-5 py-4 font-medium">
                  {row.label}
                </th>
                {tiers.map((tier) => (
                  <td
                    key={tier.id}
                    className={`px-5 py-4 text-center ${tier.highlight ? "bg-navy/[0.04] font-semibold" : ""}`}
                  >
                    <CellValue value={row.values[tier.id]} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* On phones the stacked rows run long and repeat the plan cards, so they start folded. */}
      <details className="group md:hidden">
        <summary className="flex cursor-pointer items-center justify-between gap-4 rounded-xl bg-paper px-5 py-4 font-bold ring-1 ring-navy/10">
          <span className="group-open:hidden">
            Show all {comparison.length} rows
          </span>
          <span className="hidden group-open:inline">Hide the comparison</span>
          <span
            aria-hidden="true"
            className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-navy/15 transition-colors group-open:border-orange group-open:bg-orange"
          >
            <span className="absolute h-0.5 w-3 rounded bg-current" />
            <span className="faq-icon-v absolute h-3 w-0.5 rounded bg-current transition-transform duration-300" />
          </span>
        </summary>
        <div className="mt-3 grid gap-3">
          <div className="sticky top-16 z-10 grid grid-cols-3 gap-2 rounded-xl bg-navy p-3 text-center text-cream">
            {tiers.map((tier) => (
              <p key={tier.id}>
                <span className="block font-extrabold">{tier.name}</span>
                <span className="block text-xs text-mist">
                  {money(tier.monthly)}/mo
                </span>
              </p>
            ))}
          </div>
          {comparison.map((row) => (
            <div
              key={row.label}
              className="rounded-xl bg-paper p-4 ring-1 ring-navy/10"
            >
              <p className="text-sm font-bold">{row.label}</p>
              <dl className="mt-3 grid grid-cols-3 gap-2 text-center text-sm">
                {tiers.map((tier) => (
                  <div key={tier.id}>
                    <dt className="sr-only">{tier.name}</dt>
                    <dd>
                      <CellValue value={row.values[tier.id]} />
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </details>
    </>
  );
}

/** A Growth plan next to doing it yourself and hiring a Denver agency (see `alternatives`). */
export function AlternativesTable() {
  return (
    <>
      <div className="overflow-hidden rounded-2xl bg-paper ring-1 ring-navy/10 max-md:hidden">
        <table className="w-full table-fixed border-collapse text-left text-[0.95rem]">
          <caption className="sr-only">
            Our Growth plan compared with doing it yourself and hiring an agency
          </caption>
          <thead>
            <tr className="border-b border-navy/10">
              <th
                scope="col"
                className="w-[26%] p-5 font-mono text-xs font-medium uppercase tracking-widest text-stone"
              >
                Your options
              </th>
              {alternativeColumns.map((column) => (
                <th
                  key={column.id}
                  scope="col"
                  className={`p-5 text-center ${column.id === "us" ? "bg-navy text-cream" : ""}`}
                >
                  <span className="block text-lg font-extrabold">
                    {column.name}
                  </span>
                  <span
                    className={`block text-sm font-normal ${column.id === "us" ? "text-mist" : "text-stone"}`}
                  >
                    {column.detail}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {alternatives.map((row) => (
              <tr
                key={row.label}
                className="border-b border-navy/10 last:border-0"
              >
                <th scope="row" className="px-5 py-4 font-medium">
                  {row.label}
                </th>
                {alternativeColumns.map((column) => (
                  <td
                    key={column.id}
                    className={`px-5 py-4 text-center ${column.id === "us" ? "bg-navy/[0.04] font-semibold" : "text-stone"}`}
                  >
                    <CellValue value={row.values[column.id]} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-3 md:hidden">
        {alternatives.map((row) => (
          <div
            key={row.label}
            className="rounded-xl bg-paper p-4 ring-1 ring-navy/10"
          >
            <p className="text-sm font-bold">{row.label}</p>
            <dl className="mt-3 grid gap-2 text-sm">
              {alternativeColumns.map((column) => (
                <div
                  key={column.id}
                  className={`flex items-center justify-between gap-4 rounded-lg px-3 py-2 ${column.id === "us" ? "bg-navy text-cream" : "bg-sand/50"}`}
                >
                  <dt
                    className={`shrink-0 whitespace-nowrap ${column.id === "us" ? "font-bold" : "text-stone"}`}
                  >
                    {column.name}
                  </dt>
                  <dd className="text-right">
                    <CellValue value={row.values[column.id]} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </>
  );
}

function CellValue({ value }: { value: boolean | string }) {
  if (value === true) {
    return (
      <>
        <Check className="mx-auto text-ember" />
        <span className="sr-only">Included</span>
      </>
    );
  }
  if (value === false) {
    return (
      <>
        <Dash className="mx-auto text-stone/60" />
        <span className="sr-only">Not included</span>
      </>
    );
  }
  return <>{value}</>;
}
