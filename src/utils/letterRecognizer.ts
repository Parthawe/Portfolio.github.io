/* ═══════════════════════════════════════════════════════════
   Letter Recognizer — handwriting → letter classification

   Pipeline:
   1. User draws on a canvas
   2. Drawing is normalized to 28×28 grayscale grid
   3. Compared against reference templates using cosine similarity
   4. Templates are rendered from multiple fonts at startup

   No external ML model needed — pure canvas + math.
   Accuracy is good for clearly drawn capitals (A–Z).
   ═══════════════════════════════════════════════════════════ */

const SIZE = 28
const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

type LetterTemplate = {
  letter: string
  data: Float32Array
  weight: number
}

type InkFeatures = {
  aspect: number
  topRatio: number
  midRatio: number
  bottomRatio: number
  leftRatio: number
  centerRatio: number
  rightRatio: number
  leftStem: number
  holes: number
  bboxArea: number
}

export type StrokePoint = {
  x: number
  y: number
}

// Reference templates (generated once, cached)
let templates: LetterTemplate[] | null = null

/**
 * Generate reference templates by rendering each letter
 * with multiple fonts into 28×28 canvases.
 */
function buildTemplates(): LetterTemplate[] {
  const canvas = document.createElement('canvas')
  canvas.width = SIZE
  canvas.height = SIZE
  const ctx = canvas.getContext('2d')!

  const fonts = [
    'bold 22px Arial',
    'bold 22px Georgia',
    'bold 20px Courier New',
    'bold 22px Helvetica',
    '22px sans-serif',
    'italic bold 22px serif',
  ]

  const result: LetterTemplate[] = []

  for (const letter of LETTERS) {
    for (const font of fonts) {
      ctx.clearRect(0, 0, SIZE, SIZE)
      ctx.fillStyle = '#fff'
      ctx.font = font
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(letter, SIZE / 2, SIZE / 2 + 1)

      const data = extractGrid(ctx)
      // Templates stay sharp — blur only applied to user drawings for tolerance
      normalize(data)

      result.push({ letter, data, weight: 0.9 })

      ctx.clearRect(0, 0, SIZE, SIZE)
      ctx.strokeStyle = '#fff'
      ctx.lineWidth = 1.8
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.font = font
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.strokeText(letter, SIZE / 2, SIZE / 2 + 1)

      const outline = blur3x3(extractGrid(ctx), SIZE)
      normalize(outline)
      result.push({ letter, data: outline, weight: 1.08 })
    }

    for (const data of buildStrokeTemplates(letter)) {
      result.push({ letter, data, weight: 1.22 })
    }
  }

  return result
}

function buildStrokeTemplates(letter: string): Float32Array[] {
  const variants: Array<{ sx: number; sy: number; dx: number; dy: number }> = [
    { sx: 1, sy: 1, dx: 0, dy: 0 },
    { sx: 0.9, sy: 1.08, dx: 1.2, dy: -0.4 },
    { sx: 1.08, sy: 0.94, dx: -0.8, dy: 0.8 },
  ]

  return variants.map((variant) => {
    const canvas = document.createElement('canvas')
    canvas.width = SIZE
    canvas.height = SIZE
    const ctx = canvas.getContext('2d')!
    ctx.strokeStyle = '#fff'
    ctx.lineWidth = 3.1
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    ctx.save()
    ctx.translate(SIZE / 2 + variant.dx, SIZE / 2 + variant.dy)
    ctx.scale(variant.sx, variant.sy)
    ctx.translate(-SIZE / 2, -SIZE / 2)
    drawStrokeLetter(ctx, letter)
    ctx.restore()

    const data = blur3x3(extractGrid(ctx), SIZE)
    normalize(data)
    return data
  })
}

function p(x: number, y: number) {
  return { x: 5 + x * 18, y: 4 + y * 20 }
}

function moveTo(ctx: CanvasRenderingContext2D, x: number, y: number) {
  const point = p(x, y)
  ctx.moveTo(point.x, point.y)
}

function lineTo(ctx: CanvasRenderingContext2D, x: number, y: number) {
  const point = p(x, y)
  ctx.lineTo(point.x, point.y)
}

function quadTo(ctx: CanvasRenderingContext2D, cx: number, cy: number, x: number, y: number) {
  const control = p(cx, cy)
  const point = p(x, y)
  ctx.quadraticCurveTo(control.x, control.y, point.x, point.y)
}

