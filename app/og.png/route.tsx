import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/data/site";


export const dynamic = "force-static";

const size = { width: 1200, height: 630 };

/** Social share image, exported as a real /og.png file for static hosting. */
export async function GET() {
  const font = (file: string) => readFile(path.join(process.cwd(), "assets/fonts", file));
  const photo = await readFile(path.join(process.cwd(), "public/denver-front-range-sunset.jpg"));
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;
  const [regular, extraBold, black, mono] = await Promise.all([
    font("schibsted-grotesk-400.woff"),
    font("schibsted-grotesk-800.woff"),
    font("schibsted-grotesk-900.woff"),
    font("ibm-plex-mono-500.woff"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          background: "#002244",
          color: "#f5f3ee",
          padding: "64px 72px",
          fontFamily: "Schibsted Grotesk",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain img tags */}
        <img
          src={photoSrc}
          alt=""
          width={1200}
          height={630}
          style={{ position: "absolute", left: 0, top: 0, width: 1200, height: 630, objectFit: "cover", objectPosition: "50% 75%" }}
        />
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 1200,
            height: 630,
            background: "linear-gradient(180deg, rgba(0,34,68,0.97) 0%, rgba(0,34,68,0.85) 55%, rgba(0,34,68,0.25) 100%)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="84" height="74" viewBox="92 112 170 150" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M104 219 149 167 178 202" stroke="#fb4f14" strokeWidth="13" />
            <path d="M143 219 192 142 242 219" stroke="#f5f3ee" strokeWidth="13" />
            <path d="M175 176 186 168 193 177 201 168 210 176" stroke="#f5f3ee" strokeWidth="8" />
            <circle cx="226" cy="133" r="12.5" fill="#fb4f14" />
            <path d="M212 246h33" stroke="#fb4f14" strokeWidth="13" />
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 52, fontWeight: 900, letterSpacing: -2, lineHeight: 1 }}>5280</div>
            <div style={{ fontSize: 15, letterSpacing: 6, color: "#fb4f14", marginTop: 6, fontFamily: "IBM Plex Mono" }}>WEB SOLUTIONS</div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 44,
            fontSize: 74,
            fontWeight: 800,
            lineHeight: 1.02,
            letterSpacing: -3,
          }}
        >
          <div style={{ display: "flex" }}>Websites for Front Range</div>
          <div style={{ display: "flex", color: "#fb4f14" }}>small businesses.</div>
        </div>
        <div style={{ display: "flex", marginTop: 20, fontSize: 24, color: "#a3b1c0", fontFamily: "IBM Plex Mono" }}>
          {`Fort Collins to Colorado Springs · ${site.domain}`}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Schibsted Grotesk", data: regular, weight: 400 },
        { name: "Schibsted Grotesk", data: extraBold, weight: 800 },
        { name: "Schibsted Grotesk", data: black, weight: 900 },
        { name: "IBM Plex Mono", data: mono, weight: 500 },
      ],
    },
  );
}
