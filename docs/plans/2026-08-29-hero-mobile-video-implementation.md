# Mobile Hero Video Implementation Plan
> **REQUIRED SUB-SKILL:** Use superpowers:executing-plans to implement this plan task-by-task.
**Goal:** Add a mobile-specific vertical composition of the existing HERO video and reduce the mobile logo so the video remains legible without changing desktop behavior.
**Architecture:** Generate `hero-bg-mobile.mp4` from the existing 16:9 source by fitting the full frame inside a 9:16 canvas with a blurred, darkened extension behind it. Select that source responsively in `Hero.tsx`; keep `hero-bg.mp4` as the desktop fallback. Adjust only the mobile logo sizing and spacing.
**Tech Stack:** Next.js App Router, React/TypeScript, Tailwind CSS, HTML `<video>`, temporary FFmpeg binary for asset generation, browser-based responsive verification.

## Task 1 — Establish the mobile baseline

**Files:** No source changes.

1. Start the test worktree app on port 3200:

   ```powershell
   npm run dev -- --hostname 127.0.0.1 --port 3200
   ```

2. Capture the HERO at 320×812, 375×812, 430×932 and 1280×720.
3. Record that the current 16:9 source is cropped by `object-cover` and the 280px mobile logo obscures the source frame.

## Task 2 — Generate the mobile video asset

**Files:** Create `el-alteno/public/videos/hero-bg-mobile.mp4`.

1. Install a temporary FFmpeg wrapper outside the application dependencies; do not modify `package.json`:

   ```powershell
   npm install --prefix .media-tools --no-save @ffmpeg-installer/ffmpeg
   ```

2. Resolve the temporary binary and create a 1080×1920 composition from the existing source:

   ```powershell
   $ffmpeg = node -p "require('./.media-tools/node_modules/@ffmpeg-installer/ffmpeg').path"
   & $ffmpeg -y -i 'el-alteno/public/videos/hero-bg.mp4' -filter_complex "[0:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,boxblur=20:2[bg];[0:v]scale=1080:1920:force_original_aspect_ratio=decrease[fg];[bg][fg]overlay=(W-w)/2:(H-h)/2,format=yuv420p" -c:v libx264 -preset medium -crf 24 -an -movflags +faststart 'el-alteno/public/videos/hero-bg-mobile.mp4'
   ```

3. Verify the output exists, is non-empty, and is approximately 1080×1920. Remove `.media-tools` after the asset is created so temporary tooling is not committed.

## Task 3 — Select the mobile source and protect the logo area

**Files:** Modify `el-alteno/src/components/sections/Hero.tsx`.

1. Keep the existing video element attributes (`autoPlay`, `loop`, `muted`, `playsInline`, `aria-hidden`).
2. Put the mobile source before the desktop fallback:

   ```tsx
   <source media="(max-width: 767px)" src="/videos/hero-bg-mobile.mp4" type="video/mp4" />
   <source src="/videos/hero-bg.mp4" type="video/mp4" />
   ```

3. Change the emblem wrapper from the current mobile `max-w-[280px]` to a mobile-first scale such as `max-w-[190px] sm:max-w-[300px] md:max-w-[360px]`, with slightly tighter mobile bottom spacing. Desktop remains at the existing maximum.
4. Do not change the CTA copy, menu data, prices, desktop source, or approved color treatment.

## Task 4 — Verify and commit the implementation

**Files:** `el-alteno/public/videos/hero-bg-mobile.mp4`, `el-alteno/src/components/sections/Hero.tsx`.

1. Reload the local app and verify the mobile source is selected at 320, 375 and 430 px; verify the original source remains selected at desktop width.
2. Confirm the full panoramic frame is visible inside the mobile composition, the logo does not cover the main video band, and there is no horizontal overflow.
3. Run:

   ```powershell
   npm run build
   npx tsc --noEmit
   ```

4. Commit the implementation separately from the design document:

   ```powershell
   git add -- el-alteno/public/videos/hero-bg-mobile.mp4 el-alteno/src/components/sections/Hero.tsx
   git commit -m "fix(hero): add mobile video composition"
   ```
