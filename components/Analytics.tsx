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
 * Microsoft Clarity: heatmaps and session recordings. Loads nothing until
 * site.clarityProjectId is set. Clarity follows client-side page changes itself.
 */
function Clarity({ id }: { id: string }) {
  return (
    <Script id="clarity-init" strategy="afterInteractive">
      {`(function(c,l,a,r,i,t,y){
c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "${id}");`}
    </Script>
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
  const clarityId = site.clarityProjectId;

  useEffect(() => {
    if (code) count(pathname);
  }, [code, pathname]);

  return (
    <>
      {gaId && <GoogleAnalytics id={gaId} />}
      {clarityId && <Clarity id={clarityId} />}
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
