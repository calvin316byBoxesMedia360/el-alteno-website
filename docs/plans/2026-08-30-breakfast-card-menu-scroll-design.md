# Breakfast Feature Card And Stable Menu Scroll Design

**Date:** 2026-08-30  
**Status:** Approved  
**Branch:** `codex/menu-revision-2026-08-30`

## Objective

Give the informational Breakfast notice enough visual presence to read like a featured callout without making it interactive, and eliminate the disorienting vertical jump when a visitor changes categories in the homepage menu carousel.

## Approved Breakfast Direction

Use a cinematic, full-bleed background image inside the existing informational card.

- The image is symbolic rather than a promise of a specific menu item: a clay café de olla cup, a restrained talavera detail and warm morning light.
- Do not show a complete breakfast dish, people, prices, invented text or restaurant offerings that have not been authorized in `MENU-SOURCE.md`.
- Compose the visual with the main objects toward the right so the copy has a calm area on the left.
- Add a dark terracotta-to-transparent overlay that preserves strong text contrast in light and dark themes.
- Use the El Alteño palette: terracotta, mustard, cream and dark coffee brown. Do not introduce teal.
- Keep the semantic element as an informational `aside`. It must not have a link, button behavior, arrow, hover lift, pointer cursor or misleading interaction affordance.
- It may look as prominent as a CTA through scale, border, shadow, glass blur and typography, but its non-interactive nature must remain clear.
- Retain bilingual support. The homepage follows the active language; the standalone QR menu displays both languages.
- Generate one optimized, decorative WebP asset suitable for a wide card and mobile cropping. The asset should not become the largest page payload.

## Breakfast Approaches Considered

1. **Full-bleed cinematic background — approved.** Highest presence and strongest mobile composition while remaining compact.
2. Split image and copy. Clear structure, but less expressive and weaker on narrow screens.
3. Decorative illustration. Small payload, but less appetizing and less aligned with the restaurant's photographic language.

## Approved Menu Scroll Behavior

Keep the category selector at the same viewport position when the active category changes.

Evidence from the mobile reproduction:

- Before selecting `Caldos`: `scrollY = 2240`, selector top approximately `454 px`.
- Immediately after selection: `scrollY = 1949.17`, selector top approximately `745 px`.
- The category button has no link or explicit scroll command. The movement is browser scroll anchoring reacting to the abrupt animated height change in the results region.

Implementation behavior:

- Disable browser scroll anchoring inside the changing menu region.
- Capture the selector's viewport position immediately before changing the active category.
- After React commits the new results, compensate only for an actual vertical delta so the selector remains visually fixed.
- Use immediate position correction, not smooth scrolling. The user should perceive no vertical movement.
- Preserve horizontal strip position, active button state, keyboard focus and the existing subtle dish transition.
- Do not scroll automatically to the section heading or first dish.
- Add `type="button"` to category controls as a defensive semantic guard.

## Scroll Approaches Considered

1. **Position lock plus disabled scroll anchoring — approved.** Directly addresses the measured cause and preserves context.
2. Fixed results height based on the largest category. Avoids reflow but produces unacceptable blank space.
3. Intentional scroll to the first dish. Makes content visible but still moves the page and conflicts with the requested behavior.

## Accessibility And Performance

- Decorative imagery uses empty alternative text and does not duplicate the card's readable copy.
- Maintain WCAG-readable contrast over the photograph using a deterministic overlay.
- Keep the Breakfast notice out of the tab order.
- Honor reduced-motion settings already used by the menu UI.
- Avoid layout shifts by giving the image/card an explicit stable height or aspect ratio.
- The generated image must be compressed and inspected at mobile and desktop breakpoints.

## Acceptance Criteria

- The Breakfast feature is clearly visible without being mistaken for a clickable element.
- No unapproved breakfast dish or price is implied.
- Text remains readable in English, Spanish, light mode and dark mode.
- On a 390×844 viewport, selecting categories does not materially change `window.scrollY` or the selector's viewport top.
- The first results remain directly below the category controls.
- Mouse, touch and keyboard selection continue to work.
- Menu data tests, ESLint, TypeScript and production build pass.
- Localhost and the current Wi-Fi/hotspot URL load without console errors.
