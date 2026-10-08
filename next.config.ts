import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  // Self-contained server output: the Docker image only ships what it needs.
  output: "standalone",
  poweredByHeader: false,
  // Runtime fs access (the data dir, the bundled-image listing) makes the tracer
  // pull in the whole project; keep the non-runtime folders out of the image.
  outputFileTracingExcludes: {
    "/*": ["./legacy/**", "./_old-static/**", "./pics/**", "./scripts/**", "./deploy/**", "./data/**"],
  },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "niraperfume.com" }],
    // Small VPS: keep optimiser output modest and cache it for a week.
    minimumCacheTTL: 60 * 60 * 24 * 7,
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
