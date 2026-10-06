/**
 * The blueprint builder on /blueprint/: a visitor types their business name and picks an
 * industry, and we draw the plan for their home page as a blueprint, not a design.
 * Each industry starts with the features its customers look for (from the must-haves
 * on its industry page), and the visitor can add, remove, and reorder sections.
 * `{town}` is filled in from the form. No pricing here on purpose.
 */

export type BlockVariant =
  | "rows"
  | "cards"
  | "media"
  | "bars"
  | "chips"
  | "form"
  | "gallery"
  | "slots"
  | "map"
  | "quotes"
  | "faq"
  | "email"
  | "team"
  | "callout"
  | "products"
  | "social"
  | "stats"
  | "steps"
  | "logos"
  | "compare"
  | "chat"
  | "banner"
  | "calendar"
  | "split";

export type Block = {
  id: string;
  /** Short label drawn on the blueprint. */
  tag: string;
  /** One line on what it does, in the customer's terms. */
  legend: string;
  variant: BlockVariant;
  rows?: [string, string][];
  items?: string[];
  button?: string;
  /** A page this feature adds to the sitemap. */
  page?: string;
  /** Where it sits in the "Add a feature" menu. An industry's own blocks leave this out. */
  group?: FeatureGroup;
};

export type BlueprintPreset = {
  slug: string;
  chip: string;
  /** "church", used in "See a church concept we built" and the status line. */
  noun: string;
  example: string;
  headline: string;
  ctas: [string, string];
  nav: string[];
  /** Industry-specific sections: the defaults first, then extras for the tray. */
  blocks: Block[];
  defaults: string[];
  /** Common extras that this industry already covers another way. */
  skip?: string[];
  /** Pages every site of this kind has, besides Home and any a feature adds. */
  pages: string[];
  /** Closest concept project, for "See a ___ concept we built". */
  project?: string;
};

/** How the "Add a feature" menu is sorted. An industry's own features come first, under "For your ___". */
export type FeatureGroup =
  | "industry"
  | "touch"
  | "trust"
  | "show"
  | "sell"
  | "return"
  | "info"
  | "extras";

export const featureGroups: { id: FeatureGroup; label: string }[] = [
  { id: "industry", label: "For your {noun}" },
  { id: "touch", label: "Get in touch" },
  { id: "trust", label: "Build trust" },
  { id: "show", label: "Show your work" },
  { id: "sell", label: "Sell & book" },
  { id: "return", label: "Bring them back" },
  { id: "info", label: "Helpful info" },
  { id: "extras", label: "Page extras" },
];

