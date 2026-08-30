# El Alteño Menu Revision Implementation Plan
> **REQUIRED SUB-SKILL:** Use superpowers:executing-plans to implement this plan task-by-task.
**Goal:** Publish the restaurant-approved August 30 menu corrections and breakfast notice without inventing menu information or touching `master` directly.
**Architecture:** `MENU-SOURCE.md` remains the authoritative consolidated record; `el-alteno/src/data/menu.ts` is its bilingual application projection. A focused Node test transpiles the TypeScript data module and validates every approved price, removal, addition and category assignment before the UI is reviewed.
**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, Lucide React, Node test runner, FFmpeg 9.

---

## Task 1: Consolidate The Source Of Truth

**Files:**

- Modify: `MENU-SOURCE.md`
- Reference: `docs/memory/MENU-REVISION-2026-08-30.md`

**Step 1: Add the August 30 authority block**

Record the Plaud share URL, both handwritten source paths and the owner's explicit overrides. State that Camarones a la Diabla and Camarones con Vegetales are both `$17.99`, overriding Plaud's erroneous `17.00` and `17.29` transcription.

**Step 2: Update every category table**

Replace superseded prices with the approved matrix. Add:

- `Mariscada a la Parrilla` at `$23.99` with mussels, crab legs and shrimp served in a hot skillet;
- `Caldo de Res` at `$15.99` and `Caldo de Pollo` at `$14.99` under a new `CALDOS / SOUPS` section;
- `Caldo de Birria` at `$18.99` under House Specialties, goat birria, weekends only;
- Chicken and Shrimp Fajitas at `$24.99`;
- Lunch Enchilada de Asada at `$12.99`;
- Lunch Quesadilla de Carne Asada at `$13.99`, served with rice and beans.

Remove Filete Limón, à-la-carte Fish Fillet and Helado from the active tables. Preserve a dated change note so their removal is auditable.

**Step 3: Record content corrections**

Document the regular-tortilla changes, both jícama removals, the Ensalada en Canasta green-bean removal, the grilled-chicken taco rename and Sunday `9:00 AM – 8:00 PM` schedule.

**Step 4: Verify no contradiction remains**

Run:

```powershell
rg -n "17\.00|17\.29|Filete Lim[oó]n|Fish Fillet|spinach flour tortilla|sun-dried tomato flour tortilla|green beans|jicama|Helado" MENU-SOURCE.md
```

Expected: removed dishes may occur only in dated removal/history notes; obsolete ingredients and incorrect prices do not occur in active menu tables.

**Step 5: Commit the source update**

```powershell
git add -- MENU-SOURCE.md
git commit -m "docs(menu): record approved August price revision"
```

---

## Task 2: Add A Failing Menu Contract Test

**Files:**

- Create: `el-alteno/scripts/menu-data.test.mjs`
- Modify: `el-alteno/package.json`

**Step 1: Add the test script**

Add to `package.json`:

```json
"test:menu": "node --test scripts/menu-data.test.mjs"
```

**Step 2: Create a TypeScript-data loader**

Use the installed `typescript` dependency to transpile `src/data/menu.ts` in memory, then import the generated ESM through a data URL. The test must not write generated files.

```js
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";

async function loadMenu() {
  const source = await readFile(new URL("../src/data/menu.ts", import.meta.url), "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
  });
  const url = `data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`;
  return import(url);
}
```

**Step 3: Encode the complete approved price contract**

The expected map must contain these IDs and values:

