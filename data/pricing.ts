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

/** Early-client offer: the first few clients skip the minimum and go month-to-month from day one. */
export const foundingClients = { count: 5 };

export const money = (value: number) => `$${value.toLocaleString("en-US")}`;
export const moneyRange = (min: number, max: number) =>
  min === max ? money(min) : `${money(min)}–${money(max)}`;


export type AddOnGroup = "launch" | "features" | "design" | "ongoing";

export type AddOn = {
  id: string;
  name: string;
  min: number;
  max?: number;
  unit: "one-time" | "each" | "/mo";
  group: AddOnGroup;
  description: string;
};

export const addOnGroups: { id: AddOnGroup; title: string }[] = [
  { id: "launch", title: "Launch & get found" },
  { id: "features", title: "Features for your site" },
  { id: "design", title: "Design & content" },
  { id: "ongoing", title: "Ongoing help" },
];

/** À la carte add-ons, available on any plan or a flat-fee build. */
export const addOns: AddOn[] = [
  {
    id: "google-business-profile",
    name: "Google Business Profile setup",
    min: 150,
    unit: "one-time",
    group: "launch",
    description: "Get on Google Maps with your hours, photos, and services set up right.",
  },
  {
    id: "directory-listings",
    name: "Directory listings",
    min: 150,
    unit: "one-time",
    group: "launch",
    description: "Listed on Apple Maps, Bing, Yelp, Nextdoor, and more, with the same info everywhere.",
  },
  {
    id: "social-profiles",
    name: "Social media profile setup",
    min: 100,
    unit: "one-time",
    group: "launch",
    description: "Facebook and Instagram pages set up to match your site and link back to it.",
  },
  {
    id: "domain-email",
    name: "Domain + business email setup",
    min: 100,
    unit: "one-time",
    group: "launch",
    description: "yourbusiness.com and you@yourbusiness.com, set up and connected.",
  },
  {
    id: "rush-launch",
    name: "Rush launch",
    min: 250,
    unit: "one-time",
    group: "launch",
    description: "Go live in about a week instead of 2–3, for a grand opening or a busy season.",
  },
  {
    id: "extra-page",
    name: "Extra page",
    min: 100,
    unit: "each",
    group: "features",
    description: "Another page beyond your plan's page count, designed to match the rest of the site.",
  },
  {
    id: "online-booking",
    name: "Online booking setup",
    min: 150,
    unit: "one-time",
    group: "features",
    description: "Connect Square, Calendly, Vagaro, Mindbody, or the app you already use, with Book Now on every page.",
  },
  {
    id: "online-giving",
    name: "Online giving & donations",
    min: 150,
    unit: "one-time",
    group: "features",
    description: "A giving page for churches and nonprofits, with one-time and recurring gifts through your platform.",
  },
  {
    id: "events-calendar",
    name: "Events calendar",
    min: 150,
    unit: "one-time",
    group: "features",
    description: "Services, classes, and events on your site, synced from a Google Calendar you already update.",
  },
  {
    id: "video-library",
    name: "Sermon & video library",
    min: 200,
    unit: "one-time",
    group: "features",
    description: "Your latest YouTube videos and livestreams on your site, updating on their own.",
  },
  {
    id: "online-store",
    name: "Small online store",
    min: 400,
    max: 750,
    unit: "one-time",
    group: "features",
    description: "Sell products, gift cards, or merch with Square or Shopify. Up to 25 products loaded for you.",
  },
  {
    id: "custom-form",
    name: "Custom form",
    min: 75,
    unit: "each",
    group: "features",
    description: "Job applications, volunteer sign-ups, registrations, or intake forms, sent to your inbox.",
  },
  {
    id: "newsletter",
    name: "Newsletter sign-up",
    min: 100,
    unit: "one-time",
    group: "features",
    description: "A sign-up form connected to Mailchimp or your email tool, with a welcome email ready to go.",
  },
  {
    id: "logo",
    name: "Logo design or cleanup",
    min: 200,
    max: 300,
    unit: "one-time",
    group: "design",
    description: "A new logo, or your current one redrawn so it's crisp everywhere.",
  },
  {
    id: "print-design",
    name: "Business card or flyer design",
    min: 75,
    max: 150,
    unit: "each",
    group: "design",
    description: "Print-ready designs that match your site, with a QR code that links straight to it.",
  },
  {
    id: "extra-blog-post",
    name: "Extra blog post",
    min: 50,
    unit: "each",
    group: "design",
    description: "A short, local-SEO-friendly post written for your site.",
  },
  {
    id: "extra-edits",
    name: "Extra content edits",
    min: 25,
    max: 40,
    unit: "each",
    group: "ongoing",
    description: "Changes beyond your plan's limit, or on a flat-fee site.",
  },
  {
    id: "review-management",
    name: "Review management",
    min: 75,
    unit: "/mo",
    group: "ongoing",
    description: "Ask happy customers for Google reviews, and track and answer them.",
  },
  {
    id: "local-seo-boost",
    name: "Local SEO boost",
    min: 100,
    unit: "/mo",
    group: "ongoing",
    description: "A monthly Google Business Profile post, a listing check, and a report on your top local searches.",
  },
];

