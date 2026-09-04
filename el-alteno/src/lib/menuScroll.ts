export function getViewportCorrection(
  beforeTop: number | null,
  afterTop: number | null
): number {
  if (
    beforeTop === null ||
    afterTop === null ||
    !Number.isFinite(beforeTop) ||
    !Number.isFinite(afterTop)
  ) {
    return 0;
  }

  const delta = afterTop - beforeTop;
  return Math.abs(delta) < 1 ? 0 : delta;
}
