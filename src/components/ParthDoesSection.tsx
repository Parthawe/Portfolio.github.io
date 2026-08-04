import { lazy, Suspense, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import FigmaFrameLabel from './FigmaFrameLabel'
import { useDeferredMount } from '../hooks/useDeferredMount'
import { useInView } from '../hooks/useInView'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { isLowPowerDevice } from '../utils/performance'

const CategoryObject3D = lazy(() => import('./CategoryObject3D'))

interface Skill {
  label: string
  objectSlug: string
  description: string
  mockupSrc: string
  mockupAlt: string
}

const skills: Skill[] = [
  {
    label: 'UX Design',
    objectSlug: 'ux-design',
    description: 'I turn messy product flows into calm, learnable interfaces where every state explains what happens next.',
    mockupSrc: '/Assets/mockups/projects/raahi-project_16x9.webp',
    mockupAlt: 'Raahi transit product interface mockup',
  },
  {
    label: 'Product Design',
    objectSlug: 'ux-design',
    description: 'I shape early product systems from research, structure, and shipped screens, not just polished mockups.',
    mockupSrc: '/Assets/mockups/projects/mentra_16x9.webp',
    mockupAlt: 'Mentra wearable OS product mockup',
  },
  {
    label: 'Fintech',
    objectSlug: 'fintech',
    description: 'I design payment and crypto flows around confidence: visible risk, clear status, and reviewable decisions.',
    mockupSrc: '/Assets/mockups/projects/zentipay_16x9.webp',
    mockupAlt: 'ZentiPay fintech interface mockup',
  },
  {
    label: 'Design Engineering',
    objectSlug: 'design-engineering',
    description: 'I carry interface systems from Figma into responsive, accessible production code.',
    mockupSrc: '/Assets/mockups/projects/mentra_16x9.webp',
    mockupAlt: 'Mentra product interface mockup',
  },
  {
    label: 'Physical Computing',
    objectSlug: 'installations',
    description: 'I build responsive objects and installations that let people understand systems through touch and behavior.',
    mockupSrc: '/Assets/mockups/projects/moniac-machine_16x9.webp',
    mockupAlt: 'Moniac Machine physical computing mockup',
  },
  {
    label: 'Installations',
    objectSlug: 'installations',
    description: 'I compose space, hardware, and interaction into experiences that feel legible without needing instructions.',
    mockupSrc: '/Assets/mockups/projects/drowning_16x9.webp',
    mockupAlt: 'Drowning stage installation mockup',
  },
]

export default function ParthDoesSection() {
  const [skillIndex, setSkillIndex] = useState(0)
  const [sectionRef, sectionInView] = useInView<HTMLElement>(0.08, '160px 0px')
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const lowPowerDevice = isLowPowerDevice()
  const mountObject = useDeferredMount(!prefersReducedMotion && sectionInView, {
    timeout: lowPowerDevice ? 2400 : 1600,
    delayMs: lowPowerDevice ? 360 : 120,
  })
  const activeSkill = skills[skillIndex]

  useEffect(() => {
    if (prefersReducedMotion) return
    const id = window.setInterval(() => {
      setSkillIndex((current) => (current + 1) % skills.length)
    }, 3000)
    return () => window.clearInterval(id)
  }, [prefersReducedMotion])

  return (
    <section className="wr-about-section" style={{ position: 'relative' }} ref={sectionRef}>
      <FigmaFrameLabel name="About" />
      <div className="wr-about-card" id="about-card">
        <svg className="wr-about-border" preserveAspectRatio="none" aria-hidden="true">
          <line x1="12" y1="12" x2="12" y2="100%" stroke="var(--ink-15)" strokeWidth="1" strokeDasharray="1 3" />
          <line x1="100%" y1="12" x2="100%" y2="100%" stroke="var(--ink-15)" strokeWidth="1" strokeDasharray="1 3" transform="translate(-12,0)" />
          <line x1="12" y1="12" x2="100%" y2="12" stroke="var(--ink-15)" strokeWidth="1" strokeDasharray="1 3" />
          <line x1="12" y1="100%" x2="100%" y2="100%" stroke="var(--ink-15)" strokeWidth="1" strokeDasharray="1 3" transform="translate(0,-12)" />
        </svg>
        <div className="wr-about-dot" style={{ top: '11px' }} />
        <div className="wr-about-dot" style={{ top: '28%' }} />
        <div className="wr-about-dot" style={{ top: '50%' }} />
        <div className="wr-about-dot" style={{ top: '72%' }} />
        <div className="wr-about-dot" style={{ bottom: '11px' }} />

        <div className="wr-about-top">
          <div className="wr-about-top-left">
            <span className="wr-about-num">{String(skillIndex + 1).padStart(2, '0')}</span>
            <span className="wr-about-skill-label">{activeSkill.label.toUpperCase()}</span>
          </div>
          <div className="wr-about-top-right">
            <span className="wr-about-dot-sq" />
            <span className="wr-label">ABOUT</span>
            <span className="wr-about-dot-sq" />
          </div>
        </div>

        <div className="wr-about-body">
          <div className="wr-about-text">
            <h2 className="wr-about-heading">Parth Pawar</h2>
            <h2 className="wr-about-heading">does</h2>
            <div className="wr-about-cycle">
              <div className="wr-about-skill-wrap">
                <span className="wr-about-skill" key={activeSkill.label}>{activeSkill.label}</span>
              </div>
            </div>
            <p className="wr-about-desc">{activeSkill.description}</p>
            <Link to="/about" className="wr-about-readmore">read more.</Link>
            <span className="wr-about-site" aria-hidden="true">PARTHPAWAR.COM</span>
          </div>

          <div className="wr-about-img-col">
            <div className="wr-about-object-wrap" aria-hidden="true">
              <div className="wr-about-object-stage">
                <div className="wr-about-object-shell" key={activeSkill.label}>
                  {mountObject ? (
                    <Suspense fallback={null}>
                      <CategoryObject3D slug={activeSkill.objectSlug} size={250} className="wr-about-object-canvas" />
                    </Suspense>
                  ) : null}
                </div>
              </div>
            </div>
            <figure className="wr-about-work-preview" key={`${activeSkill.label}-mockup`}>
              <img src={activeSkill.mockupSrc} alt={activeSkill.mockupAlt} loading="lazy" />
            </figure>
          </div>
        </div>

        <div className="wr-about-vert" aria-hidden="true">PARTHPAWARWORKS</div>
        <div className="wr-about-bottom">
          <div className="wr-about-bottom-left">
            <span className="wr-about-dot-circle" />
            <span className="wr-about-num">{String(skillIndex + 1).padStart(2, '0')} / {String(skills.length).padStart(2, '0')}</span>
          </div>
          <div className="wr-about-bottom-right">
            <span className="wr-about-dot-sq" />
            <span className="wr-about-meta-label">CURRENTLY BASED IN</span>
            <span className="wr-about-meta-val">SAN FRANCISCO, CA</span>
            <span className="wr-about-meta-coord">37.7749&deg; N, 122.4194&deg; W</span>
          </div>
        </div>
      </div>
    </section>
  )
}
