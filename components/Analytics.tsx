"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect } from "react";
import { site } from "@/data/site";

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

  useEffect(() => {
    if (code) count(pathname);
  }, [code, pathname]);

  if (!code) return null;

  return (
    <Script
      src="https://gc.zgo.at/count.js"
      data-goatcounter={`https://${code}.goatcounter.com/count`}
      data-goatcounter-settings='{"no_onload": true}'
      onLoad={() => count(pathname)}
    />
  );
}