function drawStrokeLetter(ctx: CanvasRenderingContext2D, letter: string): void {
  ctx.beginPath()

  switch (letter) {
    case 'A':
      moveTo(ctx, 0.05, 1); lineTo(ctx, 0.5, 0); lineTo(ctx, 0.95, 1); moveTo(ctx, 0.25, 0.58); lineTo(ctx, 0.75, 0.58); break
    case 'B':
      moveTo(ctx, 0.12, 0); lineTo(ctx, 0.12, 1); moveTo(ctx, 0.12, 0.02); quadTo(ctx, 0.95, 0.05, 0.72, 0.48); quadTo(ctx, 0.42, 0.55, 0.12, 0.5); moveTo(ctx, 0.12, 0.5); quadTo(ctx, 1.02, 0.55, 0.78, 0.98); quadTo(ctx, 0.42, 1.04, 0.12, 1); break
    case 'C':
      moveTo(ctx, 0.88, 0.15); quadTo(ctx, 0.2, -0.05, 0.1, 0.5); quadTo(ctx, 0.18, 1.04, 0.88, 0.86); break
    case 'D':
      moveTo(ctx, 0.12, 0); lineTo(ctx, 0.12, 1); moveTo(ctx, 0.12, 0.02); quadTo(ctx, 1.02, 0.5, 0.12, 0.98); break
    case 'E':
      moveTo(ctx, 0.88, 0.02); lineTo(ctx, 0.12, 0.02); lineTo(ctx, 0.12, 1); lineTo(ctx, 0.9, 1); moveTo(ctx, 0.12, 0.5); lineTo(ctx, 0.72, 0.5); break
    case 'F':
      moveTo(ctx, 0.12, 1); lineTo(ctx, 0.12, 0.02); lineTo(ctx, 0.9, 0.02); moveTo(ctx, 0.12, 0.5); lineTo(ctx, 0.72, 0.5); break
    case 'G':
      moveTo(ctx, 0.88, 0.18); quadTo(ctx, 0.18, -0.03, 0.1, 0.52); quadTo(ctx, 0.18, 1.02, 0.9, 0.86); lineTo(ctx, 0.9, 0.6); lineTo(ctx, 0.58, 0.6); break
    case 'H':
      moveTo(ctx, 0.12, 0); lineTo(ctx, 0.12, 1); moveTo(ctx, 0.88, 0); lineTo(ctx, 0.88, 1); moveTo(ctx, 0.12, 0.52); lineTo(ctx, 0.88, 0.52); break
    case 'I':
      moveTo(ctx, 0.22, 0.02); lineTo(ctx, 0.78, 0.02); moveTo(ctx, 0.5, 0.02); lineTo(ctx, 0.5, 1); moveTo(ctx, 0.22, 1); lineTo(ctx, 0.78, 1); break
    case 'J':
      moveTo(ctx, 0.18, 0.02); lineTo(ctx, 0.86, 0.02); moveTo(ctx, 0.64, 0.02); lineTo(ctx, 0.64, 0.78); quadTo(ctx, 0.58, 1.06, 0.18, 0.88); break
    case 'K':
      moveTo(ctx, 0.14, 0); lineTo(ctx, 0.14, 1); moveTo(ctx, 0.9, 0.02); lineTo(ctx, 0.18, 0.56); lineTo(ctx, 0.9, 1); break
    case 'L':
      moveTo(ctx, 0.14, 0); lineTo(ctx, 0.14, 1); lineTo(ctx, 0.88, 1); break
    case 'M':
      moveTo(ctx, 0.08, 1); lineTo(ctx, 0.08, 0); lineTo(ctx, 0.5, 0.58); lineTo(ctx, 0.92, 0); lineTo(ctx, 0.92, 1); break
    case 'N':
      moveTo(ctx, 0.12, 1); lineTo(ctx, 0.12, 0); lineTo(ctx, 0.88, 1); lineTo(ctx, 0.88, 0); break
    case 'O':
      moveTo(ctx, 0.5, 0); quadTo(ctx, 1, 0.08, 0.9, 0.55); quadTo(ctx, 0.82, 1.04, 0.48, 1); quadTo(ctx, 0, 0.92, 0.1, 0.45); quadTo(ctx, 0.18, 0.04, 0.5, 0); break
    case 'P':
      moveTo(ctx, 0.12, 1); lineTo(ctx, 0.12, 0); moveTo(ctx, 0.12, 0.02); quadTo(ctx, 0.95, 0.08, 0.72, 0.5); quadTo(ctx, 0.42, 0.58, 0.12, 0.5); break
    case 'Q':
      moveTo(ctx, 0.5, 0); quadTo(ctx, 1, 0.08, 0.9, 0.55); quadTo(ctx, 0.82, 1.04, 0.48, 1); quadTo(ctx, 0, 0.92, 0.1, 0.45); quadTo(ctx, 0.18, 0.04, 0.5, 0); moveTo(ctx, 0.6, 0.7); lineTo(ctx, 0.95, 1); break
    case 'R':
      moveTo(ctx, 0.12, 1); lineTo(ctx, 0.12, 0); moveTo(ctx, 0.12, 0.02); quadTo(ctx, 0.95, 0.08, 0.72, 0.48); quadTo(ctx, 0.42, 0.56, 0.12, 0.5); moveTo(ctx, 0.45, 0.52); lineTo(ctx, 0.92, 1); break
    case 'S':
      moveTo(ctx, 0.88, 0.12); quadTo(ctx, 0.08, 0, 0.18, 0.42); quadTo(ctx, 0.22, 0.62, 0.72, 0.56); quadTo(ctx, 1, 0.86, 0.12, 0.92); break
    case 'T':
      moveTo(ctx, 0.08, 0.02); lineTo(ctx, 0.92, 0.02); moveTo(ctx, 0.5, 0.02); lineTo(ctx, 0.5, 1); break
    case 'U':
      moveTo(ctx, 0.12, 0); lineTo(ctx, 0.12, 0.72); quadTo(ctx, 0.5, 1.15, 0.88, 0.72); lineTo(ctx, 0.88, 0); break
    case 'V':
      moveTo(ctx, 0.08, 0); lineTo(ctx, 0.5, 1); lineTo(ctx, 0.92, 0); break
    case 'W':
      moveTo(ctx, 0.04, 0); lineTo(ctx, 0.24, 1); lineTo(ctx, 0.5, 0.45); lineTo(ctx, 0.76, 1); lineTo(ctx, 0.96, 0); break
    case 'X':
      moveTo(ctx, 0.1, 0); lineTo(ctx, 0.9, 1); moveTo(ctx, 0.9, 0); lineTo(ctx, 0.1, 1); break
    case 'Y':
      moveTo(ctx, 0.08, 0); lineTo(ctx, 0.5, 0.52); lineTo(ctx, 0.92, 0); moveTo(ctx, 0.5, 0.52); lineTo(ctx, 0.5, 1); break
    case 'Z':
      moveTo(ctx, 0.1, 0.02); lineTo(ctx, 0.9, 0.02); lineTo(ctx, 0.1, 1); lineTo(ctx, 0.9, 1); break
  }

  ctx.stroke()
}

