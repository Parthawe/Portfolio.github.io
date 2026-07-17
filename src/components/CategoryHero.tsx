import { lazy, Suspense, useEffect, useMemo, useState, type MouseEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useDeferredMount } from '../hooks/useDeferredMount'
import CryptoHeroCoins from './CryptoHeroCoins'

const CategoryObject3D = lazy(() => import('./CategoryObject3D'))

const ease = [0.16, 1, 0.3, 1] as const
const revealTransition = { duration: 0.58, ease }

/* Clean category names for the eyebrow — data titles carry legacy
   two-line splits ("Install-" / "ations & Fabrication"). */
const CATEGORY_NAMES: Record<string, string> = {
  'ai':              'AI & Wearables',
  'ux-design':       'UX Design',
  'ui':              'UI Design',
  'creative-tech':   'Creative Tech',
  'design-engineer': 'Design Engineer',
  'installations':   'Installations',
  'brand-visual':    'Brand & Visual',
  'brand':           'Brand',
  'design-for-good': 'Design for Good',
  'healthcare':      'Healthcare',
  'fintech':         'Fintech',
  'crypto':          'Crypto & Web3',
  'ai-wearables':    'AI & Wearables',
}

const HERO_ROUTE_ALIASES: Record<string, string> = {
  ux: 'ux-design',
}

const PORTFOLIO_STATS = [
  ['30+', 'projects'],
  ['∞', 'Memories'],
  ['5+', 'years of experience'],
] as const

const WEARABLE_PORTFOLIO_STATS = [
  ['30+', 'projects'],
  ['∞', 'Memories'],
  ['6+', 'years of experience'],
] as const

const CRYPTO_PORTFOLIO_STATS = [
  ['2', 'products shipped'],
  ['3+', 'years in Web3'],
  ['Multi-market', 'payment rails'],
] as const

type AudienceItem = {
  label: string
  text: string
}

const DEFAULT_AUDIENCE: readonly AudienceItem[] = [
  {
    label: 'For\nAnyone',
    text: 'A fast read of what the work does, why it matters, and how it feels in use.',
  },
  {
    label: 'Hiring\nRecruiters',
    text: 'A curated proof set across systems, interaction, brand, code, and shipped product work.',
  },
  {
    label: 'Product\nManager',
    text: 'Decision-heavy case studies that show product judgment, tradeoffs, and measurable outcomes.',
  },
] as const

