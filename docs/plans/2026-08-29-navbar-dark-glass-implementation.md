# Dark Glass Navbar Implementation Plan
> **REQUIRED SUB-SKILL:** Use superpowers:executing-plans to implement this plan task-by-task.
**Goal:** Make the fixed navigation bar a dark glass surface in both themes and on every viewport, while preserving readable controls and the approved compact height.
**Architecture:** Keep the change local to `Navbar.tsx`; use Tailwind utility classes already used by the project for an always-dark translucent surface, backdrop blur, border, shadow, and light-on-dark controls. Validate the rendered result through the running Next.js preview and static checks rather than introducing a new styling abstraction.
**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, Framer Motion, Lucide React.

## Task 1 — Update the navigation surface and foreground tokens

**Files**

- Modify: `C:/Users/no/Documents/ChatGPT/el alteno website/el-alteno-integration-test/el-alteno/src/components/layout/Navbar.tsx`

**Steps**

1. Replace the main bar's theme-dependent `bg-card/95` with an always-dark translucent surface such as `bg-[#0F0C0A]/90` while retaining `backdrop-blur-md`, rounded shape, `h-14`, mustard border, and the existing dark shadow.
2. Replace desktop navigation foreground classes that rely on `text-foreground` with light text suitable for the stable dark surface; keep mustard as the hover/accent color.
3. Use mustard/light foreground styling for theme and language controls in both themes so the icon and label do not inherit dark ink from the light palette.
4. Replace the hamburger's `text-foreground` with a light foreground color.
5. Apply the same always-dark translucent surface and light foreground treatment to the mobile menu container and its links.
6. Preserve all existing behavior, logo asset, links, button targets, animation, `h-14` height, and 44 px minimum touch targets.

**Expected result**

- No `bg-card/95` remains on either navigation surface.
- The bar and expanded mobile menu are dark glass in both theme states.
- Navigation text and controls remain readable against the dark surface.

## Task 2 — Run focused static validation

**Files**

- Test: `Navbar.tsx` and the existing project TypeScript configuration.

**Steps**

1. From `C:/Users/no/Documents/ChatGPT/el alteno website/el-alteno-integration-test/el-alteno`, run:

   ```powershell
   npx eslint src/components/layout/Navbar.tsx
   ```

   Expected output: exit code `0`.

2. Run:

   ```powershell
   npx tsc --noEmit
   ```

   Expected output: exit code `0`.

## Task 3 — Verify both theme states and review URLs

**Files**

- No files created.

**Steps**

1. Keep the existing dev server on port `3400`; do not launch a second server for the same worktree.
2. Load a fresh local preview at `http://127.0.0.1:3400/` and verify the bar is dark glass in the default theme.
3. Use the actual theme toggle, reload a fresh page, and verify the bar remains dark glass in the alternate theme; do not infer the result from a transition frame.
4. Inspect at a narrow mobile viewport and open the hamburger menu; verify the bar/menu remain dark, the logo is visible, and all controls retain comfortable touch targets.
5. Check the LAN preview at `http://192.168.1.201:3400/` with the same expectations for a phone connected to the same Wi-Fi.
6. Confirm the video remains visible through the blur and that the navigation does not become a beige block.

## Task 4 — Commit the implementation

**Files**

- Modify: `Navbar.tsx` only for the implementation commit.

**Steps**

1. Inspect `git diff` and confirm no unrelated files changed.
2. Commit with:

   ```powershell
   git -c safe.directory='C:/Users/no/Documents/ChatGPT/el alteno website/el-alteno-integration-test' commit -m "fix(nav): keep glass bar dark across themes"
   ```

3. Do not push the branch or touch `master` until the user explicitly requests the PR workflow.
