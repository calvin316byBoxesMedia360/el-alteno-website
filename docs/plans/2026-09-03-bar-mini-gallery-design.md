# Bar Mini Gallery Design

**Status:** Approved by the user on 2026-09-03.

## Goal

Add the six newly supplied cocktail photos as a distinct mini gallery inside the dedicated `/gallery` experience, without mixing bar imagery into the event-decoration story or the homepage preview.

## Approved presentation

- Add a secondary section inside `Gallery` after the main event photo collection and before the long room video.
- Use the bilingual eyebrow `From the Bar / Desde la barra` and the approved editorial line:
  - English: `A toast to the moments shared at El Alteño.`
  - Spanish: `Un brindis por los momentos compartidos en El Alteño.`
- Show the six cocktail photos in their own responsive editorial mosaic, with one larger feature tile and five supporting tiles.
- Keep visible captions off the photos; descriptive bilingual alt text remains for accessibility.
- Reuse the existing gallery lightbox so the mini gallery feels like one coherent collection.
- Keep the mini gallery out of the homepage preview to preserve the homepage’s event-focused teaser and keep the route lightweight.

## Media handling

- Source folder: `el-alteno/public/images/events-gallery/galeria2/`.
- Preserve all six original JPEG files unchanged.
- Generate EXIF-corrected WebP derivatives for the page, resized to a maximum 1800px long edge and encoded for web delivery.
- Use neutral, visible-subject descriptions such as cocktail, citrus garnish, chile-salt rim, and back bar; do not infer cocktail names from filenames.

## Component approach

Extend `src/components/sections/Gallery.tsx` with a separate typed `barGalleryPhotos` manifest and `barPhotoLayout`. The mini gallery uses the same selected-media state and modal already used by the event gallery, avoiding a second lightbox implementation or a new global state layer.

## Constraints and verification

- Do not change the existing event gallery order or remove any already approved event media.
- Do not modify or delete the six JPEG originals.
- Verify every WebP derivative opens, the six paths render under `/gallery`, the lightbox opens the new photos, and English/Spanish copy is present.
