import test from "node:test";
import assert from "node:assert/strict";
import { getViewportCorrection } from "../src/lib/menuScroll.ts";

test("restores the measured category-selector displacement", () => {
  assert.equal(getViewportCorrection(454, 745), 291);
  assert.equal(getViewportCorrection(745, 454), -291);
});

test("ignores sub-pixel noise and invalid measurements", () => {
  assert.equal(getViewportCorrection(454, 454.5), 0);
  assert.equal(getViewportCorrection(null, 454), 0);
  assert.equal(getViewportCorrection(454, null), 0);
  assert.equal(getViewportCorrection(Number.NaN, 454), 0);
});