```js
const approvedPrices = {
  "camarones-diabla": 17.99,
  "huachinango-empanizado": 18.99,
  "camarones-empanizados": 17.99,
  "camarones-mojo-ajo": 17.99,
  "camarones-vegetales": 17.99,
  "camarones-tres-chiles": 17.99,
  "camarones-vallarta": 17.99,
  "huachinango-plancha": 17.99,
  "mariscada-caldo": 23.99,
  "mariscada-parrilla": 23.99,
  "caldo-camaron": 17.99,
  "caldo-7-mares": 19.99,
  salmon: 19.99,
  "caldo-res": 15.99,
  "caldo-pollo": 14.99,
  "caldo-birria": 18.99,
  "molcajete-chicken": 21.99,
  "molcajete-steak": 22.99,
  "molcajete-shrimp": 22.99,
  "molcajete-mixto": 23.99,
  sopes: 15.99,
  "chiles-rellenos": 17.99,
  "mole-puebla": 17.99,
  "pipian-mole-verde": 17.99,
  "tacos-dorados": 15.99,
  "new-york-steak": 21.99,
  "pechuga-carmelitas": 17.99,
  "carne-asada": 19.99,
  "chile-colorado": 17.99,
  "chile-verde": 17.99,
  pozole: 15.99,
  "tortilla-soup": 14.99,
  "enchiladas-mole-rojo": 17.99,
  "enchiladas-mole-verde": 17.99,
  "enchiladas-camaron-aguacate": 18.99,
  "enchiladas-verdes-cangrejo": 18.99,
  "enchiladas-mariscos": 20.99,
  "burrito-charbroiled-steak": 11.99,
  "burrito-rock-shrimp": 13.99,
  "burrito-chile-verde": 11.99,
  "burrito-chile-colorado": 11.99,
  "burrito-al-pastor": 10.99,
  "burrito-pork-carnitas": 10.99,
  "burrito-pollo-rojo": 10.99,
  "burrito-parrilla-chicken-guajillo": 12.99,
  "burrito-mango-tango-shrimp": 13.99,
  "burrito-rock-shrimp-verde": 13.99,
  "fajitas-chicken": 21.99,
  "fajitas-steak": 21.99,
  "fajitas-chicken-steak": 23.99,
  "fajitas-chicken-shrimp": 24.99,
  "fajitas-chicken-steak-prawns": 24.99,
  "tostadas-camaron": 7.99,
  "tostada-ceviche": 7.99,
  "orden-guacamole": 12,
  "flautas-pollo": 10.99,
  aguachile: 21.99,
  "nachos-mexicanos": 16.99,
  "dos-sopes-guacamole": 15.99,
  "dos-cheese-enchiladas": 17.99,
  "veggie-burrito": 12.99,
  "veggie-fajitas": 18.99,
  "parrillada-2-3": 67.99,
  "parrillada-3-5": 89.99,
  "taco-charbroiled-steak": 3.5,
  "taco-red-snapper": 5,
  "taco-pollo-rojo": 3.5,
  "taco-pork-carnitas": 3.5,
  "taco-al-pastor": 3.5,
  "ensalada-canasta": 14.99,
  "ensalada-camaron-aguacate": 18.99,
  "coctel-camaron": 18.99,
  "coctel-camaron-pulpo": 19.99,
  "alacarta-cheese-enchilada": 4.99,
  "alacarta-chicken-enchilada": 4.99,
  "alacarta-beef-enchilada": 5.99,
  "alacarta-queso-quesadilla": 7.99,
  "lunch-flautas-pollo": 11.99,
  "lunch-cheese-enchilada": 11.99,
  "lunch-chicken-enchilada": 11.99,
  "lunch-quesadilla-pollo-chipotle": 12.99,
  "lunch-quesadilla-camaron": 13.99,
  "lunch-chile-relleno": 12.99,
  "lunch-enchilada-asada": 12.99,
  "lunch-quesadilla-carne-asada": 13.99,
  flan: 7,
};
```

Assert:

- every map entry exists at the exact price;
- `filete-limon`, `alacarta-fish-fillet` and `helado` are absent;
- all IDs are unique;
- every available item has a finite non-negative price;
- `caldo-res` and `caldo-pollo` use category `soups`;
- `caldo-birria` uses category `specialties` and mentions weekends in both languages;
- the grilled-chicken taco name is corrected in both languages;
- forbidden ingredients/tortillas are absent from the corrected descriptions.

**Step 4: Run the test and verify failure**

```powershell
npm run test:menu
```

Expected: failures for the old prices, missing additions and still-present removals.

**Step 5: Commit the failing contract**

```powershell
git add -- package.json scripts/menu-data.test.mjs
git commit -m "test(menu): lock approved restaurant corrections"
```

---

## Task 3: Synchronize The Application Menu Data

**Files:**

- Modify: `el-alteno/src/data/menu.ts`
- Modify: `el-alteno/src/types/menu.ts`
- Modify: `el-alteno/src/components/menu/MenuItem.tsx`
- Modify: `el-alteno/src/components/menu/MenuListRow.tsx`
- Modify: `el-alteno/src/app/menu/page.tsx`

**Step 1: Add the category**

Insert `soups` immediately after seafood:

```ts
{
  id: "soups",
  label: "Soups",
  labelEs: "Caldos",
  icon: "Soup",
  order: 2,
}
```

