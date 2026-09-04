# Breakfast Feature Card And Stable Menu Scroll Implementation Plan
> **REQUIRED SUB-SKILL:** Use superpowers:executing-plans to implement this plan task-by-task.
**Goal:** Turn the Breakfast notice into a prominent non-interactive photographic feature and keep the category carousel fixed in the viewport while menu results change.
**Architecture:** Generate one decorative wide image and render it through `next/image` beneath a deterministic contrast overlay. Isolate viewport-correction math in a tested utility, disable browser scroll anchoring in the dynamic menu region, and restore the selector position during React's layout phase.
**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, Framer Motion, Lucide React, Node test runner, GPT Image generation, Sharp/WebP.

---

## Task 1: Generate And Optimize The Breakfast Background

**Files:**

- Read: `C:/Users/no/.codex/skills/.system/imagegen/SKILL.md`
- Generate temporary source: `C:/Users/no/AppData/Local/Temp/el-alteno-breakfast-morning-source.png`
- Create: `el-alteno/public/images/menu/breakfast-morning.webp`

**Step 1: Generate one source candidate**

Use the image generation skill with this prompt:

```text
Create a cinematic ultra-wide editorial food-and-hospitality photograph for a Mexican restaurant website breakfast information card, composed as a 2.5:1 horizontal banner. A handcrafted clay café de olla cup with gentle steam sits on the RIGHT third beside one restrained blue-and-cream talavera ceramic detail and a folded natural linen napkin. Warm early-morning sunlight enters from the side, creating elegant amber highlights and soft shadows on a clean dark wood table. Leave the LEFT half intentionally calm, darker and uncluttered for readable website copy. Authentic, welcoming, modest family-restaurant atmosphere; polished professional photography, realistic materials, balanced terracotta, mustard, cream and coffee-brown palette, shallow depth of field. No complete breakfast dish, no eggs, no pancakes, no people, no hands, no logos, no text, no letters, no prices, no luxury hotel styling, no teal, no excessive props.
```

Expected: one clean source with the cup and talavera weighted right and no generated writing.

**Step 2: Inspect before integration**

Use `view_image` on the generated source. Reject and regenerate if it contains text, a complete meal, implausible ceramics, malformed objects or insufficient calm space on the left.

**Step 3: Create the web derivative**

Create `public/images/menu/` if absent. Use the repository's installed Sharp runtime to crop to `1600×640` and encode WebP at quality 82:

```powershell
node -e "import('sharp').then(({default:sharp}) => sharp('C:/Users/no/AppData/Local/Temp/el-alteno-breakfast-morning-source.png').resize(1600,640,{fit:'cover',position:'center'}).webp({quality:82,smartSubsample:true}).toFile('public/images/menu/breakfast-morning.webp'))"
```

**Step 4: Verify dimensions and payload**

```powershell
node -e "import('sharp').then(async ({default:sharp}) => console.log(await sharp('public/images/menu/breakfast-morning.webp').metadata()))"
Get-Item public/images/menu/breakfast-morning.webp | Select-Object Length
```

Expected: `1600×640`, WebP, ideally below 250 KB. If larger, retry quality 76–80 and inspect again.

**Step 5: Do not commit yet**

The asset is committed together with the component that uses it so the branch never points to a missing file.

---

## Task 2: Add A Failing Unit Contract For Viewport Correction

**Files:**

- Create: `el-alteno/src/lib/menuScroll.ts`
- Create: `el-alteno/scripts/menu-scroll.test.mjs`
- Modify: `el-alteno/package.json`

**Step 1: Create the test first**

```js
import test from "node:test";
import assert from "node:assert/strict";
import { getViewportCorrection } from "../src/lib/menuScroll.ts";

test("restores the measured category-selector displacement", () => {
  assert.equal(getViewportCorrection(454, 745), 291);
  assert.equal(getViewportCorrection(745, 454), -291);
});

test("ignores sub-pixel noise and invalid measurements", () => {
  assert.equal(getViewportCorrection(454, 454.5), 0);
  assert.equal(getViewportCorrection(null, 454), 0);
  assert.equal(getViewportCorrection(454, null), 0);
  assert.equal(getViewportCorrection(Number.NaN, 454), 0);
});
```

