import { useEffect, useRef, useState } from 'react'
import '../styles/ascii-hero-image.css'

type Props = { src: string; className: string }

/** Render the supplied illustration as a transparent field of ASCII glyphs. */
export default function AsciiHeroImage({ src, className }: Props) {
  const host = useRef<HTMLSpanElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const element = host.current
    const output = canvas.current
    if (!element || !output) return
    let disposed = false
    let scheduled = 0
    const source = new Image()
    const sample = document.createElement('canvas')
    const sampler = sample.getContext('2d', { willReadFrequently: true })
    const context = output.getContext('2d')
    if (!sampler || !context) return
    const ramp = ' .,:;+*oO#@'

    const draw = () => {
      if (disposed || !source.complete || !source.naturalWidth) return
      const width = element.clientWidth
      const height = element.clientHeight
      if (!width || !height) return
      const columns = Math.max(44, Math.min(96, Math.round(width / 5)))
      const rows = Math.round(columns * height / width / 1.35)
      sample.width = columns
      sample.height = rows
      sampler.drawImage(source, 0, 0, columns, rows)
      const pixels = sampler.getImageData(0, 0, columns, rows).data
      const dpr = Math.min(window.devicePixelRatio || 1, 3)
      output.width = Math.round(width * dpr)
      output.height = Math.round(height * dpr)
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      context.clearRect(0, 0, width, height)
      const cellWidth = width / columns
      const cellHeight = height / rows
      context.font = `600 ${cellHeight * 1.03}px ui-monospace, "SFMono-Regular", Consolas, monospace`
      context.textAlign = 'center'
      context.textBaseline = 'middle'
      const dark = document.documentElement.getAttribute('data-theme') === 'dark'
      const luminance = (x: number, y: number) => {
        const i = (Math.max(0, Math.min(rows - 1, y)) * columns + Math.max(0, Math.min(columns - 1, x))) * 4
        return (pixels![i] * .2126 + pixels![i + 1] * .7152 + pixels![i + 2] * .0722) / 255
      }
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < columns; x++) {
          const i = (y * columns + x) * 4
          const alpha = pixels[i + 3] / 255
          if (alpha < .2) continue
          const lum = luminance(x, y)
          const density = .3 + .7 * Math.pow(1 - lum, .7)
          let glyph = ramp[Math.min(ramp.length - 1, Math.floor(density * (ramp.length - 1)))]
          const dx = luminance(x + 1, y) - luminance(x - 1, y)
          const dy = luminance(x, y + 1) - luminance(x, y - 1)
          if (Math.hypot(dx, dy) > .3) {
            glyph = Math.abs(dx) > Math.abs(dy) * 1.8 ? '|' : Math.abs(dy) > Math.abs(dx) * 1.8 ? '-' : dx * dy > 0 ? '/' : '\\'
          }
          const color = [pixels[i], pixels[i + 1], pixels[i + 2]].map(channel =>
            Math.round(dark ? 125 + channel * .5 : Math.max(18, (channel + (channel - lum * 255) * .5) * .42))
          )
          context.fillStyle = `rgba(${color.join(',')},${Math.min(1, alpha * 1.25)})`
          context.fillText(glyph, (x + .5) * cellWidth, (y + .5) * cellHeight)
        }
      }
      setReady(true)
    }
    const schedule = () => {
      cancelAnimationFrame(scheduled)
      scheduled = requestAnimationFrame(draw)
    }
    source.onload = () => {
      if (disposed) return
      try {
        draw()
      } catch { setReady(false) }
    }
    source.onerror = () => { if (!disposed) setReady(false) }
    setReady(false)
    source.src = src
    const resize = new ResizeObserver(schedule)
    resize.observe(element)
    const theme = new MutationObserver(schedule)
    theme.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => {
      disposed = true
      cancelAnimationFrame(scheduled)
      resize.disconnect()
      theme.disconnect()
    }
  }, [src])

  return <span ref={host} className={`${className} ascii-hero-image`} data-ascii-ready={ready} aria-hidden="true">
    <img src={src} alt="" draggable={false} fetchPriority="high" className="ascii-hero-image__fallback" />
    <canvas ref={canvas} className="ascii-hero-image__canvas" />
  </span>
}
