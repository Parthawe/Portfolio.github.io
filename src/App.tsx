import { lazy, Suspense, Component, type ReactNode } from 'react'
import { Navigate, Routes, Route, useLocation } from 'react-router-dom'
import RootLayout from './components/RootLayout'
import Nav from './components/Nav'
import PixelLoaderVisual from './components/PixelLoaderVisual'
import PointerCursorGlyph from './components/PointerCursorGlyph'
import { visibleProjects } from './data/projects'

type ErrorBoundaryProps = { children: ReactNode; resetKey: string }

class ErrorBoundaryInner extends Component<ErrorBoundaryProps, { hasError: boolean; prevKey: string }> {
  state = { hasError: false, prevKey: '' }
  static getDerivedStateFromError() { return { hasError: true } }
  static getDerivedStateFromProps(props: ErrorBoundaryProps, state: { hasError: boolean; prevKey: string }) {
    // Reset error state when route changes
    if (props.resetKey !== state.prevKey) {
      return { hasError: false, prevKey: props.resetKey }
    }
    return { prevKey: props.resetKey }
  }
  render() {
    if (this.state.hasError) {
      return (
        <>
          <Nav />
          <div className="app-error" role="alert">
            <main className="app-error__main">
              <div className="app-error__wordmark" aria-hidden="true">ERR</div>

              <section className="app-error__canvas" aria-labelledby="app-error-title">
                <span className="app-error__layer" aria-hidden="true">Frame / unavailable</span>

                <div className="app-error__selection" aria-hidden="true">
                  <i className="app-error__handle app-error__handle--tl" />
                  <i className="app-error__handle app-error__handle--tr" />
                  <i className="app-error__handle app-error__handle--br" />
                  <i className="app-error__handle app-error__handle--bl" />
                  <span>0 x 0</span>
                </div>

                <div className="app-error__cursor" aria-hidden="true">
                  <PointerCursorGlyph className="app-error__cursor-glyph" />
                  <span>parth</span>
                </div>

                <div className="app-error__copy">
                  <span className="app-error__eyebrow">That was not supposed to happen.</span>
                  <h1 id="app-error-title">This frame stopped rendering.</h1>
                  <p>Reload it, or head home. Your place is saved.</p>
                  <div className="app-error__actions">
                    <button type="button" onClick={() => window.location.reload()}>Retry frame</button>
                    <a href="/">Homepage</a>
                  </div>
                </div>

                <aside className="app-error__note" aria-hidden="true">
                  <strong>Quick repair?</strong>
                  <span>I may have pushed one pixel too far.</span>
                  <em>- p.</em>
                </aside>
              </section>

              <footer className="app-error__foot" aria-hidden="true">
                <span>Autosaved</span>
                <span>Design systems should fail gracefully, too.</span>
              </footer>
            </main>
          </div>
        </>
      )
    }
    return this.props.children
  }
}

function ErrorBoundary({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  return <ErrorBoundaryInner resetKey={pathname}>{children}</ErrorBoundaryInner>
}

// Pages
const HomePage = lazy(() => import('./pages/HomePage'))
const WorkPage = lazy(() => import('./pages/WorkPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const AccessibilityPage = lazy(() => import('./pages/AccessibilityPage'))
const CategoryPage = lazy(() => import('./pages/CategoryPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))
const BookPage = lazy(() => import('./pages/BookPage'))
const GraveyardPage = lazy(() => import('./pages/GraveyardPage'))
const StudioPage = lazy(() => import('./pages/StudioPage'))
const PlaybookPage = lazy(() => import('./pages/PlaybookPage'))
const HealthAppPage = lazy(() => import('./pages/projects/HealthAppPage'))

// Project page components — auto-generated from registry
const projectPages = visibleProjects.map(p => ({
  slug: p.slug,
  Component: lazy(p.page),
}))

function Loading() {
  return (
    <div className="page-loader page-loader--fallback">
      <PixelLoaderVisual />
    </div>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/accessibility" element={<AccessibilityPage />} />

          {/* Category landing pages */}
          <Route path="/ai" element={<CategoryPage />} />
          <Route path="/ux" element={<Navigate to="/ux-design" replace />} />
          <Route path="/ux-design" element={<CategoryPage />} />
          <Route path="/ui" element={<Navigate to="/ux-design" replace />} />
          <Route path="/design-engineer" element={<CategoryPage />} />
          <Route path="/creative-tech" element={<CategoryPage />} />
          <Route path="/installations" element={<CategoryPage />} />
          <Route path="/brand" element={<CategoryPage />} />
          <Route path="/brand-visual" element={<CategoryPage />} />
          <Route path="/healthcare" element={<CategoryPage />} />
          <Route path="/fintech" element={<CategoryPage />} />
          <Route path="/design-for-good" element={<CategoryPage />} />
          <Route path="/crypto" element={<CategoryPage />} />
          <Route path="/ai-wearables" element={<CategoryPage />} />

          {/* Project pages — auto-generated from src/data/projects.ts */}
          {projectPages.map(({ slug, Component }) => (
            <Route key={slug} path={`/${slug}`} element={<Component />} />
          ))}
          <Route path="/healthapp" element={<HealthAppPage />} />
          <Route path="/mentra-website" element={<Navigate to="/mentra#cs-website" replace />} />

          {/* Misc pages */}
          <Route path="/playbook" element={<PlaybookPage />} />
          <Route path="/writing" element={<NotFoundPage />} />
          <Route path="/writing/:slug" element={<NotFoundPage />} />
          <Route path="/book" element={<BookPage />} />
          <Route path="/graveyard" element={<GraveyardPage />} />
          <Route path="/studio" element={<StudioPage />} />

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
    </ErrorBoundary>
  )
}
