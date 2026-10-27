import type { Metadata } from "next";
import Image from "next/image";
import { ConceptBadge } from "@/components/ProjectCard";
import {
  TradeActions,
  TradeCallBar,
  TradeCards,
  TradeCta,
  TradeFaq,
  TradeIncludes,
  TradeSteps,
} from "@/components/TradePage";
import Blueprint from "@/components/ui/Blueprint";
import Button from "@/components/ui/Button";
import { openGraphBase } from "@/data/site";

// Not in data/industries.ts on purpose: this page is reachable by URL and the sitemap only.

const title = "HVAC Websites With Tap-to-Call | 5280 Web Solutions";
const description =
  "Websites for Front Range HVAC companies, built by one local guy. A call button on every screen and emergency service up top. Start with a free full website report.";
const url = "https://5280webs.com/industries/hvac/";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: url },
  openGraph: { ...openGraphBase, title, description, url },
  twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
};

const conceptUrl = "https://milehighpatriot.github.io/quality-air/";
const phoneShot = {
  src: "/work/quality-air-mobile.jpg",
  alt: "Quality Air concept site on a phone, with the call button at the top",
  width: 780,
  height: 1688,
};

export default function HvacPage() {
  return (
    <>
      <section data-glow className="relative isolate overflow-hidden bg-navy text-cream">
        <Blueprint className="opacity-70" />
        <div className="container-x grid items-center gap-12 pt-14 pb-20 sm:pt-20 sm:pb-24 lg:grid-cols-12 lg:gap-10">
          <div className="min-w-0 lg:col-span-7">
            <h1 className="t-h1 fade-up max-w-[16ch] text-balance">Can a customer call you with one tap?</h1>
            <p className="t-lede fade-up mt-6 max-w-2xl text-pretty text-mist" style={{ animationDelay: "60ms" }}>
              {
                "When the furnace quits, people grab their phone and call whoever's easiest to reach. If your number is just text on the page, that's one more step between them and you."
              }
            </p>
            <div className="fade-up mt-8" style={{ animationDelay: "120ms" }}>
              <TradeActions dark />
              <p className="mt-5 text-mist">Free full website report plus a quick 15-20 minute call.</p>
            </div>
          </div>
          <figure className="fade-up min-w-0 lg:col-span-5" style={{ animationDelay: "160ms" }}>
            <PhoneFrame priority />
            <figcaption className="mt-4 text-center text-sm text-mist">
              On the phone: Quality Air, a concept project
            </figcaption>
          </figure>
        </div>
      </section>

      <section aria-labelledby="no-heat" className="bg-orange text-navy-ink">
        <div className="container-x py-16 sm:py-20">
          <h2 id="no-heat" className="t-h2 text-balance">
            Built for the no-heat call.
          </h2>
          <TradeCards
            cards={[
              {
                title: "Emergency service up top.",
                body: "If you take emergency calls, it's the first thing people see, not buried on page three.",
              },
              {
                title: "A call button that stays put.",
                body: "It follows them down the page on a phone, so they never have to scroll back up to find your number.",
              },
              {
                title: "Ready for the 2 AM call.",
                body: "A cold house at night doesn't want a contact form. One tap and your phone rings.",
              },
            ]}
          />
        </div>
      </section>

      <section aria-labelledby="problems" className="container-x section-y">
        <h2 id="problems" className="t-h2 max-w-3xl text-balance">
          What I keep running into on HVAC sites
        </h2>
        <TradeCards
          cards={[
            {
              title: "The number can't be tapped.",
              body: "It's on the page, but on a phone it's just text. People have to copy it or type it in.",
            },
            {
              title: "No emergency line up top.",
              body: "If you do after-hours calls, nobody can tell until they dig.",
            },
            {
              title: "Maintenance plans are missing.",
              body: "Tune-up plans keep customers coming back, but a lot of sites never mention them.",
            },
          ]}
        />
      </section>

      <section aria-labelledby="concept" className="relative isolate overflow-hidden bg-navy text-cream">
        <Blueprint className="opacity-50" />
        <div className="container-x section-y grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="min-w-0 lg:col-span-5">
            <PhoneFrame />
          </div>
          <div className="min-w-0 lg:col-span-7">
            <ConceptBadge className="!bg-orange !px-3 !text-xs !text-navy" />
            <h2 id="concept" className="t-h2 mt-5 text-balance">
              Quality Air Heating &amp; Cooling
            </h2>
            <p className="t-lede mt-5 max-w-2xl text-pretty text-mist">
              {
                'Quality Air is a concept site I built to show what an HVAC site can do. It\'s not a real company. The call button sits right at the top on a phone, there\'s a quick "repair or replace?" tool, and the maintenance plans have their own page.'
              }
            </p>
            <Button href={conceptUrl} variant="outline-light" className="mt-8">
              See the concept site
            </Button>
          </div>
        </div>
      </section>

      <section aria-labelledby="plans" className="container-x section-y">
        <h2 id="plans" className="t-h2 max-w-3xl text-balance">
          Turn one-time calls into yearly plans
        </h2>
        <p className="t-lede mt-5 max-w-2xl text-pretty text-stone">
          I can build a page that sells your maintenance plans, so a tune-up customer becomes a customer for years.
        </p>
        <TradeCards
          cards={[
            { title: "Fall furnace check.", body: "One visit before the first cold snap." },
            { title: "Spring AC check.", body: "One visit before the first hot week." },
            {
              title: "Both, plus priority.",
              body: "Two tune-ups a year and first in line when something breaks.",
            },
          ]}
        />
        <p className="mt-6 text-stone">These are examples. Your site shows your plans and your prices, not ours.</p>
      </section>

      <TradeIncludes />
      <TradeSteps />

      <TradeFaq
        items={[
          {
            question: "I already have a website. Do I need a new one?",
            answer:
              "Maybe not. The free full website report shows what's working and what isn't. Sometimes it's a few fixes, sometimes it's a rebuild. Either way, the report is yours to keep.",
          },
          {
            question: "What does it cost?",
            answer:
              "Monthly plans start at $250 to set up and $75 a month, with hosting, security, and updates included. Growth is $350 to set up and $125 a month, and Premium is $500 and $200 a month. If you'd rather own it outright, it's $1,800 to $2,500 to build, then $25 to $35 a month for hosting. Full details are on the pricing page.",
            link: { text: "pricing page", href: "/pricing/" },
          },
          {
            question: "Am I locked into a contract?",
            answer:
              "Right now, monthly plans are month-to-month, and you can cancel with 30 days' notice. That's a limited-time offer. When it ends, monthly plans have a 12-month minimum, then go month-to-month.",
          },
          {
            question: "Who do I talk to when something needs changing?",
            answer:
              "Me. I build every site myself and look after it after launch. You send me an email, and I take care of it.",
          },
        ]}
      />

      <TradeCta
        title="See what your site is missing"
        line="Start with a free full website report, then a quick 15-20 minute call to go over it."
      />
      <TradeCallBar />
    </>
  );
}

/** The Quality Air phone screenshot in a phone bezel (same frame as the work pages). */
function PhoneFrame({ priority = false }: { priority?: boolean }) {
  return (
    <div className="mx-auto w-[min(15rem,68vw)] rounded-[2.2rem] bg-[#0b1117] p-2.5 shadow-2xl shadow-black/40 ring-1 ring-white/15 lg:w-[18rem]">
      <Image
        src={phoneShot.src}
        alt={phoneShot.alt}
        width={phoneShot.width}
        height={phoneShot.height}
        sizes="(min-width: 1024px) 288px, 240px"
        loading={priority ? "eager" : undefined}
        fetchPriority={priority ? "high" : undefined}
        className="h-auto w-full rounded-[1.7rem]"
      />
    </div>
  );
}
