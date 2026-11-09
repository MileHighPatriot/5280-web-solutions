import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import CityLights from "@/components/CityLights";
import Blueprint from "@/components/ui/Blueprint";
import Decode from "@/components/ui/Decode";
import Button from "@/components/ui/Button";
import HeroShowcase from "@/components/HeroShowcase";
import { listedProjects } from "@/data/projects";
import { heroPhoto, site } from "@/data/site";

// min-h-11 keeps the phone-only text links a full 44px tap target.
const textLink =
  "flex min-h-11 items-center justify-center text-sm font-semibold text-cream underline underline-offset-4";

function HeroCopy() {
  return (
    <div className="hero-copy min-w-0">
      <p className="t-mono fade-up text-mist">
        <Decode
          text="Web design · Fort Collins to Colorado Springs"
          duration={1100}
        />
      </p>
      {/* Each line rises out of its own mask, one after the other. */}
      <h1 className="hero-title mt-6">
        <span className="line-mask">
          <span
            className="line-rise"
            style={{ "--d": "120ms" } as CSSProperties}
          >
            Websites{" "}
          </span>
        </span>
        <span className="line-mask">
          <span
            className="line-rise"
            style={{ "--d": "220ms" } as CSSProperties}
          >
            that make{" "}
          </span>
        </span>
        <span className="line-mask">
          <span
            className="line-rise bg-gradient-to-r from-orange to-glow bg-clip-text whitespace-nowrap text-transparent"
            style={{ "--d": "320ms" } as CSSProperties}
          >
            the phone ring.
          </span>
        </span>
      </h1>
      <p
        className="t-lede fade-up mt-6 max-w-xl text-pretty text-mist"
        style={{ animationDelay: "520ms" }}
      >
        Built and looked after by one local guy.
      </p>
      <div
        className="fade-up mt-9 flex flex-col gap-3 sm:flex-row"
        style={{ animationDelay: "620ms" }}
      >
        <Button href="/free-website-check/">
          Get a free full website report
        </Button>
        <Button href="/work/" variant="outline-light" className="max-sm:hidden">
          See our work
        </Button>
        {/* Phones get a call button instead; "See our work" drops to a text link under it. */}
        <div className="flex flex-col sm:hidden">
          <Button href={site.phoneHref} variant="outline-light" arrow={false}>
            Call {site.phoneDisplay}
          </Button>
          <a href={`sms:+1${site.phone}`} className={textLink}>
            or text
          </a>
          <Link href="/work/" className={textLink}>
            See our work
          </Link>
        </div>
      </div>
    </div>
  );
}

/**
 * Homepage hero: the Denver aerial at dusk levels (darkened, with orange as the light), the
 * headline on the left, and a laptop and phone playing through the concept sites on the right.
 * On phones the devices sit under the buttons.
 */
export default function HeroPhoto() {
  return (
    <section
      data-glow
      className="hero-timeline relative isolate overflow-hidden bg-navy-ink text-cream"
    >
      <Image
        src={heroPhoto.src}
        alt="Downtown Denver from the air, with the Broncos stadium beyond the towers and the Front Range behind"
        fill
        loading="eager"
        fetchPriority="high"
        sizes={heroPhoto.sizes}
        className="hero-drift hero-push -z-20 origin-bottom object-cover object-[68%_50%] brightness-[0.62] contrast-[1.1] saturate-[0.6]"
      />
      {/* Night holds the left side for the headline; the right keeps the skyline, lit from below in orange. */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(90deg,#03080f 0%,rgba(3,8,15,.94) 34%,rgba(3,8,15,.6) 64%,rgba(3,8,15,.4) 100%),linear-gradient(0deg,#03080f 3%,rgba(3,8,15,0) 46%),radial-gradient(46% 58% at 76% 68%,rgba(251,79,20,.5),transparent 70%)",
        }}
      />
      <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-navy-ink to-transparent" />
      <CityLights className="-z-10" />
      <Blueprint className="[mask-image:radial-gradient(ellipse_75%_60%_at_65%_20%,black_15%,transparent_70%)]" />
      <div className="container-x relative z-10 grid grid-cols-1 items-center gap-x-10 gap-y-14 pt-14 pb-12 sm:pt-20 lg:min-h-[min(84svh,48rem)] lg:grid-cols-[minmax(0,1.06fr)_minmax(0,1fr)] lg:pt-20 lg:pb-16">
        <HeroCopy />
        <div className="device-rise mx-auto w-full max-w-xl lg:max-w-none">
          <HeroShowcase projects={listedProjects} />
        </div>
      </div>
      {/* Survey-style readout along the bottom edge */}
      <div
        aria-hidden="true"
        className="container-x relative z-10 flex items-center justify-between gap-6 pb-6 font-mono text-[0.68rem] tracking-[0.2em] text-cream/70"
      >
        <span className="hidden sm:inline">
          DENVER, CO · 39.7392° N, 104.9903° W
        </span>
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-orange" />
          ELEV. 5,280 FT
        </span>
      </div>
    </section>
  );
}
