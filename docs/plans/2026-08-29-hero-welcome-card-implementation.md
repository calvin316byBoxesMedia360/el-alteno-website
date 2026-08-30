# Hero Welcome Card Implementation Plan
> **REQUIRED SUB-SKILL:** Use superpowers:executing-plans to implement this plan task-by-task.
> **Status:** Rejected after visual review; the card was removed from the preview branch.
**Goal:** Replace the repeated Hero emblem with a bilingual welcome card that preserves the approved visual identity without adding another full logo.
**Architecture:** Modify the existing Hero content block only. Reuse the existing tortilla engraving as a low-opacity decorative image, keep the approved bilingual copy in the component, and preserve the existing Framer Motion reduced-motion behavior.
**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, Framer Motion, Next Image.

## Task 1 — Replace the emblem block

**Files**: Modify `el-alteno/src/components/sections/Hero.tsx`; no new runtime component or asset.

1. Locate the `motion.div` with `hero-emblem-clip`.
2. Keep its motion props and responsive order, but replace the SVG and logo image with a relative rounded card.
3. Render the existing tortilla engraving with `next/image`, `fill`, `object-contain`, and low opacity as a decorative background.
4. Render the bilingual eyebrow, heading, and supporting copy:

```tsx
{t("Welcome", "Bienvenidos")}
{t("Flavors that feel like home", "Sabores que se sienten como en casa")}
{t(
  "Authentic Mexican cooking in the heart of Watsonville.",
  "Cocina mexicana auténtica en el corazón de Watsonville."
)}
```

5. Preserve `aria-hidden` on the decorative image and keep the heading as semantic content.

Expected result: the Hero shows no second full logo in the content panel; the new card sits between the video and the welcome/address content.

## Task 2 — Verify the preview

**Files**: No additional files.

1. Run `npx eslint src/components/sections/Hero.tsx`.
2. Run `npx tsc --noEmit`.
3. Review the page at `http://127.0.0.1:3400/` and `http://192.168.1.201:3400/`.
4. Check mobile hierarchy, EN/ES copy, contrast, reduced motion, and that the Hero and delivery links remain unchanged.

Expected result: lint, TypeScript, local HTTP, and Wi‑Fi HTTP checks pass; no push or deployment occurs.
