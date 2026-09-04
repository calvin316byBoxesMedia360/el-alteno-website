# Gallery Second Page Design

**Status:** Approved by the user on 2026-09-03.

## Goal

Keep the homepage visually focused by showing only a semi-hidden event-gallery teaser, while moving the complete media experience to a dedicated `/gallery` page.

## Approved experience

- The homepage keeps `GalleryPreview` as the only gallery content visible in the main scroll.
- The preview is visually limited: a compact bento peek with a fixed maximum height, overflow clipping, and a bottom fade that suggests more images without exposing the entire collection.
- The preview surface, its thumbnails, and its primary action are selectable.
- Selecting the preview or its CTA navigates to `/gallery`.
- `/gallery` renders the existing full event gallery with all 14 photos, both videos, the editorial grid, and lightbox behavior.
- The Hero `Gallery / Galería` button navigates directly to `/gallery`.
- The home page no longer renders the full `Gallery` section, avoiding duplicate media and a long, heavy homepage.
- The dedicated page includes a bilingual back-to-home action and preserves the existing navigation/footer shell.

## Visual direction

The homepage teaser uses the established warm El Alteño palette, rounded dark card, soft shadows, and a gradient veil over the lower edge. No captions are placed over the photos; only a clear bilingual action and accessible labels communicate the interaction.

The dedicated page opens with a premium editorial masthead before the media: a restrained eyebrow, a large bilingual title, and a warm two-sentence introduction that frames the photos as memories and event details rather than a generic image dump. The masthead uses generous spacing, refined typography, a subtle decorative glow, and a back-to-home affordance so visitors understand that they entered a complete collection.

Approved introduction copy:

- English eyebrow: `The El Alteño experience`
- English title: `Moments made to be remembered`
- English supporting text: `From the first detail to the last toast, every celebration at El Alteño is prepared with warmth, flavor, and a table made for gathering.`
- Spanish eyebrow: `La experiencia El Alteño`
- Spanish title: `Momentos hechos para recordar`
- Spanish supporting text: `Desde el primer detalle hasta el último brindis, cada celebración en El Alteño se prepara con calidez, sabor y una mesa hecha para reunirnos.`

## Routing and component approach

- Create `src/app/gallery/page.tsx` as the dedicated route.
- Move the full-gallery rendering responsibility to the route by rendering the existing `Gallery` component there.
- Keep `Gallery` as a reusable client section with its existing `id="gallery"`, media manifest, video treatment, and lightbox.
- Update `GalleryPreview` to use a clipped teaser layout and `next/link` navigation to `/gallery`; keep its lightbox only if the teaser remains useful as a direct peek, otherwise the primary interaction opens the page.
- Update the Hero CTA to use a route link rather than a same-page hash.

## Accessibility and performance

- Use real links for route navigation so keyboard users, screen readers, and browser history work naturally.
- Keep preview controls at least 44px and preserve visible focus states.
- Use `preload="metadata"` for teaser video and do not duplicate the long video on the homepage.
- Preserve bilingual labels and reduced-motion behavior.

## Constraints

- Do not alter, move, or duplicate the original event assets.
- Do not change the existing full-gallery visual treatment beyond page context and navigation.
- Do not add a new data source, upload flow, or client-side global gallery state.
