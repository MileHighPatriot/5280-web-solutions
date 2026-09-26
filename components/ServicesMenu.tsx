"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ServiceIcon from "@/components/ServiceIcon";
import { industries, menuIndustries } from "@/data/industries";
import { services } from "@/data/services";

/**
 * Desktop "Services" dropdown: the services, the industry pages, and service areas.
 * Opens on hover (with a short grace period) or click, closes on Escape, outside
 * click, or navigation.
 */
export default function ServicesMenu({ active }: { active: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  // True while the menu is open because the mouse is over it, so the click that
  // usually follows a hover doesn't immediately toggle it shut.
  const hoverOpened = useRef(false);

  // Close whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        wrapRef.current?.querySelector("button")?.focus();
      }
    };
    const onPointer = (event: PointerEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  const show = () => {
    window.clearTimeout(closeTimer.current);
    if (!open) hoverOpened.current = true;
    setOpen(true);
  };
  const hide = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => {
      hoverOpened.current = false;
      setOpen(false);
    }, 180);
  };
  const toggle = () => {
    if (hoverOpened.current) {
      hoverOpened.current = false; // keep it open; a second click will close it
      setOpen(true);
    } else {
      setOpen((value) => !value);
    }
  };

  return (
    <div
      ref={wrapRef}
      className="relative"
      onPointerEnter={(event) => event.pointerType === "mouse" && show()}
      onPointerLeave={(event) => event.pointerType === "mouse" && hide()}
      onBlur={(event) => !event.currentTarget.contains(event.relatedTarget as Node) && setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls="services-menu"
        onClick={toggle}
        className={`relative flex items-center gap-1.5 py-2 text-[0.95rem] font-medium transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-orange after:transition-transform after:duration-300 ${
          active || open
            ? "text-cream after:scale-x-100"
            : "text-cream/75 after:scale-x-0 hover:text-cream hover:after:scale-x-100"
        }`}
      >
        Services
        <svg
          viewBox="0 0 12 12"
          aria-hidden="true"
          className={`h-3 w-3 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        >
          <path
            d="m2.5 4.5 3.5 3.5 3.5-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <div
        id="services-menu"
        inert={!open}
        className={`absolute top-full left-1/2 z-50 w-[46rem] -translate-x-1/2 pt-5 transition-[opacity,translate] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <div className="relative isolate overflow-clip rounded-2xl bg-navy-2 text-cream shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] ring-1 ring-cream/10">
          <div aria-hidden="true" className="blueprint absolute inset-0 -z-10 opacity-60" />
          <div className="grid grid-cols-[1fr_1.1fr]">
            <div className="p-6">
              <p className="t-mono text-mist">What we do</p>
              <ul className="mt-3 grid gap-1">
                {services.map((service) => (
                  <li key={service.id}>
                    <Link
                      href={`/services/#${service.id}`}
                      className="group flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-cream/[0.06]"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy ring-1 ring-cream/10 transition-colors group-hover:ring-orange/60">
                        <ServiceIcon id={service.id} className="h-6 w-6 text-cream" />
                      </span>
                      <span className="font-semibold">{service.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-l border-cream/10 p-6">
              <p className="t-mono text-mist">Who we help</p>
              <ul className="mt-3 grid gap-0.5">
                {menuIndustries.map((industry) => (
                  <li key={industry.slug}>
                    <Link
                      href={`/industries/${industry.slug}/`}
                      className="group flex items-center justify-between rounded-lg px-2.5 py-2 text-[0.95rem] text-cream/85 transition-colors hover:bg-cream/[0.06] hover:text-cream"
                    >
                      {industry.label}
                      <span
                        aria-hidden="true"
                        className="text-orange opacity-0 transition-[opacity,translate] group-hover:translate-x-0.5 group-hover:opacity-100"
                      >
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex items-center justify-between gap-4 border-t border-cream/10 bg-navy/60 px-6 py-3.5 text-sm">
            <Link href="/services/" className="font-bold hover:text-orange">
              All services →
            </Link>
            <div className="flex gap-5">
              <Link href="/industries/" className="text-cream/80 hover:text-orange">
                All {industries.length} industries
              </Link>
              <Link href="/areas/" className="text-cream/80 hover:text-orange">
                Service areas
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
