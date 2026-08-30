import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import {
  resolveInsideProject,
  selectClips,
  validateManifestShape,
} from "./private-events-video-lib.mjs";

function manifest(overrides = {}) {
  return {
    version: 1,
    output: "public/videos/master.mp4",
    previewOutput: "public/videos/preview.mp4",
    video: { width: 1920, height: 1080, fps: 30, audio: false },
    clips: [
      { id: "entrance", label: "Entrada", path: "clips/entrance.mp4", status: "pending", required: true },
      { id: "salon", label: "Salón", path: "clips/salon.mp4", status: "pending", required: true },
      { id: "bar", label: "Bar", path: "clips/bar.mp4", status: "approved", required: true },
      { id: "patio", label: "Patio", path: "clips/patio.mp4", status: "approved", required: true },
    ],
    ...overrides,
  };
}

test("accepts the silent 1080p production contract", () => {
  assert.doesNotThrow(() => validateManifestShape(manifest()));
});

test("rejects duplicate clip IDs", () => {
  const value = manifest();
  value.clips[1].id = "entrance";
  assert.throws(() => validateManifestShape(value), /duplicate clip id/i);
});

test("rejects unsupported statuses", () => {
  const value = manifest();
  value.clips[0].status = "draft";
  assert.throws(() => validateManifestShape(value), /invalid status/i);
});

test("rejects audio in the current production contract", () => {
  const value = manifest();
  value.video.audio = true;
  assert.throws(() => validateManifestShape(value), /audio must remain disabled/i);
});

test("rejects paths outside the app directory", () => {
  const root = path.join(os.tmpdir(), "el-alteno-video-root");
  assert.throws(() => resolveInsideProject(root, "../outside.mp4"), /outside the project/i);
});

test("final render rejects required pending clips", () => {
  const root = mkdtempSync(path.join(os.tmpdir(), "el-alteno-video-"));
  try {
    assert.throws(
      () => selectClips(manifest(), "render", () => true, root),
      /Entrada, Salón/,
    );
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("preview selects only approved existing clips in manifest order", () => {
  const root = mkdtempSync(path.join(os.tmpdir(), "el-alteno-video-"));
  try {
    mkdirSync(path.join(root, "clips"), { recursive: true });
    writeFileSync(path.join(root, "clips", "bar.mp4"), "bar");
    writeFileSync(path.join(root, "clips", "patio.mp4"), "patio");

    const selected = selectClips(manifest(), "preview", (file) => file.endsWith("bar.mp4") || file.endsWith("patio.mp4"), root);
    assert.deepEqual(selected.map((clip) => clip.id), ["bar", "patio"]);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
