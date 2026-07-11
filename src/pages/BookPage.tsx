import { Helmet } from 'react-helmet-async';
import { lazy, Suspense, useState, useCallback } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const BookViewer = lazy(() => import('../components/BookViewer'));

export default function BookPage() {
  const [progress, setProgress] = useState({ loaded: 0, total: 62 });
  const [ready, setReady] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const handleProgress = useCallback((loaded: number, total: number) => {
    setProgress({ loaded, total });
  }, []);

  const handleReady = useCallback(() => {
    setReady(true);
    // Give a brief moment then fade out
    setTimeout(() => setDismissed(true), 400);
  }, []);

  const pct = progress.total > 0 ? Math.round((progress.loaded / progress.total) * 100) : 0;
  const circumference = 2 * Math.PI * 36; // radius 36

  return (
    <>
      <Helmet>
        <title>Book Portfolio, Parth Pawar</title>
        <meta name="description" content="Parth Pawar's 2022 Book Portfolio, a collection of UX, interaction design, and engineering projects presented as a flipbook." />
      </Helmet>

      <Nav />

      {/* Full-page preloader */}
      {!dismissed && (
        <div className={`book-preloader ${ready ? 'book-preloader--done' : ''}`}>
          <svg className="book-preloader-ring" width="80" height="80" viewBox="0 0 80 80">
            <circle className="book-preloader-track" cx="40" cy="40" r="36" />
            <circle
              className="book-preloader-fill"
              cx="40" cy="40" r="36"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - (circumference * pct) / 100}
            />
          </svg>
          <span className="book-preloader-pct">{pct}%</span>
          <span className="book-preloader-label">Rendering {progress.total} pages...</span>
        </div>
      )}

      <main id="main-content" className={ready ? 'book-main--revealed' : 'book-main--hidden'}>
        <section className="book-hero">
          <span className="book-hero-label">BOOK PORTFOLIO</span>
          <h1 className="book-hero-title">2022 Collection</h1>
          <p className="book-hero-subtitle">
            62 pages of UX design, interaction design, and engineering projects, presented as a bound portfolio book.
          </p>
        </section>

        <section className="book-section">
          <Suspense fallback={
            <div style={{ display: 'flex', justifyContent: 'center', padding: '8rem 0' }}>
              <div className="book-loading">
                <div className="book-loading-spinner" />
                <span>Loading book...</span>
              </div>
            </div>
          }>
            <BookViewer
              pdfUrl="/Assets/Imagepdfportfolio.pdf"
              onProgress={handleProgress}
              onReady={handleReady}
            />
          </Suspense>
        </section>
      </main>

      <Footer />
    </>
  );
}
