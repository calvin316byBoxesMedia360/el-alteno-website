# Navigation, Menu Carousel, and Map Polish Implementation Plan
> **REQUIRED SUB-SKILL:** Use superpowers:executing-plans to implement this plan task-by-task.
**Goal:** Refine the navigation glass effect, make menu category scrolling unmistakable on touch screens, and restore the map's natural color.
**Architecture:** Keep the navigation surface styling in `Navbar.tsx`, enhance the existing accessible `ScrollStrip` instead of replacing it, add the editorial cue and active-category counter in `MenuTabs.tsx`, and remove only the map's presentation filter in `Location.tsx`. No new dependency or data-model change is needed.
**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, Framer Motion, Lucide React.

## Task 1 — Soften the navigation glass surface

**Files**

- Modify: `C:/Users/no/Documents/ChatGPT/el alteno website/el-alteno-integration-test/el-alteno/src/components/layout/Navbar.tsx`

**Steps**

1. Replace the current opaque dark surface with a lower-opacity warm-black surface, for example `bg-[#17120F]/72 dark:bg-[#0F0C0A]/78`.
2. Upgrade the surface treatment from `backdrop-blur-md` to `backdrop-blur-xl backdrop-saturate-150` so the Hero remains visible but controlled behind the bar.
3. Keep the current compact `h-14`, rounded shape, light foreground, and minimum 44 px controls.
4. Use a lighter, softer shadow and a slightly clearer mustard border so the bar reads as intentional glass rather than a black block.
5. Apply the same softer treatment to the mobile menu panel, preserving its dark readable foreground.

**Expected result**

- The Hero is visible through the navigation in both themes.
- The bar remains dark enough for contrast but no longer looks solid or overly heavy.

## Task 2 — Add an editorial cue to the category strip

**Files**

- Modify: `C:/Users/no/Documents/ChatGPT/el alteno website/el-alteno-integration-test/el-alteno/src/components/menu/MenuTabs.tsx`
- Modify: `C:/Users/no/Documents/ChatGPT/el alteno website/el-alteno-integration-test/el-alteno/src/components/ui/ScrollStrip.tsx`

**Steps**

1. In `MenuTabs`, derive the active category index from `categories` and render a compact bilingual eyebrow (`Explore the menu / Explora el menú`) with a `01 / 14`-style progress count.
2. Keep the existing `ScrollStrip` role and accessible label.
3. Give the active category extra horizontal presence and centered alignment while preserving the existing terracotta identity; leave inactive categories lighter and quieter.
4. Keep the intentionally clipped next category, edge mask, progress line, and smooth snap-like horizontal interaction.
5. Change the existing arrow controls from desktop-only to visible whenever horizontal overflow exists, including mobile. Keep them hidden and non-interactive when no overflow exists.
6. Style the arrows as small dark glass controls with mustard iconography so they are visibly actionable without covering the category labels excessively.
7. Preserve the existing one-time nudge and `prefers-reduced-motion` behavior.

**Expected result**

- On a phone, the partially visible next category plus the right arrow and progress line make horizontal scrolling obvious.
- On desktop, the treatment remains refined and does not add unnecessary text or icons to every category.

## Task 3 — Restore the map's natural colors

**Files**

- Modify: `C:/Users/no/Documents/ChatGPT/el alteno website/el-alteno-integration-test/el-alteno/src/components/sections/Location.tsx`

**Steps**

1. Remove the inline `filter: "grayscale(1) invert(0.9) contrast(1.2)"` from the Google Maps iframe style.
2. Keep `border: 0`, responsive sizing, lazy loading, referrer policy, the real Watsonville embed URL, and the external directions link unchanged.

**Expected result**

- The map shows Google Maps' natural roads, water, labels, and location colors.

## Task 4 — Validate behavior and visual states

**Files**

- No new test files.

**Steps**

1. From `C:/Users/no/Documents/ChatGPT/el alteno website/el-alteno-integration-test/el-alteno`, run `npx eslint src/components/layout/Navbar.tsx src/components/menu/MenuTabs.tsx src/components/ui/ScrollStrip.tsx src/components/sections/Location.tsx`; expected exit code `0`.
2. Run `npx tsc --noEmit`; expected exit code `0`.
3. In a fresh local preview at `http://127.0.0.1:3400/`, inspect the navigation in both theme states; measure only after the theme transition settles.
4. Inspect the menu at a narrow viewport, verify the active counter, clipped next category, right arrow, progress line, keyboard focus, and horizontal scrolling.
5. Inspect the Location section and verify the iframe no longer has a CSS filter while retaining the correct Watsonville embed.
6. Check `http://192.168.1.201:3400/` for the same rendered behavior from the phone network path.
7. Run `npm run build` after stopping the dev server if necessary; expected result is a successful static production build.

## Task 5 — Commit the implementation

**Files**

- Modify: `Navbar.tsx`, `MenuTabs.tsx`, `ScrollStrip.tsx`, and `Location.tsx` only.

**Steps**

1. Inspect `git diff --check` and `git status` for unrelated changes.
2. Commit with:

   ```powershell
   git -c safe.directory='C:/Users/no/Documents/ChatGPT/el alteno website/el-alteno-integration-test' commit -m "refine(nav): polish glass carousel and map"
   ```

3. Do not push the branch or modify `master` without an explicit PR request.
