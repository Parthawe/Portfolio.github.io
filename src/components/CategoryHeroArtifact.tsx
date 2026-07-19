import { useEffect, useState } from 'react'
import type { CSSProperties, PointerEvent } from 'react'
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

type ArtifactProps = {
  slug: string
}

const signalDots = Array.from({ length: 6 }, (_, index) => index)
const flowNodes = Array.from({ length: 4 }, (_, index) => index)
const uxMonitorProjects = [
  {
    name: 'Mentra',
    href: '/mentra',
    image: '/Assets/images/mentra/appstore-hero.webp',
    fit: 'contain',
  },
  {
    name: 'TransFi',
    href: '/transfi-project',
    image: '/Assets/Projects/Transfi/public/Frame 427318646.png',
    fit: 'cover',
  },
  {
    name: 'Raahi',
    href: '/raahi-project',
    image: '/Assets/Projects/Raahi/photos/raahi-system-overview.webp',
    fit: 'contain',
  },
]

function AiArtifact() {
  return (
    <div className="hero-artifact hero-artifact--ai">
      <span className="artifact-ai__halo" />
      <img
        className="artifact-ai__product"
        src="/Assets/generated/ai-smart-glasses-hero-transparent.png"
        alt=""
        draggable={false}
      />
      <span className="artifact-ai__scan" />
    </div>
  )
}

function UxArtifact() {
  const reducedMotion = useReducedMotion()
  const [activeProject, setActiveProject] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const project = uxMonitorProjects[activeProject]

  useEffect(() => {
    if (reducedMotion || isPaused) return undefined
    const timer = window.setInterval(() => {
      setActiveProject((current) => (current + 1) % uxMonitorProjects.length)
    }, 3400)
    return () => window.clearInterval(timer)
  }, [isPaused, reducedMotion])

  const showNextProject = () => {
    setActiveProject((current) => (current + 1) % uxMonitorProjects.length)
  }

  return (
    <motion.div
      className="hero-artifact hero-artifact--ux hero-artifact--ux-monitor"
      onPointerEnter={() => setIsPaused(true)}
      onPointerLeave={() => setIsPaused(false)}
      whileHover={reducedMotion ? undefined : { rotateY: -4, rotateX: 2, scale: 1.025 }}
      transition={{ type: 'spring', stiffness: 170, damping: 18 }}
    >
      <div className="artifact-ux-monitor">
        <span className="artifact-ux-monitor__rear" />
        <div className="artifact-ux-monitor__display">
          <span className="artifact-ux-monitor__topbar">
            <b>DESIGN REVIEW</b>
            <i />
            <small>LIVE</small>
          </span>
          <a
            className="artifact-ux-monitor__screen"
            href={project.href}
            aria-label={`View ${project.name} project`}
          >
            <AnimatePresence initial={false} mode="wait">
              <motion.figure
                key={project.name}
                initial={reducedMotion ? false : { opacity: 0, x: 18, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={reducedMotion ? undefined : { opacity: 0, x: -16, scale: 1.02 }}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              >
                <img className={project.fit === 'contain' ? 'is-contained' : ''} src={project.image} alt="" draggable={false} />
                <figcaption>
                  <span>{project.name}</span>
                  <small>{String(activeProject + 1).padStart(2, '0')} / 03</small>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </a>
          <span className="artifact-ux-monitor__scan" />
        </div>
        <span className="artifact-ux-monitor__hinge" />
        <span className="artifact-ux-monitor__stand" />
        <span className="artifact-ux-monitor__base" />
        <button
          className="artifact-ux-monitor__next"
          type="button"
          onClick={showNextProject}
          aria-label="Show next project"
        >
          <span>›</span>
        </button>
        <span className="artifact-ux-monitor__selectors" role="group" aria-label="Choose project">
          {uxMonitorProjects.map((item, index) => (
            <button
              className={index === activeProject ? 'is-active' : ''}
              type="button"
              onClick={() => setActiveProject(index)}
              aria-label={`Show ${item.name}`}
              aria-pressed={index === activeProject}
              key={item.name}
            />
          ))}
        </span>
        <span className="artifact-ux-monitor__note">PRODUCT SYSTEMS · 03</span>
      </div>
    </motion.div>
  )
}

function CreativeTechArtifact() {
  const reducedMotion = useReducedMotion()
  const rawRotateX = useMotionValue(0)
  const rawRotateY = useMotionValue(0)
  const rotateX = useSpring(rawRotateX, { stiffness: 165, damping: 20, mass: 0.72 })
  const rotateY = useSpring(rawRotateY, { stiffness: 165, damping: 20, mass: 0.72 })

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reducedMotion) return
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5
    rawRotateX.set(y * -12)
    rawRotateY.set(x * 15)
  }

  const resetTilt = () => {
    rawRotateX.set(0)
    rawRotateY.set(0)
  }

  return (
    <motion.div
      className="hero-artifact hero-artifact--creative-tech"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      onPointerCancel={resetTilt}
      whileHover={reducedMotion ? undefined : { scale: 1.035 }}
      whileTap={reducedMotion ? undefined : { scale: 0.985 }}
      style={{ rotateX, rotateY, transformPerspective: 820 }}
    >
      <span className="artifact-creative__aura" />
      <span className="artifact-creative__scan" />
      <span className="artifact-creative__object">
        <img className="artifact-creative__wing artifact-creative__wing--left" src="/Assets/generated/creative-tech-biomechanical-butterfly-v1.png" alt="" draggable={false} />
        <img className="artifact-creative__wing artifact-creative__wing--right" src="/Assets/generated/creative-tech-biomechanical-butterfly-v1.png" alt="" draggable={false} />
        <img className="artifact-creative__core" src="/Assets/generated/creative-tech-biomechanical-butterfly-v1.png" alt="" draggable={false} />
      </span>
      <span className="artifact-creative__signal artifact-creative__signal--one" />
      <span className="artifact-creative__signal artifact-creative__signal--two" />
      <span className="artifact-creative__signal artifact-creative__signal--three" />
    </motion.div>
  )
}

