import type { SVGProps } from "react";

/**
 * Thin single-stroke icon set used across the rose/plum layouts. Everything is
 * drawn on a 24×24 grid with `currentColor`, so an icon picks up the colour of
 * whatever card or band it sits in.
 */
export type IconName =
  | "truck"
  | "shield"
  | "diamond"
  | "leaf"
  | "flask"
  | "gift"
  | "play"
  | "image"
  | "grid"
  | "heart"
  | "star"
  | "bag"
  | "search"
  | "user"
  | "phone"
  | "mail"
  | "pin"
  | "instagram"
  | "telegram"
  | "linkedin"
  | "globe"
  | "calendar"
  | "building"
  | "handshake"
  | "sparkle"
  | "palette"
  | "box"
  | "megaphone"
  | "flower"
  | "quote"
  | "filter"
  | "close"
  | "menu"
  | "arrow"
  | "chevron"
  | "check"
  | "plus";

const PATHS: Record<IconName, React.ReactNode> = {
  truck: (
    <>
      <path d="M3 7h10v9H3z" />
      <path d="M13 10h4l3 3v3h-7z" />
      <circle cx="7" cy="18" r="1.8" />
      <circle cx="17" cy="18" r="1.8" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7 3v6c0 4-3 6.6-7 9-4-2.4-7-5-7-9V6z" />
      <path d="M9 12l2.2 2.2L15.5 10" />
    </>
  ),
  diamond: (
    <>
      <path d="M6 4h12l3 5-9 11L3 9z" />
      <path d="M3 9h18M9 4l-3 5 6 11 6-11-3-5" />
    </>
  ),
  leaf: (
    <>
      <path d="M20 4c0 9-5 13-11 13a5 5 0 0 1 0-10c4 0 6-1 11-3z" />
      <path d="M4 20c3-5 7-8 12-10" />
    </>
  ),
  flask: (
    <>
      <path d="M10 3v6L5 18a2 2 0 0 0 1.8 3h10.4A2 2 0 0 0 19 18l-5-9V3" />
      <path d="M9 3h6M7.5 14h9" />
    </>
  ),
  gift: (
    <>
      <path d="M4 10h16v10H4z" />
      <path d="M3 7h18v3H3zM12 7v13" />
      <path d="M12 7S10.5 3 8.5 3.6 8 7 12 7zM12 7s1.5-4 3.5-3.4S16 7 12 7z" />
    </>
  ),
  play: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M10 8.5l6 3.5-6 3.5z" />
    </>
  ),
  image: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="8.5" cy="9.5" r="1.5" />
      <path d="M3.5 17l5-5 4 4 3-2.5 5 4.5" />
    </>
  ),
  grid: (
    <>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
    </>
  ),
  heart: (
    <path d="M12 20s-7-4.4-7-9a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 4.6-7 9-7 9z" />
  ),
  star: (
    <path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.3-4.1 5.9-.8z" />
  ),
  bag: (
    <>
      <path d="M5 7h14l-1 13H6z" />
      <path d="M9 9V6a3 3 0 0 1 6 0v3" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l4.5 4.5" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8.5" r="3.5" />
      <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
    </>
  ),
  phone: (
    <path d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2C11.4 19 5 12.6 4.5 5.7A2 2 0 0 1 6.5 3.5z" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3.5 7l8.5 6 8.5-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.6" />
    </>
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  telegram: <path d="M21 4.5L2.8 11.4l5 1.6 2 6 2.8-3.6 5 3.7z" />,
  linkedin: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <path d="M8 10.5V17M8 7.2v.1M12 17v-3.6a2 2 0 0 1 4 0V17" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c4 4.5 4 12.5 0 17-4-4.5-4-12.5 0-17z" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path d="M3.5 9.5h17M8 3.5v3M16 3.5v3" />
    </>
  ),
  building: (
    <>
      <path d="M4 20.5V5.5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v15" />
      <path d="M15 10h3.5a2 2 0 0 1 2 2v8.5M2.5 20.5h19" />
      <path d="M7.5 7.5h4M7.5 11h4M7.5 14.5h4" />
    </>
  ),
  handshake: (
    <>
      <path d="M2.5 9.5L6 6.5l3.5 1 2.5-1 2.5 1 3.5-1 3.5 3-3.5 5-2-1.8" />
      <path d="M9.5 7.5l-2.8 2.7a1.6 1.6 0 0 0 2.2 2.3l1.6-1.4 3.5 3.4M6 15l3 3" />
    </>
  ),
  sparkle: (
    <>
      <path d="M12 3l1.8 4.9L18.5 10l-4.7 2.1L12 17l-1.8-4.9L5.5 10l4.7-2.1z" />
      <path d="M18.5 16l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z" />
    </>
  ),
  palette: (
    <>
      <path d="M12 3.5a8.5 8.5 0 0 0 0 17c1.4 0 2-1 1.4-2-.7-1.2.2-2.4 1.6-2.4h1.6A4 4 0 0 0 20.5 12c0-4.7-3.8-8.5-8.5-8.5z" />
      <circle cx="8" cy="10" r="1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="7.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="15.8" cy="10" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  box: (
    <>
      <path d="M3.5 7.5L12 3.5l8.5 4v9L12 20.5l-8.5-4z" />
      <path d="M3.5 7.5L12 11.5l8.5-4M12 11.5v9" />
    </>
  ),
  megaphone: (
    <>
      <path d="M4 10v4a2 2 0 0 0 2 2h2l8 4V4l-8 4H6a2 2 0 0 0-2 2z" />
      <path d="M19 9.5a3 3 0 0 1 0 5" />
    </>
  ),
  flower: (
    <>
      <circle cx="12" cy="12" r="2.4" />
      <path d="M12 9.6c0-2.6-.8-4.6 0-5.6s2.4.6 2.4 3.2M12 14.4c0 2.6.8 4.6 0 5.6s-2.4-.6-2.4-3.2M9.6 12c-2.6 0-4.6.8-5.6 0s.6-2.4 3.2-2.4M14.4 12c2.6 0 4.6-.8 5.6 0s-.6 2.4-3.2 2.4" />
    </>
  ),
  quote: (
    <path d="M9.5 6C6.5 7.3 5 9.6 5 13v5h5.5v-6H8c0-2 .6-3.3 2.4-4.3zM19 6c-3 1.3-4.5 3.6-4.5 7v5H20v-6h-2.5c0-2 .6-3.3 2.4-4.3z" />
  ),
  filter: <path d="M3.5 5.5h17l-6.5 7.5v6l-4 2v-8z" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  arrow: <path d="M19 12H5M11 6l-6 6 6 6" />,
  chevron: <path d="M9 5l7 7-7 7" />,
  check: <path d="M5 12.5l4.5 4.5L19 7" />,
  plus: <path d="M12 5v14M5 12h14" />,
};

export function Icon({
  name,
  className = "w-5 h-5",
  filled = false,
  ...rest
}: { name: IconName; className?: string; filled?: boolean } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={filled ? 0 : 1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
      {...rest}
    >
      {PATHS[name]}
    </svg>
  );
}
