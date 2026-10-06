export type Service = {
  id: string;
  title: string;
  short: string;
  body: string;
  points: string[];
};

export const services: Service[] = [
  {
    id: "new-websites",
    title: "New websites",
    short: "No site yet, or starting from scratch? We design and build one around how your customers actually find and hire you.",
    body: "Most customers look you up on their phone before they call. A new site gives them what they need: what you do, where you work, what people say about you, and a big button to call or get a quote.",
    points: [
      "Custom design, not a stock template",
      "Built phone-first, because that's where your customers are",
      "Clear calls to action: call, text, book, or request a quote",
      "Fast loading, even on a weak signal up in the mountains",
    ],
  },
  {
    id: "redesigns",
    title: "Website redesigns",
    short: "Already have a site that looks dated, loads slowly, or breaks on phones? We rebuild it so it works as hard as you do.",
    body: "A dated website quietly costs you jobs. People bounce when a page is slow or hard to use on a phone. We keep what's working (your domain, your content, your Google ranking) and fix what isn't.",
    points: [
      "Keep your domain and existing Google rankings",
      "Rewrite unclear copy in plain English",
      "Replace slow page builders with a fast, modern build",
      "Redirect old links so nothing breaks",
    ],
  },
  {
    id: "hosting-care",
    title: "Hosting & care",
    short: "We keep your site online, secure, and up to date, so it's one less thing on your plate.",
    body: "Websites need upkeep: security patches, renewals, backups, and small updates. On a monthly plan we handle all of it, and you get a real person to text when something needs changing.",
    points: [
      "Fast, secure hosting with SSL included",
      "Domain renewals handled so it never lapses",
      "Uptime monitoring: if the site goes down, we know first",
      "Edits and updates on Growth and Premium plans",
    ],
  },
  {
    id: "get-found",
    title: "Get found on Google",
    short: "Show up when locals search for what you do, on Google Maps and in AI answers. We set up the basics that put you on the map.",
    body: "For a local business, Google Maps and your Business Profile often matter as much as the website. More people now ask Google's AI answers or ChatGPT for a recommendation, too. We set everything up so search engines and AI tools can tell exactly what you do and where, and send calls your way.",
    points: [
      "Google Business Profile setup (included on Growth and Premium)",
      "Local SEO basics: titles, descriptions, and service areas",
      "Business info that matches everywhere it's listed",
      "Business details marked up in the format Google and AI tools read",
      "Connect Google Search Console so you can see what's working",
    ],
  },
];

export const steps = [
  {
    step: "01",
    title: "Free full website report",
    body: "Send us your current site, or tell us about your business if you don't have one. You'll get a written report with honest, plain-English notes, free.",
  },
  {
    step: "02",
    title: "A quick call",
    body: "A quick 15-20 minute call about your business, your customers, and which plan fits. No pressure and no tech jargon.",
  },
  {
    step: "03",
    title: "Design & build",
    body: "We design and build your site. You review it, request changes, and approve it before anything goes live.",
  },
  {
    step: "04",
    title: "Launch & care",
    body: "Your site goes live. On a monthly plan we keep it running and updated. On a flat-fee build you own it outright.",
  },
];
