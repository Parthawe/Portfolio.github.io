import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'

const CategoryObject3D = lazy(() => import('./CategoryObject3D'))

const ease = [0.16, 1, 0.3, 1] as const

/* Clean display titles for large type */
const HERO_TITLES: Record<string, [string, string]> = {
  'ai':              ['AI & Machine', 'Learning'],
  'ux-design':       ['UX', 'Design'],
  'creative-tech':   ['Creative', 'Technology'],
  'installations':   ['Installations', '& Fabrication'],
  'brand-visual':    ['Brand &', 'Visual'],
  'fintech':         ['Fintech', 'Design'],
  'design-for-good': ['Design', 'for Good'],
  'crypto':          ['Crypto', '& Web3'],
  'ai-wearables':    ['AI &', 'Wearables'],
}

/* Short titles can be larger */
const SHORT_TITLES = new Set(['ux-design', 'fintech', 'brand-visual', 'crypto', 'design-for-good', 'ai-wearables'])

const HERO_META: Record<string, { tagline: string; shipped: string; scope: string }> = {
  'ai':              { tagline: 'Smart glasses, voice interfaces, on-device ML, and conversational AI — designed for humans, not manuals.', shipped: '6 AI Products', scope: 'Glasses to Cloud' },
  'ux-design':       { tagline: 'Product interfaces where every pixel earns trust — payment rails, dashboards, and enterprise systems that ship.', shipped: '8 Products', scope: 'Mobile to Enterprise' },
  'creative-tech':   { tagline: 'Code as material — neural network instruments, audio-reactive visuals, and interactive installations that compile.', shipped: '6 Projects', scope: 'Screen to Stage' },
  'installations':   { tagline: 'Spaces that teach — black holes you can hold, UV rooms with hidden messages, and a 15-foot rotating stage.', shipped: '7 Installations', scope: 'Gallery to Festival' },
  'brand-visual':    { tagline: 'Visual systems that communicate — custom typefaces, event art direction, and identities with staying power.', shipped: '4 Systems', scope: 'Type to Motion' },
  'fintech':         { tagline: 'High-stakes interfaces for money movement — $50M+ monthly volume, KYC flows, and cross-border rails.', shipped: '5 Products', scope: 'Payments to Analytics' },
  'design-for-good': { tagline: 'Design as public good — civic platforms, accessibility-first interfaces, and community tools that scale.', shipped: '3 Projects', scope: 'Civic to Community' },
  'crypto':          { tagline: 'Trust-first interfaces for high-stakes crypto flows — KYC, multi-rail payments, and cross-border settlement.', shipped: '2 Products', scope: 'DeFi to Compliance' },
  'ai-wearables':    { tagline: 'Intelligent interfaces for smart glasses, voice assistants, and conversational AI — ambient, glanceable, safe.', shipped: '4 Products', scope: 'HUD to Voice' },
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

export default function CategoryHero({ slug, accentColor, title, titleAccent, description, stats, tools, has3D, projectCount }: CategoryHeroProps) {
  const meta = HERO_META[slug]
  const [line1, line2] = HERO_TITLES[slug] || [title, titleAccent]
  const isShort = SHORT_TITLES.has(slug)

  return (
    <section className="ch">
      {/* ── Header bar ── */}
      <motion.div
        className="ch-header"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        <span className="ch-header-count" style={{ color: accentColor }}>
          {String(projectCount).padStart(2, '0')}
        </span>
        <p className="ch-header-tagline">{meta?.tagline}</p>
      </motion.div>

      {/* ── Stage: title + 3D ── */}
      <div className={`ch-stage${isShort ? ' ch-stage--short' : ''}`}>
        {/* 3D object — behind text, adds depth */}
        {has3D && (
          <motion.div
            className="ch-3d"
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.3, delay: 0.05, ease }}
          >
            <Suspense fallback={null}>
              <CategoryObject3D slug={slug} size={420} />
            </Suspense>
          </motion.div>
        )}

        {/* Title */}
        <motion.h1
          className="ch-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
        >
          <span className="ch-line1">{line1}</span>
          <span className="ch-line2" style={{ color: accentColor }}>{line2}</span>
        </motion.h1>
      </div>

      {/* ── Description ── */}
      <motion.p
        className="ch-desc"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
      >
        {description}
      </motion.p>

      {/* ── Quick stats row ── */}
      <motion.div
        className="ch-quick"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.45 }}
      >
        {meta && (
          <>
            <div className="ch-quick-item">
              <span className="ch-quick-label">Shipped</span>
              <span className="ch-quick-val">{meta.shipped}</span>
            </div>
            <div className="ch-quick-dot" />
            <div className="ch-quick-item">
              <span className="ch-quick-label">Scope</span>
              <span className="ch-quick-val">{meta.scope}</span>
            </div>
          </>
        )}
      </motion.div>

      {/* ── Tags: stats + tools ── */}
      <motion.div
        className="ch-tags"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.03, delayChildren: 0.55 } } }}
      >
        {stats.map((s) => (
          <motion.span key={s} className="lp-stat" variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.25 } } }}>{s}</motion.span>
        ))}
        {tools.map((t) => (
          <motion.span key={t} className="lp-tool" variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.2 } } }}>{t}</motion.span>
        ))}
      </motion.div>
    </section>
  )
}
