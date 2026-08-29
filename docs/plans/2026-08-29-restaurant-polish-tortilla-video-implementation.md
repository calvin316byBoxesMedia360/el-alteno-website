# Restaurant Polish and Tortilla Video Implementation Plan
> **REQUIRED SUB-SKILL:** Use superpowers:executing-plans to implement this plan task-by-task.
**Goal:** Keep the mobile hero fully visible, update the navigation logo, activate understated delivery links, and add the user-selected silent tortilla process video to the handmade card.
**Architecture:** Keep the existing Next.js section structure and restaurant palette. Share delivery destinations through one small constants module, make responsive changes with Tailwind utilities, and render the selected clip as a progressive decorative layer with the existing tortilla artwork as fallback. Generate two external media candidates and pause for user selection before committing either candidate to the app.
**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, Framer Motion, Lucide React, Higgsfield CLI with Seedance 2.0.

## Constraints and baseline

- Worktree: `C:\Users\no\Documents\ChatGPT\el alteno website\el-alteno-hero-mobile-test`
- App directory: `C:\Users\no\Documents\ChatGPT\el alteno website\el-alteno-hero-mobile-test\el-alteno`
- Branch: `codex/hero-mobile-video`
- Do not edit `MENU-SOURCE.md`, menu data, or prices.
- Do not push to `master`; all listed commits stay local until review.
- Existing unrelated lint findings in `LanguageContext.tsx`, `ThemeContext.tsx`, and `Location.tsx` are not part of this change.

### Task 1: Establish shared delivery destinations

**Files:**
- Create: `el-alteno/src/lib/deliveryLinks.ts`
- Modify: `el-alteno/src/components/layout/Footer.tsx`

**Step 1: Create the constants module**

Add:

```ts
export const DELIVERY_LINKS = {
  doorDash: "https://www.doordash.com",
  uberEats: "https://www.ubereats.com",
} as const;
```

**Step 2: Replace footer literals**

Import the module:

```ts
import { DELIVERY_LINKS } from "@/lib/deliveryLinks";
```

Replace the two footer `href` values with `DELIVERY_LINKS.doorDash` and `DELIVERY_LINKS.uberEats`.

**Step 3: Type-check**

Run from `el-alteno/`:

```powershell
npx tsc --noEmit
```

Expected: exit code 0.

**Step 4: Commit**

```powershell
git add -- el-alteno/src/lib/deliveryLinks.ts el-alteno/src/components/layout/Footer.tsx
git commit -m "refactor(links): share delivery destinations"
```

### Task 2: Update the navigation logo asset

**Files:**
- Rename: `el-alteno/public/images/logo/logo png` → `el-alteno/public/images/logo/logo-v2.png`
- Modify: `el-alteno/src/components/layout/Navbar.tsx`

**Step 1: Confirm the source asset**

Run:

```powershell
Get-Item -LiteralPath 'el-alteno/public/images/logo/logo png' | Select-Object Name,Length
```

Expected: file exists and is approximately 2.25 MB.

**Step 2: Rename the asset safely**

Use Git's move operation with both literal paths:

```powershell
git mv -- 'el-alteno/public/images/logo/logo png' 'el-alteno/public/images/logo/logo-v2.png'
```

**Step 3: Point the navbar to the new asset**

Replace only the image source:

```tsx
src="/images/logo/logo-v2.png"
```

Keep `width`, `height`, and `className="h-10 w-auto ..."` unchanged.

**Step 4: Type-check and commit**

```powershell
cd el-alteno
npx tsc --noEmit
cd ..
git add -- el-alteno/public/images/logo/logo-v2.png el-alteno/src/components/layout/Navbar.tsx
git commit -m "fix(nav): use transparent logo artwork"
```

Expected: type-check exits 0 and the commit contains only the asset rename plus navbar source change.

### Task 3: Clear the fixed navbar from the mobile hero

**Files:**
- Modify: `el-alteno/src/components/sections/Hero.tsx`

**Step 1: Add mobile-only top clearance**

Change the section class to include `pt-24 md:pt-0`:

