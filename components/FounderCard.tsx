import Image from "next/image";
import { LogoMark } from "@/components/Logo";
import { site } from "@/data/site";

/**
 * Kohlton's name, title, and contact details, as on the business card.
 * The About page shows his photo on top; the homepage uses the photo-free version.
 */
export default function FounderCard({ showRegion = false, photo = true }: { showRegion?: boolean; photo?: boolean }) {
  return (
    <figure className="relative overflow-hidden rounded-3xl bg-navy text-cream shadow-xl shadow-navy/15">
      {photo ? (
        <div className="relative">
          <Image
            src="/kohlton-luper.jpg"
            alt={`${site.founder}, ${site.founderTitle} at ${site.name}`}
            width={724}
            height={1086}
            sizes="(min-width: 1024px) 460px, 100vw"
            className="aspect-[4/4.2] w-full object-cover object-[50%_35%]"
          />
          <div
            className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-navy to-transparent"
            aria-hidden="true"
          />
        </div>
      ) : (
        <div className="relative px-7 pt-9 sm:px-9 sm:pt-11">
          <LogoMark className="pointer-events-none absolute -right-10 -top-6 h-56 w-auto opacity-[0.07]" />
          <LogoMark className="h-14 w-auto" />
          <p className="mt-5 text-4xl font-black tracking-[-0.03em]">5280</p>
          <p className="mt-1 font-mono text-xs font-medium tracking-[0.3em] text-orange">WEB SOLUTIONS</p>
          <div className="mt-8 h-px bg-cream/10" aria-hidden="true" />
        </div>
      )}
      <figcaption className={`relative p-7 sm:p-9 ${photo ? "pt-2 sm:pt-3" : "pt-7 sm:pt-8"}`}>
        {photo ? <LogoMark className="absolute -top-7 right-7 h-12 w-auto sm:right-9" /> : null}
        <p className="text-3xl font-extrabold tracking-tight">{site.founder}</p>
        <p className="mt-1 text-mist">{site.founderTitle}</p>
        <div className="mt-5 h-1 w-12 rounded-full bg-orange" aria-hidden="true" />
        <ul className="mt-5 grid gap-2 font-mono text-sm">
          <li>
            <a href={site.phoneHref} className="hover:text-orange">
              {site.phoneDisplay}
            </a>
          </li>
          <li>
            <a href={site.emailHref} className="hover:text-orange">
              {site.email}
            </a>
          </li>
          {showRegion ? <li className="text-mist">{site.region}</li> : null}
        </ul>
      </figcaption>
    </figure>
  );
}