Increment later category order values so they remain unique and sequential.

**Step 2: Apply all price, removal and addition changes**

Use the test map as the exact contract. Preserve all existing approved images and tags unless the removed item owns them. Use these safe new records:

```ts
{
  id: "caldo-res",
  name: "Beef Soup",
  nameEs: "Caldo de Res",
  description: "",
  descriptionEs: "",
  price: 15.99,
  category: "soups",
  image: null,
  tags: [],
  available: true,
},
{
  id: "caldo-pollo",
  name: "Chicken Soup",
  nameEs: "Caldo de Pollo",
  description: "",
  descriptionEs: "",
  price: 14.99,
  category: "soups",
  image: null,
  tags: [],
  available: true,
},
{
  id: "caldo-birria",
  name: "Birria Soup",
  nameEs: "Caldo de Birria",
  description: "Goat birria. Available weekends only.",
  descriptionEs: "Birria de chivo. Disponible sólo los fines de semana.",
  price: 18.99,
  category: "specialties",
  image: null,
  tags: [],
  available: true,
},
```

Mariscada a la Parrilla:

```ts
{
  id: "mariscada-parrilla",
  name: "Grilled Mariscada",
  nameEs: "Mariscada a la Parrilla",
  description: "Mussels, crab legs and shrimp served sizzling in a hot skillet.",
  descriptionEs: "Mejillones, patas de cangrejo y camarones servidos en un sartén caliente.",
  price: 23.99,
  category: "seafood",
  image: null,
  tags: [],
  available: true,
},
```

**Step 3: Avoid blank-description layout artifacts**

Conditionally render description paragraphs only when the relevant string is non-empty in both menu presentation systems.

**Step 4: Run the contract test**

```powershell
npm run test:menu
```

Expected: all tests pass.

**Step 5: Commit the data synchronization**

```powershell
git add -- src/data/menu.ts src/components/menu/MenuItem.tsx src/components/menu/MenuListRow.tsx src/app/menu/page.tsx
git commit -m "feat(menu): apply approved prices and dish corrections"
```

---

## Task 4: Add The Informative Breakfast Notice

**Files:**

- Create: `el-alteno/src/components/menu/BreakfastNotice.tsx`
- Modify: `el-alteno/src/components/sections/MenuSection.tsx`
- Modify: `el-alteno/src/app/menu/page.tsx`

**Step 1: Create the reusable note**

```tsx
import { Sun } from "lucide-react";

interface BreakfastNoticeProps {
  locale?: "en" | "es";
  bilingual?: boolean;
}

export default function BreakfastNotice({ locale = "en", bilingual = false }: BreakfastNoticeProps) {
  const english = "Craving breakfast? Ask about our breakfast menu.";
  const spanish = "¿Antojo de desayuno? Pregunte por nuestro menú de desayunos.";

  return (
    <aside
      aria-label={locale === "es" ? "Información de desayunos" : "Breakfast information"}
      className="relative overflow-hidden rounded-2xl border border-mustard/35 bg-card/65 px-4 py-4 shadow-[0_14px_40px_rgba(92,55,22,0.10)] backdrop-blur-md dark:border-mustard/20 dark:bg-[#231D18]/70"
    >
      <div aria-hidden className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-mustard via-terracota to-mustard" />
      <div className="flex items-start gap-3">
        <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full border border-mustard/35 bg-mustard/10 text-accent">
          <Sun className="size-4" aria-hidden />
        </span>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent">
            Breakfast / Desayunos
          </p>
          {bilingual ? (
            <>
              <p className="mt-1 text-sm font-semibold text-foreground">{english}</p>
              <p className="mt-0.5 text-sm text-muted-foreground">{spanish}</p>
            </>
          ) : (
            <p className="mt-1 text-sm font-semibold text-foreground">
              {locale === "es" ? spanish : english}
            </p>
          )}
        </div>
      </div>
    </aside>
  );
}
```

Adapt classes to the repository's actual tokens if visual inspection shows a contrast issue; do not introduce teal.

**Step 2: Insert into the homepage menu**

Render after the menu introduction/header and before `MenuTabs`, using the active locale.

**Step 3: Insert into the QR menu**

Render the bilingual variant after the digital-menu introduction and before quick-jump anchors.

**Step 4: Run focused checks**

