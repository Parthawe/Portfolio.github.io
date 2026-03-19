import { motion } from "framer-motion";

interface CsCreditsProps {
  credits: { role: string; name: string }[];
  style?: React.CSSProperties;
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] } },
};

export default function CsCredits({ credits, style }: CsCreditsProps) {
  return (
    <motion.div
      className="cs-credits"
      style={style}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-40px' }}
    >
      {credits.map((c) => (
        <motion.div key={c.role} className="cs-credit-item" variants={item}>
          <span className="cs-credit-role">{c.role}</span>
          <span className="cs-credit-name">{c.name}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}
