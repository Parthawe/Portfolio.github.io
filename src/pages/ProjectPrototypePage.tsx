import { experiencePreviewsEnabled } from '../utils/experiencePreview'
import { Helmet } from 'react-helmet-async'
import { Link, Navigate, useParams } from 'react-router-dom'
import DraftReviewNav from '../components/DraftReviewNav'
import ThemeToggle from '../components/ThemeToggle'
import ProductPrototypes from '../components/prototypes/ProductPrototypes'
import { useThemeMode } from '../hooks/useThemeMode'
import { digitalExperience, digitalHref, projectExperience } from '../data/projectExperiences'
import { projects } from '../data/projects'
import '../components/prototypes/prototypes.css'

export default function ProjectPrototypePage({ preview = false }: { preview?: boolean }) {
  const { project = '' } = useParams()
  const dark = useThemeMode()
  const experience = digitalExperience(project)
  if (projectExperience(project) && (!experiencePreviewsEnabled || !preview) && projectExperience(project)?.status !== 'approved') return <Navigate to={`/${project}`} replace />
  if (!experience) return <Navigate to="/404" replace />
  if (experience.mode !== 'prototype') return <Navigate to={digitalHref(experience)} replace />
  const name = projects.find(item => item.slug === project)?.name ?? project
  const note = project === 'mentra' ? 'Original onboarding prototype, with a recorded walkthrough and Figma access.' : project === 'executivelens' ? 'Existing interactive meeting demo. Prepared transcript and summary; citations reveal their source.' : 'Browser adaptation of the documented workflow. Sample data; changes stay in this session.'
  return <main className="prototype-page" id="main-content">
    <Helmet><title>{name} prototype · Parth Pawar</title>{preview&&<meta name="robots" content="noindex,nofollow"/>}</Helmet>
    <header className="prototype-page-header"><div><h1>{name}</h1><p>{preview ? 'Draft preview · awaiting review' : 'Interactive prototype'}</p></div>{preview&&<Link to="/experience-preview">All drafts</Link>}<Link to={`/${project}`}>Back to the project</Link><ThemeToggle /></header>
    <div className="prototype-intro"><p>{experience.description}. {note}</p></div>
    <div data-prototype={project} data-prototype-theme={dark ? 'dark' : 'light'}><ProductPrototypes project={project} /></div>
    {({healthapp:'/Assets/Projects/HealthApp/optimized/01-planning.webp','raahi-project':'/Assets/Projects/Raahi/photos/service%20blueprints.png','ballah-code':'/Assets/Projects/BallahCode/site/ballah-product-window.png','code-for-build':'/Assets/Projects/CodeforBuild/photos/output-code-pair.png'} as Record<string,string>)[project]&&<details className="prototype-evidence"><summary>Compare the original project evidence</summary><img loading="lazy" src={({healthapp:'/Assets/Projects/HealthApp/optimized/01-planning.webp','raahi-project':'/Assets/Projects/Raahi/photos/service%20blueprints.png','ballah-code':'/Assets/Projects/BallahCode/site/ballah-product-window.png','code-for-build':'/Assets/Projects/CodeforBuild/photos/output-code-pair.png'} as Record<string,string>)[project]} alt={project==='raahi-project'?'Original Raahi service blueprint':project==='healthapp'?'Original Health App project planning board':project==='code-for-build'?'Original Code for Build output and code pairing':'Original Ballah Code product window'}/><p>This draft adapts the documented workflow using prepared data. The reference preserves the original project interface or diagram.</p></details>}
    {preview&&<DraftReviewNav project={project}/>}<footer><Link to={preview ? '/experience-preview' : '/project-experiences'}>{preview ? 'All drafts' : 'All project experiences'}</Link><Link to={`/${project}`}>Read the case study →</Link></footer>
  </main>
}
