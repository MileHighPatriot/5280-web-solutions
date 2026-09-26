export type Area = {
  slug: string;
  city: string;
  region: string;
  nearby: string[];
  intro: string;
  local: string;
  industries: string[];
};

/**
 * Service-area pages. Each city gets its own copy so the pages are genuinely
 * useful to locals, not the same page with the name swapped.
 */
export const areas: Area[] = [
  {
    slug: "denver",
    city: "Denver",
    region: "Denver metro",
    nearby: ["Englewood", "Glendale", "Wheat Ridge", "Commerce City", "Edgewater"],
    intro:
      "Denver's small-business scene is crowded, and customers compare you to the shop down the street in about ten seconds on their phone. Your website needs to win those ten seconds.",
    local:
      "From neighborhood restaurants on Tennyson and South Broadway to contractors working across the metro, Denver businesses compete on first impressions. We build sites that load fast, look sharp on a phone, and make it obvious how to call, book, or get a quote. We're local and can meet in person anywhere in the city.",
    industries: ["Restaurants & bars", "Contractors & remodelers", "Salons & barbers", "Auto & detailing shops"],
  },
  {
    slug: "aurora",
    city: "Aurora",
    region: "East metro",
    nearby: ["Centennial", "Parker", "Commerce City", "Southlands"],
    intro:
      "Aurora is one of the biggest and most diverse cities in Colorado, with thousands of family-owned businesses serving a fast-growing population.",
    local:
      "Whether you run a restaurant on East Colfax, a service business near Southlands, or a crew working the new subdivisions out east, a clean, professional website helps new neighbors find and trust you. We keep your services, hours, and contact info front and center.",
    industries: ["Home services & trades", "Restaurants & markets", "Car washes & auto repair", "Cleaning services"],
  },
  {
    slug: "lakewood",
    city: "Lakewood",
    region: "West metro",
    nearby: ["Golden", "Wheat Ridge", "Morrison", "Littleton"],
    intro:
      "Lakewood sits right between downtown Denver and the foothills, and its businesses serve both commuters and weekend crowds headed to the mountains.",
    local:
      "Lakewood's shops, landscapers, and service businesses rely on local word of mouth. A good website backs that up when someone searches your name after a referral. We focus on clear services, real photos, and a Google Business Profile that matches your site.",
    industries: ["Landscaping & lawn care", "Fitness & wellness", "Contractors", "Retail shops"],
  },
  {
    slug: "boulder",
    city: "Boulder",
    region: "Boulder County",
    nearby: ["Louisville", "Lafayette", "Superior", "Longmont"],
    intro:
      "Boulder customers expect polish. They're used to well-designed brands, and a dated website can make a great local business look like an afterthought.",
    local:
      "From Pearl Street retail to wellness studios and outdoor outfitters, Boulder businesses need sites that match the quality of what they sell. We build fast, clean, modern sites that feel premium without a premium agency price tag.",
    industries: ["Wellness & fitness studios", "Cafés & restaurants", "Outdoor & retail shops", "Professional services"],
  },
  {
    slug: "fort-collins",
    city: "Fort Collins",
    region: "Northern Colorado",
    nearby: ["Loveland", "Windsor", "Greeley", "Timnath", "Wellington"],
    intro:
      "Fort Collins has a strong buy-local culture. People want to support independent businesses, and they need to find you online first.",
    local:
      "Old Town shops, breweries, trades, and service businesses across Northern Colorado all compete for the same local searches. We'll make sure your site and Google profile tell people exactly what you do and where, so the buy-local crowd can actually find you.",
    industries: ["Breweries & restaurants", "Trades & home services", "Retail & boutiques", "Landscaping"],
  },
  {
    slug: "colorado-springs",
    city: "Colorado Springs",
    region: "Pikes Peak region",
    nearby: ["Monument", "Fountain", "Manitou Springs", "Falcon", "Castle Rock"],
    intro:
      "Colorado Springs is growing fast, and new residents look for every business (plumbers, restaurants, auto shops) on their phones first.",
    local:
      "From Old Colorado City to the new neighborhoods on the east side, Springs businesses need to be easy to find and easy to contact. We build sites that load fast, rank for local searches, and make calling you the obvious next step.",
    industries: ["Home services & trades", "Auto shops & car washes", "Restaurants", "Landscaping & snow removal"],
  },
];
