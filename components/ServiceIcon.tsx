/** Line icons for each service, drawn to match the logo's rounded strokes. */
export default function ServiceIcon({ id, className = "" }: { id: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {id === "new-websites" ? (
        <>
          <rect x="5" y="9" width="38" height="30" rx="4" />
          <path d="M5 17h38" />
          <circle cx="11" cy="13" r="0.6" fill="currentColor" />
          <circle cx="15" cy="13" r="0.6" fill="currentColor" />
          <path d="M24 23v10M19 28h10" stroke="#e07a3f" />
        </>
      ) : id === "redesigns" ? (
        <>
          <rect x="11" y="13" width="26" height="22" rx="3" />
          <path d="M11 19h26" />
          <path d="M6 20a19 19 0 0 1 31-9" stroke="#e07a3f" />
          <path d="m37 5 .5 6.5L31 12" stroke="#e07a3f" />
          <path d="M42 28a19 19 0 0 1-31 9" stroke="#e07a3f" />
          <path d="m11 43-.5-6.5L17 36" stroke="#e07a3f" />
        </>
      ) : id === "hosting-care" ? (
        <>
          <path d="M24 5 8 11v11c0 10 7 18 16 21 9-3 16-11 16-21V11Z" />
          <path d="m17 24 5 5 9-10" stroke="#e07a3f" />
        </>
      ) : (
        <>
          <path d="M22 42s-12-11-12-21a12 12 0 0 1 24 0c0 10-12 21-12 21Z" />
          <circle cx="22" cy="21" r="4.5" stroke="#e07a3f" />
          <path d="m34 34 8 8" stroke="#e07a3f" />
        </>
      )}
    </svg>
  );
}
