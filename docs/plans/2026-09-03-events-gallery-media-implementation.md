# Event Gallery Media Presentation Implementation Plan
> **REQUIRED SUB-SKILL:** Use superpowers:executing-plans to implement this plan task-by-task.
**Goal:** Integrate the supplied event photos and videos into a premium, bilingual gallery while keeping the originals safe and the browser experience responsive.
**Architecture:** Keep a typed media manifest in `Gallery.tsx`, use WebP derivatives for the photo grid, and render the two supplied videos in separate featured and secondary cards. Reuse the existing `#gallery` section and Framer Motion lightbox, extending its selected-media state to support the short video.
**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, Framer Motion, `next/image`, native HTML5 video, bundled Python/Pillow for one-time WebP derivatives.

## Task 1: Preserve and inventory the supplied media

**Files:**
- Read: `el-alteno/public/images/events-gallery/IMG_*.jpg`
- Read: `el-alteno/public/images/events-gallery/VID_*.mp4`
- Modify: none

**Steps:**

1. Confirm all 14 JPGs and both MP4s exist in the approved folder.
2. Keep filenames and originals unchanged; do not move, crop, or overwrite them.
3. Record dimensions and byte sizes so the final handoff can identify any remaining heavy assets.

**Expected result:** The source archive remains intact and the implementation has a verified list of 16 user-provided files.

## Task 2: Generate optimized photo derivatives

**Files:**
- Create: `el-alteno/public/images/events-gallery/IMG_20230610_135645.webp`
- Create: `el-alteno/public/images/events-gallery/IMG_20230610_135652.webp`
- Create: `el-alteno/public/images/events-gallery/IMG_20230610_135657.webp`
- Create: `el-alteno/public/images/events-gallery/IMG_20230610_135659.webp`
- Create: `el-alteno/public/images/events-gallery/IMG_20230610_135704.webp`
- Create: `el-alteno/public/images/events-gallery/IMG_20231021_140858.webp`
- Create: `el-alteno/public/images/events-gallery/IMG_20231021_140913.webp`
- Create: `el-alteno/public/images/events-gallery/IMG_20231021_140937.webp`
- Create: `el-alteno/public/images/events-gallery/IMG_20231021_141002.webp`
- Create: `el-alteno/public/images/events-gallery/IMG_20231021_141019.webp`
- Create: `el-alteno/public/images/events-gallery/IMG_20250627_133454.webp`
- Create: `el-alteno/public/images/events-gallery/IMG_20250627_133528.webp`
- Create: `el-alteno/public/images/events-gallery/IMG_20250627_133627.webp`
- Create: `el-alteno/public/images/events-gallery/IMG_20250627_133825.webp`

**Steps:**

1. Run the bundled Python/Pillow runtime with EXIF-aware orientation correction.
2. Resize each photo to a maximum long edge of 1800px while preserving aspect ratio.
3. Encode as WebP at quality 82 and keep the JPG originals untouched.
4. Verify every derivative opens successfully, preserves the intended orientation, and is materially smaller than its JPG source.

**Expected result:** The page can use WebP assets while the original uploads remain available for future editing or reprocessing.

## Task 3: Replace the empty gallery manifest with the approved media manifest

**Files:**
- Modify: `el-alteno/src/components/sections/Gallery.tsx`

**Steps:**

1. Replace the empty `galleryPhotos` array with typed entries for the 14 WebP derivatives.
2. Use descriptions based only on visible subjects: decorated tables, dessert/candy displays, patio dining, room styling, balloons, and papel picado.
3. Add typed entries for `VID_20231203_134004.mp4` (featured short video) and `VID_20231021_140635.mp4` (secondary long video).
4. Keep English and Spanish labels in the same manifest entry so the existing `t()` helper can select the language at render time.

**Expected result:** The gallery has one source of truth for all display media and no longer renders the empty-state placeholder.

## Task 4: Build the premium gallery composition

**Files:**
- Modify: `el-alteno/src/components/sections/Gallery.tsx`

**Steps:**

1. Render the 27-second video first as a responsive featured panel with `autoPlay`, `muted`, `loop`, and `playsInline`.
2. Render the 14 photos in the existing responsive grid, adding editorial span/aspect variants so the layout feels intentionally composed on desktop while remaining a clean two-column browse on mobile.
3. Render the 2:05 video after the photo grid as a secondary card with `controls`, `preload="metadata"`, and `playsInline`.
4. Preserve the no-permanent-caption direction; use subtle gradients, icon affordances, borders, and spacing rather than overlay paragraphs.
5. Keep reveal/hover transforms disabled or reduced when `useReducedMotion()` requests it.

**Expected result:** Visitors immediately see a strong event moment, can scan the photo story naturally, and can intentionally play the longer walkthrough.

## Task 5: Extend the lightbox for accessible media previews

**Files:**
- Modify: `el-alteno/src/components/sections/Gallery.tsx`

**Steps:**

1. Rename the selected state from photo-only to a `GalleryMedia` union.
2. Keep image tiles as buttons that open their image in the existing modal.
3. Make the featured short-video panel keyboard and pointer activatable and open it in the modal with native controls.
4. Keep Escape-to-close, backdrop close, focus on the close button, body scroll locking, and reduced-motion transitions.
5. Add bilingual dialog labels and media labels for screen readers.

**Expected result:** The presentation remains visually minimal but fully navigable with keyboard, touch, and assistive technology.

## Task 6: Verify locally and review the final diff

**Files:**
- Test: `el-alteno/src/components/sections/Gallery.tsx`
- Test: `el-alteno/public/images/events-gallery/*.webp`

**Steps:**

1. Run `npx tsc --noEmit` from `el-alteno` and expect success.
2. Run focused ESLint against `src/components/sections/Gallery.tsx` and expect success.
3. Run `git diff --check` from `el-alteno-integration-test` and expect no whitespace errors.
4. Open `http://127.0.0.1:3400/`, activate the Hero Gallery button, and inspect the gallery in English and Spanish.
5. Check mobile and desktop widths, the featured video behavior, the long-video controls, image lightbox, Escape close, and reduced-motion-safe behavior.
6. Report the two original MP4 sizes in the handoff because no local video transcoder is currently available; do not silently discard or overwrite them.

**Expected result:** The gallery is type-safe, lint-clean in its touched component, visually verified in the running local site, and ready for review/deployment with the asset-size caveat documented.
