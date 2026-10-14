import { experiencePreviewsEnabled } from '../utils/experiencePreview'
import { lazy, Suspense } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, Navigate, useParams } from 'react-router-dom'
import DraftReviewNav, {draftReviewOrder} from '../components/DraftReviewNav'
import ThemeToggle from '../components/ThemeToggle'
import ExperienceReviewIndex from '../components/ExperienceReviewIndex'
import { projectExperience, experienceRegistry } from '../data/projectExperiences'
import '../styles/typeface-page.css'
import '../styles/glyph-editor.css'
import '../styles/type-workshop.css'
import '../components/physical-worlds/worlds.css'
const ProjectPrototypePage = lazy(() => import('./ProjectPrototypePage'))
const PhysicalWorld = lazy(() => import('../components/physical-worlds/PhysicalWorld'))
const ArtTownArchive = lazy(() => import('../components/ArtTownArchive'))
const MoniacSimulator = lazy(() => import('../components/MoniacSimulator'))
const JugalbandiAnatomy = lazy(() => import('../components/jugalbandi-anatomy/JugalbandiAnatomy'))
const GlyphEditor = lazy(() => import('../components/GlyphEditor'))

export default function ExperiencePreviewPage() {
  const { project = '' } = useParams()
  const previewProjects=draftReviewOrder.filter(slug=>experienceRegistry.some(item=>item.slug===slug&&item.status==='draft'))
  if (experiencePreviewsEnabled && !project) return <ExperienceReviewIndex slugs={previewProjects} />
  if (experiencePreviewsEnabled && projectExperience(project)?.format === 'prototype') return <Suspense fallback={<p role="status">Preparing the workflow prototype…</p>}><ProjectPrototypePage preview /></Suspense>
  const physical = ['enigma','jugalbandi','revolving-stage','sea-of-salt','black-hole'].includes(project)
  if (!experiencePreviewsEnabled || (!physical && !['typeface','moniac-machine','atps'].includes(project))) return <Navigate to={projectExperience(project) ? `/${project}` : '/404'} replace />
  if (project === 'atps') return <main className="physical-world-page" id="main-content"><Helmet><title>ArtTown · Draft preview</title><meta name="robots" content="noindex,nofollow" /></Helmet><header><div><p>Draft preview · awaiting review</p><h1>ArtTown conversations</h1></div><Link to="/experience-preview">All drafts</Link><Link to="/atps">Read the case study</Link><ThemeToggle /></header><Suspense fallback={<p role="status">Preparing the original episode archive…</p>}><ArtTownArchive /></Suspense><DraftReviewNav project={project}/></main>
  if (project !== 'typeface') return <main className="physical-world-page" id="main-content">
    <Helmet><title>{project} · Draft preview</title><meta name="robots" content="noindex,nofollow" /></Helmet>
    <header><div><p>Draft preview · awaiting review</p><h1>{({enigma:'Enigma',jugalbandi:'Jugalbandi','moniac-machine':'Moniac Machine','revolving-stage':'Revolving Stage','sea-of-salt':'Why the Sea is Salt','black-hole':'Black Hole'} as Record<string,string>)[project]}</h1></div><Link to="/experience-preview">All drafts</Link><Link to={`/${project}`}>Read the case study</Link><ThemeToggle /></header>
    {project!=='jugalbandi'&&<details className="world-evidence"><summary>Compare with original photographs and drawings</summary>{(project==='jugalbandi'?[
      ['/Assets/Projects/Jugalbandi/Photos/538A3938_nsquare_23.webp','Hexa-18 sensors and wind pipes'],
      ['/Assets/Projects/Jugalbandi/Photos/538A4005_nsquare_57.webp','Mechanized harp and servos'],
      ['/Assets/Projects/Jugalbandi/Photos/757.png','Flute actuator and air supply'],
      ['/Assets/Projects/Jugalbandi/Photos/758.png','Rainstick actuator']
    ]:project==='black-hole'?[
      ['/Assets/Projects/black-hole-assets/time-trap.jpg','Time trap'],
      ['/Assets/Projects/black-hole-assets/fabric-of-universe.jpg','Spacetime fabric'],
      ['/Assets/Projects/black-hole-assets/binary-mergers.jpg','Binary studies: inspiral, merger and ringdown'],
      ['/Assets/Projects/black-hole-assets/gravitational-lensing.jpg','Original paired lensing and wormhole artifact']
    ]:[[({'enigma':'/Assets/Projects/Enigma/photos/full-sculpture-wide.webp','moniac-machine':'/Assets/Projects/Moniac/photos/hero-cabinet.png','revolving-stage':'/Assets/Projects/RevolvingStage/photos/isometric-stage.png','sea-of-salt':'/Assets/Projects/sea-of-salt/photos/mill-front.webp'} as Record<string,string>)[project],'Original photograph or construction drawing']]).map(([src,caption])=><figure key={src}><img loading="lazy" src={src} alt={caption}/><figcaption>{caption}</figcaption></figure>)}</details>}
    <Suspense fallback={<p role="status">Preparing the project experiment…</p>}>{project === 'jugalbandi' ? <JugalbandiAnatomy /> : project === 'moniac-machine' ? <><p>Play the documented economic strategy experiment. This browser adaptation uses simplified rules; the cabinet’s six photographed valves have no verified policy assignments.</p><MoniacSimulator /></> : <PhysicalWorld project={project} />}</Suspense><DraftReviewNav project={project}/>
  </main>
  return <main className="type-workshop typeface-page" id="main-content">
    <Helmet><title>Butler’s Slice workshop · Draft preview</title><meta name="robots" content="noindex,nofollow" /></Helmet>
    <header className="tw-header"><div><h1>Butler’s Slice</h1><p className="tw-kicker">Draft preview · awaiting review</p><p>Type a specimen. Inspect the cut. Reshape a letter.</p></div><Link to="/experience-preview">All drafts</Link><Link to="/typeface">Read the case study</Link><ThemeToggle /></header>
    <Suspense fallback={<p role="status">Preparing the type workshop…</p>}><GlyphEditor workshop /></Suspense>
    <DraftReviewNav project={project}/><footer className="tw-footer">Original font outlines. Edits stay in this session and are included in SVG exports; they do not modify the downloadable font family.</footer>
  </main>
}
