export const site = {
  name: "5280 Web Solutions",
  shortName: "5280",
  url: "https://5280webs.com",
  domain: "5280webs.com",
  locale: "en_US",
  tagline: "Websites for small businesses.",
  description:
    "Professional websites for Front Range small businesses, designed, built, and looked after by a local developer. Monthly plans or a one-time build, from Fort Collins to Colorado Springs.",
  founder: "Kohlton Luper",
  founderTitle: "Founder & Web Developer",
  phone: "7202606089",
  phoneDisplay: "720-260-6089",
  phoneHref: "tel:+17202606089",
  email: "kohlton@5280webs.com",
  emailHref: "mailto:kohlton@5280webs.com",
  region: "Front Range, Colorado",
  // Also set as openingHoursSpecification in components/JsonLd.tsx; change both together.
  hours: "Mon–Fri, 8am–6pm",
  replyTime: "one business day",
  // Web3Forms access key: delivers form submissions to the email above.
  // Public by design (it only allows sending to this inbox).
  web3formsKey: "46846766-3c9d-485e-8921-8f6765032b96",
  // TODO(Kohlton): Cal.com booking link for the intro call, e.g. "kohlton/intro-call". Empty = show "call or text" instead.
  calLink: "",
  // TODO(Kohlton): GoatCounter site code (the "code" in code.goatcounter.com). Empty = no analytics script at all.
  goatcounterCode: "",
  // TODO(Kohlton): Google PageSpeed Insights API key for the speed test on /free-website-check/. Restrict it to
  // 5280webs.com in Google Cloud. Without one, Google's shared quota usually refuses the request
  // and the speed test falls back to "send it to me and I'll run it". Setup steps: README "Finish setup".
  pagespeedKey: "",
  // North to south, so lists read like the drive down I-25.
  cities: [
    "Fort Collins",
    "Loveland",
    "Greeley",
    "Longmont",
    "Boulder",
    "Broomfield",
    "Westminster",
    "Arvada",
    "Denver",
    "Lakewood",
    "Golden",
    "Aurora",
    "Centennial",
    "Littleton",
    "Highlands Ranch",
    "Parker",
    "Castle Rock",
    "Monument",
    "Colorado Springs",
  ],
};

/** The Front Range sunset photo used in the hero and footer (CC BY 4.0 requires this credit). */
export const photoCredit = {
  src: "/denver-front-range-sunset.jpg",
  author: "DarlArthurS",
  license: "CC BY 4.0",
  licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
  source: "https://commons.wikimedia.org/wiki/File:Downtown_Denver_Skyline_at_Sunset.jpg",
  // The photo is about 3:1, so object-cover in a tall phone section renders it ~2,200px wide
  // (height × 2.93), far wider than the screen. "100vw" made phones fetch the 1200px copy and
  // blow it up ~5x. Below lg, ask for the full-size copy (54 KB) instead.
  sizes: "(min-width: 1024px) 100vw, 2440px",
};
