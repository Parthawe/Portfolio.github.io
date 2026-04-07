import { useRef, useEffect, useCallback } from 'react'

/**
 * Portal Reveal — fluid cursor mask over stacked photos.
 *
 * Image 1 is ALWAYS the base. Images 2 and 3 are only ever
 * partially revealed through the fluid blob mask — they never
 * fully replace the base.
 *
 * Hover: blobs reveal image 2.
 * Leave + re-enter: blobs reveal image 3.
 * Image 1 always stays underneath.
 */

interface Props {
  images: string[]
  alt?: string
  className?: string
}

interface Blob {
  x: number; y: number; r: number; life: number; max: number
}

export default function PortalReveal({ images, alt = '', className = '' }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef(0)
  const mouseRef = useRef({ x: -999, y: -999, inside: false })
  const blobsRef = useRef<{ layer1: Blob[]; layer2: Blob[] }>({ layer1: [], layer2: [] })
  const enterCountRef = useRef(0)

  const loadedImgs = useRef<HTMLImageElement[]>([])
  const readyCount = useRef(0)

  useEffect(() => {
    readyCount.current = 0
    loadedImgs.current = images.map(src => {
      const img = new Image()
      img.onload = () => { readyCount.current++ }
      img.src = src
      return img
    })
  }, [images])

  const handleEnter = useCallback(() => {
    enterCountRef.current++
    mouseRef.current.inside = true
    document.body.classList.add('spotlight-active')
  }, [])

  const handleLeave = useCallback(() => {
    mouseRef.current.inside = false
    document.body.classList.remove('spotlight-active')
  }, [])

  const handleMove = useCallback((e: React.MouseEvent) => {
    const rect = wrapRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseRef.current.x = e.clientX - rect.left
    mouseRef.current.y = e.clientY - rect.top
  }, [])

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return
    const ctx = canvas.getContext('2d')!
    const hasThird = images.length >= 3

    // Offscreen: mask for layer 2, mask for layer 3, tmp for compositing
    const mask1 = document.createElement('canvas')
    const mask2 = hasThird ? document.createElement('canvas') : null
    const tmp = document.createElement('canvas')
    const m1 = mask1.getContext('2d')!
    const m2 = mask2?.getContext('2d') || null
    const tmpCtx = tmp.getContext('2d')!

    let w = 0, h = 0, dpr = 1

    const resize = () => {
      const rect = wrap.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = rect.width; h = rect.height
      canvas.width = w * dpr; canvas.height = h * dpr
      canvas.style.width = w + 'px'; canvas.style.height = h + 'px'
      for (const c of [mask1, mask2, tmp]) {
        if (!c) continue
        c.width = w; c.height = h
      }
    }
    resize()
    window.addEventListener('resize', resize)

    const coverDraw = (target: CanvasRenderingContext2D, img: HTMLImageElement, tw: number, th: number) => {
      if (!img.complete || !img.naturalWidth) return
      const iw = img.naturalWidth, ih = img.naturalHeight
      const cr = tw / th, ir = iw / ih
      let sx = 0, sy = 0, sw = iw, sh = ih
      if (ir > cr) { sw = ih * cr; sx = (iw - sw) / 2 }
      else { sh = iw / cr; sy = (ih - sh) / 2 }
      target.drawImage(img, sx, sy, sw, sh, 0, 0, tw, th)
    }

    const updateBlobs = (arr: Blob[]) => {
      for (let i = arr.length - 1; i >= 0; i--) {
        arr[i].life++
        if (arr[i].life > arr[i].max) { arr.splice(i, 1); continue }
        arr[i].x += (Math.random() - 0.5) * 0.3
        arr[i].y += (Math.random() - 0.5) * 0.3
      }
      if (arr.length > 200) arr.splice(0, arr.length - 200)
    }

    const drawMask = (mCtx: CanvasRenderingContext2D, arr: Blob[], isActive: boolean) => {
      // Fade mask: slow while hovering, much faster when cursor leaves
      const fadeAlpha = isActive ? 0.003 : 0.025
      mCtx.globalCompositeOperation = 'destination-out'
      mCtx.fillStyle = `rgba(0,0,0,${fadeAlpha})`
      mCtx.fillRect(0, 0, w, h)
      mCtx.globalCompositeOperation = 'source-over'
      for (const b of arr) {
        const t = b.life / b.max
        // Smooth easing: ease-in on appear, long sustain, ease-out on fade
        let s: number
        if (t < 0.08) s = t / 0.08 * t / 0.08  // ease-in (quadratic)
        else if (t < 0.4) s = 1
        else { const f = (t - 0.4) / 0.6; s = 1 - f * f }  // ease-out (quadratic)
        const r = b.r * Math.max(s, 0)
        if (r < 1) continue
        const g = mCtx.createRadialGradient(b.x, b.y, r * 0.08, b.x, b.y, r)
        g.addColorStop(0, `rgba(255,255,255,${s * 0.85})`)
        g.addColorStop(0.4, `rgba(255,255,255,${0.5 * s})`)
        g.addColorStop(1, 'rgba(255,255,255,0)')
        mCtx.fillStyle = g
        mCtx.beginPath()
        mCtx.arc(b.x, b.y, r, 0, Math.PI * 2)
        mCtx.fill()
      }
    }

    const compositeLayer = (maskCvs: HTMLCanvasElement, img: HTMLImageElement, arr: Blob[]): boolean => {
      if (arr.length === 0 || !img.naturalWidth) return false
      tmpCtx.clearRect(0, 0, w, h)
      tmpCtx.globalCompositeOperation = 'source-over'
      tmpCtx.drawImage(maskCvs, 0, 0)
      tmpCtx.globalCompositeOperation = 'source-in'
      coverDraw(tmpCtx, img, w, h)
      return true
    }

    const loop = () => {
      if (readyCount.current < 2 || !loadedImgs.current[0] || !loadedImgs.current[1]) {
        rafRef.current = requestAnimationFrame(loop); return
      }

      const mouse = mouseRef.current
      const blobs = blobsRef.current
      // Determine which layer to paint into based on enter count
      const useLayer2 = hasThird && enterCountRef.current > 1

      if (mouse.inside && mouse.x > 0) {
        const target = useLayer2 ? blobs.layer2 : blobs.layer1
        for (let i = 0; i < 2; i++) {
          target.push({
            x: mouse.x + (Math.random() - 0.5) * 20,
            y: mouse.y + (Math.random() - 0.5) * 20,
            r: 55 + Math.random() * 55,
            life: 0,
            max: 100 + Math.random() * 60,
          })
        }
      }

      updateBlobs(blobs.layer1)
      updateBlobs(blobs.layer2)
      const isHovering = mouse.inside
      drawMask(m1, blobs.layer1, isHovering && !useLayer2)
      if (m2) drawMask(m2, blobs.layer2, isHovering && useLayer2)

      // Draw
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)

      // Always draw image 1 as base
      coverDraw(ctx, loadedImgs.current[0], w, h)

      // Image 2 masked by layer1 blobs
      if (compositeLayer(mask1, loadedImgs.current[1], blobs.layer1)) {
        ctx.drawImage(tmp, 0, 0)
      }

      // Image 3 masked by layer2 blobs (on top of everything)
      if (hasThird && mask2 && loadedImgs.current[2] && compositeLayer(mask2, loadedImgs.current[2], blobs.layer2)) {
        ctx.drawImage(tmp, 0, 0)
      }

      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [images])

  return (
    <div
      ref={wrapRef}
      className={`portal-reveal ${className}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onMouseMove={handleMove}
    >
      <canvas ref={canvasRef} className="portal-reveal-canvas" />
      <noscript><img src={images[0]} alt={alt} style={{ width: '100%' }} /></noscript>
    </div>
  )
}
