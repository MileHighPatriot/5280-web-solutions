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

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="reveal group relative">
      <div className="relative overflow-hidden rounded-2xl bg-navy px-[8%] pt-[12%] pb-[7%] ring-1 ring-navy/10 transition-[translate,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1.5 group-hover:shadow-2xl group-hover:shadow-navy/25">
        <div
          aria-hidden="true"
          className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-orange/15 blur-2xl transition-opacity duration-500 group-hover:opacity-100 sm:opacity-60"
        />
        <ConceptBadge className="absolute top-4 left-4 !bg-cream/10" />
        <DeviceShowcase project={project} />
      </div>
      <p className="t-mono mt-5 text-stone">
        {project.industry} · {project.location}
      </p>
      <h3 className="t-h3 mt-2">
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
