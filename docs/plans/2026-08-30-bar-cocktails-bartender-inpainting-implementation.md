# Bar Cocktails Bartender Inpainting Implementation Plan
> **REQUIRED SUB-SKILL:** Use superpowers:executing-plans to implement this plan task-by-task.
**Goal:** Produce a review-ready inpainting candidate that inserts the real El Alteño bartender behind the bar without altering the approved cocktail foreground.
**Architecture:** Use the built-in image editing workflow with one edit target and two supporting identity/spatial references. Persist the generated result as a versioned sibling file and inspect it before any UI integration or replacement.
**Tech Stack:** Codex built-in image generation, GPT Image editing, local PNG/WebP assets, visual inspection.

## Task 1: Verify inputs

**Files:**
- Edit target: `el-alteno/public/images/local_para_eventos/_candidates/bar/bar-candidate-03-cocktails.png`
- Identity reference: `el-alteno/public/images/cocktails/bar-service-poster.webp`
- Spatial/pose reference: `el-alteno/public/images/local_para_eventos/_candidates/bar/bar-candidate-02-service-v3.png`

1. Inspect all three files.
2. Confirm the edit target remains unchanged before generation.
3. Confirm the bartender identity and correct backbar orientation from the references.

Expected result: all inputs are available and their roles are unambiguous.

## Task 2: Generate the inpainting candidate

**Files:**
- Create: `el-alteno/public/images/local_para_eventos/_candidates/bar/bar-candidate-03-cocktails-bartender-v1.png`

1. Run one built-in image edit using the approved design invariants.
2. Keep the original output dimensions and landscape composition.
3. Copy the generated result into the versioned workspace path.

Expected result: one non-destructive candidate containing the real bartender behind the bar.

## Task 3: Visual verification

**Files:**
- Test: `el-alteno/public/images/local_para_eventos/_candidates/bar/bar-candidate-03-cocktails-bartender-v1.png`

1. Inspect bartender identity, face, hair, facial hair, shirt, tattoos, and hands.
2. Verify the two cocktails and their garnishes remain intact.
3. Verify the shelves remain behind the bartender and the bar is not mirrored.
4. Verify there is no added text, logo, person, clutter, or architectural drift.

Expected result: the candidate is suitable for user review. If one isolated defect remains, perform one targeted revision and save it as `v2`.

## Task 4: Handoff

1. Show the candidate to the user.
2. Do not replace the approved gallery image or integrate it into video until the user approves it.
3. Record the selected version in project memory after approval.

Expected result: explicit user approval precedes any integration.
