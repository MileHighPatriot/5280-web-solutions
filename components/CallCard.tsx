import { LogoMark } from "@/components/Logo";
import { site } from "@/data/site";

/** Phone, email, and hours as a tilted business card for the orange Contact header. */
export default function CallCard() {
  return (
    <div className="relative mx-auto w-[min(25rem,90%)] -rotate-[3deg] rounded-[1.75rem] bg-navy p-7 text-cream shadow-[0_50px_90px_-30px_rgba(0,24,51,0.75)] ring-1 ring-white/15 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:rotate-0 sm:p-9">
      <p className="t-mono text-mist">Call or text</p>
      <a
        href={site.phoneHref}
        className="mt-4 block font-mono text-[clamp(1.6rem,3vw,2.15rem)] font-medium tracking-tight whitespace-nowrap transition-colors hover:text-orange"
      >
        {site.phoneDisplay}
      </a>
      <a href={site.emailHref} className="mt-3 inline-block font-mono text-sm break-all hover:text-orange">
        {site.email}
      </a>
      <dl className="mt-7 grid gap-4 border-t border-cream/15 pt-6 text-sm sm:grid-cols-2">
        <div>
          <dt className="t-mono text-[0.68rem] text-mist">Hours</dt>
          <dd className="mt-1.5 font-semibold">{site.hours}</dd>
        </div>
        <div>
          <dt className="t-mono text-[0.68rem] text-mist">Replies within</dt>
          <dd className="mt-1.5 font-semibold">{site.replyTime}</dd>
        </div>
      </dl>
      <LogoMark className="absolute top-7 right-7 h-9 w-auto sm:top-9 sm:right-9" />
    </div>
  );
}
