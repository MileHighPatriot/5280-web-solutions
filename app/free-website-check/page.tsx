import type { Metadata } from "next";
import { TalkLine } from "@/components/BookCall";
import LeadForm from "@/components/LeadForm";
import ReportSheet from "@/components/ReportSheet";
import Button, { Check } from "@/components/ui/Button";
import PageHeader from "@/components/ui/PageHeader";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Free Full Website Report",
  description:
    "Get a free full website report on your small-business site from Kohlton at 5280 Web Solutions. Graded A to F on speed, Google basics, phones, and trust, then a quick 15-20 minute call to go over it.",
  alternates: { canonical: "/free-website-check/" },
};

const checks = [
  { title: "Speed", body: "How fast your site loads on a phone and a computer, and what's slowing it down." },
  {
    title: "Google basics (SEO)",
    body: "Whether Google can tell what you do and where you work, so you show up in local searches.",
  },
  { title: "Phones", body: "How your site looks and works on a phone, where most of your customers find you." },
  {
    title: "Trust and contact",
    body: "Reviews, photos, and a clear way to call or ask for a quote. The stuff that makes people pick up the phone.",
  },
];

export default function FreeWebsiteCheckPage() {
  return (
    <>
      <PageHeader
        tone="orange"
        long
        visual={<ReportSheet />}
        eyebrow="Free full website report · No obligation"
        title="Is your website costing you customers?"
        lede="Send me your site and I'll put together a free full website report on it. It's graded A to F, in plain English: what's working, what isn't, and what to fix first. Then we go over it on a quick 15-20 minute call."
        actions={
          <>
            <Button href="#request" variant="dark">
              Request your free report
            </Button>
            <Button href={site.phoneHref} variant="outline-ink" arrow={false}>
              Call {site.phoneDisplay}
            </Button>
          </>
        }
      />

      <section id="request" aria-labelledby="request-heading" className="container-x section-y scroll-mt-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 id="request-heading" className="t-h3">
              What&rsquo;s in your report
            </h2>
            <p className="mt-6 text-stone">
              Every report gets an overall grade from A to F, plus a grade on each of these:
            </p>
            <ul className="mt-5 grid gap-5">
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
            <p className="mt-5 text-stone">
              You also get the fixes ranked by what matters most, and the quick wins you can do yourself,
              whether or not we work together.
            </p>
            <div className="mt-10 rounded-2xl bg-navy p-6 text-cream">
              <p className="t-mono text-orange-soft">What you get</p>
              <p className="mt-3 text-lg font-bold">How it works</p>
              <ol className="mt-4 grid gap-2.5 text-mist">
                <li className="flex gap-2.5">
                  <span className="font-bold text-orange">1.</span>
                  <span>
                    Tell me about your business and your site. Fill out the form, or call or text me at{" "}
                    {site.phoneDisplay}.
                  </span>
                </li>
                <li className="flex gap-2.5">
                  <span className="font-bold text-orange">2.</span>
                  <span>
                    I build the report myself and send it to you. No robot score, no form letter. I&rsquo;ll
                    get it to you by email.
                  </span>
                </li>
                <li className="flex gap-2.5">
                  <span className="font-bold text-orange">3.</span>
                  <span>
                    We go over it on a quick 15-20 minute call. I walk you through the grades and what I&rsquo;d
                    fix first.
                  </span>
                </li>
              </ol>
              <p className="mt-4 text-sm text-mist">
                No pressure, nothing to sign. If your site&rsquo;s in good shape, I&rsquo;ll tell you that too.
              </p>
            </div>
            <div className="mt-4 rounded-2xl bg-sand/70 p-6">
              <p className="font-bold">No website yet?</p>
              <p className="mt-2 text-stone">
                Leave the website field blank and tell me about your business. I&rsquo;ll tell you what a
                first site should have and what it would cost.
              </p>
            </div>
            <TalkLine className="mt-6" />
          </div>
          <div className="lg:col-span-7">
            <h2 className="sr-only">Request your free report</h2>
            <LeadForm variant="check" />
          </div>
        </div>
      </section>
    </>
  );
}
