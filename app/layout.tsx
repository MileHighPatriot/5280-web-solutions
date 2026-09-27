import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Onest, Syne } from "next/font/google";
import { ViewTransition } from "react";
import Analytics from "@/components/Analytics";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd, { businessJsonLd } from "@/components/JsonLd";
import MobileBar from "@/components/MobileBar";
import PointerGlow from "@/components/PointerGlow";
import { site } from "@/data/site";
import "./globals.css";

// Body text, buttons, and navigation.
const onest = Onest({
  subsets: ["latin"],
  variable: "--font-onest",
  display: "swap",
});

// Display face for headlines, card titles, and eyebrow labels. Nothing in the portfolio uses it,
// so the studio's own site doesn't look like any of its concept sites.
const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#002244",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Websites for Front Range Small Businesses`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: site.name,
    description: site.description,
    locale: site.locale,
    type: "website",
    siteName: site.name,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${site.name}: websites for Front Range small businesses` }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${onest.variable} ${syne.variable} ${plexMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-cream font-sans text-navy">
        <JsonLd data={businessJsonLd()} />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1 pt-16 sm:pt-20">
          {/* Page changes cross-fade (see ::view-transition rules in globals.css). */}
          <ViewTransition default="page">{children}</ViewTransition>
        </main>
        <Footer />
        <MobileBar />
        <Analytics />
        <PointerGlow />
      </body>
    </html>
  );
}
