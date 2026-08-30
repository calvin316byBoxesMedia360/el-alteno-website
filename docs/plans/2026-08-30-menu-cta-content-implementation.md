# Menu Content and Phone CTA Implementation Plan
> **REQUIRED SUB-SKILL:** Use superpowers:executing-plans to implement this plan task-by-task.
**Goal:** Correct approved menu content, improve the Private Events phone CTA with an elegant glass treatment, and prepare a non-destructive Carne Asada photo correction.
**Architecture:** Keep menu facts in `MENU-SOURCE.md` and mirror them in `src/data/menu.ts`. Refactor the existing phone row into a semantic full-width anchor CTA styled with project-local Tailwind utilities. Produce a versioned image edit and update the menu record only after visual inspection.
**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS, Lucide React, built-in image generation for the raster edit.

## Task 1 — Update the menu source of truth

**Files:** Modify `MENU-SOURCE.md`.

1. Replace the `Mariscada Caldo` em dash with the confirmed simple ingredient description.
2. Add beans to the `Huachinango a la Plancha` source description.
3. Preserve the existing Tacos Dorados `chicken tinga` wording and Carne Asada description.
4. Review the diff for accidental price or unrelated menu changes.

## Task 2 — Mirror the approved content in application data

**Files:** Modify `el-alteno/src/data/menu.ts`.

1. Update `mariscada-caldo` in English and Spanish.
2. Update `huachinango-plancha` in English and Spanish to include beans.
3. Leave `tacos-dorados` and `carne-asada` descriptions unchanged.
4. Run focused search to confirm source and app records match.

## Task 3 — Refactor the phone CTA

**Files:** Modify `el-alteno/src/components/sections/Events.tsx`.

1. Keep the existing phone number and `tel:8317689876` target.
2. Replace the low-emphasis inline row with a semantic anchor containing the icon, bilingual action label, number, and mobile hint.
3. Style the anchor with a dark translucent background, `backdrop-blur`, subtle mustard/terracotta border, readable foreground, hover/focus states, and a minimum 44px touch target.
4. Keep the treatment visually quieter than the primary form submit button.
5. Run focused ESLint and TypeScript checks.

## Task 4 — Create and inspect the Carne Asada image edit

**Files:** Input `el-alteno/public/images/dishes/carne-asada.webp`; new versioned output in the same folder.

1. Load the existing image before editing.
2. Use a precise object-removal prompt: remove only the adjacent sope/tostada; preserve all other dish elements, plate, table, lighting, perspective, and texture.
3. Inspect the output for edge artifacts and accidental changes.
4. Only after approval-quality inspection, update the image path in `menu.ts` to the versioned asset.

## Task 5 — Validate and record

**Files:** No new application files unless the image output is accepted.

1. Run `npx eslint`, `npx tsc --noEmit`, and `npm run build` from `el-alteno`.
2. Review the local site in desktop and mobile widths.
3. Confirm keyboard focus and phone tap behavior.
4. Update project memory and commit only intended files; leave `master` untouched.
