# Local Private Events Video Pipeline Implementation Plan
> **REQUIRED SUB-SKILL:** Use superpowers:executing-plans to implement this plan task-by-task.
**Goal:** Install FFmpeg locally and add a reproducible, silent, GPU-accelerated pipeline that assembles approved Private Events clips in the order entrada → salón → bar → patio.
**Architecture:** A versioned JSON manifest is the production contract. A Node CLI validates tool availability, paths, approval state and clip properties; it normalizes clips into a temporary directory with NVENC when available, concatenates them, verifies the result with FFprobe and deletes temporary files.
**Tech Stack:** Node.js ESM, `node:test`, FFmpeg/FFprobe 9, NVIDIA NVENC with `libx264` fallback, npm scripts.

## Task 1 — Install and verify local FFmpeg

**Files:** none.

1. Install the confirmed Winget package:

   ```powershell
   winget install --id Gyan.FFmpeg --exact --accept-package-agreements --accept-source-agreements
   ```

2. Open a fresh process and verify:

   ```powershell
   ffmpeg -version
   ffprobe -version
   ffmpeg -hide_banner -encoders | Select-String 'h264_nvenc'
   ```

3. Expected result: FFmpeg and FFprobe report version 9.x; `h264_nvenc` appears.

## Task 2 — Add the production manifest

**Files:**

- Create: `el-alteno/video/private-events-manifest.json`

Create the full manifest:

```json
{
  "version": 1,
  "output": "public/videos/private-events-walkthrough-master-v1.mp4",
  "previewOutput": "public/videos/private-events-walkthrough-preview-local.mp4",
  "video": {
    "width": 1920,
    "height": 1080,
    "fps": 30,
    "audio": false
  },
  "clips": [
    {
      "id": "entrance",
      "label": "Entrada",
      "path": "public/videos/private-events-entrance-clip-approved-v1.mp4",
      "status": "pending",
      "required": true
    },
    {
      "id": "salon",
      "label": "Salón",
      "path": "public/videos/private-events-salon-clip-approved-v1.mp4",
      "status": "pending",
      "required": true
    },
    {
      "id": "bar",
      "label": "Bar",
      "path": "public/videos/private-events-bar-clip-approved-v1.mp4",
      "status": "approved",
      "required": true
    },
    {
      "id": "patio",
      "label": "Patio",
      "path": "public/videos/private-events-patio-walkthrough-v3.mp4",
      "status": "approved",
      "required": true
    }
  ]
}
```

Commit:

```powershell
git add el-alteno/video/private-events-manifest.json
git commit -m "chore: define private events video manifest"
```

## Task 3 — Write manifest validation tests

**Files:**

- Create: `el-alteno/scripts/private-events-video.test.mjs`
- Create: `el-alteno/scripts/private-events-video-lib.mjs`

1. Write tests with `node:test` for:

   - fixed unique clip IDs;
   - allowed statuses `pending` and `approved`;
   - path containment inside the app directory;
   - final render rejected when a required clip is pending;
   - preview selection includes only approved, existing clips;
   - video contract requires `audio: false`.

2. Export these functions from the library:

```js
export function validateManifestShape(manifest) {}
export function resolveInsideProject(projectRoot, relativePath) {}
export function selectClips(manifest, mode, existsSync) {}
```

3. Run the failing tests:

```powershell
node --test scripts/private-events-video.test.mjs
```

Expected: failures until validation is implemented.

4. Implement the minimum validation in `private-events-video-lib.mjs` and rerun until all tests pass.

Commit:

```powershell
git add el-alteno/scripts/private-events-video-lib.mjs el-alteno/scripts/private-events-video.test.mjs
git commit -m "test: define private events video safeguards"
```

## Task 4 — Implement the local assembler

**Files:**

- Create: `el-alteno/scripts/private-events-video.mjs`

The CLI must support `check`, `preview`, and `render`.

Core command construction:

