import type { Metadata } from "next";
import Link from "next/link";
import AreaMap from "@/components/AreaMap";
import PageHeader from "@/components/ui/PageHeader";
import { areas } from "@/data/areas";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Service Areas",
  description:
    "Web design for small businesses along the Front Range: Fort Collins, Boulder, Denver, Aurora, Lakewood, Castle Rock, Colorado Springs, and everywhere in between.",
  alternates: { canonical: "/areas/" },
};

export default function AreasPage() {
  return (
    <>
      <PageHeader
        backdrop="topo"
        seed={7}
        eyebrow="Service areas"
        title="Local websites, up and down I-25."
        lede="I work with small businesses from Fort Collins and Greeley to Colorado Springs, meeting in person or working fully remote, whichever is easier for you."
      />

      <section className="container-x section-y">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2 className="t-h2">Featured areas</h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {areas.map((area) => (
                <li key={area.slug}>
                  <Link
                    href={`/areas/${area.slug}/`}
                    className="group block h-full rounded-2xl bg-paper p-6 ring-1 ring-navy/10 transition-[translate,box-shadow] duration-300 hover:-translate-y-1 hover:ring-2 hover:ring-orange"
                  >
                    <p className="t-mono text-stone">{area.region}</p>
                    <p className="t-h3 mt-2 flex items-center justify-between">
                      {area.city}
                      <span aria-hidden="true" className="text-ember transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </p>
                    <p className="mt-2 text-sm text-stone">Also serving {area.nearby.slice(0, 3).join(", ")}</p>
                  </Link>
                </li>
              ))}
            </ul>

            <h2 className="t-h3 mt-14">Every city I serve</h2>
            <p className="mt-4 leading-relaxed text-stone">{site.cities.join(" · ")}</p>
            <p className="mt-4 text-stone">
              Outside this list? If you&rsquo;re anywhere along the Front Range,{" "}
              <Link href="/contact/" className="font-semibold text-navy underline underline-offset-4">
                reach out
              </Link>
              . Remote projects are welcome too.
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-navy p-6 sm:p-10">
              <AreaMap className="mx-auto h-auto w-full max-w-[20rem]" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
