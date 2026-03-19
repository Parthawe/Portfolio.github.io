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
      { slug: 'mentra', image: '/Assets/images/mentra.png', name: 'Mentra', tag: 'AI WEARABLES', year: '2026', desc: "World's first wearable app store for AI smart glasses", category: 'ux', loading: 'eager' },
      { slug: 'executivelens', image: '/Assets/images/executivelens.png', name: 'ExecutiveLens', tag: 'AI ANALYTICS', year: '2026', desc: 'Business intelligence platform for C-suite executives', category: 'ux', loading: 'eager' },
      { slug: 'zentipay', image: '/Assets/images/zentipay.png', name: 'ZentiPay', tag: 'FINTECH', year: '2025', desc: 'Super app that increased transaction success by 30%', category: 'ux', loading: 'eager' },
      { slug: 'transfi-project', image: '/Assets/images/transfi.jpg', name: 'TransFi', tag: 'WEB3 UX DESIGN', year: '2023', desc: 'Cross-border crypto payments processing $50M+ monthly', category: 'ux' },
      { slug: 'cuetv', image: '/Assets/images/cuetv.jpg', name: 'CueTV', tag: 'PRODUCT DESIGN', year: '2023', desc: 'TV scheduling platform — redesigned content workflow reducing task time by 40%', category: 'ux' },
      { slug: 'org-dashboard', image: '/Assets/images/org-dashboard.png', name: 'OrgDashboard', tag: 'B2B SAAS', year: '2026', desc: 'AI-powered organizational analytics for enterprise teams', category: 'ux' },
    ],
  },
  {
    category: 'good',
    label: 'Design for Good',
    projects: [
      { slug: 'raahi-project', image: '/Assets/images/raahi.jpg', name: 'Raahi', tag: 'CIVIC DESIGN', year: '2023', desc: 'Transit accessibility platform for underserved commuters', category: 'good' },
      { slug: 'the-point-cdc', image: '/Assets/images/the-point-cdc.png', name: 'The Point CDC', tag: 'COMMUNITY', year: '2024', desc: 'Digital platform for Bronx community development', category: 'good' },
      { slug: 'office-of-diversity', image: '/Assets/images/office-of-diversity.png', name: 'Office of Diversity', tag: 'EDUCATION', year: '2024', desc: 'Web presence redesign for NYU Tisch School of the Arts', category: 'good' },
    ],
  },
  {
    category: 'ai',
    label: 'AI & Wearables',
    projects: [
      { slug: 'clawed-chat', image: '/Assets/images/clawed.png', name: 'Clawed', tag: 'AI ASSISTANT', year: '2026', desc: 'Safety-first AI assistant for smart glasses and web', category: 'ai' },
      { slug: 'oncall-lens', image: '/Assets/images/oncall-lens.png', name: 'OnCall Lens', tag: 'DEVTOOLS', year: '2026', desc: 'Sentry alerts to automated PR fixes via smart glasses', category: 'ai' },
      { slug: 'ai-voice', image: '/Assets/images/ai-voice.png', name: 'AI Voice', tag: 'CONVERSATIONAL AI', year: '2025', desc: 'Voice-driven interaction and conversational interface design', category: 'ai' },
      { slug: 'ballah-code', image: '/Assets/images/ballah-code.png', name: 'Ballah Code', tag: 'AI DEVTOOLS', year: '2026', desc: 'AI-powered developer tools and code generation platform', category: 'ai' },
    ],
  },
  {
    category: 'creative',
    label: 'Creative Technology',
    projects: [
      { slug: 'keyboard-project', image: '/Assets/images/keyboard.jpg', name: 'BreakGen', tag: 'ITP THESIS', year: '2025', desc: 'Modular keyboard with generative design and custom firmware', category: 'creative' },
      { slug: 'jugalbandi', image: '/Assets/images/jugalbandi.png', name: 'Jugalbandi', tag: 'ML + MUSIC', year: '2024', desc: 'Machine learning instrument that duets with human musicians', category: 'creative' },
      { slug: 'vj-software', image: '/Assets/images/vj.jpg', name: 'VJ Software', tag: 'REAL-TIME VISUALS', year: '2022', desc: 'Live visual performance tool with audio-reactive shaders', category: 'creative' },
      { slug: 'shuffle', image: '/Assets/images/shuffle.jpg', name: 'Shuffle', tag: 'INTERACTIVE', year: '2024', desc: 'Physical strategy simulation installation with real-time feedback', category: 'creative' },
      { slug: 'enigma', image: '/Assets/images/enigma.jpg', name: 'Enigma', tag: 'DEEP LEARNING', year: '2023', desc: 'Light sculpture powered by a neural network', category: 'creative' },
      { slug: 'making-of-time', image: '/Assets/images/making-of-time.jpg', name: 'Making of Time', tag: 'PHYSICAL COMPUTING', year: '2024', desc: 'Exploring temporal perception through physical computing', category: 'creative' },
    ],
  },
  {
    category: 'install',
    label: 'Installations',
    projects: [
      { slug: 'uv-light', image: '/Assets/images/uv-light.jpg', name: 'UV Light', tag: 'LIGHT ART', year: '2024', desc: 'Interactive ultraviolet light installation', category: 'install' },
      { slug: 'revolving-stage', image: '/Assets/images/revolving-stage.jpg', name: 'Revolving Stage', tag: 'FABRICATION', year: '2022', desc: 'Kinetic rotating stage — design through fabrication', category: 'install' },
      { slug: 'the-omakase', image: '/Assets/images/the-omakase.jpg', name: 'The Omakase', tag: 'ARCADE GAME', year: '2024', desc: '2-player competitive party arcade experience', category: 'install' },
      { slug: 'moniac-machine', image: '/Assets/images/moniac-machine.jpg', name: 'Moniac Machine', tag: 'GAME DESIGN', year: '2024', desc: 'Economic strategy board game with hydraulic mechanics', category: 'install' },
      { slug: 'drowning', image: '/Assets/images/drowning.jpg', name: 'Drowning', tag: 'SCENIC DESIGN', year: '2024', desc: 'Theatrical set design for an immersive production', category: 'install' },
    ],
  },
  {
    category: 'brand',
    label: 'Brand & Visual',
    projects: [
      { slug: 'tedx', image: '/Assets/images/tedx.png', name: 'TEDxVITPune', tag: 'ART DIRECTION', year: '2021', desc: 'Complete brand identity and event experience design', category: 'brand' },
      { slug: 'code-for-build', image: '/Assets/images/code-for-build.jpg', name: 'Code for Build', tag: 'BRAND + PRODUCT', year: '2021', desc: 'Brand system and product design for Istanbul startup', category: 'brand' },
      { slug: 'typeface', image: '/Assets/images/typeface.jpg', name: "Butler's Slice", tag: 'TYPE DESIGN', year: '2022', desc: 'Original variable display typeface with geometric cuts', category: 'brand' },
      { slug: 'atps', image: '/Assets/images/atps.png', name: 'ArtTown Podcast', tag: 'MEDIA', year: '2021', desc: 'Visual identity for a podcast series on art and design', category: 'brand' },
    ],
  },
]

