# Events Gallery, Bar Additions & Menu Discovery Implementation Plan
> **REQUIRED SUB-SKILL:** Use superpowers:executing-plans to implement this plan task-by-task.
**Goal:** Ship an event gallery, two priced bar additions, a stronger menu slogan, and a clearer menu-category discovery flow on the El Alteño homepage.
**Architecture:** Keep the homepage as the composition root, add a focused `Gallery` section with a local photo manifest and accessible lightbox, extend `Cocktails` with typed bar cards, and use an explicit menu-explorer anchor plus a visually contained category panel. User-provided event images remain production assets under a dedicated `public/images/events-gallery/` directory and are added to the manifest only after inspection.
**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, Framer Motion, Lucide React, `next/image`.

## Context and guardrails

- Worktree: `C:\Users\no\Documents\ChatGPT\el alteno website\el-alteno-integration-test`.
- App root: `el-alteno/`.
- Branch: `codex/menu-slogan-polish`.
- Production branch is separate; do not push directly to `master`.
- Existing untracked files under `el-alteno/public/images/local_para_eventos/` are user-owned staging material. Do not stage, delete, rename, or add them to the production gallery.
- `MENU-SOURCE.md` remains the source of truth for menu data. The two new bar prices are explicitly approved in the design request and are limited to the new presentation cards.
- Preserve the current bilingual client-side `LanguageContext`, warm terracotta/mustard visual system, reduced-motion behavior, and minimum touch target standards.

## Files

### Create

- `el-alteno/public/images/events-gallery/.gitkeep` — keeps the user-import folder in Git until real photos arrive.
- `el-alteno/src/components/sections/Gallery.tsx` — bilingual photo grid and accessible lightbox.
- `el-alteno/public/images/cocktails/bar-sodas.webp` — generated soda image.
- `el-alteno/public/images/cocktails/aguas-frescas.webp` — generated aguas frescas image.

### Modify

- `el-alteno/src/app/page.tsx` — render `Gallery` after `Events` and before `Location`.
- `el-alteno/src/components/sections/Hero.tsx` — add `Gallery / Galería` CTA directly below `Book an Event / Reservar Evento`.
- `el-alteno/src/components/sections/Cocktails.tsx` — add the two priced bar cards after the existing cocktail cards.
- `el-alteno/src/components/sections/MenuSection.tsx` — improve slogan hierarchy and expose a dedicated menu-explorer anchor.
- `el-alteno/src/components/menu/MenuTabs.tsx` — add the contained carousel panel and bilingual touch interaction cue.
- `el-alteno/src/components/layout/Navbar.tsx` — optionally add `Gallery / Galería` to the existing navigation only if the final viewport review shows the section otherwise difficult to reach; the Hero CTA is mandatory, nav addition is not.

## Task 1: Prepare the photo directory

1. Create `el-alteno/public/images/events-gallery/`.
2. Add `.gitkeep` only; do not add existing `local_para_eventos` candidates.
3. After the user copies photos into this folder, inspect each image before adding it to the `galleryPhotos` manifest. Use stable descriptive names and do not infer subject matter from filenames alone.

Expected result: the user has an exact copy/paste location and the project has a tracked production-asset directory.

## Task 2: Generate and validate the two bar images

Use the built-in image generator once per asset. Keep images free of typography, menus, prices, watermarks, and invented restaurant branding beyond the explicitly requested beverage brands.

### Soda prompt

