import type { Metadata } from "next";
import Link from "next/link";
import HeaderDevices from "@/components/HeaderDevices";
import LaunchLog from "@/components/LaunchLog";
import Backdrop from "@/components/ui/Backdrop";
import Button, { Check } from "@/components/ui/Button";
import PageHeader from "@/components/ui/PageHeader";
import { Eyebrow, SectionHeading } from "@/components/ui/Section";
import { industries } from "@/data/industries";
import { featuredProject, projects } from "@/data/projects";
import { everyBuild } from "@/data/pricing";
import { services, steps } from "@/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "New websites, redesigns, hosting and care, and Google Business Profile setup for Front Range small businesses. Built phone-first by a local developer.",
  alternates: { canonical: "/services/" },
};

const headgate = projects.find((project) => project.slug === "headgate-plumbing")!;

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        tone="orange"
        into="navy"
        visual={<HeaderDevices laptop={featuredProject} phone={headgate} />}
        eyebrow="Services · Four ways we help"
        title="Built, hosted, and found."
        lede="New sites, redesigns, hosting, and getting found on Google, all handled by one local developer who explains things in plain English."
        actions={
          <>
            <Button href="/free-website-check/" variant="dark">
              Get a free full website report
            </Button>
            <Button href="/pricing/" variant="outline-ink">
              See pricing
            </Button>
          </>
        }
      />

      {services.map((service, index) => {
        const dark = index % 2 === 0;
        return (
          <section
            key={service.id}
            id={service.id}
            aria-labelledby={`${service.id}-title`}
            className={dark ? "bg-navy text-cream" : "bg-cream text-navy"}
          >
            <div className={`${index > 0 ? "reveal " : ""}container-x grid gap-8 py-16 sm:py-24 lg:grid-cols-12 lg:gap-12`}>
              <p
                aria-hidden="true"
                className={`t-display text-[clamp(4.5rem,8vw,7rem)] leading-[0.8] lg:col-span-3 ${
                  dark ? "text-orange" : "text-transparent [-webkit-text-stroke:2px_var(--color-navy)]"
                }`}
              >
                0{index + 1}
              </p>
              <div className="lg:col-span-4">
                <h2 id={`${service.id}-title`} className="t-h2">
                  {service.title}
                </h2>
                <p className={`t-lede mt-5 text-pretty ${dark ? "text-mist" : "text-stone"}`}>{service.short}</p>
              </div>
              <div className="lg:col-span-5">
                <p className={`t-body ${dark ? "text-cream/85" : ""}`}>{service.body}</p>
                <ul className="mt-8 grid gap-4">
                  {service.points.map((point) => (
                    <li key={point} className="flex gap-3.5">
                      <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 bg-orange" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        );
      })}

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

      <div className="relative isolate overflow-clip">
        <Backdrop variant="ridge" />
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

          <div className="mt-20 grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Eyebrow className="text-stone">Launch day</Eyebrow>
              <h2 className="t-h2 mt-5 text-balance">
                Nothing goes live <span className="text-orange">unchecked.</span>
              </h2>
              <p className="t-lede mt-5 text-pretty text-stone">
                Before your site launches, we run the same checklist every time, so the first customer who finds you gets
                a site that works.
              </p>
            </div>
            <div className="reveal lg:col-span-7">
              <LaunchLog />
            </div>
          </div>

          <div className="mt-20 rounded-3xl bg-paper p-8 ring-1 ring-navy/10 sm:p-12">
            <h2 className="t-h3">Built for businesses like yours</h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {industries.map((industry) => (
                <li key={industry.slug}>
                  <Link
                    href={`/industries/${industry.slug}/`}
                    className="group inline-flex gap-1.5 rounded-full bg-cream px-4 py-2 text-sm font-semibold ring-1 ring-navy/10 transition-shadow hover:ring-2 hover:ring-orange"
                  >
                    {industry.label}
                    <span aria-hidden="true" className="text-orange transition-transform group-hover:translate-x-0.5">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-2xl text-stone">
              Don&rsquo;t see your industry? If you serve customers on the Front Range, we can help.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
