import { digitalExperiences, digitalExperience, experienceHref } from '../data/projectExperiences'
import { projects } from '../data/projects'
import { Helmet } from 'react-helmet-async'
import { Link, Navigate, useParams } from 'react-router-dom'
import ThemeToggle from '../components/ThemeToggle'
import PhysicalWorld from '../components/physical-worlds/PhysicalWorld'
import { worlds, type WorldKey } from '../components/physical-worlds/catalog'
import '../components/physical-worlds/worlds.css'

const keys = Object.keys(worlds) as WorldKey[]
export default function PhysicalWorldPage() {
  const { project } = useParams()
  const key = project && Object.prototype.hasOwnProperty.call(worlds, project) ? project as WorldKey : undefined
  if (project && digitalExperience(project)) return <Navigate to={experienceHref(project)} replace />
  if (project === 'shuffle') return <Navigate to="/shuffle/simulation" replace />
  if (project && !key) return <Navigate to="/404" replace />
  const spec = key ? worlds[key] : undefined
  const sequence = [...keys, 'shuffle']
  const next = key ? sequence[(sequence.indexOf(key) + 1) % sequence.length] : undefined
  return <main className="physical-world-page">
    <Helmet><title>{spec ? spec.title : 'Project experiences'} · Parth Pawar</title></Helmet>
    <header><div><h1>{spec?.title ?? 'Project experiences'}</h1><p>{spec?.setting ?? 'Try digital prototypes and explore physical work.'}</p></div><Link to={key ? `/${key}` : '/work'}>{key ? 'Back to the project' : 'Back to Work'}</Link><ThemeToggle /></header>
    {key ? <><PhysicalWorld key={key} project={key} /><nav className="physical-world-index" aria-label="Other project rooms"><Link to="/project-experiences">All experiences</Link><Link to={`/${next}/world`}>Next room: {next === 'shuffle' ? 'Shuffle' : worlds[next!].title} →</Link></nav></> : <div className="physical-world-index"><h2>Digital projects</h2>{digitalExperiences.map(item => <Link key={item.slug} to={experienceHref(item.slug)}><strong>{projects.find(p => p.slug === item.slug)?.name ?? item.slug}</strong><span>{item.description} →</span></Link>)}<h2>Physical work and artwork</h2>{keys.map(item => <Link key={item} to={`/${item}/world`}><strong>{worlds[item].title}</strong><span>{worlds[item].setting} →</span></Link>)}<Link to="/shuffle/simulation"><strong>Shuffle</strong><span>Motorized plywood control board →</span></Link></div>}
  </main>
}
