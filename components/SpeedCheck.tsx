"use client";

import { type FormEvent, useEffect, useRef, useState } from "react";
import { Arrow, Check, Dash } from "@/components/ui/Button";
import { site } from "@/data/site";

/**
 * Instant speed test: runs Google PageSpeed Insights (mobile) on the visitor's site
 * and explains the results in plain English. Needs site.pagespeedKey in production;
 * without it Google's shared quota usually refuses, and we point people to the form.
 */

type Category = "performance" | "accessibility" | "best-practices" | "seo";

const categories: { id: Category; label: string; blurb: string }[] = [
  { id: "performance", label: "Speed", blurb: "How fast it loads on a phone" },
  { id: "seo", label: "Google basics", blurb: "What Google needs to list you" },
  { id: "accessibility", label: "Easy to use", blurb: "Readable and usable for everyone" },
  { id: "best-practices", label: "Health", blurb: "Security and modern standards" },
];

type Result = {
  url: string;
  scores: Record<Category, number>;
  loadTime: string;
  loadSeconds: number;
  facts: { ok: boolean; text: string }[];
};

type State =
  | { status: "idle" }
  | { status: "running" }
  | { status: "done"; result: Result }
  | { status: "error"; message: string; busy?: boolean };

type Audit = { score: number | null; displayValue?: string; numericValue?: number };

const progressSteps = [
  "Loading your site on a simulated phone…",
  "Timing how long the main content takes…",
  "Checking what Google sees…",
  "Checking security and readability…",
  "Almost done. Slow sites take longer to test…",
];

