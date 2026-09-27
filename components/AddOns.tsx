import { addOnGroups, addOnPrice, addOns, money } from "@/data/pricing";

/** À la carte extras, folded into one disclosure per group so the pricing page stays short. No JavaScript. */
export default function AddOns() {
  return (
    <div className="mx-auto max-w-5xl">
      <div className="reveal flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="t-mono text-stone">À la carte add-ons</p>
          <h2 id="add-ons" className="t-h3 mt-3">
            Need a little extra? Add it to any plan.
          </h2>
        </div>
        <p className="text-sm text-stone">Available on every monthly plan and flat-fee build.</p>
      </div>

      <div className="mt-8 border-t border-navy/15">
        {addOnGroups.map((group) => {
          const items = addOns.filter((addOn) => addOn.group === group.id);
          const from = Math.min(...items.map((addOn) => addOn.min));
          return (
            <details key={group.id} className="reveal group border-b border-navy/15">
              <summary className="flex cursor-pointer items-center justify-between gap-6 py-5">
                <div>
                  <h3 id={`add-ons-${group.id}`} className="text-sm font-bold tracking-wide text-ember uppercase">
                    {group.title}
                  </h3>
                  <span className="mt-1 block text-sm text-stone">
                    {items.length} add-ons · from {money(from)}
                  </span>
                </div>
                <span
                  aria-hidden="true"
                  className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-navy/15 transition-colors group-open:border-orange group-open:bg-orange"
                >
                  <span className="absolute h-0.5 w-3.5 rounded bg-current" />
                  <span className="faq-icon-v absolute h-3.5 w-0.5 rounded bg-current transition-transform duration-300" />
                </span>
              </summary>
              <ul aria-labelledby={`add-ons-${group.id}`} className="grid gap-3 pb-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((addOn) => (
                  <li key={addOn.id} className="rounded-xl bg-paper px-5 py-4 ring-1 ring-navy/10">
                    <p className="font-bold">{addOn.name}</p>
                    <p className="mt-0.5 text-sm font-bold text-ember">{addOnPrice(addOn)}</p>
                    <p className="mt-1 text-sm leading-relaxed text-stone">{addOn.description}</p>
                  </li>
                ))}
              </ul>
            </details>
          );
        })}
      </div>
    </div>
  );
}
