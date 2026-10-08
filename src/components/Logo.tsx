/**
 * The wordmark. A plain <img> on purpose: the admin can swap in a logo with any
 * aspect ratio, and the browser keeps its natural proportions at a fixed height.
 */
export function Logo({ className, src }: { className?: string; src: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt="نیرا عطر صحرا" className={className} />
  );
}
