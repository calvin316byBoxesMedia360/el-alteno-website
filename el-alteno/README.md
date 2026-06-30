# El Alteño — Restaurant Website

Official website for **El Alteño — Auténtica Comida Mexicana**, Watsonville, CA.
Bilingual marketing site with full digital menu, events booking, and signature cocktails.

> **Resuming this project?** Read `../CONTEXT.md` in the parent folder first — it has full client context, decisions, and pending tasks.

## Quick Start

```bash
npm install      # first time only
npm run dev      # → http://localhost:3000
npm run build    # production build (must pass before deploy)
```

## Tech Stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · shadcn/ui · Framer Motion · next/font

## Where Things Live

| What | File |
|------|------|
| **Design system / colors** | `src/app/globals.css` |
| **Full menu data (55+ items, EN+ES)** | `src/data/menu.ts` |
| **Page assembly** | `src/app/page.tsx` |
| **Sections** | `src/components/sections/*.tsx` |
| **Menu tabs/cards** | `src/components/menu/*.tsx` |
| **Navbar + Footer** | `src/components/layout/*.tsx` |
| **Logo + dish photos** | `public/images/` |

## Current Palette — "Cálido Artesanal"

Cream `#FAF6EF` · Terracota `#C65D3B` · Olive `#6B7A4F` · Mustard `#C99A3F` · Warm brown text `#2E2620`.
Fonts: Playfair Display (headings) + Lato (body).

> Client rejected the original saturated red/orange. Keep it warm and refined.

## Before Deploy

1. Set `NEXT_PUBLIC_FORMSPREE_ID` in `.env.local` (free account at formspree.io)
2. Update the Google Maps iframe in `src/components/sections/Location.tsx`
3. Add remaining dish photos to `public/images/dishes/` and reference them in `src/data/menu.ts`
4. `npm run build` then `npx vercel --yes`

## Business Info

- 323 Main St, Watsonville, CA 95076 · (831) 768-9876
- Hours: Tue–Sat 11am–8pm · Sun 9am–8pm · Closed Monday
- Events: up to 100 guests, 2 simultaneous, fully booked Fri–Sun Apr–Dec
- DoorDash + Uber Eats active