const CATEGORY_AUDIENCE: Record<string, readonly AudienceItem[]> = {
  'ux-design': [
    {
      label: 'For\nAnyone',
      text: 'UX that makes complex products feel understandable, useful, and calm when the decision matters.',
    },
    {
      label: 'Hiring\nRecruiters',
      text: 'Research, flows, prototypes, and shipped product systems across AI, fintech, civic, and consumer work.',
    },
    {
      label: 'Product\nManager',
      text: 'Messy requirements turned into clear journeys, edge states, and decisions engineering can build from.',
    },
  ],
  'ui': [
    {
      label: 'Interface\nSystems',
      text: 'UI work where hierarchy, component logic, and motion make the product easier to scan and trust.',
    },
    {
      label: 'Design\nSystems',
      text: 'Reusable patterns for dashboards, payments, companion apps, and marketing surfaces that stay consistent across screens.',
    },
    {
      label: 'Product\nDetail',
      text: 'Loading, empty, review, error, and confirmation states designed so the interface never feels unfinished.',
    },
  ],
  'ai': [
    {
      label: 'AI\nProducts',
      text: 'AI interfaces that explain what the system knows, what it is doing, and when a person should stay in control.',
    },
    {
      label: 'Product\nTeams',
      text: 'Assistant behavior, trust states, onboarding, and feedback loops shaped into product surfaces people can use repeatedly.',
    },
    {
      label: 'Hardware\n& Voice',
      text: 'Smart glasses, voice interfaces, and on-device workflows designed for constrained attention and real-world context.',
    },
  ],
  'ai-wearables': [
    {
      label: 'Wearable\nUX',
      text: 'Ambient interfaces that stay glanceable, understandable, and useful in the moment.',
    },
    {
      label: 'Hardware\nTeams',
      text: 'Wearable OS, companion apps, and AI tooling designed around constrained attention and real hardware.',
    },
    {
      label: 'Platform\nPMs',
      text: 'Setup, permissions, app discovery, and trust states turned into a coherent product system.',
    },
  ],
  'crypto': [
    {
      label: 'Crypto\nProducts',
      text: 'Web3 flows that make wallets, rails, fees, status, and risk legible before money moves.',
    },
    {
      label: 'Compliance\n& Trust',
      text: 'KYC, transaction review, receipts, and confirmation states designed as product trust, not paperwork.',
    },
    {
      label: 'Founders\n& PMs',
      text: 'Unstable crypto infrastructure turned into interfaces that feel reviewable, recoverable, and ready for real users.',
    },
  ],
  'fintech': [
    {
      label: 'Money\nMovement',
      text: 'Fintech UX for transfers, invoices, dashboards, and review moments where clarity matters more than decoration.',
    },
    {
      label: 'Product\nLeads',
      text: 'Rails, statuses, fees, balances, and proof states designed so teams can ship financial products people trust.',
    },
    {
      label: 'Risk\nMoments',
      text: 'The anxious parts get designed first: conversion, confirmation, pending states, failed payments, and what happens next.',
    },
  ],
  'creative-tech': [
    {
      label: 'Creative\nSystems',
      text: 'Interactive work where code, sound, hardware, and physical behavior are part of the design language.',
    },
    {
      label: 'Prototype\nBuilders',
      text: 'Playable systems, generative tools, and embodied interfaces built to answer questions static mockups cannot.',
    },
    {
      label: 'Show\nReady',
      text: 'Experiences made legible in public: quick to understand, satisfying to touch, and strong enough to survive a demo.',
    },
  ],
  'design-engineer': [
    {
      label: 'Design\nEngineer',
      text: 'I bridge Figma, React, motion, and prototyping so ideas get tested in the medium they depend on.',
    },
    {
      label: 'Product\nTeams',
      text: 'Ambiguous interaction problems translated into working states, components, and demos that clarify the decision.',
    },
    {
      label: 'Build\nProof',
      text: 'When the design risk is behavior, I make the thing work before polishing the story around it.',
    },
  ],
  'installations': [
    {
      label: 'Physical\nSystems',
      text: 'Installations built from motors, light, sensors, fabrication, and theatrical constraints, not just rendered as concepts.',
    },
    {
      label: 'Exhibition\nReady',
      text: 'Public interaction with visible affordances, durable builds, and clear moments of payoff.',
    },
    {
      label: 'Makers\n& Producers',
      text: 'From concept to CAD, electronics, material tests, and the last-mile decisions that make the piece hold up.',
    },
  ],
  'brand-visual': [
    {
      label: 'Brand\nSystems',
      text: 'Identity, typography, packaging, and campaign surfaces that make a product recognizable before users read the copy.',
    },
    {
      label: 'Visual\nDirection',
      text: 'Visual languages that scale from marks to launch pages, decks, packaging, and event systems.',
    },
    {
      label: 'Founders\n& Teams',
      text: 'Early product stories turned into systems: logo, type, color, product proof, and first public impression.',
    },
  ],
  'brand': [
    {
      label: 'Identity\nWork',
      text: 'Brands that make the product feel specific, memorable, and ready to be used in the real world.',
    },
    {
      label: 'Launch\nSystems',
      text: 'Type, color, image language, packaging, and campaign assets shaped into one coherent voice.',
    },
    {
      label: 'Visual\nStrategy',
      text: 'The work connects what the product is, who it is for, and how it should feel before a demo starts.',
    },
  ],
  'design-for-good': [
    {
      label: 'Civic\nSystems',
      text: 'Service design for transit, education, accessibility, and community programs where clarity changes whether people can act.',
    },
    {
      label: 'Research\nFirst',
      text: 'The work starts with lived constraints: mobility, language, trust, access, and institutional handoffs.',
    },
    {
      label: 'Impact\nTeams',
      text: 'Public-facing systems from reports and dashboards to wayfinding, content, and service flows.',
    },
  ],
  'healthcare': [
    {
      label: 'Health\nProducts',
      text: 'Healthcare UX that makes sensitive decisions clearer without turning personal data into anxiety or noise.',
    },
    {
      label: 'Patients\n& Teams',
      text: 'Interfaces for care, planning, and insight where consent, comprehension, and next steps need to stay visible.',
    },
    {
      label: 'Responsible\nAI',
      text: 'Health-facing AI designed as a support layer: explainable, reviewable, and careful about what it should not decide.',
    },
  ],
}

