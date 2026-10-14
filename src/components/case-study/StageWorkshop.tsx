import { lazy, Suspense, useId, useState } from 'react'
import StageAnatomy from './StageAnatomy'
const PhysicalWorld = lazy(() => import('../physical-worlds/PhysicalWorld'))

export default function StageWorkshop() {
  const [mode, setMode] = useState<'assembly' | 'rotation'>('assembly')
  const id = useId()
  return <section className="stage-workshop" aria-label="Revolving stage workshop">
    <p>A 15 × 8 ft platform turns above an 8 × 8 ft base. Open the assembly to find the parts that carry it, then try the existing rotation study.</p>
    <div className="stage-anatomy__parts" role="group" aria-label="Stage study">
      <button aria-pressed={mode === 'assembly'} aria-controls={id} onClick={() => setMode('assembly')}>Inside the assembly</button>
      <button aria-pressed={mode === 'rotation'} aria-controls={id} onClick={() => setMode('rotation')}>Explore rotation</button>
    </div>
    <div id={id}>
      {mode === 'assembly' ? <StageAnatomy /> : <Suspense fallback={<p role="status">Loading the rotation study…</p>}><PhysicalWorld project="revolving-stage" /></Suspense>}
    </div>
    <details className="stage-workshop__sources">
      <summary>Compare the original construction drawings</summary>
      <div>
        {[
          ['full-assembly-exploded.png', 'Original exploded assembly. The labelled footprints set the proportions of this illustration.'],
          ['axle-exploded.png', 'Original central axle drawing. The interactive assembly simplifies the internal bearing geometry.'],
          ['stage-vs-render.png', 'The built stage and its original render.'],
        ].map(([file, caption]) => <figure key={file}><a href={`/Assets/Projects/RevolvingStage/photos/${file}`} target="_blank" rel="noopener noreferrer"><img loading="lazy" src={`/Assets/Projects/RevolvingStage/photos/${file}`} alt={caption} /></a><figcaption>{caption}</figcaption></figure>)}
      </div>
    </details>
  </section>
}
