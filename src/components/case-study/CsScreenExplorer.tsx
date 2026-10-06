import { projectImageProps } from '../../utils/projectImage'
import { useId, useState } from 'react'

type Screen = { title: string; label: string; caption: string; src: string; alt: string; width?: number; height?: number }

/** Original implementation; interaction reference: Skiper's expandable cards. */
export default function CsScreenExplorer({ screens, label = 'Choose a MiniApp screen' }: { screens: Screen[]; label?: string }) {
  const id = useId()
  const [selected, setSelected] = useState(0)
  const [failed, setFailed] = useState<string | null>(null)
  const [loaded, setLoaded] = useState<string | null>(null)
  const screen = screens[selected]
  if (!screen) return null
  return (
    <div className="cs-screen-explorer">
      <div className="cs-screen-explorer__choices" role="group" aria-label={label}>
        {screens.map((item, index) => (
          <button type="button" key={item.src} aria-pressed={selected === index} aria-controls={`${id}-preview`} onClick={() => setSelected(index)}>
            <span className="cs-screen-explorer__number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            <span><strong>{item.title}</strong><small>{item.label}</small></span>
            <span aria-hidden="true">{selected === index ? '−' : '+'}</span>
          </button>
        ))}
      </div>
      <figure id={`${id}-preview`} className="cs-screen-explorer__preview">
        <div className="cs-screen-explorer__image" aria-busy={loaded !== screen.src && failed !== screen.src}>
          {failed === screen.src ? <p role="status">The preview couldn’t load. Try the original image below.</p> : <>
            {loaded !== screen.src && <span className="cs-screen-explorer__loading">Loading screen…</span>}
            <img {...projectImageProps(screen.src)} key={screen.src} src={screen.src} alt={screen.alt} width={screen.width ?? projectImageProps(screen.src).width} height={screen.height ?? projectImageProps(screen.src).height} decoding="async" onLoad={() => setLoaded(screen.src)} onError={() => setFailed(screen.src)} />
          </>}
        </div>
        <figcaption>
          <div aria-live="polite" aria-atomic="true"><strong>{screen.title}</strong><p>{screen.caption}</p></div>
          <a href={screen.src} target="_blank" rel="noopener noreferrer">Open original screen <span className="sr-only">in a new tab</span><span aria-hidden="true"> ↗</span></a>
        </figcaption>
      </figure>
    </div>
  )
}
