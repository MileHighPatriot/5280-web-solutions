import type { TierId } from "@/data/pricing";

export type Industry = {
  slug: string;
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
    projects: ["ditch-rider-brewing"],
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
  {
    slug: "churches",
    label: "Churches & ministries",
    audience: "churches & ministries",
    title: "Church websites that welcome people in.",
    intro:
      "Most first-time visitors check your website before they ever walk through the doors. They want to know when to come, what to expect, and where to park. Your members want sermons, events, and an easy way to give.",
    customerNeeds: [
      {
        title: "A clear plan for a first visit",
        body: "Service times, the address, parking, what to wear, and what happens with the kids, all on one friendly page.",
      },
      {
        title: "Sermons and livestreams",
        body: "Last Sunday's message and the livestream, easy to find on a phone, for anyone who missed it or is home sick.",
      },
      {
        title: "Giving that takes a minute",
        body: "One button to give online, with recurring gifts, so nobody has to hunt for the offering envelope.",
      },
    ],
    mustHaves: [
      "\"Plan your visit\" page with service times, parking, and kids' check-in",
      "Sermon page that shows your latest YouTube videos automatically",
      "Livestream link that's easy to find on Sunday morning",
      "Online giving connected to Tithe.ly, Pushpay, Planning Center, or the platform you already use",
      "Events calendar for services, small groups, and youth nights",
      "Ministry pages for kids, students, groups, and outreach",
      "Staff and leadership bios, with a way to reach each of them",
      "Prayer request and connect-card forms",
    ],
    problems: [
      "Service times are buried three clicks deep",
      "The site still shows last year's Easter and Christmas schedule",
      "Facebook is the only place events and livestreams are posted",
      "The giving link goes to a confusing page that doesn't look like your church",
    ],
    fit: {
      tier: "growth",
      reason: "Sermons update themselves. Events and seasonal service times change, and updates are included.",
    },
    projects: ["lamplight-bible-church"],
  },
  {
    slug: "nonprofits",
    label: "Nonprofits & community groups",
    audience: "nonprofits & community groups",
    title: "Nonprofit websites that turn visitors into supporters.",
    intro:
      "Donors, volunteers, and the people you serve all land on the same website. Each of them needs to understand your mission quickly and know exactly how to help or get help.",
    customerNeeds: [
      {
        title: "Your mission in one glance",
        body: "Who you serve, what you do, and the difference it makes, in plain words and real photos.",
      },
      {
        title: "An easy way to give",
        body: "A donate button on every page, with one-time and monthly giving that takes less than a minute.",
      },
      {
        title: "A way to show up",
        body: "Volunteer sign-ups, upcoming events, and a clear way for people who need help to reach you.",
      },
    ],
    mustHaves: [
      "Donate button on every page, connected to Givebutter, Donorbox, PayPal, or Stripe",
      "Volunteer sign-up form",
      "Events and fundraiser calendar",
      "Impact numbers and stories from the people you serve",
      "Board, staff, and 501(c)(3) details for donors who check",
      "\"Get help\" page for the people you serve, in plain language",
      "Newsletter sign-up so supporters hear from you",
    ],
    problems: [
      "The donate button is hard to find or goes to a page that looks like a scam",
      "Volunteer sign-ups happen over email and get lost",
      "Last year's gala is still on the homepage",
    ],
    fit: {
      tier: "growth",
      reason: "Events, campaigns, and stories change through the year, and updates are included.",
    },
    projects: [],
  },
  {
    slug: "fitness",
    label: "Gyms & fitness studios",
    audience: "gyms & fitness studios",
    title: "Websites for gyms and studios that fill classes.",
    intro:
      "Someone ready to start working out wants to see the space, the schedule, and the price, then book a first class before they talk themselves out of it. Your website should make that easy.",
    customerNeeds: [
      {
        title: "The schedule, right now",
        body: "Today's classes and times, readable on a phone, pulled from the booking app you already use.",
      },
      {
        title: "What it costs",
        body: "Memberships, class packs, and drop-in prices, laid out plainly instead of \"stop by to learn more.\"",
      },
      {
        title: "A low-pressure first step",
        body: "A free first class or intro offer they can claim in a few taps.",
      },
    ],
    mustHaves: [
      "Class schedule connected to Mindbody, Glofox, Wodify, or your booking app",
      "Membership and pricing page",
      "Intro offer or free-class sign-up",
      "Coach and instructor profiles",
      "Photos and video of your space and classes",
      "Member stories and results",
    ],
    problems: [
      "Prices are only shared in person or over the phone",
      "The schedule is an image that's out of date",
      "Nothing on the site tells a beginner they'll fit in",
    ],
    fit: {
      tier: "growth",
      reason: "Promotions, coaches, and seasonal challenges change often, and updates are included.",
    },
    projects: [],
  },
  {
    slug: "health-wellness",
    label: "Health & wellness practices",
    audience: "health & wellness practices",
    title: "Websites for chiropractors, therapists, and wellness practices.",
    intro:
      "Choosing a chiropractor, massage therapist, counselor, or physical therapist is personal. New patients want to know you understand their problem, that you take their insurance, and that booking is simple.",
    customerNeeds: [
      {
        title: "Can you help with this?",
        body: "Clear pages for the conditions you treat and the services you offer, written in everyday language.",
      },
      {
        title: "Insurance and pricing",
        body: "Which plans you accept and what self-pay costs, so there are no surprises at the front desk.",
      },
      {
        title: "Booking without phone tag",
        body: "A Book Now button that goes straight to your scheduling or patient portal.",
      },
    ],
    mustHaves: [
      "Service and condition pages that help you show up in local searches",
      "Insurance accepted and self-pay prices",
      "Book Now button connected to Jane, SimplePractice, or your scheduling system",
      "Provider bios with credentials",
      "New-patient page: what to bring and what to expect",
      "Links to your secure patient portal, so private health details never go through a plain web form",
    ],
    problems: [
      "The site lists services but never says who they're for",
      "New patients have to call just to ask about insurance",
      "Intake forms are PDFs to print, fill out, and bring in",
    ],
    fit: {
      tier: "basic",
      reason: "Once services and providers are set, most practice sites rarely change, so Basic keeps it running for less.",
    },
    projects: [],
  },
  {
    slug: "retail",
    label: "Retail & local shops",
    audience: "retail & local shops",
    title: "Websites for local shops that bring people through the door.",
    intro:
      "Shoppers look you up to see what you carry, whether you're open, and whether it's worth the drive. A good site answers all three and gives them a reason to come in this week.",
    customerNeeds: [
      {
        title: "What's on the shelves",
        body: "The brands, categories, and new arrivals that make your shop worth visiting.",
      },
      {
        title: "Open today?",
        body: "Hours, holiday hours, and the address, right at the top.",
      },
      {
        title: "A reason to come in",
        body: "Sales, events, and new stock, plus the option to buy online or grab a gift card.",
      },
    ],
    mustHaves: [
      "Featured products and brands",
      "Hours, holiday hours, directions, and parking",
      "Sales and events section that's easy to update",
      "Gift cards, or a small online store with Square or Shopify",
      "Newsletter sign-up for sales and new arrivals",
      "Links to your Instagram and Facebook",
    ],
    problems: [
      "No way to see what you carry without driving over",
      "Holiday hours only get posted on Facebook",
      "Customers ask for gift cards and there's nowhere to buy one online",
    ],
    fit: {
      tier: "growth",
      reason: "New arrivals, sales, and holiday hours change through the year, and updates are included.",
    },
    projects: [],
  },
  {
    slug: "professional-services",
    label: "Professional services",
    audience: "accountants, attorneys & advisors",
    title: "Websites for accountants, attorneys, and advisors.",
    intro:
      "Clients hire a CPA, attorney, insurance agent, or financial advisor on trust. Your website has to look established, explain what you handle, and make booking a consultation feel easy.",
    customerNeeds: [
      {
        title: "Do you handle my situation?",
        body: "Plain-English pages for each service, so they can tell in seconds whether you're the right fit.",
      },
      {
        title: "Who they'll work with",
        body: "Real photos, credentials, and a little personality, so you feel like a person and not a firm.",
      },
      {
        title: "An easy first conversation",
        body: "A consultation form or booking link, with clear next steps and what to bring.",
      },
    ],
    mustHaves: [
      "A page for each service or practice area",
      "Team bios with credentials and licenses",
      "Consultation booking or request form",
      "Links to your secure client portal for documents",
      "Articles and deadline reminders, like tax season dates",
      "Required disclaimers and licensing details",
    ],
    problems: [
      "The site looks like it hasn't changed since the firm opened",
      "Services are listed in jargon clients don't search for",
      "Clients email sensitive documents because there's no clear portal link",
    ],
    fit: {
      tier: "basic",
      reason: "Most firm sites change a few times a year, so Basic with the occasional paid edit is usually enough.",
    },
    projects: [],
  },
  {
    slug: "pet-services",
    label: "Pet services",
    audience: "groomers, trainers & pet care",
    title: "Websites for groomers, trainers, and pet care pros.",
    intro:
      "Pet owners are picky about who they trust with their dog or cat, and they should be. Your site should show happy animals, clear prices, and the requirements up front, then make booking simple.",
    customerNeeds: [
      {
        title: "Proof that pets love you",
        body: "Photos of happy, freshly groomed, well-trained pets, and reviews from their people.",
      },
      {
        title: "Prices and requirements",
        body: "What services cost by size or breed, plus vaccination and new-client rules, before they book.",
      },
      {
        title: "Do you come to me?",
        body: "For mobile groomers, walkers, and sitters, a clear map or list of the areas you cover.",
      },
    ],
    mustHaves: [
      "Service menu with prices by size or breed",
      "Photo gallery of happy clients",
      "Online booking or a request form",
      "Vaccination and new-client requirements",
      "Service-area list for mobile services",
      "Boarding and holiday availability notes",
    ],
    problems: [
      "The only photos are on a Facebook page",
      "Owners call just to ask what a groom costs",
      "Holiday boarding fills up and the site doesn't say so",
    ],
    fit: {
      tier: "basic",
      reason: "Prices and services rarely change once they're set, so Basic keeps a great site online for less.",
    },
    projects: [],
  },
  {
    slug: "childcare-education",
    label: "Childcare & tutoring",
    audience: "daycares, preschools & tutors",
    title: "Websites for daycares, preschools, and tutors that parents trust.",
    intro:
      "Parents research childcare and tutoring harder than almost anything else. Your website should answer their biggest questions about safety, staff, and cost, and make scheduling a tour easy.",
    customerNeeds: [
      {
        title: "Is my child safe here?",
        body: "Licensing, background checks, ratios, and staff bios, easy to find, not in the fine print.",
      },
      {
        title: "What a day looks like",
        body: "The daily schedule, curriculum, meals, and photos of the classrooms.",
      },
      {
        title: "Openings and tuition",
        body: "Which ages have spots, what it costs, and a way to join the waitlist or book a tour.",
      },
    ],
    mustHaves: [
      "Tour booking and enrollment or waitlist form",
      "Programs by age, with daily schedules",
      "Colorado licensing and staff credentials",
      "Tuition and enrollment details",
      "Parent resources: handbook, calendar, and snow-day closures",
      "Photo gallery of classrooms and outdoor space",
    ],
    problems: [
      "Parents have to call to find out if there's any opening",
      "No photos of the inside of the building",
      "Snow-day closures only get posted in a parent group chat",
    ],
    fit: {
      tier: "growth",
      reason: "Openings, calendars, and closures change often, and updates are included.",
    },
    projects: [],
  },
  {
    slug: "real-estate",
    label: "Real estate & property management",
    audience: "real estate agents & property managers",
    title: "Websites for real estate agents and property managers.",
    intro:
      "Buyers, sellers, and renters are comparing you with a dozen others. A site of your own, not just a profile on your brokerage's site, shows you know the neighborhoods and makes it easy to reach you.",
    customerNeeds: [
      {
        title: "You know my neighborhood",
        body: "Local guides and market updates for the areas you work, so you show up when people search them.",
      },
      {
        title: "Proof you get results",
        body: "Recent sales, reviews, and a clear picture of how you work with buyers or sellers.",
      },
      {
        title: "A fast way to reach you",
        body: "Home-value requests, showing requests, or rental applications, answered quickly.",
      },
    ],
    mustHaves: [
      "Neighborhood and community pages",
      "Links to your brokerage's listing search",
      "\"What's my home worth?\" request form",
      "Recent sales and client reviews",
      "For property managers: available rentals, applications, and a maintenance request form",
      "Brokerage details and required disclosures",
    ],
    problems: [
      "The only site is a profile page on the brokerage's site",
      "Neighborhood pages are copied from a template and don't rank",
      "Rental listings are out of date",
    ],
    fit: {
      tier: "premium",
      reason: "Market updates and neighborhood posts keep you showing up in searches, and Premium includes a monthly post and unlimited edits.",
    },
    projects: [],
  },
  {
    slug: "photographers-events",
    label: "Photographers & event pros",
    audience: "photographers, venues & event pros",
    title: "Websites for photographers, venues, and event pros.",
    intro:
      "Couples, families, and event planners book on feel. Your website is your portfolio, and it has to look stunning, load fast even with big photos, and make checking your availability easy.",
    customerNeeds: [
      {
        title: "Work that sells itself",
        body: "Galleries that load fast and look beautiful on a phone, organized by the kind of event.",
      },
      {
        title: "Starting prices",
        body: "Packages or starting rates, so people know you're in their budget before they reach out.",
      },
      {
        title: "Is my date open?",
        body: "An inquiry form that asks for the date, place, and guest count up front.",
      },
    ],
    mustHaves: [
      "Fast-loading portfolio galleries",
      "Packages and starting prices",
      "Inquiry form with date, location, and details",
      "Reviews from past clients",
      "For venues: capacity, floor plans, and a virtual walk-through",
      "Preferred vendor and FAQ pages",
    ],
    problems: [
      "Beautiful photos that take forever to load",
      "Every inquiry starts with \"what do you charge?\"",
      "The newest work on the site is from two seasons ago",
    ],
    fit: {
      tier: "growth",
      reason: "Fresh galleries after each season keep your portfolio current, and updates are included.",
    },
    projects: [],
  },
  {
    slug: "breweries-bars",
    label: "Breweries, wineries & bars",
    audience: "breweries, wineries & bars",
    title: "Websites for breweries, wineries, and bars.",
    intro:
      "Colorado takes its craft drinks seriously. People check what's on tap, whether there's a food truck tonight, and if they can bring the dog, and they decide where to go in about a minute.",
    customerNeeds: [
      {
        title: "What's pouring right now",
        body: "A tap list or wine list that's actually current, not a photo of last month's chalkboard.",
      },
      {
        title: "What's happening tonight",
        body: "Trivia, live music, release parties, and the food truck schedule, all in one place.",
      },
      {
        title: "The basics, fast",
        body: "Hours, directions, patio and dog rules, and whether they can book the back room.",
      },
    ],
    mustHaves: [
      "Tap list or menu that's easy to update, or synced from Untappd",
      "Events and food truck calendar",
      "Private event and group booking form",
      "Hours, directions, parking, and patio details",
      "Online store for merch, gift cards, or crowler and bottle pre-orders",
      "Age check where it's needed",
    ],
    problems: [
      "The tap list lives only on Instagram stories",
      "Event info is scattered across three different apps",
      "Private party requests come in by Facebook message and get missed",
    ],
    fit: {
      tier: "growth",
      reason: "Taps, events, and seasonal releases change constantly, and updates are included.",
    },
    projects: ["ditch-rider-brewing"],
  },
  {
    slug: "outdoor-recreation",
    label: "Outdoor outfitters & recreation",
    audience: "outfitters, guides & rental shops",
    title: "Websites for outfitters, guides, and rental shops.",
    intro:
      "Visitors plan their Colorado trip on their phones, often from out of state. Your site has to show what the adventure looks like, what it costs, and let them book before they pick someone else.",
    customerNeeds: [
      {
        title: "What the trip looks like",
        body: "Photos and video of the river, trail, or slopes, and a clear picture of what's included.",
      },
      {
        title: "Is it right for me?",
        body: "Skill levels, age limits, what to bring, and what happens if the weather turns.",
      },
      {
        title: "Book it now",
        body: "Real-time availability and online booking, so they don't have to call during business hours.",
      },
    ],
    mustHaves: [
      "Trips, tours, or rentals with prices and skill levels",
      "Online booking connected to FareHarbor, Peek, or your booking system",
      "What to bring, waivers, and cancellation policies",
      "Seasonal hours and conditions updates",
      "Photo and video galleries",
      "Directions and meeting-spot details for out-of-towners",
    ],
    problems: [
      "Winter prices still showing in July",
      "Booking means calling and leaving a voicemail",
      "Out-of-state visitors can't tell where to meet you",
    ],
    fit: {
      tier: "growth",
      reason: "Seasons, conditions, and trips change through the year, and updates are included.",
    },
    projects: [],
  },
];

/** Industry pages grouped for the index page, so a long list stays easy to scan. */
export const industryGroups: { title: string; slugs: string[] }[] = [
  { title: "Home & trade services", slugs: ["contractors", "landscaping", "cleaning"] },
  { title: "Food, drink & shopping", slugs: ["restaurants", "breweries-bars", "retail"] },
  { title: "Health, beauty & fitness", slugs: ["salons-barbers", "fitness", "health-wellness"] },
  { title: "Churches, nonprofits & education", slugs: ["churches", "nonprofits", "childcare-education"] },
  { title: "Professional & personal services", slugs: ["professional-services", "real-estate", "pet-services"] },
  { title: "Auto, outdoors & events", slugs: ["auto-shops", "outdoor-recreation", "photographers-events"] },
];

/** The short list shown in the header menus. Every industry is on /industries/. */
export const menuIndustries = [
  "contractors",
  "restaurants",
  "churches",
  "salons-barbers",
  "fitness",
  "nonprofits",
  "auto-shops",
  "retail",
].map((slug) => industries.find((industry) => industry.slug === slug)!);

