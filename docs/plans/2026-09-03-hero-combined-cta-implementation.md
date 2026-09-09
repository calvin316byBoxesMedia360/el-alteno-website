# Hero Combined CTA Implementation Plan
> **REQUIRED SUB-SKILL:** Use superpowers:executing-plans to implement this plan task-by-task.
**Goal:** Replace the separate Hero event and gallery buttons with one premium split CTA that keeps both destinations clear.
**Architecture:** Update only the existing CTA group in `Hero.tsx`; keep `Explore Menu`, delivery links, booking anchor, and gallery route unchanged. The new group is a semantic wrapper containing two independently accessible links with responsive stacking.
**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, Framer Motion, Lucide icons, existing `useLanguage` and reduced-motion behavior.

## Task 1: Replace the two standalone links with the unified CTA group

**Files:**
- Modify: `el-alteno/src/components/sections/Hero.tsx`

**Steps:**

1. Keep the `Explore Menu` link exactly as it is.
2. Replace the current `Book an Event` and `Gallery` sibling links with one rounded wrapper labeled `Plan Your Celebration / Planea tu celebración`.
3. Add two equal internal links: booking to `#events` and gallery to `/gallery`.
4. Use a stronger terracotta treatment for booking, a dark translucent treatment for gallery, and a mustard divider visible only in the side-by-side layout.
5. Stack the internal links vertically on mobile and display them side by side from the medium breakpoint upward.
6. Preserve minimum 44px touch targets, independent focus rings, bilingual labels, hover/tap motion, and reduced-motion behavior.

**Expected result:** The Hero presents one unified celebration CTA while users can immediately choose booking or gallery.

## Task 2: Verify the CTA behavior and visual integration

**Files:**
- Test: `el-alteno/src/components/sections/Hero.tsx`

**Steps:**

1. Run `npx tsc --noEmit` from `el-alteno` and expect success.
2. Run focused ESLint against `src/components/sections/Hero.tsx` and expect success.
3. Run `git diff --check` from `el-alteno-integration-test` and expect no whitespace errors.
4. Fetch `http://127.0.0.1:3400/` and confirm the Hero contains `Plan Your Celebration`, `Book an Event`, and `View Gallery`.
5. Manually test both internal links, keyboard focus order, English/Spanish copy, and mobile/desktop layout.

**Expected result:** The CTA is lint-clean, type-safe, responsive, bilingual, and routes correctly without altering unrelated Hero actions.