function CategoryAudience({ items, accentColor, categoryName }: { items: readonly AudienceItem[]; accentColor: string; categoryName: string }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (items.length < 2) return undefined
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % items.length)
    }, 5200)

    return () => window.clearInterval(id)
  }, [items.length])

  const item = items[index] ?? items[0]

  return (
    <div className="ch-audience" aria-label={`${categoryName} audience note`}>
      <AnimatePresence mode="wait">
        <motion.article
          className="ch-audience-item"
          key={`${item.label}-${index}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.24, ease: [0.2, 0, 0, 1] }}
        >
          <h2 style={{ color: accentColor }}>
            {item.label.split('\n').map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h2>
          <p>{item.text}</p>
        </motion.article>
      </AnimatePresence>
      <div className="ch-audience-dots" aria-hidden="true">
        {items.map((dot, dotIndex) => (
          <span
            key={dot.label}
            className={dotIndex === index ? 'is-active' : undefined}
            style={dotIndex === index ? { background: accentColor } : undefined}
          />
        ))}
      </div>
    </div>
  )
}

interface CategoryHeroProps {
  slug: string
  routeSlug?: string
  accentColor: string
  title: string
  titleAccent: string
  description: string
  stats: string[]
  tools: string[]
  has3D: boolean
  projectCount: number
}

export default function CategoryHero({ slug, routeSlug, accentColor, title, titleAccent, has3D }: CategoryHeroProps) {
  const heroSlug = HERO_ROUTE_ALIASES[routeSlug ?? slug] ?? routeSlug ?? slug
  const categoryName = CATEGORY_NAMES[heroSlug] || CATEGORY_NAMES[slug] || `${title} ${titleAccent}`.replace(/\s+/g, ' ').trim()
  const audienceItems = useMemo(() => CATEGORY_AUDIENCE[heroSlug] ?? CATEGORY_AUDIENCE[slug] ?? DEFAULT_AUDIENCE, [heroSlug, slug])
  const portfolioStats = heroSlug === 'crypto'
    ? CRYPTO_PORTFOLIO_STATS
    : heroSlug === 'ai-wearables'
      ? WEARABLE_PORTFOLIO_STATS
      : PORTFOLIO_STATS
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

        <motion.div
          className="ch-audience-shell"
          initial={{ opacity: 0, y: 16, scale: 0.992, filter: 'blur(5px)' }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0)' }}
          transition={{ duration: 0.68, ease }}
        >
          <CategoryAudience items={audienceItems} accentColor={accentColor} categoryName={categoryName} />
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
          {slug === 'crypto' ? (
            <CryptoHeroCoins />
          ) : show3D ? (
            <Suspense fallback={null}>
              <CategoryObject3D slug={slug} size={460} style={{ width: 'min(100%, 460px)', height: 'auto', aspectRatio: '1 / 1' }} />
            </Suspense>
          ) : null}
        </motion.div>
      )}

      <motion.div
        className="ch-hero-footer"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...revealTransition, delay: 0.28 }}
      >
        <a
          href="#lp-work"
          className="ch-work-link figma-hover"
          style={{ color: accentColor }}
          onClick={handleWorkClick}
          aria-label={`See ${categoryName} projects`}
        >
          <span>See work</span>
          <span aria-hidden="true">&darr;</span>
        </a>
        <dl className="ch-hero-stats" aria-label={`${categoryName} portfolio statistics`}>
          {portfolioStats.map(([value, label]) => (
            <div className="ch-hero-stat" key={label}>
              <dt>{value}</dt>
              <dd>{label}</dd>
            </div>
          ))}
        </dl>
      </motion.div>
    </section>
  )
}
