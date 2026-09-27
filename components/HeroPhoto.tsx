import Image from "next/image";
import Blueprint from "@/components/ui/Blueprint";
import Decode from "@/components/ui/Decode";
import Button from "@/components/ui/Button";
import HeroShowcase from "@/components/HeroShowcase";
import { listedProjects } from "@/data/projects";
import { heroPhoto } from "@/data/site";

function HeroCopy() {
  return (
    <div className="hero-copy container-x relative z-10 pt-16 sm:pt-24 lg:pt-28">
      <p className="t-mono fade-up text-mist">
        <Decode text="Web design · Fort Collins to Colorado Springs" duration={1100} />
      </p>
      <h1 className="t-display fade-up mt-6 max-w-[20ch] text-balance" style={{ animationDelay: "80ms" }}>
        Websites that win <span className="text-orange">local customers.</span>
      </h1>
      <p className="t-lede fade-up mt-6 max-w-xl text-pretty text-mist" style={{ animationDelay: "160ms" }}>
        Custom websites for Front Range small businesses, designed, built, and cared for by a local developer.
      </p>
      <div className="fade-up mt-9 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "240ms" }}>
        <Button href="/free-website-check/">Get a free website check</Button>
        <Button href="/work/" variant="outline-light">
          See our work
        </Button>
      </div>
    </div>
  );
}

/** Homepage hero: aerial of downtown Denver, the Broncos stadium, and the Front Range behind. */
export default function HeroPhoto() {
  return (
    <section data-glow className="hero-timeline relative isolate flex min-h-[46rem] flex-col overflow-hidden bg-navy text-cream sm:min-h-[52rem] lg:min-h-[max(92svh,52rem)]">
      <Image
        src={heroPhoto.src}
        alt="Downtown Denver from the air, with the Broncos stadium beyond the towers and the Front Range behind"
        fill
        loading="eager"
        fetchPriority="high"
        sizes={heroPhoto.sizes}
        className="hero-drift -z-20 origin-bottom object-cover object-[68%_50%]"
      />
      {/* Navy holds the left side for the headline and clears to the right, where the stadium and peaks sit. */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy via-navy/80 to-navy/10 lg:via-navy/55 lg:to-navy/0" />
      <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-navy/80 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-navy/80 to-transparent" />
      <Blueprint className="[mask-image:radial-gradient(ellipse_75%_60%_at_65%_20%,black_15%,transparent_70%)]" />
      <HeroCopy />
      {/* Live preview of the concept sites, lower right on wide screens (it would crowd the headline below xl). */}
      <div className="pointer-events-none absolute inset-x-0 bottom-16 z-10 hidden xl:block">
        <div className="container-x flex justify-end">
          <div className="fade-up pointer-events-auto w-[380px]" style={{ animationDelay: "360ms" }}>
            <HeroShowcase projects={listedProjects} />
          </div>
        </div>
      </div>
      {/* Survey-style readout along the bottom edge */}
      <div
        aria-hidden="true"
        className="container-x relative z-10 mt-auto flex items-center justify-between gap-6 pt-10 pb-6 font-mono text-[0.68rem] tracking-[0.2em] text-cream/70"
      >
        <span className="hidden sm:inline">DENVER, CO · 39.7392° N, 104.9903° W</span>
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-orange" />
          ELEV. 5,280 FT
        </span>
      </div>
    </section>
  );
}
