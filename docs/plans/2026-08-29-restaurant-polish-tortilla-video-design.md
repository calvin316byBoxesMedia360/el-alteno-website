# Restaurant Polish and Tortilla Video Design

**Date:** 2026-08-29  
**Status:** Approved — revised after first video review  
**Branch:** `codex/hero-mobile-video`

## Objective

Improve the mobile first impression without changing the established hero-video scale, make the delivery shortcuts useful without competing with the primary calls to action, and turn the handmade-tortilla card into a compact moving story.

## Non-negotiable project constraints

- Do not modify menu content or prices. `MENU-SOURCE.md` remains the only source of truth.
- The application lives in `el-alteno/`; hosting must keep `Root Directory = el-alteno`.
- Work and commits remain on `codex/hero-mobile-video`. Nothing is pushed to `master`.
- Desktop hero composition remains unchanged.
- The tortilla clip is silent and contains no generated captions, logos, faces, or full person.

## Approved design

### 1. Mobile hero clearance

Add 96 pixels of top clearance before the mobile hero video. This places the full 16:9 stage below the fixed navigation bar while preserving its current width, aspect ratio, and crop. At the desktop breakpoint the clearance returns to zero, so the immersive desktop hero is unaffected.

### 2. Navigation logo

Promote the transparent PNG currently stored as `public/images/logo/logo png` to the stable asset name `logo-v2.png`, then use it in the navigation. Keep the existing rendered height so the bar geometry and controls do not move. The transparent artwork removes the visible white box without making the logo visually dominant.

### 3. Delivery shortcuts

Convert the DoorDash and Uber Eats pills beneath the event button from decorative text to keyboard-accessible external links. Reuse the same destinations as the footer and open them safely in a new tab. The pills retain the dark translucent treatment, restrained gold border, and compact scale; a small external-link icon and visible focus state communicate behavior without introducing bright marketplace colors.

### 4. Handmade tortilla card

Use the generated clip as a full-bleed background inside the existing wide card. Preserve the current bilingual badge, heading, and description as the content layer. A dark gradient from the text side and lower edge keeps copy readable while allowing the center and right side to show the tortilla process.

The video element will be muted, looping, inline, and decorative to assistive technology. It will use metadata preloading and a static fallback/poster so the card stays presentable before playback and when reduced motion is preferred.

## Video production brief

The first two Seedance 2.0 candidates were rejected because their rustic backgrounds did not read as a real kitchen. Generate two replacement silent, six-second, 16:9, 2K review candidates with Higgsfield MiniMax H3. Each replacement must visibly establish a modest, clean, everyday home kitchen through practical details such as pale ceramic tile, an ordinary laminate counter, a compact gas stove, simple cabinets, a towel, a dish rack, and familiar utensils. Essential action remains centered so responsive `object-cover` cropping does not remove the hands or tortilla.

### Candidate A — press to comal

A stable three-quarter overhead close-up shows the pale tile backsplash, everyday counter, tortilla press, and home gas stove in one coherent working area. Hands press a corn masa ball, peel the tortilla from its liner, transfer it to a clean dark comal, and flip it once. Soft window light and an ordinary ceiling light keep the scene warm but documentary-real rather than stylized.

### Candidate B — puff and stack

A tight counter-height angle establishes a compact family kitchen through white tile, simple cabinets, a normal four-burner stove, and a sink or dish rack softly in the background. Hands place a fresh tortilla on the comal, bubbles form, it puffs gently, then it is flipped and stacked on a folded cotton towel. Shallow depth of field keeps the process tactile while retaining enough kitchen context to avoid an abstract or rustic backdrop.

### Selected direction B — commercial-plancha refinement

The user selected Candidate B's counter-height cooking view and requested one final rerender. Replace the small home comal with a broad black rectangular commercial steel plancha, approximately 80 centimeters wide, filling the lower portion of the frame. Show 10–12 corn tortillas arranged in clear rows at different stages of cooking so the scale reads immediately. The background becomes the clean, practical cookline of a well-run, mid-range Mexican restaurant: white commercial tile, stainless prep surfaces, metal shelving, hotel pans, hanging utensils, an exhaust hood, and warm pass lights. It should feel professional and hardworking without luxury styling.

Hands rotate several tortillas, flip one visibly puffed tortilla, and place it into a cloth-lined basket. Keep the selected B lens height, tactile food detail, restrained slider movement, recognizable kitchen context, centered action, and loop-friendly finish. Generate one MiniMax H3 replacement in silent 2K, 16:9, six-second format for final approval before integration.

The working action contains hands, forearms, masa, plancha or comal, and tortillas; no face or full person is needed. Branding and written graphics are absent. The selected B refinement is presented before integration.

## Visual and technical alignment

- Preserve the restaurant's existing terracotta, charcoal, cream, and muted-gold palette instead of introducing unrelated platform colors.
- Continue using Tailwind utilities and Lucide icons already present in the project.
- Keep rounded pills, soft borders, and subtle glass treatment consistent with the navigation and current hero panel.
- Do not add new libraries for these changes.
- Centralize external delivery URLs if both hero and footer can share them without expanding scope.

## Accessibility and responsive behavior

- External links receive descriptive labels, keyboard focus rings, `target="_blank"`, and `rel="noopener noreferrer"`.
- The decorative card video is `aria-hidden`, muted, and does not expose controls.
- Reduced-motion preference shows the static card fallback rather than autoplaying the clip.
- Mobile hero clearance applies below the desktop breakpoint only.
- Text contrast is verified over both video candidates before selection is finalized.

## Validation

- TypeScript check and production build succeed, aside from already documented unrelated lint findings.
- Mobile review at approximately 375 pixels confirms the navbar no longer covers the hero video.
- Desktop review confirms no hero regression.
- DoorDash and Uber Eats links match footer destinations and are keyboard operable.
- Both generated video candidates are reviewed; only the selected, optimized asset and poster are committed.
- Final local review is available at `http://127.0.0.1:3200/` and `http://192.168.1.201:3200/` before any push.
