import assert from 'node:assert/strict'
import {parseTune,duetSequence,responders,noteName} from '../src/components/jugalbandi-anatomy/duet.ts'
assert.deepEqual(parseTune('C4 D4 F#4 Bb4 77'),[60,62,66,70,77]);assert.deepEqual(parseTune('c3,DB4 C6'),[48,61,84]);assert.equal(noteName(60),'C4')
for(const text of['','Z4','C2','128','C4 '.repeat(33)])assert.throws(()=>parseTune(text))
for(const voice of['flute','tanpura','tabla'])for(const style of['phrase','trade']){
 const events=duetSequence([60,64,67],voice,120,style);assert.equal(events.length,6);assert(events.every((event,i)=>i===0||event.at>=events[i-1].at));assert.deepEqual(events.filter(e=>e.side==='call').map(e=>e.note),[60,64,67]);assert.deepEqual(events.filter(e=>e.side==='answer').map(e=>e.note),[60,64,67]);for(let i=0;i<3;i++)assert(events.find(e=>e.side==='answer'&&e.index===i).at>events.find(e=>e.side==='call'&&e.index===i).at)
}
assert.deepEqual(Object.values(responders).map(v=>v.kind),['flute','harp','rain']);console.log('Duet pairing, tune validation and score checks passed')
