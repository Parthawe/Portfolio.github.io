import { Helmet } from 'react-helmet-async'
import { Link, useParams } from 'react-router-dom'
import ThemeToggle from '../components/ThemeToggle'
import DraftReviewNav from '../components/DraftReviewNav'
import { useDraftReturn } from '../hooks/useDraftReturn'
import { privatePrototypeOrigin, privatePrototypeStudy } from '../data/privatePrototypeStudies'
import '../styles/raahi-experience.css'
export default function PrivateProjectExperiencePage(){
 const {project=''}=useParams(),study=privatePrototypeStudy(project),directory=useDraftReturn()
 if(!study)return null
 return <main id="main-content" className="raahi-experience-page" data-private-project-entry={project}>
  <Helmet><title>{study.name} · Private working prototype</title><meta name="robots" content="noindex,nofollow" /></Helmet>
  <header><nav aria-label="Experience navigation"><Link to={directory.href}>All experiences</Link><Link to={`/${project}`}>Case study</Link></nav><ThemeToggle /></header>
  <section className="raahi-experience-intro"><div><h1>{study.name}</h1><p className="raahi-experience-lead">{study.title}</p><p>{study.intro}</p><a className="raahi-experience-launch" href={`${privatePrototypeOrigin}/#/${project}`} target="_blank" rel="noopener noreferrer">Open private prototype ↗</a><p className="raahi-experience-access">Opens in a new tab. Sign in with the ChatGPT account that owns the private preview. The public captures do not grant application access.</p></div><figure><img src={study.image} width="1280" height="900" alt={`${study.name} working browser adaptation with labelled demo data`} /><figcaption>Capture from the private browser prototype. Sample data and simulated states.</figcaption></figure></section>
  <section className="raahi-experience-guide"><h2>A task to try</h2><ol>{study.steps.map(step=><li key={step}>{step}</li>)}</ol><p>{study.limits}</p><Link to={`/${project}#cs-working-prototype`}>Explore the evidence, architecture and evaluation plan</Link></section>
  <DraftReviewNav project={project}/>
 </main>
}
