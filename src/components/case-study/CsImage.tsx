import { motion } from 'framer-motion';

interface CsImageProps {
  src?: string;
  alt?: string;
  /** Optional visible caption rendered under the image. */
  caption?: string;
  /** Optional CSS aspect-ratio (e.g. "16 / 10") to reserve space and avoid layout shift. */
  aspectRatio?: string;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function CsImage({ src, alt, caption, aspectRatio, placeholder, className, style }: CsImageProps) {
  if (src) {
    return (
      <motion.figure
        className={`cs-img-full ${className || ""}`}
        style={{ margin: 0, ...style }}
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      >
        <img
          src={src}
          alt={alt || ''}
          loading="lazy"
          decoding="async"
          style={aspectRatio ? { aspectRatio, objectFit: 'cover', width: '100%' } : undefined}
        />
        {caption ? <figcaption className="cs-img-caption">{caption}</figcaption> : null}
      </motion.figure>
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
