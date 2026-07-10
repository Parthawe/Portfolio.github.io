import { motion } from 'framer-motion';

interface CsFeatureGridProps {
  features: { title: string; desc: string }[];
  className?: string;
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] } },
};

export default function CsFeatureGrid({ features, className }: CsFeatureGridProps) {
  return (
    <motion.div
      className={['cs-feature-grid', className].filter(Boolean).join(' ')}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-40px' }}
    >
      {features.map((f, index) => (
        <motion.div key={`${f.title || 'feature'}-${index}`} className="cs-feature-card" variants={item}>
          <div className="cs-feature-card-title">{f.title}</div>
          <div className="cs-feature-card-desc">{f.desc}</div>
        </motion.div>
      ))}
    </motion.div>
  );
}
