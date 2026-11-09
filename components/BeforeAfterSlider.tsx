"use client";

import Image from "next/image";
import { Unbounded } from "next/font/google";
import { useEffect, useRef, useState } from "react";

// Joe's display face. Only the mockup uses it, and it sits below the fold, so it isn't preloaded.
const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-joes",
  display: "swap",
  preload: false,
});

/**
 * Drag (or arrow-key) between a dated small-business site and the kind of site
 * I build. Both mockups are built in HTML and sized in container units, so they
 * scale with the frame. The slider nudges itself once when it scrolls into view
 * to show that it moves.
 */
export default function BeforeAfterSlider() {
  const [position, setPosition] = useState(50);
  const touched = useRef(false);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = frameRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    let raf = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          if (touched.current) return;
          const t = Math.min((now - start) / 2200, 1);
          // 50 → 22 → 78 → 50, eased.
          const wave = Math.sin(t * Math.PI * 2) * (1 - t * 0.35);
          setPosition(50 - wave * 28);
          if (t < 1) raf = requestAnimationFrame(tick);
          else setPosition(50);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="overflow-hidden rounded-2xl bg-navy shadow-2xl shadow-navy/25 ring-1 ring-cream/20">
      <div className="flex items-center gap-3 px-4 py-3" aria-hidden="true">
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-cream/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-cream/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-cream/25" />
        </span>
        <span className="flex-1 truncate rounded-md bg-navy-3 px-3 py-1 text-center font-mono text-xs text-mist">
          joescarwash.com
        </span>
      </div>

      <div
        ref={frameRef}
        className="@container relative aspect-[4/5] select-none sm:aspect-[16/10]"
      >
        <AfterSite />
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <BeforeSite />
        </div>

        <span className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-[#b3261e] px-2.5 py-1 font-mono text-[0.65rem] font-medium uppercase tracking-widest text-white sm:text-xs">
          Before
        </span>
        <span className="pointer-events-none absolute right-3 bottom-3 rounded-full bg-orange px-2.5 py-1 font-mono text-[0.65rem] font-medium uppercase tracking-widest text-navy sm:text-xs">
          After
        </span>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-cream shadow-[0_0_0_1px_rgba(20,32,43,0.25)]"
          style={{ left: `${position}%` }}
        >
          <span className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-cream text-navy shadow-lg ring-2 ring-orange">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
              <path
                d="m9 6-6 6 6 6M15 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>

        <input
          type="range"
          min={0}
          max={100}
          step={0.5}
          value={position}
          onChange={(event) => {
            touched.current = true;
            setPosition(Number(event.target.value));
          }}
          onPointerDown={() => {
            touched.current = true;
          }}
          aria-label="Compare the old website with the redesign. Slide left to see more of the redesign."
          className="absolute inset-0 h-full w-full cursor-ew-resize appearance-none opacity-0"
        />
      </div>
    </div>
  );
}

/**
 * A believable 2009-era small-business site. On phones it does what those sites do:
 * it stays desktop-width, so you only see the left part of the page.
 */
