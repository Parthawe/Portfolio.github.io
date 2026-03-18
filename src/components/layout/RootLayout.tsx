import { useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { PageLoader } from '../ui/PageLoader'
import { BackToTop } from '../ui/BackToTop'
import { CustomCursor } from '../ui/CustomCursor'

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0, 0, 0.3, 1] as const } },
  exit: { opacity: 0, transition: { duration: 0.25, ease: [0.4, 0, 1, 1] as const } },
}

export function RootLayout() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const mainRef = useRef<HTMLElement>(null)

  return (
    <>
      <PageLoader />
      <CustomCursor />
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:bg-ink focus:text-bg focus:px-4 focus:py-2 focus:text-sm">
        Skip to content
      </a>
      <div className="grain" />

      <Navbar />

      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          ref={mainRef}
          id="main-content"
          variants={pageVariants}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>

      {!isHome && <Footer />}
      <BackToTop />
    </>
  )
}
