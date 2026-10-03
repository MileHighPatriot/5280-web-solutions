import type { Metadata } from "next";
import Link from "next/link";
import IndustryCount from "@/components/IndustryCount";
import Button from "@/components/ui/Button";
import PageHeader from "@/components/ui/PageHeader";
import { industries, industryGroups } from "@/data/industries";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Industries",
  description: `Websites built for how each business gets customers: contractors, restaurants, churches, nonprofits, salons, gyms, shops, practices, and more on the Front Range.`,
  alternates: { canonical: "/industries/" },
};

/** First sentence of the intro, or the first two when the first is very short. */
function teaser(intro: string) {
  const sentences = intro.split(/(?<=\.)\s+/);
  return sentences[0].length < 50 ? sentences.slice(0, 2).join(" ") : sentences[0];
}

export default function IndustriesPage() {
  return (
    <>
      <PageHeader
        tone="orange"
        into="navy"
        long
        visual={<IndustryCount />}
        eyebrow="Who we help · Front Range"
        title="Built for how your business gets customers."
        lede="A restaurant, a church, and a roofer need very different websites. Pick yours to see what we build in and the problems we fix most often."
      />

      {industryGroups.map((group, g) => {
        const dark = g % 2 === 0;
        return (
          <section
            key={group.title}
            aria-labelledby={`group-${g}`}
            className={dark ? "bg-navy text-cream" : "bg-cream text-navy"}
          >
            <div
              className={`${g > 0 ? "reveal " : ""}container-x grid gap-10 py-16 sm:py-20 lg:grid-cols-12 lg:gap-12`}
            >
              <div className="lg:col-span-3">
                <p
                  aria-hidden="true"
                  className={`t-display text-[clamp(4.5rem,8vw,7rem)] leading-[0.8] ${
                    dark ? "text-orange" : "text-transparent [-webkit-text-stroke:2px_var(--color-navy)]"
                  }`}
                >
                  0{g + 1}
                </p>
                <h2 id={`group-${g}`} className="t-h3 mt-6 max-w-[14ch] text-balance">
                  {group.title}
                </h2>
              </div>
              <ul className="grid gap-5 sm:grid-cols-2 lg:col-span-9 lg:grid-cols-3">
                {group.slugs.map((slug) => {
                  const industry = industries.find((item) => item.slug === slug)!;
                  return (
                    <li key={industry.slug}>
                      <Link
                        href={`/industries/${industry.slug}/`}
                        data-glow
                        className={`glow-card group relative flex h-full flex-col overflow-hidden rounded-2xl p-7 transition-[translate,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-xl ${
                          dark
                            ? "bg-navy-2 ring-1 ring-cream/10 hover:shadow-black/30 hover:ring-orange/60"
                            : "bg-paper ring-1 ring-navy/10 hover:shadow-navy/10 hover:ring-orange/60"
                        }`}
                      >
                        <h3 className="t-h3">{industry.label}</h3>
                        <p className={`mt-3 flex-1 leading-relaxed ${dark ? "text-mist" : "text-stone"}`}>
                          {teaser(industry.intro)}
                        </p>
                        <p
                          className={`mt-6 flex items-center gap-1.5 text-sm font-bold ${
                            dark ? "text-orange-soft" : "text-ember"
                          }`}
                        >
                          Websites for {industry.audience}
                          <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                            →
                          </span>
                        </p>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        );
      })}

      <section aria-labelledby="not-listed" className="container-x pb-20 sm:pb-28">
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-navy p-8 text-cream sm:p-12 lg:flex-row lg:items-center">
          <div>
            <h2 id="not-listed" className="t-h3">Don&rsquo;t see your business?</h2>
            <p className="mt-2 max-w-xl text-mist">
              If you serve customers on the Front Range, we can build you a site that brings them in. Tell us what you
              do.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/free-website-check/">Get a free full website report</Button>
            <Button href={site.phoneHref} variant="outline-light" arrow={false}>
              Call {site.phoneDisplay}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
