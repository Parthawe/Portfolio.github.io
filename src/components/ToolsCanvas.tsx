import { motion } from 'framer-motion'

/**
 * Figma-canvas-style tools section.
 * Big script typography as the centerpiece with realistic floating UI widgets.
 * Inspired by @myriam.phung's "my everyday tools in Figma" poster.
 */

/* ── Floating UI element data ── */
const floatingElements = [
  // Comment bubble with avatar (top-center area)
  { type: 'comment', x: 52, y: 6, rotate: -2 },
  // Color swatch + opacity (right side)
  { type: 'color', x: 72, y: 30, rotate: 3 },
  // Export dropdown (bottom-left)
  { type: 'export', x: 2, y: 72, rotate: 0 },
  // Toggle switch (left side)
  { type: 'toggle', x: 6, y: 44, rotate: 0 },
  // Checkbox (right-center)
  { type: 'checkbox', x: 68, y: 24, rotate: 0 },
  // Cursor with name tag (center)
  { type: 'cursor', x: 42, y: 40, rotate: 0 },
  // Blue measurement ruler (diagonal, top-right)
  { type: 'ruler', x: 48, y: 4, rotate: 32 },
  // Code icon (right)
  { type: 'code', x: 88, y: 68, rotate: -2 },
  // Date picker (bottom-center)
  { type: 'date', x: 50, y: 74, rotate: 0 },
  // URL bar (top)
  { type: 'url', x: 34, y: 2, rotate: -4 },
  // Follower badge (center-left, rotated)
  { type: 'badge', x: 18, y: 60, rotate: -55 },
  // Eye/visibility icon (right)
  { type: 'eye', x: 88, y: 40, rotate: 0 },
  // Selection handles (bottom-center area)
  { type: 'selection', x: 28, y: 62, rotate: -12 },
  // Plus/add icon (right-center)
  { type: 'add', x: 86, y: 58, rotate: 0 },
  // Toolbar (left edge)
  { type: 'toolbar', x: 0, y: 52, rotate: 0 },
  // Cursor name tag "Mymy" (right)
  { type: 'nametag', x: 80, y: 48, rotate: 0 },
  // Arrows / swipe (bottom-right)
  { type: 'arrows', x: 72, y: 82, rotate: 0 },
  // Component icon (small, scattered)
  { type: 'component', x: 36, y: 50, rotate: 0 },
  // Frame icon
  { type: 'frame', x: 18, y: 32, rotate: 5 },
  // Auto-layout icon
  { type: 'autolayout', x: 62, y: 80, rotate: 0 },
]

/* SVG icons used in the floating elements */
const CursorSvg = () => (
  <svg viewBox="0 0 16 22" width="16" height="22" fill="none">
    <path d="M1 1l5 19 3-7 7-3L1 1z" fill="#0D99FF" stroke="#fff" strokeWidth="1" />
  </svg>
)

const FrameIcon = () => (
  <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="#0D99FF" strokeWidth="1.5">
    <rect x="3" y="3" width="10" height="10" rx="1" />
    <line x1="3" y1="0" x2="3" y2="3" /><line x1="13" y1="0" x2="13" y2="3" />
    <line x1="3" y1="13" x2="3" y2="16" /><line x1="13" y1="13" x2="13" y2="16" />
    <line x1="0" y1="3" x2="3" y2="3" /><line x1="13" y1="3" x2="16" y2="3" />
    <line x1="0" y1="13" x2="3" y2="13" /><line x1="13" y1="13" x2="16" y2="13" />
  </svg>
)

const ComponentIcon = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
    <path d="M8 1L11 4L8 7L5 4Z" fill="#0D99FF" />
    <path d="M12 5L15 8L12 11L9 8Z" fill="#0D99FF" />
    <path d="M8 9L11 12L8 15L5 12Z" fill="#0D99FF" />
    <path d="M4 5L7 8L4 11L1 8Z" fill="#0D99FF" />
  </svg>
)

