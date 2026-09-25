import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} handles the information you share through this website.`,
  alternates: { canonical: "/privacy/" },
};

const updated = "September 24, 2026";

export default function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy policy" lede={`Last updated ${updated}.`} />
      <div className="container-x section-y">
        <div className="t-body grid max-w-3xl gap-6 text-stone [&_h2]:mt-6 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-navy">
          <p>
            {site.name} (&ldquo;I,&rdquo; &ldquo;me&rdquo;) respects your privacy. This policy explains
            what information this website collects and how it&rsquo;s used.
          </p>
          <h2>Information you give me</h2>
          <p>
            When you fill out a form on this site, you share details like your name, business name,
            email, phone number, website address, and your message. I use this only to reply to you and
            to provide the services you ask about. Form submissions are delivered to my inbox through
            Web3Forms, a form-delivery service.
          </p>
          <h2>Information collected automatically</h2>
          <p>
            This site may use privacy-friendly, cookie-free analytics to count visits and see which
            pages are useful. These tools don&rsquo;t track you across other websites and don&rsquo;t
            use advertising cookies.
          </p>
          <h2>What I don&rsquo;t do</h2>
          <p>
            I don&rsquo;t sell, rent, or trade your personal information, and I don&rsquo;t add you to
            marketing lists without your permission.
          </p>
          <h2>Your choices</h2>
          <p>
            You can ask me to see, correct, or delete the information you&rsquo;ve shared by emailing{" "}
            <a href={site.emailHref} className="font-semibold text-navy underline underline-offset-4">
              {site.email}
            </a>
            .
          </p>
          <h2>Changes</h2>
          <p>If this policy changes, the updated version will be posted on this page with a new date.</p>
        </div>
      </div>
    </>
  );
}
