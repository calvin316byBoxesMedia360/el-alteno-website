import type { NextConfig } from "next";
import os from "node:os";

/**
 * No remote image hosts are allowed. Every image the site serves lives in
 * `public/images`, so a third-party outage or a changed URL can never blank
 * out the menu — and stock photography cannot be reintroduced by accident.
 *
 * `allowedDevOrigins` only affects `next dev`. The dev server rejects
 * cross-origin requests for dev-only assets, so opening the site from a phone
 * on the LAN returns 403 for the JS chunks: the HTML renders but hydration
 * never runs, and every element Framer Motion starts at opacity 0 stays
 * invisible. Discovering the machine's current LAN addresses at startup keeps
 * phone review working when DHCP changes the address between sessions.
 */
const lanIpv4Addresses = Object.values(os.networkInterfaces())
  .flatMap((addresses) => addresses ?? [])
  .filter((address) => {
    const family = address.family;
    return !address.internal && family === "IPv4";
  })
  .map((address) => address.address);

const nextConfig: NextConfig = {
  poweredByHeader: false,
  allowedDevOrigins: ["localhost", "127.0.0.1", ...lanIpv4Addresses],
  async headers() {
    const isDev = process.env.NODE_ENV === "development";
    // Static Next hydration and Framer Motion need inline scripts/styles.
    // Nonces would require per-request rendering and increase hosting costs.
    const csp = [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self'",
      "media-src 'self' blob:",
      `connect-src 'self' https://formspree.io${isDev ? " ws: wss:" : ""}`,
      "frame-src https://www.google.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self' https://formspree.io",
      "frame-ancestors 'none'",
    ].join("; ");
    return [{ source: "/:path*", headers: [
      { key: "Content-Security-Policy", value: csp },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
    ] }];
  },
};

export default nextConfig;
