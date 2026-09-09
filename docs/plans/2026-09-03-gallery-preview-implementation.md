# Gallery Preview Implementation Plan
> **REQUIRED SUB-SKILL:** Use superpowers:executing-plans to implement this plan task-by-task.
**Goal:** Add a premium visual preview of event media before the full gallery and connect the Hero Gallery CTA to that preview.
**Architecture:** Create a self-contained `GalleryPreview` client section with a small typed manifest, a responsive bento layout, muted short-video thumbnail, and lightweight media lightbox. Insert it between `Events` and `Gallery`; leave the full `Gallery` media manifest and lightbox behavior intact.
**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, Framer Motion, `next/image`, native HTML5 video, existing `useLanguage` and design tokens.

## Task 1: Create the preview component shell and manifest

**Files:**
- Create: `el-alteno/src/components/sections/GalleryPreview.tsx`

**Steps:**

1. Add a client component using `useLanguage`, `useReducedMotion`, `useEffect`, `useRef`, and `useState`.
2. Define a typed preview manifest with six entries: one hero photo, four supporting photos, and the 27-second gallery video.
3. Use the existing committed WebP paths under `/images/events-gallery/` and the existing short MP4 path; do not copy or alter assets.
4. Give each entry bilingual accessible labels while keeping visible captions out of the cards.

**Expected result:** The preview has one small, maintainable source of truth and uses only already-approved gallery media.

## Task 2: Render the premium bento preview

**Files:**
- Modify: `el-alteno/src/components/sections/GalleryPreview.tsx`

**Steps:**

1. Add section anchor `id="gallery-preview"` with scroll offset and the same warm background treatment used by the gallery.
2. Add a short bilingual intro and a visible `View full gallery / Ver galería completa` link targeting `#gallery`.
3. Render the hero image in a larger bento tile and supporting images in smaller tiles; include the short video as a visual motion tile with autoplay, muted, loop, inline playback, and metadata preload.
4. Use rounded 2xl/3xl cards, dark surfaces, mustard/terracotta borders, soft shadows, gradient overlays, and touch-safe button sizing.
5. Use Framer Motion for subtle reveal/hover motion and disable decorative motion when `useReducedMotion()` is active.

**Expected result:** Scrolling visitors see an editorial preview that feels intentional on desktop and stays compact on mobile.

## Task 3: Add preview thumbnail lightbox behavior

**Files:**
- Modify: `el-alteno/src/components/sections/GalleryPreview.tsx`

**Steps:**

1. Track the selected preview media with a typed union state.
2. Make every thumbnail a keyboard-accessible button that opens its image or the short video in a modal.
3. Add Escape-to-close, backdrop close, focus on the close button, body-scroll locking, bilingual dialog labels, and reduced-motion-safe transitions.
4. Render video previews with native controls in the modal and image previews with `next/image`.

**Expected result:** The preview is useful as a direct visual teaser without forcing visitors to jump to the full gallery.

## Task 4: Connect the page flow and Hero CTA

**Files:**
- Modify: `el-alteno/src/app/page.tsx`
- Modify: `el-alteno/src/components/sections/Hero.tsx`

**Steps:**

1. Import `GalleryPreview` in `page.tsx`.
2. Render `<GalleryPreview />` immediately after `<Events />` and before `<Gallery />`.
3. Change the Hero Gallery button href from `#gallery` to `#gallery-preview`.
4. Keep the preview CTA pointed at the existing `#gallery` anchor.

**Expected result:** The intended sequence is Hero Gallery CTA → premium preview → full gallery CTA → complete gallery.

## Task 5: Verify the visual and technical integration

**Files:**
- Test: `el-alteno/src/components/sections/GalleryPreview.tsx`
- Test: `el-alteno/src/app/page.tsx`
- Test: `el-alteno/src/components/sections/Hero.tsx`

**Steps:**

1. Run `npx tsc --noEmit` from `el-alteno` and expect success.
2. Run focused ESLint against `src/components/sections/GalleryPreview.tsx`, `src/app/page.tsx`, and `src/components/sections/Hero.tsx` and expect success.
3. Run `git diff --check` from `el-alteno-integration-test` and expect no whitespace errors.
4. Open `http://127.0.0.1:3400/` and test the Hero Gallery button, preview thumbnail lightbox, full-gallery CTA, language toggle, Escape close, and responsive layout.
5. Confirm the existing full gallery and event media remain unchanged apart from the new navigation target.

**Expected result:** The preview is type-safe, lint-clean, locally navigable, and visually cohesive with the already approved gallery.
