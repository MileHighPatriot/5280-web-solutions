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
};

/**
 * Concept projects: fictional businesses designed as portfolio pieces.
 * Every card and case study labels them as concepts. Add real client work here
 * (without the concept label) as it comes in.
 */
export const projects: Project[] = [
  {
    slug: "summit-frame-build",
    name: "Summit Frame & Build",
    industry: "Framing contractor",
    location: "Aurora, CO",
    url: "https://milehighpatriot.github.io/summit-frame-build/",
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
    slug: "helix-frame-siding",
    name: "Helix Frame & Siding",
    industry: "Framing & siding contractor",
    location: "Denver, CO",
    url: "https://milehighpatriot.github.io/helix-frame-siding/",
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
    slug: "platte-river-builders",
    name: "Platte River Builders",
    industry: "General contractor",
    location: "Denver, CO",
    url: "https://milehighpatriot.github.io/platte-river-builders/",
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
    url: "https://milehighpatriot.github.io/headgate-plumbing/",
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
];
