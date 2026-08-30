# El Alteño — Restaurant Website

Bilingual (EN/ES) site for **El Alteño — Auténtica Comida Mexicana**, 323 Main St, Watsonville, California.
Full digital menu, a tableside QR menu, private-events booking, signature drinks and location.

Built by [Boxes Media 360](https://github.com/calvin316byBoxesMedia360) for the restaurant.

---

## Start here

| If you are… | Read |
|---|---|
| **Picking this project up** | [`HANDOFF.md`](HANDOFF.md) — current state, traps, open decisions. **This is the live document.** |
| Deploying it | [`DEPLOYMENT.md`](DEPLOYMENT.md) — the config that does *not* live in the code |
| Touching the menu | [`MENU-SOURCE.md`](MENU-SOURCE.md) — transcription of the printed flyer. See the rule below |
| Writing code | [`el-alteno/README.md`](el-alteno/README.md) — stack, file map, design system |
| Reviewing the 2026 media-production phase | [`docs/reports/private-events-production/report.html`](docs/reports/private-events-production/report.html) — visual report, iterations, tools and final master |
| Looking for history | [`CONTEXT.md`](CONTEXT.md) — superseded by `HANDOFF.md`, kept for background |

---

## Two things that will bite you

**The app is not at the repo root.** It lives in `el-alteno/`. Every hosting platform must be configured with `Root Directory = el-alteno` or the build fails instantly. That setting lives in the dashboard, not in git.

**The menu is not editable free-form.** `el-alteno/src/data/menu.ts` is a transcription of the restaurant's printed flyer, and `MENU-SOURCE.md` is the source of truth. This project once published invented dishes and prices to a live site; a wrong price becomes an argument at the register. Never add a dish, price or description that is not in `MENU-SOURCE.md`. A filename is not proof of what a photo shows either — three photo assignments turned out false when someone actually looked at them.

---

## Run it

```bash
cd el-alteno
npm install
cp .env.example .env.local     # then fill in NEXT_PUBLIC_FORMSPREE_ID
npm run dev                    # prints the Local and Wi-Fi URLs
```

```bash
npm run build                  # must pass before any deploy
```

**Reviewing on a phone**: connect the phone and computer to the same non-guest Wi-Fi, run `npm run dev`, and open the `Wi-Fi:` URL printed by the command (for example `http://192.168.1.201:3000`). The project now binds to all local interfaces and discovers the current LAN IPv4 address automatically, so DHCP changes do not require editing a file. If the phone cannot connect at all, check that it is not on a guest network with device isolation and that Windows allows Node on the active Private/Public network. See `HANDOFF.md` §8.

---

## Hosting

| | |
|---|---|
| **Platform** | Railway |
| **Live URL** | https://web-production-004ee.up.railway.app |
| **Deploys from** | `master`, automatically on push. Last deploy: `6fd9ac0`, 2026-08-29 |
| **Root Directory** | `el-alteno` (set in the Railway dashboard) |
| **Build / Start** | `npm run build` / `npm start`, auto-detected via Nixpacks |
| **Custom domain** | none yet — candidate `elalteno.restaurant` |

There is no `railway.json` and no `Dockerfile`; Railway auto-detects Next.js. The only environment variable is `NEXT_PUBLIC_FORMSPREE_ID`, set in the dashboard.

**No database and no backend of its own.** The events form posts to Formspree, a third-party service. That makes the site a good fit for Vercel too — `DEPLOYMENT.md` has the comparison and the migration steps.

> ⚠️ `NEXT_PUBLIC_FORMSPREE_ID` has **never been confirmed** as set in Railway. Without it the events form fails silently: the visitor believes they booked and nothing arrives. Verify by submitting the real form and confirming the email.

---

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · shadcn/ui · Framer Motion

`next-intl` is installed but **not used for routing**. There are no `/en` or `/es` paths — language is a client-side toggle, and components call `t("English", "Español")` inline.

`el-alteno/AGENTS.md` notes that this version of Next has breaking changes relative to older knowledge and asks that the bundled docs in `node_modules/next/dist/docs/` be read before writing code. That is accurate and worth honouring: it is where the deprecation of `priority` was found.

---

## Branches

| Branch | What it is |
|---|---|
| `master` | What the public sees. **Current** — PR #2 merged 2026-08-29 as `6fd9ac0` and deployed |
| `feat/consolidate-menu-assets` | Merged into `master`. Kept for reference; start new work from `master` |
| `chore/convert-approved-images-webp` | PR #1, resolved on its own when its commit reached `master` via #2 |
| `review/live-sections` | Earlier redesign, also already contained in the branch above |

---

## Licence and ownership

The restaurant owns its name, photographs and menu content. The code is a work product of Boxes Media 360. There is no open-source licence attached; treat the repository as private-by-intent even though it is public on GitHub.
