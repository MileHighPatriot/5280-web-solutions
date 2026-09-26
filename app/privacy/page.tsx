import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} handles the information you share through this website.`,
  alternates: { canonical: "/privacy/" },
};

const updated = "September 25, 2026";

export default function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy policy" lede={`Last updated ${updated}.`} />
      <div className="container-x section-y">
        <div className="t-body grid max-w-3xl gap-6 text-stone [&_h2]:mt-6 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-navy">
          <p>
            {site.name} (&ldquo;we,&rdquo; &ldquo;us&rdquo;) respects your privacy. This policy explains
            what information this website collects and how it&rsquo;s used.
          </p>
          <h2>Information you give us</h2>
          <p>
            When you fill out a form on this site, you share details like your name, business name,
            email, phone number, website address, and your message. We use this only to reply to you and
            to provide the services you ask about. Form submissions are delivered to our inbox through
            Web3Forms, a form-delivery service.
          </p>
          <h2>Information collected automatically</h2>
          <p>
            This site may use privacy-friendly, cookie-free analytics (GoatCounter) to count visits and
            see which pages are useful. These tools don&rsquo;t track you across other websites and
            don&rsquo;t use advertising cookies.
          </p>
          <h2>The speed test</h2>
          <p>
            When you use the speed test on the free website check page, the web address you type is sent
            to Google PageSpeed Insights, which loads that site and scores it. The address isn&rsquo;t
            saved on this site, and nothing about you is sent with it.
          </p>
          <h2>What we don&rsquo;t do</h2>
          <p>
            We don&rsquo;t sell, rent, or trade your personal information, and we don&rsquo;t add you to
            marketing lists without your permission.
          </p>
          <h2>Your choices</h2>
          <p>
            You can ask us to see, correct, or delete the information you&rsquo;ve shared by emailing{" "}
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
