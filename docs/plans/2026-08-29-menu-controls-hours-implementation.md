# Menu Controls, Hours, and Content Implementation Plan
> **REQUIRED SUB-SKILL:** Use superpowers:executing-plans to implement this plan task-by-task.
**Goal:** Move carousel controls below the category labels, correct the approved copy and schedule, and remove the duplicated payment block without introducing mobile overflow.
**Architecture:** Reshape the existing `ScrollStrip` control row so arrows and progress share a lower rail instead of overlaying the scroll viewport. Keep section copy in its existing components, use non-breaking spans and a two-column CSS grid for responsive content, and remove only the redundant Location payment panel.
**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, Framer Motion, Lucide React.

## Task 1 — Put carousel arrows in a lower control rail

**Files**

- Modify: `C:/Users/no/Documents/ChatGPT/el alteno website/el-alteno-integration-test/el-alteno/src/components/ui/ScrollStrip.tsx`

**Steps**

1. Remove the absolute positioning from the arrow buttons so they cannot cover the scroll viewport.
2. Keep each button's 44 px hit area, but render a smaller 32 px visual circle with the 15 px chevron inside.
3. Render the left arrow, progress bar, and right arrow in a flex row below the scroller whenever the strip overflows.
4. Keep unavailable arrows in the rail with zero opacity and pointer-events disabled so the progress bar remains centered and the layout does not jump.
5. Preserve `aria-label`, disabled state, keyboard activation, scroll measurement, edge mask, one-time nudge, and reduced-motion behavior.

**Expected result**

- Arrows are visibly lower and never sit on top of category buttons.
- The progress indicator remains readable and the controls stay accessible.

## Task 2 — Correct menu copy and event phone layout

**Files**

- Modify: `C:/Users/no/Documents/ChatGPT/el alteno website/el-alteno-integration-test/el-alteno/src/components/sections/MenuSection.tsx`
- Modify: `C:/Users/no/Documents/ChatGPT/el alteno website/el-alteno-integration-test/el-alteno/src/components/sections/Events.tsx`

**Steps**

1. Change the menu introduction wording from `refried beans` / `frijoles refritos` to `beans` / `frijoles`, preserving the bilingual structure.
2. Make the event contact row wrap between its label and phone link when necessary, but apply `whitespace-nowrap` to `(831) 768-9876` so the number never splits.
3. Keep the phone link's minimum touch target and existing tel URL.

**Expected result**

- The approved copy appears in both locales.
- The telephone number remains complete and readable above the reservation form.

## Task 3 — Align hours and move the closing day to Tuesday

**Files**

- Modify: `C:/Users/no/Documents/ChatGPT/el alteno website/el-alteno-integration-test/el-alteno/src/components/sections/Location.tsx`

**Steps**

1. Replace each `justify-between` hours row with `grid-cols-[minmax(0,1fr)_auto]`, `items-baseline`, a stable gap, and a right-aligned no-wrap time column.
2. Display Monday and Wednesday–Saturday as open from 11:00 AM to 8:00 PM, Sunday with the same hours, and Tuesday as `Closed / Cerrado`.
3. Keep the Lunch Specials row aligned to the same columns and preserve its existing 11:00 AM–3:00 PM value.
4. Keep the real address, map iframe, phone, directions link, and localized labels unchanged.

**Expected result**

- Day and time columns line up in English and Spanish at narrow widths.
- Tuesday is the only closed day shown; Monday is included among the open days.

## Task 4 — Remove the duplicated payment panel

**Files**

- Modify: `C:/Users/no/Documents/ChatGPT/el alteno website/el-alteno-integration-test/el-alteno/src/components/sections/Location.tsx`

**Steps**

1. Remove the `Payment & Partners` block from the Location info card.
2. Leave the footer payment/delivery content untouched.

**Expected result**

- Location no longer repeats payment and delivery labels already present lower on the site.

## Task 5 — Validate and commit

**Files**

- No new test files.

**Steps**

1. Run `npx eslint src/components/sections/MenuSection.tsx src/components/sections/Events.tsx src/components/sections/Location.tsx src/components/ui/ScrollStrip.tsx`; expected exit code `0`.
2. Run `npx tsc --noEmit`; expected exit code `0`.
3. At 375 px and 580 px, inspect the menu rail, event phone row, Private Events copy, and Location hours in English and Spanish.
4. Confirm `document.documentElement.scrollWidth === document.documentElement.clientWidth` at narrow width and no visible text is clipped.
5. Confirm the Location payment panel is absent while footer delivery links remain.
6. Run `npm run build` after stopping the dev server if necessary; expected result is a successful production build.
7. Confirm `http://127.0.0.1:3400/` and `http://192.168.1.201:3400/` return `200`.
8. Commit with:

   ```powershell
   git -c safe.directory='C:/Users/no/Documents/ChatGPT/el alteno website/el-alteno-integration-test' commit -m "fix(ui): separate carousel controls and align hours"
   ```

9. Do not push the branch or modify `master` without an explicit PR request.
