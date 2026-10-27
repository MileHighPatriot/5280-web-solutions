import Link from "next/link";
import Faq, { faqJsonLd } from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import Button from "@/components/ui/Button";
import type { FaqItem } from "@/data/faq";
import { site } from "@/data/site";

/**
 * Pieces shared by the trade landing pages (/industries/hvac/, /industries/roofing/). These pages
 * live outside data/industries.ts on purpose: reachable by URL and the sitemap, not from the hub or menus.
 */

export type TradeCard = { title: string; body: string };

/** An FAQ answer can link one phrase inside it; the plain answer text is also the JSON-LD text. */
export type TradeFaqItem = FaqItem & { link?: { text: string; href: string } };

/** Report button plus call button, for the hero and the closing block. */
export function TradeActions({ dark = false }: { dark?: boolean }) {
  return (
    <div className="flex flex-wrap gap-3">
      <Button href="/free-website-check/">Get my free website report</Button>
      <Button href={site.phoneHref} variant={dark ? "outline-light" : "outline"} arrow={false}>
        {`Or call ${site.phoneDisplay}`}
      </Button>
    </div>
  );
}

const cols = { 3: "md:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" };

/** Card grid: bold title, then the body. `numbered` makes it an ordered list of steps. */
export function TradeCards({
  cards,
  columns = 3,
  numbered = false,
  dark = false,
  className = "mt-10",
}: {
  cards: TradeCard[];
  columns?: 3 | 4;
  numbered?: boolean;
  dark?: boolean;
  className?: string;
}) {
  const List = numbered ? "ol" : "ul";
  return (
    <List className={`grid gap-5 ${cols[columns]} ${className}`}>
      {cards.map((card, i) => (
        <li
          key={card.title}
          className={`reveal rounded-2xl p-7 ${dark ? "bg-navy-2 ring-1 ring-cream/10" : "bg-paper ring-1 ring-navy/10"}`}
        >
          {numbered ? <p className="font-mono text-sm font-medium text-ember">0{i + 1}</p> : null}
          <h3 className={`t-h3 ${numbered ? "mt-3" : ""}`}>{card.title}</h3>
          <p className={`mt-3 leading-relaxed ${dark ? "text-mist" : "text-stone"}`}>{card.body}</p>
        </li>
      ))}
    </List>
  );
}

/** Same on every trade page. */
export function TradeIncludes() {
  return (
    <section aria-labelledby="includes" className="border-y border-navy/10 bg-paper/60">
      <div className="container-x section-y">
        <h2 id="includes" className="t-h2 text-balance">
          What every site includes
        </h2>
        <TradeCards
          columns={4}
          cards={[
            { title: "Click-to-call and a contact form.", body: "People can reach you the way they want." },
            { title: "Works on phones first.", body: "Looks right on phones, tablets, and desktops." },
            { title: "Basic on-page SEO.", body: "Set up so Google can find you." },
            { title: "Hosting, security, and updates.", body: "I keep it online, secure, and up to date." },
          ]}
        />
      </div>
    </section>
  );
}

/** Same on every trade page. */
export function TradeSteps() {
  return (
    <section aria-labelledby="how-it-works" className="container-x section-y">
      <h2 id="how-it-works" className="t-h2 text-balance">
        How it works
      </h2>
      <TradeCards
        numbered
        cards={[
          {
            title: "Free full website report.",
            body: "I look at what you have (or don't) and send you honest notes.",
          },
          { title: "A quick 15-20 minute call.", body: "We go over the report together. No pressure." },
          {
            title: "Build and launch.",
            body: "I build it, you approve it before it goes live, and I take care of it after.",
          },
        ]}
      />
    </section>
  );
}

/** components/Faq plus FAQPage JSON-LD built from the same words. */
export function TradeFaq({ items }: { items: TradeFaqItem[] }) {
  const visible = items.map(({ question, answer, link }) => {
    if (!link) return { question, answer };
    const [before, after] = answer.split(link.text);
    return {
      question,
      // Faq types answers as strings because the /faq/ page feeds them to JSON-LD. Here the schema
      // gets the plain string below, so the visible copy can carry the link.
      answer: (
        <>
          {before}
          {/* Vertical padding on an inline link grows its tap area to 44px without moving the lines. */}
          <Link href={link.href} className="py-3 font-semibold text-ember underline underline-offset-2 hover:text-navy">
            {link.text}
          </Link>
          {after}
        </>
      ) as unknown as string,
    };
  });

  return (
    <section aria-label="FAQ" className="container-x section-y">
      <JsonLd data={faqJsonLd(items.map(({ question, answer }) => ({ question, answer })))} />
      <div className="mx-auto max-w-4xl">
        <Faq items={visible} />
      </div>
    </section>
  );
}

/** Closing call to action, just above the site footer. */
export function TradeCta({ title, line }: { title: string; line: string }) {
  return (
    <section aria-labelledby="trade-cta" className="container-x pb-20 sm:pb-28">
      <div className="rounded-3xl bg-navy p-8 text-cream sm:p-12">
        <h2 id="trade-cta" className="t-h2 text-balance">
          {title}
        </h2>
        <p className="t-lede mt-4 max-w-2xl text-pretty text-mist">{line}</p>
        <div className="mt-8">
          <TradeActions dark />
        </div>
      </div>
    </section>
  );
}

/**
 * Phone-only call bar, pinned from first paint (the global MobileBar waits for a scroll, and is
 * switched off on these pages in its hiddenOn list). z-40 keeps it under the header's phone menu.
 * The footer's own pb-24 on phones leaves room for it at the end of the page.
 */
export function TradeCallBar() {
  return (
    <nav
      aria-label="Quick contact"
      className="fixed inset-x-3 z-40 flex gap-1.5 max-[359px]:inset-x-2 rounded-full bg-navy/95 p-1.5 text-cream shadow-[0_10px_30px_rgba(0,34,68,0.35)] ring-1 ring-cream/10 backdrop-blur sm:hidden"
      style={{ bottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <a
        href={site.phoneHref}
        className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-orange px-3 text-[0.95rem] font-bold whitespace-nowrap text-navy max-[359px]:px-2.5 max-[359px]:text-[0.8125rem]"
      >
        <PhoneIcon />
        {`Tap to call ${site.phoneDisplay}`}
      </a>
      <Link
        href="/free-website-check/"
        className="flex min-h-12 shrink-0 items-center justify-center rounded-full px-3.5 text-sm font-bold whitespace-nowrap ring-1 ring-cream/25 hover:bg-cream/10 max-[359px]:px-2.5 max-[359px]:text-[0.8rem]"
      >
        Free report
      </Link>
    </nav>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-4 w-4 shrink-0 max-[359px]:hidden">
      <path
        d="M5.2 2.5h2.3l1.2 3.4-1.6 1.1a9.5 9.5 0 0 0 5.9 5.9l1.1-1.6 3.4 1.2v2.3c0 .9-.7 1.7-1.7 1.7C9.2 16.5 3.5 10.8 3.5 4.2c0-1 .8-1.7 1.7-1.7Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
