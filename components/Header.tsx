"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "@/components/Logo";
import ServicesMenu from "@/components/ServicesMenu";
import { industries } from "@/data/industries";
import { primaryNav } from "@/data/nav";
import { site } from "@/data/site";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.documentElement.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const isActive = (href: string) =>
    pathname === href ||
    pathname.startsWith(href) ||
    // The Services menu also covers the industry and service-area pages.
    (href === "/services/" && (pathname.startsWith("/industries/") || pathname.startsWith("/areas/")));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-navy text-cream transition-shadow duration-300 ${
        scrolled || open ? "shadow-[0_1px_0_rgba(245,243,238,0.08),0_8px_24px_rgba(0,0,0,0.25)]" : ""
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between gap-6 sm:h-20">
        <Link href="/" aria-label={`${site.name} home`} className="shrink-0" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {primaryNav.map((link) =>
            link.href === "/services/" ? (
              <ServicesMenu key={link.href} active={isActive(link.href)} />
            ) : (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`relative py-2 text-[0.95rem] font-medium transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-orange after:transition-transform after:duration-300 ${
                  isActive(link.href)
                    ? "text-cream after:scale-x-100"
                    : "text-cream/75 after:scale-x-0 hover:text-cream hover:after:scale-x-100"
                }`}
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <a
            href={site.phoneHref}
            className="hidden font-mono text-sm text-cream/80 transition-colors hover:text-cream xl:inline"
          >
            {site.phoneDisplay}
          </a>
          <Link
            href="/free-website-check/"
            className="hidden rounded-full bg-orange px-5 py-2.5 text-sm font-bold text-navy shadow-[0_6px_20px_-10px_rgba(251,79,20,0.8)] transition-[background-color,box-shadow] hover:bg-orange-soft hover:shadow-[0_10px_28px_-8px_rgba(251,79,20,0.8)] sm:inline-flex"
          >
            Free website check
          </Link>
          <a
            href={site.phoneHref}
            aria-label={`Call ${site.phoneDisplay}`}
            className="flex h-11 w-11 items-center justify-center rounded-full text-cream sm:hidden"
          >
            <PhoneIcon />
          </a>
          <button
            type="button"
            className="-mr-2 flex h-11 w-11 items-center justify-center lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="relative block h-3.5 w-6">
              <span
                className={`absolute left-0 h-0.5 w-full rounded bg-current transition-all duration-300 ${
                  open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 rounded bg-current transition-opacity duration-200 ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 h-0.5 w-full rounded bg-current transition-all duration-300 ${
                  open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <div aria-hidden="true" className="scroll-progress absolute inset-x-0 bottom-0 h-0.5 origin-left bg-orange" />
      <div
        id="mobile-menu"
        hidden={!open}
        className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-cream/10 bg-navy sm:h-[calc(100dvh-5rem)] lg:hidden"
      >
        <nav
          aria-label="Mobile"
          className="container-x flex h-full flex-col py-6"
          onClick={(event) => (event.target as HTMLElement).closest("a") && setOpen(false)}
        >
          <ul className="divide-y divide-cream/10">
            {primaryNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className="flex items-center justify-between py-4 text-2xl font-bold tracking-tight"
                >
                  {link.label}
                  <span aria-hidden="true" className="text-orange">
                    →
                  </span>
                </Link>
                {link.href === "/services/" ? (
                  <div className="pb-5">
                    <p className="t-mono text-mist">Who I help</p>
                    <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2.5 text-[0.95rem] text-cream/80">
                      {industries.map((industry) => (
                        <li key={industry.slug}>
                          <Link href={`/industries/${industry.slug}/`} className="hover:text-orange">
                            {industry.label}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <Link href="/areas/" className="hover:text-orange">
                          Service areas
                        </Link>
                      </li>
                    </ul>
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
          <div className="mt-auto grid gap-3 pt-8">
            <Link
              href="/free-website-check/"
              className="rounded-full bg-orange px-6 py-4 text-center font-bold text-navy"
            >
              Get a free website check
            </Link>
            <a
              href={site.phoneHref}
              className="rounded-full border border-cream/25 px-6 py-4 text-center font-semibold"
            >
              Call {site.phoneDisplay}
            </a>
            <a href={site.emailHref} className="py-2 text-center font-mono text-sm text-mist">
              {site.email}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path
        d="M5 4h3.5l1.5 4-2 1.5a11 11 0 0 0 6.5 6.5l1.5-2 4 1.5V19a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}
