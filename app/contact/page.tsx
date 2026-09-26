import type { Metadata } from "next";
import { BookCallCard } from "@/components/BookCall";
import LeadForm from "@/components/LeadForm";
import PageHeader from "@/components/ui/PageHeader";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get started with ${site.name}. Call or text ${site.phoneDisplay}, email ${site.email}, or send a message. Replies within ${site.replyTime}.`,
  alternates: { canonical: "/contact/" },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        backdrop="logo"
        eyebrow="Contact"
        title="Let's talk about your website."
        lede={`Tell us a little about your business and which option you're leaning toward. We'll reply within ${site.replyTime}, usually sooner.`}
      />

      <section className="container-x section-y">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2 className="sr-only">Send a message</h2>
            <LeadForm variant="contact" />
          </div>

          <aside className="grid content-start gap-4 lg:col-span-5" aria-label="Other ways to reach us">
            <BookCallCard />
            <ContactCard label="Call or text" value={site.phoneDisplay} href={site.phoneHref} />
            <ContactCard label="Email" value={site.email} href={site.emailHref} />
            <div className="rounded-2xl bg-paper p-6 ring-1 ring-navy/10">
              <p className="t-mono text-stone">Hours</p>
              <p className="mt-2 text-lg font-bold">{site.hours}</p>
              <p className="mt-1 text-stone">Texts after hours are answered the next business day.</p>
            </div>
            <div className="rounded-2xl bg-navy p-6 text-cream">
              <p className="t-mono text-mist">What happens next</p>
              <ol className="mt-4 grid gap-3">
                <li>
                  <span className="font-bold text-orange">1.</span> We read your message and look at your
                  current site, if you have one.
                </li>
                <li>
                  <span className="font-bold text-orange">2.</span> We set up a quick 20-minute call at a
                  time that works for you.
                </li>
                <li>
                  <span className="font-bold text-orange">3.</span> You get a clear plan and price, with
                  no pressure to sign.
                </li>
              </ol>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function ContactCard({ label, value, href }: { label: string; value: string; href: string }) {
  return (
    <a
      href={href}
      className="group rounded-2xl bg-paper p-6 ring-1 ring-navy/10 transition-shadow hover:ring-2 hover:ring-orange"
    >
      <p className="t-mono text-stone">{label}</p>
      <p className="mt-2 text-xl font-bold break-words group-hover:text-ember sm:text-2xl">{value}</p>
    </a>
  );
}
