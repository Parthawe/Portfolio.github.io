import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import opentype from 'opentype.js'

/**
 * Interactive glyph vector editor for Butler's Slice.
 *
 * Loads the actual OTF font, extracts real bezier paths, and lets users:
 *  - Click a letter to see its vector outline
 *  - Drag anchor points and control handles to reshape the glyph
 *  - Toggle fill/outline view
 *  - Reset to original
 *  - Switch between weights
 */

interface Point {
  x: number
  y: number
  type: 'M' | 'L' | 'C' | 'Q' | 'Z'
  // For cubic bezier: cp1x, cp1y, cp2x, cp2y
  cp1x?: number
  cp1y?: number
  cp2x?: number
  cp2y?: number
}

const FONT_URLS = [
  { label: 'Regular', url: "/Assets/Projects/Typeface/butlers-slice/Butler's_Slice.otf" },
  { label: 'Bold', url: "/Assets/Projects/Typeface/butlers-slice/Butler's_Slice-Bold.otf" },
  { label: 'Ultralight', url: "/Assets/Projects/Typeface/butlers-slice/Butler's_Slice-UltraLight.otf" },
]

const SUGGESTED_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split('')

/** Convert opentype path commands into our Point[] format */
function parseCommands(commands: opentype.PathCommand[]): Point[] {
  const pts: Point[] = []
  for (const cmd of commands) {
    switch (cmd.type) {
      case 'M':
        pts.push({ x: cmd.x, y: cmd.y, type: 'M' })
        break
      case 'L':
        pts.push({ x: cmd.x, y: cmd.y, type: 'L' })
        break
      case 'C':
        pts.push({ x: cmd.x, y: cmd.y, type: 'C', cp1x: cmd.x1, cp1y: cmd.y1, cp2x: cmd.x2, cp2y: cmd.y2 })
        break
      case 'Q':
        pts.push({ x: cmd.x, y: cmd.y, type: 'Q', cp1x: cmd.x1, cp1y: cmd.y1 })
        break
      case 'Z':
        pts.push({ x: 0, y: 0, type: 'Z' })
        break
    }
  }
  return pts
}

/** Build SVG path string from our Point[] */
function buildPathD(points: Point[]): string {
  const parts: string[] = []
  for (const p of points) {
    switch (p.type) {
      case 'M': parts.push(`M${p.x} ${p.y}`); break
      case 'L': parts.push(`L${p.x} ${p.y}`); break
      case 'C': parts.push(`C${p.cp1x} ${p.cp1y} ${p.cp2x} ${p.cp2y} ${p.x} ${p.y}`); break
      case 'Q': parts.push(`Q${p.cp1x} ${p.cp1y} ${p.x} ${p.y}`); break
      case 'Z': parts.push('Z'); break
    }
  }
  return parts.join(' ')
}

