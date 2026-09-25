"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
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
    <div className="overflow-hidden rounded-2xl bg-navy shadow-2xl shadow-navy/25 ring-1 ring-navy/20">
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

      <div ref={frameRef} className="@container relative aspect-[16/10] select-none">
        <AfterSite />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
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
              <path d="m9 6-6 6 6 6M15 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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

/** A believable 2009-era small-business site. */
function BeforeSite() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#d6d6d6] font-serif text-[#111] [font-size:1.6cqw]">
      <div className="bg-gradient-to-b from-[#3a5fb0] to-[#1d3c85] py-[1.4cqw] text-center">
        <p className="font-bold text-[#ffe14d] [font-size:1.5cqw] [letter-spacing:0.2cqw]">★ WELCOME TO OUR WEBSITE!!! ★</p>
        <p className="font-bold text-white [font-size:3.6cqw] [text-shadow:0.2cqw_0.2cqw_0_#000]">
          Joe&apos;s Car Wash &amp; Detail LLC
        </p>
      </div>
      <p className="border-y border-[#888] bg-[#eee] py-[0.6cqw] text-center text-[#1a0dab] underline [font-size:1.35cqw]">
        Home | About Us | Services | Photo Gallery | Links | Guestbook | Contact Us
      </p>
      <div className="grid grid-cols-[1fr_1.4fr] gap-[2cqw] p-[2cqw]">
        <div>
          <p className="font-bold text-[#c00] [font-size:2.2cqw]">HOT SPECIALS!!!</p>
          <div className="mt-[1cqw] flex aspect-[4/3] items-center justify-center border-[0.3cqw] border-dashed border-[#999] bg-[repeating-linear-gradient(45deg,#c4c4c4,#c4c4c4_1cqw,#b9b9b9_1cqw,#b9b9b9_2cqw)] text-[#666]">
            [image not found]
          </div>
          <p className="mt-[1cqw] text-center italic text-[#555] [font-size:1.3cqw]">Our building (2008)</p>
        </div>
        <div className="leading-snug">
          <p className="text-center font-bold text-[#008000] [font-size:1.9cqw]">*** NOW OPEN SUNDAYS ***</p>
          <p className="mt-[1.2cqw]">
            We have been proudly serving the community for many years and we pride ourselves on
            quality and customer satisfaction. Please browse our website to learn more about our
            services and our history. For pricing information please call us or stop by during
            business hours. Hours may vary during holidays. Thank you for visiting!!
          </p>
          <p className="mt-[1.2cqw] text-[#1a0dab] underline">Click here for more information &gt;&gt;</p>
          <p className="mt-[1.2cqw] text-[#555]">Page last updated: March 2014</p>
        </div>
      </div>
      <p className="absolute inset-x-0 bottom-0 bg-[#bbb] py-[0.8cqw] text-center text-[#333] [font-size:1.2cqw]">
        Best viewed in Internet Explorer at 800x600 · You are visitor #004127 · © 2009
      </p>
    </div>
  );
}

/** The redesign: bright car-wash branding, a real photo, one-tap actions, prices, and proof. */
function AfterSite() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-white font-sans text-[#0b2540] [font-size:1.6cqw]">
      <div className="flex items-center justify-between border-b border-[#e3eef7] px-[3cqw] py-[1.5cqw]">
        <span className="flex items-center gap-[0.8cqw] font-black tracking-tight text-[#0b4f8a] [font-size:2.1cqw]">
          <span className="flex h-[2.6cqw] w-[2.6cqw] items-center justify-center rounded-full bg-[#0ea5e9] text-white [font-size:1.4cqw]">
            ✦
          </span>
          Joe&apos;s Car Wash
        </span>
        <span className="flex items-center gap-[2.2cqw] text-[#4a6178] [font-size:1.3cqw]">
          <span>Wash packages</span>
          <span>Memberships</span>
          <span>Locations</span>
          <span className="rounded-full bg-[#0ea5e9] px-[1.6cqw] py-[0.6cqw] font-bold text-white">Join the club</span>
        </span>
      </div>

      <div className="grid h-[62%] grid-cols-[1.1fr_1fr]">
        <div className="relative overflow-hidden">
          <Image
            src="/work/car-wash-tunnel.jpg"
            alt=""
            fill
            sizes="(min-width: 1024px) 640px, 55vw"
            className="object-cover object-[60%_50%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/30" />
        </div>
        <div className="flex flex-col justify-center bg-gradient-to-br from-white to-[#eaf6fd] px-[3.5cqw]">
          <p className="font-bold uppercase text-[#0ea5e9] [font-size:1.1cqw] [letter-spacing:0.2cqw]">
            Aurora · Open today 7am–8pm
          </p>
          <p className="mt-[1cqw] leading-[1.02] font-extrabold tracking-tight [font-size:4.3cqw]">
            A spotless car in under 10&nbsp;minutes.
          </p>
          <p className="mt-[1.2cqw] text-[#4a6178] [font-size:1.45cqw]">
            Soft-touch tunnel wash, free vacuums, and unlimited plans from $29/mo.
          </p>
          <div className="mt-[2cqw] flex gap-[1.2cqw] [font-size:1.35cqw]">
            <span className="rounded-full bg-[#facc15] px-[2cqw] py-[0.9cqw] font-bold text-[#0b2540]">Get directions</span>
            <span className="rounded-full border-[0.15cqw] border-[#0b4f8a]/30 px-[2cqw] py-[0.9cqw] font-bold text-[#0b4f8a]">
              See wash prices
            </span>
          </div>
          <p className="mt-[1.6cqw] text-[#4a6178] [font-size:1.25cqw]">
            <span className="text-[#f5a623]">★★★★★</span> 4.8 from 900+ Google reviews
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-[1.6cqw] bg-[#f3f9fd] px-[3cqw] py-[2.2cqw]">
        {[
          ["Express", "$12", "Wash, rinse & dry"],
          ["Deluxe", "$18", "Adds wheel shine & wax"],
          ["Unlimited", "$29/mo", "Wash every day if you like"],
        ].map(([name, price, note]) => (
          <div key={name} className="rounded-[1cqw] bg-white p-[1.6cqw] shadow-[0_0.3cqw_1.2cqw_rgba(11,79,138,0.08)]">
            <p className="font-bold [font-size:1.45cqw]">{name}</p>
            <p className="font-extrabold text-[#0b4f8a] [font-size:2.6cqw]">{price}</p>
            <p className="text-[#4a6178] [font-size:1.2cqw]">{note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
