# Bar Mini Gallery Implementation Plan
> **REQUIRED SUB-SKILL:** Use superpowers:executing-plans to implement this plan task-by-task.
**Goal:** Add the six supplied cocktail photos as a premium mini gallery inside the dedicated `/gallery` page.
**Architecture:** Generate optimized WebP derivatives from the originals in `galeria2`, add a separate typed bar-photo manifest to `Gallery.tsx`, and render a dedicated mosaic that reuses the component’s existing lightbox state. The homepage preview and event-photo collection remain unchanged.
**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, Framer Motion, `next/image`, bundled Python/Pillow for one-time WebP derivatives.

## Task 1: Verify the supplied bar-photo source set

**Files:**
- Read: `el-alteno/public/images/events-gallery/galeria2/image29.jpeg`
- Read: `el-alteno/public/images/events-gallery/galeria2/image31.jpeg`
- Read: `el-alteno/public/images/events-gallery/galeria2/image33.jpeg`
- Read: `el-alteno/public/images/events-gallery/galeria2/image34.jpeg`
- Read: `el-alteno/public/images/events-gallery/galeria2/image36.jpeg`
- Read: `el-alteno/public/images/events-gallery/galeria2/image37.jpeg`

**Steps:**

1. Confirm all six files exist.
2. Preserve the JPEG originals and do not rename or overwrite them.
3. Use only what is visibly present when writing alt text: cocktail glass, garnish, chile-salt rim, citrus, fruit, and bar background.

**Expected result:** The exact six-photo source set is confirmed and ready for derivative generation.

## Task 2: Generate optimized WebP derivatives

**Files:**
- Create: `el-alteno/public/images/events-gallery/galeria2/image29.webp`
- Create: `el-alteno/public/images/events-gallery/galeria2/image31.webp`
- Create: `el-alteno/public/images/events-gallery/galeria2/image33.webp`
- Create: `el-alteno/public/images/events-gallery/galeria2/image34.webp`
- Create: `el-alteno/public/images/events-gallery/galeria2/image36.webp`
- Create: `el-alteno/public/images/events-gallery/galeria2/image37.webp`

**Steps:**

1. Use the bundled Pillow runtime with EXIF-aware orientation correction.
2. Resize each image to a maximum 1800px long edge while preserving the aspect ratio.
3. Encode WebP at quality 82 and verify every derivative opens.
4. Confirm each derivative is smaller than its source JPEG.

**Expected result:** The new mini gallery uses light web assets while the original JPEGs remain available as source files.

## Task 3: Add the bar mini-gallery manifest and rendering

**Files:**
- Modify: `el-alteno/src/components/sections/Gallery.tsx`

**Steps:**

1. Add a typed `barGalleryPhotos` manifest using the six WebP derivatives.
2. Add bilingual alt text that describes only visible cocktail details and bar context.
3. Add a `barPhotoLayout` array with one feature tile and five supporting tiles.
4. Render the mini gallery after the main event-photo grid and before the existing long room video.
5. Add the bilingual eyebrow `From the Bar / Desde la barra` and headline `A toast to the moments shared at El Alteño. / Un brindis por los momentos compartidos en El Alteño.`
6. Reuse `selectedMedia` and `setSelectedMedia` so the existing lightbox opens all six new photos without duplicated modal logic.
7. Preserve the homepage preview, event gallery order, video behavior, and reduced-motion handling.

**Expected result:** `/gallery` contains a visually distinct cocktail mini gallery integrated into the same premium media experience.

## Task 4: Verify the new mini gallery

**Files:**
- Test: `el-alteno/src/components/sections/Gallery.tsx`
- Test: `el-alteno/public/images/events-gallery/galeria2/*.webp`

**Steps:**

1. Run `npx tsc --noEmit` from `el-alteno` and expect success.
2. Run focused ESLint against `src/components/sections/Gallery.tsx` and expect success.
3. Run `git diff --check` from `el-alteno-integration-test` and expect no whitespace errors.
4. Fetch `http://127.0.0.1:3400/gallery` and confirm it returns 200 and includes all six WebP paths plus the English intro copy.
5. Confirm the six WebP URLs return `image/webp` and the JPEG originals remain untouched.
6. Manually open `/gallery`, inspect the mini-gallery composition, toggle Spanish, and open at least one new photo in the lightbox.

**Expected result:** The new bar mini gallery is type-safe, lint-clean, locally served, bilingual, and visually connected to the full gallery.
