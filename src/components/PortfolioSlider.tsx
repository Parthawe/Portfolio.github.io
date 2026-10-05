import type { CSSProperties, InputHTMLAttributes } from 'react'
import '../styles/portfolio-slider.css'

type Props = InputHTMLAttributes<HTMLInputElement>

/** Native range semantics, with one track and thumb treatment for the portfolio. */
export default function PortfolioSlider({ className = '', style, min = 0, max = 100, value, ...props }: Props) {
  const lower = Number(min)
  const upper = Number(max)
  const current = Number(value ?? props.defaultValue ?? (lower + upper) / 2)
  const progress = upper > lower ? Math.max(0, Math.min(100, (current - lower) / (upper - lower) * 100)) : 0
  return <input {...props} type="range" min={min} max={max} value={value}
    className={`portfolio-slider ${className}`}
    style={{ ...style, '--slider-progress': `${progress}%`, height: 44, minHeight: 44,
      appearance: 'none', WebkitAppearance: 'none', background: 'transparent',
      border: 0, padding: 0, borderRadius: 0, boxShadow: 'none', marginBlock: 0,
      outline: undefined,
    } as CSSProperties} />
}
