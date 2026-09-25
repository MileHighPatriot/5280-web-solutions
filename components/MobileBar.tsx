"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/data/site";

// Pages that already put the form front and center don't need the bar.
const hiddenOn = ["/contact/", "/free-website-check/"];

/** Phone-only action bar that slides up once the visitor scrolls past the first screen. */
export default function MobileBar() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  if (hiddenOn.some((path) => pathname.startsWith(path))) return null;

  const item = "flex flex-1 items-center justify-center gap-2 rounded-full py-3 text-sm font-bold";

  return (
    <nav
      aria-label="Quick contact"
      className={`fixed inset-x-3 z-40 flex gap-1.5 rounded-full bg-navy/95 p-1.5 text-cream shadow-[0_10px_30px_rgba(20,32,43,0.35)] ring-1 ring-cream/10 backdrop-blur transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:hidden ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-[160%] opacity-0"
      }`}
      style={{ bottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      inert={!visible}
    >
      <a href={site.phoneHref} className={`${item} hover:bg-cream/10`}>
        <PhoneIcon />
        Call
      </a>
      <a href={`sms:+1${site.phone}`} className={`${item} hover:bg-cream/10`}>
        <TextIcon />
        Text
      </a>
      <Link href="/free-website-check/" className={`${item} flex-[1.4] bg-orange text-navy`}>
        Free website check
      </Link>
    </nav>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-4 w-4">
      <path
        d="M5.2 2.5h2.3l1.2 3.4-1.6 1.1a9.5 9.5 0 0 0 5.9 5.9l1.1-1.6 3.4 1.2v2.3c0 .9-.7 1.7-1.7 1.7C9.2 16.5 3.5 10.8 3.5 4.2c0-1 .8-1.7 1.7-1.7Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TextIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-4 w-4">
      <path
        d="M3.5 5.5c0-1.1.9-2 2-2h9c1.1 0 2 .9 2 2v6c0 1.1-.9 2-2 2H9l-3.5 3v-3h0c-1.1 0-2-.9-2-2v-6Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
