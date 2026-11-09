/**
 * Per-page share-card copy (og:title / og:description, mirrored to twitter:title / twitter:description),
 * keyed by path with a trailing slash. Written by the Marketing Manager (FIX-16); use it word for word.
 * Some differ from the page's <title> or meta description on purpose.
 * A path with no entry keeps the layout's shared card.
 */
export const ogCopy: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Websites for Denver and Front Range Small Businesses",
    description:
      "Phone-first websites built and looked after by a local developer who framed houses around Denver. Monthly plans or a one-time build you own.",
  },
  "/about/": {
    title: "About Kohlton | 5280 Web Solutions",
    description:
      "Meet Kohlton Luper, a former Denver framer who now builds websites for Front Range small businesses. Plain English, one local guy, no agency runaround.",
  },
  "/services/": {
    title: "Website Services | 5280 Web Solutions",
    description:
      "New websites, redesigns, hosting and care, and Google Business Profile setup for Front Range small businesses. Built phone-first.",
  },
  "/pricing/": {
    title: "Website Pricing | 5280 Web Solutions",
    description:
      "Plans from $75/month with a small setup fee, or a one-time flat-fee build you own outright. Clear prices for Front Range small businesses.",
  },
  "/work/": {
    title: "Concept Projects | 5280 Web Solutions",
    description:
      "Concept sites I built to show what is possible for Front Range trades and small businesses: fast, phone-first, and built to get calls.",
  },
  "/contact/": {
    title: "Contact Kohlton | 5280 Web Solutions",
    description:
      "Call or text 720-260-6089, email kohlton@5280webs.com, or send a message. Replies within one business day.",
  },
  "/free-website-check/": {
    title: "Free Full Website Report | 5280 Web Solutions",
    description:
      "Your site graded A to F on speed, Google basics, phones, and trust, then a quick 15-20 minute call to go over it. Free.",
  },
  "/faq/": {
    title: "Website FAQ | 5280 Web Solutions",
    description:
      "Straight answers on pricing, setup fees, timelines, who owns the site, and showing up on Google for Front Range small businesses.",
  },
  "/areas/": {
    title: "Front Range Service Areas | 5280 Web Solutions",
    description:
      "Web design for small businesses from Fort Collins to Colorado Springs, including Boulder, Denver, Aurora, Lakewood, and Castle Rock.",
  },
  "/areas/denver/": {
    title: "Web Design in Denver, CO | 5280 Web Solutions",
    description:
      "Websites for Denver small businesses, built and hosted by a local developer. Plans from $75/mo or a one-time build.",
  },
  "/areas/fort-collins/": {
    title: "Web Design in Fort Collins, CO | 5280 Web Solutions",
    description:
      "Websites for Fort Collins small businesses, built and hosted by a local Front Range developer. Plans from $75/mo or a one-time build.",
  },
  "/industries/": {
    title: "Websites by Industry | 5280 Web Solutions",
    description:
      "Websites built around how each business gets customers: contractors, restaurants, churches, nonprofits, salons, gyms, and shops.",
  },
  "/industries/contractors/": {
    title: "Websites for Contractors and Trades | 5280 Web Solutions",
    description:
      "Built by a local guy who framed houses. Tap-to-call on every screen and a page for each service you do. From $75/mo.",
  },
  "/industries/churches/": {
    title: "Websites for Churches | 5280 Web Solutions",
    description:
      "Service times, directions, and what to expect, easy to find on a phone. Church websites for the Front Range from $75/mo.",
  },
  "/industries/hvac/": {
    title: "HVAC Websites With Tap-to-Call | 5280 Web Solutions",
    description:
      "A call button on every screen and emergency service up top. HVAC websites for the Front Range. Start with a free full website report.",
  },
  "/industries/roofing/": {
    title: "Roofing Websites for Front Range Towns | 5280 Web Solutions",
    description:
      "A page for every town you roof, Fort Collins to Colorado Springs, so Google can find you. Start with a free full website report.",
  },
  "/work/helix-frame-siding/": {
    title: "Helix Frame & Siding (Concept Project)",
    description:
      "A concept contractor site with a design studio: homeowners repaint the siding, trim, and deck on a real house before asking for an estimate.",
  },
  "/work/headgate-plumbing/": {
    title: "Headgate Plumbing & Drain (Concept Project)",
    description:
      "A concept plumbing site that works like a dispatch desk: tap what is wrong, see urgency and likely cost, book a two-hour window.",
  },
  "/work/lamplight-bible-church/": {
    title: "Lamplight Bible Church (Concept Project)",
    description:
      "A concept church site that makes the first visit easy and turns a big sermon library into a bookshelf you can browse.",
  },
  "/work/ditch-rider-brewing/": {
    title: "Ditch Rider Brewing & Kitchen (Concept Project)",
    description:
      "A concept brewpub site with a live tap list, a flight builder, and pickup ordering. What is pouring and is the patio open, in one look.",
  },
  "/work/quality-air/": {
    title: "Quality Air (Concept Project)",
    description:
      "A concept furnace and AC site for Aurora with upfront price ranges, a 30-second repair-or-replace check, and a simple maintenance plan.",
  },
  "/work/lumbre/": {
    title: "Lumbre (Concept Project)",
    description:
      "A concept site for a small Mexican kitchen on Santa Fe Drive: menu, pickup and delivery order builder, daily specials, open-now hours.",
  },
  "/work/morainex/": {
    title: "Morainex (Concept Project)",
    description:
      "A concept electrician site with sample service prices, an EV charger and panel upgrade estimator, and a before and after lighting slider.",
  },
  "/work/strathvane/": {
    title: "Strathvane (Concept Project)",
    description:
      "A concept roofing site that opens with a drone inspection, shows a price range up front, and books a two-hour inspection window.",
  },
  "/work/joes-carwash/": {
    title: "Joe's CarWash (Concept Project)",
    description:
      "A concept car wash site with a live wait time, wash prices with a single or unlimited switch, and a membership savings calculator.",
  },
  "/privacy/": {
    title: "Privacy Policy | 5280 Web Solutions",
    description: "How 5280 Web Solutions handles the information you share through this website.",
  },
  "/terms/": {
    title: "Terms of Use | 5280 Web Solutions",
    description: "Terms for using the 5280 Web Solutions website.",
  },

  // Pending pages (4 towns, 16 industries): drafted 2026-11-07 from each page's own content, in the
  // same shape as the Marketing Manager's copy above. Replace freely.
  "/areas/aurora/": {
    title: "Web Design in Aurora, CO | 5280 Web Solutions",
    description:
      "Websites for Aurora small businesses, built and hosted by a local Front Range developer. Plans from $75/mo or a one-time build.",
  },
  "/areas/lakewood/": {
    title: "Web Design in Lakewood, CO | 5280 Web Solutions",
    description:
      "Websites for Lakewood small businesses, built and hosted by a local Front Range developer. Plans from $75/mo or a one-time build.",
  },
  "/areas/boulder/": {
    title: "Web Design in Boulder, CO | 5280 Web Solutions",
    description:
      "Websites for Boulder small businesses, built and hosted by a local Front Range developer. Plans from $75/mo or a one-time build.",
  },
  "/areas/colorado-springs/": {
    title: "Web Design in Colorado Springs, CO | 5280 Web Solutions",
    description:
      "Websites for Colorado Springs small businesses, built and hosted by a local Front Range developer. Plans from $75/mo or a one-time build.",
  },
  "/industries/restaurants/": {
    title: "Websites for Restaurants and Cafés | 5280 Web Solutions",
    description:
      "Menu, hours, and directions people can find in seconds on a phone. Restaurant and café websites for the Front Range from $75/mo.",
  },
  "/industries/salons-barbers/": {
    title: "Websites for Salons and Barbers | 5280 Web Solutions",
    description:
      "Show off your work, list your prices, and get clients booked with a Book Now button. Salon and barber websites from $75/mo.",
  },
  "/industries/auto-shops/": {
    title: "Websites for Car Washes and Auto Shops | 5280 Web Solutions",
    description:
      "Fast pages with prices, hours, and one-tap directions for drivers who are already in the car. Front Range sites from $75/mo.",
  },
  "/industries/landscaping/": {
    title: "Websites for Landscaping and Lawn Care | 5280 Web Solutions",
    description:
      "Show your work, list your seasonal services, and take quote requests while you're out on a mower. Front Range sites from $75/mo.",
  },
  "/industries/cleaning/": {
    title: "Websites for Cleaning Services | 5280 Web Solutions",
    description:
      "Show you're reliable and insured, list what's included, and make booking easy. Cleaning service websites from $75/mo.",
  },
  "/industries/nonprofits/": {
    title: "Websites for Nonprofits | 5280 Web Solutions",
    description:
      "A donate button on every page, volunteer sign-ups, and an events calendar. Nonprofit websites for the Front Range from $75/mo.",
  },
  "/industries/fitness/": {
    title: "Websites for Gyms and Fitness Studios | 5280 Web Solutions",
    description:
      "Your class schedule, your prices, and a first-class sign-up, easy to find on a phone. Gym and studio websites from $75/mo.",
  },
  "/industries/health-wellness/": {
    title: "Websites for Health and Wellness Practices | 5280 Web Solutions",
    description:
      "Service pages, insurance and self-pay prices, and a Book Now button for new patients. Front Range practice websites from $75/mo.",
  },
  "/industries/retail/": {
    title: "Websites for Local Shops | 5280 Web Solutions",
    description:
      "What you carry, when you're open, and a reason to come in this week. Websites for Front Range retail shops from $75/mo.",
  },
  "/industries/professional-services/": {
    title: "Websites for Accountants, Attorneys and Advisors | 5280 Web Solutions",
    description:
      "Look established, explain what you handle, and make booking a consultation easy. Front Range websites from $75/mo.",
  },
  "/industries/pet-services/": {
    title: "Websites for Groomers, Trainers and Pet Care | 5280 Web Solutions",
    description:
      "Prices by size or breed, photos of happy pets, and simple booking. Pet service websites for the Front Range from $75/mo.",
  },
  "/industries/childcare-education/": {
    title: "Websites for Daycares, Preschools and Tutors | 5280 Web Solutions",
    description:
      "Programs by age, licensing, tuition, and tour booking: the answers parents look for first. Front Range websites from $75/mo.",
  },
  "/industries/real-estate/": {
    title: "Real Estate and Property Management Websites | 5280 Web Solutions",
    description:
      "Neighborhood pages, a home value request form, and your listings, on a site of your own. Front Range websites from $75/mo.",
  },
  "/industries/photographers-events/": {
    title: "Websites for Photographers and Event Pros | 5280 Web Solutions",
    description:
      "Portfolio galleries that load fast, packages and starting prices, and an inquiry form for your date. Front Range sites from $75/mo.",
  },
  "/industries/breweries-bars/": {
    title: "Websites for Breweries, Wineries and Bars | 5280 Web Solutions",
    description:
      "What's on tap, tonight's food truck, and whether the dog can come, in one look. Front Range taproom websites from $75/mo.",
  },
  "/industries/outdoor-recreation/": {
    title: "Websites for Outfitters, Guides and Rentals | 5280 Web Solutions",
    description:
      "Show the trip, the price, and the skill level, then let visitors book online. Outfitter and guide websites from $75/mo.",
  },
};
