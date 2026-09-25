import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Terms for using the ${site.name} website.`,
  alternates: { canonical: "/terms/" },
};

const updated = "September 24, 2026";

export default function TermsPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Terms of use" lede={`Last updated ${updated}.`} />
      <div className="container-x section-y">
        <div className="t-body grid max-w-3xl gap-6 text-stone [&_h2]:mt-6 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-navy">
          <p>
            By using {site.domain}, you agree to these terms. If you don&rsquo;t agree, please don&rsquo;t
            use the site.
          </p>
          <h2>Pricing and services</h2>
          <p>
            Prices on this website are starting rates and are provided for general information. They
            are not a binding offer. Every project is confirmed in a written service agreement that
            sets out the scope, price, term, and payment details before any work begins. If this
            website and a signed agreement differ, the agreement applies.
          </p>
          <h2>Portfolio</h2>
          <p>
            Projects labeled &ldquo;Concept project&rdquo; are fictional businesses created to show my
            design and development work. Names, people, reviews, and contact details on those sites
            are illustrative.
          </p>
          <h2>Content</h2>
          <p>
            The design, text, and graphics on this website belong to {site.name}. Please don&rsquo;t
            copy or reuse them without permission.
          </p>
          <h2>No warranty</h2>
          <p>
            This website is provided &ldquo;as is.&rdquo; I work to keep it accurate and available,
            but I can&rsquo;t guarantee it will always be error-free or uninterrupted.
          </p>
          <h2>Questions</h2>
          <p>
            Email{" "}
            <a href={site.emailHref} className="font-semibold text-navy underline underline-offset-4">
              {site.email}
            </a>{" "}
            or call {site.phoneDisplay}.
          </p>
        </div>
      </div>
    </>
  );
}
