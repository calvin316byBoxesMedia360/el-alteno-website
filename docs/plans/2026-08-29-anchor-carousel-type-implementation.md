# Anchor, Carousel, and Responsive Type Implementation Plan
> **REQUIRED SUB-SKILL:** Use superpowers:executing-plans to implement this plan task-by-task.
**Goal:** Keep section headings visible after anchor navigation, move the menu arrows out of the label-reading path, and prevent awkward bilingual text wrapping.
**Architecture:** Fix anchor positioning with Tailwind scroll-margin utilities on the navigable home sections, keep `ScrollStrip` as the shared accessible primitive while changing only its arrow presentation, and handle brand-name wrapping at the content source in the affected headings. Validate layout behavior in the running preview at narrow and wide viewports.
**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, Framer Motion, Lucide React.

## Task 1 — Offset fixed-navigation anchor targets

**Files**

- Modify: `C:/Users/no/Documents/ChatGPT/el alteno website/el-alteno-integration-test/el-alteno/src/components/sections/MenuSection.tsx`
- Modify: `C:/Users/no/Documents/ChatGPT/el alteno website/el-alteno-integration-test/el-alteno/src/components/sections/Events.tsx`
- Modify: `C:/Users/no/Documents/ChatGPT/el alteno website/el-alteno-integration-test/el-alteno/src/components/sections/Cocktails.tsx`
- Modify: `C:/Users/no/Documents/ChatGPT/el alteno website/el-alteno-integration-test/el-alteno/src/components/sections/Location.tsx`

**Steps**

1. Add `scroll-mt-24` to each section with a main-navigation anchor.
2. Preserve all existing section IDs and layout classes.
3. Verify that `#menu`, `#events`, `#cocktails`, and `#location` land with their headings below the fixed navigation at both mobile and desktop widths.

**Expected result**

- Anchor navigation no longer hides the beginning of a section beneath the navigation bar.

## Task 2 — Reposition and visually reduce carousel arrows

**Files**

- Modify: `C:/Users/no/Documents/ChatGPT/el alteno website/el-alteno-integration-test/el-alteno/src/components/ui/ScrollStrip.tsx`

**Steps**

1. Keep each arrow button at a minimum 44 px hit area for touch accessibility.
2. Reduce the visible icon to approximately 15–16 px and soften the button treatment.
3. Move the arrow group slightly below the strip's vertical center using a modest top offset such as `top-[58%]`.
4. Keep the arrow visible only when movement is available; preserve disabled state, accessible labels, keyboard activation, edge mask, progress bar, and reduced-motion behavior.
5. Confirm the smaller visual control does not cover the center of category labels or the active tab at 375 px.

**Expected result**

- Arrows are less visually dominant and sit below the label baseline while remaining easy to tap.

## Task 3 — Protect brand wrapping and review responsive copy

**Files**

- Modify: `C:/Users/no/Documents/ChatGPT/el alteno website/el-alteno-integration-test/el-alteno/src/components/sections/Events.tsx`
- Modify: `C:/Users/no/Documents/ChatGPT/el alteno website/el-alteno-integration-test/el-alteno/src/components/sections/Location.tsx`

**Steps**

1. Split the event heading's translated sentence around the brand name and wrap only `El Alteño` in `whitespace-nowrap`.
2. Apply the same protection to the Location heading where the brand appears inside a longer translated title.
3. Add `min-w-0` to the responsive text columns that can otherwise force grid overflow.
4. Keep event tags as separate non-breaking pills so labels such as `Eventos Corporativos` remain complete while the flex row wraps between pills.
5. Review the remaining headings, paragraphs, buttons, and labels in English and Spanish at 375 px and 580 px; adjust local spacing or line-height only where a real cut-off is observed.

**Expected result**

- `El Alteño` stays together in the relevant headings.
- Long translated copy wraps naturally without clipping or horizontal overflow.

## Task 4 — Validate behavior

**Files**

- No new test files.

**Steps**

1. Run `npx eslint src/components/sections/MenuSection.tsx src/components/sections/Events.tsx src/components/sections/Cocktails.tsx src/components/sections/Location.tsx src/components/ui/ScrollStrip.tsx`; expected exit code `0`.
2. Run `npx tsc --noEmit`; expected exit code `0`.
3. In a fresh local preview at `http://127.0.0.1:3400/`, click every main navigation link and confirm the target heading is visible beneath the bar.
4. Inspect the menu strip at 375 px and 580 px in both locales; confirm arrow placement, active label, next-category cue, progress line, and no clipped copy.
5. Inspect Private Events in both locales and confirm the brand name remains on one line.
6. Inspect the remaining home sections for `scrollWidth > clientWidth` and visible text clipping at narrow width.
7. Check `http://192.168.1.201:3400/` for the same rendered result from the Wi-Fi path.
8. Run `npm run build` after stopping the dev server if necessary; expected result is a successful production build.

## Task 5 — Commit the implementation

**Files**

- Modify: the five files listed in Tasks 1–3 only.

**Steps**

1. Run `git diff --check` and inspect `git status` for unrelated changes.
2. Commit with:

   ```powershell
   git -c safe.directory='C:/Users/no/Documents/ChatGPT/el alteno website/el-alteno-integration-test' commit -m "fix(ui): align anchors and responsive labels"
   ```

3. Do not push or modify `master` without an explicit PR request.
