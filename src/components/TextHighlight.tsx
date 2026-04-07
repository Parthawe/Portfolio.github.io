import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

/**
 * Scroll-triggered text highlight — words get an accent background
 * as they scroll into view, like a highlighter pen drawing across text.
 */

interface Props {
  children: string
  /** Highlight color — defaults to accent orange */
  color?: string
  /** Tag to render — h2, h3, p, span */
  as?: 'h2' | 'h3' | 'p' | 'span'
  className?: string
}

export default function TextHighlight({ children, color, as: Tag = 'span', className = '' }: Props) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 90%', 'center 60%'],
  })

  const width = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <Tag ref={ref as React.Ref<never>} className={`text-highlight ${className}`}>
      <span className="text-highlight-text">{children}</span>
      <motion.span
        className="text-highlight-mark"
        style={{
          width,
          backgroundColor: color || 'var(--highlight-color, rgba(232, 93, 38, 0.15))',
        }}
      />
    </Tag>
  )
}
