import { spawnSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  resolveInsideProject,
  selectClips,
  validateManifestShape,
} from "./private-events-video-lib.mjs";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, "..");
const manifestPath = path.join(projectRoot, "video", "private-events-manifest.json");
const mode = process.argv[2] ?? "check";
const requestedEncoder = process.argv.find((argument) => argument.startsWith("--encoder="))?.split("=")[1] ?? "auto";

function run(executable, args, options = {}) {
  const result = spawnSync(executable, args, {
    cwd: projectRoot,
    encoding: "utf8",
    stdio: options.capture ? "pipe" : "inherit",
    windowsHide: true,
  });

  if (result.error) {
    throw result.error;
  }
  if (result.status !== 0) {
    const detail = options.capture ? `\n${result.stderr || result.stdout}` : "";
    throw new Error(`${path.basename(executable)} exited with code ${result.status}.${detail}`);
  }

  return result.stdout ?? "";
}

function executableWorks(executable, versionArgument = "-version") {
  const result = spawnSync(executable, [versionArgument], {
    encoding: "utf8",
    stdio: "pipe",
    windowsHide: true,
  });
  return !result.error && result.status === 0;
}

function findWingetExecutable(name) {
  if (process.platform !== "win32" || !process.env.LOCALAPPDATA) {
    return null;
  }

  const packagesRoot = path.join(process.env.LOCALAPPDATA, "Microsoft", "WinGet", "Packages");
  if (!existsSync(packagesRoot)) {
    return null;
  }

  const packageDirectory = readdirSync(packagesRoot, { withFileTypes: true })
    .find((entry) => entry.isDirectory() && entry.name.startsWith("Gyan.FFmpeg_"));
  if (!packageDirectory) {
    return null;
  }

  const packageRoot = path.join(packagesRoot, packageDirectory.name);
  const buildDirectory = readdirSync(packageRoot, { withFileTypes: true })
    .find((entry) => entry.isDirectory() && entry.name.startsWith("ffmpeg-") && entry.name.endsWith("_build"));
  if (!buildDirectory) {
    return null;
  }

  const candidate = path.join(packageRoot, buildDirectory.name, "bin", `${name}.exe`);
  return existsSync(candidate) ? candidate : null;
}

function findExecutable(name) {
  if (executableWorks(name)) {
    return name;
  }

  const wingetExecutable = findWingetExecutable(name);
  if (wingetExecutable && executableWorks(wingetExecutable)) {
    return wingetExecutable;
  }

  throw new Error(`${name} is not available. Install Gyan.FFmpeg with Winget and restart the shell.`);
}

function readManifest() {
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  validateManifestShape(manifest);
  resolveInsideProject(projectRoot, manifest.output);
  resolveInsideProject(projectRoot, manifest.previewOutput);
  for (const clip of manifest.clips) {
    resolveInsideProject(projectRoot, clip.path);
  }
  return manifest;
}

function supportsNvenc(ffmpeg) {
  const encoders = run(ffmpeg, ["-hide_banner", "-encoders"], { capture: true });
  if (!encoders.includes("h264_nvenc")) {
    return false;
  }

  const probe = spawnSync(ffmpeg, [
    "-hide_banner",
    "-loglevel", "error",
    "-f", "lavfi",
    "-i", "color=size=256x256:duration=0.1",
    "-frames:v", "1",
    "-c:v", "h264_nvenc",
    "-f", "null",
    process.platform === "win32" ? "NUL" : "/dev/null",
  ], {
    encoding: "utf8",
    stdio: "pipe",
    windowsHide: true,
  });

  return !probe.error && probe.status === 0;
}

function chooseEncoder(ffmpeg) {
  if (!new Set(["auto", "nvenc", "cpu"]).has(requestedEncoder)) {
    throw new Error(`Unsupported encoder option: ${requestedEncoder}. Use auto, nvenc, or cpu.`);
  }

  const nvencAvailable = supportsNvenc(ffmpeg);
  if (requestedEncoder === "nvenc" && !nvencAvailable) {
    throw new Error("NVENC was requested but h264_nvenc could not encode a test frame.");
  }

  return requestedEncoder === "cpu" || !nvencAvailable ? "cpu" : "nvenc";
}

function encoderArgs(encoder) {
  if (encoder === "nvenc") {
    return [
      "-c:v", "h264_nvenc",
      "-preset", "p6",
      "-tune", "hq",
      "-rc", "vbr",
      "-cq", "18",
      "-b:v", "0",
    ];
  }

  return ["-c:v", "libx264", "-preset", "medium", "-crf", "18"];
}

