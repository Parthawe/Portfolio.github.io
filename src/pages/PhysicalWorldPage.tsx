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
  if (project === 'shuffle') return <Navigate to="/shuffle/simulation" replace />
  if (project && !key) return <Navigate to="/404" replace />
  const spec = key ? worlds[key] : undefined
  const sequence = [...keys, 'shuffle']
  const next = key ? sequence[(sequence.indexOf(key) + 1) % sequence.length] : undefined
  return <main className="physical-world-page">
    <Helmet><title>{spec ? spec.title : 'Physical worlds'} · Parth Pawar</title></Helmet>
    <header><div><h1>{spec?.title ?? 'Physical worlds'}</h1><p>{spec?.setting ?? 'Objects, interfaces, and artwork in their own rooms.'}</p></div><Link to={key ? `/${key}` : '/work'}>{key ? 'Back to the project' : 'Back to Work'}</Link><ThemeToggle /></header>
    {key ? <><PhysicalWorld key={key} project={key} /><nav className="physical-world-index" aria-label="Other project rooms"><Link to="/physical-worlds">All rooms</Link><Link to={`/${next}/world`}>Next room: {next === 'shuffle' ? 'Shuffle' : worlds[next!].title} →</Link></nav></> : <div className="physical-world-index">{keys.map(item => <Link key={item} to={`/${item}/world`}><strong>{worlds[item].title}</strong><span>{worlds[item].setting} →</span></Link>)}<Link to="/shuffle/simulation"><strong>Shuffle</strong><span>Motorized plywood control board →</span></Link></div>}
  </main>
}
