import type { Metadata } from "next";
import Link from "next/link";
import AddOns from "@/components/AddOns";
import Faq, { faqJsonLd } from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import PlanFinder from "@/components/PlanFinder";
import Pricing, { ComparisonTable } from "@/components/Pricing";
import Button from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/Section";
import { pricingFaq } from "@/data/faq";
import { money, tiers } from "@/data/pricing";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Pricing",
  description: `Website plans from ${money(tiers[0].monthly)}/month with a small setup fee, or a one-time flat-fee build you own outright. Clear pricing for Front Range small businesses.`,
  alternates: { canonical: "/pricing/" },
};

export default function PricingPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(pricingFaq)} />

      <section className="container-x pt-14 pb-16 sm:pt-20 sm:pb-20">
        <Pricing headingLevel="h1" />
      </section>

      <section aria-labelledby="add-ons" className="container-x pb-16 sm:pb-24">
        <AddOns />
      </section>

      <section id="plan-finder" aria-labelledby="finder" className="container-x pb-16 sm:pb-24">
        <SectionHeading
          id="finder"
          eyebrow="Plan finder"
          title="Not sure which plan? Answer three questions."
          lede="Your recommendation and a cost comparison update as you choose. No email required."
        />
        <div className="mt-10">
          <PlanFinder />
        </div>
      </section>

      <section aria-labelledby="compare" className="border-t border-navy/10 bg-paper/60">
        <div className="container-x section-y">
          <SectionHeading
            id="compare"
            eyebrow="Compare monthly plans"
            title="Every plan side by side"
            lede="All three monthly plans include your custom website build. What changes as you go up is how much ongoing help you get."
          />
          <div className="mt-10">
            <ComparisonTable />
          </div>
        </div>
      </section>

      <section aria-labelledby="pricing-faq" className="container-x section-y">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <SectionHeading
              id="pricing-faq"
              eyebrow="Pricing questions"
              title="The fine print, in plain English"
              lede={
                <>
                  Still unsure which option fits? Call or text{" "}
                  <a href={site.phoneHref} className="font-semibold text-navy underline underline-offset-4">
                    {site.phoneDisplay}
                  </a>{" "}
                  and we&rsquo;ll help you choose.
                </>
              }
            />
            <div className="mt-8">
              <Button href="/contact/?plan=not-sure" variant="dark">
                Help me choose
              </Button>
            </div>
          </div>
          <div className="lg:col-span-8">
            <Faq items={pricingFaq} />
          </div>
        </div>
      </section>
      <section aria-label="Custom projects" className="border-t border-navy/10">
        <div className="container-x py-12 text-center">
          <p className="text-lg text-stone">
            Need something more custom, like online booking, e-commerce, or ad management?{" "}
            <Link href="/contact/" className="font-bold text-ember underline underline-offset-4">
              Let&rsquo;s talk about your specific business.
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