```tsx
className="relative isolate overflow-hidden bg-[#161311] pt-24 text-white md:flex md:min-h-[100svh] md:items-center md:justify-center md:pt-0"
```

Do not change the video wrapper or its `aspect-video`, width, or object-fit classes.

**Step 2: Type-check**

```powershell
cd el-alteno
npx tsc --noEmit
```

Expected: exit code 0.

**Step 3: Commit**

```powershell
cd ..
git add -- el-alteno/src/components/sections/Hero.tsx
git commit -m "fix(hero): clear mobile navigation from video"
```

### Task 4: Activate understated hero delivery links

**Files:**
- Modify: `el-alteno/src/components/sections/Hero.tsx`

**Step 1: Add imports**

Extend the Lucide import with `ArrowUpRight` and import the shared destinations:

```tsx
import { ArrowUpRight, CalendarDays, ChevronRight, UtensilsCrossed } from "lucide-react";
import { DELIVERY_LINKS } from "@/lib/deliveryLinks";
```

**Step 2: Replace the decorative spans**

Use this grid content:

```tsx
<a
  href={DELIVERY_LINKS.doorDash}
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Order from DoorDash (opens in a new tab)"
  className="group flex min-h-12 items-center justify-center gap-1.5 rounded-full border border-[#D8A34B]/45 bg-black/30 px-3 text-[11px] font-extrabold uppercase tracking-[0.1em] text-white/85 outline-none backdrop-blur-[2px] transition-colors hover:border-[#D8A34B]/70 hover:bg-black/45 hover:text-white focus-visible:ring-2 focus-visible:ring-[#F1BC5D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#161311] sm:text-xs"
>
  <span>DoorDash</span>
  <ArrowUpRight className="size-3.5 text-[#D8A34B]/75 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
</a>
<a
  href={DELIVERY_LINKS.uberEats}
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Order from Uber Eats (opens in a new tab)"
  className="group flex min-h-12 items-center justify-center gap-1.5 rounded-full border border-[#D8A34B]/45 bg-black/30 px-3 text-[11px] font-extrabold uppercase tracking-[0.1em] text-white/85 outline-none backdrop-blur-[2px] transition-colors hover:border-[#D8A34B]/70 hover:bg-black/45 hover:text-white focus-visible:ring-2 focus-visible:ring-[#F1BC5D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#161311] sm:text-xs"
>
  <span>Uber Eats</span>
  <ArrowUpRight className="size-3.5 text-[#D8A34B]/75 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
</a>
```

**Step 3: Type-check and commit**

```powershell
cd el-alteno
npx tsc --noEmit
cd ..
git add -- el-alteno/src/components/sections/Hero.tsx
git commit -m "feat(hero): activate delivery shortcuts"
```

### Task 5: Validate Higgsfield and generate two silent candidates

**Files:**
- No repository changes until one candidate is selected.

**Step 1: Verify account and model catalog**

```powershell
higgsfield account status
higgsfield model list --json
higgsfield model get seedance_2_0 --json
```

Expected: authenticated account and a Seedance 2.0 schema supporting six seconds, `16:9`, and `720p` or `1080p`.

**Step 2: Check generation cost if the CLI supports it**

Run the exact `higgsfield generate cost` syntax indicated by the installed CLI/model schema for each six-second candidate. If a cost is displayed or the CLI requests spending confirmation, pause and get explicit user approval before submitting either job.

**Step 3: Generate candidate A**

Use a prompt under 200 tokens:

```text
Cinematic overhead close-up of an authentic Mexican tortilla station. The frame contains only clean hands and forearms, a metal tortilla press, corn masa, and a seasoned black comal. A small masa ball is pressed, lifted carefully, placed beside several cooking tortillas, then flipped once as light steam rises. Warm amber kitchen light, tactile masa texture, realistic food motion, centered action, locked camera, seamless loop-friendly ending. Branding, faces, torsos, captions, and written graphics are absent.
```

Submit with Seedance 2.0, duration `6`, aspect ratio `16:9`, review resolution `720p`, no audio parameter, `--wait`, and JSON output.

**Step 4: Generate candidate B**

Use:

