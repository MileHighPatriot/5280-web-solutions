import Link from "next/link";
import DeviceShowcase from "@/components/DeviceShowcase";
import type { Project } from "@/data/projects";

export function ConceptBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-navy/85 px-2.5 py-1 font-mono text-[0.65rem] font-medium uppercase tracking-widest text-cream backdrop-blur ${className}`}
    >
      Concept project
    </span>
  );
}

/** Lighthouse scores on the card's frame. The label shortens as the card narrows so it never meets the concept badge. */
function SpeedBadge({ speed }: { speed: NonNullable<Project["speed"]> }) {
  return (
    <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-cream/10 px-2.5 py-1 font-mono text-[0.65rem] font-medium uppercase tracking-widest text-cream backdrop-blur">
      <svg aria-hidden="true" viewBox="0 0 12 12" className="h-3 w-3 text-orange">
        <path fill="currentColor" d="M7 0 1.5 7H6l-1 5 5.5-7H6z" />
      </svg>
      <span className="sr-only">
        PageSpeed {speed.mobile} on phones, {speed.desktop} on desktop
      </span>
      <span aria-hidden="true">
        <span className="hidden @2xs:inline">PageSpeed </span>
        {speed.mobile}
        <span className="hidden @md:inline"> phone</span> · {speed.desktop}
        <span className="hidden @md:inline"> desktop</span>
      </span>
    </span>
  );
}

export default function ProjectCard({ project, large = false }: { project: Project; large?: boolean }) {
  return (
    <article className="reveal group relative">
      <div className="@container relative overflow-hidden rounded-2xl bg-navy px-[8%] pt-[12%] pb-[7%] ring-1 ring-navy/10 transition-[translate,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1.5 group-hover:shadow-2xl group-hover:shadow-navy/25">
        <div
          aria-hidden="true"
          className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-orange/15 blur-2xl transition-opacity duration-500 group-hover:opacity-100 sm:opacity-60"
        />
        <ConceptBadge className="absolute top-4 left-4 !bg-cream/10" />
        {project.speed ? <SpeedBadge speed={project.speed} /> : null}
        <DeviceShowcase
          project={project}
          sizes={large ? "(min-width: 1024px) 640px, (min-width: 640px) 50vw, 100vw" : undefined}
        />
      </div>
      <p className="t-mono mt-5 text-stone">
        {project.featured ? <span className="text-ember">Featured · </span> : null}
        {project.industry} · {project.location}
      </p>
      <h3 className={`mt-2 ${large ? "t-h2" : "t-h3"}`}>
        <Link href={`/work/${project.slug}/`} className="after:absolute after:inset-0">
          {project.name}
        </Link>
      </h3>
      <p className="mt-2 text-[0.975rem] leading-relaxed text-stone">{project.summary}</p>
      <p className="mt-3 text-sm font-bold text-ember">
        Read the case study{" "}
        <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </p>
    </article>
  );
}
