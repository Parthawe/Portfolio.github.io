import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { getProject } from '../data/projects'
import { CONTACT_EMAIL } from '../config/site'

interface NdaGateProps {
  slug: string
}

export default function NdaGate({
  slug,
}: NdaGateProps) {
  const project = getProject(slug)
  const projectName = project?.name || 'this project'
  const [email, setEmail] = useState('')
  const [context, setContext] = useState('')
  const [sent, setSent] = useState(false)

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

  if (!project?.nda) {
    return null
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
    if (typeof window !== 'undefined') {
      window.location.href = mailtoHref
    }
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
            <span className="nda-inline-kicker">Quick glimpse is public</span>
            <span className="nda-inline-label">Full case study by request</span>
            <p className="nda-inline-desc">
              The deeper research, process files, and product screens for {projectName} stay off this public site.
              Share your email and context, and I&rsquo;ll send the full case study directly after access is approved.
            </p>
            <p className="nda-inline-contact">
              Prefer email? <a href={`mailto:${CONTACT_EMAIL}?subject=Access request: ${encodeURIComponent(projectName)}`}>Request access directly</a>
            </p>
          </div>
        </div>

        <form className="nda-inline-form nda-inline-form--request" onSubmit={handleSubmit}>
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
    </motion.div>
  )
}
