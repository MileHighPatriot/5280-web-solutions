import { addOnPrice, editPrice, foundingClients, monthlyTerms, money, tiers } from "@/data/pricing";

export type FaqItem = { question: string; answer: string };

const lowestSetup = Math.min(...tiers.map((tier) => tier.setupFee));
const highestSetup = Math.max(...tiers.map((tier) => tier.setupFee));

export const pricingFaq: FaqItem[] = [
  {
    question: "What's the setup fee for?",
    answer: `The one-time setup fee (${money(lowestSetup)}–${money(highestSetup)}, depending on the plan) is paid upfront, before we start building. It covers the early design work and gets your project on the calendar. It's separate from your monthly price and never hidden inside it.`,
  },
  {
    question: `Why is there a ${monthlyTerms.minimumMonths}-month minimum?`,
    answer: `A monthly plan spreads the cost of designing and building your site across the first year instead of charging it all upfront. After ${monthlyTerms.minimumMonths} months your plan goes month-to-month, and you can cancel with 30 days' notice. Our first ${foundingClients.count} clients skip the minimum entirely and go month-to-month from day one while we build out our portfolio.`,
  },
  {
    question: "Can I buy my site outright later?",
    answer:
      "Yes. You can buy your site outright at any time, and we'll hand over the files and help you move it wherever you like. The buyout price depends on how far into your term you are. Just ask and we'll give you a number.",
  },
  {
    question: "Who owns my domain name?",
    answer:
      "You do, always. Your domain (like yourbusiness.com) is registered in your name. We manage the renewals and settings for you, but it's yours whatever plan you choose and whether or not you stay with us.",
  },
  {
    question: "What counts as a \"small edit\" or a \"reasonable edit\"?",
    answer:
      "A small edit is something like updating hours, swapping photos, changing prices, adding a menu item, or posting a seasonal promo. Anything that takes under about 30 minutes. \"Unlimited reasonable edits\" on Premium means all of those, as often as you need. Building a brand-new section or page is a separate project, and we'll quote it upfront.",
  },
  {
    question: "What if I need changes on the flat-fee build?",
    answer: `Flat-fee sites don't include edits, so changes are billed à la carte at ${addOnPrice(editPrice)}. If you find yourself needing regular changes, you can switch to a Growth or Premium plan any time.`,
  },
  {
    question: "How do I pay?",
    answer:
      "The setup fee (or the flat-fee build) is invoiced upfront. Monthly plans bill automatically each month to a card or bank account. No paperwork to chase.",
  },
  {
    question: "Why aren't these prices higher (or lower) than other agencies'?",
    answer:
      "Most small businesses don't need a $10,000 agency site, and a $10/month drag-and-drop builder usually looks like one. These plans sit in the middle: a custom, professional site built by a real person, at a price a small business can budget for. Bigger projects, like online stores or booking systems, get a custom quote.",
  },
];

export const generalFaq: FaqItem[] = [
  {
    question: "How long does it take to build my site?",
    answer:
      "Most small-business sites take about 2–3 weeks from our kickoff call to launch. The biggest factor is usually how quickly we get your photos, logo, and info, and we'll tell you exactly what we need upfront.",
  },
  {
    question: "I'm not a tech person. Is that a problem?",
    answer:
      "Not at all. That's who we build for. We explain everything in plain English, handle the technical side, and you never have to log into anything unless you want to.",
  },
  {
    question: "Do I need to have photos and text ready?",
    answer:
      "It helps, but it's not required. We can write your page copy from a short conversation, and we'll point you to good stock photos or tips for taking your own on a phone.",
  },
  {
    question: "Will my site show up on Google?",
    answer:
      "Every site is built with the SEO basics Google looks for. Your Google Business Profile, which often puts a local business on the map, is set up for you on Growth and Premium plans, or as a one-time add-on. No honest developer can guarantee a #1 ranking, but we'll give you a strong, clean foundation.",
  },
  {
    question: "What kinds of businesses do you work with?",
    answer:
      "Almost any local business or organization: contractors and trades, restaurants, shops, salons, gyms, practices, pet care, daycares, real estate, photographers, and more. We also build for churches, ministries, and nonprofits, with online giving, sermon and livestream pages, events calendars, and volunteer sign-ups connected to the tools you already use.",
  },
  {
    question: "Can you redo my existing website?",
    answer:
      "Yes. Redesigns are a big part of what we do. We'll keep your domain and anything that's working for you, and rebuild the rest so it's faster, clearer, and works on phones.",
  },
  {
    question: "Do you only work in Denver?",
    answer:
      "We work with businesses up and down the Front Range, from Fort Collins and Greeley down to Castle Rock and Colorado Springs. We're happy to meet in person, and we also work fully remote if that's easier.",
  },
  {
    question: "What if I'm not happy with the design?",
    answer:
      "You'll review the design before anything goes live, and we'll revise it until it feels right. We don't launch anything you haven't approved.",
  },
];