```js
const nvencArgs = [
  '-c:v', 'h264_nvenc',
  '-preset', 'p6',
  '-tune', 'hq',
  '-rc', 'vbr',
  '-cq', '18',
  '-b:v', '0'
];

const cpuArgs = ['-c:v', 'libx264', '-preset', 'medium', '-crf', '18'];

const normalizeFilter = [
  `scale=${width}:${height}:force_original_aspect_ratio=decrease`,
  `pad=${width}:${height}:(ow-iw)/2:(oh-ih)/2:black`,
  `fps=${fps}`,
  'setsar=1',
  'format=yuv420p'
].join(',');
```

Behavior:

1. Locate the app root from `import.meta.url`.
2. Read and validate `video/private-events-manifest.json`.
3. Confirm `ffmpeg` and `ffprobe` exist.
4. Detect `h264_nvenc`; prefer it automatically.
5. `check`: print tools, encoder, order, approved modules and pending modules; do not render.
6. `preview`: normalize and concatenate only approved files into `previewOutput`.
7. `render`: fail if any required item is pending/missing; otherwise create the versioned final output.
8. Normalize every selected clip without audio.
9. Write a concat list in the temporary directory and concatenate with `-c copy -movflags +faststart`.
10. Validate output with FFprobe and fail unless codec, dimensions, fps and audio contract match.
11. Remove the temporary directory in `finally`.

Run:

```powershell
node scripts/private-events-video.mjs check
node scripts/private-events-video.mjs render
```

Expected: `check` passes and reports Entrada/Salón pending; `render` refuses cleanly before invoking FFmpeg.

Commit:

```powershell
git add el-alteno/scripts/private-events-video.mjs
git commit -m "feat: add local private events video assembler"
```

## Task 5 — Add npm commands and ignore local preview output

**Files:**

- Modify: `el-alteno/package.json`
- Modify: `el-alteno/.gitignore`

Add scripts:

```json
"video:private-events:check": "node scripts/private-events-video.mjs check",
"video:private-events:preview": "node scripts/private-events-video.mjs preview",
"video:private-events": "node scripts/private-events-video.mjs render",
"test:video": "node --test scripts/private-events-video.test.mjs"
```

Add ignore rule:

```gitignore
/public/videos/*-preview-local.mp4
```

Run:

```powershell
npm run test:video
npm run video:private-events:check
npm run video:private-events
```

Expected: tests pass; check reports two approved/two pending; final render fails with an intentional actionable message.

Commit:

```powershell
git add el-alteno/package.json el-alteno/.gitignore
git commit -m "chore: expose local video production commands"
```

## Task 6 — Exercise the GPU pipeline with the approved modules

**Files:**

- Generated and ignored: `el-alteno/public/videos/private-events-walkthrough-preview-local.mp4`

Run:

```powershell
npm run video:private-events:preview
```

Expected:

- NVENC is selected.
- Bar and patio are concatenated in that order.
- Output is silent, H.264, 1920×1080, 30 fps and web-faststart.
- Preview is ignored by Git.

Verify:

```powershell
ffprobe -v error -show_streams -show_format public/videos/private-events-walkthrough-preview-local.mp4
git status --short
```

## Task 7 — Update operational memory

**Files:**

- Modify: `docs/memory/VIDEO-ASSETS.md`
- Modify: `docs/memory/STATE.md`
- Modify: `docs/memory/NEXT.md`
- Modify: `HANDOFF.md`

Record:

- installed FFmpeg version;
- detected NVENC encoder;
- exact npm commands;
- current two-approved/two-pending manifest state;
- rule that final render remains blocked until Entrada and Salón are approved;
- silent-master decision.

Validate and commit:

```powershell
git diff --check
git add HANDOFF.md docs/memory/VIDEO-ASSETS.md docs/memory/STATE.md docs/memory/NEXT.md
git commit -m "docs: register local private events video pipeline"
```

## Final verification

```powershell
npm run test:video
npm run video:private-events:check
npm run video:private-events:preview
git diff --check
git status --short --branch
```

The final production render must remain blocked until Entrada and Salón are marked approved and their versioned files exist.
