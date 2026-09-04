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
<<<<<<< HEAD
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
  allowedDevOrigins: ["localhost", "127.0.0.1", ...lanIpv4Addresses],
};

export default nextConfig;