function BeforeSite() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#d6d6d6]">
      <div className="@container h-full w-full max-sm:w-[180%]">
        <div className="relative h-full font-serif text-[#111] [font-size:1.6cqw]">
          <div className="bg-gradient-to-b from-[#3a5fb0] to-[#1d3c85] py-[1.4cqw] text-center">
            <p className="font-bold text-[#ffe14d] [font-size:1.5cqw] [letter-spacing:0.2cqw]">
              ★ WELCOME TO OUR WEBSITE!!! ★
            </p>
            <p className="font-bold text-white [font-size:3.6cqw] [text-shadow:0.2cqw_0.2cqw_0_#000]">
              Joe&apos;s CarWash &amp; Detail LLC
            </p>
          </div>
          <p className="border-y border-[#888] bg-[#eee] py-[0.6cqw] text-center text-[#1a0dab] underline [font-size:1.35cqw]">
            Home | About Us | Services | Photo Gallery | Links | Guestbook |
            Contact Us
          </p>
          <div className="grid grid-cols-[1fr_1.4fr] gap-[2cqw] p-[2cqw]">
            <div>
              <p className="font-bold text-[#c00] [font-size:2.2cqw]">
                HOT SPECIALS!!!
              </p>
              <div className="mt-[1cqw] flex aspect-[4/3] items-center justify-center border-[0.3cqw] border-dashed border-[#999] bg-[repeating-linear-gradient(45deg,#c4c4c4,#c4c4c4_1cqw,#b9b9b9_1cqw,#b9b9b9_2cqw)] text-[#666]">
                [image not found]
              </div>
              <p className="mt-[1cqw] text-center italic text-[#555] [font-size:1.3cqw]">
                Our building (2008)
              </p>
            </div>
            <div className="leading-snug">
              <p className="text-center font-bold text-[#008000] [font-size:1.9cqw]">
                *** NOW OPEN SUNDAYS ***
              </p>
              <p className="mt-[1.2cqw]">
                We have been proudly serving the community for many years and we
                pride ourselves on quality and customer satisfaction. Please
                browse our website to learn more about our services and our
                history. For pricing information please call us or stop by
                during business hours. Hours may vary during holidays. Thank you
                for visiting!!
              </p>
              <p className="mt-[1.2cqw] text-[#1a0dab] underline">
                Click here for more information &gt;&gt;
              </p>
              <p className="mt-[1.2cqw] text-[#555]">
                Page last updated: March 2014
              </p>
            </div>
          </div>
          <p className="absolute inset-x-0 bottom-0 bg-[#bbb] py-[0.8cqw] text-center text-[#333] [font-size:1.2cqw] max-sm:pb-[2.2rem]">
            Best viewed in Internet Explorer at 800x600 · You are visitor
            #004127 · © 2009
          </p>
        </div>
      </div>
    </div>
  );
}

const joes = "[font-family:var(--font-joes)]";
const glass = "border border-white/15 bg-[#080c16]/60 backdrop-blur-md";