/** Extras any business can add. */
export const commonBlocks: Block[] = [
  // Get in touch
  {
    id: "contact",
    tag: "Contact form",
    legend: "A contact form that sends messages to your inbox",
    variant: "form",
    items: ["Name", "Email"],
    button: "Send",
    group: "touch",
  },
  {
    id: "callbar",
    tag: "Tap to call",
    legend: "A call button that stays on screen on phones",
    variant: "callout",
    button: "Tap to call",
    group: "touch",
  },
  {
    id: "chat",
    tag: "Live chat",
    legend: "A chat bubble so visitors can ask a quick question",
    variant: "chat",
    group: "touch",
  },
  {
    id: "text",
    tag: "Text us",
    legend: "Customers can text you right from the site",
    variant: "callout",
    button: "Text us",
    group: "touch",
  },
  {
    id: "quote",
    tag: "Quote request",
    legend: "A quick quote form, with room for photos",
    variant: "form",
    items: ["Details", "Photos"],
    button: "Get quote",
    group: "touch",
  },
  {
    id: "hours",
    tag: "Hours",
    legend: "Your hours, with holiday closures that update themselves",
    variant: "rows",
    rows: [
      ["Mon–Fri", "8–6"],
      ["Saturday", "9–2"],
    ],
    group: "touch",
  },
  {
    id: "map",
    tag: "Directions",
    legend: "Map, directions, and parking notes",
    variant: "map",
    group: "touch",
  },

  // Build trust
  {
    id: "reviews",
    tag: "Reviews",
    legend: "Your Google reviews, shown right on your site",
    variant: "quotes",
    group: "trust",
  },
  {
    id: "rating",
    tag: "Star rating",
    legend: "Your star rating and review count, near the top",
    variant: "stats",
    rows: [
      ["4.9", "Stars"],
      ["212", "Reviews"],
    ],
    group: "trust",
  },
  {
    id: "stats",
    tag: "By the numbers",
    legend: "Years in business, jobs done, happy customers",
    variant: "stats",
    rows: [
      ["15", "Years"],
      ["1,200", "Customers"],
      ["98%", "Would return"],
    ],
    group: "trust",
  },
  {
    id: "why",
    tag: "Why choose us",
    legend: "Three reasons to pick you, in plain words",
    variant: "cards",
    items: ["Local", "On time", "Fair"],
    group: "trust",
  },
  {
    id: "awards",
    tag: "Awards & badges",
    legend: "Awards, memberships, and certifications",
    variant: "logos",
    items: ["Award", "BBB", "Certified"],
    group: "trust",
  },
  {
    id: "press",
    tag: "As seen in",
    legend: "Logos of the news, magazines, and podcasts that covered you",
    variant: "logos",
    items: ["News", "Magazine", "Podcast"],
    group: "trust",
  },
  {
    id: "guarantee",
    tag: "Our guarantee",
    legend: "Your promise, in one sentence, where people can see it",
    variant: "callout",
    button: "100% satisfaction guarantee",
    group: "trust",
  },
  {
    id: "story",
    tag: "Our story",
    legend: "How you started, told as a short timeline",
    variant: "steps",
    items: ["2009", "2016", "Today"],
    page: "About",
    group: "trust",
  },
  {
    id: "team",
    tag: "Team",
    legend: "Team profiles with photos and short bios",
    variant: "team",
    page: "Team",
    group: "trust",
  },
  {
    id: "videoreviews",
    tag: "Video reviews",
    legend: "Short videos of real customers",
    variant: "media",
    button: "▶ Customer video",
    group: "trust",
  },
  {
    id: "stories",
    tag: "Customer stories",
    legend: "Real customers: the problem, what you did, the result",
    variant: "bars",
    page: "Stories",
    group: "trust",
  },

  // Show your work
  {
    id: "gallery",
    tag: "Photo gallery",
    legend: "Photos of your work, your space, and your people",
    variant: "gallery",
    page: "Gallery",
    group: "show",
  },
  {
    id: "beforeafter",
    tag: "Before & after",
    legend: "A slider that shows the before and the after",
    variant: "compare",
    group: "show",
  },
  {
    id: "videotour",
    tag: "Video tour",
    legend: "A short video walk-through of your place",
    variant: "media",
    button: "▶ Video tour",
    group: "show",
  },
  {
    id: "tour360",
    tag: "360° tour",
    legend: "A virtual tour people can look around in",
    variant: "media",
    button: "⟲ 360° tour",
    group: "show",
  },
  {
    id: "featured",
    tag: "Featured project",
    legend: "One standout job, with a photo and the story behind it",
    variant: "split",
    group: "show",
  },
  {
    id: "social",
    tag: "Instagram",
    legend: "Your latest Instagram posts",
    variant: "social",
    group: "show",
  },

  // Sell & book
  {
    id: "booking",
    tag: "Online booking",
    legend: "Customers pick a time and book themselves",
    variant: "slots",
    items: ["9:00", "10:30", "1:00", "3:30"],
    group: "sell",
  },
  {
    id: "store",
    tag: "Online store",
    legend: "A small online store with Square or Shopify",
    variant: "products",
    page: "Shop",
    group: "sell",
  },
  {
    id: "giftcards",
    tag: "Gift cards",
    legend: "Gift cards people can buy and send online",
    variant: "callout",
    button: "Buy a gift card",
    group: "sell",
  },
  {
    id: "specials",
    tag: "Specials & coupons",
    legend: "This month's deals, easy for you to change",
    variant: "chips",
    items: ["10% off", "Free", "2 for 1"],
    group: "sell",
  },
  {
    id: "memberships",
    tag: "Memberships",
    legend: "Membership plans people can join online",
    variant: "cards",
    items: ["Basic", "Plus", "VIP"],
    page: "Membership",
    group: "sell",
  },
  {
    id: "pricing",
    tag: "Price list",
    legend: "A simple price list, so people know what to expect",
    variant: "rows",
    rows: [
      ["Basic", "$"],
      ["Premium", "$$"],
    ],
    page: "Pricing",
    group: "sell",
  },
  {
    id: "pay",
    tag: "Pay online",
    legend: "Customers pay an invoice or a deposit online",
    variant: "form",
    items: ["Invoice #", "Amount"],
    button: "Pay",
    group: "sell",
  },
  {
    id: "financing",
    tag: "Financing",
    legend: "Payment plans for bigger purchases",
    variant: "callout",
    button: "Check your options",
    group: "sell",
  },

  // Bring them back
  {
    id: "newsletter",
    tag: "Email sign-up",
    legend: "Newsletter sign-up so customers hear from you",
    variant: "email",
    group: "return",
  },
  {
    id: "calendar",
    tag: "Events calendar",
    legend: "A calendar of what's coming up",
    variant: "calendar",
    page: "Events",
    group: "return",
  },
  {
    id: "blog",
    tag: "Blog",
    legend: "Tips and stories that help you show up on Google",
    variant: "bars",
    page: "Blog",
    group: "return",
  },
  {
    id: "news",
    tag: "News & updates",
    legend: "A news page that's easy to post to",
    variant: "bars",
    page: "News",
    group: "return",
  },
  {
    id: "rewards",
    tag: "Rewards program",
    legend: "Points or punch cards that bring people back",
    variant: "callout",
    button: "Join rewards",
    group: "return",
  },
  {
    id: "referral",
    tag: "Refer a friend",
    legend: "Customers send a friend your way",
    variant: "form",
    items: ["Friend's email"],
    button: "Send",
    group: "return",
  },
  {
    id: "youtube",
    tag: "YouTube channel",
    legend: "Your latest videos, pulled in automatically",
    variant: "media",
    button: "▶ Latest video",
    group: "return",
  },
  {
    id: "facebook",
    tag: "Facebook feed",
    legend: "Your latest Facebook posts",
    variant: "social",
    group: "return",
  },

  // Helpful info
  {
    id: "faq",
    tag: "FAQ",
    legend: "Answers to the questions customers ask most",
    variant: "faq",
    page: "FAQ",
    group: "info",
  },
  {
    id: "how",
    tag: "How it works",
    legend: "What happens first, next, and last, in three steps",
    variant: "steps",
    items: ["Call", "Plan", "Done"],
    group: "info",
  },
  {
    id: "area",
    tag: "Service area",
    legend: "A map and list of the towns you serve",
    variant: "map",
    page: "Service areas",
    group: "info",
  },
  {
    id: "downloads",
    tag: "Forms & downloads",
    legend: "Forms and PDFs people can grab before they come in",
    variant: "rows",
    rows: [
      ["New customer form", "PDF"],
      ["Brochure", "PDF"],
    ],
    group: "info",
  },
  {
    id: "policies",
    tag: "Policies",
    legend: "Cancellations, payments, and the fine print, in plain words",
    variant: "rows",
    rows: [
      ["Cancellations", "24 hr"],
      ["Payment", "All cards"],
    ],
    group: "info",
  },
  {
    id: "spanish",
    tag: "En español",
    legend: "Your site in English and Spanish",
    variant: "chips",
    items: ["English", "Español"],
    group: "info",
  },
  {
    id: "careers",
    tag: "Now hiring",
    legend: "Open jobs and an easy way to apply",
    variant: "callout",
    button: "See open jobs",
    page: "Careers",
    group: "info",
  },

  // Page extras
  {
    id: "announce",
    tag: "Announcement bar",
    legend: "A slim bar for news, closures, or a sale",
    variant: "banner",
    button: "Closed Monday for the holiday",
    group: "extras",
  },
  {
    id: "cta",
    tag: "Call-to-action banner",
    legend: "A bold banner that asks for the next step",
    variant: "callout",
    button: "Get started today",
    group: "extras",
  },
  {
    id: "split",
    tag: "Image & text",
    legend: "A big photo beside a few lines about you",
    variant: "split",
    group: "extras",
  },
  {
    id: "logos",
    tag: "Partner logos",
    legend: "A strip of the brands and partners you work with",
    variant: "logos",
    items: ["Partner", "Partner", "Partner"],
    group: "extras",
  },
  {
    id: "bigquote",
    tag: "Big quote",
    legend: "One standout line from a customer, big and bold",
    variant: "quotes",
    group: "extras",
  },
  {
    id: "countdown",
    tag: "Countdown",
    legend: "A countdown to your big event, sale, or opening",
    variant: "chips",
    items: ["12 d", "04 h", "33 m"],
    group: "extras",
  },
  {
    id: "videobanner",
    tag: "Video banner",
    legend: "A full-width video that plays quietly in the background",
    variant: "media",
    button: "▶ Background video",
    group: "extras",
  },
];

