# Menu Content and Phone CTA Design

## Context

The mobile review identified two separate issues: several menu records need factual/content cleanup, and the working `tel:` link in the Private Events section is visually understated.

## Approved design

- Keep `chicken tinga` in Tacos Dorados; it is confirmed by `MENU-SOURCE.md`.
- Keep Carne Asada copy unchanged and remove only the unrelated sope/tostada from its photo, preserving the dish, plate, lighting, and composition.
- Expand Mariscada with the confirmed ingredients only: mussels, crab legs, and shrimp.
- Add beans to the Huachinango description in both languages and update the source of truth before application data.
- Reframe the Private Events phone link as a single, fully tappable CTA region. Use a dark translucent glass surface, warm mustard/terracotta contrast, phone icon, action label, phone number, and a small mobile hint. Keep it visually secondary to the main form submit button.
- Keep the Next.js development indicator out of application work; it is local tooling and is not part of the production site.

## Proposed copy

- Mariscada EN: “A seafood broth with mussels, crab legs and shrimp.”
- Mariscada ES: “Caldo de mariscos con mejillones, patas de cangrejo y camarones.”
- Phone CTA EN: “Call to reserve” / “Tap to call”.
- Phone CTA ES: “Llama para reservar” / “Toca para llamar”.

## Constraints

- `MENU-SOURCE.md` remains authoritative; no ingredients or preparation claims may be invented.
- The image edit is non-destructive and must alter only the unrelated side item.
- The CTA must retain `href="tel:8317689876"`, keyboard focus, readable contrast, and mobile touch target sizing.
- Do not push or modify `master`.

## Validation

- Run ESLint, TypeScript, and production build.
- Verify the CTA in desktop and narrow mobile layouts, including bilingual labels and touch affordance.
- Inspect the edited Carne Asada image before replacing the referenced asset.
