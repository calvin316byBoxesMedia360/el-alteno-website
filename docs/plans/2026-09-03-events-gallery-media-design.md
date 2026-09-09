# Event Gallery Media Presentation Design

**Status:** Approved by the user on 2026-09-03.

## Goal

Turn the user-provided event photos and videos into a polished, bilingual gallery for El Alteño that lets the photography carry the story while still feeling intentional, fast, and easy to browse.

## Approved presentation

- Keep all user-provided originals in `el-alteno/public/images/events-gallery/` as the source archive.
- Create optimized WebP derivatives for the 14 photos and use those derivatives in the page so the deployed gallery is lighter without changing the originals.
- Lead the gallery with the 27-second video as a featured, silent, muted, inline loop that is responsive and keyboard/focus accessible.
- Present the 2:05 video as a secondary media card with native playback controls and metadata loading on demand.
- Arrange the photos in an editorial mosaic/grid with a warm dark-card treatment, soft depth, generous rounding, restrained hover motion, and an image lightbox.
- Keep visible copy minimal: the gallery intro remains the main editorial message; individual media use accessible English/Spanish alternative labels rather than permanent captions over the photos.
- Extend the lightbox so the featured short video can be opened into a larger controlled preview, while photo tiles continue to open as full-size image previews.
- Respect reduced-motion preferences for reveal and hover animations.

## Media inventory

The supplied folder contains 14 JPG photos and two MP4 videos:

- Five photos from June 2023 centered on candy/dessert tables, table settings, and the patio.
- Five photos from October 2023 showing formal table layouts, room views, dessert styling, and a decorated backdrop.
- Four photos from June 2025 showing a colorful 30th-birthday setup, papel picado, vibrant table settings, and the patio.
- `VID_20231203_134004.mp4` — approximately 27 seconds; selected as the featured video.
- `VID_20231021_140635.mp4` — approximately 2 minutes 5 seconds; selected as the secondary video.

Image descriptions will describe what is visibly present (tables, decor, desserts, patio, or room styling) and will not infer an event type from a filename alone.

## Component approach

`src/components/sections/Gallery.tsx` will use a typed media manifest for the optimized photos and videos. The component will render three layers: the featured short-video panel, the photo mosaic, and the secondary long-video panel. A single selected-media state will drive the accessible modal preview for images and the featured video.

No database or upload UI is needed for this iteration. Future event assets can be added by placing originals in the same folder, creating a WebP derivative, and adding one manifest entry.

## Constraints and verification

- Do not modify or delete the supplied originals.
- Keep the existing bilingual `useLanguage` behavior and `#gallery` navigation intact.
- Verify optimized image dimensions and file sizes, type-check the project, run focused lint on the modified component, and manually inspect the gallery at `http://127.0.0.1:3400/`.
- The videos will be referenced from the supplied MP4 files; their original size should be reported after integration because a transcoder is not currently available in the workspace.
