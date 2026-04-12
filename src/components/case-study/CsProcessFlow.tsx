import { useState } from 'react'
import { motion } from 'framer-motion'

interface ProcessStep {
  label: string
  desc: string
  icon?: string
}

interface CsProcessFlowProps {
  steps: ProcessStep[]
  title?: string
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const nodeVariant = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] } },
}

const lineVariant = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] } },
}

export default function CsProcessFlow({ steps, title }: CsProcessFlowProps) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null)

  return (
    <div className="cs-pflow">
      {title && <div className="cs-pflow-title">{title}</div>}
      <motion.div
        className="cs-pflow-track"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-40px' }}
      >
        {steps.map((step, i) => (
          <div className="cs-pflow-item" key={step.label}>
            <motion.button
              className={`cs-pflow-node${activeIdx === i ? ' active' : ''}`}
              variants={nodeVariant}
              onClick={() => setActiveIdx(activeIdx === i ? null : i)}
              onFocus={() => setActiveIdx(i)}
              onBlur={() => setActiveIdx(null)}
              onMouseEnter={() => setActiveIdx(i)}
              onMouseLeave={() => setActiveIdx(null)}
            >
              <span className="cs-pflow-num">{step.icon || String(i + 1).padStart(2, '0')}</span>
              <span className="cs-pflow-label">{step.label}</span>
            </motion.button>

            {i < steps.length - 1 && (
              <motion.div className="cs-pflow-line" variants={lineVariant}>
                <svg viewBox="0 0 40 8" fill="none" preserveAspectRatio="none">
                  <path d="M0 4h32l4-3v6l-4-3" stroke="currentColor" strokeWidth="1" fill="currentColor" opacity="0.3" />
                </svg>
              </motion.div>
            )}
          </div>
        ))}
      </motion.div>

      {/* Expanded description panel */}
      <div className="cs-pflow-detail" aria-live="polite">
        {activeIdx !== null && (
          <motion.div
            key={activeIdx}
            className="cs-pflow-detail-inner"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <span className="cs-pflow-detail-num">{steps[activeIdx].icon || String(activeIdx + 1).padStart(2, '0')}</span>
            <span className="cs-pflow-detail-label">{steps[activeIdx].label}</span>
            <p className="cs-pflow-detail-desc">{steps[activeIdx].desc}</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
