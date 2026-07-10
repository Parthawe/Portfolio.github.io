import { useMemo, useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { getProject } from '../data/projects'
import { CONTACT_EMAIL } from '../config/site'

interface NdaGateProps {
  slug: string
  children?: ReactNode
}

const GLOBAL_ACCESS_HASH = import.meta.env.VITE_NDA_ACCESS_SHA256?.trim().toLowerCase()
const PLAIN_ACCESS_CODE = import.meta.env.VITE_NDA_ACCESS_CODE?.trim()

async function sha256Hex(value: string) {
  const data = new TextEncoder().encode(value)
  const digest = await window.crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(digest))
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('')
}

export default function NdaGate({
  slug,
  children,
}: NdaGateProps) {
  const project = getProject(slug)
  const projectName = project?.name || 'this project'
  const [email, setEmail] = useState('')
  const [context, setContext] = useState('')
  const [accessCode, setAccessCode] = useState('')
  const [codeMessage, setCodeMessage] = useState('')
  const [sent, setSent] = useState(false)
  // The stored value is the SHA-256 of the accepted code, re-checked against
  // the configured hash — so a rotated reviewer code invalidates old grants,
  // and the literal value to forge is at least not a guessable constant.
  // This remains a client-side UX layer, not real protection (see ACCESS_MODEL.md).
  const [verified, setVerified] = useState(() => {
    if (typeof window === 'undefined') return false
    const stored = window.sessionStorage.getItem(`portfolio-nda-access:${slug}`)
    return Boolean(stored && GLOBAL_ACCESS_HASH && stored === GLOBAL_ACCESS_HASH)
  })

  const mailtoHref = useMemo(() => {
    const subject = `Access request: ${projectName}`
    const body = [
      `Project: ${projectName}`,
      '',
      `Email: ${email.trim()}`,
      '',
      'Context:',
      context.trim() || 'I would like to review the full case study.',
    ].join('\n')

    return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }, [context, email, projectName])

  if (!project?.nda && project?.access?.mode !== 'request') {
    return null
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
    if (typeof window !== 'undefined') {
      window.location.href = mailtoHref
    }
  }

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = accessCode.trim()

    if (!trimmed) {
      setCodeMessage('Enter the reviewer code you were given.')
      return
    }

    if (!GLOBAL_ACCESS_HASH && !PLAIN_ACCESS_CODE) {
      setCodeMessage('No reviewer code is configured for this build. Request access instead.')
      return
    }

    try {
      const matchesHash = GLOBAL_ACCESS_HASH
        ? await sha256Hex(trimmed) === GLOBAL_ACCESS_HASH
        : false
      const matchesPlainCode = PLAIN_ACCESS_CODE ? trimmed === PLAIN_ACCESS_CODE : false

      if (matchesHash || matchesPlainCode) {
        setVerified(true)
        setAccessCode('')
        setCodeMessage('Access code accepted for this browser session.')
        // Persist only in hash mode; the plain-code fallback is local-dev
        // only and re-prompts on reload rather than storing anything.
        if (typeof window !== 'undefined' && GLOBAL_ACCESS_HASH && matchesHash) {
          window.sessionStorage.setItem(`portfolio-nda-access:${slug}`, GLOBAL_ACCESS_HASH)
        }
        return
      }

      setCodeMessage('That code did not match. Check the code or request access.')
    } catch {
      setCodeMessage('Could not verify the code in this browser. Request access instead.')
    }
  }

  if (verified) {
    return children ? (
      <motion.section
        id={`case-study-access-${slug}`}
        className="nda-unlocked-section cs-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="wrap nda-unlocked-inner">
          {children}
        </div>
      </motion.section>
    ) : null
  }

  return (
    <motion.div
      id={`case-study-access-${slug}`}
      className="nda-inline"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="nda-inline-inner">
        <div className="nda-inline-left">
          <div className="nda-inline-text">
            <h2 className="nda-inline-title">Reviewer access</h2>
            <p className="nda-inline-desc">
              Public pages show the safe story. Use a reviewer code or request access for deeper screens and project notes.
            </p>
            <a
              className="nda-inline-contact"
              href={`mailto:${CONTACT_EMAIL}?subject=Access request: ${encodeURIComponent(projectName)}`}
            >
              Request by email instead
            </a>
          </div>
        </div>

        <div className="nda-access-stack">
          <form className="nda-inline-form nda-inline-form--code nda-access-panel" onSubmit={handleCodeSubmit}>
            <div className="nda-panel-head">
              <div>
                <span className="nda-panel-kicker">Have a code</span>
                <strong>Enter reviewer code</strong>
              </div>
            </div>
            <label className="nda-field">
              <span>Access code</span>
              <input
                type="password"
                className="nda-input"
                value={accessCode}
                onChange={e => setAccessCode(e.target.value)}
                placeholder="reviewer code"
                autoComplete="current-password"
              />
            </label>
            <button type="submit" className="nda-request-submit nda-request-submit--secondary">
              Unlock review
            </button>
            {codeMessage ? (
              <p className="nda-inline-confirmation">{codeMessage}</p>
            ) : null}
          </form>

          <form className="nda-inline-form nda-inline-form--request nda-access-panel" onSubmit={handleSubmit}>
            <div className="nda-panel-head">
              <div>
                <span className="nda-panel-kicker">Need access</span>
                <strong>Send request</strong>
              </div>
            </div>
            <label className="nda-field">
              <span>Email</span>
              <input
                type="email"
                className="nda-input"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@company.com"
                autoComplete="email"
                required
              />
            </label>
            <label className="nda-field">
              <span>Context</span>
              <textarea
                className="nda-input nda-textarea"
                value={context}
                onChange={e => setContext(e.target.value)}
                placeholder="Hiring, collaboration, or review context"
                rows={3}
              />
            </label>
            <button type="submit" className="nda-request-submit">
              Request access
            </button>
            {sent ? (
              <p className="nda-inline-confirmation">Opening your email client with the request.</p>
            ) : null}
          </form>
        </div>
      </div>
    </motion.div>
  )
}
