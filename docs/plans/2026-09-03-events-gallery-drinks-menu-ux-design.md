# Events Gallery, Bar Additions & Menu Discovery Design

> **Status:** Approved by the user on 2026-09-03.
> **Target:** `el-alteno-integration-test`, branch `codex/menu-slogan-polish`.

## Goal

Add an event-photo gallery to the homepage, extend the bar section with sodas and aguas frescas, make the menu slogan more prominent, and make the menu category carousel easier to find and use after selecting “Explore Menu”.

## Approved design

### 1. Event gallery

- Production photos will be placed in:
  `el-alteno/public/images/events-gallery/`
- The absolute workspace location is:
  `C:\Users\no\Documents\ChatGPT\el alteno website\el-alteno-integration-test\el-alteno\public\images\events-gallery\`
- The gallery will be a homepage section after `Private Events` and before `Location`.
- The Hero will gain a `Gallery / Galería` button immediately below `Book an Event / Reservar Evento`, linking to the gallery anchor.
- The section will use a bilingual introductory paragraph and a clean photo-first presentation with no visible captions or labels over the images.
- Layout: two columns on mobile and three columns on desktop.
- Each photo will open in an accessible enlarged viewer with a close action and reduced-motion support.
- Gallery assets are production photos only; staging candidates under `local_para_eventos` remain separate.

Approved introduction copy:

> Every celebration has a story. From joyful tables to unforgettable milestones, discover the moments our guests have shared with us at El Alteño.
>
> Cada celebración tiene una historia. Descubre los momentos que nuestros invitados han compartido con nosotros: mesas llenas de alegría y recuerdos inolvidables en El Alteño.

### 2. Additional bar cards

The new cards will appear directly below the three existing cocktail cards and before the closing bar note.

#### Sodas / Refrescos

- Image: an editorial, photorealistic still life of Coke, Diet Coke, Sprite, Dr Pepper, Pepsi, Mexican Coke glass bottles, and Jarritos served cold.
- Description: `Classic canned favorites and Mexican bottled sodas, served ice-cold.`
- Spanish: `Favoritas de siempre en lata y refrescos mexicanos en botella, servidos bien fríos.`
- Price: `$3.75`

#### Fresh Waters / Aguas Frescas

- Image: an editorial, photorealistic still life representing jamaica, horchata, and tamarindo in attractive glasses.
- Description: `Refreshing aguas frescas made for the table: Jamaica, horchata, and tamarindo.`
- Spanish: `Aguas frescas refrescantes para acompañar la mesa: jamaica, horchata y tamarindo.`
- Price: `$3.50`

Both generated images will contain no overlaid text or prices. Names, descriptions, and prices will be real HTML content below each image for responsive layout and accessibility.

### 3. Menu slogan hierarchy

The existing `A taste of Mexico, seasoned in our kitchen` line will become a more intentional editorial lockup within the Menu header:

- Increase its visual scale and line-height proportionally.
- Keep `Mexico / México` as the typographic focal point.
- Give the supporting phrase enough contrast and spacing to read as a core message rather than metadata.
- Preserve the bilingual inline toggle behavior and the approved warm terracotta/light-theme contrast treatment.

### 4. Menu carousel discovery

- The Hero `Explore Menu / Explorar Menú` link will target a dedicated anchor at the menu category explorer, not only the top of the Menu section.
- The carousel will receive stronger visual hierarchy through a contained panel treatment and clearer separation from the Menu header.
- Existing category position, arrows, progress rail, horizontal scrolling, and scroll-position preservation will remain intact.
- A short bilingual cue will explain the interaction on touch devices: `Swipe to browse categories / Desliza para ver categorías`.
- The standalone `/menu` QR experience stays focused on the menu and does not receive the homepage gallery.

## Non-goals

- No visible text overlays or category labels on gallery photos.
- No automatic gallery carousel.
- No gallery content added to the QR menu route.
- No changes to menu data or prices beyond the two explicitly approved bar additions.
- No addition of unapproved event-image candidates to production UI.

## Acceptance criteria

- The event image folder exists at the approved path and is ready for user-provided images.
- Gallery button appears directly below the event-booking button and scrolls to the gallery section.
- Gallery renders responsively, opens images in an accessible viewer, and supports both locales.
- Sodas and aguas frescas appear after the existing cocktail cards with the approved descriptions and prices.
- The two new raster assets are saved in the project and referenced by the UI.
- Menu slogan is visibly more prominent without disrupting the existing bilingual header layout.
- “Explore Menu” lands on the category carousel, whose interaction is visibly self-explanatory on mobile and desktop.
- `npm run build`, TypeScript, and focused lint checks pass.

