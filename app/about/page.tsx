import type { Metadata } from "next";
import FounderCard from "@/components/FounderCard";
import Button, { Check } from "@/components/ui/Button";
import PageHeader from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/Section";
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
        backdrop="logo"
        eyebrow="About"
        title="Hi, I'm Kohlton."
        lede="I build websites for small businesses up and down the Front Range, and I take care of them after launch so you don't have to."
      />

      <section aria-labelledby="story" className="container-x section-y">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="mx-auto max-w-md lg:sticky lg:top-28 lg:max-w-none">
              <FounderCard showRegion />
            </div>
          </div>

          <div className="lg:col-span-7">
            <SectionHeading id="story" eyebrow="My story" title="Why I started 5280 Web Solutions" />
            <div className="t-body mt-8 grid gap-5 text-stone">
              <p>
                Colorado runs on small businesses: the car wash on the corner, the landscaping crew,
                the family restaurant, the contractor everyone&rsquo;s neighbor recommends. Too many
                of them are stuck with a website that&rsquo;s slow, outdated, or missing entirely, and
                they lose customers who never even call.
              </p>
              <p>
                Before I built websites, I spent 14 years in construction. I know what it&rsquo;s
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

            <h2 className="t-h3 mt-14">What you can count on</h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {promises.map((item) => (
                <li key={item.title} className="rounded-2xl bg-paper p-6 ring-1 ring-navy/10">
                  <p className="flex items-center gap-2 font-bold">
                    <Check className="text-ember" />
                    {item.title}
                  </p>
                  <p className="mt-2 leading-relaxed text-stone">{item.body}</p>
                </li>
              ))}
            </ul>

            <div className="mt-12 flex flex-wrap gap-3">
              <Button href="/free-website-check/">Get a free website check</Button>
              <Button href="/work/" variant="outline">
                See our work
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