function normalizeClip(ffmpeg, clip, output, video, encoder) {
  const filter = [
    `scale=${video.width}:${video.height}:force_original_aspect_ratio=decrease`,
    `pad=${video.width}:${video.height}:(ow-iw)/2:(oh-ih)/2:black`,
    `fps=${video.fps}`,
    "setsar=1",
    "format=yuv420p",
  ].join(",");

  run(ffmpeg, [
    "-hide_banner",
    "-loglevel", "error",
    "-y",
    "-i", clip.absolutePath,
    "-map", "0:v:0",
    "-vf", filter,
    "-an",
    ...encoderArgs(encoder),
    "-g", String(video.fps * 2),
    "-pix_fmt", "yuv420p",
    "-movflags", "+faststart",
    output,
  ]);
}

function concatPath(file) {
  return file.replaceAll("\\", "/").replaceAll("'", "'\\''");
}

function probeOutput(ffprobe, output, video) {
  const raw = run(ffprobe, [
    "-v", "error",
    "-show_streams",
    "-show_format",
    "-of", "json",
    output,
  ], { capture: true });
  const probe = JSON.parse(raw);
  const videoStream = probe.streams.find((stream) => stream.codec_type === "video");
  const audioStreams = probe.streams.filter((stream) => stream.codec_type === "audio");
  const [fpsNumerator, fpsDenominator] = String(videoStream?.r_frame_rate ?? "0/1").split("/").map(Number);
  const actualFps = fpsDenominator ? fpsNumerator / fpsDenominator : 0;

  if (
    videoStream?.codec_name !== "h264" ||
    videoStream.width !== video.width ||
    videoStream.height !== video.height ||
    Math.abs(actualFps - video.fps) > 0.01 ||
    audioStreams.length > 0
  ) {
    throw new Error("Rendered output does not satisfy the silent 1080p production contract.");
  }

  return Number(probe.format.duration);
}

function printCheck(manifest, ffmpeg, ffprobe, encoder) {
  console.log("Private Events video pipeline");
  console.log(`FFmpeg: ${ffmpeg}`);
  console.log(`FFprobe: ${ffprobe}`);
  console.log(`Encoder: ${encoder === "nvenc" ? "NVIDIA h264_nvenc" : "CPU libx264"}`);
  console.log("Audio: disabled");
  console.log("Order:");

  manifest.clips.forEach((clip, index) => {
    const absolutePath = resolveInsideProject(projectRoot, clip.path);
    const fileState = existsSync(absolutePath) ? "file ready" : "file missing";
    console.log(`  ${index + 1}. ${clip.label}: ${clip.status} (${fileState})`);
  });
}

function render(manifest, ffmpeg, ffprobe, encoder, renderMode) {
  const clips = selectClips(manifest, renderMode, existsSync, projectRoot);
  const outputRelative = renderMode === "preview" ? manifest.previewOutput : manifest.output;
  const output = resolveInsideProject(projectRoot, outputRelative);
  const temporaryDirectory = mkdtempSync(path.join(os.tmpdir(), "el-alteno-private-events-"));

  try {
    const normalized = clips.map((clip, index) => {
      const outputFile = path.join(temporaryDirectory, `${String(index).padStart(2, "0")}-${clip.id}.mp4`);
      console.log(`Normalizing ${clip.label} with ${encoder === "nvenc" ? "NVENC" : "CPU"}...`);
      normalizeClip(ffmpeg, clip, outputFile, manifest.video, encoder);
      return outputFile;
    });

    const concatFile = path.join(temporaryDirectory, "concat.txt");
    writeFileSync(concatFile, normalized.map((file) => `file '${concatPath(file)}'`).join("\n"), "utf8");
    mkdirSync(path.dirname(output), { recursive: true });

    run(ffmpeg, [
      "-hide_banner",
      "-loglevel", "error",
      "-y",
      "-f", "concat",
      "-safe", "0",
      "-i", concatFile,
      "-c", "copy",
      "-movflags", "+faststart",
      output,
    ]);

    const duration = probeOutput(ffprobe, output, manifest.video);
    console.log(`Created ${path.relative(projectRoot, output)} (${duration.toFixed(3)} s, silent).`);
  } finally {
    rmSync(temporaryDirectory, { recursive: true, force: true });
  }
}

function main() {
  if (!new Set(["check", "preview", "render"]).has(mode)) {
    throw new Error(`Unsupported mode: ${mode}. Use check, preview, or render.`);
  }

  const manifest = readManifest();
  const ffmpeg = findExecutable("ffmpeg");
  const ffprobe = findExecutable("ffprobe");
  const encoder = chooseEncoder(ffmpeg);

  printCheck(manifest, ffmpeg, ffprobe, encoder);
  if (mode !== "check") {
    render(manifest, ffmpeg, ffprobe, encoder, mode);
  }
}

try {
  main();
} catch (error) {
  console.error(`Video pipeline error: ${error.message}`);
  process.exitCode = 1;
}
