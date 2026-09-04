# El Alteño Menu Revision Design

## Objective

Apply the restaurant-approved August 30 menu corrections without inventing prices, dishes, ingredients or promotional claims. The update covers price reconciliation, removals, renames, ingredient corrections, three new soups, a separate grilled seafood dish, lunch additions, Sunday hours and a non-interactive breakfast notice.

## Evidence Contract

The consolidated evidence is recorded in `docs/memory/MENU-REVISION-2026-08-30.md`.

Authority order:

1. Explicit owner corrections in the project conversation.
2. Plaud meeting summary for the price matrix.
3. Handwritten pages for dish names, removals, ingredients and hours.
4. Existing `MENU-SOURCE.md` as the repository baseline.

`MENU-SOURCE.md` must be updated before `el-alteno/src/data/menu.ts`. The application data must be a faithful bilingual projection of the consolidated source.

## Menu Structure

- Add a new `Soups / Caldos` category for `Caldo de Res`, `Caldo de Pollo` and `Caldo de Birria de Chivo`.
- Display `Caldo de Birria de Chivo / Goat Birria Soup` at `$18.99` with the only authorized descriptive facts: goat birria and weekends only.
- Add `Mariscada a la Parrilla` as an independent seafood dish at `$23.99`. It contains mussels, crab legs and shrimp like the broth version, but is served sizzling in a hot skillet.
- New soups without an approved recipe description show only bilingual names and prices. No filler copy is generated.
- Remove `Filete Limón`, the à-la-carte `Fish Fillet`, and discontinued `Helado`.
- Add the approved lunch items and synchronize every approved price in the Plaud matrix.
- Apply the authorized ingredient and tortilla corrections in both languages.
- Rename the soft taco from `Pollo Rojo` to grilled chicken terminology in both languages.

## Breakfast Notice

### Chosen Approach

Use a compact editorial glass notice directly between the menu introduction and the category navigation. Render it in both the homepage menu section and the standalone QR menu so the information is consistent wherever guests read the menu.

The notice is informative only:

- no link;
- no telephone action;
- no button role or pointer cursor;
- no published breakfast dishes, prices or hours.

Copy:

- Label: `Breakfast / Desayunos` according to the active language where available.
- English: `Craving breakfast? Ask about our breakfast menu.`
- Spanish: `¿Antojo de desayuno? Pregunte por nuestro menú de desayunos.`

Visual treatment:

- warm amber/gold translucent surface matching El Alteño's existing mustard, terracotta and paper palette;
- fine warm border, restrained glow and backdrop blur;
- small sun icon used decoratively;
- readable contrast in light and dark themes;
- compact mobile layout with no horizontal overflow;
- semantic `aside` or note-style content, not a CTA control.

The restaurant's established palette overrides generic agency accent colors. No teal is introduced into the El Alteño UI.

## Hours

Sunday changes from `11:00 AM – 8:00 PM` to `9:00 AM – 8:00 PM` wherever operating hours are displayed. Tuesday remains closed. Other days remain unchanged.

## Data Integrity And Testing

- Add a focused automated data test covering the owner-approved price matrix, removed IDs, new IDs, category placement and key bilingual ingredient corrections.
- Verify IDs remain unique and every visible item has a finite non-negative price.
- Confirm no removed item appears in either the homepage menu or standalone QR menu.
- Run the menu data test, focused ESLint, TypeScript and production build.
- Review desktop and real mobile over the Wi-Fi URL printed by `npm run dev`.

## Video Optimization Boundary

Video compression is part of the same work round but a separate commit. Preserve `private-events-walkthrough-master-v1.mp4` as the approved source. Produce web derivatives with H.264, `faststart`, no audio, an approximately 15–20 MB 1080p target and an approximately 8–12 MB 720p mobile target. Do not replace the active asset until visual quality and browser range behavior pass review.

## Git And Deployment

- Working branch: `codex/menu-revision-2026-08-30`, created from verified `origin/master` at `a3f2b646`.
- Keep the menu/source update and video optimization in separate commits.
- Do not add unrelated untracked media candidates.
- Push only the feature branch and open a PR to `master` after local and Wi-Fi approval.
- Never push directly to `master`; a `master` update deploys Railway automatically.
