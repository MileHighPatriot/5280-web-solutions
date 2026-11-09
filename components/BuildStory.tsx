import Image from "next/image";
import { Eyebrow } from "@/components/ui/Section";
import { featuredProject } from "@/data/projects";

/**
 * A scroll-pinned walk through how a site comes together. In browsers with scroll-driven
 * animations the section is three screens tall and its stage sticks, while one browser frame
 * goes from wireframe, to color and type, to the finished page, to the phone version.
 * Everywhere else (and under reduced motion) it's an ordinary section: the four steps as a
 * list beside the finished picture. All of the motion is CSS: see "Build story" in globals.css.
 */
const steps = [
  [
    "Plan",
    "We map the page around what your customers come looking for: what you do, where you work, and how to reach you.",
  ],
  [
    "Design",
    "Your colors, your type, your tone. Drawn from scratch for your business, not poured into a template.",
  ],
  ["Build", "Real words, real photos, and buttons that call, text, or book."],
  [
    "Phone-first",
    "Then we tune it for the phone in your customer's hand, so it loads fast even on a weak signal.",
  ],
];

// Blocks of the page as [left, top, width, height] in percent of the screen, with the fill each
// one gets in the "design" stage. They follow the layout of the finished page that fades in over them.
const blocks: [number, number, number, number, string][] = [
  [0, 0, 100, 6, "#0f3d33"],
  [5, 9, 16, 4, "#0f2e28"],
  [60, 9, 35, 4, "#c7cfcb"],
  [5, 40, 34, 7, "#0f2e28"],
  [5, 49, 26, 7, "#1f7a63"],
  [5, 61, 38, 2.5, "#b7c0bc"],
  [5, 65.5, 32, 2.5, "#b7c0bc"],
  [5, 76, 15, 6, "#0f3d33"],
  [22, 76, 15, 6, "#d4f24a"],
  [55, 22, 28, 38, "#b9a98f"],
  [68, 52, 28, 48, "#0f3d33"],
];

export default function BuildStory() {
  const project = featuredProject;
  return (
    <section
      aria-labelledby="build-story"
      className="build-story relative bg-navy text-cream"
    >
      <div className="build-stage">
        <div className="container-x grid w-full gap-8 py-14 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-5">
            <Eyebrow className="text-mist">How a site comes together</Eyebrow>
            <h2 id="build-story" className="t-h2 mt-5 text-balance">
              Watch a site <span className="text-orange">get built.</span>
            </h2>
            <ol className="build-steps mt-7 grid gap-6 sm:grid-cols-2 lg:mt-9">
              {steps.map(([title, body], i) => (
                <li key={title} className={`build-step build-step-${i + 1}`}>
                  <span className="t-mono text-orange-soft">Step 0{i + 1}</span>
                  <span className="t-h3 mt-1.5 block">{title}</span>
                  <span className="mt-2 block max-w-md text-mist">{body}</span>
                </li>
              ))}
            </ol>
            <div
              aria-hidden="true"
              className="build-rail mt-7 h-0.5 overflow-hidden rounded-full bg-cream/15"
            >
              <span className="build-rail-fill block h-full origin-left bg-orange" />
            </div>
          </div>

          <div aria-hidden="true" className="lg:col-span-7">
            <div className="relative mx-auto max-w-xl pr-[9%] pb-[7%] lg:max-w-none">
              <div className="overflow-hidden rounded-2xl bg-navy-2 shadow-[0_40px_90px_-30px_rgba(251,79,20,0.35)] ring-1 ring-cream/15">
                <div className="flex items-center gap-3 px-4 py-2.5">
                  <span className="flex gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-cream/25" />
                    <span className="h-2 w-2 rounded-full bg-cream/25" />
                    <span className="h-2 w-2 rounded-full bg-cream/25" />
                  </span>
                  <span className="flex-1 truncate rounded-full bg-cream/[0.07] px-3 py-1 text-center font-mono text-[0.68rem] text-mist">
                    yourbusiness.com
                  </span>
                </div>
                <div className="relative aspect-[16/10] overflow-hidden bg-[#f3f5f3]">
                  <div className="build-color absolute inset-0">
                    {blocks.map(([left, top, width, height, fill], i) => (
                      <span
                        key={i}
                        className="absolute rounded-[3px]"
                        style={{
                          left: `${left}%`,
                          top: `${top}%`,
                          width: `${width}%`,
                          height: `${height}%`,
                          background: fill,
                        }}
                      />
                    ))}
                  </div>
                  <div className="build-wire absolute inset-0 bg-[#f3f5f3]">
                    {blocks.map(([left, top, width, height], i) => (
                      <span
                        key={i}
                        className="absolute rounded-[3px] border border-dashed border-[#7d8a94] bg-[#dfe4e6]"
                        style={{
                          left: `${left}%`,
                          top: `${top}%`,
                          width: `${width}%`,
                          height: `${height}%`,
                        }}
                      />
                    ))}
                  </div>
                  <Image
                    src={project.images.desktop}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 620px, 90vw"
                    className="build-shot object-cover object-top"
                  />
                </div>
              </div>
              <div className="build-phone absolute right-0 bottom-0 w-[23%] rounded-[1.15rem] border-[0.3rem] border-[#0b1422] bg-navy shadow-[0_24px_50px_-16px_rgba(0,0,0,0.95)] ring-1 ring-cream/15 sm:rounded-[1.6rem] sm:border-[0.4rem]">
                <div className="relative aspect-[9/19] overflow-hidden rounded-[0.85rem] sm:rounded-[1.2rem]">
                  <Image
                    src={project.images.mobile}
                    alt=""
                    fill
                    sizes="150px"
                    className="object-cover object-top"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