**Step 2: Add the script**

Add to `package.json`:

```json
"test:menu-scroll": "node --test scripts/menu-scroll.test.mjs"
```

**Step 3: Run and verify failure**

```powershell
npm run test:menu-scroll
```

Expected: failure because `src/lib/menuScroll.ts` does not exist or does not export the function yet.

**Step 4: Add the minimal utility**

```ts
export function getViewportCorrection(
  beforeTop: number | null,
  afterTop: number | null
): number {
  if (
    beforeTop === null ||
    afterTop === null ||
    !Number.isFinite(beforeTop) ||
    !Number.isFinite(afterTop)
  ) {
    return 0;
  }

  const delta = afterTop - beforeTop;
  return Math.abs(delta) < 1 ? 0 : delta;
}
```

**Step 5: Run and verify pass**

```powershell
npm run test:menu-scroll
npx eslint src/lib/menuScroll.ts scripts/menu-scroll.test.mjs
npx tsc --noEmit
```

Expected: two tests pass; lint and TypeScript report no errors.

**Step 6: Commit the tested utility**

```powershell
git add -- el-alteno/src/lib/menuScroll.ts el-alteno/scripts/menu-scroll.test.mjs el-alteno/package.json
git commit -m "test(menu): define stable viewport correction"
```

---

## Task 3: Lock The Carousel Position During Category Changes

**Files:**

- Modify: `el-alteno/src/components/menu/MenuTabs.tsx`
- Test: `el-alteno/scripts/menu-scroll.test.mjs`

**Step 1: Add layout-phase position preservation**

Change the React import and add the utility:

```tsx
import { useLayoutEffect, useRef, useState } from "react";
import { getViewportCorrection } from "@/lib/menuScroll";
```

Add state-adjacent refs and behavior:

```tsx
const selectorRef = useRef<HTMLDivElement>(null);
const selectorTopBeforeChange = useRef<number | null>(null);

const selectCategory = (categoryId: MenuCategory["id"]) => {
  if (categoryId === active) return;
  selectorTopBeforeChange.current =
    selectorRef.current?.getBoundingClientRect().top ?? null;
  setActive(categoryId);
};

useLayoutEffect(() => {
  const beforeTop = selectorTopBeforeChange.current;
  if (beforeTop === null) return;

  const restorePosition = () => {
    const afterTop = selectorRef.current?.getBoundingClientRect().top ?? null;
    const correction = getViewportCorrection(beforeTop, afterTop);
    if (correction !== 0) {
      window.scrollBy({ top: correction, left: 0, behavior: "auto" });
    }
  };

  restorePosition();
  const frame = window.requestAnimationFrame(restorePosition);
  selectorTopBeforeChange.current = null;
  return () => window.cancelAnimationFrame(frame);
}, [active]);
```

**Step 2: Anchor and isolate the changing region**

- Add `ref={selectorRef}` to the stable wrapper immediately above the category strip.
- Add `[overflow-anchor:none]` to the `MenuTabs` root and the animated results containers.
- Change each category handler to `onClick={() => selectCategory(cat.id)}`.
- Add `type="button"` to every category button.
- Preserve horizontal scroll, focus, labels and existing visual transitions.

**Step 3: Run static checks**

```powershell
npm run test:menu-scroll
npx eslint src/components/menu/MenuTabs.tsx src/lib/menuScroll.ts scripts/menu-scroll.test.mjs
npx tsc --noEmit
```

Expected: no errors.

**Step 4: Reproduce the original mobile path**

At `390×844`:

1. Navigate to `/#menu`.
2. Position the category selector near the middle of the viewport.
3. Record `window.scrollY` and selector `getBoundingClientRect().top`.
4. Select `Caldos`, then `Especialidades`, then a category with photographs.
5. Record the same measurements immediately and after 350 ms.

Expected: no material vertical movement; tolerance `≤ 1 px`. No console errors.

**Step 5: Commit the behavior fix**

```powershell
git add -- el-alteno/src/components/menu/MenuTabs.tsx
git commit -m "fix(menu): preserve carousel viewport position"
```

---

