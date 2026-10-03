import Image from "next/image";
import Button from "@/components/ui/Button";
import WhenNear from "@/components/ui/WhenNear";
import type { Project } from "@/data/projects";

/**
 * Full-bleed orange panel for the featured project: big type, the scores, and a tilted
 * phone whose screen loops through the whole site (pure CSS, the shared .screen-loop).
 * The screenshot is ~180 KB, so WhenNear holds it back until the visitor scrolls close.
 */
export default function FeaturedShowcase({ project }: { project: Project }) {
  const scores = project.speed
    ? [
        { value: project.speed.mobile, label: "Phone speed" },
        { value: project.speed.desktop, label: "Desktop speed" },
        { value: project.speed.accessibility, label: "Accessibility" },
      ]
    : [];

  return (
    <section aria-labelledby="featured-work" className="relative isolate overflow-clip bg-orange text-navy-ink">
      <span
        aria-hidden="true"
        className="t-display pointer-events-none absolute -right-[4vw] -bottom-[5vw] -z-10 text-[34vw] leading-[0.8] text-navy-ink/[0.09] select-none lg:text-[26vw]"
      >
        5280
      </span>

      <div className="container-x section-y grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <p className="t-mono flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="h-2 w-2 bg-navy-ink" aria-hidden="true" />
            Featured work · Concept project
          </p>
          <h2 id="featured-work" className="t-display mt-6 max-w-[13ch] text-balance">
            {project.name}
          </h2>
          <p className="t-lede mt-6 max-w-xl text-pretty">{project.summary}</p>

          {scores.length ? (
            <dl className="mt-10 grid max-w-xl grid-cols-3 border-t-2 border-navy-ink/80">
              {scores.map((score) => (
                <div key={score.label} className="flex flex-col pt-4 pr-4">
                  <dt className="t-mono order-2 mt-1 block text-[0.68rem]">{score.label}</dt>
                  <dd className="font-mono text-4xl font-medium tracking-tight tabular-nums sm:text-5xl">
                    {score.value}
                    <span className="ml-1 text-base">/100</span>
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}
          {project.speed ? (
            <p className="mt-3 text-sm">Google Lighthouse scores for the live site, measured {project.speed.measured}.</p>
          ) : null}

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button href={`/work/${project.slug}/`} variant="dark">
              Read the case study
            </Button>
            <Button href={project.url} variant="outline" className="!border-navy-ink hover:bg-navy-ink hover:text-orange">
              Try the live site
            </Button>
          </div>
        </div>

        <div className="relative mx-auto w-[min(17rem,70%)] lg:col-span-5 lg:w-[19rem]">
          <div className="rotate-[-4deg] rounded-[2.6rem] bg-[#0b1117] p-2.5 shadow-[0_50px_90px_-30px_rgba(0,24,51,0.75)] ring-1 ring-white/15 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:rotate-0">
            <WhenNear className="screen-loop screen-loop-phone aspect-[9/19] rounded-[2rem] bg-navy-3">
              <Image
                src={project.images.fullMobile}
                alt={`The full ${project.name} home page on a phone`}
                width={440}
                height={5866}
                sizes="300px"
                className="w-full"
              />
            </WhenNear>
          </div>
        </div>
      </div>
    </section>
  );
}
