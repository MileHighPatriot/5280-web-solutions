import type { FaqItem } from "@/data/faq";

/** Accessible FAQ list on native <details>, so it needs no JavaScript. */
export default function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="border-t border-navy/15">
      {items.map((item) => (
        <details key={item.question} className="group border-b border-navy/15">
          <summary className="flex cursor-pointer items-center justify-between gap-6 py-5 text-left sm:py-6">
            <h3 className="t-h3">{item.question}</h3>
            <span
              aria-hidden="true"
              className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-navy/15 transition-colors group-open:border-orange group-open:bg-orange"
            >
              <span className="absolute h-0.5 w-3.5 rounded bg-current" />
              <span className="faq-icon-v absolute h-3.5 w-0.5 rounded bg-current transition-transform duration-300" />
            </span>
          </summary>
          <p className="t-body max-w-3xl pb-6 text-stone">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

export function faqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
