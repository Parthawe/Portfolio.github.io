import { useState, useCallback, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import TiltCard from '../components/TiltCard'
import { getImageBrightness } from '../utils/imageBrightness'

interface ProjectCard {
  slug: string
  image: string
  name: string
  tag: string
  year: string
  desc: string
  category: string
  loading?: 'eager' | 'lazy'
}

interface WorkGroup {
  category: string
  label: string
  projects: ProjectCard[]
}

const workGroups: WorkGroup[] = [
  {
    category: 'ux',
    label: 'UX Design',
    projects: [
      { slug: 'mentra', image: '/Assets/images/mentra.png', name: 'Mentra', tag: 'AI WEARABLES', year: '2026', desc: 'OS, companion app, and app store for AI smart glasses, shipping at $299', category: 'ux', loading: 'eager' },
      { slug: 'transfi-project', image: '/Assets/images/transfi.jpg', name: 'TransFi', tag: 'WEB3 PAYMENTS', year: '2023', desc: 'Crypto payment rails across 6 Asian markets, $50M+ monthly volume', category: 'ux', loading: 'eager' },
      { slug: 'zentipay', image: '/Assets/images/zentipay.png', name: 'ZentiPay', tag: 'FINTECH', year: '2025', desc: 'Fintech super app from scratch, 30% higher transaction completion', category: 'ux', loading: 'eager' },
      { slug: 'executivelens', image: '/Assets/images/executivelens.png', name: 'ExecutiveLens', tag: 'AI ANALYTICS', year: '2026', desc: 'AI meeting intelligence saving executives 5.2 hrs/week, 87% adoption', category: 'ux' },
      { slug: 'org-dashboard', image: '/Assets/images/org-dashboard.png', name: 'OrgDashboard', tag: 'B2B SAAS', year: '2026', desc: 'SaaS giving AI agents organizational context, dual-user design', category: 'ux' },
      { slug: 'cuetv', image: '/Assets/images/cuetv.jpg', name: 'CueTV', tag: 'PRODUCT DESIGN', year: '2022', desc: 'OTT streaming platform, retargeting system generating 30K+ ad variations', category: 'ux' },
    ],
  },
  {
    category: 'good',
    label: 'Design for Good',
    projects: [
      { slug: 'raahi-project', image: '/Assets/images/raahi.jpg', name: 'Raahi', tag: 'CIVIC DESIGN', year: '2022', desc: 'Service design for Pune public transit, app, kiosk, and in-vehicle systems', category: 'good' },
      { slug: 'the-point-cdc', image: '/Assets/images/the-point-cdc.png', name: 'The Point CDC', tag: 'COMMUNITY', year: '2024', desc: 'Redesigned digital platform for a Bronx community development nonprofit', category: 'good' },
      { slug: 'office-of-diversity', image: '/Assets/images/office-of-diversity.png', name: 'Office of Diversity', tag: 'EDUCATION', year: '2024', desc: 'IDBEA report and interactive timeline for NYU Tisch, WCAG 2.1 AA', category: 'good' },
    ],
  },
  {
    category: 'ai',
    label: 'AI & Wearables',
    projects: [
      { slug: 'clawed-chat', image: '/Assets/images/clawed.png', name: 'Clawed', tag: 'AI ASSISTANT', year: '2026', desc: 'AI assistant with receipts for every action, 3-tier trust architecture', category: 'ai' },
      { slug: 'ballah-code', image: '/Assets/images/ballah-code.png', name: 'Ballah Code', tag: 'AI DEVTOOLS', year: '2026', desc: 'AI-native IDE treating AI as a senior engineer, 17 production tools', category: 'ai' },
      { slug: 'oncall-lens', image: '/Assets/images/oncall-lens.png', name: 'OnCall Lens', tag: 'DEVTOOLS', year: '2026', desc: 'Sentry alert → Claude analysis → auto PR fix, built in 24 hours', category: 'ai' },
      { slug: 'ai-voice', image: '/Assets/images/ai-voice.png', name: 'AI Voice', tag: 'CONVERSATIONAL AI', year: '2025', desc: 'Enterprise voice selection with emotional intelligence, A/B tested with 7 users', category: 'ai' },
    ],
  },
  {
    category: 'creative',
    label: 'Creative Technology',
    projects: [
      { slug: 'jugalbandi', image: '/Assets/images/jugalbandi.png', name: 'Jugalbandi', tag: 'ML + MUSIC', year: '2024', desc: 'Neural network that duets with human musicians, Maker Faire + ITP Show', category: 'creative' },
      { slug: 'keyboard-project', image: '/Assets/images/keyboard.jpg', name: 'BreakGen', tag: 'ITP THESIS', year: '2025', desc: 'AI platform: text prompts \u2192 fabrication-ready custom keyboards \u2014 200+ visitors at thesis show', category: 'creative' },
      { slug: 'vj-software', image: '/Assets/images/vj.jpg', name: 'VJ Software', tag: 'REAL-TIME VISUALS', year: '2022', desc: 'Audio-reactive visual performance tool, 5 competitor analysis, 2 personas', category: 'creative' },
      { slug: 'enigma', image: '/Assets/images/enigma.jpg', name: 'Enigma', tag: 'DEEP LEARNING', year: '2023', desc: '200-neuron light sculpture visualizing a functioning neural network', category: 'creative' },
      { slug: 'shuffle', image: '/Assets/images/shuffle.jpg', name: 'Shuffle', tag: 'INTERACTIVE', year: '2024', desc: 'Weight-sensor LED grid, physical strategy game at ITP Winter Show', category: 'creative' },
      { slug: 'making-of-time', image: '/Assets/images/making-of-time.jpg', name: 'Making of Time', tag: 'PHYSICAL COMPUTING', year: '2024', desc: 'Sundial → mechanical watch → software clock, three ways to measure time', category: 'creative' },
      { slug: 'sea-of-salt', image: '/Assets/images/sea-of-salt.jpg', name: 'Sea of Salt', tag: 'INSTALLATION', year: '2024', desc: 'Kinetic salt installation reacting to real-time ocean data', category: 'creative' },
    ],
  },
  {
    category: 'install',
    label: 'Installations',
    projects: [
      { slug: 'black-hole', image: '/Assets/images/black-hole.jpg', name: 'Black Hole', tag: 'SCIENCE + FABRICATION', year: '2026', desc: 'Five physical models of black hole phenomena, Horological Society of NY', category: 'install' },
      { slug: 'uv-light', image: '/Assets/images/uv-light.jpg', name: 'UV Light', tag: 'LIGHT ART', year: '2023', desc: 'Multi-room blacklight installation with hidden messages and live projection', category: 'install' },
      { slug: 'the-omakase', image: '/Assets/images/the-omakase.jpg', name: 'The Omakase', tag: 'ARCADE GAME', year: '2024', desc: '2-player sushi arcade cabinet, custom RGB controllers, exhibited at ITP + WonderVille', category: 'install' },
      { slug: 'revolving-stage', image: '/Assets/images/revolving-stage.jpg', name: 'Revolving Stage', tag: 'FABRICATION', year: '2022', desc: '15 ft. rotating stage supporting 250+ kgs, engineered for live theatre', category: 'install' },
      { slug: 'moniac-machine', image: '/Assets/images/moniac-machine.jpg', name: 'Moniac Machine', tag: 'GAME DESIGN', year: '2024', desc: 'Board game based on a 1949 hydraulic economic computer, strategy meets education', category: 'install' },
      { slug: 'drowning', image: '/Assets/images/drowning.jpg', name: 'Drowning', tag: 'SCENIC DESIGN', year: '2024', desc: 'Abandoned greenhouse set for NYU theatre, multi-layer lighting for 100+ audience', category: 'install' },
    ],
  },
  {
    category: 'brand',
    label: 'Brand & Visual',
    projects: [
      { slug: 'tedx', image: '/Assets/images/tedx.png', name: 'TEDxVITPune', tag: 'ART DIRECTION', year: '2021', desc: 'Art directed 65-person team, parallax cityscape stage for 800+ attendees', category: 'brand' },
      { slug: 'code-for-build', image: '/Assets/images/code-for-build.jpg', name: 'Code for Build', tag: 'BRAND + PRODUCT', year: '2021', desc: 'Brand system and developer platform for Istanbul open-source startup', category: 'brand' },
      { slug: 'typeface', image: '/Assets/images/typeface.jpg', name: "Butler's Slice", tag: 'TYPE DESIGN', year: '2022', desc: 'Variable display typeface with geometric slice cuts, 400+ glyphs', category: 'brand' },
      { slug: 'atps', image: '/Assets/images/atps.png', name: 'ArtTown Podcast', tag: 'MEDIA', year: '2021', desc: 'Visual identity and motion graphics for an art and design podcast series', category: 'brand' },
    ],
  },
]

/* Curated mixed order for "All", interleaves categories, strongest first */
const allProjectsMixed: ProjectCard[] = [
  workGroups[0].projects[0],  // Mentra (ux)
  workGroups[2].projects[0],  // Clawed (ai)
  workGroups[0].projects[1],  // TransFi (ux)
  workGroups[3].projects[0],  // Jugalbandi (creative)
  workGroups[1].projects[0],  // Raahi (good)
  workGroups[4].projects[0],  // Black Hole (install)
  workGroups[0].projects[2],  // ZentiPay (ux)
  workGroups[2].projects[1],  // Ballah Code (ai)
  workGroups[5].projects[0],  // TEDxVITPune (brand)
  workGroups[0].projects[3],  // ExecutiveLens (ux)
  workGroups[3].projects[1],  // BreakGen (creative)
  workGroups[4].projects[1],  // UV Light (install)
  workGroups[1].projects[1],  // The Point CDC (good)
  workGroups[2].projects[2],  // OnCall Lens (ai)
  workGroups[3].projects[2],  // VJ Software (creative)
  workGroups[4].projects[2],  // The Omakase (install)
  workGroups[0].projects[4],  // OrgDashboard (ux)
  workGroups[5].projects[1],  // Code for Build (brand)
  workGroups[4].projects[3],  // Revolving Stage (install)
  workGroups[3].projects[3],  // Enigma (creative)
  workGroups[1].projects[2],  // Office of Diversity (good)
  workGroups[2].projects[3],  // AI Voice (ai)
  workGroups[0].projects[5],  // CueTV (ux)
  workGroups[5].projects[2],  // Butler's Slice (brand)
  workGroups[4].projects[4],  // Moniac Machine (install)
  workGroups[3].projects[4],  // Shuffle (creative)
  workGroups[5].projects[3],  // ArtTown Podcast (brand)
  workGroups[3].projects[5],  // Making of Time (creative)
  workGroups[4].projects[5],  // Drowning (install)
]

const filters = [
  { key: 'all', label: 'All' },
  { key: 'ux', label: 'UX Design' },
  { key: 'good', label: 'Design for Good' },
  { key: 'ai', label: 'AI & Wearables' },
  { key: 'creative', label: 'Creative Tech' },
  { key: 'install', label: 'Installations' },
  { key: 'brand', label: 'Brand & Visual' },
]

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [footerVisible, setFooterVisible] = useState(false)
  const bottomNavRef = useRef<HTMLElement>(null)

  useEffect(() => {
    document.body.classList.add('page-work')
    return () => document.body.classList.remove('page-work')
  }, [])

  useEffect(() => {
    const footer = document.querySelector('.footer')
    if (!footer) return
    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0.1 }
    )
    observer.observe(footer)
    return () => observer.disconnect()
  }, [])

  const handleImgLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget
    const card = img.closest('.pcard')
    if (!card) return
    try {
      const brightness = getImageBrightness(img)
      if (brightness > 140) {
        card.classList.add('pcard--light')
      }
    } catch {
      // cross-origin or canvas error, default to dark (white text)
    }
  }, [])

  const filteredGroups = activeFilter === 'all'
    ? workGroups
    : workGroups.filter(g => g.category === activeFilter)

  const isAll = activeFilter === 'all'

  const renderCard = (project: ProjectCard) => (
    <TiltCard key={project.slug} intensity={5}>
      <Link className="pcard reveal" to={`/${project.slug}`}>
        <div className="pcard-inner">
          <div className="pcard-top-row">
            <span className="pcard-tag">{project.tag}</span>
            <span className="pcard-year">{project.year}</span>
          </div>
          <div className="pcard-visual">
            <img src={project.image} alt={project.name} loading={project.loading || 'lazy'} onLoad={handleImgLoad} />
          </div>
          <h2 className="pcard-name">{project.name}</h2>
          <div className="pcard-marquee">
            <div className="pcard-marquee-track">
              <span>{project.desc}, {project.desc}, {project.desc}, </span>
              <span>{project.desc}, {project.desc}, {project.desc}, </span>
            </div>
          </div>
        </div>
      </Link>
    </TiltCard>
  )

  return (
    <>
      <Helmet>
        <title>Work · Parth Pawar</title>
        <meta name="description" content="Selected work by Parth Pawar, product design, AI wearables, fintech, creative technology, installations." />
      </Helmet>

      <Nav />

      <main id="main-content">
        <div className="abt-paper">
          {/* SVG grid pattern defs */}
          <svg className="abt-grid-defs" aria-hidden="true">
            <defs>
              <pattern id="wk-minor-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                <line x1="0" y1="18" x2="24" y2="18" className="abt-grid-h-minor" />
                <line x1="24" y1="0" x2="24" y2="24" className="abt-grid-v-minor" strokeDasharray="3 5" />
              </pattern>
              <pattern id="wk-major-grid" width="120" height="120" patternUnits="userSpaceOnUse">
                <line x1="0" y1="18" x2="120" y2="18" className="abt-grid-h-major" />
                <line x1="120" y1="0" x2="120" y2="120" className="abt-grid-v-major" strokeDasharray="4 4" />
              </pattern>
            </defs>
          </svg>

          {/* Grid layers */}
          <svg className="abt-grid-layer" aria-hidden="true">
            <rect width="100%" height="100%" fill="url(#wk-minor-grid)" />
          </svg>
          <svg className="abt-grid-layer abt-grid-layer--major" aria-hidden="true">
            <rect width="100%" height="100%" fill="url(#wk-major-grid)" />
          </svg>

          {/* Decorative arc */}
          <div className="abt-arc" aria-hidden="true" />

          {/* Ruler marks */}
          <div className="abt-ruler abt-ruler--left" aria-hidden="true" />
          <div className="abt-ruler abt-ruler--right" aria-hidden="true" />

          <div className="wrap">
            <header className="work-page-header">
              <h1 className="work-page-title">Work</h1>
            </header>

            {isAll ? (
              <div className="pcard-masonry">
                {allProjectsMixed.map(renderCard)}
              </div>
            ) : (
              filteredGroups.map(group => (
                <section key={group.category} className="work-group" data-category={group.category}>
                  <span className="mono-label work-group-label">{group.label}</span>
                  <div className="pcard-masonry">
                    {group.projects.map(renderCard)}
                  </div>
                </section>
              ))
            )}
          </div>

          <section className="cta-v2">
            <div className="wrap cta-v2-inner">
              <h2 className="cta-v2-headline">Let's work together</h2>
              <a href="mailto:parthpawar@nyu.edu" className="cta-v2-btn magnetic">
                parthpawar@nyu.edu
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            </div>
          </section>
        </div>
      </main>

      <nav className={`work-bottom-nav${footerVisible ? ' is-hidden' : ''}`} ref={bottomNavRef} aria-label="Filter projects">
        {filters.map(f => (
          <button
            key={f.key}
            className={`pill-link work-bnav-link${activeFilter === f.key ? ' active' : ''}`}
            onClick={() => {
              setActiveFilter(f.key)
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            {f.label}
          </button>
        ))}
      </nav>

      <Footer />
    </>
  )
}
