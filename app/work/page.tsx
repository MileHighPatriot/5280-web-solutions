import type { Metadata } from "next";
import ProjectCard from "@/components/ProjectCard";
import Button from "@/components/ui/Button";
import PageHeader from "@/components/ui/PageHeader";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Website projects by 5280 Web Solutions: fast, phone-first sites built to win local customers for Front Range small businesses.",
  alternates: { canonical: "/work/" },
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        backdrop="numerals"
        eyebrow="Work"
        title="Sites built to win the job."
        lede="These concept projects show the design, speed, and features we build into every site. Each is a fictional business, created as a portfolio piece. Real client work is added here as it launches."
      />

      <section className="container-x section-y">
        <h2 className="sr-only">Projects</h2>
        <div className="grid gap-12 sm:grid-cols-2 lg:gap-10">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

        <div className="mt-20 flex flex-col items-start justify-between gap-6 rounded-3xl bg-navy p-8 text-cream sm:p-12 lg:flex-row lg:items-center">
          <div>
            <p className="t-mono text-mist">Now booking founding clients</p>
            <p className="t-h2 mt-3 max-w-[20ch]">Your business could be the next project here.</p>
          </div>
          <Button href="/free-website-check/">Get a free website check</Button>
        </div>
      </section>
    </>
  );
}
