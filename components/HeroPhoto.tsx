import Image from "next/image";
import Blueprint from "@/components/ui/Blueprint";
import Decode from "@/components/ui/Decode";
import Button from "@/components/ui/Button";
import { photoCredit } from "@/data/site";

function HeroCopy() {
  return (
    <div className="hero-copy container-x relative z-10 pt-16 sm:pt-24 lg:pt-28">
      <p className="t-mono fade-up text-mist">
        <Decode text="Web design · Fort Collins to Colorado Springs" duration={1100} />
      </p>
      <h1 className="t-display fade-up mt-6 max-w-[16ch] text-balance" style={{ animationDelay: "80ms" }}>
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

/** Homepage hero: a real photograph of the Front Range behind downtown Denver at sunset. */
export default function HeroPhoto() {
  return (
    <section data-glow className="hero-timeline relative isolate flex min-h-[46rem] flex-col overflow-hidden bg-navy text-cream sm:min-h-[52rem] lg:min-h-[92svh]">
      <Image
        src={photoCredit.src}
        alt="The Front Range mountains behind downtown Denver at sunset"
        fill
        loading="eager"
        fetchPriority="high"
        sizes={photoCredit.sizes}
        className="hero-drift -z-20 origin-bottom object-cover object-[50%_75%]"
      />
      {/* Navy fades down over the sky so the headline stays readable, letting the mountains and city glow below. */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-navy via-navy/80 to-navy/0"
        style={{ backgroundSize: "100% 72%", backgroundRepeat: "no-repeat" }}
      />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-navy/70 to-transparent" />
      <Blueprint className="[mask-image:radial-gradient(ellipse_75%_60%_at_65%_20%,black_15%,transparent_70%)]" />
      <HeroCopy />
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