/** The redesign: the top of the live Joe's CarWash concept page (/joes-carwash/). */
function AfterSite() {
  return (
    <div
      className={`${unbounded.variable} absolute inset-0 overflow-hidden bg-[#05070d] font-sans text-[#f2f6ff] [font-size:1.3cqw] max-sm:[font-size:3.2cqw]`}
    >
      <div className="absolute inset-y-0 right-0 w-[74%] max-sm:inset-x-0 max-sm:top-0 max-sm:bottom-auto max-sm:h-[74%] max-sm:w-full">
        <Image
          src="/work/joes-tunnel.jpg"
          alt=""
          fill
          sizes="(min-width: 1280px) 880px, (min-width: 640px) 72vw, 100vw"
          className="object-cover object-[46%_42%] max-sm:object-[42%_30%]"
        />
      </div>
      {/* Fades the photo into the page: from the left on wide frames, from the bottom on phones. */}
      <div
        className="absolute inset-0 max-sm:hidden"
        style={{
          background:
            "linear-gradient(90deg,#05070d 0%,#05070d 26%,rgba(5,7,13,.6) 44%,rgba(5,7,13,0) 68%),linear-gradient(0deg,#05070d 0%,rgba(5,7,13,0) 40%),radial-gradient(45% 55% at 62% 30%,rgba(34,227,255,.2),transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 sm:hidden"
        style={{
          background:
            "linear-gradient(0deg,#05070d 30%,rgba(5,7,13,.75) 46%,rgba(5,7,13,0) 68%),radial-gradient(70% 40% at 50% 22%,rgba(34,227,255,.2),transparent 70%)",
        }}
      />
      {/* A band of light that crosses the tunnel every few seconds. */}
      <div
        className="absolute -inset-y-[20%] left-0 w-[18%] animate-[joes-sweep_7s_cubic-bezier(0.16,1,0.3,1)_1.2s_infinite] mix-blend-screen motion-reduce:hidden"
        style={{
          background:
            "linear-gradient(90deg,transparent,rgba(34,227,255,.16) 45%,rgba(255,255,255,.2) 50%,rgba(47,123,255,.16) 55%,transparent)",
        }}
      />

      <div className="absolute inset-x-0 top-0 flex items-center justify-between border-b border-white/10 bg-[#05070d]/60 px-[3.2cqw] py-[1.5cqw] backdrop-blur-md max-sm:px-[4.5cqw] max-sm:py-[3cqw]">
        <span
          className={`${joes} flex items-center gap-[0.9cqw] font-extrabold [font-size:1.5cqw] max-sm:gap-[2cqw] max-sm:[font-size:3.7cqw]`}
        >
          <svg
            viewBox="0 0 40 40"
            className="h-[2.6cqw] w-[2.6cqw] drop-shadow-[0_0_0.8cqw_rgba(34,227,255,0.7)] max-sm:h-[6.5cqw] max-sm:w-[6.5cqw]"
            fill="none"
          >
            <defs>
              <linearGradient
                id="joes-drop"
                x1="4"
                y1="4"
                x2="36"
                y2="36"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#22e3ff" />
                <stop offset="1" stopColor="#2f7bff" />
              </linearGradient>
            </defs>
            <path
              d="M20 3c6 8 12 13.5 12 21a12 12 0 0 1-24 0c0-7.5 6-13 12-21Z"
              fill="url(#joes-drop)"
            />
            <path
              d="M14 25a6 6 0 0 0 6 6"
              stroke="#fff"
              strokeWidth="2.4"
              strokeLinecap="round"
              opacity=".85"
            />
          </svg>
          <span>
            Joe&apos;s <span className="text-[#22e3ff]">CarWash</span>
          </span>
        </span>
        <span className="flex items-center gap-[2.4cqw] font-semibold text-[#a3b3cf] [font-size:1.15cqw] max-sm:[font-size:3cqw]">
          <span className="max-sm:hidden">The tunnel</span>
          <span className="max-sm:hidden">Washes</span>
          <span className="max-sm:hidden">Membership</span>
          <span className="max-sm:hidden">Locations</span>
          <span className="rounded-full bg-[#ffb020] px-[1.8cqw] py-[0.65cqw] font-extrabold text-[#1a1002] shadow-[0_0_2.4cqw_rgba(255,176,32,0.5)] max-sm:px-[4.2cqw] max-sm:py-[1.6cqw]">
            Join
          </span>
        </span>
      </div>

      <div className="absolute top-[10.2cqw] left-[3.2cqw] w-[46cqw] max-sm:inset-x-[4.5cqw] max-sm:top-auto max-sm:bottom-[3.4rem] max-sm:w-auto">
        <p
          className={`${glass} inline-flex items-center gap-[0.8cqw] rounded-full !border-[#22e3ff]/40 px-[1.2cqw] py-[0.6cqw] font-bold shadow-[0_0_2.6cqw_rgba(34,227,255,0.35)] [font-size:1.05cqw] max-sm:gap-[1.8cqw] max-sm:px-[3cqw] max-sm:py-[1.5cqw] max-sm:[font-size:2.9cqw]`}
        >
          <span className="relative flex h-[0.8cqw] w-[0.8cqw] max-sm:h-[1.9cqw] max-sm:w-[1.9cqw]">
            <span className="absolute inset-0 animate-ping rounded-full bg-[#35f29a] motion-reduce:animate-none" />
            <span className="relative h-full w-full rounded-full bg-[#35f29a]" />
          </span>
          Tunnel open{" "}
          <span className="font-semibold text-[#a3b3cf]">· 4 min wait</span>
        </p>
        <p
          className={`${joes} mt-[1.5cqw] leading-[0.98] font-extrabold tracking-[-0.035em] [font-size:4.7cqw] max-sm:mt-[3cqw] max-sm:[font-size:9.6cqw]`}
        >
          Three minutes.{" "}
          <span className="bg-gradient-to-r from-[#22e3ff] via-[#6aa2ff] to-[#7a5cff] bg-clip-text text-transparent">
            Showroom shine.
          </span>
        </p>
        <p className="mt-[1.5cqw] max-w-[36cqw] leading-snug text-[#c5d2ea] [font-size:1.3cqw] max-sm:hidden">
          Pull in, stay in your seat, and roll out spotless. Ceramic-coat
          tunnel, free vacuums, and a plate reader that waves members straight
          through.
        </p>
        <div className="mt-[2cqw] flex gap-[1cqw] font-extrabold [font-size:1.2cqw] max-sm:mt-[4cqw] max-sm:gap-[2.4cqw] max-sm:[font-size:3.1cqw]">
          <span className="rounded-full bg-[#ffb020] px-[2.2cqw] py-[1cqw] text-[#1a1002] shadow-[0_0.8cqw_3.2cqw_-0.6cqw_rgba(255,176,32,0.7)] max-sm:flex-1 max-sm:px-[4cqw] max-sm:py-[2.6cqw] max-sm:text-center">
            See wash prices →
          </span>
          <span
            className={`${glass} rounded-full !border-white/25 px-[2.2cqw] py-[1cqw] max-sm:flex-1 max-sm:px-[4cqw] max-sm:py-[2.6cqw] max-sm:text-center`}
          >
            Get directions
          </span>
        </div>
        <p className="mt-[1.5cqw] font-semibold text-[#a3b3cf] [font-size:1.1cqw] max-sm:mt-[3cqw] max-sm:[font-size:2.8cqw]">
          <span className="tracking-[0.12em] text-[#ffb020]">★★★★★</span> 4.9
          from 1,200+ Google reviews
        </p>
      </div>

      {/* Member card, floating over the tunnel wall. */}
      <div className="absolute top-[11cqw] right-[3.4cqw] flex aspect-[1.586] w-[23cqw] rotate-[5deg] flex-col justify-between overflow-hidden rounded-[1.3cqw] border border-white/25 bg-gradient-to-br from-white/20 via-[#12224a]/70 to-[#22e3ff]/20 p-[1.4cqw] shadow-[0_2.5cqw_6cqw_-2cqw_rgba(47,123,255,0.9)] backdrop-blur-md max-sm:hidden">
        <div className="flex items-start justify-between">
          <span className={`${joes} font-bold [font-size:1cqw]`}>
            Joe&apos;s CarWash
            <span className="mt-[0.4cqw] block font-semibold tracking-[0.2em] text-[#22e3ff] [font-size:0.62cqw]">
              UNLIMITED · SHINE
            </span>
          </span>
          <span className="h-[1.9cqw] w-[2.5cqw] rounded-[0.4cqw] bg-gradient-to-br from-[#ffe19a] to-[#c98a1a]" />
        </div>
        <span
          className={`${joes} self-start rounded-[0.5cqw] border-[0.16cqw] border-white/75 px-[0.9cqw] py-[0.4cqw] font-extrabold tracking-[0.12em] [font-size:1.35cqw]`}
        >
          JOE·5280
        </span>
        <span className="font-semibold text-[#c5d2ea] [font-size:0.8cqw]">
          Plate recognised · gate opens
        </span>
      </div>

      <div
        className={`${glass} absolute inset-x-[3.2cqw] bottom-[max(3cqw,3.1rem)] grid grid-cols-4 overflow-hidden rounded-[1.2cqw] max-sm:hidden`}
      >
        {[
          ["4", "min", "Current wait"],
          ["3", "min", "Door to dry"],
          ["85", "%", "Water reclaimed"],
          ["$0", "", "Vacuums, always"],
        ].map(([value, unit, label], index) => (
          <div
            key={label}
            className={`px-[1.6cqw] py-[1.1cqw] ${index ? "border-l border-white/10" : ""}`}
          >
            <p className={`${joes} leading-tight font-bold [font-size:1.9cqw]`}>
              {value}
              <span className="ml-[0.2cqw] text-[#22e3ff] [font-size:1cqw]">
                {unit}
              </span>
            </p>
            <p className="font-semibold text-[#a3b3cf] [font-size:0.95cqw]">
              {label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
