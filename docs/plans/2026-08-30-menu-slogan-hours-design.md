# Menu label, section slogan, and hours correction

Date: 2026-08-30
Status: approved for continuous implementation

## Scope

This release contains only three content-level changes:

1. Rename the burrito currently shown as `Burrito de Res al Carbón` to `Burrito Steak` in the menu source and both UI locales.
2. Add `Sabor a México, con sazón de la casa` directly below the `Sabores con Tradición` heading in the home menu section.
3. Correct both public hours displays so Monday is closed and Tuesday through Saturday are open from 11:00 AM to 8:00 PM. Sunday remains 9:00 AM to 8:00 PM.

## Visual approaches considered

- Uniform subtitle: quiet and easy to read, but too similar to the supporting copy already beside the heading.
- CTA capsule: visually strong, but would incorrectly imply that the slogan is interactive.
- Editorial lockup: a small lead-in, an oversized `México`, and a smaller closing phrase. This is the selected approach because it creates identity and hierarchy without competing with the menu controls.

## Approved composition

The slogan sits immediately below the main heading and remains part of its left column. `México` uses the existing heading typeface and deep terracotta accent; the surrounding words use compact uppercase tracking and the existing muted foreground. The English locale uses `A taste of Mexico, seasoned in our kitchen` with the same hierarchy.

The lockup must wrap safely at mobile widths, preserve both light and dark theme contrast, and introduce no new global styles or interaction.

## Data integrity

`MENU-SOURCE.md` is updated before `src/data/menu.ts`. The burrito price and description remain unchanged. The operating-hours source and active memory documents are updated with the UI so a later session cannot restore the previous closed day.

## Validation

- Menu data integrity tests pass.
- ESLint, TypeScript, and production build pass.
- The slogan is visually reviewed on mobile and desktop in both locales.
- Both hours displays show Monday closed.
- Deployment is made through a pull request to `master`, followed by direct Railway verification.
