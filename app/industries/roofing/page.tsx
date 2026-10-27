import type { Metadata } from "next";
import Image from "next/image";
import AreaMap from "@/components/AreaMap";
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
import { openGraphBase } from "@/data/site";

// Not in data/industries.ts on purpose: this page is reachable by URL and the sitemap only.

const title = "Roofing Websites for Front Range Towns | 5280 Web Solutions";
const description =
  "Is Google skipping your roofing site? I build roofing websites with a page for every town you work, Fort Collins to Colorado Springs. Start with a free full website report.";
const url = "https://5280webs.com/industries/roofing/";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: url },
  openGraph: { ...openGraphBase, title, description, url },
  twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
};

const searchShot = {
  src: "/work/roofing-search.png",
  alt: "Example search results for a roofer in a Front Range town",
  width: 780,
  height: 1500,
};

const footerShot = {
  src: "/work/roofing-footer-before-after.png",
  alt: "Before: a footer stuck in 2009. After: a footer that updates itself every year.",
  width: 1200,
  height: 720,
};

const costAnswer =
  "Monthly plans start at $250 to set up and $75 a month, with hosting, security, and updates included. Growth is $350 to set up and $125 a month, and Premium is $500 and $200 a month. If you'd rather own it outright, it's $1,800 to $2,500 to build, then $25 to $35 a month for hosting. Full details are on the pricing page.";

export default function RoofingPage() {
  return (
    <>
      <section data-glow className="relative isolate overflow-hidden bg-navy text-cream">
        <Blueprint className="opacity-70" />
        <div className="container-x grid items-center gap-12 pt-14 pb-20 sm:pt-20 sm:pb-24 lg:grid-cols-12 lg:gap-10">
          <div className="min-w-0 lg:col-span-7">
            <h1 className="t-h1 fade-up max-w-[16ch] text-balance">Is Google skipping your roofing site?</h1>
            <p className="t-lede fade-up mt-6 max-w-2xl text-pretty text-mist" style={{ animationDelay: "60ms" }}>
              After a storm, people search for a roofer in their town and call who they find. If your site doesn&apos;t
              show up, they call someone else.
            </p>
            <div className="fade-up mt-8" style={{ animationDelay: "120ms" }}>
              <TradeActions dark />
              <p className="mt-5 text-mist">Free full website report plus a quick 15-20 minute call.</p>
            </div>
          </div>
          <figure className="fade-up min-w-0 lg:col-span-5" style={{ animationDelay: "160ms" }}>
            <PhoneFrame priority />
          </figure>
        </div>
      </section>

      <section aria-labelledby="three-signs" className="container-x section-y">
        <h2 id="three-signs" className="t-h2 max-w-3xl text-balance">
          Three signs your site is getting passed over
        </h2>
        <TradeCards
          cards={[
            {
              title: "Your homepage never names your towns.",
              body: "If the page doesn't say where you work, Google has nothing to match when someone searches for a roofer in their town.",
            },
            {
              title: "The footer still says © 2009.",
              body: "It's a small thing, but it tells people nobody's touched the site in years.",
            },
            {
              title: "It looks dated on a phone.",
              body: "Tiny text, pinch-to-zoom, and a number you can't tap. Most people stop right there.",
            },
          ]}
        />
        <figure className="mt-12">
          <Image
            src={footerShot.src}
            alt={footerShot.alt}
            width={footerShot.width}
            height={footerShot.height}
            sizes="(min-width: 1280px) 1184px, 100vw"
            className="h-auto w-full rounded-2xl ring-1 ring-navy/10"
          />
          <figcaption className="mt-4 text-sm text-stone">
            Before: a footer stuck in 2009. After: a footer that updates itself every year.
          </figcaption>
        </figure>
      </section>

      <section aria-labelledby="towns" className="border-y border-navy/10 bg-paper/60">
        <div className="container-x section-y">
          <h2 id="towns" className="t-h2 max-w-3xl text-balance">
            Found in every town you work
          </h2>
          <p className="t-lede mt-5 max-w-2xl text-pretty text-stone">
            I build a page for each town you cover, so when someone searches for a roofer in their town, your site has
            an answer. I work from Fort Collins to Colorado Springs, 19 cities in all.
          </p>
          <div data-town-cards>
            <TradeCards
              cards={[
                {
                  title: "Roofing in Longmont.",
                  body: "A page that names the town, the work you do there, and how to reach you.",
                },
                {
                  title: "Roofing in Aurora.",
                  body: "Same idea, written for that town, not copied and pasted.",
                },
                {
                  title: "Roofing in Castle Rock.",
                  body: "Every town you work gets its own page.",
                },
              ]}
            />
          </div>
          <p className="mt-6 text-stone">Example pages. Your site lists the towns you actually work.</p>
          <figure className="mt-12">
            <div className="rounded-3xl bg-navy p-6 sm:p-10">
              <AreaMap className="mx-auto h-auto w-full max-w-sm" />
            </div>
            <figcaption className="mt-4 text-center text-sm leading-relaxed text-stone">
              Fort Collins · Loveland · Greeley · Longmont · Boulder · Broomfield · Westminster · Arvada · Denver ·
              Lakewood · Golden · Aurora · Centennial · Littleton · Highlands Ranch · Parker · Castle Rock · Monument ·
              Colorado Springs
            </figcaption>
          </figure>
        </div>
      </section>

      <TradeIncludes />
      <TradeSteps />

      <TradeFaq
        items={[
          {
            question: "Can you get me to the top of Google?",
            answer:
              "Nobody can honestly promise that, and I won't. What I can do is build your site so Google can see what you do and where you do it, which is the part you control.",
          },
          {
            question: "What are town pages, and do I need them?",
            answer:
              "A town page is a page on your site for one town you work, like Longmont or Castle Rock. If you work a lot of towns, they help people in each one find you. We can figure out which towns matter on the call.",
          },
          {
            question: "What does it cost?",
            answer: costAnswer,
            link: { text: "pricing page", href: "/pricing/" },
          },
          {
            question: "Am I locked into a contract?",
            answer:
              "Right now, monthly plans are month-to-month, and you can cancel with 30 days' notice. That's a limited-time offer. When it ends, monthly plans have a 12-month minimum, then go month-to-month.",
          },
        ]}
      />

      <TradeCta
        title="Find out if Google can see you"
        line="Start with a free full website report, then a quick 15-20 minute call to go over it."
      />
      <TradeCallBar />
    </>
  );
}

/** Search-results mock in the same phone bezel as the HVAC concept shot. */
function PhoneFrame({ priority = false }: { priority?: boolean }) {
  return (
    <div className="mx-auto w-[min(15rem,68vw)] rounded-[2.2rem] bg-[#0b1117] p-2.5 shadow-2xl shadow-black/40 ring-1 ring-white/15 lg:w-[18rem]">
      <Image
        src={searchShot.src}
        alt={searchShot.alt}
        width={searchShot.width}
        height={searchShot.height}
        sizes="(min-width: 1024px) 288px, 240px"
        loading={priority ? "eager" : undefined}
        fetchPriority={priority ? "high" : undefined}
        className="h-auto w-full rounded-[1.7rem]"
      />
    </div>
  );
}
