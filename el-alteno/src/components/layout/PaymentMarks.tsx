/**
 * Payment and delivery marks, drawn inline so the footer pulls nothing from a
 * third-party host.
 *
 * NOTE: these are simplified renderings, not the official artwork. Visa,
 * Mastercard, Apple Pay, Zelle, DoorDash and Uber Eats each publish brand
 * assets with usage rules. Swap these for the official files before the
 * restaurant uses the site commercially at scale.
 */

const pill =
  "flex items-center justify-center h-8 w-[52px] rounded-md bg-white/95 shadow-sm ring-1 ring-black/5 shrink-0";

export function VisaMark() {
  return (
    <span className={pill} role="img" aria-label="Visa">
      <svg viewBox="0 0 48 16" className="h-3.5 w-auto" aria-hidden="true">
        <text
          x="24"
          y="13"
          textAnchor="middle"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize="15"
          fontWeight="700"
          fontStyle="italic"
          letterSpacing="0.5"
          fill="#1434CB"
        >
          VISA
        </text>
      </svg>
    </span>
  );
}

export function MastercardMark() {
  return (
    <span className={pill} role="img" aria-label="Mastercard">
      <svg viewBox="0 0 40 24" className="h-5 w-auto" aria-hidden="true">
        <circle cx="15" cy="12" r="9" fill="#EB001B" />
        <circle cx="25" cy="12" r="9" fill="#F79E1B" />
        {/* the overlap the two brand circles share */}
        <path
          d="M20 5.1a9 9 0 0 0 0 13.8 9 9 0 0 0 0-13.8Z"
          fill="#FF5F00"
        />
      </svg>
    </span>
  );
}

export function ApplePayMark() {
  return (
    <span className={pill} role="img" aria-label="Apple Pay">
      <svg viewBox="0 0 44 18" className="h-4 w-auto" aria-hidden="true">
        <g fill="#000000">
          {/* leaf */}
          <path d="M9.6 3.05c.5-.62.84-1.47.75-2.32-.73.03-1.61.48-2.13 1.1-.46.53-.87 1.4-.76 2.22.81.06 1.64-.4 2.14-1Z" />
          {/* body with the bite */}
          <path d="M10.33 4.2c-1.18-.07-2.18.66-2.74.66-.57 0-1.43-.63-2.35-.61-1.21.02-2.33.7-2.95 1.78-1.26 2.18-.33 5.41.9 7.18.6.87 1.32 1.84 2.26 1.8.9-.03 1.25-.58 2.34-.58 1.09 0 1.4.58 2.35.56.97-.02 1.59-.88 2.19-1.75.69-1 .97-1.97.98-2.02-.02-.01-1.88-.72-1.9-2.87-.02-1.79 1.46-2.65 1.53-2.69-.84-1.23-2.14-1.37-2.6-1.4Z" />
        </g>
        <text
          x="17"
          y="14"
          fontFamily="Helvetica, Arial, sans-serif"
          fontSize="13"
          fontWeight="500"
          fill="#000000"
        >
          Pay
        </text>
      </svg>
    </span>
  );
}

export function ZelleMark() {
  return (
    <span className={pill} role="img" aria-label="Zelle">
      <svg viewBox="0 0 28 28" className="h-5 w-auto" aria-hidden="true">
        <rect width="28" height="28" rx="7" fill="#6D1ED4" />
        {/* the Z, with the strokes that run above and below it */}
        <rect x="13" y="3" width="2" height="4" fill="#FFFFFF" />
        <rect x="13" y="21" width="2" height="4" fill="#FFFFFF" />
        <path
          d="M8 7.5h12v2.6l-8.1 9.4H20v2.6H8v-2.6l8.1-9.4H8V7.5Z"
          fill="#FFFFFF"
        />
      </svg>
    </span>
  );
}

/** Chevron stack that stands in for the DoorDash mark. */
export function DoorDashMark() {
  return (
    <svg viewBox="0 0 20 14" className="h-3.5 w-auto shrink-0" aria-hidden="true">
      <path
        d="M1 3.2h11.4a4.6 4.6 0 0 1 0 9.2H8.6l2.6-2.9h1.2a1.7 1.7 0 0 0 0-3.4H1V3.2Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Takeaway-bag glyph that stands in for the Uber Eats mark. */
export function UberEatsMark() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-auto shrink-0" aria-hidden="true">
      {/* handle */}
      <path d="M5.6 5.2V4a2.4 2.4 0 0 1 4.8 0v1.2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* bag */}
      <path d="M3 5.6h10l-.85 8.1a1.4 1.4 0 0 1-1.4 1.3H5.25a1.4 1.4 0 0 1-1.4-1.3L3 5.6Z" fill="currentColor" />
    </svg>
  );
}
