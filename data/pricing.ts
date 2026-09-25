/**
 * Every price on the site comes from this file. Change a number here and the
 * pricing page, home page preview, and comparison table all update.
 */

export type TierId = "basic" | "growth" | "premium";

export type Tier = {
  id: TierId;
  name: string;
  monthly: number;
  setupFee: number;
  summary: string;
  features: string[];
  /** Short label for the tier this one builds on, e.g. "Everything in Basic". */
  includesPrevious?: string;
  highlight?: string;
};

export const monthlyTerms = {
  minimumMonths: 12,
  buyout: true,
};

export const tiers: Tier[] = [
  {
    id: "basic",
    name: "Basic",
    monthly: 75,
    setupFee: 250,
    summary: "A professional site, kept online and secure. Best if your info rarely changes.",
    features: [
      "Custom website, designed and built for you",
      "Hosting & domain management",
      "Security & software updates",
      "Uptime monitoring",
      "No content edits included",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    monthly: 125,
    setupFee: 350,
    summary: "For businesses that update hours, menus, photos, or promos now and then.",
    includesPrevious: "Everything in Basic",
    features: [
      "One-time Google Business Profile setup, included when you sign up",
      "2 small content edits per month",
      "Monthly analytics & traffic summary",
    ],
    highlight: "Most popular",
  },
  {
    id: "premium",
    name: "Premium",
    monthly: 200,
    setupFee: 500,
    summary: "Your own web person on call. Changes happen fast, and we check in every month.",
    includesPrevious: "Everything in Growth",
    features: [
      "Unlimited reasonable edits",
      "Priority turnaround (same or next business day)",
      "Monthly check-in call",
      "One extra deliverable a month, your choice: a social media graphic, a blog post, or a review-request campaign",
    ],
  },
];

export const flatFee = {
  buildMin: 1000,
  buildMax: 1500,
  hostingMin: 20,
  hostingMax: 25,
  features: [
    "Custom website, designed and built for you",
    "You own the site outright",
    "Basic SEO setup at launch: meta tags + Google Search Console",
    "Hosting after launch, with no edits included",
    "Changes billed à la carte when you need them",
    "Upgrade to a monthly plan any time",
  ],
};

/** What every build includes, whichever path the client picks. */
export const everyBuild = [
  "Up to 5 pages, designed around your business",
  "Looks right on phones, tablets, and desktops",
  "Contact form and click-to-call",
  "Basic on-page SEO so Google can find you",
  "Launch in about 2–3 weeks",
];

/** Rows for the full monthly comparison table. true = included, false = not, string = detail. */
export const comparison: { label: string; values: Record<TierId, boolean | string> }[] = [
  { label: "Custom website build", values: { basic: true, growth: true, premium: true } },
  { label: "Google Business Profile setup", values: { basic: false, growth: "Included, one-time", premium: "Included, one-time" } },
  { label: "Hosting & domain management", values: { basic: true, growth: true, premium: true } },
  { label: "SSL certificate (the padlock)", values: { basic: true, growth: true, premium: true } },
  { label: "Security & software updates", values: { basic: true, growth: true, premium: true } },
  { label: "Uptime monitoring", values: { basic: true, growth: true, premium: true } },
  { label: "Content edits", values: { basic: false, growth: "2 small / month", premium: "Unlimited reasonable" } },
  { label: "Analytics & traffic summary", values: { basic: false, growth: "Monthly", premium: "Monthly" } },
  { label: "Turnaround on requests", values: { basic: "Standard", growth: "Standard", premium: "Same / next day" } },
  { label: "Monthly check-in call", values: { basic: false, growth: false, premium: true } },
  { label: "Bonus deliverable (graphic, blog post, or review campaign)", values: { basic: false, growth: false, premium: "1 / month" } },
];

export type AddOn = {
  id: string;
  name: string;
  min: number;
  max?: number;
  unit: "one-time" | "each" | "/mo";
  description: string;
};

/** À la carte add-ons, available on any plan or a flat-fee build. */
export const addOns: AddOn[] = [
  {
    id: "google-business-profile",
    name: "Google Business Profile setup",
    min: 150,
    unit: "one-time",
    description: "Get on Google Maps with your hours, photos, and services set up right.",
  },
  {
    id: "logo",
    name: "Logo design or cleanup",
    min: 200,
    max: 300,
    unit: "one-time",
    description: "A new logo, or your current one redrawn so it's crisp everywhere.",
  },
  {
    id: "domain-email",
    name: "Domain + business email setup",
    min: 100,
    unit: "one-time",
    description: "yourbusiness.com and you@yourbusiness.com, set up and connected.",
  },
  {
    id: "extra-edits",
    name: "Extra content edits",
    min: 25,
    max: 40,
    unit: "each",
    description: "Changes beyond your plan's limit, or on a flat-fee site.",
  },
  {
    id: "review-management",
    name: "Review management",
    min: 75,
    unit: "/mo",
    description: "Ask happy customers for Google reviews, and track and answer them.",
  },
  {
    id: "extra-blog-post",
    name: "Extra blog post",
    min: 50,
    unit: "each",
    description: "A short, local-SEO-friendly post written for your site.",
  },
];

/** Price of a single content edit, used wherever à la carte edits are mentioned. */
export const editPrice = addOns.find((addOn) => addOn.id === "extra-edits")!;

export const money = (value: number) => `$${value.toLocaleString("en-US")}`;
export const moneyRange = (min: number, max: number) =>
  min === max ? money(min) : `${money(min)}–${money(max)}`;

/** "$150 one-time", "$25–$40 each", "$75/mo". */
export const addOnPrice = (addOn: AddOn) => {
  const amount = addOn.max ? moneyRange(addOn.min, addOn.max) : money(addOn.min);
  return addOn.unit === "/mo" ? `${amount}/mo` : `${amount} ${addOn.unit}`;
};
