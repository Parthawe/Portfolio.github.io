import {useRef,useState,type PointerEvent} from 'react'
import type {HexaVoice} from './model'
import {noteName} from './duet'
type Props={activeVoice:HexaVoice;activeNote:number|null;onPlay:(note:number,voice:HexaVoice)=>void}
/** Accessible browser gestures for the three creator-described instrument regions. */
export default function HexaPlayingSurface({onPlay,activeVoice,activeNote}:Props){
 const [position,setPosition]=useState(8),pointer=useRef<number|null>(null),last=useRef({note:-1,at:0})
 const move=(event:PointerEvent<HTMLDivElement>,force=false)=>{
  if(pointer.current!==null&&event.pointerId!==pointer.current)return
  if(event.pointerType!=='mouse'&&pointer.current!==event.pointerId)return
  const rect=event.currentTarget.getBoundingClientRect()
  if(!force&&(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom))return
  const index=Math.max(0,Math.min(17,Math.floor((event.clientX-rect.left)/rect.width*18))),now=performance.now();setPosition(index)
  if(force||(index!==last.current.note&&now-last.current.at>=65)){last.current={note:index,at:now};onPlay(60+index,'tanpura')}
 }
 const release=(event:PointerEvent<HTMLDivElement>)=>{if(pointer.current!==event.pointerId)return;pointer.current=null;last.current.note=-1;if(event.currentTarget.hasPointerCapture(event.pointerId))event.currentTarget.releasePointerCapture(event.pointerId)}
 return <div className="ja-hexa-surface" aria-label="Hexa-18 playing surface">
  <div className="ja-surface-top"><p>Top · Flute <small>Tap a pipe input</small></p><div role="group" aria-label="Flute touch inputs">{[60,62,64,65,67,69].map((note,index)=><button key={note} aria-pressed={activeVoice==='flute'&&activeNote===note} aria-label={`Flute touch ${index+1}: ${noteName(note)}`} onClick={()=>onPlay(note,'flute')}>{noteName(note)}</button>)}</div></div>
  <div className="ja-surface-middle"><p>Middle · Tanpura <small>Move the pointer here, or drag a finger</small></p><div className="ja-tanpura-pad" role="slider" tabIndex={0} aria-label="Tanpura hand position" aria-valuemin={0} aria-valuemax={17} aria-valuenow={position} aria-valuetext={noteName(60+position)} style={{'--hand-position':`${position/17*100}%`} as React.CSSProperties}
   onPointerDown={event=>{if(event.button!==0||pointer.current!==null)return;pointer.current=event.pointerId;event.currentTarget.setPointerCapture(event.pointerId);move(event,true);event.preventDefault()}}
   onPointerMove={event=>move(event)} onPointerUp={release} onPointerCancel={release} onLostPointerCapture={release} onPointerLeave={()=>{if(pointer.current===null)last.current.note=-1}}
   onKeyDown={event=>{let next=position;if(event.key==='ArrowRight'||event.key==='ArrowUp')next=Math.min(17,position+1);else if(event.key==='ArrowLeft'||event.key==='ArrowDown')next=Math.max(0,position-1);else if(event.key==='Home')next=0;else if(event.key==='End')next=17;else if(event.key!=='Enter'&&event.key!==' ')return;event.preventDefault();setPosition(next);onPlay(60+next,'tanpura')}}><span aria-hidden="true"/><output aria-hidden="true">{noteName(60+position)}</output></div></div>
  <div className="ja-surface-bottom"><p>Bottom · Tabla <small>Tap to strike</small></p><div role="group" aria-label="Tabla touch inputs"><button aria-pressed={activeVoice==='tabla'&&activeNote===60} onClick={()=>onPlay(60,'tabla')}>Low strike</button><button aria-pressed={activeVoice==='tabla'&&activeNote===67} onClick={()=>onPlay(67,'tabla')}>High strike</button></div></div>
  <p className="ja-note">These touch and movement zones are browser controls, not a reconstruction of the 18-sensor wiring.</p>
 </div>
}
