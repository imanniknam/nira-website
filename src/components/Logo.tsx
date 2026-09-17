import Image from "next/image";

/**
 * The wordmark ships as three flat SVGs (brand lavender, plum for light
 * surfaces, cream for the dark bands) so it can sit on any of them without a
 * filter washing out the leaf mark.
 */
export function Logo({
  className,
  tone = "plum",
}: {
  className?: string;
  tone?: "plum" | "cream" | "brand";
}) {
  const src =
    tone === "cream" ? "/logo-cream.svg" : tone === "brand" ? "/logo.svg" : "/logo-plum.svg";
  return (
    <Image
      src={src}
      alt="نیرا عطر صحرا"
      width={1197}
      height={375}
      priority
      className={className}
    />
  );
}