/**
 * Extract grayscale grid from canvas context.
 */
function extractGrid(ctx: CanvasRenderingContext2D): Float32Array {
  const imageData = ctx.getImageData(0, 0, SIZE, SIZE)
  const grid = new Float32Array(SIZE * SIZE)
  for (let i = 0; i < SIZE * SIZE; i++) {
    // Use alpha channel (text on transparent bg) or red channel
    grid[i] = imageData.data[i * 4 + 3] / 255
  }
  return grid
}

/**
 * Simple 3×3 box blur.
 */
function blur3x3(src: Float32Array, w: number): Float32Array {
  const out = new Float32Array(src.length)
  for (let y = 0; y < w; y++) {
    for (let x = 0; x < w; x++) {
      let sum = 0, count = 0
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const ny = y + dy, nx = x + dx
          if (ny >= 0 && ny < w && nx >= 0 && nx < w) {
            sum += src[ny * w + nx]
            count++
          }
        }
      }
      out[y * w + x] = sum / count
    }
  }
  return out
}

/**
 * Normalize a vector to unit length (in place).
 */
function normalize(v: Float32Array): void {
  let mag = 0
  for (let i = 0; i < v.length; i++) mag += v[i] * v[i]
  mag = Math.sqrt(mag)
  if (mag > 0) {
    for (let i = 0; i < v.length; i++) v[i] /= mag
  }
}

/**
 * Cosine similarity between two unit vectors.
 */
