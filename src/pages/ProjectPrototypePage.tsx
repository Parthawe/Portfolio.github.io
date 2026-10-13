import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, Navigate, useParams } from 'react-router-dom'
import ThemeToggle from '../components/ThemeToggle'
import ProductPrototypes from '../components/prototypes/ProductPrototypes'
import { useThemeMode } from '../hooks/useThemeMode'
import { digitalExperience, digitalHref } from '../data/projectExperiences'
import { projects } from '../data/projects'
import '../components/prototypes/prototypes.css'

export default function ProjectPrototypePage() {
  const { project = '' } = useParams()
  const dark = useThemeMode()
  const [revision, setRevision] = useState(0)
  const experience = digitalExperience(project)
  if (!experience) return <Navigate to="/404" replace />
  if (experience.mode !== 'prototype') return <Navigate to={digitalHref(experience)} replace />
  const name = projects.find(item => item.slug === project)?.name ?? project
  const note = project === 'mentra' ? 'Original onboarding prototype, with a recorded walkthrough and Figma access.' : project === 'executivelens' ? 'Existing interactive meeting demo. Prepared transcript and summary; citations reveal their source.' : 'Browser adaptation of the documented workflow. Sample data; changes stay in this session.'
  return <main className="prototype-page">
    <Helmet><title>{name} prototype · Parth Pawar</title></Helmet>
    <header className="prototype-page-header"><div><p>Interactive prototype</p><h1>{name}</h1></div><Link to={`/${project}`}>Back to the project</Link><ThemeToggle /></header>
    <div className="prototype-intro"><p>{experience.description}. {note}</p><button onClick={() => setRevision(old => old + 1)}>Restart prototype</button></div>
    <div data-prototype={project} data-prototype-theme={dark ? 'dark' : 'light'}><ProductPrototypes key={`${project}-${revision}`} project={project} /></div>
    <footer><Link to="/project-experiences">All project experiences</Link><Link to={`/${project}`}>Read the case study →</Link></footer>
  </main>
}
