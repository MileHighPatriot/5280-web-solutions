import { Check } from "@/components/ui/Button";
import { site } from "@/data/site";

const sections = ["Your top 5 fixes, ranked", "Speed scores, explained", "Quick wins you can do today"];

/** A tilted paper report for the orange Free Website Check header: what the written check covers. */
export default function ReportSheet() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto w-[min(23rem,86%)] rotate-[3deg] rounded-[1.25rem] bg-paper p-7 text-navy shadow-[0_50px_90px_-30px_rgba(0,24,51,0.75)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:rotate-0 sm:p-8"
    >
      <div className="flex items-center justify-between gap-4 border-b-2 border-navy pb-4">
        <span className="t-mono">Website check</span>
        <span className="font-mono text-xs text-stone">yourbusiness.com</span>
      </div>
      <p className="mt-4 font-mono text-xs text-stone">Written report · within {site.checkTurnaround}</p>
      <ol className="mt-6 grid gap-6">
        {sections.map((title, index) => (
          <li key={title}>
            <p className="flex items-baseline gap-3">
              <span className="t-display text-2xl text-ember">0{index + 1}</span>
              <span className="font-bold">{title}</span>
            </p>
            <div className="mt-2.5 ml-10 grid gap-1.5">
              <span className="h-1.5 rounded-full bg-sand" />
              <span className="h-1.5 w-2/3 rounded-full bg-sand" />
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-7 inline-flex items-center gap-2 rounded-full bg-navy px-4 py-2 text-sm font-bold text-cream">
        <Check className="h-4 w-4 text-orange" />
        No sales pitch
      </p>
    </div>
  );
}