function cosineSim(a: Float32Array, b: Float32Array): number {
  let dot = 0
  for (let i = 0; i < a.length; i++) dot += a[i] * b[i]
  return dot
}

function extractInkFeatures(grid: Float32Array): InkFeatures {
  let max = 0
  for (let i = 0; i < grid.length; i++) max = Math.max(max, grid[i])

  const threshold = max * 0.28
  const ink = new Uint8Array(grid.length)
  let minX = SIZE, minY = SIZE, maxX = -1, maxY = -1, total = 0
  const rows = new Float32Array(SIZE)
  const cols = new Float32Array(SIZE)

  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      const i = y * SIZE + x
      const value = grid[i]
      if (value > threshold) {
        ink[i] = 1
        minX = Math.min(minX, x)
        maxX = Math.max(maxX, x)
        minY = Math.min(minY, y)
        maxY = Math.max(maxY, y)
      }
      rows[y] += value
      cols[x] += value
      total += value
    }
  }

  if (!total || maxX < minX || maxY < minY) {
    return {
      aspect: 1,
      topRatio: 0,
      midRatio: 0,
      bottomRatio: 0,
      leftRatio: 0,
      centerRatio: 0,
      rightRatio: 0,
      leftStem: 0,
      holes: 0,
      bboxArea: 0,
    }
  }

  const bboxW = maxX - minX + 1
  const bboxH = maxY - minY + 1
  const topEnd = minY + Math.floor(bboxH * 0.33)
  const midEnd = minY + Math.floor(bboxH * 0.66)
  const leftEnd = minX + Math.floor(bboxW * 0.33)
  const centerEnd = minX + Math.floor(bboxW * 0.66)

  let top = 0, mid = 0, bottom = 0
  for (let y = minY; y <= maxY; y++) {
    if (y <= topEnd) top += rows[y]
    else if (y <= midEnd) mid += rows[y]
    else bottom += rows[y]
  }

  let left = 0, center = 0, right = 0
  for (let x = minX; x <= maxX; x++) {
    if (x <= leftEnd) left += cols[x]
    else if (x <= centerEnd) center += cols[x]
    else right += cols[x]
  }

  let stemRows = 0
  let stemColumnCoverage = 0
  const stemWidth = Math.max(2, Math.round(bboxW * 0.18))
  for (let y = minY; y <= maxY; y++) {
    let rowHit = false
    for (let x = minX; x < Math.min(minX + stemWidth, SIZE); x++) {
      if (ink[y * SIZE + x]) rowHit = true
    }
    if (rowHit) stemRows++
  }

  for (let x = minX; x < Math.min(minX + stemWidth, SIZE); x++) {
    let columnHits = 0
    for (let y = minY; y <= maxY; y++) {
      if (ink[y * SIZE + x]) columnHits++
    }
    stemColumnCoverage = Math.max(stemColumnCoverage, columnHits / Math.max(1, bboxH))
  }

  const holes = countHoles(ink, minX, minY, maxX, maxY)

  return {
    aspect: bboxW / Math.max(1, bboxH),
    topRatio: top / total,
    midRatio: mid / total,
    bottomRatio: bottom / total,
    leftRatio: left / total,
    centerRatio: center / total,
    rightRatio: right / total,
    leftStem: Math.max(stemColumnCoverage, stemRows / Math.max(1, bboxH) * 0.35),
    holes,
    bboxArea: (bboxW * bboxH) / (SIZE * SIZE),
  }
}

function countHoles(ink: Uint8Array, minX: number, minY: number, maxX: number, maxY: number): number {
  const visited = new Uint8Array(ink.length)
  let holes = 0

  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      const start = y * SIZE + x
      if (ink[start] || visited[start]) continue

      let touchesEdge = false
      const stack = [start]
      visited[start] = 1

      while (stack.length) {
        const current = stack.pop()!
        const cy = Math.floor(current / SIZE)
        const cx = current % SIZE
        if (cx === minX || cx === maxX || cy === minY || cy === maxY) touchesEdge = true

        const neighbors = [
          current - SIZE,
          current + SIZE,
          current - 1,
          current + 1,
        ]

        for (const next of neighbors) {
          const ny = Math.floor(next / SIZE)
          const nx = next % SIZE
          if (nx < minX || nx > maxX || ny < minY || ny > maxY) continue
          if (ink[next] || visited[next]) continue
          visited[next] = 1
          stack.push(next)
        }
      }

      if (!touchesEdge) holes++
    }
  }

  return holes
}

