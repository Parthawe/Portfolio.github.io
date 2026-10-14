import { useState } from 'react'
import '../../styles/case-study-slides.css'

export interface CaseStudySlide {
  id: string
  src: string
  width: number
  height: number
  alt: string
  text: string
  textTruncated: boolean
  sourceUrl: string
}

export interface SlideChapter {
  id: string
  title: string
  slides: CaseStudySlide[]
}

function Slide({ slide }: { slide: CaseStudySlide }) {
  const [failed, setFailed] = useState(false)
  return <figure className="case-study-slide" data-source-node={slide.id}>
    {failed ? <div className="case-study-slide__failure" role="status" style={{ aspectRatio: `${slide.width} / ${slide.height}` }}>
      <p>This slide couldn’t load.</p>
      <button type="button" onClick={() => setFailed(false)}>Retry image</button>
      <a href={slide.src} target="_blank" rel="noopener noreferrer">Open original size</a>
    </div> : <img data-project-preview data-original-src={slide.src}
      src={slide.src} srcSet={`${slide.src.replace('.webp', '-768.webp')} 768w, ${slide.src.replace('.webp', '-1280.webp')} 1280w, ${slide.src} ${slide.width}w`}
      sizes="(max-width: 768px) calc(100vw - 32px), (max-width: 1280px) calc(100vw - 64px), 1120px"
      width={slide.width} height={slide.height} alt={slide.alt}
      loading="lazy" decoding="async" onError={() => setFailed(true)} />}
    <figcaption>
      <details><summary>Read slide text</summary><p>{slide.text || 'This slide presents the original product interface.'}</p>
        {slide.textTruncated && <p>Text excerpt. <a href={slide.sourceUrl} target="_blank" rel="noopener noreferrer">Read the complete slide in Figma</a></p>}
      </details>
      <a href={slide.src} target="_blank" rel="noopener noreferrer" aria-label={`Open original size: ${slide.alt}`}>Original size ↗</a>
    </figcaption>
  </figure>
}

export default function CaseStudySlides({ chapters }: { chapters: SlideChapter[] }) {
  return <div className="case-study-slides">
    {chapters.filter(chapter => chapter.slides.length > 0).map(chapter => <section className="case-study-slides__chapter" id={chapter.id} key={chapter.id}>
      <div className="wrap">
        <h2>{chapter.title}</h2>
        {chapter.id === 'cs-impact' && <p className="case-study-slides__note">Results are reproduced from the source presentation. First-use and runtime phases are shown separately.</p>}
        <div className="case-study-slides__images">{chapter.slides.map(slide => <Slide key={slide.id} slide={slide} />)}</div>
      </div>
    </section>)}
  </div>
}
