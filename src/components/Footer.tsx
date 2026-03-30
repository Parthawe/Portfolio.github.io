import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import BrandIcon from './BrandIcon'

const socials = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/parth-pawar-1501/' },
  { label: 'GitHub', href: 'https://github.com/parthawe' },
  { label: 'Instagram', href: 'https://www.instagram.com/designwhich.works' },
]

const navLinks = [
  { label: 'Work', to: '/work' },
  { label: 'About', to: '/about' },
  { label: 'Installations', to: '/installations' },
]

function LiveClock() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'America/Los_Angeles',
        }),
      )
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return <span className="ft-clock">{time}</span>
}

export default function Footer() {
  const [copied, setCopied] = useState(false)
  const email = 'parthpawar@nyu.edu'
  const footerRef = useRef<HTMLElement>(null)

  const isInView = useInView(footerRef, { once: true, amount: 0.1 })
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
  const infoOpacity = useTransform(scrollYProgress, [0.2, 0.6], [0, 1])

  const handleCopy = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const a = (y: any, opacity: any) =>
    skipAnim ? { y: 0, opacity: 1 } : { y, opacity }

  return (
    <footer className="footer" ref={footerRef}>
      <div className="wrap ft-compact">
        {/* CTA row — headline + email side by side */}
        <motion.div className="ft-cta-row" style={a(ctaY, ctaOpacity)}>
          <div className="ft-cta-left">
            <h2 className="ft-headline-sm">
              Let's work <em>together</em>
            </h2>
          </div>
          <div className="ft-cta-right">
            <a className="ft-email" href={`mailto:${email}`}>{email}</a>
            <button className="ft-copy-btn" onClick={handleCopy} aria-label="Copy email">
              {copied ? (
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M2 7.5L5.5 11L12 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              ) : 'Copy'}
            </button>
          </div>
        </motion.div>

        {/* Info row — nav, socials, location — all in one line */}
        <motion.div className="ft-info-row" style={a(0, infoOpacity)}>
          <div className="ft-info-segment">
            {navLinks.map(l => (
              <Link key={l.to} to={l.to} className="ft-info-link">{l.label}</Link>
            ))}
          </div>
          <div className="ft-info-segment">
            {socials.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="ft-info-link">
                <BrandIcon name={s.label} size={14} />
                {s.label}
              </a>
            ))}
          </div>
          <div className="ft-info-segment ft-info-segment--right">
            <span className="ft-info-text">San Francisco, CA</span>
            <span className="ft-info-muted"><LiveClock /> PST</span>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div className="ft-bottom">
          <span>&copy; {new Date().getFullYear()} Parth Pawar</span>
          <span className="ft-coded">
            <BrandIcon name="React" size={12} /> React
            <span className="ft-dot">·</span>
            <BrandIcon name="TypeScript" size={12} /> TypeScript
            <span className="ft-dot">·</span>
            <BrandIcon name="Three.js" size={12} /> Three.js
          </span>
        </div>
      </div>
    </footer>
  )
}
