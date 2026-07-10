import { motion, useReducedMotion } from 'framer-motion';
import { isLowPowerDevice } from '../../utils/performance';

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
  const reduceMotion = Boolean(useReducedMotion()) || isLowPowerDevice();

  if (src) {
    const figureClass = `cs-img-full ${className || ""}`;
    const image = (
      <>
        <img
          src={src}
          alt={alt || ''}
          loading="lazy"
          decoding="async"
          style={aspectRatio ? { aspectRatio, objectFit: 'cover', width: '100%' } : undefined}
        />
        {caption ? <figcaption className="cs-img-caption">{caption}</figcaption> : null}
      </>
    );

    if (reduceMotion) {
      return (
        <figure className={figureClass} style={{ margin: 0, ...style }}>
          {image}
        </figure>
      );
    }

    return (
      <motion.figure
        className={figureClass}
        style={{ margin: 0, ...style }}
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      >
        {image}
      </motion.figure>
    );
  }

  if (reduceMotion) {
    return (
      <div className="cs-img-placeholder">
        <span className="cs-img-placeholder-text">{placeholder}</span>
      </div>
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
