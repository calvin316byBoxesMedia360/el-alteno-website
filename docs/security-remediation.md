# Security remediation — 2026-09-09

- Next.js and eslint-config-next updated to 16.3.4; unused shadcn generator removed from runtime dependencies; compatible transitive fixes applied. npm audit reported zero known vulnerabilities after install.
- Added CSP, frame denial, nosniff, referrer and permissions policies; disabled X-Powered-By. Static hydration still needs unsafe-inline: this is not a strict nonce CSP and is not a security guarantee. No production unsafe-eval. Formspree and Google Maps are explicitly allowed.
- Archived 101 unused local public files (1,281,227,710 bytes), each SHA256-verified after moving, to `C:/Users/no/Documents/ChatGPT/el alteno website/review-media/security-backup-2026-09-09`. Relative paths under public are preserved. This archive includes untracked local source material as well as previously tracked assets; not all 1.28 GB was deployed.
- Original editing workflows must use this archive as their source, not restore originals into public. The backup is local only; protect it independently. Git history and old immutable deployments are not purged by this change.
- Existing copy test incorrectly required lowercase wording although the approved page capitalizes the slogan; made those two checks case-insensitive without changing page content.
- Scope does not include credential-provider settings, full penetration testing, old deployment deletion or Git history rewriting.
