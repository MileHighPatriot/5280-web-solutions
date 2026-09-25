import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Pricing from "@/components/Pricing";
import ProjectCard from "@/components/ProjectCard";
import Backdrop, { type BackdropVariant } from "@/components/ui/Backdrop";
import Button, { Check, Dash } from "@/components/ui/Button";
import PageHeader from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/Section";
import { industries } from "@/data/industries";
import { money, tiers } from "@/data/pricing";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({ params }: PageProps<"/industries/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const industry = industries.find((item) => item.slug === slug);
  if (!industry) return {};
  return {
    title: `Websites for ${industry.label} in Colorado`,
    description: `Custom websites for Front Range ${industry.audience}, built and cared for by a local developer. ${industry.intro.split(". ")[0]}. Plans from ${money(tiers[0].monthly)}/mo.`,
    alternates: { canonical: `/industries/${industry.slug}/` },
  };
}

// Each industry header gets different art, so the pages don't all look alike.
const headerArt: { backdrop: BackdropVariant; seed?: number }[] = [
  { backdrop: "numerals" },
  { backdrop: "topo", seed: 17 },
  { backdrop: "logo" },
  { backdrop: "topo", seed: 23 },
];

export default async function IndustryPage({ params }: PageProps<"/industries/[slug]">) {
  const { slug } = await params;
  const index = industries.findIndex((item) => item.slug === slug);
  if (index === -1) notFound();
  const industry = industries[index];
  const art = headerArt[index % headerArt.length];
  const tier = tiers.find((item) => item.id === industry.fit.tier)!;
  const showcase = projects.filter((project) => industry.projects.includes(project.slug));
  const others = industries.filter((item) => item.slug !== industry.slug);

  return (
    <>
      <PageHeader
        backdrop={art.backdrop}
        seed={art.seed}
        eyebrow={`Websites for ${industry.audience}`}
        title={industry.title}
        lede={industry.intro}
        actions={
          <>
            <Button href="/free-website-check/">Get a free website check</Button>
            <Button href={site.phoneHref} variant="outline-light" arrow={false}>
              Call {site.phoneDisplay}
            </Button>
          </>
        }
      />

      <section aria-labelledby="needs" className="container-x section-y">
        <SectionHeading
          id="needs"
          eyebrow="What your customers want"
          title="Built around how your customers decide."
          lede="Every site I build starts with what the people visiting it are actually trying to do."
        />
        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {industry.customerNeeds.map((need, i) => (
            <li key={need.title} className="reveal rounded-2xl bg-paper p-7 ring-1 ring-navy/10">
              <p className="font-mono text-sm font-medium text-ember">0{i + 1}</p>
              <h3 className="t-h3 mt-3">{need.title}</h3>
              <p className="mt-3 leading-relaxed text-stone">{need.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <div className="relative isolate overflow-clip border-y border-navy/10 bg-paper">
        <Backdrop variant="ridge" />
        <section aria-labelledby="included" className="container-x section-y">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="rounded-3xl bg-navy p-8 text-cream sm:p-10 lg:col-span-7">
              <h2 id="included" className="t-h3">
                What I build into your site
              </h2>
              <ul className="mt-6 grid gap-3.5 sm:grid-cols-2">
                {industry.mustHaves.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <Check className="mt-0.5 text-orange" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-8 border-t border-cream/10 pt-6 text-mist">
                Plus everything every site gets: fast loading, built for phones, set up for Google, and a local
                developer who answers the phone.
              </p>
            </div>
            <div className="lg:col-span-5">
              <h2 className="t-h3">Problems I fix all the time</h2>
              <ul className="mt-6 grid gap-4">
                {industry.problems.map((item) => (
                  <li key={item} className="flex gap-3">
                    <Dash className="mt-0.5 text-ember" />
                    <span className="text-stone">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 rounded-2xl bg-cream p-6 ring-1 ring-navy/10">
                <p className="t-mono text-stone">Usually the right fit</p>
                <p className="mt-2 text-lg font-bold">
                  {tier.name} plan · {money(tier.monthly)}/mo
                </p>
                <p className="mt-1 text-stone">{industry.fit.reason}</p>
                <Link
                  href="/pricing/"
                  className="group mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-ember"
                >
                  Compare plans
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      {showcase.length ? (
        <section aria-labelledby="examples" className="container-x section-y">
          <SectionHeading
            id="examples"
            eyebrow="Examples"
            title={`Sites I've designed for ${industry.audience}.`}
            lede="Concept projects that show the design and features I build. Hover one to scroll through the whole site."
          />
          <div className="mt-14 grid gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {showcase.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>
      ) : null}

      <section aria-label="Pricing" className={showcase.length ? "border-t border-navy/10 bg-paper/60" : ""}>
        <div className="container-x section-y">
          <Pricing />
        </div>
      </section>

      <nav aria-label="Other industries" className="container-x border-t border-navy/10 py-14">
        <p className="t-mono text-stone">I also build websites for</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {others.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/industries/${item.slug}/`}
                className="inline-flex rounded-full bg-paper px-4 py-2 text-sm font-semibold ring-1 ring-navy/10 transition-shadow hover:ring-orange"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
