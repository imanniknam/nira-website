import Image from "next/image";

export function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/logo.svg"
      alt="نیرا عطر صحرا"
      width={1197}
      height={375}
      priority
      className={className}
    />
  );
}
