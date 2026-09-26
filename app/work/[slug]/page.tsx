import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DeviceShowcase from "@/components/DeviceShowcase";
import { ConceptBadge } from "@/components/ProjectCard";
import Button, { Check } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Section";
import { listedProjects, projects } from "@/data/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};
  return {
    title: `${project.name} (Concept Project)`,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}/` },
  };
}

export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const index = projects.findIndex((item) => item.slug === slug);
  if (index === -1) notFound();
  const project = projects[index];
  // "Next project" cycles through the listed projects; archived pages point to the first one.
  const listed = listedProjects.findIndex((item) => item.slug === slug);
  const next = listedProjects[(listed + 1) % listedProjects.length];

  return (
    <article>
      <header className="bg-navy pt-14 pb-10 text-cream sm:pt-20">
        <div className="container-x">
          <Link href="/work/" className="t-mono text-mist hover:text-cream">
            ← All work
          </Link>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Eyebrow className="text-mist">
              {project.industry} · {project.location}
            </Eyebrow>
            <ConceptBadge className="!bg-orange !text-navy" />
          </div>
          <h1 className="t-h1 mt-5 max-w-[18ch] text-balance">{project.name}</h1>
          <p className="t-lede mt-6 max-w-2xl text-mist">{project.summary}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={project.url}>Visit the live site</Button>
          </div>
        </div>
      </header>

      <div className="bg-navy pb-16 sm:pb-24">
        <div className="container-x">
          <div className="mx-auto max-w-5xl">
            <DeviceShowcase project={project} mode="loop" priority sizes="(min-width: 1024px) 900px, 100vw" />
          </div>
        </div>
      </div>

      <div className="container-x section-y grid gap-14 lg:grid-cols-12 lg:gap-16">
        <section aria-labelledby="goal" className="lg:col-span-7">
          <h2 id="goal" className="t-h2">
            The goal
          </h2>
          <p className="t-body mt-5 text-stone">{project.goal}</p>

          <h2 className="t-h2 mt-14">Design decisions</h2>
          <div className="mt-6 grid gap-4">
            {project.decisions.map((decision) => (
              <div key={decision.title} className="rounded-2xl bg-paper p-6 ring-1 ring-navy/10">
                <h3 className="t-h3">{decision.title}</h3>
                <p className="mt-2 leading-relaxed text-stone">{decision.body}</p>
              </div>
            ))}
          </div>
        </section>

        <aside className="lg:col-span-5">
          <div className="sticky top-28 rounded-2xl bg-navy p-7 text-cream">
            <h2 className="t-mono text-mist">What&rsquo;s built in</h2>
            <ul className="mt-5 grid gap-3">
              {project.features.map((feature) => (
                <li key={feature} className="flex gap-2.5">
                  <Check className="mt-0.5 text-orange" />
                  {feature}
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-cream/10 pt-5 font-mono text-sm text-mist">{project.stack}</p>
            <p className="mt-5 text-sm text-mist">
              A concept project: a fictional business designed as a portfolio piece. Names, people,
              reviews, and contact details on the site are illustrative.
            </p>
          </div>
        </aside>
      </div>

      <nav aria-label="Next project" className="border-t border-navy/10 bg-paper/70">
        <div className="container-x flex flex-col items-start justify-between gap-6 py-14 sm:flex-row sm:items-center">
          <div>
            <p className="t-mono text-stone">Next project</p>
            <Link href={`/work/${next.slug}/`} className="t-h2 mt-2 block hover:text-ember">
              {next.name} →
            </Link>
          </div>
          <Button href="/free-website-check/" variant="dark">
            Start your project
          </Button>
        </div>
      </nav>
    </article>
  );
}
