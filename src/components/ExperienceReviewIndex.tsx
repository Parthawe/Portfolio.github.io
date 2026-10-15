import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { Link, useSearchParams, useLocation } from 'react-router-dom'
import { projects } from '../data/projects'
import { interfaceSource, interfaceKindMatches } from '../data/interfaceSources'
import { projectExperience } from '../data/projectExperiences'
import { projectImageProps } from '../utils/projectImage'
import Nav from './Nav'
import Footer from './Footer'
import '../styles/experience-review-index.css'

const previews: Record<string, { description: string; image?: string; note?: string }> = {
  shuffle: { description: 'Move the physical board’s faders to rebalance the competing demands of student life.', note: 'Approved interactive 3D' },
  'the-omakase': { description: 'Play the original two-player sushi arcade game inside a cabinet inspired by the physical build.', image: '/Assets/Projects/the-omakase/photos/cabinet-front.webp', note: 'Original Unity game · two players · keyboard' },
  typeface: { description: 'Type with three real font weights, reshape a glyph’s curves, and export an SVG specimen.', note: 'Type workshop' },
  atps: { description: 'Find a conversation by guest or topic, then listen, seek and change playback speed.', image: '/Assets/Projects/ATPS/Desktop/1.jpg', note: 'Original recordings · historical artwork' },
  enigma: { description: 'Draw on the tablet or type a letter, then follow the input through a 200-light sculpture.', image: '/Assets/Projects/Enigma/photos/full-sculpture-wide.webp', note: 'Mouse and touch drawing · typed input' },
  jugalbandi: { description: 'Pluck the harp, operate the flute, tilt eight rainsticks and play Hexa-18’s 18 MIDI inputs.', image: '/Assets/Projects/Jugalbandi/Photos/538A4005_nsquare_57.webp', note: 'Browser-synthesized sound' },
  'moniac-machine': { description: 'Change seven economic policies, inspect one model step, or try a timed balancing game.', note: 'Simplified browser rules' },
  'revolving-stage': { description: 'Follow the stage from its base through casters, axle, platform, rotation, scenery and disassembly.', image: '/Assets/Projects/RevolvingStage/photos/isometric-stage.png', note: 'Drawing-based reconstruction' },
  'sea-of-salt': { description: 'Turn the mill by hand to advance the folktale and accumulate salt. Reverse the story or reset it.', image: '/Assets/Projects/sea-of-salt/photos/mill-front.webp', note: 'Direct mouse and touch control' },
  'black-hole': { description: 'Explore clocks, spacetime fabric, binary motion and the original light-lensing experiment.', image: '/Assets/Projects/black-hole-assets/time-trap.jpg', note: 'Qualitative demonstrations' },
  mentra: { description: 'Pair demo glasses using a source-based MentraOS flow, recover from errors, or compare the original design.', note: 'Source-based flow · simulated Bluetooth' },
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
const formatLabels: Record<string, string> = { '3d': 'Interactive 3D', anatomy: 'Anatomy mechanism', prototype: 'Working prototype', tool: 'Interactive tool', 'original-experiment': 'Original experiment / tool', media: 'Listening archive' }

const actions: Record<string,string> = { shuffle:'Rebalance the board', 'the-omakase':'Step up to the arcade',typeface:'Shape a letter',atps:'Find a conversation',enigma:'Write with light',jugalbandi:'Play a mechanism','moniac-machine':'Run the economy','revolving-stage':'Take it apart','sea-of-salt':'Turn the mill','black-hole':'Explore the studies',mentra:'Try onboarding','mentra-miniapps':'Launch a MiniApp','clawed-chat':'Review an action',executivelens:'Trace a decision','org-dashboard':'Explore the workspace',healthapp:'Rebalance a day','vj-software':'Choose a parking bay','code-for-build':'Build a page','ballah-code':'Try a code change','raahi-project':'Plan a journey' }
const filters = [{id:'all',label:'All experiences',formats:[]},{id:'objects',label:'3D objects',formats:['3d']},{id:'anatomy',label:'Anatomy',formats:['anatomy']},{id:'interfaces',label:'Interfaces',formats:['prototype']},{id:'tools',label:'Tools & games',formats:['original-experiment']},{id:'games',label:'Games',formats:[]},{id:'listen',label:'Listen',formats:['media']}]
function ExperienceCard({ slug, index }: { slug: string; index: number }) {
  const location = useLocation()
  const project = projects.find(item => item.slug === slug)
  const experience = projectExperience(slug)
  const [fallback, setFallback] = useState(false)
  const [failed, setFailed] = useState(false)
  const [loaded, setLoaded] = useState(false)
  if (!project || !experience) return null
  const preview = previews[slug]
  const original = interfaceSource(slug)
  const originalLabel = original?.live ? original.live.verified ? 'Live product' : 'Product link · verification needed' : original?.prototypes.length ? original.prototypes[0].provenance==='reconstructed'?'Figma task prototype':'Original Figma prototype' : original ? 'Browser study' : undefined
  const action = original ? original.live?.verified ? 'Explore the original product' : original.prototypes.length ? 'Try the Figma prototype' : 'Inspect the browser study' : actions[slug] || 'Open experience'
  const src = fallback ? project.image : project.cardMockupSquare || project.cover16x9 || project.cardMockup || preview?.image || project.image
  return <article className="experience-review-item"><Link className="experience-review-card" state={{draftSearch:location.search}} to={experience.status==='approved'?experience.href:`/experience-preview/${slug}`} aria-labelledby={`review-title-${slug}`} aria-describedby={`review-action-${slug}`}>
    <div className={`experience-review-image${loaded ? ' is-loaded' : ''}`}>
      {failed ? <span>Project preview unavailable</span> : <img src={src} {...projectImageProps(src)} sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 1050px) calc((100vw - 72px) / 2), 430px" alt={`${project.name} project preview`} loading={index < 2 ? 'eager' : 'lazy'} decoding="async" onLoad={() => setLoaded(true)} onError={() => { if (!fallback && src !== project.image) { setFallback(true); setLoaded(false) } else { setFailed(true); setLoaded(true) } }} />}
      <span className="experience-review-action" id={`review-action-${slug}`}>{action} <span aria-hidden="true">↗</span></span>
    </div>
    <div className="experience-review-copy">
      <div className="experience-review-meta"><span>{originalLabel || (experience.collection==='game'?'Playable game':(formatLabels[experience.presentation] ?? 'Project experience'))}</span><span>{String(index+1).padStart(2,'0')}</span></div>
      <h2 id={`review-title-${slug}`}>{project.name}</h2>
      <p>{original ? original.live ? original.live.note : original.prototypes.length ? original.sourceNote : original.sourceNote : preview?.description ?? experience.label}</p>
      <div className="experience-review-card-footer"><small>{original ? original.live?.verified ? original.prototypes.length ? 'Live product + original Figma' : 'Original hosted experience' : original.prototypes.length ? original.prototypes[0].provenance==='reconstructed'?'Reconstructed task draft':'Existing Figma flow' : 'Original source needed' : preview?.note ?? 'Awaiting review'}</small>{experience.status==='draft'&&<small>Preview · awaiting review</small>}</div>
    </div>
  </Link><div className="experience-review-related"><Link to={`/${slug}`} aria-label={`Read ${project.name} case study`}>Case study ↗</Link>{original?.live?.verified&&<a href={original.live.url} target="_blank" rel="noopener noreferrer">Live product ↗</a>}{!!original?.prototypes.length&&<a href={original.prototypes[0].url} target="_blank" rel="noopener noreferrer">Figma prototype ↗</a>}{['jugalbandi','revolving-stage'].includes(slug)&&<Link to={`/${slug}#${slug==='jugalbandi'?'cs-harp-story':'cs-stage-story'}`} aria-label={`How ${project.name} works`}>How it works ↗</Link>}</div></article>
}

export default function ExperienceReviewIndex({ slugs }: { slugs: string[] }) {
  const [params,setParams]=useSearchParams()
  const filter=filters.some(f=>f.id===params.get('kind'))?params.get('kind')!:'all'
  const query=params.get('q')||''
  const sourceKinds=[{id:'all',label:'All interfaces'},{id:'live',label:'Live products'},{id:'figma',label:'Figma prototypes'}]
  const source=sourceKinds.some(item=>item.id===params.get('source'))?params.get('source')!:'all'
  const update=(key:string,value:string)=>setParams(previous=>{const next=new URLSearchParams(previous);if(value&&value!=='all')next.set(key,value);else next.delete(key);return next},{replace:true,preventScrollReset:true})
  const setFilter=(value:string)=>update('kind',value)
  const setQuery=(value:string)=>update('q',value)
  const reset=()=>setParams({}, {replace:true,preventScrollReset:true})
  const matches=(slug:string,id:string)=>id==='all'||(id==='games'?projectExperience(slug)?.collection==='game':filters.find(f=>f.id===id)!.formats.includes(projectExperience(slug)?.presentation||''))
  const words=query.trim().toLowerCase().split(/\s+/).filter(Boolean)
  const visible=slugs.filter(slug=>{const text=`${slug==='the-omakase'?'omakasi omakase arcade game sushi':''} ${projects.find(p=>p.slug===slug)?.name} ${previews[slug]?.description} ${actions[slug]} ${interfaceSource(slug)?.sourceNote||''}`.toLowerCase();return matches(slug,filter)&&(filter!=='interfaces'||interfaceKindMatches(slug,source))&&words.every(word=>text.includes(word))})
  return <><Nav /><main className="experience-review" id="main-content">
    <Helmet><title>Project experiences · Parth Pawar</title><meta name="robots" content="noindex,nofollow"/><meta name="googlebot" content="noindex,nofollow"/></Helmet>
    <nav className="experience-review-collections" aria-label="Work collections"><Link to="/work">Work</Link><Link to="/experience-preview" aria-current="page">Experiences</Link></nav>
    <header><div><p className="experience-review-eyebrow">The interactive collection</p><h1>Project experiences</h1></div><p>Shape a letter. Play an instrument. Test a workflow. Explore the projects through something you can do.</p></header>
    <div className="experience-review-toolbar"><div className="experience-review-filters" role="group" aria-label="Filter experiences">{filters.map(f=><button key={f.id} aria-pressed={filter===f.id} onClick={()=>setFilter(f.id)}>{f.label}<span>{slugs.filter(slug=>matches(slug,f.id)).length}</span></button>)}</div><label className="experience-review-search"><span>Find an experience</span><input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search projects" /></label></div>
    {filter==='interfaces'&&<nav className="experience-interface-kinds" aria-label="Interface experience types">{sourceKinds.map(kind=><button key={kind.id} aria-pressed={source===kind.id} onClick={()=>update('source',kind.id)}>{kind.label}<span>{slugs.filter(slug=>matches(slug,'interfaces')&&interfaceKindMatches(slug,kind.id)).length}</span></button>)}</nav>}
    <div className="experience-review-status"><p role="status">{visible.length} of {slugs.length} experiences</p><p>{slugs.filter(slug=>projectExperience(slug)?.status==='draft').length} previews · {slugs.filter(slug=>projectExperience(slug)?.status==='approved').length} approved</p>{(query||filter!=='all')&&<button className="experience-review-clear" onClick={reset}>Clear filters</button>}</div>
    {visible.length?<nav className="experience-review-grid" aria-label="Project experiences">{visible.map((slug,index)=><ExperienceCard key={slug} slug={slug} index={index}/>)}</nav>:<section className="experience-review-empty"><h2>No matching experiences</h2><p>Try another project name or explore the full collection.</p><button onClick={reset}>Show all experiences</button></section>}
    <footer className="experience-review-end"><p>Looking for the process behind a project?</p><Link to="/work">Read the case studies ↗</Link><small>Preview experiences are works in progress. Original case studies remain available.</small></footer>
  </main><Footer /></>
}