/* Curated mixed order for "All" — interleaves categories for visual variety */
const allProjectsMixed: ProjectCard[] = [
  workGroups[0].projects[0],  // Mentra (ux)
  workGroups[2].projects[0],  // Clawed (ai)
  workGroups[3].projects[0],  // BreakGen (creative)
  workGroups[0].projects[1],  // ExecutiveLens (ux)
  workGroups[1].projects[0],  // Raahi (good)
  workGroups[4].projects[0],  // UV Light (install)
  workGroups[0].projects[2],  // ZentiPay (ux)
  workGroups[2].projects[1],  // OnCall Lens (ai)
  workGroups[5].projects[0],  // TEDxVITPune (brand)
  workGroups[3].projects[1],  // Jugalbandi (creative)
  workGroups[0].projects[3],  // TransFi (ux)
  workGroups[4].projects[1],  // Revolving Stage (install)
  workGroups[1].projects[1],  // The Point CDC (good)
  workGroups[2].projects[2],  // AI Voice (ai)
  workGroups[3].projects[2],  // VJ Software (creative)
  workGroups[0].projects[4],  // CueTV (ux)
  workGroups[5].projects[1],  // Code for Build (brand)
  workGroups[4].projects[2],  // The Omakase (install)
  workGroups[3].projects[3],  // Shuffle (creative)
  workGroups[1].projects[2],  // Office of Diversity (good)
  workGroups[2].projects[3],  // Ballah Code (ai)
  workGroups[0].projects[5],  // OrgDashboard (ux)
  workGroups[5].projects[2],  // Butler's Slice (brand)
  workGroups[4].projects[3],  // Moniac Machine (install)
  workGroups[3].projects[4],  // Enigma (creative)
  workGroups[5].projects[3],  // ArtTown Podcast (brand)
  workGroups[3].projects[5],  // Making of Time (creative)
  workGroups[4].projects[4],  // Drowning (install)
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
      // cross-origin or canvas error — default to dark (white text)
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
              <span>{project.desc} — {project.desc} — {project.desc} — </span>
              <span>{project.desc} — {project.desc} — {project.desc} — </span>
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
        <meta name="description" content="Selected work by Parth Pawar — product design, AI wearables, fintech, creative technology, installations." />
      </Helmet>

      <Nav />

      <main id="main-content">
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
                <span className="work-group-label">{group.label}</span>
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
      </main>

      <nav className={`work-bottom-nav${footerVisible ? ' is-hidden' : ''}`} ref={bottomNavRef} aria-label="Filter projects">
        {filters.map(f => (
          <button
            key={f.key}
            className={`work-bnav-link${activeFilter === f.key ? ' active' : ''}`}
            onClick={() => setActiveFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </nav>

      <Footer />
    </>
  )
}