```text
Tight low side-angle macro shot across a hot black comal in a traditional Mexican kitchen. Only hands and forearms enter the frame. A freshly pressed corn tortilla lands on the griddle, tiny bubbles form, it puffs gently, then the hands flip it as soft steam catches warm terracotta light. Shallow depth of field, crisp tortilla texture, subtle natural camera energy, centered action, loop-friendly ending. Branding, faces, bodies, captions, and written graphics are absent.
```

Submit with the same six-second, `16:9`, `720p`, silent parameters and wait for completion.

**Step 5: Present both results and pause**

Show both candidate previews or result URLs with their job IDs. Do not download, rename, integrate, or commit either video until the user explicitly selects A or B.

### Task 6: Add the selected video to the handmade card

**Files:**
- Create: `el-alteno/public/videos/tortillas-handmade.mp4`
- Modify: `el-alteno/src/components/sections/About.tsx`

**Step 1: Download only the selected result**

Save the chosen Higgsfield output exactly as:

```text
el-alteno/public/videos/tortillas-handmade.mp4
```

Verify the file is a six-second MP4 with a 16:9 frame before editing the component.

**Step 2: Replace the decorative right-side engraving layer**

Keep the existing card wrapper and text, but replace its decorative image block with:

```tsx
<div className="pointer-events-none absolute inset-0" aria-hidden="true">
  <Image
    src="/images/about/tortilla-engraving.webp"
    alt=""
    fill
    sizes="(max-width: 768px) 90vw, 768px"
    className="object-cover opacity-45"
  />
  {!reduceMotion && (
    <video
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      poster="/images/about/tortilla-engraving.webp"
      className="absolute inset-0 h-full w-full object-cover object-center"
    >
      <source src="/videos/tortillas-handmade.mp4" type="video/mp4" />
    </video>
  )}
</div>
<div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(34,10,4,.94)_0%,rgba(48,15,6,.78)_46%,rgba(34,10,4,.22)_76%,rgba(20,7,3,.16)_100%)]" />
<div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/55 to-transparent" />
```

Keep the existing text container at `relative z-10 max-w-[73%] sm:max-w-[70%]`. Review text contrast against the selected clip and tune only overlay opacity if necessary.

**Step 3: Type-check**

```powershell
cd el-alteno
npx tsc --noEmit
```

Expected: exit code 0.

**Step 4: Commit**

```powershell
cd ..
git add -- el-alteno/public/videos/tortillas-handmade.mp4 el-alteno/src/components/sections/About.tsx
git commit -m "feat(about): add handmade tortilla process video"
```

### Task 7: Production and visual verification

**Files:**
- Verify only; adjust the touched component classes only if a documented visual defect is found.

**Step 1: Stop any development process using `.next`**

Identify the process listening on port 3200 and stop only that exact process before the production build.

**Step 2: Run static checks**

From `el-alteno/`:

```powershell
npx tsc --noEmit
npm run build
```

Expected: both exit 0. Run `npm run lint` separately and report only pre-existing unrelated findings unless a touched file adds a new issue.

**Step 3: Restart the review server**

```powershell
npm run dev -- --hostname 0.0.0.0 --port 3200
```

Expected URLs:

- `http://127.0.0.1:3200/`
- `http://192.168.1.201:3200/`

**Step 4: Review mobile at approximately 375 px**

Confirm:

- The fixed navbar does not cover the first frame of the hero video.
- The hero video dimensions and crop match the approved baseline.
- The transparent logo has no white rectangle and controls remain aligned.
- Delivery pills remain subordinate to Menu and Event buttons, work by mouse and keyboard, and open the intended sites.
- Tortilla action remains recognizable inside the card and bilingual text remains legible.
- Reduced-motion mode displays the static fallback.

**Step 5: Review desktop**

Confirm the hero remains full-height and the new mobile padding is absent. Check the card at desktop width for over-cropping and text contrast.

**Step 6: Inspect repository state**

```powershell
git status --short --branch
git log --oneline -8
```

Expected: clean worktree on `codex/hero-mobile-video`; no push performed.

**Step 7: Hand off for user review**

Report the two local URLs, validation results, selected candidate, and commit list. Wait for explicit approval before pushing or opening/updating a pull request.
