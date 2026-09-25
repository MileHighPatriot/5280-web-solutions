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
  id,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  dark?: boolean;
  center?: boolean;
  id?: string;
}) {
  return (
    <div className={`reveal ${center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}`}>
      <Eyebrow className={`${dark ? "text-mist" : "text-stone"} ${center ? "justify-center" : ""}`}>
        {eyebrow}
      </Eyebrow>
      <h2 id={id} className="t-h2 mt-5 text-balance">
        {title}
      </h2>
      {lede ? (
        <p className={`t-lede mt-5 text-pretty ${dark ? "text-mist" : "text-stone"}`}>{lede}</p>
      ) : null}
    </div>
  );
}
