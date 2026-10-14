import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { projects } from '../data/projects'
import { projectExperience } from '../data/projectExperiences'
import { projectImageProps } from '../utils/projectImage'
import ThemeToggle from './ThemeToggle'
import '../styles/experience-review-index.css'

const previews: Record<string, { description: string; image?: string; note?: string }> = {
  typeface: { description: 'Type with three real font weights, reshape a glyph’s curves, and export an SVG specimen.', note: 'Type workshop' },
  atps: { description: 'Find a conversation by guest or topic, then listen, seek and change playback speed.', image: '/Assets/Projects/ATPS/Desktop/1.jpg', note: 'Original recordings · historical artwork' },
  enigma: { description: 'Type a letter and follow its shape through a 200-light sculpture. Inspect each layer up close.', image: '/Assets/Projects/Enigma/photos/full-sculpture-wide.webp', note: 'Typed input · drawing withheld' },
  jugalbandi: { description: 'Explore the instrument ensemble, pluck a harp string, operate the flute and tilt the rainsticks.', image: '/Assets/Projects/Jugalbandi/Photos/538A4005_nsquare_57.webp', note: 'Browser-synthesized sound' },
  'moniac-machine': { description: 'Change seven economic policies, inspect one model step, or try a timed balancing game.', note: 'Simplified browser rules' },
  'revolving-stage': { description: 'Rotate the scenery and lift the deck to inspect its fixed base, bearing and sixteen casters.', image: '/Assets/Projects/RevolvingStage/photos/isometric-stage.png', note: 'Drawing-based reconstruction' },
  'sea-of-salt': { description: 'Turn the mill by hand to advance the folktale and accumulate salt. Reverse the story or reset it.', image: '/Assets/Projects/sea-of-salt/photos/mill-front.webp', note: 'Direct mouse and touch control' },
  'black-hole': { description: 'Explore clocks, spacetime fabric, binary motion and the original light-lensing experiment.', image: '/Assets/Projects/black-hole-assets/time-trap.jpg', note: 'Qualitative demonstrations' },
  mentra: { description: 'Watch the original glasses onboarding walkthrough or open its interactive Figma prototype.', note: 'Original recording and Figma' },
  'mentra-miniapps': { description: 'Review Notes permissions, save a note and choose what appears on the glasses. Inspect other app designs.', image: '/Assets/images/mentra/os-all-apps.png', note: 'Notes task · other screens are archives' },
  'clawed-chat': { description: 'Edit a proposed reply, choose a safety mode, approve locally and inspect the exact action receipt.', image: '/Assets/images/clawed.webp', note: 'Sample inbox · no messages sent' },
  executivelens: { description: 'Seek through a prepared meeting and trace summary claims back to their transcript evidence.', note: 'Prepared meeting transcript' },
  'org-dashboard': { description: 'Browse organizational knowledge, inspect its sources and review a change to a release checklist.', note: 'Prepared workspace records' },
  healthapp: { description: 'Adjust today’s capacity, choose a task to defer, then review, apply or undo the proposed schedule.', image: '/Assets/Projects/HealthApp/optimized/09-calendar.webp', note: 'Sample schedule' },
  'vj-software': { description: 'Choose a floor, vehicle and compatible parking bay, then review a sample reservation.', image: '/Assets/Projects/vj/photos/car-parking.png', note: 'Sample availability · no booking' },
  'code-for-build': { description: 'Edit and arrange page blocks, inspect the rendered output and structure, then export the HTML.', image: '/Assets/Projects/CodeforBuild/photos/output-code-pair.png', note: 'Browser adaptation of the learning concept' },
  'ballah-code': { description: 'Test a button’s behavior or signup validation, inspect a proposed code change and apply it locally.', image: '/Assets/Projects/BallahCode/site/ballah-product-window.png', note: 'Prepared coding exercises' },
  'raahi-project': { description: 'Plan a sample transit journey across the app, stop, vehicle and transfer, including a missed vehicle.', image: '/Assets/Projects/Raahi/photos/Frame%20427318655.png', note: 'Prepared journey · no live transit data' },
}
const formatLabels: Record<string, string> = { physical: 'Physical model', prototype: 'Working prototype', tool: 'Interactive tool', experiment: 'Strategy experiment', media: 'Listening archive' }

function ExperienceCard({ slug, index }: { slug: string; index: number }) {
  const project = projects.find(item => item.slug === slug)
  const experience = projectExperience(slug)
  const [fallback, setFallback] = useState(false)
  const [failed, setFailed] = useState(false)
  const [loaded, setLoaded] = useState(false)
  if (!project || !experience) return null
  const preview = previews[slug]
  const src = fallback ? project.image : preview?.image ?? project.image
  return <Link className="experience-review-card" to={`/experience-preview/${slug}`} aria-labelledby={`review-title-${slug}`}>
    <div className={`experience-review-image${loaded ? ' is-loaded' : ''}`}>
      {failed ? <span>Project preview unavailable</span> : <img src={src} {...projectImageProps(src)} sizes="(max-width: 680px) calc(100vw - 40px), (max-width: 1280px) calc((100vw - 64px) / 2), 608px" alt={`${project.name} project preview`} loading={index < 2 ? 'eager' : 'lazy'} decoding="async" onLoad={() => setLoaded(true)} onError={() => { if (!fallback && src !== project.image) { setFallback(true); setLoaded(false) } else { setFailed(true); setLoaded(true) } }} />}
    </div>
    <div className="experience-review-copy">
      <div className="experience-review-meta"><span>{formatLabels[experience.format] ?? 'Project experience'}</span><span>Draft</span></div>
      <h2 id={`review-title-${slug}`}>{project.name}</h2>
      <p>{preview?.description ?? experience.label}</p>
      <div className="experience-review-card-footer"><small>{preview?.note ?? 'Awaiting review'}</small><span>Open draft <span aria-hidden="true">→</span></span></div>
    </div>
  </Link>
}

export default function ExperienceReviewIndex({ slugs }: { slugs: string[] }) {
  return <main className="physical-world-page experience-review" id="main-content">
    <Helmet><title>Project draft previews · Parth Pawar</title><meta name="robots" content="noindex,nofollow"/><meta name="googlebot" content="noindex,nofollow"/></Helmet>
    <header><div><h1>Explore the project drafts</h1><p>{slugs.length} experiences to try: physical models, working prototypes, tools and original recordings. Each card explains what you can do.</p></div><Link to="/work">Back to Work</Link><ThemeToggle /></header>
    <p className="experience-review-status">These experiences are draft previews awaiting review. Original project case studies remain available alongside them.</p>
    <nav className="experience-review-grid" aria-label="Project experience drafts">{slugs.map((slug, index) => <ExperienceCard key={slug} slug={slug} index={index} />)}</nav>
  </main>
}
