# Formspree Contact Integration Implementation Plan
> **REQUIRED SUB-SKILL:** Use superpowers:executing-plans to implement this plan task-by-task.
**Goal:** Activate the El Alteño event form with the restaurant-owned Formspree endpoint and verify delivery to the restaurant inbox.
**Architecture:** Keep the existing client-side Formspree integration in `Events.tsx`. Store only the public Formspree form ID in the hosting environment as `NEXT_PUBLIC_FORMSPREE_ID`; keep the notification recipient configured inside Formspree. Configure the active public host first, then mirror the value in the documented Railway deployment if it remains active.
**Tech Stack:** Next.js 16, React 19, TypeScript, Formspree, Netlify/Railway environment variables.

## Task 1: Verify source and endpoint contract

**Files:**
- Read: `C:/Users/no/Documents/ChatGPT/el alteno website/el-alteno-website/el-alteno/src/components/sections/Events.tsx`
- Read: `C:/Users/no/Documents/ChatGPT/el alteno website/el-alteno-website/el-alteno/.env.example`

**Steps:**

1. Confirm the component posts to `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}` with JSON and includes named event fields.
2. Confirm the supplied endpoint maps to ID `mbgjklrl`.
3. Do not hardcode the endpoint or the restaurant email into source.

**Expected result:** The existing source is compatible with the supplied endpoint, so no application-code change is required unless the production check proves the deployed bundle omitted the variable.

## Task 2: Configure the active hosting environment

**Files:**
- No repository file changes.
- External configuration: the host attached to `elaltenorestaurant.com`.

**Steps:**

1. In the active host's environment-variable settings, add `NEXT_PUBLIC_FORMSPREE_ID` with the exact value `mbgjklrl`.
2. Save the variable and trigger/redeploy the site so Next.js embeds the public variable into the client bundle.
3. If Railway still has a live deployment at `web-production-004ee.up.railway.app`, add the same variable there as well; this value is not a secret.

**Expected result:** The public site submits to `https://formspree.io/f/mbgjklrl` instead of an endpoint containing `undefined`.

## Task 3: Build and smoke-test locally

**Files:**
- Read only: `C:/Users/no/Documents/ChatGPT/el alteno website/el-alteno-website/el-alteno/package.json`

**Steps:**

1. Run `npm run build` from `C:/Users/no/Documents/ChatGPT/el alteno website/el-alteno-website/el-alteno`.
2. Confirm the build exits successfully.
3. If the local environment has no `.env.local`, do not create or commit one solely for production configuration; validate the production deployment after the host variable is set.

**Expected result:** Next.js builds without TypeScript or lint/build errors.

## Task 4: Verify delivery from the public site

**Files:**
- No repository file changes.

**Steps:**

1. Open the public site's Events form.
2. Submit a clearly labeled test request using non-sensitive test data.
3. Confirm the UI reports success.
4. Check the restaurant Gmail inbox for the Formspree notification and confirm it is addressed to `elaltenorest@gmail.com`.

**Expected result:** The test arrives in the restaurant inbox and can be answered using the visitor's submitted email address.

## Task 5: Record completion

**Files:**
- Update: `C:/Users/no/Documents/ChatGPT/el alteno website/el-alteno-website/DEPLOYMENT.md` only if the verified active host differs from the current documentation.

**Steps:**

1. Record which host serves the public domain and where `NEXT_PUBLIC_FORMSPREE_ID` is configured.
2. Record the verification date and outcome without storing mailbox contents or credentials.
3. Commit the documentation update separately from source changes.
