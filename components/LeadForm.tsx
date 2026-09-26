"use client";

import { type FormEvent, type ReactNode, useEffect, useState } from "react";
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
  const [plan, setPlan] = useState("not-sure");

  // Pricing buttons link here with ?plan=growth etc. Read it after hydration so the page stays static.
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("plan");
    if (requested && planOptions.some((option) => option.value === requested)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync from the URL
      setPlan(requested);
    }
  }, []);

  const isCheck = variant === "check";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const planLabel = planOptions.find((option) => option.value === data.plan)?.label;
    const subject = isCheck
      ? `Free website check: ${data.business}`
      : `New inquiry: ${data.business || data.name}${planLabel ? ` (${planLabel})` : ""}`;

    if (!accessKey) {
      const body = [
        `Name: ${data.name}`,
        `Business: ${data.business || "Not given"}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone || "Not given"}`,
        isCheck ? `Current website: ${data.website || "None yet"}` : `Plan: ${planLabel}`,
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
      for (const [key, value] of Object.entries(data)) body.append(key, value);
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
            ? `We'll get back to you within ${site.replyTime}. Need us sooner? Call or text ${site.phoneDisplay}.`
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
    <form onSubmit={handleSubmit} className="grid gap-5 rounded-2xl bg-paper p-6 ring-1 ring-navy/10 sm:p-8">
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" name="name" autoComplete="name" required />
        <Field label="Business name" name="business" autoComplete="organization" required={isCheck} optional={!isCheck} />
        <Field label="Email" name="email" type="email" autoComplete="email" required />
        <Field label="Phone" name="phone" type="tel" autoComplete="tel" optional />
      </div>

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
        label={isCheck ? "What's not working, or what do you want from a website?" : "Tell us about your business"}
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
          {status === "sending" ? "Sending…" : isCheck ? "Get my free website check" : "Send message"}
          <Arrow className="transition-transform duration-300 group-hover:translate-x-0.5" />
        </button>
        <p className="text-sm text-stone">
          Reply within {site.replyTime}. No spam, ever.
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
  children?: ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold">
        {label}
        {optional ? <span className="ml-1.5 font-normal text-stone">(optional)</span> : null}
      </span>
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
    </label>
  );
}
