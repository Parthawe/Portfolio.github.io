import { useScrollReveal } from '@/hooks/useScrollReveal'

interface ImageProps {
  src: string
  alt: string
}

function onImgLoad(e: React.SyntheticEvent<HTMLImageElement>) {
  e.currentTarget.classList.add('loaded')
}

export function ImageFull({ src, alt }: ImageProps) {
  const ref = useScrollReveal<HTMLDivElement>()

  if (!src) {
    return (
      <div className="flex items-center justify-center overflow-hidden rounded-[12px] border border-ink-06 bg-bg-alt py-16 shadow-[0_4px_16px_rgba(0,0,0,0.06)]" style={{ margin: '2rem 0' }}>
        <p className="px-6 text-center font-mono text-xs text-ink-40">{alt}</p>
      </div>
    )
  }
  return (
    <div ref={ref} className="overflow-hidden rounded-[12px] border border-ink-06 bg-bg-alt shadow-[0_4px_16px_rgba(0,0,0,0.06)]" style={{ margin: '2rem 0' }}>
      <img src={src} alt={alt} className="w-full" loading="lazy" onLoad={onImgLoad} />
    </div>
  )
}

export function ImagePair({ images }: { images: ImageProps[] }) {
  const ref = useScrollReveal<HTMLDivElement>()

  return (
    <div ref={ref} className="grid grid-cols-2" style={{ gap: '1.5rem', margin: '2rem 0' }}>
      {images.map((img, i) => (
        <div key={i} className="overflow-hidden rounded-[12px] border border-ink-06 bg-bg-alt shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
          <img src={img.src} alt={img.alt} className="w-full" loading="lazy" onLoad={onImgLoad} />
        </div>
      ))}
    </div>
  )
}

export function ImageGrid({ images, columns = 3 }: { images: ImageProps[]; columns?: number }) {
  const ref = useScrollReveal<HTMLDivElement>()
  const colClass = columns === 2 ? 'grid-cols-2' : columns === 4 ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-2 sm:grid-cols-3'

  return (
    <div ref={ref} className={`grid ${colClass}`} style={{ gap: '1.5rem', margin: '2rem 0' }}>
      {images.map((img, i) => (
        <div key={i} className="overflow-hidden rounded-[12px] border border-ink-06 bg-bg-alt shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
          <img src={img.src} alt={img.alt} className="w-full" loading="lazy" onLoad={onImgLoad} />
        </div>
      ))}
    </div>
  )
}
