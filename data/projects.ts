export type Project = {
  slug: string;
  name: string;
  industry: string;
  location: string;
  url: string;
  summary: string;
  goal: string;
  decisions: { title: string; body: string }[];
  features: string[];
  stack: string;
  /** Hero screenshots, plus long captures that scroll inside the device frames. */
  images: { desktop: string; mobile: string; fullDesktop: string; fullMobile: string };
  /** Short tag for a featured project, e.g. "Interactive design studio". Featured projects list first. */
  featured?: string;
  /** Retired from the Work grid. The case study page stays up so old links keep working. */
  archived?: boolean;
};

/**
 * Concept projects: fictional businesses designed as portfolio pieces.
 * Every card and case study labels them as concepts. Add real client work here
 * (without the concept label) as it comes in.
 */
export const projects: Project[] = [
  {
    slug: "helix-frame-siding",
    name: "Helix Frame & Siding",
    industry: "Framing & siding contractor",
    location: "Denver, CO",
    featured: "Interactive design studio",
    url: "https://helix.5280webs.com/",
    summary:
      "A contractor site with an interactive design studio: homeowners repaint the siding, trim, and deck on a real house before asking for an estimate.",
    goal: "Siding is a visual decision, and homeowners struggle to picture colors from a swatch. This concept turns the website into a sales tool: customers try colors on a real photo, and the estimate form picks up their choices.",
    decisions: [
      {
        title: "Let customers play",
        body: "A design studio repaints just the siding, gables, or trim on a real project photo. Sky, brick, and landscaping stay as photographed.",
      },
      {
        title: "Estimates that carry context",
        body: "The estimate form reuses the customer's design choices, so the first conversation starts with a clear scope.",
      },
      {
        title: "Show the process",
        body: "Blueprint and plan-sheet pages show the planning behind the work, which builds trust before the first call.",
      },
    ],
    features: [
      "Interactive color and material design studio",
      "Estimate, permit, and contact request forms",
      "Service, project, and blueprint detail pages",
      "Team, trade partner, and review pages",
      "Fast static hosting",
    ],
    stack: "Next.js · TypeScript · Tailwind CSS",
    images: {
      desktop: "/work/helix-frame-siding-desktop.jpg",
      mobile: "/work/helix-frame-siding-mobile.jpg",
      fullDesktop: "/work/helix-frame-siding-full-desktop.jpg",
      fullMobile: "/work/helix-frame-siding-full-mobile.jpg",
    },
  },
  {
    slug: "summit-frame-build",
    name: "Summit Frame & Build",
    industry: "Framing contractor",
    location: "Aurora, CO",
    archived: true,
    url: "https://summit.5280webs.com/",
    summary:
      "An editorial, magazine-style site for a family-run framing crew, built to make a trade business look as premium as its work.",
    goal: "Most framing companies have a phone number and a few photos online. This concept shows how a small crew could stand out to custom-home builders and homeowners with a site that feels like a high-end design magazine and still gets straight to \"request an estimate.\"",
    decisions: [
      {
        title: "Lead with the work",
        body: "A full-screen drone video of a house going up opens the site. Visitors see the craftsmanship before they read a word.",
      },
      {
        title: "Editorial typography",
        body: "A refined serif paired with a clean sans gives the crew a premium voice that stands apart from typical contractor sites.",
      },
      {
        title: "Before & after proof",
        body: "Case studies use a draggable before/after slider that works with a mouse, a finger, or the keyboard.",
      },
    ],
    features: [
      "Full-bleed video hero with phone-sized version",
      "Accessible before/after slider",
      "Working contact form on a fully static site",
      "Local SEO: structured data, sitemap, social share image",
      "Motion that respects reduced-motion settings",
    ],
    stack: "Next.js · TypeScript · Tailwind CSS",
    images: {
      desktop: "/work/summit-frame-build-desktop.jpg",
      mobile: "/work/summit-frame-build-mobile.jpg",
      fullDesktop: "/work/summit-frame-build-full-desktop.jpg",
      fullMobile: "/work/summit-frame-build-full-mobile.jpg",
    },
  },
  {
    slug: "platte-river-builders",
    name: "Platte River Builders",
    industry: "General contractor",
    location: "Denver, CO",
    archived: true,
    url: "https://platte.5280webs.com/",
    summary:
      "A bold, high-contrast site for a full-service Denver contractor, with an online cost calculator and a page for every service.",
    goal: "Show that a contractor site can do real work before the phone rings: explain every service, answer permit questions, and give homeowners a ballpark cost in their browser.",
    decisions: [
      {
        title: "Built at altitude",
        body: "Condensed display type, a dark palette, and gold accents give the brand a confident, job-site feel.",
      },
      {
        title: "Answer the price question",
        body: "An estimate page with a cost calculator lets homeowners size up a project on their own schedule.",
      },
      {
        title: "A page for every search",
        body: "Framing, siding, permits, and additions each get a focused page, which helps the site show up for specific Google searches.",
      },
    ],
    features: [
      "Interactive estimate & cost calculator",
      "Dedicated pages for each service",
      "Reviews, project portfolio, and team pages",
      "LocalBusiness structured data for Google",
      "Hand-built HTML, CSS, and JavaScript, with no framework",
    ],
    stack: "HTML · CSS · JavaScript",
    images: {
      desktop: "/work/platte-river-builders-desktop.jpg",
      mobile: "/work/platte-river-builders-mobile.jpg",
      fullDesktop: "/work/platte-river-builders-full-desktop.jpg",
      fullMobile: "/work/platte-river-builders-full-mobile.jpg",
    },
  },
  {
    slug: "headgate-plumbing",
    name: "Headgate Plumbing & Drain",
    industry: "Plumbing, residential & commercial",
    location: "Denver, CO",
    url: "https://headgate.5280webs.com/",
    summary:
      "A service-first site for a Denver plumbing shop that works like a dispatch desk: symptom triage, published price ranges, and two-hour arrival windows.",
    goal: "Most plumbing sites look the same: blue and white, a van in the hero, and a phone number. This concept answers what people actually need at 3am: how urgent is this, what do I do right now, and what will it cost. It also gives commercial clients a reason to stay on an account.",
    decisions: [
      {
        title: "Sort by symptom, not by service",
        body: "Homeowners don't know what their problem is called. A triage tool asks one or two questions, then gives an urgency level, what to do in the next five minutes, and a price range.",
      },
      {
        title: "Built on real Denver rules",
        body: "The \"Whose pipe is it?\" diagram follows Denver Water's ownership rules, the water heater tool decodes real manufacturer serial codes, and Freeze Watch pulls the live forecast.",
      },
      {
        title: "A look plumbers don't use",
        body: "An oxidized-copper patina palette with a hi-vis accent and a single alert red for emergencies. The type was designed for legibility, and the panels are shaped like pipe fittings.",
      },
    ],
    features: [
      "Symptom triage with urgency levels and next steps",
      "Two-hour arrival-window booking with a live service ticket",
      "Searchable price book and Care Plan savings calculator",
      "Interactive pipe-ownership diagram and water heater age decoder",
      "Live freeze forecast, backflow due-date tool, and ZIP checker",
    ],
    stack: "Next.js · TypeScript · Tailwind CSS",
    images: {
      desktop: "/work/headgate-plumbing-desktop.jpg",
      mobile: "/work/headgate-plumbing-mobile.jpg",
      fullDesktop: "/work/headgate-plumbing-full-desktop.jpg",
      fullMobile: "/work/headgate-plumbing-full-mobile.jpg",
    },
  },
  {
    slug: "lamplight-bible-church",
    name: "Lamplight Bible Church",
    industry: "Church",
    location: "Greenwood Village, CO",
    url: "https://lamplight.5280webs.com/",
    summary:
      "A site for a verse-by-verse Bible church that makes the first visit easy and turns 1,000 sermons into a bookshelf you can browse.",
    goal: "Visitors check a church online before they ever walk in, and most church sites bury what they're looking for: service times, what to expect, and where the kids go. This concept puts the first visit up front and gives a teaching church a way to show its whole archive.",
    decisions: [
      {
        title: "Plan the first Sunday for them",
        body: "Four quick questions (which service, who's coming, kids' ages, how you're getting there) build a personal timeline for the morning, from parking to the right kids room, with a calendar file.",
      },
      {
        title: "The whole Bible on a shelf",
        body: "Sixty-six book spines fill with gold as they're taught. Every book opens to its messages, and each message shows the actual passage text, which can be read aloud.",
      },
      {
        title: "Warm, not churchy",
        body: "Evening indigo, parchment, and one lamp-gold accent, with an editorial serif for Scripture. The logo is an open Bible that forms an oil lamp.",
      },
    ],
    features: [
      "First-visit planner with kids room matching and .ics download",
      "Live stream countdown and fill-in sermon notes",
      "Book-by-book teaching archive with passage text and read-aloud",
      "Home group finder, reading plan with streaks, and inline Scripture for beliefs",
      "Giving demo with fee coverage, budget breakdown, events calendar, and prayer form",
    ],
    stack: "Next.js · TypeScript · Tailwind CSS",
    images: {
      desktop: "/work/lamplight-bible-church-desktop.jpg",
      mobile: "/work/lamplight-bible-church-mobile.jpg",
      fullDesktop: "/work/lamplight-bible-church-full-desktop.jpg",
      fullMobile: "/work/lamplight-bible-church-full-mobile.jpg",
    },
  },
  {
    slug: "ditch-rider-brewing",
    name: "Ditch Rider Brewing & Kitchen",
    industry: "Brewpub & restaurant",
    location: "Greenwood Village, CO",
    url: "https://ditchrider.5280webs.com/",
    summary:
      "A brewpub site that answers \"what's pouring, is the patio open, and can I get food?\" in one look, with a live tap list, a flight builder, and pickup ordering.",
    goal: "Most brewery sites have a PDF menu and an outdated tap list. This concept treats the website as the front of the taproom: what's on right now, what goes with it, whether the patio is open, and how to take some home.",
    decisions: [
      {
        title: "The tap list is the homepage",
        body: "Seventeen beers with style filters, an ABV slider, pour prices, and keg levels, so \"kicking soon\" means something. Each glass is tinted to the beer's actual color.",
      },
      {
        title: "Built on Colorado rules",
        body: "Brewpubs must sell food, so every dish is paired with a beer. Beer can't be shipped, so to-go is pickup only with ID checked. The age gate covers only the beer pages, so families can still see the menu.",
      },
      {
        title: "A look of its own",
        body: "Named for the riders who ran the High Line Canal. Condensed sign-painter type, stout and kraft neutrals, a brick-red accent, and procedurally generated can labels for every beer.",
      },
    ],
    features: [
      "Live tap list with filters, keg levels, and a four-taster flight builder",
      "Pairing-aware kitchen menu with dietary filters",
      "Pickup pre-order with time slots and a 21+ step",
      "Patio status and five-day outlook from the live forecast",
      "Events calendar, private-event estimator, and Mug Club calculator",
    ],
    stack: "Next.js · TypeScript · Tailwind CSS",
    images: {
      desktop: "/work/ditch-rider-brewing-desktop.jpg",
      mobile: "/work/ditch-rider-brewing-mobile.jpg",
      fullDesktop: "/work/ditch-rider-brewing-full-desktop.jpg",
      fullMobile: "/work/ditch-rider-brewing-full-mobile.jpg",
    },
  },
];

/** Projects shown on the Work page, in order. Archived ones keep their case study pages. */
export const listedProjects = ["helix-frame-siding", "headgate-plumbing", "lamplight-bible-church", "ditch-rider-brewing"].map(
  (slug) => projects.find((project) => project.slug === slug)!,
);

/** The homepage shows two: the featured piece, plus one from a different line of work. */
export const homepageProjects = ["helix-frame-siding", "headgate-plumbing"].map(
  (slug) => projects.find((project) => project.slug === slug)!,
);
