import type { Metadata } from "next";
import PhoneFan from "@/components/PhoneFan";
import ProjectCard from "@/components/ProjectCard";
import Button from "@/components/ui/Button";
import PageHeader from "@/components/ui/PageHeader";
import { listedProjects } from "@/data/projects";

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
        tone="orange"
        visual={<PhoneFan projects={listedProjects} />}
        eyebrow={`Work · ${listedProjects.length} concept projects`}
        title="The work, up close."
        lede="These concept projects show the design, speed, and features we build into every site. Each is a fictional business, created as a portfolio piece. Real client work is added here as it launches."
      />

      <section className="container-x section-y">
        <h2 className="sr-only">Projects</h2>
        <div className="grid gap-12 sm:grid-cols-2 lg:gap-10">
          {listedProjects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} reveal={index > 1} />
          ))}
        </div>

        <div className="reveal mt-24 grid items-center gap-8 border-t-2 border-navy pt-12 lg:grid-cols-12 lg:gap-12">
          <p
            aria-hidden="true"
            className="t-display text-[clamp(6rem,14vw,11rem)] leading-[0.8] text-transparent [-webkit-text-stroke:2px_var(--color-navy)] lg:col-span-4"
          >
            0{listedProjects.length + 1}
          </p>
          <div className="lg:col-span-8">
            <p className="t-mono text-stone">Now booking new projects</p>
            <p className="t-h2 mt-4 max-w-[20ch] text-balance">
              Your business could be <span className="text-orange">project 0{listedProjects.length + 1}.</span>
            </p>
            <div className="mt-8">
              <Button href="/free-website-check/">Get a free full website report</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
