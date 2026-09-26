import { addOnGroups, addOnPrice, addOns } from "@/data/pricing";

/** À la carte extras. Deliberately lighter than the main tiers: small type, no buttons. */
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

      <div className="mt-8 grid gap-10">
        {addOnGroups.map((group) => (
          <section key={group.id} aria-labelledby={`add-ons-${group.id}`}>
            <h3 id={`add-ons-${group.id}`} className="reveal text-sm font-bold tracking-wide text-ember uppercase">
              {group.title}
            </h3>
            <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {addOns
                .filter((addOn) => addOn.group === group.id)
                .map((addOn) => (
                  <li key={addOn.id} className="reveal rounded-xl bg-paper px-5 py-4 ring-1 ring-navy/10">
                    <p className="font-bold">{addOn.name}</p>
                    <p className="mt-0.5 text-sm font-bold text-ember">{addOnPrice(addOn)}</p>
                    <p className="mt-1 text-sm leading-relaxed text-stone">{addOn.description}</p>
                  </li>
                ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
