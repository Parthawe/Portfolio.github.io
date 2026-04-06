import { useState, useRef, useEffect, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Password gate for NDA-protected projects.
 *
 * Wraps the full project page. Shows a branded overlay until the correct
 * password is entered. Unlock state persists in sessionStorage so the
 * user doesn't need to re-enter during the same browser session.
 */

const DEFAULT_PASSWORD = 'parth2026'

interface NdaGateProps {
  /** Project slug — used as sessionStorage key */
  slug: string
  /** Project display name */
  projectName: string
  /** Custom password (defaults to "parth2026") */
  password?: string
  /** The protected page content */
  children: ReactNode
}

export default function NdaGate({ slug, projectName, password = DEFAULT_PASSWORD, children }: NdaGateProps) {
  const storageKey = `nda-unlock-${slug}`
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem(storageKey) === '1')
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!unlocked) inputRef.current?.focus()
  }, [unlocked])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (value.trim().toLowerCase() === password.toLowerCase()) {
      sessionStorage.setItem(storageKey, '1')
      setUnlocked(true)
    } else {
      setError(true)
      setShake(true)
      setValue('')
      setTimeout(() => setShake(false), 500)
      setTimeout(() => setError(false), 2000)
    }
  }

  return (
    <AnimatePresence mode="wait">
      {unlocked ? (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      ) : (
        <motion.div
          key="gate"
          className="nda-gate"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.4 }}
        >
          <div className="nda-gate-inner">
            {/* Lock icon */}
            <div className="nda-lock-icon">
              <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>

            <span className="nda-badge">Protected Work</span>

            <h1 className="nda-title">{projectName}</h1>

            <p className="nda-desc">
              This project is under a non-disclosure agreement.<br />
              Enter the password to view the full case study.
            </p>

            <form className="nda-form" onSubmit={handleSubmit}>
              <motion.div
                className="nda-input-wrap"
                animate={shake ? { x: [0, -12, 12, -8, 8, -4, 4, 0] } : {}}
                transition={{ duration: 0.4 }}
              >
                <input
                  ref={inputRef}
                  type="password"
                  className={`nda-input ${error ? 'nda-input--error' : ''}`}
                  value={value}
                  onChange={e => setValue(e.target.value)}
                  placeholder="Enter password"
                  autoComplete="off"
                />
                <button type="submit" className="nda-submit" disabled={!value.trim()}>
                  <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="10" x2="15" y2="10" />
                    <polyline points="10,5 15,10 10,15" />
                  </svg>
                </button>
              </motion.div>

              <AnimatePresence>
                {error && (
                  <motion.p
                    className="nda-error"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    Incorrect password. Try again.
                  </motion.p>
                )}
              </AnimatePresence>
            </form>

            <p className="nda-contact">
              Don&rsquo;t have the password?{' '}
              <a href="mailto:pawarparth99@gmail.com">Request access</a>
            </p>
          </div>

          {/* Subtle background pattern */}
          <div className="nda-bg-pattern" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
