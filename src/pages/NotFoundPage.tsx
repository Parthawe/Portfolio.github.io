import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>404, Page Not Found · Parth Pawar</title>
        <meta name="description" content="This page doesn't exist, but great design work does. Browse Parth Pawar's portfolio." />
      </Helmet>
      <Nav />
      <main id="main-content" className="not-found">
        <div className="wrap not-found-inner">
          <motion.span
            className="not-found-label"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
          >Page not found</motion.span>
          <motion.h1
            className="not-found-title"
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >404</motion.h1>
          <motion.p
            className="not-found-desc"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
          >
            The page you&rsquo;re looking for has moved or doesn&rsquo;t exist.<br />
            Here are some places to start instead.
          </motion.p>
          <motion.div
            className="not-found-links"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
          >
            <Link to="/" className="not-found-link">
              Homepage
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
            <Link to="/work" className="not-found-link">
              All Work
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
            <Link to="/about" className="not-found-link">
              About
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  )
}
