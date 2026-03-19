import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>404 — Page Not Found · Parth Pawar</title>
      </Helmet>
      <Nav />
      <main id="main-content" style={{ paddingTop: '8rem', minHeight: '60vh' }}>
        <div className="wrap" style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(4rem, 10vw, 8rem)', fontFamily: 'var(--display)', margin: '0 0 1rem' }}>404</h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--ink-50)', marginBottom: '2rem' }}>This page doesn't exist.</p>
          <Link to="/" className="cta-v2-btn" style={{ display: 'inline-flex' }}>
            Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
