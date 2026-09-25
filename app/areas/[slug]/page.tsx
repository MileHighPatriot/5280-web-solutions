import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Pricing from "@/components/Pricing";
import Button, { Check } from "@/components/ui/Button";
import PageHeader from "@/components/ui/PageHeader";
import { areas } from "@/data/areas";
import { money, tiers } from "@/data/pricing";
import { services } from "@/data/services";
import { site } from "@/data/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return areas.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({ params }: PageProps<"/areas/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const area = areas.find((item) => item.slug === slug);
  if (!area) return {};
  return {
    title: `Web Design in ${area.city}, CO`,
    description: `Professional websites for ${area.city} small businesses, built and hosted by a local Front Range developer. Monthly plans from ${money(tiers[0].monthly)}/mo or a one-time build.`,
    alternates: { canonical: `/areas/${area.slug}/` },
  };
}

export default async function AreaPage({ params }: PageProps<"/areas/[slug]">) {
  const { slug } = await params;
  const area = areas.find((item) => item.slug === slug);
  if (!area) notFound();
  const others = areas.filter((item) => item.slug !== area.slug);

  return (
    <>
      <PageHeader
        eyebrow={`${area.region} · Colorado`}
        title={`Web design for ${area.city} small businesses.`}
        lede={area.intro}
        actions={
          <>
            <Button href="/free-website-check/">Get a free website check</Button>
            <Button href={site.phoneHref} variant="outline-light" arrow={false}>
              Call {site.phoneDisplay}
            </Button>
          </>
        }
      />

      <section className="container-x section-y">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2 className="t-h2">A local developer for {area.city}</h2>
            <p className="t-body mt-5 text-stone">{area.local}</p>
            <h3 className="t-h3 mt-12">What I can do for your {area.city} business</h3>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2">
              {services.map((service) => (
                <li key={service.id} className="rounded-2xl bg-paper p-5 ring-1 ring-navy/10">
                  <Link href={`/services/#${service.id}`} className="font-bold hover:text-ember">
                    {service.title}
                  </Link>
                  <p className="mt-1.5 text-sm leading-relaxed text-stone">{service.short}</p>
                </li>
              ))}
            </ul>
          </div>
          <aside className="grid content-start gap-4 lg:col-span-5">
            <div className="rounded-2xl bg-navy p-7 text-cream">
              <h2 className="t-mono text-mist">Common {area.city} clients</h2>
              <ul className="mt-4 grid gap-2.5">
                {area.industries.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <Check className="mt-0.5 text-orange" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-paper p-7 ring-1 ring-navy/10">
              <h2 className="t-mono text-stone">Also serving</h2>
              <p className="mt-3 leading-relaxed">{area.nearby.join(" · ")}</p>
            </div>
          </aside>
        </div>
      </section>

      <section aria-label="Pricing" className="border-t border-navy/10 bg-paper/60">
        <div className="container-x section-y">
          <Pricing />
        </div>
      </section>

      <nav aria-label="Other service areas" className="container-x py-14">
        <p className="t-mono text-stone">Other areas I serve</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {others.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/areas/${item.slug}/`}
                className="inline-flex rounded-full bg-paper px-4 py-2 text-sm font-semibold ring-1 ring-navy/10 hover:ring-orange"
              >
                {item.city}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