/** Price of a single content edit, used wherever à la carte edits are mentioned. */
export const editPrice = addOns.find((addOn) => addOn.id === "extra-edits")!;
/** Price of one page beyond a plan's page count. */
export const extraPagePrice = addOns.find((addOn) => addOn.id === "extra-page")!;

/** Site features Growth and Premium set up for free (normally à la carte). */
const includedFeatures = "online booking, events calendar, giving page, newsletter, or custom form";

export const tiers: Tier[] = [
  {
    id: "basic",
    name: "Basic",
    monthly: 75,
    setupFee: 250,
    summary: "A professional site, kept online and secure. Best if your info rarely changes.",
    features: [
      "Custom website, designed and built for you",
      "Up to 5 pages at launch",
      "Hosting & domain management",
      "Security & software updates",
      "Uptime monitoring",
      `Content edits whenever you need them, ${moneyRange(editPrice.min, editPrice.max!)} each`,
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
      "Up to 8 pages at launch",
      "2 small content edits per month",
      `1 site feature set up free: ${includedFeatures}`,
      "Google Business Profile setup, included when you sign up",
      "Listed on Apple Maps, Bing, Yelp, and more, with matching info",
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
      "Up to 12 pages at launch",
      "Unlimited reasonable edits",
      "Priority turnaround (same or next business day)",
      "3 site features set up free instead of 1",
      "Logo cleanup, business email, and social media profiles set up at no charge",
      "Local SEO boost: a monthly Google Business Profile post and search report",
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
  "Up to 5 pages designed around your business (8 on Growth, 12 on Premium)",
  "Looks right on phones, tablets, and desktops",
  "Contact form and click-to-call",
  "Basic on-page SEO so Google can find you",
  "Launch in about 2–3 weeks",
];

/** Rows for the full monthly comparison table. true = included, false = not, string = detail. */
export const comparison: { label: string; values: Record<TierId, boolean | string> }[] = [
  { label: "Custom website build", values: { basic: true, growth: true, premium: true } },
  { label: "Pages at launch", values: { basic: "Up to 5", growth: "Up to 8", premium: "Up to 12" } },
  { label: "Hosting & domain management", values: { basic: true, growth: true, premium: true } },
  { label: "SSL certificate (the padlock)", values: { basic: true, growth: true, premium: true } },
  { label: "Security & software updates", values: { basic: true, growth: true, premium: true } },
  { label: "Uptime monitoring", values: { basic: true, growth: true, premium: true } },
  { label: "Content edits", values: { basic: "À la carte", growth: "2 small / month", premium: "Unlimited reasonable" } },
  { label: "Turnaround on requests", values: { basic: "Standard", growth: "Standard", premium: "Same / next day" } },
  { label: "Site features set up free (booking, calendar, giving, and more)", values: { basic: false, growth: "1", premium: "3" } },
  { label: "Google Business Profile setup", values: { basic: false, growth: "Included, one-time", premium: "Included, one-time" } },
  { label: "Apple Maps, Bing & Yelp listings", values: { basic: false, growth: "Included, one-time", premium: "Included, one-time" } },
  { label: "Analytics & traffic summary", values: { basic: false, growth: "Monthly", premium: "Monthly" } },
  { label: "Logo cleanup, business email & social profiles", values: { basic: false, growth: false, premium: "Included, one-time" } },
  { label: "Local SEO boost (Google post + search report)", values: { basic: false, growth: false, premium: "Monthly" } },
  { label: "Monthly check-in call", values: { basic: false, growth: false, premium: true } },
  { label: "Bonus deliverable (graphic, blog post, or review campaign)", values: { basic: false, growth: false, premium: "1 / month" } },
];

/** "$150 one-time", "$25–$40 each", "$75/mo". */
export const addOnPrice = (addOn: AddOn) => {
  const amount = addOn.max ? moneyRange(addOn.min, addOn.max) : money(addOn.min);
  return addOn.unit === "/mo" ? `${amount}/mo` : `${amount} ${addOn.unit}`;
};

/** Setup fee plus the first 12 months, so the year-one cost is never a surprise. */
export const yearOne = (tier: Tier) => tier.setupFee + tier.monthly * monthlyTerms.minimumMonths;
