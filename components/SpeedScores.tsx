import type { Project } from "@/data/projects";

const scores = [
  { key: "mobile", label: "Speed on phones" },
  { key: "desktop", label: "Speed on desktop" },
  { key: "accessibility", label: "Accessibility" },
  { key: "seo", label: "SEO basics" },
] as const;

/**
 * Real, checkable proof for a concept project: Google's own scores for the live site, with a
 * link so a prospect can run the same test themselves.
 */
export default function SpeedScores({ project }: { project: Project }) {
  const { speed } = project;
  if (!speed) return null;
  const testUrl = `https://pagespeed.web.dev/analysis?url=${encodeURIComponent(project.url)}`;

  return (
    <section aria-labelledby="measured" className="mt-14 border-t border-cream/10 pt-10">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3">
        <h2 id="measured" className="t-mono text-mist">
          Measured on Google&rsquo;s own test
        </h2>
        <a
          href={testUrl}
          target="_blank"
          rel="noopener"
          className="text-sm font-bold text-orange-soft underline-offset-4 hover:underline"
        >
          Test it yourself <span aria-hidden="true">↗</span>
          <span className="sr-only"> on Google PageSpeed Insights (opens in a new tab)</span>
        </a>
      </div>
      <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
        {scores.map(({ key, label }) => (
          <div key={key}>
            <dt className="text-sm text-mist">{label}</dt>
            <dd className="mt-2">
              <span className="font-mono text-4xl font-medium tracking-tight text-cream tabular-nums">{speed[key]}</span>
              <span className="ml-1 font-mono text-sm text-mist">/100</span>
              <span aria-hidden="true" className="mt-3 block h-1 overflow-hidden rounded-full bg-cream/10">
                <span className="block h-full rounded-full bg-orange" style={{ width: `${speed[key]}%` }} />
              </span>
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-7 max-w-3xl text-xs leading-relaxed text-mist">
        Google Lighthouse scores for the live homepage, median of three runs, measured {speed.measured}. The phone score
        simulates a slow mobile connection, so it always runs lower than desktop.
      </p>
    </section>
  );
}