export const blueprintPresets: BlueprintPreset[] = [
  {
    slug: "contractors",
    chip: "Contractor",
    noun: "contractor",
    example: "Front Range Remodeling",
    headline: "Built right the first time.",
    ctas: ["Get an estimate", "Call now"],
    nav: ["Services", "Projects", "About"],
    blocks: [
      {
        id: "estimate",
        tag: "Estimate request",
        legend: "Estimate request form that emails you the details",
        variant: "form",
        items: ["Project", "Town"],
        button: "Request",
      },
      {
        id: "trust",
        tag: "Licensed & insured",
        legend: "Licensing and insurance up front",
        variant: "rows",
        rows: [
          ["Licensed", "✓"],
          ["Insured", "✓"],
        ],
      },
      {
        id: "services",
        tag: "Services",
        legend: "A page for each service, so you show up for specific searches",
        variant: "cards",
        items: ["Remodels", "Decks", "Repairs"],
        page: "Services",
      },
      {
        id: "projects",
        tag: "Project gallery",
        legend: "Project gallery organized by service",
        variant: "gallery",
        page: "Projects",
      },
      {
        id: "area",
        tag: "Service area",
        legend: "Service-area map and city list",
        variant: "map",
        page: "Service areas",
      },
      {
        id: "prices",
        tag: "Price ranges",
        legend: "Published price ranges, so callers know what to expect",
        variant: "rows",
        rows: [
          ["Repairs", "$"],
          ["Remodels", "$$"],
        ],
      },
      {
        id: "emergency",
        tag: "Emergency line",
        legend: "An emergency call button and after-hours booking",
        variant: "callout",
        button: "24/7 emergency call",
      },
      {
        id: "warranty",
        tag: "Warranty",
        legend: "Your workmanship warranty, spelled out",
        variant: "callout",
        button: "5-year workmanship warranty",
      },
      {
        id: "materials",
        tag: "Materials we use",
        legend: "The products and materials you trust",
        variant: "logos",
        items: ["Decking", "Siding", "Windows"],
      },
      {
        id: "process",
        tag: "Our process",
        legend: "From first call to final walk-through, step by step",
        variant: "steps",
        items: ["Estimate", "Build", "Walk-through"],
      },
      {
        id: "permits",
        tag: "Permits handled",
        legend: "What you handle for them: permits, inspections, cleanup",
        variant: "rows",
        rows: [
          ["Permits", "We pull them"],
          ["Cleanup", "Daily"],
        ],
      },
    ],
    defaults: ["estimate", "trust", "services", "projects", "area"],
    skip: ["gallery", "map", "contact", "quote", "pricing", "how"],
    pages: ["About", "Contact"],
    project: "helix-frame-siding",
  },
  {
    slug: "restaurants",
    chip: "Restaurant",
    noun: "restaurant",
    example: "Blue Spruce Kitchen",
    headline: "Made from scratch in {town}.",
    ctas: ["See the menu", "Order pickup"],
    nav: ["Menu", "Hours", "Events"],
    blocks: [
      {
        id: "hours",
        tag: "Hours",
        legend: "Hours and holiday closures up front",
        variant: "rows",
        rows: [
          ["Today", "11am–9pm"],
          ["Happy hour", "3–6pm"],
        ],
      },
      {
        id: "menu",
        tag: "Menu",
        legend: "A phone-friendly menu page that's easy to update",
        variant: "rows",
        rows: [
          ["Green chile burger", "$16"],
          ["Street tacos", "$13"],
        ],
        page: "Menu",
      },
      {
        id: "order",
        tag: "Order & reserve",
        legend: "Links to your ordering, delivery, and reservation services",
        variant: "callout",
        button: "Order pickup · Reserve",
      },
      {
        id: "photos",
        tag: "Food photos",
        legend: "Photos that make people hungry",
        variant: "gallery",
      },
      {
        id: "directions",
        tag: "Directions",
        legend: "Directions and parking notes",
        variant: "map",
      },
      {
        id: "private",
        tag: "Private events",
        legend: "Catering or private event inquiry form",
        variant: "form",
        items: ["Date", "Guests"],
        button: "Inquire",
        page: "Private events",
      },
      {
        id: "events",
        tag: "Events",
        legend: "Live music, trivia, and specials",
        variant: "bars",
        page: "Events",
      },
      {
        id: "specials",
        tag: "Weekly specials",
        legend: "Taco Tuesday, Friday fish fry, and whatever's next",
        variant: "rows",
        rows: [
          ["Tuesday", "Taco night"],
          ["Friday", "Fish fry"],
        ],
      },
      {
        id: "catering",
        tag: "Catering",
        legend: "Catering menus for offices, weddings, and parties",
        variant: "cards",
        items: ["Office", "Wedding", "Party"],
        page: "Catering",
      },
      {
        id: "chef",
        tag: "Meet the chef",
        legend: "The people behind the food",
        variant: "team",
      },
      {
        id: "dietary",
        tag: "Dietary icons",
        legend: "Gluten-free, vegan, and dairy-free marked on the menu",
        variant: "chips",
        items: ["GF", "Vegan", "DF"],
      },
      {
        id: "waitlist",
        tag: "Join the waitlist",
        legend: "Guests join the waitlist from their phone",
        variant: "callout",
        button: "Join the waitlist",
      },
    ],
    defaults: ["hours", "menu", "order", "photos", "directions"],
    skip: ["gallery", "map", "calendar", "pricing", "booking"],
    pages: ["About", "Contact"],
    project: "ditch-rider-brewing",
  },
  {
    slug: "churches",
    chip: "Church",
    noun: "church",
    example: "Pine Ridge Church",
    headline: "You're welcome here.",
    ctas: ["Plan your visit", "Watch live"],
    nav: ["Visit", "Sermons", "Give"],
    blocks: [
      {
        id: "sunday",
        tag: "This Sunday",
        legend:
          "Plan-your-visit info: service times, parking, and kids' check-in",
        variant: "rows",
        rows: [
          ["Services", "9:00 · 11:00"],
          ["Kids check-in", "8:45"],
        ],
        page: "Plan a visit",
      },
      {
        id: "sermons",
        tag: "Latest sermon",
        legend:
          "A sermon page that shows your latest YouTube videos automatically",
        variant: "media",
        page: "Sermons",
      },
      {
        id: "events",
        tag: "Events",
        legend: "Events calendar for services, small groups, and youth nights",
        variant: "bars",
        page: "Events",
      },
      {
        id: "give",
        tag: "Give online",
        legend: "Online giving through Tithe.ly, Pushpay, or Planning Center",
        variant: "chips",
        items: ["$25", "$50", "$100"],
        page: "Give",
      },
      {
        id: "prayer",
        tag: "Prayer & connect",
        legend: "Prayer request and connect-card forms",
        variant: "form",
        items: ["Name", "Request"],
        button: "Send",
      },
      {
        id: "live",
        tag: "Livestream",
        legend: "A livestream link that's easy to find on Sunday morning",
        variant: "callout",
        button: "▶ Watch live",
      },
      {
        id: "ministries",
        tag: "Ministries",
        legend: "Ministry pages for kids, students, groups, and outreach",
        variant: "cards",
        items: ["Kids", "Students", "Groups"],
        page: "Ministries",
      },
      {
        id: "staff",
        tag: "Staff",
        legend: "Staff and leadership bios, with a way to reach each of them",
        variant: "team",
        page: "Staff",
      },
      {
        id: "new",
        tag: "New here?",
        legend: "A friendly first step for first-time guests",
        variant: "callout",
        button: "I'm new",
      },
      {
        id: "beliefs",
        tag: "What we believe",
        legend: "Your statement of faith, in plain words",
        variant: "bars",
        page: "Beliefs",
      },
      {
        id: "groups",
        tag: "Small groups",
        legend: "Small groups people can find and join",
        variant: "cards",
        items: ["Men", "Women", "Couples"],
        page: "Groups",
      },
      {
        id: "serve",
        tag: "Serve",
        legend: "Volunteer teams and a way to sign up",
        variant: "form",
        items: ["Name", "Team"],
        button: "Join",
      },
      {
        id: "reading",
        tag: "Reading plan",
        legend: "A Bible reading plan to follow along with the teaching",
        variant: "chips",
        items: ["Day 1", "Day 2", "Day 3"],
      },
    ],
    defaults: ["sunday", "sermons", "events", "give", "prayer"],
    skip: [
      "team",
      "calendar",
      "store",
      "pricing",
      "memberships",
      "financing",
      "specials",
    ],
    pages: ["About", "Contact"],
    project: "lamplight-bible-church",
  },
  {
    slug: "salons-barbers",
    chip: "Salon",
    noun: "salon",
    example: "Juniper Hair Studio",
    headline: "Look like you, only better.",
    ctas: ["Book now", "See our work"],
    nav: ["Services", "Team", "Gallery"],
    blocks: [
      {
        id: "book",
        tag: "Book now",
        legend: "A Book Now button connected to your booking app",
        variant: "slots",
        items: ["9:30", "11:00", "1:15", "3:45"],
      },
      {
        id: "services",
        tag: "Services & prices",
        legend: "Your services and price list",
        variant: "rows",
        rows: [
          ["Cut & style", "$"],
          ["Color", "$$"],
        ],
        page: "Services",
      },
      {
        id: "work",
        tag: "Our work",
        legend: "A gallery of your work",
        variant: "gallery",
        page: "Gallery",
      },
      {
        id: "stylists",
        tag: "Stylists",
        legend: "Stylist or barber profiles",
        variant: "team",
        page: "Team",
      },
      {
        id: "visit",
        tag: "Hours & location",
        legend: "Hours, location, and parking",
        variant: "map",
      },
      {
        id: "insta",
        tag: "Instagram",
        legend: "Links to your Instagram, with your latest posts",
        variant: "social",
      },
      {
        id: "newclient",
        tag: "New client offer",
        legend: "A first-visit offer that gets people in the chair",
        variant: "callout",
        button: "20% off your first visit",
      },
      {
        id: "products",
        tag: "Products we use",
        legend: "The product lines you use and sell",
        variant: "products",
      },
      {
        id: "bridal",
        tag: "Bridal & events",
        legend: "Wedding and event bookings for the whole party",
        variant: "form",
        items: ["Date", "Party size"],
        button: "Inquire",
        page: "Bridal",
      },
    ],
    defaults: ["book", "services", "work", "stylists", "visit"],
    skip: ["gallery", "team", "map", "social", "booking", "pricing", "hours"],
    pages: ["About", "Contact"],
  },
  {
    slug: "fitness",
    chip: "Gym",
    noun: "gym",
    example: "Elevation Strength",
    headline: "Your first class is on us.",
    ctas: ["Book a free class", "See the schedule"],
    nav: ["Classes", "Coaches", "Membership"],
    blocks: [
      {
        id: "schedule",
        tag: "Class schedule",
        legend:
          "Class schedule connected to Mindbody, Glofox, Wodify, or your booking app",
        variant: "rows",
        rows: [
          ["Strength", "6:00 am"],
          ["HIIT", "12:15 pm"],
        ],
        page: "Schedule",
      },
      {
        id: "intro",
        tag: "Free class",
        legend: "An intro offer or free-class sign-up",
        variant: "callout",
        button: "Claim your free class",
      },
      {
        id: "membership",
        tag: "Memberships",
        legend: "A membership and pricing page",
        variant: "cards",
        items: ["Drop-in", "Monthly", "Annual"],
        page: "Membership",
      },
      {
        id: "coaches",
        tag: "Coaches",
        legend: "Coach and instructor profiles",
        variant: "team",
        page: "Coaches",
      },
      {
        id: "space",
        tag: "The space",
        legend: "Photos and video of your space and classes",
        variant: "gallery",
      },
      {
        id: "stories",
        tag: "Member stories",
        legend: "Member stories and results",
        variant: "quotes",
      },
      {
        id: "challenge",
        tag: "Challenges",
        legend: "A six-week challenge people can sign up for",
        variant: "callout",
        button: "Join the 6-week challenge",
      },
      {
        id: "transformations",
        tag: "Transformations",
        legend: "Member before-and-afters, with their permission",
        variant: "compare",
      },
      {
        id: "kids",
        tag: "Kids & teen classes",
        legend: "Classes for younger members",
        variant: "cards",
        items: ["Kids", "Teens", "Family"],
      },
      {
        id: "nutrition",
        tag: "Nutrition",
        legend: "Nutrition coaching and meal-plan tips",
        variant: "bars",
        page: "Nutrition",
      },
    ],
    defaults: ["schedule", "intro", "membership", "coaches", "space"],
    skip: [
      "team",
      "gallery",
      "reviews",
      "memberships",
      "booking",
      "beforeafter",
    ],
    pages: ["About", "Contact"],
  },
  {
    slug: "nonprofits",
    chip: "Nonprofit",
    noun: "nonprofit",
    example: "Front Range Food Share",
    headline: "Neighbors helping neighbors.",
    ctas: ["Donate", "Volunteer"],
    nav: ["Programs", "Events", "About"],
    blocks: [
      {
        id: "donate",
        tag: "Donate",
        legend:
          "A donate button on every page, connected to Givebutter, Donorbox, PayPal, or Stripe",
        variant: "chips",
        items: ["$25", "$50", "$100"],
        page: "Donate",
      },
      {
        id: "volunteer",
        tag: "Volunteer",
        legend: "A volunteer sign-up form",
        variant: "form",
        items: ["Name", "Email"],
        button: "Sign up",
        page: "Volunteer",
      },
      {
        id: "events",
        tag: "Events",
        legend: "An events and fundraiser calendar",
        variant: "bars",
        page: "Events",
      },
      {
        id: "impact",
        tag: "Our impact",
        legend: "Impact numbers and stories from the people you serve",
        variant: "cards",
        items: ["Families", "Meals", "Volunteers"],
      },
      {
        id: "help",
        tag: "Get help",
        legend: "A Get Help page for the people you serve, in plain language",
        variant: "callout",
        button: "Get help",
        page: "Get help",
      },
      {
        id: "board",
        tag: "Board & staff",
        legend: "Board, staff, and 501(c)(3) details for donors who check",
        variant: "team",
      },
      {
        id: "updates",
        tag: "Email sign-up",
        legend: "Newsletter sign-up so supporters hear from you",
        variant: "email",
      },
      {
        id: "monthly",
        tag: "Monthly giving",
        legend: "Recurring gifts that keep the lights on",
        variant: "chips",
        items: ["$10/mo", "$25/mo", "$50/mo"],
      },
      {
        id: "sponsors",
        tag: "Sponsors",
        legend: "Thank your sponsors with their logos",
        variant: "logos",
        items: ["Sponsor", "Sponsor", "Sponsor"],
      },
      {
        id: "wishlist",
        tag: "Wish list",
        legend: "What you need donated right now",
        variant: "rows",
        rows: [
          ["Canned goods", "Needed"],
          ["Winter coats", "Needed"],
        ],
      },
      {
        id: "report",
        tag: "Annual report",
        legend: "Your annual report and financials, one click away",
        variant: "callout",
        button: "Read our annual report",
      },
    ],
    defaults: ["donate", "volunteer", "events", "impact", "help"],
    skip: [
      "team",
      "newsletter",
      "calendar",
      "store",
      "pricing",
      "memberships",
      "financing",
      "specials",
    ],
    pages: ["About", "Contact"],
  },
  {
    slug: "auto-shops",
    chip: "Auto shop",
    noun: "auto shop",
    example: "Summit Auto Care",
    headline: "Honest repairs, done today.",
    ctas: ["Book service", "Call now"],
    nav: ["Services", "About", "Contact"],
    blocks: [
      {
        id: "hours",
        tag: "Hours & location",
        legend: "Hours and location at the top of the page",
        variant: "rows",
        rows: [
          ["Today", "7am–6pm"],
          ["Saturday", "8am–2pm"],
        ],
      },
      {
        id: "menu",
        tag: "Service menu",
        legend: "A service menu with your prices",
        variant: "rows",
        rows: [
          ["Oil change", "$"],
          ["Brakes", "$$"],
        ],
        page: "Services",
      },
      {
        id: "request",
        tag: "Appointment request",
        legend: "An appointment or quote request form for repairs",
        variant: "form",
        items: ["Vehicle", "Service"],
        button: "Request",
      },
      {
        id: "directions",
        tag: "Call & directions",
        legend: "One-tap directions and call buttons",
        variant: "callout",
        button: "Call · Directions",
      },
      {
        id: "proof",
        tag: "Reviews & certifications",
        legend: "Reviews and certifications",
        variant: "quotes",
      },
      {
        id: "fleet",
        tag: "Fleet sign-up",
        legend: "Membership or fleet sign-up",
        variant: "form",
        items: ["Company", "Vehicles"],
        button: "Sign up",
        page: "Fleet",
      },
      {
        id: "warranty",
        tag: "Warranty",
        legend: "Your parts and labor warranty, up front",
        variant: "callout",
        button: "24-month / 24k warranty",
      },
      {
        id: "shuttle",
        tag: "Shuttle & loaners",
        legend: "How customers get around while you work",
        variant: "rows",
        rows: [
          ["Shuttle", "Free"],
          ["Loaner", "By request"],
        ],
      },
      {
        id: "makes",
        tag: "Makes we service",
        legend: "The makes and models you work on",
        variant: "logos",
        items: ["Domestic", "Asian", "European"],
      },
      {
        id: "status",
        tag: "Repair status",
        legend: "Customers check on their car without calling",
        variant: "form",
        items: ["Phone number"],
        button: "Check",
      },
    ],
    defaults: ["hours", "menu", "request", "directions", "proof"],
    skip: ["reviews", "map", "quote", "pricing", "hours"],
    pages: ["About", "Contact"],
  },
  {
    slug: "retail",
    chip: "Shop",
    noun: "shop",
    example: "Aspen & Oak Goods",
    headline: "Local finds, made in Colorado.",
    ctas: ["Shop online", "Visit the store"],
    nav: ["Shop", "Events", "Visit"],
    blocks: [
      {
        id: "featured",
        tag: "Featured products",
        legend: "Featured products and brands",
        variant: "products",
        page: "Shop",
      },
      {
        id: "visit",
        tag: "Visit us",
        legend: "Hours, holiday hours, directions, and parking",
        variant: "rows",
        rows: [
          ["Today", "10am–6pm"],
          ["Parking", "Out back"],
        ],
      },
      {
        id: "sales",
        tag: "Sales & events",
        legend: "A sales and events section that's easy to update",
        variant: "bars",
        page: "Events",
      },
      {
        id: "giftcards",
        tag: "Gift cards",
        legend: "Gift cards, or a small online store with Square or Shopify",
        variant: "callout",
        button: "Buy a gift card",
      },
      {
        id: "updates",
        tag: "Email sign-up",
        legend: "Newsletter sign-up for sales and new arrivals",
        variant: "email",
      },
      {
        id: "social",
        tag: "Instagram",
        legend: "Links to your Instagram and Facebook",
        variant: "social",
      },
      {
        id: "arrivals",
        tag: "New arrivals",
        legend: "What just came in, updated each week",
        variant: "products",
      },
      {
        id: "categories",
        tag: "Shop by category",
        legend: "Big, simple buttons for each part of the store",
        variant: "cards",
        items: ["Home", "Gifts", "Kids"],
      },
      {
        id: "makers",
        tag: "Meet the makers",
        legend: "The local makers and artists you carry",
        variant: "team",
      },
      {
        id: "pickup",
        tag: "Curbside pickup",
        legend: "Order online and pick up at the curb",
        variant: "callout",
        button: "Order for pickup",
      },
    ],
    defaults: ["featured", "visit", "sales", "giftcards", "updates"],
    skip: ["newsletter", "map", "store", "hours"],
    pages: ["About", "Contact"],
  },
];

/** Every block a visitor can use for this preset: its own, then the common extras it doesn't already cover. */
export function blocksFor(preset: BlueprintPreset): Block[] {
  const own = preset.blocks.map((block) => ({
    ...block,
    group: "industry" as const,
  }));
  const ids = new Set(own.map((block) => block.id));
  const tags = new Set(own.map((block) => block.tag.toLowerCase()));
  return [
    ...own,
    ...commonBlocks.filter(
      (block) =>
        !ids.has(block.id) &&
        !tags.has(block.tag.toLowerCase()) &&
        !preset.skip?.includes(block.id),
    ),
  ];
}
