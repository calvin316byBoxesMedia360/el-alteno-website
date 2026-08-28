import type { NextConfig } from "next";

/**
 * No remote image hosts are allowed. Every image the site serves lives in
 * `public/images`, so a third-party outage or a changed URL can never blank
 * out the menu — and stock photography cannot be reintroduced by accident.
 */
const nextConfig: NextConfig = {};

export default nextConfig;
