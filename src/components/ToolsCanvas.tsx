import { motion } from 'framer-motion'

/**
 * Figma-canvas-style tools section.
 * Actual tool names as scattered typography + floating Figma UI widgets.
 * Every tool Parth actually uses — sized by importance.
 */

/* ── Tool names positioned on the canvas ── */
const tools = [
  // Primary — biggest
  { text: 'Figma', x: 8, y: 6, size: 'xl', rotate: -4 },
  { text: 'React', x: 52, y: 14, size: 'xl', rotate: 3 },
  { text: 'Blender', x: 5, y: 42, size: 'xl', rotate: -2 },
  // Secondary — large
  { text: 'TypeScript', x: 32, y: 32, size: 'lg', rotate: -6 },
  { text: 'Python', x: 68, y: 38, size: 'lg', rotate: 5 },
  { text: 'After Effects', x: 22, y: 65, size: 'lg', rotate: 3 },
  { text: 'Arduino', x: 60, y: 58, size: 'lg', rotate: -4 },
  // Tertiary — medium
  { text: 'Protopie', x: 4, y: 24, size: 'md', rotate: 8 },
  { text: 'p5.js', x: 82, y: 8, size: 'md', rotate: -3 },
  { text: 'TouchDesigner', x: 55, y: 72, size: 'md', rotate: -5 },
  { text: 'Illustrator', x: 72, y: 26, size: 'md', rotate: 4 },
  { text: 'Claude', x: 38, y: 50, size: 'md', rotate: -8 },
  { text: '3D Printing', x: 8, y: 78, size: 'md', rotate: 6 },
  // Small — scattered details
  { text: 'Laser Cutting', x: 68, y: 82, size: 'sm', rotate: -3 },
  { text: 'Processing', x: 18, y: 52, size: 'sm', rotate: 10 },
  { text: 'TensorFlow', x: 84, y: 52, size: 'sm', rotate: -6 },
  { text: 'ML5.js', x: 46, y: 5, size: 'sm', rotate: 7 },
  { text: 'Glyphs App', x: 82, y: 68, size: 'sm', rotate: 2 },
  { text: 'FontForge', x: 28, y: 82, size: 'sm', rotate: -4 },
  { text: 'Photoshop', x: 2, y: 88, size: 'sm', rotate: 5 },
  { text: 'Soldering', x: 50, y: 88, size: 'sm', rotate: -2 },
  { text: 'LED Systems', x: 88, y: 88, size: 'sm', rotate: 3 },
  { text: 'Voice UI', x: 44, y: 42, size: 'sm', rotate: -10 },
]

