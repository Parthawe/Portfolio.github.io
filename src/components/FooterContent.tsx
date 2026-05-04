import { useState, useEffect, useRef, type RefObject } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useInView, type MotionValue } from 'framer-motion'
import BrandIcon from './BrandIcon'
import FigmaSelect from './FigmaSelect'
import { CONTACT_EMAIL } from '../config/site'

const socials = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/parth-pawar-1501/' },
  { label: 'GitHub', href: 'https://github.com/parthawe' },
  { label: 'Instagram', href: 'https://www.instagram.com/designwhich.works' },
]

const navLinks = [
  { label: 'Work', to: '/work' },
  { label: 'About', to: '/about' },
  { label: 'Writing', to: '/writing' },
  { label: 'Installations', to: '/installations' },
]

function LiveClock() {
  const [time, setTime] = useState('')
  useEffect(() => {
    let intervalId: number | null = null
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'America/Los_Angeles',
        }),
      )
    tick()
    const alignToMinute = window.setTimeout(() => {
      tick()
      intervalId = window.setInterval(tick, 60_000)
    }, 1000)
    return () => {
      window.clearTimeout(alignToMinute)
      if (intervalId !== null) window.clearInterval(intervalId)
    }
  }, [])
  return <span className="ft-clock">{time}</span>
}

export default function FooterContent({ footerRef }: { footerRef: RefObject<HTMLElement | null> }) {
  const [copied, setCopied] = useState(false)
  const email = CONTACT_EMAIL
  const firstRevealRef = useRef<HTMLDivElement>(null)

  const isInView = useInView(firstRevealRef, { once: true, amount: 0.1 })
  const [skipAnim, setSkipAnim] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isInView) setSkipAnim(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [isInView])

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ['start end', 'end end'],
  })

  const ctaY = useTransform(scrollYProgress, [0, 0.5], [40, 0])
  const ctaOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1])
  const infoY = useTransform(scrollYProgress, [0.1, 0.55], [24, 0])
  const infoOpacity = useTransform(scrollYProgress, [0.15, 0.55], [0, 1])
  const bottomY = useTransform(scrollYProgress, [0.25, 0.65], [16, 0])
  const bottomOpacity = useTransform(scrollYProgress, [0.25, 0.65], [0, 1])

  const handleCopy = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const a = (y: MotionValue<number>, opacity: MotionValue<number>) =>
    skipAnim ? { y: 0, opacity: 1 } : { y, opacity }

  return (
    <div className="wrap ft-compact">
      <motion.div className="ft-cta-row" style={a(ctaY, ctaOpacity)} ref={firstRevealRef}>
        <div className="ft-cta-left">
          <h2 className="ft-headline-sm">
            Let's work <em>together</em>
          </h2>
        </div>
        <div className="ft-cta-right">
          <a className="ft-email figma-hover" href={`mailto:${email}`}>{email}<FigmaSelect /></a>
          <button className="ft-copy-btn magnetic figma-hover" onClick={handleCopy} aria-label="Copy email">
            {copied ? (
              <>
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M2 7.5L5.5 11L12 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span className="sr-only" role="status">Email copied</span>
              </>
            ) : 'Copy'}
            <FigmaSelect />
          </button>
        </div>
      </motion.div>

      <motion.div className="ft-info-row" style={a(infoY, infoOpacity)}>
        <div className="ft-info-segment">
          {navLinks.map(l => (
            <Link key={l.to} to={l.to} className="ft-info-link figma-hover">{l.label}<FigmaSelect /></Link>
          ))}
        </div>
        <div className="ft-info-segment">
          {socials.map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="ft-info-link figma-hover">
              <BrandIcon name={s.label} size={14} />
              {s.label}
              <FigmaSelect />
            </a>
          ))}
        </div>
        <div className="ft-info-segment ft-info-segment--right">
          <span className="ft-info-text">San Francisco, CA</span>
          <span className="ft-info-muted"><LiveClock /> PT</span>
        </div>
      </motion.div>

      <motion.div className="ft-bottom" style={a(bottomY, bottomOpacity)}>
        <span>&copy; {new Date().getFullYear()} Parth Pawar</span>
        <span className="ft-coded">
          <BrandIcon name="React" size={12} /> React
          <span className="ft-dot">·</span>
          <BrandIcon name="TypeScript" size={12} /> TypeScript
          <span className="ft-dot">·</span>
          <BrandIcon name="Three.js" size={12} /> Three.js
        </span>
      </motion.div>
    </div>
  )
}
