# Restaurant Polish and Tortilla Video Design

**Date:** 2026-08-29  
**Status:** Approved  
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

Generate two silent, six-second, 16:9 review candidates with Higgsfield Seedance 2.0. Essential action remains centered so responsive `object-cover` cropping does not remove the hands or tortilla.

### Candidate A — overhead process

A stable overhead close-up shows hands pressing a corn masa ball, lifting the tortilla, placing it on a seasoned black comal, and flipping it once. Warm amber light, realistic food motion, visible masa texture, and a loop-friendly ending make the process immediately understandable.

### Candidate B — low macro finish

A tight low side angle looks across the comal as hands place a fresh tortilla, small bubbles form, the tortilla puffs gently, and it is flipped while light steam catches terracotta-colored light. Shallow depth of field gives this option a more cinematic, tactile feel.

Both frames contain only hands, forearms, masa, press or comal, and tortillas. Branding and written graphics are absent. The two results are presented for user selection before either is integrated.

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
