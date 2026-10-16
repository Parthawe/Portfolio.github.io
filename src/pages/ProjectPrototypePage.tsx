import { useDraftReturn } from '../hooks/useDraftReturn'
import { experiencePreviewsEnabled } from '../utils/experiencePreview'
import { Helmet } from 'react-helmet-async'
import { Link, Navigate, useParams } from 'react-router-dom'
import DraftReviewNav from '../components/DraftReviewNav'
import ThemeToggle from '../components/ThemeToggle'
import OriginalInterfaceExperience from '../components/prototypes/OriginalInterfaceExperience'
import { interfaceSource } from '../data/interfaceSources'
import { useThemeMode } from '../hooks/useThemeMode'
import { digitalExperience, digitalHref, projectExperience } from '../data/projectExperiences'
import { projects } from '../data/projects'
import '../components/prototypes/prototypes.css'

export default function ProjectPrototypePage({ preview = false }: { preview?: boolean }) {
  const { project = '' } = useParams()
  const directory=useDraftReturn()
  const dark = useThemeMode()
  const experience = digitalExperience(project)
  if (projectExperience(project) && (!experiencePreviewsEnabled || !preview) && projectExperience(project)?.status !== 'approved') return <Navigate to={`/${project}`} replace />
  if (!experience) return <Navigate to="/404" replace />
  if (experience.mode !== 'prototype') return <Navigate to={digitalHref(experience)} replace />
  const name = projects.find(item => item.slug === project)?.name ?? project
  return <main className="prototype-page" id="main-content">
    <Helmet><title>{name} prototype · Parth Pawar</title>{preview&&<meta name="robots" content="noindex,nofollow"/>}</Helmet>
    <header className="prototype-page-header"><div><h1>{name}</h1><p>{preview ? 'Draft preview · awaiting review' : 'Interactive prototype'}</p></div>{preview&&<Link to={directory.href}>All experiences</Link>}<Link to={`/${project}`}>Back to the project</Link><ThemeToggle /></header>
    <div data-interface-project={project} data-interface-theme={dark ? 'dark' : 'light'}>{interfaceSource(project)&&<OriginalInterfaceExperience key={project} project={project} />}</div>
    {({healthapp:'/Assets/Projects/HealthApp/optimized/01-planning.webp','raahi-project':'/Assets/Projects/Raahi/photos/service%20blueprints.png','ballah-code':'/Assets/Projects/BallahCode/site/ballah-product-window.png','code-for-build':'/Assets/Projects/CodeforBuild/photos/output-code-pair.png'} as Record<string,string>)[project]&&<details className="prototype-evidence"><summary>Compare the original project evidence</summary><img loading="lazy" src={({healthapp:'/Assets/Projects/HealthApp/optimized/01-planning.webp','raahi-project':'/Assets/Projects/Raahi/photos/service%20blueprints.png','ballah-code':'/Assets/Projects/BallahCode/site/ballah-product-window.png','code-for-build':'/Assets/Projects/CodeforBuild/photos/output-code-pair.png'} as Record<string,string>)[project]} alt={project==='raahi-project'?'Original Raahi service blueprint':project==='healthapp'?'Original Health App project planning board':project==='code-for-build'?'Original Code for Build output and code pairing':'Original Ballah Code product window'}/><p>This draft adapts the documented workflow using prepared data. The reference preserves the original project interface or diagram.</p></details>}
    {preview&&<DraftReviewNav project={project}/>}<footer><Link to={preview ? directory.href : '/project-experiences'}>{preview ? 'All experiences' : 'All project experiences'}</Link><Link to={`/${project}`}>Read the case study →</Link></footer>
  </main>
}
