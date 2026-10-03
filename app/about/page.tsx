import type { Metadata } from "next";
import FounderPortrait from "@/components/FounderPortrait";
import Button from "@/components/ui/Button";
import PageHeader from "@/components/ui/PageHeader";
import { Eyebrow } from "@/components/ui/Section";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description: `Meet ${site.founder}, the local developer behind ${site.name}. Professional websites for Front Range small businesses, explained in plain English.`,
  alternates: { canonical: "/about/" },
};

const promises = [
  {
    title: "You'll talk to your developer",
    body: "Not a sales rep or a support ticket. The person who builds your site is the person who answers your call.",
  },
  {
    title: "Plain English, always",
    body: "No jargon and no upselling you on things you don't need. If something doesn't make sense, that's on us to explain better.",
  },
  {
    title: "Clear, posted prices",
    body: "Our prices are posted on the website, and the setup fee is spelled out. You'll know what you're paying before we start.",
  },
  {
    title: "Your business stays yours",
    body: "Your domain is registered in your name, and you can buy your site outright. No hostage situations.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        tone="orange"
        into="navy"
        visual={<FounderPortrait />}
        eyebrow="About · Front Range, Colorado"
        title="Hi, I'm Kohlton."
        lede="I build websites for small businesses up and down the Front Range, and I take care of them after launch so you don't have to."
      />

      <section aria-labelledby="story" className="bg-navy text-cream">
        <div className="container-x section-y grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <p className="t-display text-[clamp(7rem,16vw,12rem)] leading-[0.8] text-orange">12</p>
            <p className="t-mono mt-5 max-w-[16rem] text-mist">Years framing houses around Denver</p>
          </div>
          <div className="lg:col-span-8">
            <Eyebrow className="text-mist">My story</Eyebrow>
            <h2 id="story" className="t-h2 mt-5 text-balance">
              Why I started 5280 Web Solutions
            </h2>
            <div className="t-body mt-8 grid max-w-2xl gap-5 text-cream/85">
              <p>
                Colorado runs on small businesses: the car wash on the corner, the landscaping crew,
                the family restaurant, the contractor everyone&rsquo;s neighbor recommends. Too many
                of them are stuck with a website that&rsquo;s slow, outdated, or missing entirely, and
                they lose customers who never even call.
              </p>
              <p>
                I&rsquo;ve been framing houses around Denver for about 12 years. I know what it&rsquo;s
                like to run jobs, juggle customers, and have zero time to mess with a website.
                That&rsquo;s why I handle everything for you, explain it in plain English, and
                actually pick up the phone.
              </p>
              <p>
                I started 5280 Web Solutions to give local businesses a professional website
                without agency prices or a do-it-yourself headache. I design and build every site
                myself, keep it running after launch, and I&rsquo;m a phone call away when something
                needs to change.
              </p>
            </div>
            <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-2 font-mono text-sm">
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
              <li className="text-mist">{site.hours}</li>
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="promises" className="container-x section-y">
        <div className="reveal max-w-3xl">
          <Eyebrow className="text-stone">The short version</Eyebrow>
          <h2 id="promises" className="t-h2 mt-5 text-balance">
            What you can <span className="text-orange">count on.</span>
          </h2>
        </div>
        <ol className="mt-14 grid gap-x-12 gap-y-12 sm:grid-cols-2">
          {promises.map((item, index) => (
            <li key={item.title} className="reveal grid grid-cols-[auto_1fr] gap-6 border-t-2 border-navy pt-8">
              <span
                aria-hidden="true"
                className="t-display text-[clamp(3.25rem,5vw,4.5rem)] leading-[0.8] text-transparent [-webkit-text-stroke:2px_var(--color-navy)]"
              >
                0{index + 1}
              </span>
              <div>
                <h3 className="t-h3">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-stone">{item.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-16 flex flex-wrap gap-3">
          <Button href="/free-website-check/">Get a free website check</Button>
          <Button href="/work/" variant="outline">
            See our work
          </Button>
        </div>
      </section>
    </>
  );
}
