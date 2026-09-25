"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Terminal-style launch checklist that types itself out when scrolled into view.
 * It illustrates the launch-day checks, so every line is something done for every
 * site. The full list is always in the DOM for screen readers; the animation only
 * controls what's visible. Reduced motion shows everything at once.
 */

const COMMAND = "launch yourbusiness.com";
const CHECKS = [
  "Pages reviewed and approved by you",
  "Tested on phones, tablets, and desktops",
  "Contact form tested: messages reach your inbox",
  "Secure connection (HTTPS) turned on",
  "Speed checked on Google's test",
  "Set up so Google can find and list you",
];

export default function LaunchLog() {
  const ref = useRef<HTMLDivElement>(null);
  const [typed, setTyped] = useState(0); // characters of the command shown
  const [done, setDone] = useState(-1); // index of the last finished check
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          setStarted(true);
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers: number[] = [];
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, reduce ? 0 : ms));
    for (let i = 1; i <= COMMAND.length; i++) at(300 + i * 45, () => setTyped(i));
    const typedAt = 300 + COMMAND.length * 45 + 350;
    CHECKS.forEach((_, i) => at(typedAt + i * 520 + 380, () => setDone(i)));
    return () => timers.forEach(window.clearTimeout);
  }, [started]);

  const commandDone = typed >= COMMAND.length;
  const allDone = done >= CHECKS.length - 1;
  // The line currently "running" shows a spinner before its check mark lands.
  const running = commandDone && !allDone ? done + 1 : -1;

  return (
    <figure
      ref={ref}
      className="overflow-hidden rounded-2xl bg-navy-ink font-mono text-[0.82rem] leading-relaxed text-cream shadow-2xl shadow-navy/30 ring-1 ring-cream/10 sm:text-sm"
    >
      <div className="flex items-center gap-2 border-b border-cream/10 bg-navy px-4 py-3">
        <span aria-hidden="true" className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span aria-hidden="true" className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span aria-hidden="true" className="h-3 w-3 rounded-full bg-[#28c840]" />
        <figcaption className="ml-3 text-xs text-mist">launch day · yourbusiness.com</figcaption>
      </div>

      <ul className="sr-only">
        {CHECKS.map((check) => (
          <li key={check}>{check}</li>
        ))}
        <li>Live: your site is online.</li>
      </ul>

      <div aria-hidden="true" className="min-h-[19rem] p-5 sm:p-6">
        <p>
          <span className="text-orange">~</span> <span className="text-mist">$</span> {COMMAND.slice(0, typed)}
          {!commandDone ? <span className="terminal-caret" /> : null}
        </p>
        <ul className="mt-3 grid gap-1.5">
          {CHECKS.map((check, i) =>
            i <= done || i === running ? (
              <li key={check} className="flex gap-3">
                {i <= done ? (
                  <span className="text-[#4ade80]">✓</span>
                ) : (
                  <span className="terminal-spin text-orange">◐</span>
                )}
                <span className={i <= done ? "text-cream" : "text-mist"}>{check}</span>
              </li>
            ) : null,
          )}
        </ul>
        {allDone ? (
          <p className="mt-4 flex items-center gap-2 border-t border-cream/10 pt-4">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#4ade80]" />
            <span className="font-medium">Live.</span>
            <span className="text-mist">Your site is online.</span>
            <span className="terminal-caret" />
          </p>
        ) : null}
      </div>
    </figure>
  );
}