/* ── Floating UI widgets ── */
const floatingElements = [
  { type: 'comment', x: 48, y: 2, rotate: -2 },
  { type: 'color', x: 72, y: 46, rotate: 3 },
  { type: 'export', x: 2, y: 64, rotate: 0 },
  { type: 'toggle', x: 30, y: 18, rotate: 0 },
  { type: 'checkbox', x: 62, y: 20, rotate: 0 },
  { type: 'cursor', x: 42, y: 30, rotate: 0 },
  { type: 'ruler', x: 44, y: 0, rotate: 32 },
  { type: 'code', x: 90, y: 60, rotate: -2 },
  { type: 'nametag', x: 76, y: 36, rotate: 0 },
  { type: 'selection', x: 22, y: 56, rotate: -12 },
  { type: 'badge', x: 12, y: 34, rotate: -55 },
  { type: 'eye', x: 90, y: 30, rotate: 0 },
  { type: 'toolbar', x: 0, y: 44, rotate: 0 },
  { type: 'date', x: 46, y: 78, rotate: 0 },
  { type: 'component', x: 36, y: 60, rotate: 0 },
  { type: 'frame', x: 60, y: 10, rotate: 5 },
  { type: 'add', x: 88, y: 76, rotate: 0 },
]

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
        {/* ── Tool names — scattered at various sizes ── */}
        {tools.map((w, i) => (
          <motion.span
            key={w.text}
            className={`tools-word tools-word--${w.size}`}
            style={{ left: `${w.x}%`, top: `${w.y}%`, rotate: w.rotate }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.03, ease: [0.16, 1, 0.3, 1] }}
          >
            {w.text}
          </motion.span>
        ))}

        {/* ── Floating Figma UI widgets ── */}
        {floatingElements.map((el, i) => (
          <motion.div
            key={`${el.type}-${i}`}
            className={`tools-float tools-float--${el.type}`}
            style={{ left: `${el.x}%`, top: `${el.y}%`, rotate: el.rotate }}
            initial={{ opacity: 0, scale: 0.85, y: 12 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.15 + i * 0.03 }}
          >
            {el.type === 'comment' && (
              <div className="tools-ui-comment">
                <div className="tools-ui-comment-avatar">P</div>
                <div className="tools-ui-comment-body">
                  <span className="tools-ui-comment-meta">Parth <em>Just now</em></span>
                  <span className="tools-ui-comment-text">Can you auto-layout this?</span>
                </div>
              </div>
            )}

            {el.type === 'color' && (
              <div className="tools-ui-color">
                <span className="tools-ui-color-swatch" style={{ background: '#BAB2FF' }} />
                <span className="tools-ui-color-hex">BAB2FF</span>
                <span className="tools-ui-color-opacity">100</span>
                <span className="tools-ui-color-pct">%</span>
              </div>
            )}

            {el.type === 'export' && (
              <div className="tools-ui-export">
                <span className="tools-ui-export-row">PNG</span>
                <span className="tools-ui-export-row active">JPG</span>
                <span className="tools-ui-export-row">SVG</span>
                <span className="tools-ui-export-row">PDF</span>
              </div>
            )}

            {el.type === 'toggle' && (
              <div className="tools-ui-toggle">
                <span className="tools-ui-toggle-track">
                  <span className="tools-ui-toggle-thumb" />
                </span>
              </div>
            )}

            {el.type === 'checkbox' && (
              <svg viewBox="0 0 20 20" width="22" height="22">
                <rect x="1" y="1" width="18" height="18" rx="4" fill="#0D99FF" />
                <path d="M5.5 10l3 3 5.5-6" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}

            {el.type === 'cursor' && (
              <div className="tools-ui-cursor">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
                  <path d="M5 3v18l4-6h8L5 3z" fill="#1e1e1e" stroke="#fff" strokeWidth="1" />
                </svg>
              </div>
            )}

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

            {el.type === 'code' && (
              <div className="tools-ui-code">&lt;/&gt;</div>
            )}

            {el.type === 'date' && (
              <div className="tools-ui-date">
                <span className="tools-ui-date-sep">|‖</span>
                <span>04</span>
                <span>2026</span>
                <svg viewBox="0 0 12 12" width="10" height="10"><path d="M3 5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" /></svg>
              </div>
            )}

            {el.type === 'badge' && (
              <div className="tools-ui-badge">
                <span className="tools-ui-badge-count">23 tools</span>
                <span className="tools-ui-badge-tag">Daily</span>
              </div>
            )}

            {el.type === 'eye' && (
              <svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="#0D99FF" strokeWidth="1.5">
                <path d="M1 10s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6z" />
                <circle cx="10" cy="10" r="3" />
              </svg>
            )}

            {el.type === 'selection' && (
              <div className="tools-ui-selection">
                <span className="sel-dot sel-tl" /><span className="sel-dot sel-tr" />
                <span className="sel-dot sel-bl" /><span className="sel-dot sel-br" />
                <span className="sel-dot sel-tm" /><span className="sel-dot sel-bm" />
                <span className="sel-dot sel-ml" /><span className="sel-dot sel-mr" />
              </div>
            )}

            {el.type === 'add' && (
              <svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="var(--ink-30)" strokeWidth="1.5">
                <circle cx="10" cy="10" r="8" />
                <line x1="10" y1="6" x2="10" y2="14" /><line x1="6" y1="10" x2="14" y2="10" />
              </svg>
            )}

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

            {el.type === 'nametag' && (
              <div className="tools-ui-nametag">
                <CursorSvg />
                <span className="tools-ui-nametag-label" style={{ background: '#F5A623' }}>Parth</span>
              </div>
            )}

            {el.type === 'component' && <ComponentIcon />}
            {el.type === 'frame' && <FrameIcon />}
          </motion.div>
        ))}
      </div>
    </section>
  )
}
