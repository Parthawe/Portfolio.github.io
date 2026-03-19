import { useState } from 'react'
import { Link } from 'react-router-dom'

const socials = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/parth-pawar-1501/' },
  { label: 'Instagram', href: 'https://www.instagram.com/designwhich.works' },
  { label: 'GitHub', href: 'https://github.com/parthawe' },
]

export default function Footer() {
  const [copied, setCopied] = useState(false)
  const email = 'parthpawar@nyu.edu'

  const handleCopy = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <footer className="footer">
      {/* ── Big CTA ── */}
      <div className="wrap footer-cta">
        <p className="footer-avail">
          <span className="footer-avail-dot" />
          Available for new projects
        </p>
        <h2 className="footer-headline">
          Let's work<br />
          <em>together</em>
        </h2>
        <div className="footer-email-row">
          <a className="footer-email" href={`mailto:${email}`}>
            {email}
          </a>
          <button
            className="footer-copy-btn"
            onClick={handleCopy}
            aria-label="Copy email"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      {/* ── Info grid ── */}
      <div className="wrap footer-info">
        <div className="footer-info-col">
          <span className="footer-info-label">Navigate</span>
          <Link to="/work" className="footer-info-link">Work</Link>
          <Link to="/about" className="footer-info-link">About</Link>
          <a href={`mailto:${email}`} className="footer-info-link">Contact</a>
        </div>

        <div className="footer-info-col">
          <span className="footer-info-label">Social</span>
          {socials.map(s => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-info-link"
            >
              {s.label}
              <svg width="9" height="9" viewBox="0 0 10 10" fill="none"><path d="M1 9L9 1M9 1H4M9 1V6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          ))}
        </div>

        <div className="footer-info-col">
          <span className="footer-info-label">Location</span>
          <span className="footer-info-text">San Francisco, CA</span>
          <span className="footer-info-text footer-info-muted">
            {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Los_Angeles' })} PST
          </span>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="wrap footer-bottom">
        <span>&copy; {new Date().getFullYear()} Parth Pawar</span>
        <span>Designed & built by Parth</span>
      </div>
    </footer>
  )
}
