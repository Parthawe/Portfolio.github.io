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

// Reference templates (generated once, cached)
let templates: { letter: string; data: Float32Array }[] | null = null

/**
 * Generate reference templates by rendering each letter
 * with multiple fonts into 28×28 canvases.
 */
function buildTemplates(): { letter: string; data: Float32Array }[] {
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

  const result: { letter: string; data: Float32Array }[] = []

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

      result.push({ letter, data })
    }
  }

  return result
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

export function classifyDrawing(grid: Float32Array): { letter: string; confidence: number } {
  if (!templates) templates = buildTemplates()

  let bestLetter = ''
  let bestScore = -1

  // Score each letter (max across all font variants)
  const letterScores = new Map<string, number>()

  for (const tmpl of templates) {
    const sim = cosineSim(grid, tmpl.data)
    const prev = letterScores.get(tmpl.letter) || -1
    if (sim > prev) letterScores.set(tmpl.letter, sim)
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
