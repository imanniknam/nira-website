import Image from "next/image";

/**
 * Wide artwork slot. Shows the image when there is one, otherwise a branded
 * placeholder so the layout is final before the AI-generated banners land.
 */
export function Banner({
  src,
  alt,
  label,
  sizes,
  className = "",
  fit = "cover",
  priority = false,
  hideLabel = false,
}: {
  src?: string;
  alt: string;
  /** Text on the placeholder — usually the company or venue name. */
  label: string;
  sizes: string;
  className?: string;
  fit?: "cover" | "contain";
  priority?: boolean;
  /** Skip the placeholder caption when the caller already prints the name over it. */
  hideLabel?: boolean;
}) {
  if (src) {
    return (
      <div className={`relative overflow-hidden bg-blush ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={fit === "cover" ? "object-cover" : "object-contain p-4"}
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={`relative overflow-hidden dark-band flex items-center justify-center ${className}`}
    >
      <span
        aria-hidden
        className="absolute -right-6 -bottom-10 text-[9rem] sm:text-[12rem] font-bold leading-none text-white/[0.06] select-none"
      >
        {label.trim().charAt(0)}
      </span>
      <div className={`relative text-center px-6 ${hideLabel ? "hidden" : ""}`}>
        <b className="block text-white/90 text-sm sm:text-base leading-7">{label}</b>
        <span className="block text-[11px] text-white/50 mt-1 tracking-wide">
          تصویر بنر به‌زودی
        </span>
      </div>
    </div>
  );
}