export default function ToolsCanvas() {
  return (
    <section className="tools-canvas reveal">
      <div className="sec-head">
        <span className="sec-label">Tools I reach for</span>
      </div>

      <div className="tools-canvas-area">
        {/* ── Main typography centerpiece ── */}
        <div className="tools-typo">
          <motion.span
            className="tools-typo-line tools-typo-my"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            my
          </motion.span>
          <motion.span
            className="tools-typo-line tools-typo-everyday"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            everyday
          </motion.span>
          <motion.span
            className="tools-typo-line tools-typo-tools"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          >
            tools
          </motion.span>
          <motion.span
            className="tools-typo-line tools-typo-in"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
          >
            in
          </motion.span>
          <motion.span
            className="tools-typo-line tools-typo-design"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            Design
          </motion.span>
        </div>

        {/* ── Floating UI elements ── */}
        {floatingElements.map((el, i) => (
          <motion.div
            key={`${el.type}-${i}`}
            className={`tools-float tools-float--${el.type}`}
            style={{ left: `${el.x}%`, top: `${el.y}%`, rotate: el.rotate }}
            initial={{ opacity: 0, scale: 0.85, y: 12 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.2 + i * 0.035 }}
          >
            {/* Comment bubble */}
            {el.type === 'comment' && (
              <div className="tools-ui-comment">
                <div className="tools-ui-comment-avatar">P</div>
                <div className="tools-ui-comment-body">
                  <span className="tools-ui-comment-meta">Parth Pawar <em>Just now</em></span>
                  <span className="tools-ui-comment-text">Can you make this design with auto-layout please?</span>
                </div>
              </div>
            )}

            {/* Color picker */}
            {el.type === 'color' && (
              <div className="tools-ui-color">
                <span className="tools-ui-color-swatch" style={{ background: '#BAB2FF' }} />
                <span className="tools-ui-color-hex">BAB2FF</span>
                <span className="tools-ui-color-opacity">100</span>
                <span className="tools-ui-color-pct">%</span>
              </div>
            )}

            {/* Export dropdown */}
            {el.type === 'export' && (
              <div className="tools-ui-export">
                <span className="tools-ui-export-row">PNG</span>
                <span className="tools-ui-export-row active">JPG</span>
                <span className="tools-ui-export-row">SVG</span>
                <span className="tools-ui-export-row">PDF</span>
              </div>
            )}

            {/* Toggle switch */}
            {el.type === 'toggle' && (
              <div className="tools-ui-toggle">
                <span className="tools-ui-toggle-track">
                  <span className="tools-ui-toggle-thumb" />
                </span>
              </div>
            )}

            {/* Checkbox */}
            {el.type === 'checkbox' && (
              <svg viewBox="0 0 20 20" width="22" height="22">
                <rect x="1" y="1" width="18" height="18" rx="4" fill="#0D99FF" />
                <path d="M5.5 10l3 3 5.5-6" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}

            {/* Cursor */}
            {el.type === 'cursor' && (
              <div className="tools-ui-cursor">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
                  <path d="M5 3v18l4-6h8L5 3z" fill="#1e1e1e" stroke="#fff" strokeWidth="1" />
                </svg>
              </div>
            )}

            {/* Blue measurement ruler */}
            {el.type === 'ruler' && (
              <div className="tools-ui-ruler">
                <div className="tools-ui-ruler-line">
                  <span className="tools-ui-ruler-dot" />
                  <span className="tools-ui-ruler-dot" />
                  <span className="tools-ui-ruler-dot" />
                  <span className="tools-ui-ruler-dot" />
                  <span className="tools-ui-ruler-dot" />
                  <span className="tools-ui-ruler-dot" />
                </div>
              </div>
            )}

            {/* Code icon */}
            {el.type === 'code' && (
              <div className="tools-ui-code">&lt;/&gt;</div>
            )}

            {/* Date picker */}
            {el.type === 'date' && (
              <div className="tools-ui-date">
                <span className="tools-ui-date-sep">|‖</span>
                <span>04</span>
                <span>2026</span>
                <svg viewBox="0 0 12 12" width="10" height="10"><path d="M3 5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" /></svg>
              </div>
            )}

            {/* URL bar */}
            {el.type === 'url' && (
              <div className="tools-ui-url">Type or paste URL</div>
            )}

            {/* Follower badge */}
            {el.type === 'badge' && (
              <div className="tools-ui-badge">
                <span className="tools-ui-badge-count">58.5 K followers</span>
                <span className="tools-ui-badge-tag">Love</span>
              </div>
            )}

            {/* Eye/visibility */}
            {el.type === 'eye' && (
              <svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="#0D99FF" strokeWidth="1.5">
                <path d="M1 10s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6z" />
                <circle cx="10" cy="10" r="3" />
              </svg>
            )}

            {/* Selection handles (blue square with dots) */}
            {el.type === 'selection' && (
              <div className="tools-ui-selection">
                <span className="sel-dot sel-tl" /><span className="sel-dot sel-tr" />
                <span className="sel-dot sel-bl" /><span className="sel-dot sel-br" />
                <span className="sel-dot sel-tm" /><span className="sel-dot sel-bm" />
                <span className="sel-dot sel-ml" /><span className="sel-dot sel-mr" />
              </div>
            )}

            {/* Plus/add */}
            {el.type === 'add' && (
              <svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="var(--ink-30)" strokeWidth="1.5">
                <circle cx="10" cy="10" r="8" />
                <line x1="10" y1="6" x2="10" y2="14" /><line x1="6" y1="10" x2="14" y2="10" />
              </svg>
            )}

            {/* Left toolbar */}
            {el.type === 'toolbar' && (
              <div className="tools-ui-toolbar">
                <span className="tb-item"><svg viewBox="0 0 14 14" width="14" height="14" fill="none"><path d="M2 2l4 10 2-4 4-2L2 2z" fill="var(--ink-80)" /></svg></span>
                <span className="tb-item"><FrameIcon /></span>
                <span className="tb-item tb-sep"><svg viewBox="0 0 14 14" width="12" height="12" fill="none" stroke="var(--ink-40)" strokeWidth="1.2"><line x1="3" y1="3" x2="3" y2="11" /><line x1="7" y1="3" x2="7" y2="11" /><line x1="11" y1="3" x2="11" y2="11" /><line x1="3" y1="7" x2="11" y2="7" /></svg></span>
                <span className="tb-item"><svg viewBox="0 0 14 14" width="12" height="12" fill="none" stroke="var(--ink-40)" strokeWidth="1.3"><rect x="2" y="2" width="10" height="10" rx="1" /></svg></span>
                <span className="tb-item"><svg viewBox="0 0 14 14" width="12" height="12" fill="none" stroke="var(--ink-40)" strokeWidth="1.3"><line x1="2" y1="12" x2="12" y2="2" /></svg></span>
                <span className="tb-item"><svg viewBox="0 0 14 14" width="12" height="12" fill="none" stroke="var(--ink-40)" strokeWidth="1.3"><circle cx="7" cy="7" r="5" /></svg></span>
                <span className="tb-item"><svg viewBox="0 0 14 14" width="14" height="14" fill="none" stroke="var(--ink-40)" strokeWidth="1.2"><path d="M3 10V4h2l2 3 2-3h2v6" /></svg></span>
                <span className="tb-item"><svg viewBox="0 0 14 14" width="12" height="12" fill="none" stroke="var(--ink-40)" strokeWidth="1.3"><path d="M3 7c0-3 2-5 4-5s4 2 4 5-2 5-4 5" /><path d="M5 9l-2 3 3 0" /></svg></span>
              </div>
            )}

            {/* Cursor nametag "Mymy" */}
            {el.type === 'nametag' && (
              <div className="tools-ui-nametag">
                <CursorSvg />
                <span className="tools-ui-nametag-label" style={{ background: '#F5A623' }}>Mymy</span>
              </div>
            )}

            {/* Arrow keys */}
            {el.type === 'arrows' && (
              <div className="tools-ui-arrows">
                <span className="tools-ui-arrow-btn">↓</span>
                <span className="tools-ui-arrow-btn">→</span>
                <span className="tools-ui-arrow-text">Swipe Left</span>
              </div>
            )}

            {/* Component diamond */}
            {el.type === 'component' && <ComponentIcon />}

            {/* Frame icon */}
            {el.type === 'frame' && <FrameIcon />}

            {/* Auto-layout */}
            {el.type === 'autolayout' && (
              <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="#0D99FF" strokeWidth="1.3">
                <path d="M4 8h8M8 4v8M2 2h12v12H2z" />
              </svg>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  )
}
