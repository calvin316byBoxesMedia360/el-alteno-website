# Hero Combined CTA Design

**Status:** Approved by the user on 2026-09-03.

## Goal

Unify the event-booking and gallery actions into one visually coherent Hero CTA while preserving two clear destinations.

## Approved presentation

- Keep `Explore Menu` as the primary standalone action.
- Replace the separate `Book an Event` and `Gallery` Hero buttons with one premium CTA group titled `Plan Your Celebration / Planea tu celebración`.
- The group contains two equal, touch-friendly action areas:
  - `Book an Event / Reservar evento` → `#events`.
  - `View Gallery / Ver galería` → `/gallery`.
- Use one shared rounded container with a refined border, warm dark surface, subtle blur, and a mustard divider between actions.
- Give the booking action slightly stronger terracotta emphasis while keeping the gallery action visible and balanced.
- Stack the two actions vertically on small screens and keep them side by side on larger screens.
- Preserve existing hover, tap, focus-ring, bilingual, and reduced-motion behavior.

## UX rationale

One giant button cannot communicate two different destinations clearly. A unified split CTA keeps the visual weight of one decision point while letting visitors choose their intent immediately and without an extra modal step.

## Component approach

Update the existing CTA group in `src/components/sections/Hero.tsx`; no new component, route, state, or data source is needed. Reuse the existing `#events` anchor and `/gallery` route.

## Constraints

- Keep `Explore Menu` and delivery links unchanged.
- Do not alter the booking form or gallery page.
- Ensure each action remains a real link and independently keyboard accessible.
