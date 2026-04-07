import { useState, useRef, useEffect, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Inline NDA content gate for project case studies.
 *
 * Placed WITHIN a project page after the public preview content
 * (header, hero, overview, key results). Only the deep-dive
 * process/design content sits inside as children.
 *
 * When locked: shows a branded inline card asking for the password.
 * When unlocked: smoothly reveals the protected children.
 * Unlock state persists in sessionStorage.
 */

const DEFAULT_PASSWORD = 'parth2026'

interface NdaGateProps {
  slug: string
  projectName: string
  password?: string
  children: ReactNode
}

export default function NdaGate({ slug, projectName, password = DEFAULT_PASSWORD, children }: NdaGateProps) {
  const storageKey = `nda-unlock-${slug}`
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem(storageKey) === '1')
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const gateRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!unlocked && gateRef.current) {
      // Small delay so the page renders first
      setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 300)
    }
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
    <>
      <AnimatePresence mode="wait">
        {!unlocked && (
          <motion.div
            key="gate"
            ref={gateRef}
            className="nda-inline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10, height: 0, marginTop: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="nda-inline-inner">
              <div className="nda-inline-left">
                <div className="nda-inline-icon">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <div className="nda-inline-text">
                  <span className="nda-inline-label">Protected Case Study</span>
                  <p className="nda-inline-desc">
                    The detailed design process, research, and screens for {projectName} are under NDA.
                    Enter the password to continue reading.
                  </p>
                  <p className="nda-inline-contact">
                    Don&rsquo;t have the password? <a href="mailto:pawarparth99@gmail.com">Request access</a>
                  </p>
                </div>
              </div>

              <form className="nda-inline-form" onSubmit={handleSubmit}>
                <motion.div
                  className="nda-input-wrap"
                  animate={shake ? { x: [0, -10, 10, -6, 6, -3, 3, 0] } : {}}
                  transition={{ duration: 0.4 }}
                >
                  <input
                    ref={inputRef}
                    type="password"
                    className={`nda-input ${error ? 'nda-input--error' : ''}`}
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    placeholder="Password"
                    autoComplete="off"
                  />
                  <button type="submit" className="nda-submit" disabled={!value.trim()}>
                    <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                      Incorrect password
                    </motion.p>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {unlocked && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {children}
        </motion.div>
      )}
    </>
  )
}
