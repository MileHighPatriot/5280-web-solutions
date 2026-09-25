/** The 5280 mountain mark, redrawn from the brand icon as SVG. */
export function LogoMark({
  className = "",
  tile = false,
  draw = false,
}: {
  className?: string;
  /** Draw the navy rounded-square app tile behind the mark. */
  tile?: boolean;
  /** Let the strokes animate in (used by the Backdrop art). */
  draw?: boolean;
}) {
  const stroke = draw ? { pathLength: 1, className: "bd-draw" } : {};
  return (
    <svg
      viewBox={tile ? "60 60 240 240" : "92 112 170 150"}
      className={className}
      aria-hidden="true"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {tile ? <rect x="60" y="60" width="240" height="240" rx="52" fill="#14202b" /> : null}
      <path {...stroke} d="M104 219 149 167 178 202" stroke="#e07a3f" strokeWidth="13" />
      <path {...stroke} d="M143 219 192 142 242 219" stroke="currentColor" strokeWidth="13" />
      <path {...stroke} d="M175 176 186 168 193 177 201 168 210 176" stroke="currentColor" strokeWidth="8" />
      <circle className={draw ? "bd-fade" : undefined} cx="226" cy="133" r="12.5" fill="#e07a3f" />
      <path {...stroke} d="M212 246h33" stroke="#e07a3f" strokeWidth="13" />
    </svg>
  );
}

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-9 w-auto sm:h-10" />
      <span className="flex flex-col leading-none">
        <span className="text-[1.45rem] font-black tracking-[-0.03em] sm:text-[1.6rem]">5280</span>
        <span className="mt-1 font-mono text-[0.56rem] font-medium tracking-[0.3em] text-orange sm:text-[0.6rem]">
          WEB SOLUTIONS
        </span>
      </span>
    </span>
  );
}