```powershell
npx eslint src/components/menu/BreakfastNotice.tsx src/components/sections/MenuSection.tsx src/app/menu/page.tsx
npx tsc --noEmit
```

Expected: zero errors.

**Step 5: Commit the notice**

```powershell
git add -- src/components/menu/BreakfastNotice.tsx src/components/sections/MenuSection.tsx src/app/menu/page.tsx
git commit -m "feat(menu): add breakfast information notice"
```

---

## Task 5: Correct Sunday Hours

**Files:**

- Modify: `el-alteno/src/components/sections/Location.tsx`
- Modify: `el-alteno/src/components/layout/Footer.tsx`
- Search: `el-alteno/src/**`

**Step 1: Change Sunday only**

Replace Sunday `11:00 AM – 8:00 PM` with `9:00 AM – 8:00 PM`. Preserve Tuesday closed and all other hours.

**Step 2: Search for stale copies**

```powershell
rg -n -C 2 "Sunday|Domingo" src
```

Expected: every user-visible Sunday schedule uses `9:00 AM – 8:00 PM`.

**Step 3: Commit the hours correction**

```powershell
git add -- src/components/sections/Location.tsx src/components/layout/Footer.tsx
git commit -m "fix(hours): open Sunday menu service at nine"
```

---

## Task 6: Validate The Complete Menu Round

**Files:**

- Verify all modified files

**Step 1: Run automated checks**

```powershell
npm run test:menu
npx eslint src/data/menu.ts src/components/menu/BreakfastNotice.tsx src/components/menu/MenuItem.tsx src/components/menu/MenuListRow.tsx src/components/sections/MenuSection.tsx src/components/sections/Location.tsx src/components/layout/Footer.tsx src/app/menu/page.tsx
npx tsc --noEmit
npm run build
```

Expected: all commands exit zero.

**Step 2: Review the diff for source parity**

```powershell
git diff origin/master -- MENU-SOURCE.md el-alteno/src/data/menu.ts
```

Check every changed price against `docs/memory/MENU-REVISION-2026-08-30.md` line by line.

**Step 3: Inspect Git scope**

```powershell
git status -sb
```

Expected: unrelated untracked event-media candidates remain untracked and unstaged.

---

## Task 7: Produce Web-Optimized Private Events Derivatives

**Files:**

- Preserve: `el-alteno/public/videos/private-events-walkthrough-master-v1.mp4`
- Create: `el-alteno/public/videos/private-events-walkthrough-1080p-web.mp4`
- Create: `el-alteno/public/videos/private-events-walkthrough-720p-web.mp4`
- Modify only after visual approval: `el-alteno/src/components/sections/Events.tsx` or its video-card child

**Step 1: Encode derivatives locally**

Use H.264 NVENC, `yuv420p`, `faststart` and no audio. Target approximately 4–5 Mbps for 1080p and 2–2.5 Mbps for 720p. Preserve duration and frame cadence.

**Step 2: Verify metadata and sizes**

Run FFprobe and confirm:

- duration remains approximately 29.8667 seconds;
- no audio stream;
- 1080p derivative is approximately 15–20 MB;
- 720p derivative is approximately 8–12 MB;
- both use H.264 and `yuv420p`.

**Step 3: Visual checkpoint**

Review logo edges, dark gradients, transitions and mobile playback before changing the active source. Do not activate either derivative without user approval.

**Step 4: Commit separately after approval**

```powershell
git add -- public/videos/private-events-walkthrough-1080p-web.mp4 public/videos/private-events-walkthrough-720p-web.mp4 <approved-video-component>
git commit -m "perf(video): optimize private events walkthrough delivery"
```

---

## Task 8: Local And Wi-Fi Acceptance

**Step 1: Start the canonical dev server**

```powershell
npm run dev
```

Use exactly the printed `Local:` and `Wi-Fi:` URLs. Never use `127.0.0.1` on the phone.

**Step 2: Review both menu surfaces**

Check:

- homepage `/#menu`;
- standalone `/menu`;
- category carousel and new Soups category;
- Caldo de Birria under House Specialties;
- breakfast notice in light/dark and EN/ES;
- long names and prices at 320–430 px widths;
- Sunday schedule;
- no blank-description spacing;
- no Next dev indicator in the production build.

**Step 3: Publish only after approval**

Push `codex/menu-revision-2026-08-30`, open a PR to `master`, wait for checks and user approval, then merge. Never push directly to `master`.
