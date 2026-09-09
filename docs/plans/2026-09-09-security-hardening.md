# Security Hardening Implementation Plan
> **REQUIRED SUB-SKILL:** Use superpowers:executing-plans to implement this plan task-by-task.
**Goal:** Remediate the approved dependency, public archive and browser-header findings without changing the restaurant experience.
**Architecture:** Keep static rendering and click-to-play media. Archive unused public files outside the repository, verify hashes, then publish only runtime assets. Apply a static-compatible CSP (inline hydration remains permitted) and framing restrictions.
**Tech Stack:** Next.js, npm, Node tests, PowerShell, Netlify/Railway.

Repository: `C:/Users/no/Documents/ChatGPT/el alteno website/el-alteno-integration-test`.

1. Add `el-alteno/scripts/security.test.mjs` regression tests for headers and retired assets; run `node --test scripts/security.test.mjs` expecting failure before implementation.
2. Modify `el-alteno/next.config.ts`: deny framing and objects, restrict external connections to Formspree and frames to Google Maps, add nosniff/referrer/permissions headers. Allow inline hydration to retain static caching; no production unsafe-eval.
3. Update `el-alteno/package.json` and lockfile to patched dependencies. Run `npm audit --omit=dev`; inspect unresolved findings rather than forcing incompatible upgrades.
4. Archive unused videos and candidate files to the workspace's `review-media/security-backup-2026-09-09`, preserving relative paths and verifying SHA256 before moving. Keep approved runtime assets. Update stale GalleryPreview source reference.
5. Run regression tests, existing unit suites and production build. Verify pages, headers, archived URL 404s and approved video range 206 responses locally.
6. Commit scoped remediation, open PR, inspect deployment checks before production publication. Verify production headers and retired URLs. Do not rewrite history or delete old deployments without separate review.

Residual limitations: old immutable deployments and Git history can retain media; no secret rotation is indicated by the initial pattern scan. Static-compatible CSP is defense in depth, not a complete XSS prevention claim.
