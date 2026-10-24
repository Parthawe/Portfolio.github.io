// Explicit scene time keeps pause, reduced motion and recordings deterministic.
export const phase = (time: number, duration: number) => ((time % duration) + duration) % duration / duration
export const ease = (value: number) => { const v = Math.min(1, Math.max(0, value)); return v * v * (3 - 2 * v) }

/** Walk, pause, turn, and return. Position is continuous at the loop boundary. */
export function patrol(time: number, duration: number) {
  const p = phase(time, duration)
  if (p < .08) return { position: 0, facing: 1, walking: false }
  if (p < .45) return { position: ease((p - .08) / .37), facing: 1, walking: true }
  if (p < .58) return { position: 1, facing: p < .56 ? 1 : -1, walking: false }
  if (p < .95) return { position: 1 - ease((p - .58) / .37), facing: -1, walking: true }
  return { position: 0, facing: -1, walking: false }
}

/** A staged pickup/lift/carry/lower/release cycle, rather than an orbiting arm. */
export function parcelArm(time: number) {
  const p = phase(time, 10) * 8
  const path = [[8, -25], [8, -1], [8, -1], [8, -30], [61, -30], [61, 5], [61, -30], [8, -25], [8, -25]]
  const index = Math.floor(p), mix = ease(p - index), a = path[index], b = path[index + 1]
  return { x: a[0] + (b[0] - a[0]) * mix, y: a[1] + (b[1] - a[1]) * mix, carrying: p >= 2 && p < 5, pickup: p < 2, delivered: p >= 5 }
}