function PrototypeArtifact() {
  const reducedMotion = useReducedMotion()
  const rawRotateX = useMotionValue(0)
  const rawRotateY = useMotionValue(0)
  const rotateX = useSpring(rawRotateX, { stiffness: 170, damping: 22, mass: 0.72 })
  const rotateY = useSpring(rawRotateY, { stiffness: 170, damping: 22, mass: 0.72 })

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reducedMotion) return
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5
    rawRotateX.set(y * -12)
    rawRotateY.set(x * 15)
  }

  const resetTilt = () => {
    rawRotateX.set(0)
    rawRotateY.set(0)
  }

  return (
    <motion.div
      className="hero-artifact hero-artifact--prototype"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      onPointerCancel={resetTilt}
      whileHover={reducedMotion ? undefined : { scale: 1.035 }}
      whileTap={reducedMotion ? undefined : { scale: 0.985 }}
      style={{ rotateX, rotateY, transformPerspective: 780 }}
    >
      <span className="artifact-proto__floor" />
      <span className="artifact-proto__assembly">
        <span className="artifact-proto__rail artifact-proto__rail--top" />
        <span className="artifact-proto__rail artifact-proto__rail--bottom" />
        <span className="artifact-proto__board">
          <i className="artifact-proto__chip"><b>P</b></i>
          {signalDots.map((dot) => <i className={`artifact-proto__port artifact-proto__port--${dot + 1}`} key={dot} />)}
          <i className="artifact-proto__dial artifact-proto__dial--one" />
          <i className="artifact-proto__dial artifact-proto__dial--two" />
        </span>
        <svg className="artifact-proto__wires" viewBox="0 0 300 300" aria-hidden="true">
          <path d="M57 191 C82 190 70 111 104 109" />
          <path d="M126 70 C130 41 208 54 210 93" />
          <path d="M191 201 C235 208 242 159 258 151" />
        </svg>
        <span className="artifact-proto__pulse" />
      </span>
      <span className="artifact-proto__badge"><i />LIVE PROTOTYPE</span>
    </motion.div>
  )
}