```text
Use case: product-mockup
Asset type: restaurant website bar menu card image
Primary request: photorealistic editorial still life of assorted chilled sodas for a Mexican restaurant bar
Scene/backdrop: warm dark walnut bar surface with a softly blurred, welcoming restaurant background
Subject: Coke, Diet Coke, Sprite, Dr Pepper, Pepsi cans, Mexican Coca-Cola glass bottles, and colorful Jarritos bottles, arranged naturally with condensation and a few ice accents
Style/medium: premium food-and-beverage photography, authentic product proportions, natural materials
Composition/framing: horizontal 4:3 composition, all beverages fully visible, balanced group arrangement, no empty area reserved for text
Lighting/mood: warm amber restaurant lighting with crisp highlights on condensation, appetizing and celebratory
Color palette: deep charcoal, warm terracotta, mustard gold, cola browns, colorful soda labels
Materials/textures: realistic aluminum, glass, condensation, ice, wood grain
Text (verbatim): none
Constraints: no menu text, no prices, no watermark, no extra beverages, no people, no food
Avoid: misspelled labels, duplicated cans, deformed bottles, floating objects, illegible pseudo-text, excessive clutter
```

### Aguas frescas prompt

```text
Use case: product-mockup
Asset type: restaurant website bar menu card image
Primary request: photorealistic editorial still life of three Mexican aguas frescas for a restaurant bar
Scene/backdrop: warm dark walnut bar surface with a softly blurred, welcoming restaurant background
Subject: three attractive glasses representing Jamaica, horchata, and tamarindo; ruby-red hibiscus, creamy cinnamon-speckled horchata, and rich tamarind amber, with subtle fresh garnishes appropriate to each drink
Style/medium: premium food-and-beverage photography, authentic Mexican restaurant atmosphere
Composition/framing: horizontal 4:3 composition, three glasses clearly separated and fully visible, balanced arrangement, no empty area reserved for text
Lighting/mood: warm amber restaurant lighting with soft highlights and inviting freshness
Color palette: hibiscus red, creamy ivory, tamarind amber, charcoal, terracotta, mustard gold
Materials/textures: realistic glass, condensation, ice, cinnamon detail, natural wood grain
Text (verbatim): none
Constraints: no menu text, no prices, no watermark, no people, no straws with writing, no extra beverages
Avoid: generic neon cocktails, artificial gradients, illegible pseudo-text, duplicated glasses, floating garnishes, excessive clutter
```

3. Inspect both outputs for subject accuracy, readable composition at card size, no unwanted text, and matching visual treatment.
4. Copy the selected outputs into `el-alteno/public/images/cocktails/` as the stable WebP filenames above. Preserve any generated originals outside the Git working tree unless needed for audit.

Expected result: two consistent, text-free, website-ready images are available to the bar cards.

## Task 3: Add the homepage gallery

1. In `Gallery.tsx`, define a typed local manifest such as:

```ts
type GalleryPhoto = { id: string; src: string; alt: string; };
const galleryPhotos: GalleryPhoto[] = [];
```

Keep the initial manifest empty until the user supplies and approves event photos. The section must still render its approved intro and a restrained “photos coming soon” fallback so the layout remains intentional before assets arrive.

2. Render a section with `id="gallery"` and `scroll-mt-24`, using the existing `section-padding`, `bg-background`, `bg-card`, `border-border`, `text-foreground`, `text-muted-foreground`, `text-accent`, and `font-heading` tokens.
3. Add the approved English and Spanish introduction copy without visible text overlays on images.
4. When the manifest has photos, render a responsive grid: two columns below the desktop breakpoint and three columns at desktop widths. Use `next/image`, `fill`, stable aspect ratio, `sizes`, and `object-cover`.
5. Each tile must be a keyboard-focusable button with a minimum 44×44 target. On click or Enter/Space, set the selected photo and open an overlay.
6. The lightbox must:
   - use `role="dialog"`, `aria-modal="true"`, and an accessible label;
   - close on the close button, backdrop click, and Escape;
   - prevent background scrolling while open and restore it on close;
   - render the selected image with its `alt` text for assistive technology;
   - respect `prefers-reduced-motion` through Framer Motion and/or motion-safe classes;
   - avoid changing the page scroll position when closing.
7. Do not expose captions, event labels, or visible image text; alt text remains required and should describe only what is actually visible after inspection.

