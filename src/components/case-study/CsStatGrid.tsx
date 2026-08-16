import { motion } from 'framer-motion';
import { sentenceCaseProjectLabel } from '../../utils/projectPresentation';

interface CsStatGridProps {
  stats: { label: string; value: string }[];
  className?: string;
  style?: React.CSSProperties;
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] } },
};

export default function CsStatGrid({ stats, className, style }: CsStatGridProps) {
  return (
    <motion.div
      className={`cs-stat-grid${className ? ` ${className}` : ''}`}
      style={style}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-40px' }}
    >
      {stats.map((s) => (
        <motion.div key={s.label} className="cs-stat-card" variants={item}>
          <span className="cs-stat-label">{sentenceCaseProjectLabel(s.label)}</span>
          <span className="cs-stat-value">{s.value}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}
