/**
 * Stylized Front Range map: cities placed by real latitude/longitude (scaled),
 * the foothills along the west edge, and I-25 running north to south.
 */
const cities: { name: string; x: number; y: number; label?: "left" | "right" | "below"; major?: boolean }[] = [
  { name: "Fort Collins", x: 140, y: 45, major: true },
  { name: "Loveland", x: 142, y: 107 },
  { name: "Greeley", x: 252, y: 99, major: true, label: "below" },
  { name: "Longmont", x: 134, y: 183, major: true },
  { name: "Boulder", x: 84, y: 234, major: true, label: "left" },
  { name: "Broomfield", x: 139, y: 265 },
  { name: "Westminster", x: 154, y: 292 },
  { name: "Arvada", x: 139, y: 304 },
  { name: "Golden", x: 99, y: 319 },
  { name: "Lakewood", x: 141, y: 336 },
  { name: "Denver", x: 168, y: 325, major: true, label: "left" },
  { name: "Aurora", x: 215, y: 328, major: true },
  { name: "Littleton", x: 160, y: 366 },
  { name: "Centennial", x: 202, y: 377 },
  { name: "Highlands Ranch", x: 174, y: 386 },
  { name: "Parker", x: 237, y: 397 },
  { name: "Castle Rock", x: 208, y: 446, major: true },
  { name: "Monument", x: 203, y: 538 },
  { name: "Colorado Springs", x: 219, y: 623, major: true, label: "left" },
];

const i25 = "M146 20 L142 107 L150 200 L158 290 L168 325 L176 380 L208 446 L203 538 L219 623 L222 660";

export default function AreaMap({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 340 660"
      className={className}
      role="img"
      aria-labelledby="area-map-title"
    >
      <title id="area-map-title">
        Map of the Front Range service area, from Fort Collins and Greeley south through Denver to Colorado Springs
      </title>

      {/* Foothills along the west edge */}
      <path
        d="M0 0 H70 L58 40 L74 80 L60 130 L78 170 L62 214 L70 250 L56 300 L84 340 L76 380 L96 420 L82 470 L110 520 L98 570 L150 620 L140 660 H0 Z"
        fill="#243646"
      />
      <path
        d="M70 0 L58 40 L74 80 L60 130 L78 170 L62 214 L70 250 L56 300 L84 340 L76 380 L96 420 L82 470 L110 520 L98 570 L150 620 L140 660"
        fill="none"
        stroke="#e07a3f"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <text x="16" y="606" fill="#a3b1c0" fontSize="11" fontFamily="var(--font-plex-mono), monospace" letterSpacing="1.5" transform="rotate(-90 16 606)">
        FOOTHILLS
      </text>

      {/* I-25 */}
      <path d={i25} fill="none" stroke="#a3b1c0" strokeWidth="2" strokeDasharray="6 6" opacity="0.5" />
      <g transform="translate(282 22)">
        <rect x="-18" y="-12" width="36" height="24" rx="5" fill="none" stroke="#a3b1c0" strokeWidth="1.5" opacity="0.7" />
        <text x="0" y="4.5" textAnchor="middle" fill="#a3b1c0" fontSize="12" fontWeight="700" fontFamily="var(--font-plex-mono), monospace">
          I-25
        </text>
      </g>

      {cities.map((city) => {
        const r = city.major ? 6 : 3.5;
        const labelX = city.label === "left" ? city.x - 12 : city.label === "below" ? city.x : city.x + 12;
        const labelY = city.label === "below" ? city.y + 22 : city.y + 4.5;
        const anchor = city.label === "left" ? "end" : city.label === "below" ? "middle" : "start";
        return (
          <g key={city.name}>
            {city.major ? <circle cx={city.x} cy={city.y} r="14" fill="#e07a3f" opacity="0.18" /> : null}
            <circle cx={city.x} cy={city.y} r={r} fill={city.major ? "#e07a3f" : "#c6cfd9"} />
            {city.major ? (
              <text
                x={labelX}
                y={labelY}
                textAnchor={anchor}
                fill="#f4efe6"
                fontSize="14"
                fontWeight="700"
                style={{ paintOrder: "stroke" }}
                stroke="#14202b"
                strokeWidth="4"
              >
                {city.name}
              </text>
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}