function shapeBonus(letter: string, features: InkFeatures): number {
  const { aspect, topRatio, midRatio, bottomRatio, leftRatio, rightRatio, leftStem, holes } = features
  let bonus = 0

  if ('BDEFHIKLPR'.includes(letter) && leftStem > 0.48) bonus += 0.08
  if ('OVDQRBP'.includes(letter) && holes > 0) bonus += 0.06
  if ('WVMY'.includes(letter) && holes > 0) bonus -= 0.14
  if ('WVMY'.includes(letter) && leftStem > 0.5) bonus -= 0.12

  if (letter === 'B') {
    if (holes === 0 && leftStem < 0.45) bonus -= 0.28
    if (leftStem > 0.58) bonus += 0.12
    if (holes > 0) bonus += 0.11
    if (midRatio > 0.24) bonus += 0.04
    if (rightRatio > 0.2 && topRatio > 0.18 && bottomRatio > 0.18) bonus += 0.06
    if (bottomRatio > topRatio * 1.55) bonus -= 0.08
  }

  if (letter === 'W') {
    if (holes === 0 && leftStem < 0.42 && aspect > 0.55 && bottomRatio > 0.28) bonus += 0.35
    if (bottomRatio > topRatio * 1.25 && leftStem < 0.38 && holes === 0) bonus += 0.1
    if (leftRatio > 0.44) bonus -= 0.06
  }

  if (letter === 'P' && leftStem > 0.58 && topRatio > bottomRatio * 1.25) bonus += 0.08
  if (letter === 'R' && leftStem > 0.5 && bottomRatio > 0.24 && holes > 0) bonus += 0.06
  if (letter === 'I' && aspect < 0.42) bonus += 0.08
  if (letter === 'L' && leftStem > 0.55 && bottomRatio > topRatio * 1.2) bonus += 0.07
  if (letter === 'T' && topRatio > 0.38) bonus += 0.07
  if (letter === 'M' && topRatio > bottomRatio && aspect > 0.65) bonus += 0.05

  if (letter === 'S' && holes > 0) bonus -= 0.1
  if ('IJLT'.includes(letter) && holes > 0) bonus -= 0.1
  if (letter === 'O' && holes > 0 && leftStem < 0.5) bonus += 0.07

  return bonus
}

/**
 * Process a drawing canvas into a normalized 28×28 grid.
 * Crops to bounding box, centers, and scales.
 */
export function processDrawing(sourceCanvas: HTMLCanvasElement): Float32Array {
  const srcCtx = sourceCanvas.getContext('2d')!
  const w = sourceCanvas.width
  const h = sourceCanvas.height
  const imageData = srcCtx.getImageData(0, 0, w, h)
  const pixels = imageData.data

  // Find bounding box of drawn content
  let minX = w, maxX = 0, minY = h, maxY = 0
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const a = pixels[(y * w + x) * 4 + 3]
      if (a > 30) {
        minX = Math.min(minX, x)
        maxX = Math.max(maxX, x)
        minY = Math.min(minY, y)
        maxY = Math.max(maxY, y)
      }
    }
  }

  // Nothing drawn
  if (minX > maxX || minY > maxY) return new Float32Array(SIZE * SIZE)

  // Crop and resize to SIZE×SIZE with padding
  const pad = 3
  const cropW = maxX - minX + 1
  const cropH = maxY - minY + 1
  const maxDim = Math.max(cropW, cropH)
  const scale = (SIZE - pad * 2) / maxDim

  const destCanvas = document.createElement('canvas')
  destCanvas.width = SIZE
  destCanvas.height = SIZE
  const destCtx = destCanvas.getContext('2d')!

  // Center the drawing
  const offX = pad + ((SIZE - pad * 2) - cropW * scale) / 2
  const offY = pad + ((SIZE - pad * 2) - cropH * scale) / 2

  destCtx.drawImage(
    sourceCanvas,
    minX, minY, cropW, cropH,
    offX, offY, cropW * scale, cropH * scale,
  )

  const grid = extractGrid(destCtx)
  const blurred = blur3x3(grid, SIZE)
  normalize(blurred)
  return blurred
}

/**
 * Classify a processed drawing against reference templates.
 * Returns top match + confidence.
 */
/**
 * Pre-build templates during idle time so first classify doesn't block.
 * Called when the drawing pad opens.
 */
