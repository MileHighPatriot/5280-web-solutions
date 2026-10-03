import type { Metadata } from "next";
import { TalkLine } from "@/components/BookCall";
import LeadForm from "@/components/LeadForm";
import ReportSheet from "@/components/ReportSheet";
import Button, { Check } from "@/components/ui/Button";
import PageHeader from "@/components/ui/PageHeader";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Free Website Check",
  description:
    "Free written review of your Front Range small-business website: a letter grade, phone speed, Google and reviews, local competitors, and what to fix first.",
  alternates: { canonical: "/free-website-check/" },
};

const checks = [
  { title: "Phone test", body: "How your site looks and works on a phone, where most of your customers find you." },
  { title: "Speed", body: "How fast it loads on phones and computers, and what's slowing it down." },
  {
    title: "First impression",
    body: "Whether a visitor can tell what you do, where you work, and how to reach you in the first five seconds.",
  },
  { title: "Calls to action", body: "How easy it is for a visitor to call, book, or ask for a quote." },
  {
    title: "Google and reviews",
    body: "Your Google Business Profile and reviews, and whether your pages give Google what it needs to list you.",
  },
  { title: "Trust", body: "Reviews, real photos of your work, and the other things people look for before they call." },
  {
    title: "Local competitors",
    body: "How your homepage stacks up against two or three nearby competitors on the same tests.",
  },
  {
    title: "Security and upkeep",
    body: "Whether the site is secure, and whether broken links, email settings, or your domain need attention.",
  },
  { title: "Quick wins", body: "Fixes you can make yourself today, whether or not we work together." },
];

export default function FreeWebsiteCheckPage() {
  return (
    <>
      <PageHeader
        tone="orange"
        long
        visual={<ReportSheet />}
        eyebrow="Free website check · No obligation"
        title="Is your website costing you customers?"
        lede={`Send us your site and we'll review it for free. Within ${site.checkTurnaround} you'll get a written report in plain English: what's working, what isn't, and what to fix first. No obligation, and no pressure.`}
        actions={
          <Button href="#request" variant="dark">
            Request your free check
          </Button>
        }
      />

      <section id="request" aria-labelledby="request-heading" className="container-x section-y scroll-mt-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 id="request-heading" className="t-h3">
              What we look at
            </h2>
            <ul className="mt-6 grid gap-5">
              {checks.map((item) => (
                <li key={item.title} className="flex gap-3">
                  <Check className="mt-0.5 text-ember" />
                  <span>
                    <span className="font-bold">{item.title}.</span>{" "}
                    <span className="text-stone">{item.body}</span>
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-10 rounded-2xl bg-navy p-6 text-cream">
              <p className="t-mono text-orange-soft">What you get</p>
              <p className="mt-3 text-lg font-bold">A written report within {site.checkTurnaround}.</p>
              <ul className="mt-4 grid gap-2.5 text-mist">
                <li className="flex gap-2.5">
                  <Check className="mt-0.5 shrink-0 text-orange" />
                  A letter grade, and every problem ranked by how much it&rsquo;s likely costing you
                </li>
                <li className="flex gap-2.5">
                  <Check className="mt-0.5 shrink-0 text-orange" />
                  Your Google speed scores, explained in plain English
                </li>
                <li className="flex gap-2.5">
                  <Check className="mt-0.5 shrink-0 text-orange" />
                  Quick wins you can make yourself, whether or not we work together
                </li>
                <li className="flex gap-2.5">
                  <Check className="mt-0.5 shrink-0 text-orange" />
                  The plan we&rsquo;d recommend and what it costs, so there are no surprises
                </li>
              </ul>
              <p className="mt-4 text-sm text-mist">
                No pressure. If your site is in good shape, we&rsquo;ll tell you that too.
              </p>
            </div>
            <div className="mt-4 rounded-2xl bg-sand/70 p-6">
              <p className="font-bold">No website yet?</p>
              <p className="mt-2 text-stone">
                Leave the website field blank and tell us about your business. We&rsquo;ll send ideas
                for what a first site should include, and what it would cost.
              </p>
            </div>
            <TalkLine className="mt-6" />
          </div>
          <div className="lg:col-span-7">
            <h2 className="sr-only">Request your free check</h2>
            <LeadForm variant="check" />
          </div>
        </div>
      </section>
    </>
  );
}
