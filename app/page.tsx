import type { Metadata } from "next";
import Link from "next/link";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import BuildStory from "@/components/BuildStory";
import ElevationGauge from "@/components/ElevationGauge";
import FeaturedShowcase from "@/components/FeaturedShowcase";
import FounderCard from "@/components/FounderCard";
import HeroPhoto from "@/components/HeroPhoto";
import PricingPreview from "@/components/PricingPreview";
import Readouts from "@/components/Readouts";
import ServicePanels from "@/components/ServicePanels";
import Ticker from "@/components/Ticker";
import WorkReel from "@/components/WorkReel";
import Backdrop from "@/components/ui/Backdrop";
import Blueprint from "@/components/ui/Blueprint";
import Button from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/Section";
import { featuredProject, listedProjects } from "@/data/projects";
import { site } from "@/data/site";
import { pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta({
  title: {
    absolute: "Denver Web Design for Small Businesses | 5280 Web Solutions",
  },
  description:
    "Websites for Denver and Front Range small businesses, built and looked after by a local developer. Plans from $75/mo or a one-time build you own outright.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <ElevationGauge />
      <HeroPhoto />
      <Readouts />
      <Ticker />
      <FeaturedShowcase project={featuredProject} />

      {/* Pointer to the blueprint tool, which lives on its own page */}
      <div className="border-b border-cream/10 bg-navy-ink">
        <p className="container-x py-5 text-sm text-mist sm:text-base">
          Curious what your site would need?{" "}
          <Link
            href="/blueprint/"
            className="group inline-flex min-h-11 items-center gap-1 font-bold text-orange-soft"
          >
            <span>
              Try the <span className="whitespace-nowrap">10-second</span>{" "}
              website blueprint
            </span>
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </p>
      </div>

      {/* Work: every concept site in one reel */}
      <section
        aria-labelledby="work"
        className="lit-right relative isolate overflow-clip bg-navy text-cream"
      >
        <Backdrop variant="topo" seed={2} dark />
        <div className="container-x section-y">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              id="work"
              dark
              eyebrow={`Recent work · ${listedProjects.length} concept sites`}
              title={
                <>
                  Every business is different.
                  <span className="block text-orange">So is every site.</span>
                </>
              }
              lede="Each one is designed from scratch for a different kind of local business, and every one loads fast on a phone."
            />
            <Button
              href="/work/"
              variant="outline-light"
              className="self-start lg:self-auto"
            >
              All work
            </Button>
          </div>
          <div className="mt-12">
            <WorkReel projects={listedProjects} />
          </div>
        </div>
      </section>

      <BuildStory />

      {/* Services */}
      <section
        aria-labelledby="services"
        data-glow
        className="lit-left relative isolate overflow-clip bg-navy-ink text-cream"
      >
        <Blueprint />
        <Backdrop variant="numerals" dark />
        <div className="container-x section-y">
          <div className="reveal grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-16">
            <div className="lg:col-span-7">
              <p className="t-mono flex items-center gap-3 text-mist">
                <span
                  aria-hidden="true"
                  className="h-0.5 w-6 rounded-full bg-orange"
                />
                What we do
              </p>
              <h2 id="services" className="t-h2 mt-5 text-balance">
                Everything your business needs{" "}
                <span className="text-orange">online.</span>
              </h2>
            </div>
            <p className="t-lede text-pretty text-mist lg:col-span-5">
              One local developer handles it all, from the first design to every
              update after launch.
            </p>
          </div>
          <div className="mt-12">
            <ServicePanels />
          </div>
        </div>
      </section>

      {/* Before / after */}
      <div className="lit-right relative isolate overflow-clip bg-navy text-cream">
        <Backdrop variant="logo" dark />
        <section
          aria-labelledby="before-after"
          className="container-x section-y"
        >
          <SectionHeading
            id="before-after"
            dark
            eyebrow="Redesigns"
            title={
              <>
                Same business. A website that{" "}
                <span className="text-orange">finally shows it.</span>
              </>
            }
            lede="Drag the handle to compare. A redesign keeps your name, domain, and Google rankings, and fixes everything else."
          />
          <div className="reveal mt-12">
            <BeforeAfterSlider />
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
            {/* A plain link: the demo is a static page outside the app, so it needs a full page load. */}
            <a
              href="/joes-carwash/"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-cream/[0.08] px-5 py-2.5 text-sm font-semibold text-cream ring-1 ring-cream/20 transition hover:bg-orange hover:text-navy hover:ring-orange"
            >
              See the full Joe&rsquo;s CarWash page{" "}
              <span aria-hidden="true">→</span>
            </a>
            <p className="max-w-xl text-xs text-mist">
              Illustration of a typical redesign; Joe&rsquo;s CarWash is not a
              real business. Photo: 4300streetcar,{" "}
              <a
                href="https://creativecommons.org/licenses/by/4.0/"
                className="underline underline-offset-2"
              >
                CC BY 4.0
              </a>
              , via Wikimedia Commons, recoloured.
            </p>
          </div>
        </section>
      </div>

      {/* Pricing preview */}
      <section
        aria-labelledby="pricing-preview"
        data-glow
        className="lit-left relative isolate overflow-clip bg-navy-ink text-cream"
      >
        <Blueprint className="[mask-image:radial-gradient(ellipse_70%_80%_at_15%_50%,black_20%,transparent_75%)]" />
        <div className="container-x section-y">
          <PricingPreview />

          {/* Referral program. Approved wording: change it only with Kohlton's sign-off. */}
          <div
            id="referrals"
            className="reveal mt-12 grid scroll-mt-24 gap-5 rounded-2xl bg-cream/[0.06] p-6 ring-1 ring-cream/10 sm:p-8 lg:grid-cols-12 lg:gap-16"
          >
            <h3 className="t-h3 text-balance lg:col-span-5">
              Send someone my way, and{" "}
              <span className="text-orange">your next month&apos;s on me.</span>
            </h3>
            <div className="lg:col-span-7">
              <p className="text-mist">
                If you&apos;re a client and you send me another business,
                I&apos;ll take one month of your plan off your next invoice once
                their site is live and they&apos;ve paid their first monthly
                bill. It&apos;s a credit, not a check. Your own invoices just
                need to be current. That&apos;s it.
              </p>
              <p className="mt-4 text-sm text-mist">
                Fine print: Credit is one month of your own plan, up to 12 a
                year. Doesn&apos;t count for yourself or anyone who&apos;s
                already a client. Never paid out as cash, and unused credits end
                if you cancel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <div className="lit-right relative isolate overflow-clip bg-navy text-cream">
        <Backdrop variant="ridge" dark />
        <section aria-labelledby="about" className="container-x section-y">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
            <div className="reveal mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
              <FounderCard />
            </div>
            <div className="lg:col-span-7">
              <SectionHeading
                id="about"
                dark
                eyebrow="Who you'll work with"
                title={
                  <>
                    One local developer,{" "}
                    <span className="text-orange">start to finish.</span>
                  </>
                }
                lede="No account managers, no offshore handoffs, no call centers. When you work with 5280 Web Solutions, you work directly with the developer who builds your site, from the first call to every update after launch."
              />
              <figure className="reveal mt-6 max-w-2xl border-l-2 border-orange pl-5">
                <blockquote className="text-lg leading-relaxed text-cream">
                  &ldquo;I&rsquo;ve been framing houses around Denver for about
                  12 years, and I ran my own crew for a couple of those, so I
                  know what it&rsquo;s like when nobody else is covering the
                  phone. That&rsquo;s what I build for you: a site that works,
                  and one person who picks up when you call.&rdquo;
                </blockquote>
                <figcaption className="t-mono mt-3 text-mist">
                  {site.founder}, founder
                </figcaption>
              </figure>
              <div className="reveal mt-10 flex flex-wrap gap-3">
                <Button href="/about/">Meet the founder</Button>
                <Button href="/contact/" variant="outline-light">
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
