import Image from "next/image";
import { LogoMark } from "@/components/Logo";
import { site } from "@/data/site";

/** Kohlton's photo in a tilted frame for the orange About header; straightens on hover. */
export default function FounderPortrait() {
  return (
    <figure className="relative mx-auto w-[min(22rem,82%)] rotate-[4deg] overflow-hidden rounded-[1.75rem] bg-navy text-cream shadow-[0_50px_90px_-30px_rgba(0,24,51,0.75)] ring-1 ring-white/15 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:rotate-0">
      <Image
        src="/kohlton-luper.jpg"
        alt={`${site.founder}, ${site.founderTitle} at ${site.name}`}
        width={724}
        height={1086}
        sizes="(min-width: 1024px) 352px, 82vw"
        priority
        className="aspect-[4/4.4] w-full object-cover object-[50%_35%]"
      />
      <figcaption className="relative flex items-end justify-between gap-4 px-6 pt-4 pb-6">
        <span>
          <span className="block text-2xl font-extrabold tracking-tight">{site.founder}</span>
          <span className="mt-0.5 block text-sm text-mist">{site.founderTitle}</span>
        </span>
        <LogoMark className="h-9 w-auto shrink-0" />
      </figcaption>
    </figure>
  );
}
