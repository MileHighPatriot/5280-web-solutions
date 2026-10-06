"use client";

import { type FormEvent, type ReactNode, useEffect, useRef, useState } from "react";
import { Arrow } from "@/components/ui/Button";
import { flatFee, money, moneyRange, tiers } from "@/data/pricing";
import { site } from "@/data/site";

/**
 * Web3Forms delivers submissions to kohlton@5280webs.com. The key lives in
 * data/site.ts (NEXT_PUBLIC_WEB3FORMS_KEY overrides it). Without a key the form
 * falls back to opening the visitor's email app with everything filled in.
 */
const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || site.web3formsKey;

const planOptions = [
  ...tiers.map((tier) => ({
    value: tier.id,
    label: `${tier.name}: ${money(tier.monthly)}/mo + ${money(tier.setupFee)} setup`,
  })),
  { value: "flat-fee", label: `Flat-fee build: ${moneyRange(flatFee.buildMin, flatFee.buildMax)}` },
  { value: "not-sure", label: "Not sure yet, help me choose" },
];

type Variant = "contact" | "check";
type Status = "idle" | "sending" | "sent" | "error";

export default function LeadForm({ variant = "contact" }: { variant?: Variant }) {
  const [status, setStatus] = useState<Status>("idle");
  // Set when the visitor leaves both the phone and the email blank.
  const [noContact, setNoContact] = useState(false);
  const [plan, setPlan] = useState("not-sure");
  const formRef = useRef<HTMLFormElement>(null);
  const [blueprint, setBlueprint] = useState<{ industry: string; town: string; features: string[] } | null>(null);

  // Pricing buttons link here with ?plan=growth etc. Read it after hydration so the page stays static.
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- one-time sync from the URL */
    const params = new URLSearchParams(window.location.search);
    // The blueprint builder on /blueprint/ links here with the business name and the features they picked.
    const business = params.get("business")?.trim();
    const field = formRef.current?.elements.namedItem("business");
    if (business && field instanceof HTMLInputElement && !field.value) field.value = business.slice(0, 80);
    const features = params.get("blueprint")?.split("|").filter(Boolean).slice(0, 60);
    if (features?.length) {
      setBlueprint({ industry: params.get("industry") ?? "", town: params.get("town") ?? "", features });
    }
    const requested = params.get("plan");
    if (requested && planOptions.some((option) => option.value === requested)) {
      setPlan(requested);
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const isCheck = variant === "check";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    // A phone number or an email is enough; with neither there's no way to reply.
    if (!data.phone?.trim() && !data.email?.trim()) {
      setNoContact(true);
      const phoneField = form.elements.namedItem("phone");
      if (phoneField instanceof HTMLInputElement) phoneField.focus();
      return;
    }
    setNoContact(false);
    const planLabel = planOptions.find((option) => option.value === data.plan)?.label;
    const subject = isCheck
      ? `Free website check: ${data.business}`
      : `New inquiry: ${data.business || data.name}${planLabel ? ` (${planLabel})` : ""}`;

    if (!accessKey) {
      const body = [
        `Name: ${data.name}`,
        `Business: ${data.business || "Not given"}`,
        `Phone: ${data.phone || "Not given"}`,
        `Email: ${data.email || "Not given"}`,
        isCheck ? `Current website: ${data.website || "None yet"}` : `Plan: ${planLabel}`,
        ...(data.blueprint ? [`Blueprint: ${data.blueprint}`] : []),
        "",
        data.message,
      ].join("\n");
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus("sent");
      return;
    }

    setStatus("sending");
    try {
      // Plain form data keeps this a "simple" request, so the browser skips the CORS preflight.
      const body = new FormData();
      for (const [key, value] of Object.entries(data)) {
        // Web3Forms treats "email" as the reply-to address, so a blank one is left out.
        if (key === "email" && !value.trim()) continue;
        body.append(key, value);
      }
      body.set("plan", planLabel ?? data.plan ?? "");
      body.append("access_key", accessKey);
      body.append("subject", subject);
      body.append("from_name", site.name);
      const response = await fetch("https://api.web3forms.com/submit", { method: "POST", body });
      const result = (await response.json()) as { success?: boolean };
      if (!result.success) throw new Error("Submission failed");
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="rounded-2xl bg-navy p-8 text-cream sm:p-10">
        <p className="t-mono text-ember">{isCheck ? "Request received" : "Message received"}</p>
        <p className="t-h2 mt-4">Thanks, talk soon.</p>
        <p className="t-lede mt-4 text-mist">
          {accessKey
            ? isCheck
              ? `Thanks. I'll put your report together and email it to you, then we'll set up a quick 15-20 minute call to go over it. Questions before then? Call or text ${site.phoneDisplay}.`
              : `We'll get back to you within ${site.replyTime}. Need us sooner? Call or text ${site.phoneDisplay}.`
            : "Your email app should have opened with everything filled in. Just hit send."}
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 text-sm font-semibold text-cream underline underline-offset-4"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="grid gap-5 rounded-2xl bg-paper p-6 ring-1 ring-navy/10 sm:p-8">
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

      {blueprint ? (
        <div className="rounded-xl bg-navy p-5 text-cream">
          <p className="t-mono text-orange-soft">Your blueprint is attached</p>
          <p className="mt-2 font-bold">
            {[blueprint.industry && `A ${blueprint.industry} site`, blueprint.town].filter(Boolean).join(" in ")} ·{" "}
            {blueprint.features.length} features
          </p>
          <ul className="mt-3 flex flex-wrap gap-1.5 text-sm">
            {blueprint.features.map((feature) => (
              <li key={feature} className="rounded-full px-2.5 py-1 ring-1 ring-cream/25">
                {feature}
              </li>
            ))}
          </ul>
          <input
            type="hidden"
            name="blueprint"
            value={`${blueprint.industry}${blueprint.town ? `, ${blueprint.town}` : ""}: ${blueprint.features.join(", ")}`}
          />
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" name="name" autoComplete="name" required />
        <Field label="Business name" name="business" autoComplete="organization" required={isCheck} optional={!isCheck} />
        <Field
          label="Best number to reach you"
          name="phone"
          type="tel"
          autoComplete="tel"
          hint="I'll call or text you back within one business day."
        />
        <Field label="Email (optional if you gave a phone number)" name="email" type="email" autoComplete="email" />
      </div>

      {noContact ? (
        <p role="alert" className="-mt-1 rounded-lg bg-ember/10 px-4 py-3 text-sm text-ember">
          Add a phone number or an email so I can reach you.
        </p>
      ) : null}

      {isCheck ? (
        <Field
          label="Current website"
          name="website"
          type="text"
          inputMode="url"
          placeholder="yourbusiness.com (leave blank if you don't have one)"
          optional
        />
      ) : (
        <label className="block">
          <span className="text-sm font-semibold">Which option are you interested in?</span>
          <select
            name="plan"
            value={plan}
            onChange={(event) => setPlan(event.target.value)}
            className={`${inputClass} cursor-pointer`}
          >
            {planOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      )}

      <Field
        label={isCheck ? "What's not working, or what do you want from your website?" : "Tell us about your business"}
        name="message"
        as="textarea"
        placeholder={
          isCheck
            ? "e.g. It looks dated, it's hard to use on phones, customers can't find us on Google…"
            : "What you do, where you work, and what you'd like your website to do."
        }
        required
      />

      <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-orange px-7 py-4 font-bold text-navy transition-colors hover:bg-orange-soft disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : isCheck ? "Get my free report" : "Send message"}
          <Arrow className="transition-transform duration-300 group-hover:translate-x-0.5" />
        </button>
        <p className="text-sm text-stone">
          {isCheck ? "No cost, no spam." : `Reply within ${site.replyTime}. No spam, ever.`}
        </p>
      </div>

      {status === "error" ? (
        <p role="alert" className="rounded-lg bg-ember/10 px-4 py-3 text-sm text-ember">
          Something went wrong sending your message. Please try again, or call or text{" "}
          <a href={site.phoneHref} className="font-semibold underline">
            {site.phoneDisplay}
          </a>
          .
        </p>
      ) : null}
    </form>
  );
}

const inputClass =
  "mt-2 block w-full rounded-xl border-0 bg-cream px-4 py-3.5 text-base text-navy ring-1 ring-navy/15 placeholder:text-stone/70 transition-shadow focus:ring-2 focus:ring-orange focus:outline-none";

function Field({
  label,
  name,
  type = "text",
  as = "input",
  required,
  optional,
  autoComplete,
  placeholder,
  inputMode,
  hint,
}: {
  label: string;
  name: string;
  type?: string;
  as?: "input" | "textarea";
  required?: boolean;
  optional?: boolean;
  autoComplete?: string;
  placeholder?: string;
  inputMode?: "url" | "text" | "tel" | "email";
  /** Small helper line under the label. */
  hint?: string;
  children?: ReactNode;
}) {
  return (
    // The input sits at the bottom of its cell, so two fields in a row line up even when one label wraps.
    <label className="flex h-full flex-col">
      <span className="text-sm font-semibold">
        {label}
        {optional ? <span className="ml-1.5 font-normal text-stone">(optional)</span> : null}
      </span>
      {hint ? <span className="mt-1 text-sm text-stone">{hint}</span> : null}
      <span className="mt-auto block">
        {as === "textarea" ? (
          <textarea name={name} required={required} rows={5} placeholder={placeholder} className={`${inputClass} resize-y`} />
        ) : (
          <input
            name={name}
            type={type}
            required={required}
            autoComplete={autoComplete}
            placeholder={placeholder}
            inputMode={inputMode}
            className={inputClass}
          />
        )}
      </span>
    </label>
  );
}
