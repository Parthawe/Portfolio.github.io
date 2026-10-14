export type Instrument = 'harp' | 'flute' | 'rain'
export const instruments: Instrument[] = ['harp', 'flute', 'rain']
export const names = { harp: 'Mechanized harp', flute: 'Automated flute', rain: 'Rainsticks' }
export const clamp = (n: number, low: number, high: number) => Math.min(high, Math.max(low, n))
// Illustrative cycle: load the string, release it, then return the pick.
export function pluckAt(seconds: number) {
  const t = clamp(seconds, 0, 1.3)
  const load = t < .3 ? Math.sin(t / .3 * Math.PI / 2) : Math.exp(-(t - .3) * 10)
  return { angle: -32 * load, deflection: t < .3 ? load * 4 : Math.sin((t - .3) * 70) * Math.exp(-(t - .3) * 5) * 3, released: t >= .3, done: t >= 1.3 }
}
// Conjugate a planar rotation into the drawing's oblique x/z projection.
export function planeRotation(degrees: number, pivot: number[], projection: { azimuth: number; elevation: number }, plane: 'xz' | 'yz' = 'xz') {
  const a = projection.azimuth * Math.PI / 180, e = projection.elevation * Math.PI / 180
  const m = plane === 'xz' ? Math.sin(a) : -Math.cos(a), n = (plane === 'xz' ? Math.cos(a) : Math.sin(a)) * Math.sin(e), q = -Math.cos(e)
  const r = degrees * Math.PI / 180, c = Math.cos(r), s = Math.sin(r)
  const A = c + n * s / q, B = -m * s / q, C = (q * s + n * n * s / q) / m, D = c - n * s / q
  return `matrix(${A} ${C} ${B} ${D} ${pivot[0] - A * pivot[0] - B * pivot[1]} ${pivot[1] - C * pivot[0] - D * pivot[1]})`
}
export function demoFrequency(index: number) { return 196 * 2 ** ([0, 2, 4, 7, 9, 12, 14, 16, 19, 21, 24][clamp(index, 0, 10)] / 12) }

// An open hole nearer the air inlet shortens the sounding column. This is a
// qualitative demonstration, not measured fingering or tuning from the instrument.
export function flutePitchStep(holes: boolean[]) {
  const firstOpen = holes.findIndex(closed => !closed)
  return 6 - (firstOpen < 0 ? holes.length : firstOpen)
}
