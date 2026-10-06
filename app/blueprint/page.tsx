import type { Metadata } from "next";
import BlueprintBuilder from "@/components/BlueprintBuilder";
import Blueprint from "@/components/ui/Blueprint";
import Button from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/Section";
import { openGraphBase, site } from "@/data/site";

const description =
  "Pick what your business does and see the pages and features your site should have. Free, no sign-up.";

export const metadata: Metadata = {
  title: "Website Blueprint",
  description,
  alternates: { canonical: "/blueprint/" },
  openGraph: {
    ...openGraphBase,
    title: `Website Blueprint | ${site.name}`,
    description,
    url: "/blueprint/",
  },
  twitter: {
    card: "summary_large_image",
    title: `Website Blueprint | ${site.name}`,
    description,
    images: ["/og.png"],
  },
};

export default function BlueprintPage() {
  return (
    <>
      {/* Website blueprint builder */}
      <section aria-labelledby="blueprint-title" className="relative isolate overflow-clip bg-navy text-cream">
        <Blueprint />
        <div className="container-x section-y relative">
          <SectionHeading
            id="blueprint-title"
            as="h1"
            dark
            reveal={false}
            eyebrow="Try it · Your website blueprint"
            title={
              <>
                See the plan for your site <span className="text-orange">in ten seconds.</span>
              </>
            }
            lede="Pick what you do and we'll draw up the pages and features your customers look for, the same plan we start every build with. Then add, remove, and rearrange until it fits."
          />
          <div className="mt-12 sm:mt-16">
            <BlueprintBuilder />
          </div>
        </div>
      </section>

      {/* Free report */}
      <section aria-labelledby="report-cta" className="container-x py-16 sm:py-20">
        <div className="reveal flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <h2 id="report-cta" className="t-h3">
              Already have a website?
            </h2>
            <p className="mt-2 max-w-xl text-stone">
              See how it stacks up. The free report grades it A to F, in plain English.
            </p>
          </div>
          <Button href="/free-website-check/" className="shrink-0">
            Get a free full website report
          </Button>
        </div>
      </section>
    </>
  );
}
