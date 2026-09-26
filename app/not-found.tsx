import Image from "next/image";
import { photoCredit } from "@/data/site";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[40rem] overflow-hidden bg-navy text-cream lg:min-h-[85svh]">
      <Image src={photoCredit.src} alt="" fill loading="eager" fetchPriority="high" sizes={photoCredit.sizes} className="-z-20 object-cover object-[50%_80%]" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-navy via-navy/80 to-navy/20" />
      <div className="container-x relative z-10 pt-20 sm:pt-28">
        <p className="t-mono text-mist">Error 404 · off the trail</p>
        <h1 className="t-display mt-6 max-w-[14ch]">
          This page is <span className="text-orange">above the tree line.</span>
        </h1>
        <p className="t-lede mt-6 max-w-lg text-mist">
          The page you&rsquo;re looking for has moved or never existed. Let&rsquo;s get you back to
          base camp.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Button href="/">Back to home</Button>
          <Button href="/pricing/" variant="outline-light">
            See pricing
          </Button>
        </div>
      </div>
    </section>
  );
}
