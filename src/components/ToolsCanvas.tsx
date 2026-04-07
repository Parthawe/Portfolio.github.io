import { motion } from 'framer-motion'

/**
 * Figma-canvas-style tools section.
 * Tool names + inline SVG logos scattered on a dotted canvas.
 */

/* ── Tool data with SVG logo paths ── */
const tools: { text: string; x: number; y: number; size: 'xl' | 'lg' | 'md' | 'sm'; rotate: number; color: string; logo: string }[] = [
  // Primary
  { text: 'Figma', x: 6, y: 5, size: 'xl', rotate: -4, color: '#a259ff',
    logo: 'M6 0.5C3.5 0.5 1.5 2.5 1.5 5S3.5 9.5 6 9.5H8V5C8 2.5 6 0.5 6 0.5ZM10 0.5C8 0.5 8 2.5 8 5S8 9.5 10 9.5C12.5 9.5 14.5 7.5 14.5 5S12.5 0.5 10 0.5ZM6 10.5C3.5 10.5 1.5 12.5 1.5 15S3.5 19.5 6 19.5H8V15C8 12.5 6 10.5 6 10.5ZM10 10.5C8 10.5 8 12.5 8 15C8 17.5 10 19.5 10 19.5C12.5 19.5 14.5 17.5 14.5 15S12.5 10.5 10 10.5ZM6 20.5C3.5 20.5 1.5 22.5 1.5 25C1.5 27.5 3.5 29.5 6 29.5C8.5 29.5 8 27.5 8 25V20.5H6Z' },
  { text: 'React', x: 50, y: 12, size: 'xl', rotate: 3, color: '#61dafb',
    logo: 'M12 10.11a1.89 1.89 0 110 3.78 1.89 1.89 0 010-3.78zM7.37 20c.63 0 2.21-.56 4.06-3.3a29 29 0 01-2.07-2.97A29 29 0 016.3 13c-1.64 2.88-1.97 5.04-1.24 5.87.22.25.58.38 1.05.38h.26zm9.26 0c.47 0 .83-.13 1.05-.38.73-.83.4-2.99-1.24-5.87a29 29 0 01-3.06.73 29 29 0 01-2.07 2.97c1.85 2.74 3.43 3.3 4.06 3.3h.26zM12 5.6c-1.85-2.74-3.43-3.3-4.06-3.3h-.26c-.47 0-.83.13-1.05.38-.73.83-.4 2.99 1.24 5.87a29 29 0 013.06-.73A29 29 0 0112 5.6z' },
  { text: 'Blender', x: 4, y: 40, size: 'xl', rotate: -2, color: '#ea7600',
    logo: 'M12.5 2L4 9.5l4 .5-3.5 4L8 14l-2 5 7-4-1 3 6.5-7-4 .5L20 6l-7.5-4z' },
  // Secondary
  { text: 'TypeScript', x: 30, y: 30, size: 'lg', rotate: -6, color: '#3178c6',
    logo: 'M0 12v12h24V0H0v12zm19.34-.96c.61.15 1.07.42 1.45.82.19.2.48.6.5.67 0 .02-1.8 1.28-2.9 1.93-.04.03-.2-.14-.38-.4-.53-.77-1.08-1.1-1.91-1.14-.82-.04-1.62.43-1.62 1.25 0 .19.04.45.1.57.13.27.4.54.87.75l1.46.68c2.15 1 3.08 1.72 3.56 2.75.53 1.13.65 2.94.27 4.2-.42 1.37-1.47 2.3-3 2.65-.47.11-1.6.13-2.12.05-1.15-.2-2.24-.75-3-1.5-.3-.3-.87-1.06-.85-1.1l.66-.44 1.32-.88.44-.3.2.3c.28.45.9 1.06 1.26 1.25.13.07.38.14.56.16.54.05 1.12-.15 1.4-.5.18-.23.25-.45.25-.82 0-.32-.03-.46-.17-.7-.18-.3-.55-.57-1.5-1.07-1.1-.56-1.57-.9-2.13-1.5-.32-.35-.62-.87-.78-1.33-.13-.38-.16-.6-.16-1.17 0-.53.02-.73.13-1.07.28-.9.82-1.64 1.56-2.13.75-.5 1.65-.75 2.73-.72.53.02 1.08.12 1.56.3z' },
  { text: 'Python', x: 66, y: 36, size: 'lg', rotate: 5, color: '#3776ab',
    logo: 'M11.9 0C5.9 0 6.3 2.6 6.3 2.6v2.7h5.8v.8H3.8S0 5.6 0 11.8s3.3 6 3.3 6h2V15s-.1-3.3 3.2-3.3h5.5s3.1.1 3.1-3V3.4S17.6 0 11.9 0zm-3 2a1 1 0 110 2 1 1 0 010-2z' },
  { text: 'After Effects', x: 20, y: 62, size: 'lg', rotate: 3, color: '#9999ff',
    logo: 'M3 3h18v18H3V3zm5.1 12.6h3.4l.6 1.9h2.1L11 7.5H9l-3.2 10h2.1l.6-1.9h-.4zm2.9-1.6H9l1.5-4.8 1.5 4.8z' },
  { text: 'Arduino', x: 58, y: 55, size: 'lg', rotate: -4, color: '#00979d',
    logo: 'M17 12.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h2c.28 0 .5.22.5.5s-.22.5-.5.5h-2zM4 12.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h2c.28 0 .5.22.5.5s-.22.5-.5.5H4zM12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z' },
  // Tertiary
  { text: 'Protopie', x: 3, y: 22, size: 'md', rotate: 8, color: '#ff6262',
    logo: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14a4 4 0 110-8 4 4 0 010 8z' },
  { text: 'p5.js', x: 80, y: 6, size: 'md', rotate: -3, color: '#ed225d',
    logo: 'M4.7 7.5l3.3 2v4l-3.3 2-3.3-2v-4l3.3-2zm9.6 0l3.3 2v4l-3.3 2-3.3-2v-4l3.3-2z' },
  { text: 'TouchDesigner', x: 52, y: 70, size: 'md', rotate: -5, color: '#888',
    logo: 'M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18L20 9v6l-8 4-8-4V9l8-4.82z' },
  { text: 'Illustrator', x: 70, y: 24, size: 'md', rotate: 4, color: '#ff9a00',
    logo: 'M3 3h18v18H3V3zm5.1 12.6h3.4l.6 1.9h2.1L11 7.5H9l-3.2 10h2.1l.6-1.9h-.4zm2.9-1.6H9l1.5-4.8 1.5 4.8zM16 8.5a.9.9 0 11-1.8 0 .9.9 0 011.8 0zM15.1 10.4h1.6v7.1h-1.6v-7.1z' },
  { text: 'Claude', x: 36, y: 48, size: 'md', rotate: -8, color: '#d97757',
    logo: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14h-2v-2h2v2zm3.07-5.25l-.9.92C12.45 12.4 12 13 12 14h-2v-.5c0-.81.45-1.56 1.07-2.13l1.24-1.26c.3-.3.49-.72.49-1.18 0-.93-.77-1.68-1.73-1.68s-1.73.75-1.73 1.68H7.6c0-1.86 1.56-3.37 3.47-3.37s3.47 1.51 3.47 3.37c0 .74-.31 1.42-.81 1.9z' },
  { text: '3D Printing', x: 7, y: 76, size: 'md', rotate: 6, color: '#27ae60',
    logo: 'M12 2L3 7v10l9 5 9-5V7l-9-5zm0 2.18l7 3.89v7.86l-7 3.89-7-3.89V8.07l7-3.89z' },
  // Small
  { text: 'Laser Cutting', x: 66, y: 80, size: 'sm', rotate: -3, color: '#e74c3c',
    logo: 'M12 2a10 10 0 100 20 10 10 0 000-20zm0 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3z' },
  { text: 'Processing', x: 16, y: 50, size: 'sm', rotate: 10, color: '#2c60a4',
    logo: 'M12 2L2 7v10l10 5 10-5V7L12 2z' },
  { text: 'TensorFlow', x: 82, y: 50, size: 'sm', rotate: -6, color: '#ff6f00',
    logo: 'M1 6.6l5.3-3.3v17.4L1 17.4V6.6zm11-6.6l-5.7 3.3v5l5.7 3.3 5.7-3.3V3.3L12 0zm5.7 8.3L12 11.6v5l5.7-3.3v-5z' },
  { text: 'ML5.js', x: 44, y: 3, size: 'sm', rotate: 7, color: '#a855f7',
    logo: 'M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-2 15l-5-5 1.4-1.4L10 14.2l7.6-7.6L19 8l-9 9z' },
  { text: 'Glyphs', x: 80, y: 66, size: 'sm', rotate: 2, color: '#84cc16',
    logo: 'M12 2a10 10 0 100 20 10 10 0 000-20zm4 11h-3v3h-2v-3H8v-2h3V8h2v3h3v2z' },
  { text: 'Photoshop', x: 1, y: 86, size: 'sm', rotate: 5, color: '#31a8ff',
    logo: 'M3 3h18v18H3V3zm4.8 11.4v3h-2V7.6h3.3c.8 0 1.5.1 2 .4.5.2.9.6 1.2 1 .3.5.4 1 .4 1.6 0 .9-.3 1.7-1 2.2-.6.5-1.5.8-2.6.8H7.8zm0-1.6h1.3c.6 0 1-.1 1.3-.4.3-.3.4-.6.4-1.1 0-.4-.1-.8-.4-1.1-.3-.3-.7-.4-1.2-.4H7.8v3z' },
  { text: 'Soldering', x: 48, y: 86, size: 'sm', rotate: -2, color: '#f59e0b',
    logo: 'M3.5 20.5l4-4M15 4l5 5M8.5 15.5l-1-1 8-8 1 1-8 8z' },
  { text: 'LED Systems', x: 86, y: 86, size: 'sm', rotate: 3, color: '#ef4444',
    logo: 'M9 21h6M12 3a6 6 0 00-4 10.5V17h8v-3.5A6 6 0 0012 3z' },
  { text: 'Voice UI', x: 42, y: 40, size: 'sm', rotate: -10, color: '#06b6d4',
    logo: 'M12 1a4 4 0 00-4 4v6a4 4 0 008 0V5a4 4 0 00-4-4zM8 17.7A6 6 0 0012 19a6 6 0 004-1.3M12 19v4' },
]

/* ── Floating UI widgets ── */
const floatingElements = [
  { type: 'comment', x: 48, y: 1, rotate: -2 },
  { type: 'color', x: 72, y: 44, rotate: 3 },
  { type: 'export', x: 1, y: 62, rotate: 0 },
  { type: 'toggle', x: 28, y: 16, rotate: 0 },
  { type: 'checkbox', x: 60, y: 18, rotate: 0 },
  { type: 'cursor', x: 40, y: 28, rotate: 0 },
  { type: 'ruler', x: 42, y: -1, rotate: 32 },
  { type: 'code', x: 90, y: 58, rotate: -2 },
  { type: 'nametag', x: 74, y: 34, rotate: 0 },
  { type: 'selection', x: 20, y: 54, rotate: -12 },
  { type: 'badge', x: 11, y: 32, rotate: -55 },
  { type: 'toolbar', x: 0, y: 42, rotate: 0 },
  { type: 'date', x: 44, y: 76, rotate: 0 },
  { type: 'component', x: 34, y: 58, rotate: 0 },
  { type: 'frame', x: 58, y: 8, rotate: 5 },
  { type: 'add', x: 86, y: 74, rotate: 0 },
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

/* Icon size per tool size tier */
const ICON_SIZE: Record<string, number> = { xl: 28, lg: 22, md: 16, sm: 12 }

export default function ToolsCanvas() {
  return (
    <section className="tools-canvas reveal">
      <div className="sec-head">
        <span className="sec-label">Tools I reach for</span>
      </div>

      <div className="tools-canvas-area">
        {/* ── Tool names + logos ── */}
        {tools.map((w, i) => {
          const iconSz = ICON_SIZE[w.size]
          return (
            <motion.span
              key={w.text}
              className={`tools-word tools-word--${w.size}`}
              style={{ left: `${w.x}%`, top: `${w.y}%`, rotate: w.rotate }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.03, ease: [0.16, 1, 0.3, 1] }}
            >
              <svg
                className="tools-word-icon"
                viewBox="0 0 24 24"
                width={iconSz}
                height={iconSz}
                fill={w.color}
                style={{ opacity: w.size === 'sm' ? 0.5 : 0.7 }}
              >
                <path d={w.logo} />
              </svg>
              {w.text}
            </motion.span>
          )
        })}

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
              <div className="tools-ui-toggle"><span className="tools-ui-toggle-track"><span className="tools-ui-toggle-thumb" /></span></div>
            )}
            {el.type === 'checkbox' && (
              <svg viewBox="0 0 20 20" width="22" height="22"><rect x="1" y="1" width="18" height="18" rx="4" fill="#0D99FF" /><path d="M5.5 10l3 3 5.5-6" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
            )}
            {el.type === 'cursor' && (
              <div className="tools-ui-cursor"><svg viewBox="0 0 24 24" width="20" height="20" fill="none"><path d="M5 3v18l4-6h8L5 3z" fill="#1e1e1e" stroke="#fff" strokeWidth="1" /></svg></div>
            )}
            {el.type === 'ruler' && (
              <div className="tools-ui-ruler"><div className="tools-ui-ruler-line">{[0,1,2,3,4,5].map(j => <span key={j} className="tools-ui-ruler-dot" />)}</div></div>
            )}
            {el.type === 'code' && <div className="tools-ui-code">&lt;/&gt;</div>}
            {el.type === 'date' && (
              <div className="tools-ui-date"><span className="tools-ui-date-sep">|‖</span><span>04</span><span>2026</span><svg viewBox="0 0 12 12" width="10" height="10"><path d="M3 5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" /></svg></div>
            )}
            {el.type === 'badge' && (
              <div className="tools-ui-badge"><span className="tools-ui-badge-count">23 tools</span><span className="tools-ui-badge-tag">Daily</span></div>
            )}
            {el.type === 'selection' && (
              <div className="tools-ui-selection"><span className="sel-dot sel-tl" /><span className="sel-dot sel-tr" /><span className="sel-dot sel-bl" /><span className="sel-dot sel-br" /><span className="sel-dot sel-tm" /><span className="sel-dot sel-bm" /><span className="sel-dot sel-ml" /><span className="sel-dot sel-mr" /></div>
            )}
            {el.type === 'add' && (
              <svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="var(--ink-30)" strokeWidth="1.5"><circle cx="10" cy="10" r="8" /><line x1="10" y1="6" x2="10" y2="14" /><line x1="6" y1="10" x2="14" y2="10" /></svg>
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
              <div className="tools-ui-nametag"><CursorSvg /><span className="tools-ui-nametag-label" style={{ background: '#F5A623' }}>Parth</span></div>
            )}
            {el.type === 'component' && <ComponentIcon />}
            {el.type === 'frame' && <FrameIcon />}
          </motion.div>
        ))}
      </div>
    </section>
  )
}
