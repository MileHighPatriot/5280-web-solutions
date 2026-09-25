/**
 * Blueprint grid for navy areas, plus an orange "spotlight" copy of the grid that
 * lights up around the cursor. The parent needs `relative isolate` and `data-glow`
 * (PointerGlow feeds it the cursor position). Styles: .blueprint / .blueprint-spot
 * in globals.css. `className` adjusts the base grid (opacity, mask).
 */
export default function Blueprint({ className = "" }: { className?: string }) {
  return (
    <>
      <div aria-hidden="true" className={`blueprint pointer-events-none absolute inset-0 -z-10 ${className}`} />
      <div aria-hidden="true" className="blueprint-spot pointer-events-none absolute inset-0 -z-10" />
    </>
  );
}