export default function GlyphEditor() {
  const [font, setFont] = useState<opentype.Font | null>(null)
  const [fontIdx, setFontIdx] = useState(0)
  const [loading, setLoading] = useState(true)
  const [char, setChar] = useState('A')
  const [points, setPoints] = useState<Point[]>([])
  const [originalPoints, setOriginalPoints] = useState<Point[]>([])
  const [showFill, setShowFill] = useState(true)
  const [showPoints, setShowPoints] = useState(true)
  const [dragIdx, setDragIdx] = useState<{ idx: number; field: 'main' | 'cp1' | 'cp2' } | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const [viewBox, setViewBox] = useState({ x: 0, y: 0, w: 800, h: 800 })
  const [hasEdited, setHasEdited] = useState(false)

  // Load font
  useEffect(() => {
    setLoading(true)
    const url = FONT_URLS[fontIdx].url
    opentype.load(url, (err, loadedFont) => {
      if (err || !loadedFont) {
        if (import.meta.env.DEV) console.error('Font load error:', err)
        setLoading(false)
        return
      }
      setFont(loadedFont)
      setLoading(false)
    })
  }, [fontIdx])

  // Extract glyph when font or char changes
  useEffect(() => {
    if (!font) return
    const glyph = font.charToGlyph(char)
    if (!glyph) return

    const fontSize = 600
    const path = glyph.getPath(100, 650, fontSize)
    const parsed = parseCommands(path.commands)
    setPoints(parsed)
    setOriginalPoints(parsed.map(p => ({ ...p })))
    setHasEdited(false)

    // Calculate viewBox from bounding box
    const bb = path.getBoundingBox()
    const pad = 60
    setViewBox({
      x: bb.x1 - pad,
      y: bb.y1 - pad,
      w: (bb.x2 - bb.x1) + pad * 2,
      h: (bb.y2 - bb.y1) + pad * 2,
    })
  }, [font, char])

  // SVG coordinate conversion
  const svgPoint = useCallback((clientX: number, clientY: number) => {
    const svg = svgRef.current
    if (!svg) return { x: 0, y: 0 }
    const rect = svg.getBoundingClientRect()
    const x = viewBox.x + (clientX - rect.left) / rect.width * viewBox.w
    const y = viewBox.y + (clientY - rect.top) / rect.height * viewBox.h
    return { x, y }
  }, [viewBox])

  // Drag handlers
  const handlePointerDown = useCallback((idx: number, field: 'main' | 'cp1' | 'cp2', e: React.PointerEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragIdx({ idx, field })
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }, [])

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragIdx) return
    const { x, y } = svgPoint(e.clientX, e.clientY)
    setPoints(prev => {
      const next = prev.map(p => ({ ...p }))
      const pt = next[dragIdx.idx]
      if (dragIdx.field === 'main') {
        const dx = x - pt.x
        const dy = y - pt.y
        pt.x = x
        pt.y = y
        // Move control points with the anchor
        if (pt.cp1x !== undefined) { pt.cp1x += dx; pt.cp1y! += dy }
        if (pt.cp2x !== undefined) { pt.cp2x += dx; pt.cp2y! += dy }
      } else if (dragIdx.field === 'cp1') {
        pt.cp1x = x
        pt.cp1y = y
      } else if (dragIdx.field === 'cp2') {
        pt.cp2x = x
        pt.cp2y = y
      }
      return next
    })
    setHasEdited(true)
  }, [dragIdx, svgPoint])

  const handlePointerUp = useCallback(() => {
    setDragIdx(null)
  }, [])

  const handleReset = useCallback(() => {
    setPoints(originalPoints.map(p => ({ ...p })))
    setHasEdited(false)
  }, [originalPoints])

  // Build the SVG path
  const pathD = useMemo(() => buildPathD(points), [points])

  // Point size relative to viewBox
  const pointRadius = Math.max(viewBox.w, viewBox.h) * 0.008
  const cpRadius = pointRadius * 0.7

  return (
    <section className="glyph-editor reveal">
      <div className="wrap">
        {/* ── Controls bar ── */}
        <div className="ge-controls">
          <div className="ge-control-group ge-char-input-group">
            <label className="ge-label">Character</label>
            <input
              type="text"
              className="ge-char-input"
              value={char}
              onChange={e => {
                const v = e.target.value
                if (v.length > 0) setChar(v[v.length - 1])
              }}
              maxLength={2}
            />
          </div>

          <div className="ge-control-group">
            <label className="ge-label">Weight</label>
            <div className="ge-weight-tabs">
              {FONT_URLS.map((f, i) => (
                <button
                  key={f.label}
                  className={`ge-weight-tab ${i === fontIdx ? 'active' : ''}`}
                  onClick={() => setFontIdx(i)}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="ge-control-group">
            <label className="ge-label">View</label>
            <div className="ge-toggles">
              <button
                className={`ge-toggle ${showFill ? 'active' : ''}`}
                onClick={() => setShowFill(s => !s)}
              >
                Fill
              </button>
              <button
                className={`ge-toggle ${showPoints ? 'active' : ''}`}
                onClick={() => setShowPoints(s => !s)}
              >
                Points
              </button>
            </div>
          </div>

          {hasEdited && (
            <motion.button
              className="ge-reset"
              onClick={handleReset}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              Reset
            </motion.button>
          )}
        </div>

        {/* ── SVG editor area ── */}
        <div className="ge-canvas-wrap">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                className="ge-loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Loading font...
              </motion.div>
            ) : (
              <motion.div
                key={`${char}-${fontIdx}`}
                className="ge-canvas"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <svg
                  ref={svgRef}
                  viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`}
                  className="ge-svg"
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerLeave={handlePointerUp}
                >
                  {/* Grid lines */}
                  <line
                    x1={viewBox.x} y1={650}
                    x2={viewBox.x + viewBox.w} y2={650}
                    stroke="var(--ink-06)" strokeWidth={pointRadius * 0.3}
                  />
                  <line
                    x1={100} y1={viewBox.y}
                    x2={100} y2={viewBox.y + viewBox.h}
                    stroke="var(--ink-06)" strokeWidth={pointRadius * 0.3}
                  />

                  {/* Glyph fill */}
                  <path
                    d={pathD}
                    fill={showFill ? 'var(--ink-08)' : 'none'}
                    stroke="var(--ink)"
                    strokeWidth={showFill ? 0 : pointRadius * 0.4}
                    style={{ transition: 'fill 0.2s' }}
                  />

                  {/* Outline always visible */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke={showFill ? 'var(--ink-30)' : 'var(--ink)'}
                    strokeWidth={pointRadius * 0.3}
                  />

                  {/* Control handles and points */}
                  {showPoints && points.map((pt, i) => {
                    if (pt.type === 'Z') return null
                    const elements: React.ReactNode[] = []

                    // Control point 1 handle line + dot
                    if (pt.cp1x !== undefined && pt.cp1y !== undefined) {
                      // Find the previous anchor for cp1 line
                      let prevAnchor = { x: pt.x, y: pt.y }
                      for (let j = i - 1; j >= 0; j--) {
                        if (points[j].type !== 'Z') {
                          prevAnchor = { x: points[j].x, y: points[j].y }
                          break
                        }
                      }
                      elements.push(
                        <line
                          key={`cp1-line-${i}`}
                          x1={prevAnchor.x} y1={prevAnchor.y}
                          x2={pt.cp1x} y2={pt.cp1y}
                          stroke="#0D99FF" strokeWidth={pointRadius * 0.2}
                          opacity={0.5}
                        />,
                        <circle
                          key={`cp1-${i}`}
                          cx={pt.cp1x} cy={pt.cp1y} r={cpRadius}
                          fill="#0D99FF" stroke="#fff" strokeWidth={pointRadius * 0.15}
                          className="ge-handle"
                          role="button"
                          aria-label={`Control point 1 for point ${i}`}
                          onPointerDown={e => handlePointerDown(i, 'cp1', e)}
                        />
                      )
                    }

                    // Control point 2 handle line + dot
                    if (pt.cp2x !== undefined && pt.cp2y !== undefined) {
                      elements.push(
                        <line
                          key={`cp2-line-${i}`}
                          x1={pt.x} y1={pt.y}
                          x2={pt.cp2x} y2={pt.cp2y}
                          stroke="#A259FF" strokeWidth={pointRadius * 0.2}
                          opacity={0.5}
                        />,
                        <circle
                          key={`cp2-${i}`}
                          cx={pt.cp2x} cy={pt.cp2y} r={cpRadius}
                          fill="#A259FF" stroke="#fff" strokeWidth={pointRadius * 0.15}
                          className="ge-handle"
                          role="button"
                          aria-label={`Control point 2 for point ${i}`}
                          onPointerDown={e => handlePointerDown(i, 'cp2', e)}
                        />
                      )
                    }

                    // Main anchor point
                    elements.push(
                      <rect
                        key={`anchor-${i}`}
                        x={pt.x - pointRadius} y={pt.y - pointRadius}
                        width={pointRadius * 2} height={pointRadius * 2}
                        fill="#fff" stroke="var(--ink)" strokeWidth={pointRadius * 0.2}
                        rx={pt.type === 'C' || pt.type === 'Q' ? 0 : pointRadius * 0.3}
                        className="ge-handle"
                        role="button"
                        aria-label={`Anchor point ${i}`}
                        onPointerDown={e => handlePointerDown(i, 'main', e)}
                      />
                    )

                    return elements
                  })}
                </svg>

                {/* Glyph info overlay */}
                <div className="ge-info">
                  <span className="ge-info-char">{char}</span>
                  <span className="ge-info-unicode">U+{char.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0')}</span>
                  <span className="ge-info-points">{points.filter(p => p.type !== 'Z').length} points</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Quick character picker ── */}
        <div className="ge-chars">
          {SUGGESTED_CHARS.map(c => (
            <button
              key={c}
              className={`ge-char-btn ${c === char ? 'active' : ''}`}
              onClick={() => setChar(c)}
              style={{ fontFamily: '"Butlers Slice", Georgia, serif' }}
            >
              {c}
            </button>
          ))}
        </div>

        {/* ── Hint ── */}
        <p className="ge-hint">Drag the white anchor points or coloured control handles to reshape the glyph</p>
      </div>
    </section>
  )
}
