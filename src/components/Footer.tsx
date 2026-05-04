import { lazy, Suspense } from 'react'
import { useDeferredMount } from '../hooks/useDeferredMount'
import { useInView } from '../hooks/useInView'

const FooterContent = lazy(() => import('./FooterContent'))

export default function Footer() {
  const [footerRef, footerInView] = useInView<HTMLElement>(0, '320px 0px')
  const mountFooter = useDeferredMount(footerInView, { timeout: 2200, delayMs: 100 })

  return (
    <footer className="footer" ref={footerRef}>
      {mountFooter ? (
        <Suspense fallback={<div className="wrap ft-compact" aria-hidden="true" style={{ minHeight: '12rem' }} />}>
          <FooterContent footerRef={footerRef} />
        </Suspense>
      ) : (
        <div className="wrap ft-compact" aria-hidden="true" style={{ minHeight: '12rem' }} />
      )}
    </footer>
  )
}
