import Link from "next/link";
import Logo from "@/components/Logo";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { footerNav, legalNav } from "@/data/nav";
import { photoCredit, site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="bg-navy text-cream">
      <div className="relative isolate overflow-hidden">
        <Image
          src={photoCredit.src}
          alt=""
          fill
          sizes={photoCredit.sizes}
          className="-z-20 object-cover object-[50%_80%]"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-navy via-navy/85 to-navy/35" />
        <div className="container-x relative z-10 pt-20 pb-40 sm:pt-28 sm:pb-64 lg:pb-80">
          <p className="t-mono text-mist">Ready when you are</p>
          <h2 className="t-display mt-5 max-w-[14ch] text-balance">
            Let&rsquo;s get your business <span className="text-orange">online right.</span>
          </h2>
          <p className="t-lede mt-6 max-w-xl text-mist">
            Start with a free website check. I&rsquo;ll look at what you have (or don&rsquo;t) and
            send honest notes, with no pressure and no jargon.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button href="/free-website-check/">Get a free website check</Button>
            <Button href={site.phoneHref} variant="outline-light" arrow={false}>
              Call {site.phoneDisplay}
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-navy-ink">
        <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-5 max-w-xs leading-relaxed text-mist">
              {site.tagline} Designed, built, and cared for on the Front Range.
            </p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-2">
            <p className="t-mono text-mist">Explore</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 sm:grid-cols-1">
              {footerNav.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-cream/80 transition-colors hover:text-orange">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <p className="t-mono text-mist">Contact</p>
            <ul className="mt-4 space-y-2.5 text-cream/80">
              <li>
                <a href={site.phoneHref} className="transition-colors hover:text-orange">
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={site.emailHref} className="transition-colors hover:text-orange">
                  {site.email}
                </a>
              </li>
              <li className="text-mist">{site.hours}</li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="t-mono text-mist">Serving the Front Range</p>
            <p className="mt-4 text-sm leading-relaxed text-mist">{site.cities.join(" · ")}</p>
          </div>
        </div>

        <div className="container-x">
          <div className="flex flex-col gap-3 border-t border-cream/10 pt-6 pb-24 text-sm text-mist sm:flex-row sm:items-center sm:justify-between sm:pb-6">
            <p>
              &copy; {new Date().getFullYear()} {site.name}. Built in Colorado. Mountain photo:{" "}
              <a href={photoCredit.source} className="underline underline-offset-2 hover:text-cream">
                {photoCredit.author}
              </a>
              ,{" "}
              <a href={photoCredit.licenseUrl} className="underline underline-offset-2 hover:text-cream">
                {photoCredit.license}
              </a>
              .
            </p>
            <ul className="flex gap-5">
              {legalNav.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-cream">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="font-mono text-xs tracking-wider">elev. 5,280 ft</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
