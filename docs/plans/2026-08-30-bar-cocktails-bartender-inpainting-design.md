# Bar Cocktails Bartender Inpainting Design

## Goal

Create a non-destructive edited version of `bar-candidate-03-cocktails.png` that places the restaurant's real bartender behind the bar while preserving the approved cocktail composition and the recognizable interior.

## Approved approach

Use the cocktail image as the edit target and `bar-service-poster.webp` plus `bar-candidate-02-service-v3.png` as identity and spatial references. Insert the bartender behind the green counter in a natural service pose, preparing or presenting the drinks without competing with the cantarito and paloma in the foreground.

## Visual invariants

- Preserve the two foreground cocktails, their garnishes, condensation, scale, and placement.
- Preserve the green counter, shelves, bottles, hanging glassware, warm lighting, camera angle, and 16:9 composition.
- Preserve the bartender's recognizable face, hairstyle, facial hair, black shirt, build, and visible tattoo character from the approved references.
- Keep the backbar shelves behind the bartender; do not mirror or rearrange the architecture.
- Use clean, anatomically correct hands in a credible service pose.
- Do not add text, logos, extra people, clutter, luxury-hotel styling, or new architectural elements.

## Output and acceptance

Save the first review candidate as `bar-candidate-03-cocktails-bartender-v1.png`. The existing target remains untouched. Accept when the bartender is recognizably the same person, the insertion looks photographically integrated, and the cocktails remain visually unchanged.
