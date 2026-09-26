import { Arrow } from "@/components/ui/Button";
import { site } from "@/data/site";

/** Cal.com page for the 20-minute intro call, or null until site.calLink is set. */
export const bookingUrl = site.calLink ? `https://cal.com/${site.calLink}` : null;

/** "Book a call" card for the contact page. Renders nothing until a Cal.com link is configured. */
export function BookCallCard() {
  if (!bookingUrl) return null;
  return (
    <a
      href={bookingUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group rounded-2xl bg-orange p-6 text-navy transition-colors hover:bg-orange-soft"
    >
      <p className="t-mono text-navy/70">Skip the back-and-forth</p>
      <p className="mt-2 flex items-center gap-2.5 text-xl font-bold sm:text-2xl">
        Book a 20-minute call
        <Arrow className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
      </p>
      <p className="mt-1 text-navy/80">Pick a time that works for you. Opens our calendar in a new tab.</p>
    </a>
  );
}

/** One-line "prefer to talk?" prompt that offers booking when available, otherwise call or text. */
export function TalkLine({ className = "" }: { className?: string }) {
  const link = "font-semibold text-navy underline underline-offset-4";
  return (
    <p className={`text-sm text-stone ${className}`}>
      Prefer to talk?{" "}
      {bookingUrl ? (
        <>
          <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className={link}>
            Book a 20-minute call
          </a>
          , or call or text{" "}
        </>
      ) : (
        "Call or text "
      )}
      <a href={site.phoneHref} className={link}>
        {site.phoneDisplay}
      </a>
      .
    </p>
  );
}