export function prewarmTemplates(): void {
  if (!templates) {
    if ('requestIdleCallback' in window) {
      (window as unknown as { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(() => {
        if (!templates) templates = buildTemplates()
      })
    } else {
      setTimeout(() => { if (!templates) templates = buildTemplates() }, 100)
    }
  }
}

function samplePath(points: StrokePoint[], count: number): StrokePoint[] {
  if (points.length <= count) return points

  const distances = [0]
  let total = 0
  for (let i = 1; i < points.length; i++) {
    total += Math.hypot(points[i].x - points[i - 1].x, points[i].y - points[i - 1].y)
    distances.push(total)
  }

  if (total === 0) return [points[0]]

  const sampled: StrokePoint[] = []
  for (let i = 0; i < count; i++) {
    const target = (total * i) / (count - 1)
    let idx = 1
    while (idx < distances.length && distances[idx] < target) idx++
    const prev = Math.max(0, idx - 1)
    const next = Math.min(points.length - 1, idx)
    const span = distances[next] - distances[prev] || 1
    const t = (target - distances[prev]) / span
    sampled.push({
      x: points[prev].x + (points[next].x - points[prev].x) * t,
      y: points[prev].y + (points[next].y - points[prev].y) * t,
    })
  }

  return sampled
}

/**
 * Geometry-first recognition for stroke letters that raster templates often
 * confuse. It only returns when the gesture is very clear; all other drawings
 * fall back to template matching.
 */
export function classifyStrokePath(points: StrokePoint[], size: number): { letter: string; confidence: number } | null {
  if (points.length < 4 || size <= 0) return null

  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
  for (const point of points) {
    minX = Math.min(minX, point.x)
    maxX = Math.max(maxX, point.x)
    minY = Math.min(minY, point.y)
    maxY = Math.max(maxY, point.y)
  }

  const width = maxX - minX
  const height = maxY - minY
  if (width < size * 0.18 || height < size * 0.18) return null

  const normalized = points.map((point) => ({
    x: (point.x - minX) / Math.max(1, width),
    y: (point.y - minY) / Math.max(1, height),
  }))

  const sampled = samplePath(normalized, 9)
  const first = sampled[0]
  const last = sampled[sampled.length - 1]
  const xTravel = last.x - first.x
  let monotonicSteps = 0
  for (let i = 1; i < sampled.length; i++) {
    if (sampled[i].x >= sampled[i - 1].x - 0.08) monotonicSteps++
  }

  const mostlyLeftToRight = xTravel > 0.55 && monotonicSteps >= sampled.length - 2
  const topStart = first.y < 0.28
  const topEnd = last.y < 0.32
  const bottomReach = Math.max(...sampled.map((point) => point.y))
  const middleLift = Math.min(...sampled.slice(2, -2).map((point) => point.y))

  if (
    mostlyLeftToRight &&
    topStart &&
    topEnd &&
    bottomReach > 0.78 &&
    middleLift < 0.5 &&
    width / height > 0.72
  ) {
    return { letter: 'W', confidence: 0.9 }
  }

  if (
    mostlyLeftToRight &&
    topStart &&
    topEnd &&
    bottomReach > 0.82 &&
    width / height < 0.72
  ) {
    return { letter: 'V', confidence: 0.84 }
  }

  return null
}

export function classifyDrawing(grid: Float32Array): { letter: string; confidence: number } {
  if (!templates) templates = buildTemplates()

  let bestLetter = ''
  let bestScore = -1

  // Score each letter (max across all font variants)
  const letterScores = new Map<string, number>()

  for (const tmpl of templates) {
    const sim = cosineSim(grid, tmpl.data) * tmpl.weight
    const prev = letterScores.get(tmpl.letter) || -1
    if (sim > prev) letterScores.set(tmpl.letter, sim)
  }

  const features = extractInkFeatures(grid)
  for (const letter of LETTERS) {
    const current = letterScores.get(letter) || -1
    letterScores.set(letter, current + shapeBonus(letter, features))
  }

  for (const [letter, score] of letterScores) {
    if (score > bestScore) {
      bestScore = score
      bestLetter = letter
    }
  }

  // Map raw cosine similarity to a 0–1 confidence
  // Typical good match: 0.5–0.8, poor match: < 0.3
  const confidence = Math.max(0, Math.min(1, (bestScore - 0.15) / 0.55))

  return { letter: bestLetter, confidence }
}
