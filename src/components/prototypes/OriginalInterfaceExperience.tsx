import {lazy,Suspense,useEffect,useRef,useState} from 'react'
import {useThemeMode} from '../../hooks/useThemeMode'
import {interfaceSource} from '../../data/interfaceSources'
import './original-interfaces.css'
const ProductPrototypes=lazy(()=>import('./ProductPrototypes'))

export default function OriginalInterfaceExperience({project}:{project:string}) {
 const dark=useThemeMode()
 const source=interfaceSource(project)!,[selected,setSelected]=useState(0),[open,setOpen]=useState(false),[attempt,setAttempt]=useState(0),[slow,setSlow]=useState(false),[loaded,setLoaded]=useState(false),[study,setStudy]=useState(false)
 const start=useRef<HTMLButtonElement>(null),prototype=source.prototypes[selected]
 useEffect(()=>{if(!open)return;const timer=window.setTimeout(()=>setSlow(true),18000);return()=>window.clearTimeout(timer)},[open,attempt,selected])
 const close=()=>{setOpen(false);setLoaded(false);setSlow(false);requestAnimationFrame(()=>start.current?.focus())}
 return <section className="original-interface" aria-label="Original project experiences">
  <header><p className="original-interface-label">{source.live?source.live.verified?'Live product':'Product link · verification needed':prototype?prototype.provenance==='reconstructed'?'Figma task prototype · reconstructed':'Original Figma prototype':'Browser study · original source pending'}</p><h2>{source.live?source.live.verified?'Experience the released product.':'Product link needs updating.':prototype?prototype.provenance==='reconstructed'?'Explore the task prototype.':'Explore the original design.':'Original prototype not connected yet.'}</h2><p>{source.sourceNote}</p></header>
  {source.live&&<section className="original-interface-live" aria-label="Live product access"><div><h3>{source.live.verified?'Live product':'Existing product link · unverified'}</h3><p>{source.live.note}</p></div><a href={source.live.url} target="_blank" rel="noopener noreferrer">{source.live.label} ↗</a></section>}
  {prototype&&<section className="original-interface-figma" aria-label="Original Figma prototypes"><div className="original-interface-flow-tabs" role="group" aria-label="Choose an original prototype">{source.prototypes.map((flow,index)=><button key={flow.name} aria-pressed={index===selected} onClick={()=>{setSelected(index);setOpen(false);setLoaded(false);setSlow(false)}}>{flow.name}</button>)}</div><h3>{prototype.name}</h3><p>{prototype.description}</p>
   <div className={`original-interface-player${open?' is-open':''}`}>
    {open?<iframe key={`${selected}-${attempt}`} src={`https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(prototype.url)}`} title={`${prototype.name} Figma prototype`} allowFullScreen onLoad={()=>setLoaded(true)} />:<>{prototype.poster&&<img src={prototype.poster} alt={`${prototype.provenance==='reconstructed'?'Reconstructed':'Original'} ${prototype.name} screen exported from Figma`} />}<div><button ref={start} className="prototype-primary" onClick={()=>setOpen(true)}>{prototype.provenance==='reconstructed'?'Load Figma task prototype':'Load original Figma prototype'}</button><p>Figma loads only on request. Access follows the Figma file’s sharing settings.</p></div></>}
   </div>
   {open&&<div className="original-interface-player-tools"><p role="status">{slow?'If Figma is still blank or asks for access, open the original file or retry.':loaded?'The Figma frame loaded. Access and interaction depend on the Figma file’s permissions.':'Opening the original Figma prototype…'}</p><button onClick={close}>Close prototype</button><button onClick={()=>{setLoaded(false);setSlow(false);setAttempt(value=>value+1)}}>Reload prototype</button></div>}
   <a href={prototype.url} target="_blank" rel="noopener noreferrer">Open {prototype.name} in Figma ↗</a>
  </section>}
  <details className="original-interface-study" onToggle={event=>setStudy(event.currentTarget.open)}><summary>Browser interaction study <span>Sample data · local adaptation</span></summary><p>This earlier portfolio study demonstrates a limited task with prepared data. It does not connect to the live product or reproduce every original screen.</p>{study&&<Suspense fallback={<p role="status">Preparing the local study…</p>}><div data-prototype={project} data-prototype-theme={dark?'dark':'light'}><ProductPrototypes project={project}/></div></Suspense>}</details>
 </section>
}
