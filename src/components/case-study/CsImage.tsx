import { motion } from 'framer-motion';

interface CsImageProps {
  src?: string;
  alt?: string;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function CsImage({ src, alt, placeholder, className, style }: CsImageProps) {
  if (src) {
    return (
      <motion.div
        className={`cs-img-full ${className || ""}`}
        style={style}
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      >
        <img src={src} alt={alt || ''} loading="lazy" decoding="async" />
      </motion.div>
    );
  }

  return (
    <motion.div
      className="cs-img-placeholder"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <span className="cs-img-placeholder-text">{placeholder}</span>
    </motion.div>
  );
}
