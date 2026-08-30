import path from "node:path";

const ALLOWED_STATUSES = new Set(["pending", "approved"]);

function requireCondition(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

export function validateManifestShape(manifest) {
  requireCondition(manifest && typeof manifest === "object", "Manifest must be an object.");
  requireCondition(manifest.version === 1, "Manifest version must be 1.");
  requireCondition(typeof manifest.output === "string" && manifest.output.length > 0, "Manifest output is required.");
  requireCondition(
    typeof manifest.previewOutput === "string" && manifest.previewOutput.length > 0,
    "Manifest previewOutput is required.",
  );
  requireCondition(manifest.video && typeof manifest.video === "object", "Video settings are required.");
  requireCondition(Number.isInteger(manifest.video.width) && manifest.video.width > 0, "Video width must be a positive integer.");
  requireCondition(Number.isInteger(manifest.video.height) && manifest.video.height > 0, "Video height must be a positive integer.");
  requireCondition(Number.isInteger(manifest.video.fps) && manifest.video.fps > 0, "Video fps must be a positive integer.");
  requireCondition(manifest.video.audio === false, "Audio must remain disabled for this production contract.");
  requireCondition(Array.isArray(manifest.clips) && manifest.clips.length > 0, "Manifest clips are required.");

  const ids = new Set();
  for (const clip of manifest.clips) {
    requireCondition(clip && typeof clip === "object", "Each clip must be an object.");
    requireCondition(typeof clip.id === "string" && clip.id.length > 0, "Each clip requires an id.");
    requireCondition(!ids.has(clip.id), `Duplicate clip id: ${clip.id}`);
    ids.add(clip.id);
    requireCondition(typeof clip.label === "string" && clip.label.length > 0, `Clip ${clip.id} requires a label.`);
    requireCondition(typeof clip.path === "string" && clip.path.length > 0, `Clip ${clip.id} requires a path.`);
    requireCondition(ALLOWED_STATUSES.has(clip.status), `Invalid status for clip ${clip.id}: ${clip.status}`);
    requireCondition(typeof clip.required === "boolean", `Clip ${clip.id} requires a boolean required flag.`);
  }

  return manifest;
}

export function resolveInsideProject(projectRoot, relativePath) {
  requireCondition(typeof relativePath === "string" && relativePath.length > 0, "A relative project path is required.");
  requireCondition(!path.isAbsolute(relativePath), `Path is outside the project: ${relativePath}`);

  const root = path.resolve(projectRoot);
  const target = path.resolve(root, relativePath);
  const relative = path.relative(root, target);
  requireCondition(relative !== ".." && !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative), `Path is outside the project: ${relativePath}`);
  return target;
}

export function selectClips(manifest, mode, existsSync, projectRoot = process.cwd()) {
  validateManifestShape(manifest);
  requireCondition(mode === "render" || mode === "preview", `Unsupported selection mode: ${mode}`);

  if (mode === "render") {
    const pendingRequired = manifest.clips.filter((clip) => clip.required && clip.status !== "approved");
    requireCondition(
      pendingRequired.length === 0,
      `Required clips are not approved: ${pendingRequired.map((clip) => clip.label).join(", ")}`,
    );
  }

  const selected = manifest.clips
    .filter((clip) => clip.status === "approved")
    .map((clip) => ({
      ...clip,
      absolutePath: resolveInsideProject(projectRoot, clip.path),
    }));

  requireCondition(selected.length > 0, `No approved clips are available for ${mode}.`);
  const missing = selected.filter((clip) => !existsSync(clip.absolutePath));
  requireCondition(missing.length === 0, `Approved clip files are missing: ${missing.map((clip) => clip.label).join(", ")}`);

  return selected;
}
