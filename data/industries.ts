import type { TierId } from "@/data/pricing";

export type Industry = {
  slug: string;
  /** Matches the label in `whoIHelp` (data/services.ts) so the chips can link here. */
  label: string;
  /** "contractors", used in "Websites for ___" */
  audience: string;
  title: string;
  intro: string;
  /** What this trade's customers are trying to do on the website. */
  customerNeeds: { title: string; body: string }[];
  /** Features built into the site for this trade. */
  mustHaves: string[];
  /** Common problems with existing sites in this trade. */
  problems: string[];
  /** Which monthly plan usually fits, and why. */
  fit: { tier: TierId; reason: string };
  /** Concept projects worth showing on this page. */
  projects: string[];
};

/**
 * Industry pages. Written for how each trade actually gets customers,
 * not one page with the business type swapped.
 */
export const industries: Industry[] = [
  {
    slug: "contractors",
    label: "Contractors & trades",
    audience: "contractors & trades",
    title: "Websites that get contractors the call.",
    intro:
      "Homeowners check your website before they call, usually on a phone, often from the job site next door. Your site should look as solid as your work and make asking for a quote easy.",
    customerNeeds: [
      {
        title: "Proof you do good work",
        body: "Photos of real projects, organized by the kind of work, so a homeowner can picture their job.",
      },
      {
        title: "Confidence you're legit",
        body: "Licensing, insurance, service area, and how long you've been at it, easy to find, not buried.",
      },
      {
        title: "A fast way to ask for a quote",
        body: "A short estimate form and a tap-to-call button that works from the driveway.",
      },
    ],
    mustHaves: [
      "Project gallery organized by service",
      "Estimate request form that emails you the details",
      "A page for each service, so you show up for specific searches",
      "Service-area map and city list",
      "Licensing and insurance up front",
      "Tap-to-call on every page",
      "For service trades: an emergency call button and a way to book outside business hours",
      "Published price ranges, so callers know what to expect before you arrive",
    ],
    problems: [
      "A one-page site that doesn't say which towns you serve",
      "Great work, but only three blurry photos to show for it",
      "No way to ask for a quote except calling during work hours",
    ],
    fit: {
      tier: "growth",
      reason: "New project photos and seasonal services are worth adding as you go.",
    },
    projects: ["summit-frame-build", "helix-frame-siding", "platte-river-builders", "headgate-plumbing"],
  },
  {
    slug: "restaurants",
    label: "Restaurants & cafés",
    audience: "restaurants & cafés",
    title: "Restaurant websites people actually use.",
    intro:
      "Hungry people want three things from your website: the menu, the hours, and directions, fast and on a phone. Everything else is a bonus. We make those three impossible to miss.",
    customerNeeds: [
      {
        title: "A menu they can read",
        body: "A real web page, not a blurry PDF that makes them pinch and zoom on a phone.",
      },
      {
        title: "Hours they can trust",
        body: "Holiday hours, specials, and closures kept current, so nobody drives over to a locked door.",
      },
      {
        title: "One tap to order or reserve",
        body: "Buttons that go straight to your online ordering, reservations, or phone.",
      },
    ],
    mustHaves: [
      "Mobile-friendly menu page that's easy to update",
      "Hours and holiday closures up front",
      "Links to your ordering, delivery, and reservation services",
      "Directions and parking notes",
      "Photos that make people hungry",
      "Catering or private event inquiry form",
    ],
    problems: [
      "The menu is a PDF from two years ago",
      "Google shows different hours than the website",
      "The ordering link is hidden at the bottom of the page",
    ],
    fit: {
      tier: "growth",
      reason: "Menus, specials, and hours change often, and updates are included.",
    },
    projects: [],
  },
  {
    slug: "salons-barbers",
    label: "Salons & barbers",
    audience: "salons & barbershops",
    title: "Websites for salons and barbers that fill the book.",
    intro:
      "Most new clients find you on their phone, check your work, and decide in under a minute. Your site should show off your style, list your prices, and get them booked.",
    customerNeeds: [
      {
        title: "Your style, up front",
        body: "Photos of your cuts, color, and space, so the right clients know they've found their place.",
      },
      {
        title: "Services and prices",
        body: "A clear list, so nobody has to call just to ask what a fade or a balayage costs.",
      },
      {
        title: "Booking in one tap",
        body: "A button that goes straight to your booking app, on every page.",
      },
    ],
    mustHaves: [
      "Gallery of your work",
      "Services and price list",
      "Book Now button connected to your booking app",
      "Stylist or barber profiles",
      "Hours, location, and parking",
      "Links to your Instagram",
    ],
    problems: [
      "The only place to see your work is Instagram",
      "Prices aren't listed anywhere",
      "The booking link is hard to find on a phone",
    ],
    fit: {
      tier: "growth",
      reason: "Prices, stylists, and promotions change, and updates are included.",
    },
    projects: [],
  },
  {
    slug: "auto-shops",
    label: "Car washes & auto shops",
    audience: "car washes & auto shops",
    title: "Websites for car washes and auto shops.",
    intro:
      "People searching for a car wash or a mechanic are usually already in the car. Your site needs to load fast, show prices and hours, and get them to your door.",
    customerNeeds: [
      {
        title: "Prices without a phone call",
        body: "Wash packages, memberships, or common repair prices, laid out clearly.",
      },
      {
        title: "Open right now?",
        body: "Hours and wait times right at the top, where a driver can see them at a glance.",
      },
      {
        title: "Directions in one tap",
        body: "A map button that opens their navigation app and gets them to you.",
      },
    ],
    mustHaves: [
      "Wash packages or service menu with prices",
      "Membership or fleet sign-up",
      "Hours and location at the top of the page",
      "One-tap directions and call buttons",
      "Appointment or quote request form for repairs",
      "Reviews and certifications",
    ],
    problems: [
      "A site that was built before most people browsed on phones",
      "Prices you can only get by calling",
      "Memberships that are hard to understand or sign up for",
    ],
    fit: {
      tier: "basic",
      reason: "If your prices and hours rarely change, Basic keeps a great site online for less.",
    },
    projects: [],
  },
  {
    slug: "landscaping",
    label: "Landscaping & lawn care",
    audience: "landscaping & lawn care",
    title: "Websites for landscapers and lawn care crews.",
    intro:
      "Colorado's season is short. When homeowners start searching in spring, your website has to show your work, list your services, and take quote requests while you're out on a mower.",
    customerNeeds: [
      {
        title: "Before-and-after photos",
        body: "Nothing sells a landscape project like seeing what you did for the neighbors.",
      },
      {
        title: "Do you service my area?",
        body: "A clear list of neighborhoods and towns, so they don't have to call to find out.",
      },
      {
        title: "An easy quote request",
        body: "A short form they can fill out at night that lands in your inbox by morning.",
      },
    ],
    mustHaves: [
      "Before-and-after project gallery",
      "Seasonal services, like spring cleanups, sprinklers, and snow removal",
      "Service-area list",
      "Quote request form with photo upload",
      "Recurring service sign-up",
      "Tap-to-call on every page",
    ],
    problems: [
      "The site still promotes last winter's snow removal in June",
      "No photos of finished yards",
      "Quote requests go to an email address nobody checks",
    ],
    fit: {
      tier: "growth",
      reason: "Seasonal services need swapping in and out through the year, and updates are included.",
    },
    projects: [],
  },
  {
    slug: "cleaning",
    label: "Cleaning services",
    audience: "cleaning services",
    title: "Websites for cleaning services people trust.",
    intro:
      "Letting someone into your home or office takes trust. Your website should show you're reliable, insured, and easy to book, before the customer ever picks up the phone.",
    customerNeeds: [
      {
        title: "Reasons to trust you",
        body: "Insurance, background checks, and what's included in a clean, spelled out plainly.",
      },
      {
        title: "A ballpark price",
        body: "Starting prices or a simple estimate, so they know you're in their budget.",
      },
      {
        title: "Easy scheduling",
        body: "A quote or booking form that works from a phone in two minutes.",
      },
    ],
    mustHaves: [
      "Service list for homes, offices, and move-outs",
      "Starting prices or an estimate form",
      "What's-included checklists",
      "Insurance and bonding details",
      "Service-area list",
      "Recurring cleaning sign-up",
    ],
    problems: [
      "No mention of insurance or who will be in the home",
      'Every price is "call for a quote"',
      "A site that looks like a template the neighbors also use",
    ],
    fit: {
      tier: "basic",
      reason: "Most cleaning sites rarely change once they're set up, so Basic is usually enough.",
    },
    projects: [],
  },
];

export const industryByLabel = new Map(industries.map((industry) => [industry.label, industry]));
