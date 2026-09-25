import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "dark" | "outline" | "outline-light";

const variants: Record<Variant, string> = {
  primary:
    "bg-orange text-navy shadow-[0_8px_24px_-12px_rgba(251,79,20,0.7)] hover:bg-orange-soft hover:shadow-[0_14px_34px_-10px_rgba(251,79,20,0.75)]",
  dark: "bg-navy text-cream hover:bg-navy-3",
  outline: "border-2 border-navy/20 text-navy hover:border-navy",
  "outline-light": "border-2 border-cream/30 text-cream hover:border-cream",
};

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  arrow?: boolean;
};

export default function Button({ href, children, variant = "primary", className = "", arrow = true }: ButtonProps) {
  const classes = `group inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3.5 text-[0.95rem] font-bold transition-[background-color,border-color,color,box-shadow] duration-200 ${variants[variant]} ${className}`;
  const content = (
    <>
      {children}
      {arrow ? <Arrow className="transition-transform duration-300 group-hover:translate-x-0.5" /> : null}
    </>
  );

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <a href={href} className={classes}>
      {content}
    </a>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={`h-4 w-4 shrink-0 ${className}`}>
      <path
        d="M1.5 8h12M9 3.5 13.5 8 9 12.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Check({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={`h-5 w-5 shrink-0 ${className}`}>
      <path
        d="m5 10.5 3.2 3L15 6.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Dash({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={`h-5 w-5 shrink-0 ${className}`}>
      <path d="M6 10h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