function InstallationArtifact() {
  const reducedMotion = useReducedMotion()
  const rawRotateX = useMotionValue(0)
  const rawRotateY = useMotionValue(0)
  const rotateX = useSpring(rawRotateX, { stiffness: 150, damping: 20, mass: 0.8 })
  const rotateY = useSpring(rawRotateY, { stiffness: 150, damping: 20, mass: 0.8 })

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reducedMotion) return
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5
    rawRotateX.set(y * -14)
    rawRotateY.set(x * 17)
  }

  const resetTilt = () => {
    rawRotateX.set(0)
    rawRotateY.set(0)
  }

  const ringLayers = Array.from({ length: 11 }, (_, index) => index)

  const renderRing = (variant: 'one' | 'two' | 'three') => (
    <i className={`artifact-install-sculpture__ring artifact-install-sculpture__ring--${variant}`}>
      {ringLayers.map((layer) => <b key={layer} style={{ '--ring-layer': layer } as CSSProperties} />)}
    </i>
  )

  const renderBlock = (variant: 'one' | 'two') => (
    <i className={`artifact-install-sculpture__block artifact-install-sculpture__block--${variant}`}>
      <b className="artifact-install-sculpture__block-face artifact-install-sculpture__block-face--front" />
      <b className="artifact-install-sculpture__block-face artifact-install-sculpture__block-face--back" />
      <b className="artifact-install-sculpture__block-face artifact-install-sculpture__block-face--left" />
      <b className="artifact-install-sculpture__block-face artifact-install-sculpture__block-face--right" />
      <b className="artifact-install-sculpture__block-face artifact-install-sculpture__block-face--top" />
      <b className="artifact-install-sculpture__block-face artifact-install-sculpture__block-face--bottom" />
    </i>
  )

  return (
    <motion.div
      className="hero-artifact hero-artifact--installation hero-artifact--installation-sculpture"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      onPointerCancel={resetTilt}
      whileHover={reducedMotion ? undefined : { scale: 1.035 }}
      whileTap={reducedMotion ? undefined : { scale: 0.985 }}
      style={{ rotateX, rotateY, transformPerspective: 760 }}
    >
      <span className="artifact-install-sculpture__floor" />
      <span className="artifact-install-sculpture__glow" />
      <span className="artifact-install-sculpture__scene">
        {renderRing('one')}
        {renderRing('two')}
        {renderRing('three')}
        {renderBlock('one')}
        {renderBlock('two')}
        <i className="artifact-install-sculpture__sphere artifact-install-sculpture__sphere--one" />
        <i className="artifact-install-sculpture__sphere artifact-install-sculpture__sphere--two" />
        <i className="artifact-install-sculpture__sphere artifact-install-sculpture__sphere--three" />
      </span>
      <span className="artifact-install-sculpture__axis"><i /><i /><i /></span>
    </motion.div>
  )
}

function HealthcareArtifact() {
  const reducedMotion = useReducedMotion()
  const rawRotateX = useMotionValue(0)
  const rawRotateY = useMotionValue(0)
  const rotateX = useSpring(rawRotateX, { stiffness: 160, damping: 21, mass: 0.78 })
  const rotateY = useSpring(rawRotateY, { stiffness: 160, damping: 21, mass: 0.78 })

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reducedMotion) return
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5
    rawRotateX.set(y * -10)
    rawRotateY.set(x * 13)
  }

  const resetTilt = () => {
    rawRotateX.set(0)
    rawRotateY.set(0)
  }

  return (
    <motion.div
      className="hero-artifact hero-artifact--healthcare-toolkit"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      onPointerCancel={resetTilt}
      whileHover={reducedMotion ? undefined : { scale: 1.03 }}
      whileTap={reducedMotion ? undefined : { scale: 0.988 }}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
    >
      <span className="artifact-healthcare__aura" />
      <motion.img
        className="artifact-healthcare__product"
        src="/Assets/generated/healthcare-toolkit-v1.png"
        alt=""
        draggable={false}
        animate={reducedMotion ? undefined : { y: [0, -5, 1, 0], rotateZ: [0, 0.55, -0.25, 0] }}
        transition={{ duration: 7.8, ease: 'easeInOut', repeat: Infinity }}
      />
      <span className="artifact-healthcare__pulse"><i /></span>
      <span className="artifact-healthcare__capsule artifact-healthcare__capsule--one"><i /></span>
      <span className="artifact-healthcare__capsule artifact-healthcare__capsule--two"><i /></span>
      <span className="artifact-healthcare__status"><i /><b>CARE</b></span>
    </motion.div>
  )
}

