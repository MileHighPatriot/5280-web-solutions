import { tiers, flatFee } from "@/data/pricing";
import { site } from "@/data/site";

export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Escape "<" so content can never close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function businessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${site.url}/#business`,
    name: site.name,
    description: site.description,
    // Matches site.hours ("Mon–Fri, 8am–6pm").
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    url: site.url,
    logo: `${site.url}/logo.png`,
    image: `${site.url}/og.png`,
    telephone: "+1-720-260-6089",
    email: site.email,
    founder: {
      "@type": "Person",
      name: site.founder,
      jobTitle: site.founderTitle,
      image: `${site.url}/kohlton-luper.jpg`,
    },
    priceRange: "$$",
    address: { "@type": "PostalAddress", addressRegion: "CO", addressCountry: "US" },
    areaServed: site.cities.map((name) => ({
      "@type": "City",
      name,
      containedInPlace: { "@type": "State", name: "Colorado" },
    })),
    knowsAbout: ["Web design", "Website redesign", "Website hosting", "Local SEO", "Google Business Profile"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Website plans",
      itemListElement: [
        ...tiers.map((tier) => ({
          "@type": "Offer",
          name: `${tier.name} monthly plan`,
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: tier.monthly,
            priceCurrency: "USD",
            unitCode: "MON",
          },
        })),
        {
          "@type": "Offer",
          name: "Flat-fee website build",
          priceSpecification: {
            "@type": "PriceSpecification",
            minPrice: flatFee.buildMin,
            maxPrice: flatFee.buildMax,
            priceCurrency: "USD",
          },
        },
      ],
    },
  };
}
