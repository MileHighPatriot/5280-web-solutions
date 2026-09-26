import type { Metadata } from "next";
import Link from "next/link";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import FounderCard from "@/components/FounderCard";
import HeroPhoto from "@/components/HeroPhoto";
import PricingPreview from "@/components/PricingPreview";
import ProjectCard from "@/components/ProjectCard";
import Readouts from "@/components/Readouts";
import ServiceIcon from "@/components/ServiceIcon";
import Backdrop from "@/components/ui/Backdrop";
import Blueprint from "@/components/ui/Blueprint";
import Button from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/Section";
import { projects } from "@/data/projects";
import { services } from "@/data/services";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <HeroPhoto />
      <Readouts />

      {/* Work */}
      <div className="relative isolate overflow-clip">
        <Backdrop variant="topo" seed={2} />
        <section aria-labelledby="work" className="container-x section-y">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              id="work"
              eyebrow="Recent work"
              title={
                <>
                  Sites built to <span className="text-orange">win the job.</span>
                </>
              }
              lede="Hover a project to scroll through the whole site. These are concept projects; real client work is added as it launches."
            />
            <Button href="/work/" variant="outline" className="self-start lg:self-auto">
              All work
            </Button>
          </div>
          <div className="mt-14 grid gap-12 sm:grid-cols-2 lg:gap-10">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>
      </div>

      {/* Services */}
      <section aria-labelledby="services" data-glow className="relative isolate overflow-clip bg-navy text-cream">
        <Blueprint />
        <Backdrop variant="numerals" dark />
        <div className="container-x section-y">
          <SectionHeading
            id="services"
            dark
            eyebrow="What I do"
            title={
              <>
                Everything your business needs <span className="text-orange">online.</span>
              </>
            }
            lede="One local developer handles it all, from the first design to every update after launch."
          />
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, i) => (
              <Link
                key={service.id}
                href={`/services/#${service.id}`}
                data-glow
                className="glow-card reveal group relative block rounded-2xl bg-navy-2/80 p-6 [--glow-a:0.16] ring-1 ring-cream/10 backdrop-blur-sm transition-[translate,box-shadow] duration-300 hover:-translate-y-1 hover:ring-orange/70 hover:shadow-[0_18px_40px_-18px_rgba(251,79,20,0.55)]"
              >
                <span className="absolute top-6 right-6 font-mono text-xs text-mist">0{i + 1}</span>
                <ServiceIcon id={service.id} className="h-11 w-11 text-cream" />
                <h3 className="t-h3 mt-5 flex items-center gap-2">
                  {service.title}
                  <span aria-hidden="true" className="text-orange transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </h3>
                <p className="mt-3 leading-relaxed text-mist">{service.short}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Before / after */}
      <div className="relative isolate overflow-clip">
        <Backdrop variant="logo" />
        <section aria-labelledby="before-after" className="container-x section-y">
          <SectionHeading
            id="before-after"
            eyebrow="Redesigns"
            title={
              <>
                Same business. A website that <span className="text-orange">finally shows it.</span>
              </>
            }
            lede="Drag the handle to compare. A redesign keeps your name, domain, and Google rankings, and fixes everything else."
          />
          <div className="reveal mt-12">
            <BeforeAfterSlider />
          </div>
          <p className="mt-5 text-xs text-stone">
            Illustration of a typical redesign; Joe&rsquo;s Car Wash is not a real business. Photo: Visitor7,{" "}
            <a href="https://creativecommons.org/licenses/by-sa/3.0/" className="underline underline-offset-2">
              CC BY-SA 3.0
            </a>
            , via Wikimedia Commons.
          </p>
        </section>
      </div>

      {/* Pricing preview */}
      <section aria-labelledby="pricing-preview" data-glow className="relative isolate overflow-clip bg-navy text-cream">
        <Blueprint className="[mask-image:radial-gradient(ellipse_70%_80%_at_15%_50%,black_20%,transparent_75%)]" />
        <div className="container-x section-y">
          <PricingPreview />
        </div>
      </section>

      {/* About */}
      <div className="relative isolate overflow-clip">
        <Backdrop variant="ridge" />
        <section aria-labelledby="about" className="container-x section-y">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
            <div className="reveal mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
              <FounderCard photo={false} />
            </div>
            <div className="lg:col-span-7">
              <SectionHeading
                id="about"
                eyebrow="Who you'll work with"
                title={
                  <>
                    One local developer, <span className="text-orange">start to finish.</span>
                  </>
                }
                lede="No account managers, no offshore handoffs, no call centers. When you work with 5280 Web Solutions, you work with me, from the first call to every update after launch."
              />
              <div className="reveal mt-10 flex flex-wrap gap-3">
                <Button href="/about/" variant="dark">
                  More about me
                </Button>
                <Button href="/contact/" variant="outline">
                  Get in touch
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
