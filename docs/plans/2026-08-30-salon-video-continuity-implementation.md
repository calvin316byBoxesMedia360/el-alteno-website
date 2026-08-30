# Salon Video Continuity Implementation Plan
> **REQUIRED SUB-SKILL:** Use superpowers:executing-plans to implement this plan task-by-task.
**Goal:** Produce a coherent 16:9 salon walkthrough candidate with a refined opening, frame-safe transitions, and a final Gemini Omni Flash 1.1 consistency pass.
**Architecture:** Replace only the defective opening with a reference-driven clip, preserve the approved middle and closing clips, then rebuild the timeline at the native 24 fps while trimming generated anchor handles. Use Gemini Omni Flash 1.1 in edit mode only after the deterministic cut passes structural checks, and keep both versions for A/B review.
**Tech Stack:** Higgsfield Seedance 2.5, Google Gemini Omni Flash 1.1, Higgsfield remote sandbox, FFmpeg, H.264 MP4, local Next.js public candidates.

## Task 1: Verify sources and protect the worktree

**Files:**
- Read: `el-alteno/public/images/local_para_eventos/_candidates/salon/`
- Read: `docs/memory/STATE.md`
- Read: `docs/memory/NEXT.md`

1. Run `git status -sb` and confirm the branch is `codex/menu-cta-content-polish`.
2. Confirm the untracked bar and salon folders remain untouched.
3. Confirm the approved reference jobs are available:
   - Wide salon anchor: `4969be62-1d10-4025-8d57-99e0ae4e7008`.
   - Refined table anchor: `cce72615-5d2c-4c18-bfbb-09635af70dc8`.
   - Approved waitress close: `6480c829-07d8-4e00-ad95-648d469f4a8f`.
4. Expected result: no tracked implementation files are modified before media generation.

## Task 2: Generate a coherent replacement opening

**Files:**
- Create candidate: `el-alteno/public/images/local_para_eventos/_candidates/salon/salon-opening-refined-v1.mp4`

1. Submit one Seedance 2.5 `omni_reference` generation.
2. Use the wide salon anchor as `start_image`, refined table anchor as `end_image`, and approved decorated salon references as `image_references`.
3. Use these parameters:

```text
model: seedance_2_5
mode: omni_reference
duration: 4
resolution: 1080p
bitrate_mode: high
generate_audio: false
aspect_ratio: 16:9
```

4. Prompt for a slow professional gimbal entrance, preserving the real architecture and using only white linens, black runners, white flowers, complete plates, silverware, and wine glasses. Explicitly prohibit rustic/red tablecloths, empty tables, exposure shifts, invented text, and structural changes.
5. Wait for completion and retain the generation URL.
6. Expected result: the first and last frames belong to the same refined graduation event.

## Task 3: Rebuild the deterministic timeline at 24 fps

**Files:**
- Create candidate: `el-alteno/public/images/local_para_eventos/_candidates/salon/el-alteno-salon-walkthrough-consistent-v1.mp4`

1. Download the new opening and the three retained source clips into the remote media sandbox.
2. Inspect exact durations with `ffprobe`.
3. Trim 6–8 frames from the beginning of clips 2–4 and remove any static anchor frames at their ends.
4. Normalize every input to 1280×720, square pixels, native 24 fps, and reset timestamps.
5. Join the four clips with 0.35–0.45 second cross-dissolves; offsets must be calculated from the trimmed durations.
6. Apply only a conservative global grade:

```text
contrast: +2%
saturation: +2% to +3%
brightness: no lift above neutral
audio: none
codec: H.264, yuv420p, CRF 18–19, faststart
```

7. Run `ffprobe` and confirm 16:9, 24 fps, H.264, no audio, and a duration close to the approved 15–17 second window.
8. Expected result: no repeated opening frame, no 30 fps conversion, and no rustic opening.

## Task 4: Inspect transition frames before generative editing

**Files:**
- Create review sheet: `el-alteno/public/images/local_para_eventos/_candidates/salon/consistent-v1-transition-review.jpg`

1. Extract frames before, during, and after all three transition boundaries.
2. Build a contact sheet and inspect for flashes, anchor resets, black frames, hand deformation, and architectural jumps.
3. If a structural error remains, correct the deterministic timeline before continuing.
4. Expected result: all transition rows advance forward in time without returning to the first shot.

## Task 5: Apply Gemini Omni Flash 1.1 consistency edit

**Files:**
- Create candidate: `el-alteno/public/images/local_para_eventos/_candidates/salon/el-alteno-salon-walkthrough-gemini-v1.mp4`

1. Upload the deterministic cut as `video_references`.
2. Submit one Gemini Omni Flash 1.1 generation with:

```text
model: gemini_omni_flash_1_1
mode: edit
resolution: 1080p
aspect_ratio: 16:9
```

3. Use a preservation-first prompt: keep exact timing, camera movement, architecture, people, serving action, hands, glassware, and framing; unify white balance, dark tones, white linens, black runners, silver accents, flowers, plates, cutlery, and wine glasses; remove single-frame flashes and flicker; create no text, logos, people, props, walls, windows, doors, or furniture.
4. Wait for completion and retain the result URL.
5. Expected result: a visually cohesive pass without redesigning the real salon.

## Task 6: A/B verification and delivery

**Files:**
- Read: deterministic candidate from Task 3.
- Read: Gemini candidate from Task 5.
- Create review sheet: `el-alteno/public/images/local_para_eventos/_candidates/salon/gemini-v1-review.jpg`

1. Extract matching frames at 0.5, 2, 5, 9, 13, and final seconds from both versions.
2. Compare architecture, hands, faces, tables, exposure, color, and transitions.
3. Reject the Gemini version if it introduces structural or anatomical drift.
4. Run `Video Deflicker` only if the selected version still has true temporal flicker; do not use it to mask shot mismatch.
5. Keep Topaz disabled unless the user approves the content and requests a final delivery upscale.
6. Download both candidates locally and open the recommended version for user review.
7. Do not integrate, commit, push, or publish the media before explicit visual approval.

## Task 7: Record the checkpoint after review

**Files:**
- Modify after approval only: `docs/memory/STATE.md`
- Modify after approval only: `docs/memory/NEXT.md`

1. Record the selected filename, model, duration, resolution, and approval state.
2. Keep the rejected candidate as a recoverable local backup unless the user asks to remove it.
3. Commit only the approved asset and memory updates in a focused commit.

