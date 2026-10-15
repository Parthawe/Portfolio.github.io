import {memo,useEffect,useRef,useState} from 'react'
import {useThemeMode} from '../../hooks/useThemeMode'
import PortfolioSlider from '../PortfolioSlider'
import art from './art.json'
import {MechanismAudio} from './audio'
import HexaPlayingSurface from './HexaPlayingSurface'
import {hexaSections,planeRotation,pluckAt,type HexaVoice} from './model'
import {duetSequence,noteName,parseTune,responders,tunes,type DuetEvent} from './duet'
import './anatomy-ink.css'
import './jugalbandi.css'
const Drawing=memo(function Drawing({kind}:{kind:keyof typeof art}){
 const scene=art[kind]
 return <g><g dangerouslySetInnerHTML={{__html:scene.svg}}/>{(!scene.embedded?scene.live:[]).map(part=><g key={part.id} data-moving={part.id} dangerouslySetInnerHTML={{__html:part.svg}}/>)}</g>
})
export default function JugalbandiDuet(){
 const [view,setView]=useState<'pair'|'ensemble'>('ensemble'),[allParts,setAllParts]=useState(false),[surfaceReset,setSurfaceReset]=useState(0)
 const dark=useThemeMode(),[voice,setVoice]=useState<HexaVoice>('flute'),[sound,setSound]=useState(false),[status,setStatus]=useState('Tap the top for flute, move across the middle for tanpura, or strike the bottom for tabla.'),[phase,setPhase]=useState('ready'),[active,setActive]=useState<number|null>(null),[bpm,setBpm]=useState(84),[style,setStyle]=useState<'trade'|'phrase'>('phrase'),[tune,setTune]=useState<string>(tunes[0].notes),[preset,setPreset]=useState('rising'),[error,setError]=useState(''),[running,setRunning]=useState(false),[paused,setPaused]=useState(false),[velocity,setVelocity]=useState(96)
 const root=useRef<HTMLElement>(null),hexa=useRef<SVGSVGElement>(null),robots=useRef<Partial<Record<HexaVoice,SVGSVGElement>>>({}),readout=useRef<HTMLOutputElement>(null)
 const audio=useRef<MechanismAudio[]>([]),audioOn=useRef(false),frame=useRef(0),clock=useRef(0),previous=useRef(0),queue=useRef<DuetEvent[]>([]),pulses=useRef<Partial<Record<HexaVoice,{event:DuetEvent;at:number}>>>({}),playing=useRef(false),mode=useRef<'manual'|'auto'>('manual'),shown=useRef(true),reduced=useRef(false),latest=useRef({voice,velocity,bpm});latest.current={voice,velocity,bpm}
 if(!audio.current.length)audio.current=Array.from({length:6},()=>new MechanismAudio())
 const restoreVoice=(part:HexaVoice)=>{const svg=robots.current[part];svg?.querySelectorAll('[data-moving]').forEach(node=>node.removeAttribute('transform'));svg?.querySelectorAll('[data-string]').forEach(node=>{const [a,b]=art.harp.strings[Number((node as SVGElement).dataset.string)];node.setAttribute('d',`M${a} L${b}`)});svg?.parentElement?.removeAttribute('data-responding')}
 const restore=()=>{hexaSections.forEach(section=>restoreVoice(section.id));root.current?.removeAttribute('data-call-active');root.current?.removeAttribute('data-answer-active')}
 const halt=(message='Stopped. Play a note or start a tune.')=>{cancelAnimationFrame(frame.current);frame.current=0;previous.current=0;playing.current=false;queue.current=[];pulses.current={};audio.current.forEach(a=>a.stop());restore();setActive(null);setRunning(false);setPaused(false);setPhase('ready');setStatus(message);if(readout.current)readout.current.textContent='Ready'}
 const suspend=()=>{if(!playing.current)return;cancelAnimationFrame(frame.current);frame.current=0;previous.current=0;playing.current=false;audio.current.forEach(a=>a.stop());restore();setActive(null);setPaused(true);setStatus('Paused. Resume to continue the phrase.')}
 const fire=(event:DuetEvent)=>{
  const response=responders[event.voice],call=event.side==='call';restoreVoice(event.voice);pulses.current[event.voice]={event,at:clock.current};if(!call)robots.current[event.voice]?.parentElement?.setAttribute('data-responding','true');setActive(event.note);setPhase(event.side)
  root.current?.setAttribute(call?'data-call-active':'data-answer-active',String(event.index))
  if(audioOn.current)audio.current[hexaSections.findIndex(section=>section.id===event.voice)+(call?0:3)].play(call?'hexa':response.kind,event.index,latest.current.velocity,event.voice,event.note,!call&&response.kind==='harp'?.15:0)
  const message=call?`Hexa-18 ${event.voice} plays ${noteName(event.note)}.`:response.kind==='rain'?'Rainsticks answer the beat.':`${response.name} answers ${noteName(event.note)}.`
  setStatus(message);if(readout.current)readout.current.textContent=message
 }
 const draw=()=>{
  if(reduced.current)return
  for(const current of Object.values(pulses.current)){
  if(!current||current.event.side!=='answer')continue
  const {event,at}=current,t=clock.current-at,kind=responders[event.voice].kind,robot=robots.current[event.voice]
  if(!robot)continue
  if(kind==='harp'){
   const index=event.index%11,state=pluckAt(Math.min(1.3,t*2)),part=art.harp.live[index],stringIndex=art.harp.channels[index],[a,b]=art.harp.strings[stringIndex]
   robot.querySelector(`[data-moving="horn-${index}"]`)?.setAttribute('transform',planeRotation(state.angle,part.pivot,art.harp.projection))
   robot.querySelector(`[data-string="${stringIndex}"]`)?.setAttribute('d',`M${a} Q${(a[0]+b[0])/2+state.deflection*3} ${(a[1]+b[1])/2} ${b}`)
  }else if(kind==='flute'){
   art.flute.live.forEach((part,index)=>robot.querySelector(`[data-moving="finger-${index}"]`)?.setAttribute('transform',planeRotation(((event.note+index)%3===0?0:40)*(1-Math.exp(-t*16)),part.pivot,art.flute.projection,'yz')))
  }else{
   const index=event.index%8,part=art.rain.live[index],angle=65*Math.sin(Math.min(1,t/.7)*Math.PI/2)*(index%2?-1:1)
   robot.querySelector(`[data-moving="stick-${index}"]`)?.setAttribute('transform',planeRotation(angle,part.pivot,art.rain.projection))
  }
  }
 }
 const tick=(now:number)=>{
  if(!playing.current||document.hidden||!shown.current)return
  clock.current+=previous.current?Math.min(.1,(now-previous.current)/1000):0;previous.current=now
  const due:DuetEvent[]=[]
  while(queue.current.length&&queue.current[0].at<=clock.current){const event=queue.current.shift()!;fire(event);due.push(event)}
  if(new Set(due.map(event=>event.voice)).size>1){const message=due[0].side==='call'?`Hexa-18 plays all three parts: ${noteName(due[0].note)}.`:'The robotic flute, harp and rainsticks answer together.';setStatus(message);if(readout.current)readout.current.textContent=message}
  for(const part of hexaSections){const pulse=pulses.current[part.id];if(pulse&&clock.current-pulse.at>1.9){restoreVoice(part.id);delete pulses.current[part.id]}}
  draw()
  if(!queue.current.length&&!Object.keys(pulses.current).length){halt('Phrase complete. Play again or try another instrument.');return}
  frame.current=requestAnimationFrame(tick)
 }
 const startClock=()=>{if(!playing.current){playing.current=true;previous.current=0;setRunning(true);setPaused(false);frame.current=requestAnimationFrame(tick)}}
 const manual=(note:number,part:HexaVoice=latest.current.voice)=>{
  setVoice(part)
  if(mode.current==='auto'||paused){halt();clock.current=0}mode.current='manual';setError('')
  const current=latest.current,events=duetSequence([note],part,current.bpm,'trade').map(e=>({...e,index:note-60,at:e.at+clock.current}))
  // Manual input is immediate; queued replies preserve rapid sequences without an unbounded backlog.
  fire(events[0]);queue.current=[...queue.current,events[1]].sort((a,b)=>a.at-b.at).slice(-32);startClock()
 }
 const autoplay=()=>{
  let notes:number[];try{notes=parseTune(tune)}catch(e){setError((e as Error).message);return}
  halt();clock.current=0;mode.current='auto';queue.current=(view==='ensemble'&&allParts?hexaSections.map(section=>section.id):[voice]).flatMap(part=>duetSequence(notes,part,bpm,style)).sort((a,b)=>a.at-b.at);setError('');startClock()
 }
 useEffect(()=>{
  const node=root.current!,query=matchMedia('(prefers-reduced-motion: reduce)');reduced.current=query.matches
  const observer=new IntersectionObserver(entries=>{shown.current=entries[entries.length-1].isIntersecting;if(!shown.current)suspend()});observer.observe(node)
  const hide=()=>{if(document.hidden)suspend()},motion=()=>{reduced.current=query.matches;restore()}
  document.addEventListener('visibilitychange',hide);query.addEventListener('change',motion)
  return()=>{cancelAnimationFrame(frame.current);playing.current=false;observer.disconnect();document.removeEventListener('visibilitychange',hide);query.removeEventListener('change',motion);const context=audio.current[0].context;audio.current.forEach(a=>{a.stop();a.context=null});void context?.close()}
 },[])
 async function toggleSound(){
  if(audioOn.current){audioOn.current=false;setSound(false);audio.current.forEach(a=>a.stop());return}
  try{await audio.current[0].enable();audio.current.slice(1).forEach(a=>a.context=audio.current[0].context);audioOn.current=true;setSound(true);setError('')}catch{setError('Sound could not start. Try Enable sound again; the visual duet remains available.')}
 }
 const surfacePointer=useRef<number|null>(null),surfaceLast=useRef({note:-1,at:0})
 const surfacePoint=(event:React.PointerEvent<SVGSVGElement>)=>{const matrix=event.currentTarget.getScreenCTM();return matrix?new DOMPoint(event.clientX,event.clientY).matrixTransform(matrix.inverse()):null}
 const surfacePlay=(event:React.PointerEvent<SVGSVGElement>,pressed=false)=>{
  if(surfacePointer.current!==null&&surfacePointer.current!==event.pointerId)return
  const point=surfacePoint(event);if(!point)return
  if(point.y>=280&&point.y<455&&point.x>=280&&point.x<=620){
   if(!pressed&&event.pointerType!=='mouse'&&surfacePointer.current!==event.pointerId)return
   const note=60+Math.max(0,Math.min(17,Math.floor((point.x-280)/340*18))),now=performance.now()
   if(pressed||(note!==surfaceLast.current.note&&now-surfaceLast.current.at>=65)){surfaceLast.current={note,at:now};manual(note,'tanpura')}
   if(pressed){surfacePointer.current=event.pointerId;event.currentTarget.setPointerCapture(event.pointerId)}
  }else if(pressed&&point.y>=110&&point.y<280&&point.x>=380&&point.x<=530){const index=Math.max(0,Math.min(5,Math.floor((point.x-380)/150*6)));manual([60,62,64,65,67,69][index],'flute')}
  else if(pressed&&point.y>=455&&point.y<=560&&point.x>=350&&point.x<=550)manual(point.x<450?60:67,'tabla')
 }
 const surfaceRelease=(event:React.PointerEvent<SVGSVGElement>)=>{if(surfacePointer.current!==event.pointerId)return;surfacePointer.current=null;surfaceLast.current.note=-1;if(event.currentTarget.hasPointerCapture(event.pointerId))event.currentTarget.releasePointerCapture(event.pointerId)}
 const visibleParts=view==='ensemble'?hexaSections:hexaSections.filter(section=>section.id===voice),keys='asdfghjkl;'.split('')
 return <section ref={root} className="ja iso ja-duet" data-theme={dark?'dark':'light'} aria-label="Play the Jugalbandi duet" data-phase={phase}>
  <div className="ja-intro"><p className="ja-eyebrow">You play. The machines answer.</p><h2>One phrase, two performers.</h2><p>Play Hexa-18, the MIDI instrument. Its flute calls the robotic flute, its tanpura calls the harp, and its tabla calls the rainsticks.</p></div>
  <div className="ja-duet-views" role="group" aria-label="Performance view"><button aria-pressed={view==='pair'} onClick={()=>{halt();setView('pair')}}>One pairing</button><button aria-pressed={view==='ensemble'} onClick={()=>{halt();setView('ensemble')}}>All instruments</button></div>
  <div className="ja-duet-pairing" role="group" aria-label="Duet pairing">{hexaSections.map(section=><button key={section.id} aria-pressed={voice===section.id} onClick={()=>{halt();setVoice(section.id)}}>{section.name}<span> → {responders[section.id].name}</span></button>)}</div>
  <div className={`ja-duet-stage ${view==='ensemble'?'ja-ensemble-stage':''}`}>
   <figure className="iso-plate"><div className="ja-caption"><span>You · Hexa-18</span><span>{hexaSections.find(s=>s.id===voice)!.location} · {voice}</span></div><svg className="iso-svg" ref={hexa} onPointerLeave={()=>{if(surfacePointer.current===null)surfaceLast.current.note=-1}} onPointerDown={event=>{if(event.button===0)surfacePlay(event,true)}} onPointerMove={event=>surfacePlay(event)} onPointerUp={surfaceRelease} onPointerCancel={surfaceRelease} onLostPointerCapture={surfaceRelease} viewBox="150 0 600 650" role="img" aria-label={`Hexa-18 ${voice} caller`}><Drawing kind="hexa"/></svg><figcaption className="ja-caption">{phase==='call'?'Playing your note':'Tap top · glide middle · strike bottom'}</figcaption></figure>
   {visibleParts.map(section=>{const response=responders[section.id];return <figure key={section.id} className="iso-plate"><div className="ja-caption"><span>Robotic answer · {section.name}</span><span>{response.name}</span></div><svg className="iso-svg" ref={node=>{if(node)robots.current[section.id]=node;else delete robots.current[section.id]}} viewBox={response.kind==='rain'?'150 0 600 650':'0 0 900 650'} role="img" aria-label={`${response.name} responder`}><Drawing kind={response.kind}/></svg><figcaption className="ja-caption">Answers Hexa-18’s {section.name.toLowerCase()}</figcaption></figure>})}
  </div>
  <div className="ja-duet-readout"><output ref={readout} aria-hidden="true">Ready</output><p role="status">{status}</p><button aria-pressed={sound} onClick={toggleSound}>{sound?'Sound on':'Enable sound'}</button></div>
  <div className="ja-duet-controls">
   <div><h3>Play Hexa-18</h3><HexaPlayingSurface key={surfaceReset} onPlay={manual} activeVoice={voice} activeNote={active}/><details className="ja-note-keyboard"><summary>Use the note keyboard instead</summary><p>Tap a note or focus the keyboard and use A S D F G H J K L ;. The matching machine answers each input.</p><div className="ja-duet-keys" role="group" aria-label="Play Hexa-18 notes" onKeyDown={e=>{if(e.repeat||e.altKey||e.ctrlKey||e.metaKey)return;const i=keys.indexOf(e.key.toLowerCase());if(i>=0){e.preventDefault();manual(60+i)}}}>{Array.from({length:18},(_,i)=><button key={i} aria-label={`Play ${noteName(60+i)}`} aria-pressed={active===60+i} onClick={()=>manual(60+i)}>{noteName(60+i)}{i<10&&<small>{keys[i].toUpperCase()}</small>}</button>)}</div></details><label>Playing strength <output>{velocity}</output><PortfolioSlider aria-label="Playing strength" min={1} max={127} value={velocity} onChange={e=>setVelocity(Number(e.target.value))}/></label></div>
   <div><h3>Let a tune lead</h3><label htmlFor="ja-duet-tune">Demo tune</label><select id="ja-duet-tune" value={preset} onChange={e=>{halt();setPreset(e.target.value);const chosen=tunes.find(t=>t.id===e.target.value);if(chosen)setTune(chosen.notes)}}>{tunes.map(t=><option value={t.id} key={t.id}>{t.name}</option>)}<option value="custom">Your own notes</option></select><label htmlFor="ja-duet-notes">Notes · C3–C6, up to 32</label><textarea id="ja-duet-notes" value={tune} onChange={e=>{halt();setPreset('custom');setTune(e.target.value);setError('')}} spellCheck={false}/><label htmlFor="ja-duet-style">Response style</label><select id="ja-duet-style" value={style} onChange={e=>{halt();setStyle(e.target.value as 'trade'|'phrase')}}><option value="phrase">Phrase, then robotic reply</option><option value="trade">Take turns, one note each</option></select><label>Tempo <output>{bpm} BPM</output><PortfolioSlider aria-label="Duet tempo" min={40} max={160} value={bpm} onChange={e=>{halt();setBpm(Number(e.target.value))}}/></label>{view==='ensemble'&&<label className="ja-ensemble-autoplay"><input type="checkbox" checked={allParts} onChange={e=>{halt();setAllParts(e.target.checked)}}/> Autoplay all three parts together</label>}<div className="ja-secondary"><button onClick={autoplay}>Autoplay tune</button>{running&&<><button onClick={paused?startClock:suspend}>{paused?'Resume duet':'Pause duet'}</button><button onClick={()=>halt()}>Stop duet</button></>}<button onClick={()=>{halt('Reset. Sound off; choose a note or tune.');setSurfaceReset(n=>n+1);audioOn.current=false;setSound(false);setVoice('flute');setAllParts(false);setBpm(84);setStyle('phrase');setPreset('rising');setTune(tunes[0].notes);setVelocity(96);setError('');clock.current=0}}>Reset duet</button></div></div>
  </div>
  {error&&<p className="ja-duet-error" role="alert">{error}</p>}
  <p className="ja-note">The instrument pairings follow the project. Browser sounds, note mapping, fingering and response timing are illustrative. Hexa-18 has 18 inputs in total; their original wiring and split between sections are not reconstructed. This browser duet echoes your notes; it does not run the original trained model. Demo tunes are simple note studies.</p>
 </section>
}
