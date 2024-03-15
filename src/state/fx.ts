export function runFx(fn: () => void) {
  // signia doesn't like you updating atoms during the same tick as a reaction
  // so defer until the next frame to ensure the cycle is compete before state changes
  requestAnimationFrame(fn);
}
