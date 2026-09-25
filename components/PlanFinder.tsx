"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { Arrow, Check } from "@/components/ui/Button";
import { editPrice, flatFee, money, tiers, type TierId } from "@/data/pricing";

type Choice<T extends string> = { value: T; label: string; hint: string };

const updateOptions: Choice<"rarely" | "monthly" | "weekly">[] = [
  { value: "rarely", label: "Rarely", hint: "Info stays the same most of the year" },
  { value: "monthly", label: "A couple times a month", hint: "Hours, photos, specials, menu items" },
  { value: "weekly", label: "Every week or more", hint: "Promos, events, new work to show off" },
];

const helpOptions: Choice<"online" | "reports" | "handsOn">[] = [
  { value: "online", label: "Just keep it online", hint: "Hosting, security, and updates" },
  { value: "reports", label: "Updates + a traffic report", hint: "See how many people find you each month" },
  { value: "handsOn", label: "Hands-on help", hint: "Monthly call, content, same-day changes" },
];

const payOptions: Choice<"monthly" | "once">[] = [
  { value: "monthly", label: "Small setup fee, then monthly", hint: "Lower upfront cost, everything handled" },
  { value: "once", label: "Pay once, own it outright", hint: "Bigger upfront cost, lower monthly" },
];

/** Estimated small edits per month for each answer, used to price à la carte changes. */
const editsPerMonth = { rarely: 0, monthly: 2, weekly: 6 };

export default function PlanFinder() {
  const [updates, setUpdates] = useState<(typeof updateOptions)[number]["value"]>("monthly");
  const [help, setHelp] = useState<(typeof helpOptions)[number]["value"]>("online");
  const [pay, setPay] = useState<(typeof payOptions)[number]["value"]>("monthly");

  const score = Math.max(
    updateOptions.findIndex((option) => option.value === updates),
    helpOptions.findIndex((option) => option.value === help),
  );
  const tier = tiers[score];
  const recommendFlat = pay === "once";

  // Year totals, using the starting prices from data/pricing.ts.
  const edits = editsPerMonth[updates];
  const flatMonthly = flatFee.hostingMin + edits * editPrice.min;
  const flatYears = [1, 2].map((years) => flatFee.buildMin + flatMonthly * 12 * years);
  const tierYears = [1, 2].map((years) => tier.setupFee + tier.monthly * 12 * years);
  const max = Math.max(...flatYears, ...tierYears);
  const flatCheaperLater = flatYears[1] < tierYears[1];

  const reasons = recommendFlat
    ? [
        "You own the site outright from day one",
        `Hosting from ${money(flatFee.hostingMin)}/mo after launch`,
        edits > 0
          ? `Changes are billed as you go, about ${money(edits * editPrice.min)}/mo at your pace`
          : "No monthly edits needed at your pace",
      ]
    : [
        `${money(tier.setupFee)} setup, then ${money(tier.monthly)}/mo. Build included`,
        ...tier.features.filter((feature) => !feature.startsWith("No ")).slice(0, 2),
      ];

  const planId: TierId | "flat-fee" = recommendFlat ? "flat-fee" : tier.id;
  const planName = recommendFlat ? "Flat-fee build" : `${tier.name} plan`;

  return (
    <div className="grid gap-8 overflow-hidden rounded-[1.75rem] bg-navy p-5 text-cream sm:p-8 lg:grid-cols-[1.1fr_1fr] lg:gap-10 lg:p-10">
      <div className="grid content-start gap-7">
        <Question legend="1. How often will your site need changes?" options={updateOptions} value={updates} onChange={setUpdates} />
        <Question legend="2. How much help do you want?" options={helpOptions} value={help} onChange={setHelp} />
        <Question legend="3. How would you rather pay?" options={payOptions} value={pay} onChange={setPay} />
      </div>

      <div aria-live="polite" className="flex flex-col rounded-2xl bg-cream p-6 text-navy sm:p-8">
        <p className="t-mono text-stone">Your best fit</p>
        <p className="mt-2 text-4xl font-extrabold tracking-tight">{planName}</p>
        <ul className="mt-5 grid gap-2.5">
          {reasons.map((reason) => (
            <li key={reason} className="flex gap-2.5">
              <Check className="mt-0.5 text-ember" />
              {reason}
            </li>
          ))}
        </ul>

        <div className="mt-7 border-t border-navy/10 pt-6">
          <p className="text-sm font-bold">Estimated total cost</p>
          <div className="mt-4 grid gap-4">
            {[0, 1].map((index) => (
              <div key={index}>
                <p className="t-mono text-stone">{index === 0 ? "First year" : "After two years"}</p>
                <Bar
                  label={`${tier.name} monthly`}
                  value={tierYears[index]}
                  max={max}
                  highlight={!recommendFlat}
                />
                <Bar label="Flat-fee build" value={flatYears[index]} max={max} highlight={recommendFlat} />
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs leading-relaxed text-stone">
            Estimated with starting prices
            {edits > 0 ? ` and about ${edits} small edits a month on the flat-fee plan` : ""}.{" "}
            {recommendFlat && edits > 0 && !flatCheaperLater
              ? `At your pace, the ${tier.name} plan could cost less over time, since edits are included.`
              : null}
          </p>
        </div>

        <Link
          href={`/contact/?plan=${planId}`}
          className="group mt-7 inline-flex items-center justify-center gap-2.5 rounded-full bg-orange px-6 py-4 font-bold text-navy transition-colors hover:bg-orange-soft"
        >
          Get started with {recommendFlat ? "a flat-fee build" : tier.name}
          <Arrow className="transition-transform duration-300 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}

function Question<T extends string>({
  legend,
  options,
  value,
  onChange,
}: {
  legend: string;
  options: Choice<T>[];
  value: T;
  onChange: (value: T) => void;
}) {
  const name = useId();
  return (
    <fieldset>
      <legend className="text-lg font-bold">{legend}</legend>
      <div className={`mt-3 grid gap-2 ${options.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
        {options.map((option) => (
          <label key={option.value} className="cursor-pointer">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="peer sr-only"
            />
            <span className="block h-full rounded-xl border-2 border-cream/15 p-3.5 transition-colors peer-checked:border-orange peer-checked:bg-orange/10 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-orange hover:border-cream/40">
              <span className="block font-semibold">{option.label}</span>
              <span className="mt-1 block text-sm text-mist">{option.hint}</span>
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function Bar({ label, value, max, highlight }: { label: string; value: number; max: number; highlight: boolean }) {
  return (
    <div className="mt-2 grid grid-cols-[7.5rem_1fr] items-center gap-3 text-sm sm:grid-cols-[8.5rem_1fr]">
      <span className={highlight ? "font-bold" : "text-stone"}>{label}</span>
      <span className="flex items-center gap-2">
        <span
          className={`h-2.5 rounded-full transition-[width] duration-500 ${highlight ? "bg-orange" : "bg-navy/20"}`}
          style={{ width: `${Math.max(6, (value / max) * 78)}%` }}
        />
        <span className={highlight ? "font-bold" : "text-stone"}>{money(value)}</span>
      </span>
    </div>
  );
}
