import type { Metadata } from "next";
import ServiceIcon from "@/components/ServiceIcon";
import Button, { Check } from "@/components/ui/Button";
import PageHeader from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/Section";
import { everyBuild } from "@/data/pricing";
import { services, steps, whoIHelp } from "@/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "New websites, redesigns, hosting and care, and Google Business Profile setup for Front Range small businesses. Built phone-first by a local developer.",
  alternates: { canonical: "/services/" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Everything your business needs online."
        lede="New sites, redesigns, hosting, and getting found on Google, all handled by one local developer who explains things in plain English."
        actions={
          <>
            <Button href="/free-website-check/">Get a free website check</Button>
            <Button href="/pricing/" variant="outline-light">
              See pricing
            </Button>
          </>
        }
      />

      <div className="container-x section-y grid gap-16 sm:gap-24">
        {services.map((service, index) => (
          <section
            key={service.id}
            id={service.id}
            aria-labelledby={`${service.id}-title`}
            className="reveal grid gap-8 lg:grid-cols-12 lg:gap-12"
          >
            <div className="lg:col-span-5">
              <div className="flex items-center gap-4">
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-navy text-cream">
                  <ServiceIcon id={service.id} className="h-9 w-9" />
                </span>
                <p className="font-mono text-sm font-medium text-ember">0{index + 1}</p>
              </div>
              <h2 id={`${service.id}-title`} className="t-h2 mt-5">
                {service.title}
              </h2>
              <p className="t-lede mt-5 text-stone">{service.short}</p>
            </div>
            <div className="lg:col-span-7">
              <p className="t-body">{service.body}</p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {service.points.map((point) => (
                  <li key={point} className="flex gap-2.5 rounded-xl bg-paper p-4 ring-1 ring-navy/10">
                    <Check className="mt-0.5 text-ember" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>

      <section aria-labelledby="included" className="bg-navy text-cream">
        <div className="container-x section-y grid gap-12 lg:grid-cols-2">
          <SectionHeading
            id="included"
            dark
            eyebrow="Every website includes"
            title="The essentials, done right, every time."
            lede="Whether you choose a monthly plan or a one-time build, every site starts with the same solid foundation."
          />
          <ul className="grid content-center gap-4">
            {everyBuild.map((item) => (
              <li key={item} className="flex gap-3 text-lg">
                <Check className="mt-1 text-orange" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="how" className="container-x section-y">
        <SectionHeading id="how" eyebrow="How it works" title="Four simple steps." />
        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {steps.map((step) => (
            <li key={step.step} className="relative border-t-2 border-navy pt-6">
              <span className="absolute -top-[7px] left-0 h-3 w-3 rounded-full bg-orange" aria-hidden="true" />
              <p className="font-mono text-sm font-medium text-ember">Step {step.step}</p>
              <h3 className="t-h3 mt-2">{step.title}</h3>
              <p className="mt-3 leading-relaxed text-stone">{step.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-20 rounded-3xl bg-paper p-8 ring-1 ring-navy/10 sm:p-12">
          <h2 className="t-h3">Built for businesses like yours</h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {whoIHelp.map((item) => (
              <li key={item} className="rounded-full bg-cream px-4 py-2 text-sm font-semibold ring-1 ring-navy/10">
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-2xl text-stone">
            Don&rsquo;t see your industry? If you serve customers on the Front Range, I can help.
          </p>
        </div>
      </section>
    </>
  );
}
