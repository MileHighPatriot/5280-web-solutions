import type { Metadata } from "next";
import Faq, { faqJsonLd } from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import Button from "@/components/ui/Button";
import PageHeader from "@/components/ui/PageHeader";
import { generalFaq, pricingFaq } from "@/data/faq";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about websites, pricing, setup fees, timelines, ownership, and Google for Front Range small businesses.",
  alternates: { canonical: "/faq/" },
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqJsonLd([...generalFaq, ...pricingFaq])} />
      <PageHeader
        backdrop="numerals"
        eyebrow="FAQ"
        title="Questions, answered."
        lede={`Can't find what you're looking for? Call or text ${site.phoneDisplay} and ask us directly.`}
      />

      <div className="container-x section-y grid gap-16">
        <section aria-labelledby="general" className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <h2 id="general" className="t-h2 lg:col-span-4">
            Working together
          </h2>
          <div className="lg:col-span-8">
            <Faq items={generalFaq} />
          </div>
        </section>
        <section aria-labelledby="pricing-questions" className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <h2 id="pricing-questions" className="t-h2">
              Pricing &amp; plans
            </h2>
            <Button href="/pricing/" variant="dark" className="mt-6">
              See pricing
            </Button>
          </div>
          <div className="lg:col-span-8">
            <Faq items={pricingFaq} />
          </div>
        </section>
      </div>
    </>
  );
}
