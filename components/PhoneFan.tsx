import Image from "next/image";
import type { Project } from "@/data/projects";

const fan = [
  { rotate: "-10deg", y: "1.75rem", z: 1 },
  { rotate: "-3.5deg", y: "0rem", z: 3 },
  { rotate: "3.5deg", y: "0rem", z: 4 },
  { rotate: "10deg", y: "1.75rem", z: 2 },
];

/** The listed concept sites as a fanned hand of phones for the orange Work header. */
export default function PhoneFan({ projects }: { projects: Project[] }) {
  return (
    <div className="mx-auto flex w-full max-w-[34rem] items-center justify-center py-6" aria-hidden="true">
      {projects.slice(0, 4).map((project, index) => {
        const { rotate, y, z } = fan[index];
        return (
          <div
            key={project.slug}
            className="-mx-[4%] w-[30%] shrink-0 rounded-[1.5rem] bg-[#0b1117] p-[2%] shadow-[0_40px_70px_-25px_rgba(0,24,51,0.8)] ring-1 ring-white/15 transition-[translate] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-4"
            style={{ rotate, marginTop: y, zIndex: z }}
          >
            <Image
              src={project.images.mobile}
              alt=""
              width={600}
              height={1298}
              sizes="(min-width: 1024px) 160px, 30vw"
              className="aspect-[9/19] w-full rounded-[1.15rem] object-cover object-top"
            />
          </div>
        );
      })}
    </div>
  );
}
