import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { useDeferredMount } from '../hooks/useDeferredMount'

const CategoryObject3D = lazy(() => import('./CategoryObject3D'))

const ease = [0.16, 1, 0.3, 1] as const

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

  return (
    <section className="ch ch--landing">
      <div className="ch-copy">
        <motion.span
          className="ch-eyebrow"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <i className="ch-eyebrow-dot" style={{ background: accentColor }} aria-hidden="true" />
          {categoryName}
        </motion.span>

        <motion.h1
          className="ch-statement"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
        >
          {lead}{' '}
          <em style={{ color: accentColor }}>{accent}</em>
        </motion.h1>

        <motion.p
          className="ch-sub"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.3 }}
        >
          {sub}
        </motion.p>

        <motion.div
          className="ch-strip"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.45 }}
        >
          <span className="ch-strip-item">{projectCount} project{projectCount === 1 ? '' : 's'}</span>
          {proof && (
            <>
              <i className="ch-strip-dot" aria-hidden="true" />
              <span className="ch-strip-item">{proof}</span>
            </>
          )}
          <i className="ch-strip-dot" aria-hidden="true" />
          <a href="#lp-work" className="ch-strip-link" style={{ color: accentColor }}>
            See the work &darr;
          </a>
        </motion.div>
      </div>

      {/* 3D object beside the copy — never on top of it */}
      {has3D && (
        <motion.div
          className="ch-3d ch-3d--side"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.15, ease }}
          aria-hidden="true"
        >
          {show3D ? (
            <Suspense fallback={null}>
              <CategoryObject3D slug={slug} size={460} style={{ width: 'min(100%, 460px)', height: 'auto', aspectRatio: '1 / 1' }} />
            </Suspense>
          ) : null}
        </motion.div>
      )}
    </section>
  )
}
