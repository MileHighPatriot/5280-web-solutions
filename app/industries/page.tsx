import type { Metadata } from "next";
import Link from "next/link";
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
        backdrop="topo"
        seed={31}
        eyebrow="Who we help"
        title="Built for how your business gets customers."
        lede="A restaurant, a church, and a roofer need very different websites. Pick yours to see what we build in and the problems we fix most often."
      />

      <section aria-label="Industries" className="container-x section-y">
        <div className="grid gap-14">
          {industryGroups.map((group, g) => (
            <div key={group.title}>
              <h2 className="t-mono reveal text-stone">{group.title}</h2>
              <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {group.slugs.map((slug, i) => {
                  const industry = industries.find((item) => item.slug === slug)!;
                  // Numbered in reading order down the page.
                  const number = industryGroups.slice(0, g).reduce((sum, prev) => sum + prev.slugs.length, 0) + i + 1;
                  return (
                    <li key={industry.slug} className="reveal">
                      <Link
                        href={`/industries/${industry.slug}/`}
                        data-glow
                        className="glow-card group relative flex h-full flex-col overflow-hidden rounded-2xl bg-paper p-7 ring-1 ring-navy/10 transition-[translate,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/10 hover:ring-orange/60"
                      >
                        <span className="font-mono text-sm font-medium text-ember">{String(number).padStart(2, "0")}</span>
                        <h3 className="t-h3 mt-3">{industry.label}</h3>
                        <p className="mt-3 flex-1 leading-relaxed text-stone">{teaser(industry.intro)}</p>
                        <p className="mt-6 flex items-center gap-1.5 text-sm font-bold text-ember">
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
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-6 rounded-3xl bg-navy p-8 text-cream sm:p-12 lg:flex-row lg:items-center">
          <div>
            <h2 className="t-h3">Don&rsquo;t see your business?</h2>
            <p className="mt-2 max-w-xl text-mist">
              If you serve customers on the Front Range, we can build you a site that brings them in. Tell us what you
              do.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/free-website-check/">Get a free website check</Button>
            <Button href={site.phoneHref} variant="outline-light" arrow={false}>
              Call {site.phoneDisplay}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