Expected result: the gallery is production-ready and will populate as soon as inspected user photos are added to the manifest.

## Task 4: Add the Gallery CTA

1. In `Hero.tsx`, import the Lucide `Images` icon.
2. Add a third `motion.a` immediately after the event-booking link, with `href="#gallery"`, the same width, spacing, focus ring, touch target, reduced-motion handling, and bilingual treatment.
3. Use `Gallery / Galería` as the visible label and keep the event-booking CTA immediately above it.

Expected result: the user can see and activate the gallery link without searching the navigation.

## Task 5: Add the two bar cards

1. In `Cocktails.tsx`, define a typed `barAdditions` array containing the two image paths, bilingual names, descriptions, prices, and appropriate alt text.
2. Keep the existing three cocktail cards unchanged in content and order.
3. Render a subtle divider/label before the additions, then a responsive two-card grid below the fixed cocktail cards; stack cards on narrow viewports.
4. Reuse the existing card language: image, heading, bilingual description, then price in real HTML. Do not make the new cards open the cocktail detail modal unless a later request explicitly asks for it.
5. Use `$3.75` and `$3.50` exactly, and keep the prices visually prominent but contrast-safe in both themes.

Expected result: the bar section reads as a complete progression from signature cocktails to everyday refreshments.

## Task 6: Strengthen the Menu slogan

1. In `MenuSection.tsx`, retain the approved words and bilingual `t()` calls.
2. Replace the current small inline lockup with a two-line editorial lockup: a larger focal `Mexico / México` line and a supporting `A taste of / Sabor a` plus `seasoned in our kitchen / con sazón de la casa` line.
3. Keep the warm terracotta focal color and dark-mode variant already established in the file; confirm contrast against both theme surfaces.
4. Preserve the existing responsive grid so the right-side explanatory copy remains readable and does not collapse into an oversized slogan on small screens.

Expected result: the slogan reads as a primary part of the menu introduction rather than metadata.

## Task 7: Make the menu carousel discoverable

1. In `MenuTabs.tsx`, put the selector wrapper at a dedicated anchor such as `id="menu-explorer"` with `scroll-mt-24`.
2. Wrap the `Explore the menu` label, position indicator, interaction cue, and existing `ScrollStrip` in a contained panel with a visible surface/border treatment that is distinct from the surrounding menu header.
3. Add the bilingual cue `Swipe to browse categories / Desliza para ver categorías` in a small, readable line that is especially useful on touch screens.
4. Preserve the existing `ScrollStrip` arrows, progress rail, accessible group label, `useLayoutEffect` viewport correction, category count, and no-jump behavior.
5. In `Hero.tsx`, change the Explore Menu link from `#menu` to `#menu-explorer`.
6. Test the anchor at mobile and desktop widths with the fixed Navbar present; the first visible content after activation should be the category explorer, not only the Menu heading.

Expected result: the carousel is easy to locate after the Hero CTA and its interaction is self-explanatory.

## Task 8: Verify and inspect

Run from `el-alteno/`:

```powershell
npm run lint
npx tsc --noEmit
npm run build
```

Then review the homepage at minimum widths 375 px, 430 px, and 1440 px in both English and Spanish, and in both light and dark themes:

- Hero button order is Explore Menu, Book an Event, Gallery.
- Gallery anchor lands at the gallery section.
- Empty gallery fallback looks intentional until real photos are supplied.
- New bar cards follow the existing cocktails and display descriptions before prices.
- Menu slogan is prominent without causing a layout break.
- Explore Menu lands on the category explorer and the category strip remains horizontally usable.
- Escape/backdrop/close controls work in the gallery viewer once photos are present.
- No candidate event assets were staged accidentally.

Commit implementation in focused commits, for example:

```text
feat: add event gallery and gallery CTA
feat: add bar refreshments and menu discovery polish
```

Do not push directly to `master`; hand off the branch for PR review and deployment.