## Task 4: Turn BreakfastNotice Into A Featured Informational Card

**Files:**

- Modify: `el-alteno/src/components/menu/BreakfastNotice.tsx`
- Add: `el-alteno/public/images/menu/breakfast-morning.webp`

**Step 1: Add `next/image` and the background layers**

Use this structure inside the existing `aside`:

```tsx
import Image from "next/image";
import { Sun } from "lucide-react";

<aside
  aria-label={locale === "es" ? "Información de desayunos" : "Breakfast information"}
  className="relative isolate min-h-[152px] overflow-hidden rounded-3xl border border-mustard/45 bg-[#24160F] px-5 py-6 shadow-[0_20px_55px_rgba(60,28,10,0.24)] md:min-h-[164px] md:px-8 md:py-7"
>
  <Image
    src="/images/menu/breakfast-morning.webp"
    alt=""
    fill
    sizes="(max-width: 768px) 100vw, 1280px"
    className="-z-20 object-cover object-center"
  />
  <div
    aria-hidden
    className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(28,15,10,0.97)_0%,rgba(73,37,20,0.88)_48%,rgba(73,37,20,0.26)_100%)]"
  />
  <div
    aria-hidden
    className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_85%_35%,rgba(226,182,121,0.20),transparent_38%)] backdrop-blur-[1px]"
  />
  {/* Existing localized copy, promoted to cream/mustard contrast */}
</aside>
```

**Step 2: Strengthen hierarchy without implying interaction**

- Keep `Breakfast / Desayunos` as the small mustard eyebrow.
- Increase the primary sentence to `text-lg md:text-xl`, cream/white, semibold.
- Keep the bilingual secondary line slightly smaller when `bilingual` is true.
- Use a glass-backed Sun medallion, but no arrow, link, hover transform or pointer cursor.
- Keep the whole card outside the tab order.

**Step 3: Verify both contexts**

- Homepage in English and Spanish.
- QR menu bilingual card.
- Light and dark themes.
- Mobile `390×844` and desktop width.
- Confirm no generated text appears in the photograph and all copy is readable.

**Step 4: Run checks**

```powershell
npx eslint src/components/menu/BreakfastNotice.tsx
npx tsc --noEmit
```

**Step 5: Commit asset and component together**

```powershell
git add -- el-alteno/src/components/menu/BreakfastNotice.tsx el-alteno/public/images/menu/breakfast-morning.webp
git commit -m "feat(menu): feature breakfast information card"
```

---

## Task 5: Full Validation And Handoff

**Files:**

- Modify: `docs/memory/NEXT.md`
- Verify: all files committed by Tasks 1–4

**Step 1: Run the full suite**

```powershell
npm run test:menu
npm run test:menu-scroll
npx eslint src/data/menu.ts src/lib/menuScroll.ts src/components/menu/BreakfastNotice.tsx src/components/menu/MenuTabs.tsx src/components/menu/MenuItem.tsx src/components/menu/MenuListRow.tsx src/components/sections/MenuSection.tsx src/app/menu/page.tsx scripts/menu-data.test.mjs scripts/menu-scroll.test.mjs
npx tsc --noEmit
npm run build
```

Expected: all commands pass; `/` and `/menu` remain statically generated.

**Step 2: Check Git scope**

```powershell
git diff --check
git status -sb
```

Expected: no tracked modifications remain. Existing untracked Private Events media stays untracked and untouched.

**Step 3: Update continuity memory**

Record the approved visual, stable-scroll behavior, generated asset path, tests and exact local/Wi-Fi launch rule in `docs/memory/NEXT.md`.

**Step 4: Commit the handoff**

```powershell
git add -- docs/memory/NEXT.md
git commit -m "docs: record breakfast and menu scroll validation"
```

**Step 5: Relaunch for review**

Start from `el-alteno/` on port 3400, with logs outside `.next` so production builds are not locked. Confirm:

- Local: `http://127.0.0.1:3400/`
- Wi-Fi: use the exact current address printed by `npm run dev -- --port 3400`
- No blocked `allowedDevOrigins` requests after hotspot/IP changes.

Do not push directly to `master`. Push the feature branch and open/update a PR only after the user approves the local and mobile result.
