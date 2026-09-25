import Image from "next/image";
import Button from "@/components/ui/Button";
import { photoCredit } from "@/data/site";

function HeroCopy() {
  return (
    <div className="hero-copy container-x relative z-10 pt-16 sm:pt-24 lg:pt-28">
      <p className="t-mono fade-up text-mist">Web design · Fort Collins to Colorado Springs</p>
      <h1 className="t-display fade-up mt-6 max-w-[16ch] text-balance" style={{ animationDelay: "80ms" }}>
        Websites that win <span className="text-orange">local customers.</span>
      </h1>
      <p className="t-lede fade-up mt-6 max-w-xl text-pretty text-mist" style={{ animationDelay: "160ms" }}>
        Custom websites for Front Range small businesses, designed, built, and cared for by a local developer.
      </p>
      <div className="fade-up mt-9 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "240ms" }}>
        <Button href="/free-website-check/">Get a free website check</Button>
        <Button href="/work/" variant="outline-light">
          See my work
        </Button>
      </div>
    </div>
  );
}

/** Homepage hero: a real photograph of the Front Range behind downtown Denver at sunset. */
export default function HeroPhoto() {
  return (
    <section className="hero-timeline relative isolate flex min-h-[46rem] flex-col overflow-hidden bg-navy text-cream sm:min-h-[52rem] lg:min-h-[92svh]">
      <Image
        src={photoCredit.src}
        alt="The Front Range mountains behind downtown Denver at sunset"
        fill
        priority
        sizes="100vw"
        className="hero-drift -z-20 origin-bottom object-cover object-[50%_75%]"
      />
      {/* Navy fades down over the sky so the headline stays readable, letting the mountains and city glow below. */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-navy via-navy/80 to-navy/0" style={{ backgroundSize: "100% 72%", backgroundRepeat: "no-repeat" }} />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-navy/70 to-transparent" />
      <HeroCopy />
      <div className="mt-auto" />
    </section>
  );
}
