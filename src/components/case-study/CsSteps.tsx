import { motion } from 'framer-motion';

interface CsStepsProps {
  steps: { num: number | string; title: string; desc: string }[];
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] } },
};

export default function CsSteps({ steps }: CsStepsProps) {
  return (
    <motion.div
      className="cs-steps"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-40px' }}
    >
      {steps.map((s) => (
        <motion.div key={s.num} className="cs-step" variants={item}>
          <div className="cs-step-num">{s.num}</div>
          <div className="cs-step-title">{s.title}</div>
          <div className="cs-step-desc">{s.desc}</div>
        </motion.div>
      ))}
    </motion.div>
  );
}
