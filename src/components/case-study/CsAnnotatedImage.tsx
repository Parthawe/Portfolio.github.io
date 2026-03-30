import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Callout {
  x: number; // percentage from left (0-100)
  y: number; // percentage from top (0-100)
  label: string;
  desc?: string;
}

interface CsAnnotatedImageProps {
  src: string;
  alt: string;
  callouts: Callout[];
}

export default function CsAnnotatedImage({ src, alt, callouts }: CsAnnotatedImageProps) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <motion.div
      className="cs-annotated-img"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="cs-ai-wrap">
        <img src={src} alt={alt} className="cs-ai-image" loading="lazy" />

        {callouts.map((c, i) => (
          <button
            key={i}
            className={`cs-ai-dot${active === i ? ' cs-ai-dot--active' : ''}`}
            style={{ left: `${c.x}%`, top: `${c.y}%` }}
            onClick={() => setActive(active === i ? null : i)}
            aria-label={c.label}
          >
            <span className="cs-ai-dot-num">{i + 1}</span>
            <span className="cs-ai-dot-ring" />
          </button>
        ))}

        <AnimatePresence>
          {active !== null && (
            <motion.div
              className="cs-ai-tooltip"
              style={{
                left: `${callouts[active].x}%`,
                top: `${callouts[active].y}%`,
              }}
              initial={{ opacity: 0, scale: 0.9, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 4 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            >
              <p className="cs-ai-tooltip-label">{callouts[active].label}</p>
              {callouts[active].desc && (
                <p className="cs-ai-tooltip-desc">{callouts[active].desc}</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Legend below image */}
      <div className="cs-ai-legend">
        {callouts.map((c, i) => (
          <button
            key={i}
            className={`cs-ai-legend-item${active === i ? ' cs-ai-legend-item--active' : ''}`}
            onClick={() => setActive(active === i ? null : i)}
          >
            <span className="cs-ai-legend-num">{i + 1}</span>
            <span className="cs-ai-legend-text">{c.label}</span>
          </button>
        ))}
      </div>
    </motion.div>
  );
}
