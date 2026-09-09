# Gallery Second Page Implementation Plan
> **REQUIRED SUB-SKILL:** Use superpowers:executing-plans to implement this plan task-by-task.
**Goal:** Replace the full homepage gallery with a semi-hidden visual teaser and move the complete event-gallery experience to a premium `/gallery` route.
**Architecture:** Keep the existing `Gallery` component as the full media experience, add a dedicated route shell that renders it, and simplify `GalleryPreview` into a clipped, route-driven teaser. The homepage renders only `GalleryPreview`; real links from the Hero and teaser navigate to `/gallery`.
**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, Framer Motion, `next/image`, `next/link`, existing `useLanguage` and design tokens.

## Task 1: Convert the homepage preview into a semi-hidden route teaser

**Files:**
- Modify: `el-alteno/src/components/sections/GalleryPreview.tsx`

**Steps:**

1. Remove the preview-only lightbox state, effect, close-button ref, and modal markup; the selected teaser now navigates to the dedicated page.
2. Keep the six-entry preview manifest and existing optimized event assets.
3. Wrap each thumbnail in a keyboard-accessible `next/link` to `/gallery`.
4. Place the bento grid inside a clipped container with a responsive max height, `overflow-hidden`, and a bottom background fade.
5. Add a centered bilingual route CTA over the lower fade; keep captions out of the cards.
6. Preserve the premium palette, rounded surfaces, shadows, play affordance, and reduced-motion-safe reveal/hover behavior.

**Expected result:** The homepage shows only a polished glimpse; the fade and CTA make it clear that more media is available without rendering the full gallery.

## Task 2: Create the dedicated `/gallery` route

**Files:**
- Create: `el-alteno/src/app/gallery/page.tsx`

**Steps:**

1. Import and render the existing `Navbar`, `Gallery`, and `Footer` components.
2. Wrap the page in a full-height background/main element consistent with the existing site shell.
3. Do not duplicate media manifests or lightbox logic in the route file.

**Expected result:** `http://127.0.0.1:3400/gallery` renders the complete gallery as a standalone page.

## Task 3: Give the full gallery a premium editorial introduction

**Files:**
- Modify: `el-alteno/src/components/sections/Gallery.tsx`

**Steps:**

1. Add a bilingual back-to-home link with a visible focus ring before the gallery masthead.
2. Replace the generic heading copy with the approved editorial introduction:
   - English: `The El Alteño experience` / `Moments made to be remembered` / `From the first detail to the last toast, every celebration at El Alteño is prepared with warmth, flavor, and a table made for gathering.`
   - Spanish: `La experiencia El Alteño` / `Momentos hechos para recordar` / `Desde el primer detalle hasta el último brindis, cada celebración en El Alteño se prepara con calidez, sabor y una mesa hecha para reunirnos.`
3. Increase the masthead breathing room and type hierarchy so the introduction feels like an editorial opening rather than a utility label.
4. Preserve the existing video treatment, photo mosaic, lightbox, bilingual labels, and reduced-motion handling below the masthead.

**Expected result:** The dedicated page opens with a dignified, brand-aligned introduction before visitors reach the media collection.

## Task 4: Update homepage and Hero navigation

**Files:**
- Modify: `el-alteno/src/app/page.tsx`
- Modify: `el-alteno/src/components/sections/Hero.tsx`

**Steps:**

1. Remove the `Gallery` import and full `<Gallery />` render from the homepage.
2. Keep `<GalleryPreview />` after `<Events />` so the teaser remains in the natural event-story position.
3. Change the Hero Gallery button href to `/gallery` for direct access to the full collection.
4. Keep the preview CTA and every preview tile pointed to `/gallery`.

**Expected result:** The homepage stays focused and the full-gallery route has one authoritative rendering location.

## Task 5: Verify the route split and presentation

**Files:**
- Test: `el-alteno/src/app/gallery/page.tsx`
- Test: `el-alteno/src/components/sections/GalleryPreview.tsx`
- Test: `el-alteno/src/components/sections/Gallery.tsx`
- Test: `el-alteno/src/components/sections/Hero.tsx`

**Steps:**

1. Run `npx tsc --noEmit` from `el-alteno` and expect success.
2. Run focused ESLint against all modified/created files and expect success.
3. Run `git diff --check` from `el-alteno-integration-test` and expect no whitespace errors.
4. Fetch `/` and `/gallery` from `http://127.0.0.1:3400` and confirm both return 200.
5. Confirm homepage HTML contains `gallery-preview` but not the full gallery’s featured video markup; confirm `/gallery` contains `gallery`, all photo/video paths, and the approved intro copy.
6. Manually test Hero navigation, teaser tile navigation, preview CTA, back-to-home link, language toggle, lightbox, Escape close, and responsive clipping.

**Expected result:** The home route is lighter and visually restrained, while `/gallery` is a complete, premium, bilingual event-gallery experience.
