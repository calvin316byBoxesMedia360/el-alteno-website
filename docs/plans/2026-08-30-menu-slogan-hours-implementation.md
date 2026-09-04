# Menu Slogan And Hours Polish Implementation Plan
> **REQUIRED SUB-SKILL:** Use superpowers:executing-plans to implement this plan task-by-task.
**Goal:** Publish the approved burrito rename, editorial menu slogan, and Monday-closed correction without changing any prices or unrelated assets.
**Architecture:** Keep commercial facts synchronized from `MENU-SOURCE.md` into typed menu data, render the slogan inside the existing menu-section header, and update both existing hours surfaces. Add narrow source-level regression checks so the old label and Tuesday-closed copy cannot return unnoticed.
**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, Node.js test runner.

## Task 1: Lock the requested copy with failing tests

**Files:**
- Modify: `el-alteno/scripts/menu-data.test.mjs`
- Create: `el-alteno/scripts/site-copy.test.mjs`
- Modify: `el-alteno/package.json`

1. Add assertions that `burrito-charbroiled-steak` has `name` and `nameEs` equal to `Burrito Steak`.
2. Add a source-level test that reads `MenuSection.tsx`, `Location.tsx`, and `Footer.tsx` and asserts:
   - the Spanish slogan is represented in the menu section;
   - both hours surfaces use `Tuesday – Saturday / Martes – Sábado` as the open group;
   - both hours surfaces use `Monday / Lunes` as the closed day;
   - the old Tuesday-closed strings are absent.
3. Add `"test:copy": "node --test scripts/site-copy.test.mjs"` to `package.json`.
4. Run `npm run test:menu` and `npm run test:copy`; both must fail before implementation because the current source still contains the old content.

## Task 2: Update the authoritative menu and hours facts

**Files:**
- Modify: `MENU-SOURCE.md`
- Modify: `el-alteno/src/data/menu.ts`
- Modify: `el-alteno/src/components/sections/Location.tsx`
- Modify: `el-alteno/src/components/layout/Footer.tsx`
- Modify: `HANDOFF.md`
- Modify: `docs/memory/DECISIONS.md`
- Modify: `docs/memory/STATE.md`

1. Replace the burrito source row with `Burrito Steak` while preserving `$11.99` and its description note.
2. Set both UI names for `burrito-charbroiled-steak` to `Burrito Steak`; preserve description, price, category, and availability.
3. Change the authoritative hours to Monday closed, Tuesday through Saturday 11:00 AM–8:00 PM, and Sunday 9:00 AM–8:00 PM.
4. Apply the same grouping in Location and Footer in both languages.
5. Update only active operational memory; leave historical reports and already-completed plans unchanged as historical records.

## Task 3: Add the editorial slogan

**Files:**
- Modify: `el-alteno/src/components/sections/MenuSection.tsx`

1. Insert a non-interactive editorial lockup immediately below the existing `h2`.
2. Render the locale-specific small lead, a large `México / Mexico`, and a compact closing phrase.
3. Use only existing Tailwind tokens and the established deep terracotta contrast correction; do not add global CSS.
4. Keep mobile wrapping safe and avoid making the lockup resemble a CTA.

## Task 4: Verify implementation

**Files:**
- Test: `el-alteno/scripts/menu-data.test.mjs`
- Test: `el-alteno/scripts/site-copy.test.mjs`

1. Run `npm run test:menu` and expect all tests to pass.
2. Run `npm run test:copy` and expect all tests to pass.
3. Run `npm run lint` and expect exit code 0.
4. Run `npx tsc --noEmit` and expect exit code 0.
5. Run `npm run build` and expect a successful production build.
6. Inspect the home menu section at mobile and desktop widths in Spanish and English.

## Task 5: Publish safely

**Files:**
- No additional source files.

1. Commit the tests separately from the implementation where practical.
2. Push `codex/menu-slogan-polish` to the fork/origin.
3. Open a pull request toward `master`; verify its base, head, and mergeability.
4. Merge the pull request without deleting the remote branch.
5. Poll Railway until the public site and build-specific copy return HTTP 200 with `Burrito Steak`, the slogan, and Monday closed.
