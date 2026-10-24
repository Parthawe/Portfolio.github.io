// Explicit scene time keeps pause, reduced motion and recordings deterministic.
export const phase = (time: number, duration: number) => ((time % duration) + duration) % duration / duration
export const ease = (value: number) => { const v = Math.min(1, Math.max(0, value)); return v * v * (3 - 2 * v) }

/** Walk, pause, turn, and return. Position is continuous at the loop boundary. */
export function patrol(time: number, duration: number) {
  const p = phase(time, duration)
  if (p < .08) return { position: 0, facing: 1, walking: false, blend: 0 }
  if (p < .45) { const u = (p - .08) / .37; return { position: ease(u), facing: 1, walking: true, blend: ease(u / .12) * ease((1 - u) / .12) } }
  if (p < .58) return { position: 1, facing: p < .56 ? 1 : -1, walking: false, blend: 0 }
  if (p < .95) { const u = (p - .58) / .37; return { position: 1 - ease(u), facing: -1, walking: true, blend: ease(u / .12) * ease((1 - u) / .12) } }
  return { position: 0, facing: -1, walking: false, blend: 0 }
}

/** A staged pickup/lift/carry/lower/release cycle, rather than an orbiting arm. */
export function parcelArm(time: number) {
  const p = phase(time, 10) * 8
  const path = [[8, -25], [8, -1], [8, -1], [8, -30], [61, -30], [61, 5], [61, -30], [8, -25], [8, -25]]
  const index = Math.floor(p), mix = ease(p - index), a = path[index], b = path[index + 1]
  return { x: a[0] + (b[0] - a[0]) * mix, y: a[1] + (b[1] - a[1]) * mix, carrying: p >= 2 && p < 5, pickup: p < 2, delivered: p >= 5 }
}

/** Distance-driven feet: the supporting foot cancels the body's travel. */
export function walkingFeet(distance: number, stepLength = 12) {
  const foot = (offset: number) => {
    const p = phase(distance / (stepLength * 2) + offset, 1)
    if (p < .5) return { x: stepLength / 2 - p * stepLength * 2, y: 0, planted: true }
    const swing = (p - .5) * 2
    return { x: -stepLength / 2 + ease(swing) * stepLength, y: -Math.sin(swing * Math.PI) * 2.5, planted: false }
  }
  return { left: foot(0), right: foot(.5) }
}

export function watering(time: number) {
  const p = phase(time, 12)
  return ease((p - .45) / .025) * ease((.56 - p) / .025)
}

// Pose changes may hold on twos while travel and machinery use continuous time.
export const characterTime = (time: number) => Math.floor(time * 12) / 12
