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
  // Google Business Profile (place ID ChIJG0IhN9wQpQ0RwsHmb3F-96M). The profile link is the schema
  // sameAs; the review link opens Google's "write a review" box. Empty = no Google links shown.
  googleProfileUrl: "https://www.google.com/maps?cid=11815051173103583682",
  googleReviewUrl: "https://search.google.com/local/writereview?placeid=ChIJG0IhN9wQpQ0RwsHmb3F-96M",
  // Also set as openingHoursSpecification in components/JsonLd.tsx; change both together.
  hours: "Mon–Fri, 8am–6pm",
  replyTime: "one business day",
  // How long a free website check report takes (confirmed by Kohlton 2026-09-26). Promised on the
  // check page, the form's thank-you message, and the "how it works" steps.
  checkTurnaround: "2 business days",
  // Web3Forms access key: delivers form submissions to the email above.
  // Public by design (it only allows sending to this inbox).
  web3formsKey: "46846766-3c9d-485e-8921-8f6765032b96",
  // TODO(Kohlton): Cal.com booking link for the intro call, e.g. "kohlton/intro-call". Empty = show "call or text" instead.
  calLink: "",
  // TODO(Kohlton): GoatCounter site code (the "code" in code.goatcounter.com). Empty = no analytics script at all.
  goatcounterCode: "",
  // Google Analytics 4 measurement ID (starts with "G-"). Public by design. Empty = no Google tag at all.
  gaMeasurementId: "G-YZGZZ7XY8Q",
  // Microsoft Clarity project ID (heatmaps and session recordings). Public by design. Empty = no Clarity script
  // and no Clarity paragraph in the privacy policy. Off since 2026-10-03: its third-party cookies held
  // Lighthouse "Best Practices" at 77, and the old project (yqk7iful74) was deleted.
  clarityProjectId: "",
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

/**
 * Homepage hero: aerial looking west over downtown, with the Broncos stadium just past the towers
 * and the Front Range behind. Public domain (Library of Congress), credited anyway.
 * Cropped to 2:1 at 2560px from the 3840px Commons copy. The left side sits under the navy
 * overlay, so it's pre-softened there: city detail is what makes the file heavy.
 */
export const heroPhoto = {
  src: "/denver-stadium-aerial.jpg",
  author: "Carol M. Highsmith, Library of Congress",
  license: "public domain",
  source: "https://www.loc.gov/item/2017689056/",
  // A tall phone hero renders this ~1,500 CSS px wide, but nearly all of it sits under the navy
  // overlay. Asking for 600px puts most phones on the 1080 copy (~95 KB) or 1200 copy (~115 KB)
  // instead of the 1920 one (~255 KB), which cost about 10 points of mobile PageSpeed.
  sizes: "(min-width: 1024px) 100vw, 600px",
};

/**
 * Footer call-to-action on every page: the Broncos stadium with the snowy Front Range behind.
 * CC BY 3.0 requires credit and a note that it was changed: cropped, color-adjusted, sharpened,
 * and the old "Invesco Field" name and logo painted out of the sign panel. The top half sits
 * under the navy overlay, so it's pre-softened there to keep the file light.
 */
export const footerPhoto = {
  src: "/mile-high-front-range.jpg",
  author: "David Shankbone",
  license: "CC BY 3.0",
  licenseUrl: "https://creativecommons.org/licenses/by/3.0/",
  source: "https://commons.wikimedia.org/wiki/File:Invesco_Field_at_Mile_High.jpg",
  // Phones render the ~1.6:1 photo about twice the screen width in the tall footer.
  sizes: "(min-width: 1024px) 100vw, 200vw",
};

/** The Front Range sunset photo used on the 404 page and link previews (CC BY 4.0 requires this credit). */
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
