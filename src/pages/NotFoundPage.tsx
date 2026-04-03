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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
          >
            <span className="not-found-label">Page not found</span>
            <h1 className="not-found-title">404</h1>
            <p className="not-found-desc">
              The page you&rsquo;re looking for has moved or doesn&rsquo;t exist.<br />
              Here are some places to start instead.
            </p>
            <div className="not-found-links">
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
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  )
}
