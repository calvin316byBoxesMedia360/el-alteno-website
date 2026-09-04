# Gallery Preview Design

**Status:** Approved by the user on 2026-09-03.

## Goal

Give visitors a premium visual preview of the event gallery before asking them to enter the complete collection.

## Approved experience

- Add a compact preview section between `Events` and the full `Gallery` section.
- Use a bento-style arrangement of five or six media thumbnails, with one larger hero thumbnail and smaller supporting tiles.
- Include one short-video tile with a restrained play affordance so visitors understand that the collection includes motion.
- Keep visible copy minimal: a short bilingual intro is enough; the photos remain the primary communication.
- Let each thumbnail open the existing gallery lightbox so the preview is useful even before the visitor chooses the full gallery CTA.
- Add a clear bilingual `View full gallery / Ver galería completa` action that scrolls to the complete gallery section.
- Change the Hero `Gallery / Galería` button to target the preview anchor rather than skipping directly to the full collection.
- On mobile, preserve the visual hierarchy in a compact two-column bento layout with touch-friendly tiles; the preview should not become a heavy horizontal carousel.

## Visual direction

The preview will reuse the existing El Alteño gallery visual language: warm terracotta and mustard accents, dark card surfaces, soft depth, large rounded corners, subtle gradients, and restrained hover/reveal motion. There will be no persistent text captions over the photos; accessible labels remain available to screen readers.

## Component approach

Create `src/components/sections/GalleryPreview.tsx` as a client component. It will reuse the same optimized image/video asset paths as `Gallery.tsx`, but keep its manifest intentionally small and local to the preview. The preview will accept an `onOpenMedia`-style interaction through its own lightweight lightbox state, avoiding a cross-section state dependency. The full gallery component remains unchanged except for any shared anchor/label coordination needed by the CTA.

## Navigation and accessibility

- Preview section anchor: `gallery-preview`.
- Full collection anchor: existing `gallery`.
- Hero Gallery button: `#gallery-preview`.
- Full-gallery CTA: `#gallery`.
- Thumbnail buttons have bilingual accessible labels, visible keyboard focus rings, and touch targets of at least 44px.
- Preview video is muted, inline, and non-blocking; reduced-motion settings disable decorative reveal/hover motion.

## Constraints

- Reuse committed WebP derivatives and Git LFS-backed event videos; do not duplicate or modify user originals.
- Do not add a new upload system or database model.
- Keep the section performant by loading only the small preview set and using metadata for video.
