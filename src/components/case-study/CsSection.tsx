import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface CsSectionProps {
  id?: string;
  label: string;
  title: string;
  children: ReactNode;
}

export default function CsSection({ id, label, title, children }: CsSectionProps) {
  return (
    <motion.section
      className="cs-section"
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="wrap cs-section-grid">
        <div className="cs-section-head">
          <motion.span
            className="cs-section-label"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {label}
          </motion.span>
          <motion.h2
            className="cs-section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
          >
            {title}
          </motion.h2>
        </div>
        <div className="cs-section-content">
          {children}
        </div>
      </div>
    </motion.section>
  );
}
