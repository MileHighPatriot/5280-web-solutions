"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect } from "react";
import { site } from "@/data/site";

/**
 * Google Analytics 4: loads nothing until site.gaMeasurementId is set. Client-side page
 * changes are counted by GA's own "browser history events" setting (on by default).
 */
function GoogleAnalytics({ id }: { id: string }) {
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${id}');`}
      </Script>
    </>
  );
}

/**
 * GoatCounter: free, cookie-free visit counts (no consent banner needed).
 * Loads nothing until site.goatcounterCode is set. Automatic counting is off
 * so each client-side page change is counted once, here.
 */
type GoatCounter = { count: (vars: { path: string }) => void };

function count(path: string) {
  (window as unknown as { goatcounter?: GoatCounter }).goatcounter?.count?.({ path });
}

export default function Analytics() {
  const pathname = usePathname();
  const code = site.goatcounterCode;
  const gaId = site.gaMeasurementId;

  useEffect(() => {
    if (code) count(pathname);
  }, [code, pathname]);

  return (
    <>
      {gaId && <GoogleAnalytics id={gaId} />}
      {code && (
        <Script
          src="https://gc.zgo.at/count.js"
          data-goatcounter={`https://${code}.goatcounter.com/count`}
          data-goatcounter-settings='{"no_onload": true}'
          onLoad={() => count(pathname)}
        />
      )}
    </>
  );
}
