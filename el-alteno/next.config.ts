import type { NextConfig } from "next";

/**
 * No remote image hosts are allowed. Every image the site serves lives in
 * `public/images`, so a third-party outage or a changed URL can never blank
 * out the menu — and stock photography cannot be reintroduced by accident.
 *
 * `allowedDevOrigins` only affects `next dev`. The dev server rejects
 * cross-origin requests for dev-only assets, so opening the site from a phone
 * on the LAN returns 403 for the JS chunks: the HTML renders but hydration
 * never runs, and every element Framer Motion starts at opacity 0 stays
 * invisible. Listing the machine's LAN address makes on-device review work.
 * Localhost is included for the in-app review; if the router hands out a
 * different LAN address, update this list.
 */
const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost", "192.168.1.201"],
};

export default nextConfig;