function BrandArtifact() {
  const reducedMotion = useReducedMotion()
  const rawRotateX = useMotionValue(0)
  const rawRotateY = useMotionValue(0)
  const rotateX = useSpring(rawRotateX, { stiffness: 180, damping: 18, mass: 0.65 })
  const rotateY = useSpring(rawRotateY, { stiffness: 180, damping: 18, mass: 0.65 })

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reducedMotion) return
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5
    rawRotateX.set(y * -12)
    rawRotateY.set(x * 15)
  }

  const resetTilt = () => {
    rawRotateX.set(0)
    rawRotateY.set(0)
  }

  return (
    <motion.div
      className="hero-artifact hero-artifact--brand"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      onPointerCancel={resetTilt}
      whileHover={reducedMotion ? undefined : { scale: 1.035 }}
      whileTap={reducedMotion ? undefined : { scale: 0.985 }}
      style={{ rotateX, rotateY, transformPerspective: 720 }}
    >
      <span className="artifact-brand__aura" />
      <motion.img
        className="artifact-brand__product"
        src="/Assets/generated/brand-3d-hero-v1.webp"
        alt=""
        draggable={false}
        animate={reducedMotion ? undefined : { rotateZ: [0, -1.15, 0.7, 0], y: [0, -4, 2, 0] }}
        transition={{ duration: 8.5, ease: 'easeInOut', repeat: Infinity }}
      />
      <span className="artifact-brand__satellite artifact-brand__satellite--one" />
      <span className="artifact-brand__satellite artifact-brand__satellite--two" />
      <span className="artifact-brand__satellite artifact-brand__satellite--three" />
    </motion.div>
  )
}

function ServiceArtifact({ healthcare = false }: { healthcare?: boolean }) {
  const reducedMotion = useReducedMotion()
  const rawRotateX = useMotionValue(0)
  const rawRotateY = useMotionValue(0)
  const rotateX = useSpring(rawRotateX, { stiffness: 165, damping: 22, mass: 0.74 })
  const rotateY = useSpring(rawRotateY, { stiffness: 165, damping: 22, mass: 0.74 })

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reducedMotion) return
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5
    rawRotateX.set(y * -11)
    rawRotateY.set(x * 14)
  }

  const resetTilt = () => {
    rawRotateX.set(0)
    rawRotateY.set(0)
  }

  return (
    <motion.div
      className={`hero-artifact hero-artifact--service${healthcare ? ' hero-artifact--health' : ''}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      onPointerCancel={resetTilt}
      whileHover={reducedMotion ? undefined : { scale: 1.035 }}
      whileTap={reducedMotion ? undefined : { scale: 0.985 }}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
    >
      <span className="artifact-service__floor" />
      <span className="artifact-service__network">
        <span className="artifact-service__field" />
        <svg className="artifact-service__route" viewBox="0 0 300 300" aria-hidden="true">
          <path d="M42 190 C73 111 119 225 151 153 S220 84 263 134" />
          {healthcare && <path className="artifact-service__pulse-line" d="M37 151 H92 L111 126 L132 179 L151 145 H267" />}
        </svg>
        {flowNodes.map((node) => (
          <span className={`artifact-service__node artifact-service__node--${node + 1}`} key={node}>
            <i>{healthcare && node === 2 ? '+' : ''}</i>
          </span>
        ))}
        <span className="artifact-service__halo" />
      </span>
      <span className="artifact-service__status"><i />SYSTEM CONNECTED</span>
      <span className="artifact-signature">P</span>
    </motion.div>
  )
}

export default function CategoryHeroArtifact({ slug }: ArtifactProps) {
  const reducedMotion = useReducedMotion()
  const artifact = slug === 'ai' || slug === 'ai-wearables'
    ? <AiArtifact />
    : slug === 'ux-design' || slug === 'ui'
      ? <UxArtifact />
      : slug === 'creative-tech'
        ? <CreativeTechArtifact />
        : slug === 'design-engineer'
          ? <PrototypeArtifact />
        : slug === 'installations'
          ? <InstallationArtifact />
          : slug === 'brand-visual' || slug === 'brand'
            ? <BrandArtifact />
            : slug === 'healthcare'
              ? <HealthcareArtifact />
              : <ServiceArtifact />

  return (
    <motion.div
      className={`category-hero-artifact category-hero-artifact--${slug}`}
      animate={reducedMotion ? undefined : { y: [0, -5, 0], rotateZ: [0, 0.35, 0] }}
      transition={{ duration: 7.5, ease: 'easeInOut', repeat: Infinity }}
    >
      <span className="artifact-collection__orbit" aria-hidden="true" />
      <span className="artifact-collection__shadow" aria-hidden="true" />
      {artifact}
    </motion.div>
  )
}
