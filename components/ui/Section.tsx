import type { ReactNode } from "react";
import Decode from "@/components/ui/Decode";

/** Monospace label with the orange tick, echoing "elev. 5,280 ft" on the card. */
export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`t-mono flex items-center gap-3 ${className}`}>
      <span aria-hidden="true" className="h-0.5 w-6 rounded-full bg-orange" />
      <span>{typeof children === "string" ? <Decode text={children} /> : children}</span>
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  dark = false,
  center = false,
  reveal = true,
  id,
  as: Heading = "h2",
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  dark?: boolean;
  center?: boolean;
  /** Off for headings that can sit above the fold, so they never paint mid-fade. */
  reveal?: boolean;
  id?: string;
  /** h1 when the heading is the page's own title. Looks the same either way. */
  as?: "h1" | "h2";
}) {
  return (
    <div className={`${reveal ? "reveal " : ""}${center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}`}>
      <Eyebrow className={`${dark ? "text-mist" : "text-stone"} ${center ? "justify-center" : ""}`}>
        {eyebrow}
      </Eyebrow>
      <Heading id={id} className="t-h2 mt-5 text-balance">
        {title}
      </Heading>
      {lede ? (
        <p className={`t-lede mt-5 text-pretty ${dark ? "text-mist" : "text-stone"}`}>{lede}</p>
      ) : null}
    </div>
  );
}
