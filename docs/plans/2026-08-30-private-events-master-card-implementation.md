# Private Events Master Card Implementation Plan
> **REQUIRED SUB-SKILL:** Use superpowers:executing-plans to implement this plan task-by-task.
**Goal:** Place the complete Private Events walkthrough in a compact, looping and pausable video card between the section heading and its descriptive paragraph.
**Architecture:** Adapt the existing `EventFeatureVideo` client component instead of introducing a second card. The component owns playback state and viewport behavior through a video ref and `IntersectionObserver`; `Events` only controls its editorial position. A poster extracted from the approved master prevents a visual mismatch before playback.
**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind CSS, Framer Motion, Lucide React, local FFmpeg/FFprobe.

## Task 1: Validate the approved source and create its poster

**Files:**
- Read: `el-alteno/public/videos/private-events-walkthrough-master-v1.mp4`
- Create: `el-alteno/public/images/local_para_eventos/private-events-master-poster.jpg`

1. Probe the source and confirm it is the approved horizontal, silent master.
2. Extract a representative frame near `00:00.500` with local FFmpeg at the source dimensions.
3. Probe the JPG and confirm it is readable and 16:9.
4. Expected result: the poster depicts the beginning of the same walkthrough and does not flash the unrelated patio image before playback.

## Task 2: Add viewport-aware loop and subtle playback control

**Files:**
- Modify: `el-alteno/src/components/ui/EventFeatureVideo.tsx`

1. Add `useEffect`, `useRef`, and `useState` plus Lucide `Pause` and `Play` icons.
2. Keep one `<video>` element mounted for all users with:

```tsx
<video
  ref={videoRef}
  muted
  loop
  playsInline
  preload="metadata"
  poster="/images/local_para_eventos/private-events-master-poster.jpg"
  className="absolute inset-0 h-full w-full object-contain object-center"
>
  <source src="/videos/private-events-walkthrough-master-v1.mp4" type="video/mp4" />
</video>
```

3. Observe the card. Play while visible unless the user explicitly paused it; pause outside the viewport without resetting `currentTime`.
4. Respect reduced motion by skipping automatic playback but allowing explicit playback from the same control.
5. Add a small bottom-right glass button with correct bilingual `aria-label`, keyboard focus ring, and state synchronized through `onPlay`/`onPause`.
6. Replace the large overlaid headline with the compact bilingual label `Explore Our Spaces / Conoce Nuestros Espacios`.
7. Preserve `aspect-video`, dark backing surface, warm border, rounded corners, and shadow.
8. Expected result: the complete master loops, can be paused manually, resumes manually, and never crops.

## Task 3: Move the card into the approved editorial position

**Files:**
- Modify: `el-alteno/src/components/sections/Events.tsx`

1. Move `<EventFeatureVideo />` from below the descriptive paragraph to immediately after the main `<h2>`.
2. Use the component's own compact bottom margin; do not add a second patio card.
3. Leave the paragraph, statistics, tags, CTA and form unchanged.
4. Expected result: title → minitarjeta → description in both languages.

## Task 4: Static verification

**Files:**
- Test: `el-alteno/src/components/ui/EventFeatureVideo.tsx`
- Test: `el-alteno/src/components/sections/Events.tsx`

1. Run:

```powershell
npx eslint src/components/ui/EventFeatureVideo.tsx src/components/sections/Events.tsx
npx tsc --noEmit
npm run build
```

2. Confirm no warnings or errors from the changed files.
3. Confirm `git diff --check` passes.
4. Commit the implementation in a focused commit without adding unrelated candidate media.

## Task 5: Local and Wi-Fi visual QA

**Files:**
- Review: `el-alteno/src/components/ui/EventFeatureVideo.tsx`
- Review: `el-alteno/src/components/sections/Events.tsx`

1. Start the project through `npm run dev -- --port 3400`; the Wi-Fi helper must bind to `0.0.0.0` and print both URLs.
2. Review `/#events` locally at desktop and mobile widths.
3. Confirm the card sits between heading and paragraph, the full frame is visible, and copy does not overlap the pause button.
4. Confirm play/pause, loop, pause-outside-viewport, manual reduced-motion behavior, English/Spanish copy, and focus accessibility.
5. Open the LAN URL on the phone using the printed Wi-Fi address, never `127.0.0.1`.
6. Leave the server running for user review and report both exact URLs.