function normalizeUrl(input: string) {
  const trimmed = input.trim();
  if (!trimmed) return null;
  try {
    const url = new URL(/^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`);
    return url.hostname.includes(".") ? url.toString() : null;
  } catch {
    return null;
  }
}

function toResult(url: string, data: unknown): Result {
  const lighthouse = (
    data as {
      lighthouseResult: { categories: Record<string, { score: number | null }>; audits: Record<string, Audit> };
    }
  ).lighthouseResult;
  const audits = lighthouse.audits;
  const passed = (id: string) => (audits[id]?.score ?? 0) >= 0.9;
  const lcp = audits["largest-contentful-paint"];
  const loadSeconds = (lcp?.numericValue ?? 0) / 1000;

  const scores = Object.fromEntries(
    categories.map(({ id }) => [id, Math.round((lighthouse.categories[id]?.score ?? 0) * 100)]),
  ) as Record<Category, number>;

  const facts = [
    {
      ok: loadSeconds <= 2.5,
      text:
        loadSeconds <= 2.5
          ? "The main content shows up quickly on a phone."
          : "The main content is slow to show up on a phone. Many visitors leave before it does.",
    },
    {
      ok: passed("viewport"),
      text: passed("viewport") ? "It's set up for phone screens." : "It isn't set up properly for phone screens.",
    },
    {
      ok: passed("is-on-https"),
      text: passed("is-on-https")
        ? "It uses a secure connection (the padlock)."
        : "Parts of it aren't secure, so browsers may warn visitors.",
    },
    {
      ok: passed("meta-description") && passed("document-title"),
      text:
        passed("meta-description") && passed("document-title")
          ? "It gives Google a title and description to show in search results."
          : "It's missing the title or description Google shows in search results.",
    },
    {
      ok: passed("cumulative-layout-shift"),
      text: passed("cumulative-layout-shift")
        ? "The page stays put while it loads."
        : "The page jumps around while it loads, which makes people tap the wrong thing.",
    },
  ];

  return { url, scores, loadTime: lcp?.displayValue ?? `${loadSeconds.toFixed(1)} s`, loadSeconds, facts };
}

function verdict(result: Result) {
  const speed = result.scores.performance;
  if (speed >= 90) return "Nicely done. Your site is fast. The notes below show anything still worth fixing.";
  if (speed >= 50) return "Not bad, but there's room to improve. A faster site keeps more of the people who find you.";
  return "Your site is slow on phones, and that's likely costing you customers. The good news: it's fixable.";
}

function tone(score: number) {
  if (score >= 90) return { ring: "stroke-[#2e7d4f]", text: "text-[#2e7d4f]", label: "Good" };
  if (score >= 50) return { ring: "stroke-orange", text: "text-ember", label: "Needs work" };
  return { ring: "stroke-[#c0392b]", text: "text-[#b03425]", label: "Poor" };
}

function ScoreRing({ score, label, blurb }: { score: number; label: string; blurb: string }) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(frame);
  }, []);
  const t = tone(score);
  return (
    <li className="flex flex-col items-center text-center">
      <div className="relative h-24 w-24">
        <svg viewBox="0 0 64 64" className="h-full w-full -rotate-90" aria-hidden="true">
          <circle cx="32" cy="32" r="27" fill="none" strokeWidth="6" className="stroke-navy/10" />
          <circle
            cx="32"
            cy="32"
            r="27"
            fill="none"
            strokeWidth="6"
            strokeLinecap="round"
            pathLength={100}
            strokeDasharray="100"
            strokeDashoffset={shown ? 100 - score : 100}
            className={`score-ring ${t.ring}`}
          />
        </svg>
        <span className={`absolute inset-0 flex items-center justify-center text-2xl font-black ${t.text}`}>
          {score}
        </span>
      </div>
      <p className="mt-3 font-bold">{label}</p>
      <p className="mt-0.5 text-sm text-stone">{blurb}</p>
      <p className={`mt-1 font-mono text-xs ${t.text}`}>
        <span className="sr-only">
          {label} score {score} out of 100:{" "}
        </span>
        {t.label}
      </p>
    </li>
  );
}

export default function SpeedCheck() {
  const [state, setState] = useState<State>({ status: "idle" });
  const [step, setStep] = useState(0);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (state.status !== "running") return;
    const timer = setInterval(() => setStep((s) => Math.min(s + 1, progressSteps.length - 1)), 6000);
    return () => clearInterval(timer);
  }, [state.status]);

  useEffect(() => () => abortRef.current?.abort(), []);

  async function run(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const raw = String(new FormData(event.currentTarget).get("url") ?? "");
    const url = normalizeUrl(raw);
    if (!url) {
      setState({
        status: "error",
        message: "That doesn't look like a web address. Try something like joescarwash.com.",
      });
      return;
    }

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    const timeout = setTimeout(() => controller.abort(), 120_000);
    setStep(0);
    setState({ status: "running" });

    const params = new URLSearchParams({ url, strategy: "mobile" });
    for (const { id } of categories) params.append("category", id.toUpperCase().replace("-", "_"));
    if (site.pagespeedKey) params.set("key", site.pagespeedKey);

    try {
      const response = await fetch(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${params}`, {
        signal: controller.signal,
      });
      const data = await response.json();
      if (!response.ok) {
        const code = response.status;
        const message: string = data?.error?.message ?? "";
        if (code === 429 || code === 403) {
          setState({ status: "error", busy: true, message: "Google's speed test is busy right now." });
        } else if (/FAILED_DOCUMENT_REQUEST|ERRORED_DOCUMENT_REQUEST|DNS|NO_FCP|unreachable/i.test(message)) {
          setState({
            status: "error",
            message: "Google couldn't load that site. Double-check the address, or the site may be down.",
          });
        } else {
          setState({ status: "error", busy: true, message: "The speed test didn't finish this time." });
        }
        return;
      }
      setState({ status: "done", result: toResult(url, data) });
    } catch {
      if (controller.signal.aborted && abortRef.current !== controller) return;
      setState({ status: "error", busy: true, message: "The speed test didn't finish this time." });
    } finally {
      clearTimeout(timeout);
    }
  }

  function sendToForm(url?: string) {
    const input = document.querySelector<HTMLInputElement>('form input[name="website"]');
    if (input && url) input.value = url.replace(/\/$/, "");
    document.getElementById("request")?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => document.querySelector<HTMLInputElement>('form input[name="name"]')?.focus(), 500);
  }

  const running = state.status === "running";

  return (
    <div className="rounded-3xl bg-paper p-6 ring-1 ring-navy/10 sm:p-10">
      <form onSubmit={run} className="flex flex-col gap-3 sm:flex-row" noValidate>
        <label htmlFor="speed-url" className="sr-only">
          Your website address
        </label>
        <input
          id="speed-url"
          name="url"
          type="text"
          inputMode="url"
          autoComplete="url"
          placeholder="yourbusiness.com"
          disabled={running}
          className="min-w-0 flex-1 rounded-full border-2 border-navy/15 bg-cream px-6 py-3.5 text-lg outline-none transition-colors focus:border-orange disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={running}
          className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-navy px-7 py-3.5 font-bold text-cream transition-colors hover:bg-navy-3 disabled:cursor-wait disabled:opacity-70"
        >
          {running ? "Testing…" : "Test my site"}
          {running ? null : <Arrow className="transition-transform duration-300 group-hover:translate-x-0.5" />}
        </button>
      </form>
      <p className="mt-3 text-sm text-stone">
        Uses Google&rsquo;s own speed test on a simulated phone. Takes about 20&ndash;40 seconds. Nothing is saved.
      </p>

      <div aria-live="polite" className="mt-8 empty:mt-0">
        {running ? (
          <div className="flex items-center gap-4 rounded-2xl bg-cream p-5 ring-1 ring-navy/10">
            <span className="speed-spinner h-6 w-6 shrink-0 rounded-full border-[3px] border-navy/15 border-t-orange" />
            <p className="font-semibold">{progressSteps[step]}</p>
          </div>
        ) : null}

        {state.status === "error" ? (
          <div className="rounded-2xl bg-cream p-6 ring-1 ring-navy/10">
            <p className="font-bold">{state.message}</p>
            {state.busy ? (
              <p className="mt-2 text-stone">
                No problem. Send us your address with the form below and we&rsquo;ll run the full test ourselves and send
                you the results with plain-English notes.
              </p>
            ) : null}
            {state.busy ? (
              <button
                type="button"
                onClick={() => sendToForm()}
                className="mt-4 inline-flex items-center gap-2 font-bold text-ember underline underline-offset-4"
              >
                Send it to us instead <Arrow />
              </button>
            ) : null}
          </div>
        ) : null}

        {state.status === "done" ? (
          <div>
            <p className="t-mono text-stone">Results for {new URL(state.result.url).hostname}</p>
            <p className="t-h3 mt-3 max-w-2xl text-balance">{verdict(state.result)}</p>
            <ul className="mt-8 grid grid-cols-2 gap-8 lg:grid-cols-4">
              {categories.map((category) => (
                <ScoreRing
                  key={category.id}
                  score={state.result.scores[category.id]}
                  label={category.label}
                  blurb={category.blurb}
                />
              ))}
            </ul>
            <div className="mt-10 grid gap-8 lg:grid-cols-12">
              <div className="rounded-2xl bg-navy p-6 text-cream lg:col-span-4">
                <p className="t-mono text-mist">Main content on a phone</p>
                <p className="mt-2 text-5xl font-black tracking-tight">{state.result.loadTime}</p>
                <p className="mt-2 text-sm text-mist">Google&rsquo;s target is 2.5 s or less.</p>
              </div>
              <ul className="grid content-start gap-3 lg:col-span-8">
                {state.result.facts.map((fact) => (
                  <li key={fact.text} className="flex gap-3">
                    {fact.ok ? <Check className="mt-0.5 text-[#2e7d4f]" /> : <Dash className="mt-0.5 text-[#b03425]" />}
                    <span className={fact.ok ? "text-stone" : "font-semibold"}>{fact.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-10 flex flex-col items-start gap-4 border-t border-navy/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-xl text-stone">
                Scores are only part of the story. We&rsquo;ll also look at your design, wording, and how easy it is to
                contact you, then send honest notes. Free, no obligation.
              </p>
              <button
                type="button"
                onClick={() => sendToForm(state.result.url)}
                className="group inline-flex shrink-0 items-center gap-2.5 rounded-full bg-orange px-6 py-3.5 font-bold text-navy transition-colors hover:bg-orange-soft"
              >
                Get my full review
                <Arrow className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
