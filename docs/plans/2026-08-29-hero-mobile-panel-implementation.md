# Mobile Hero Panel Implementation Plan
> **REQUIRED SUB-SKILL:** Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Recompose the mobile HERO so the original horizontal video remains fully visible in a dedicated media stage and the logo/content are readable in an opaque panel below it, without changing the desktop composition.

**Architecture:** Keep one responsive `<video>` in `Hero.tsx`. On mobile the section flows as `video stage -> content panel`; from `md` upward the video becomes an absolute full-bleed background and the existing centered overlay returns. Remove the generated blurred mobile derivative because it is no longer part of the approved composition.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS, Framer Motion, npm.

## Task 1: Recompose the responsive HERO

**Files:**
- Modify: `el-alteno/src/components/sections/Hero.tsx`

1. Change the section so mobile is normal document flow and desktop remains a centered, full-viewport flex container.
2. Wrap the video and its contrast gradients in a media layer. Use the original `/videos/hero-bg.mp4` only.
3. Use `aspect-video`, full width, and `object-contain` for the mobile media stage; restore absolute full-bleed `object-cover` behavior at `md`.
4. Make the content wrapper a dark opaque panel on mobile and transparent from `md` upward.
5. Keep the current mobile order (logo, greeting, address, CTAs, delivery), but remove all negative vertical offsets from the logo.
6. Preserve the existing desktop order and motion/accessibility behavior through responsive utility classes.

Expected structure:

```tsx
<section className="... bg-[#161311] md:flex md:min-h-[100svh] ...">
  <div className="relative z-0 w-full shrink-0 md:absolute md:inset-0">
    <video className="... aspect-video w-full object-contain md:h-full md:aspect-auto md:object-cover">
      <source src="/videos/hero-bg.mp4" type="video/mp4" />
    </video>
    {/* mobile edge fade and desktop contrast overlays */}
  </div>
  <div className="relative z-10 ... bg-[#161311] ... md:bg-transparent">
    {/* existing accessible hero content */}
  </div>
</section>
```

## Task 2: Remove the obsolete blurred derivative

**Files:**
- Delete: `el-alteno/public/videos/hero-bg-mobile.mp4`

Remove the generated mobile asset after the component no longer references it. This prevents an unused ~2.9 MB file from remaining in the branch and makes the single-source video decision explicit.

## Task 3: Verify the visual and production behavior

1. Start the local dev server on `0.0.0.0:3200` if it is not already running.
2. Inspect the page at a narrow mobile viewport (`375px` wide): video details should be visible across the full horizontal frame, and the logo should be completely visible below the video.
3. Inspect a desktop viewport: the full-screen immersive hero and centered content should remain intact.
4. Run `npm run lint` from `el-alteno/`.
5. Run `npx tsc --noEmit` from `el-alteno/`.
6. Stop the dev server before `npm run build` because Next.js shares the `.next` directory between dev and production builds.
7. Restart the LAN dev server for the user’s review and confirm `http://192.168.1.201:3200/` responds locally.

## Task 4: Commit the implementation

Commit the component and asset changes together with:

```text
fix(hero): separate mobile video from content panel
```

Do not push the branch or modify `master` until the user reviews the local result.
