import type { Metadata } from "next";
import LeadForm from "@/components/LeadForm";
import { Check } from "@/components/ui/Button";
import PageHeader from "@/components/ui/PageHeader";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Free Website Check",
  description:
    "Get a free, no-pressure review of your small-business website: speed, phone usability, Google visibility, and what's costing you calls. Front Range businesses.",
  alternates: { canonical: "/free-website-check/" },
};

const checks = [
  { title: "Phone test", body: "How your site looks and works on a phone, where most of your customers find you." },
  { title: "Speed", body: "How fast it loads, and what's slowing it down." },
  { title: "Google visibility", body: "Whether you show up for local searches, and how your Business Profile looks." },
  { title: "Calls to action", body: "How easy it is for a visitor to call, book, or ask for a quote." },
  { title: "First impression", body: "Whether the design and copy build trust or quietly send people elsewhere." },
  { title: "Quick wins", body: "Fixes you can make yourself today, whether or not we work together." },
];

export default function FreeWebsiteCheckPage() {
  return (
    <>
      <PageHeader
        eyebrow="Free website check"
        title="Is your website costing you customers?"
        lede="Send me your site and I'll review it for free. You'll get honest, plain-English notes on what's working, what isn't, and what to fix first. No obligation."
      />

      <section className="container-x section-y">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="t-h3">What I look at</h2>
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
            <div className="mt-10 rounded-2xl bg-sand/70 p-6">
              <p className="font-bold">No website yet?</p>
              <p className="mt-2 text-stone">
                Leave the website field blank and tell me about your business. I&rsquo;ll send ideas
                for what a first site should include, and what it would cost.
              </p>
            </div>
            <p className="mt-6 text-sm text-stone">
              Prefer to talk? Call or text{" "}
              <a href={site.phoneHref} className="font-semibold text-navy underline underline-offset-4">
                {site.phoneDisplay}
              </a>
              .
            </p>
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
