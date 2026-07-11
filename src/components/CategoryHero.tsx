import { lazy, Suspense, type MouseEvent } from 'react'
import { motion } from 'framer-motion'
import { useDeferredMount } from '../hooks/useDeferredMount'

const CategoryObject3D = lazy(() => import('./CategoryObject3D'))

const ease = [0.16, 1, 0.3, 1] as const
const revealTransition = { duration: 0.58, ease }

/* The domain positioning statement — the landing page's headline.
   Split into [lead, accent] so the accent phrase renders in the category colour. */
const STATEMENTS: Record<string, [string, string]> = {
  'ai':              ['AI that augments,', 'not replaces.'],
  'ux-design':       ['The interface', 'is the product.'],
  'creative-tech':   ['Code is just', 'another material.'],
  'installations':   ['If a space needs a sign,', 'it already failed.'],
  'brand-visual':    ['Typography is the', 'tone of voice.'],
  'design-for-good': ['Design that', 'serves everyone.'],
  'fintech':         ['High stakes,', 'zero confusion.'],
  'crypto':          ['High stakes,', 'clear rails.'],
  'ai-wearables':    ['Ambient, glanceable,', 'safe.'],
}

/* One punchy subline per domain (what lives here + how it is judged). */
const SUBLINES: Record<string, string> = {
  'ai':              'Smart glasses, voice interfaces, on-device ML, and conversational AI — designed for humans, not manuals.',
  'ux-design':       'Product interfaces where every pixel earns trust — payment rails, dashboards, and systems that ship.',
  'creative-tech':   'Neural-network instruments, audio-reactive visuals, and interactive machines — code as a physical material.',
  'installations':   'Black holes you can hold, UV rooms with hidden messages, a 15-foot rotating stage — built and exhibited.',
  'brand-visual':    'Custom typefaces, event art direction, and identity systems with factory-spec precision.',
  'design-for-good': 'Civic platforms, accessibility-first interfaces, and community tools — design as a public good.',
  'fintech':         'High-stakes interfaces for money movement — KYC flows, cross-border rails, trust-first product systems.',
  'crypto':          'Trust-first interfaces for crypto flows — KYC, multi-rail payments, cross-border settlement.',
  'ai-wearables':    'Intelligent interfaces for smart glasses and voice — ambient, glanceable, safe.',
}

/* Clean category names for the eyebrow — data titles carry legacy
   two-line splits ("Install-" / "ations & Fabrication"). */
const CATEGORY_NAMES: Record<string, string> = {
  'ai':              'AI & Wearables',
  'ux-design':       'UX Design',
  'creative-tech':   'Creative Tech',
  'installations':   'Installations',
  'brand-visual':    'Brand & Visual',
  'design-for-good': 'Design for Good',
  'fintech':         'Fintech',
  'crypto':          'Crypto & Web3',
  'ai-wearables':    'AI & Wearables',
}

/* Third slot of the proof strip: one true, non-numeric credential. */
const PROOFS: Record<string, string> = {
  'ai':              'Shipping on real hardware',
  'ux-design':       'In production with real users',
  'creative-tech':   'Exhibited at ITP shows',
  'installations':   'Built, wired, and exhibited',
  'brand-visual':    'In customers’ hands',
  'design-for-good': 'Accessibility-first, WCAG AA',
  'fintech':         'Cross-border, multi-market',
  'crypto':          'Compliance-grade flows',
  'ai-wearables':    'Voice-first, glance-first',
}

interface CategoryHeroProps {
  slug: string
  accentColor: string
  title: string
  titleAccent: string
  description: string
  stats: string[]
  tools: string[]
  has3D: boolean
  projectCount: number
}

export default function CategoryHero({ slug, accentColor, title, titleAccent, description, has3D, projectCount }: CategoryHeroProps) {
  const [lead, accent] = STATEMENTS[slug] || [title, titleAccent]
  const sub = SUBLINES[slug] || description
  const proof = PROOFS[slug]
  const categoryName = CATEGORY_NAMES[slug] || `${title} ${titleAccent}`.replace(/\s+/g, ' ').trim()
  const show3D = useDeferredMount(has3D, { timeout: 1300, delayMs: 120 })
  const handleWorkClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById('lp-work')
    if (!target) return
    event.preventDefault()
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' })
    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#lp-work`)
  }

  return (
    <section className={`ch ch--landing ch--${slug}`}>
      <div className="ch-copy">
        <motion.span
          className="ch-eyebrow"
          initial={{ opacity: 0, y: 8, filter: 'blur(3px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0)' }}
          transition={{ ...revealTransition, delay: 0.08 }}
        >
          <i className="ch-eyebrow-dot" style={{ background: accentColor }} aria-hidden="true" />
          {categoryName}
        </motion.span>

        <motion.h1
          className="ch-statement"
          aria-label={slug === 'ux-design' ? 'The interface is the product.' : undefined}
          initial={{ opacity: 0, y: 16, scale: 0.992, filter: 'blur(5px)' }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0)' }}
          transition={{ duration: 0.68, ease }}
        >
          {slug === 'ux-design' ? (
            <>
              <span className="ch-statement-line">The interface</span>
              <em style={{ color: accentColor }}>
                <span className="ch-statement-line">is the</span>
                <span className="ch-statement-line">product.</span>
              </em>
            </>
          ) : (
            <>
              {lead}{' '}
              <em style={{ color: accentColor }}>{accent}</em>
            </>
          )}
        </motion.h1>

        <motion.p
          className="ch-sub"
          initial={{ opacity: 0, y: 10, filter: 'blur(3px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0)' }}
          transition={{ ...revealTransition, delay: 0.16 }}
        >
          {sub}
        </motion.p>

        <motion.div
          className="ch-strip"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...revealTransition, delay: 0.3 }}
        >
          <span className="ch-strip-item">{projectCount} project{projectCount === 1 ? '' : 's'}</span>
          {proof && (
            <>
              <i className="ch-strip-dot" aria-hidden="true" />
              <span className="ch-strip-item">{proof}</span>
            </>
          )}
          <i className="ch-strip-dot" aria-hidden="true" />
          <a
            href="#lp-work"
            className="ch-strip-link ch-work-cta"
            style={{ color: accentColor }}
            onClick={handleWorkClick}
            aria-label={`See ${categoryName} projects`}
          >
            <span>See the work</span>
            <span className="ch-work-cta__arrow" aria-hidden="true">&darr;</span>
          </a>
        </motion.div>
      </div>

      {/* 3D object beside the copy — never on top of it */}
      {has3D && (
        <motion.div
          className="ch-3d ch-3d--side"
          initial={{ opacity: 0, scale: 0.985, filter: 'blur(6px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0)' }}
          transition={{ duration: 0.82, delay: 0.16, ease }}
          aria-hidden="true"
        >
          {show3D ? (
            <Suspense fallback={null}>
              <CategoryObject3D slug={slug} size={560} style={{ width: 'min(100%, 560px)', height: 'auto', aspectRatio: '1 / 1' }} />
            </Suspense>
          ) : null}
        </motion.div>
      )}
    </section>
  )
}
