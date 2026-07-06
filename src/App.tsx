import { lazy, Suspense, Component, type ReactNode } from 'react'
import { Navigate, Routes, Route, useLocation } from 'react-router-dom'
import RootLayout from './components/RootLayout'
import PixelLoaderVisual from './components/PixelLoaderVisual'
import { visibleProjects } from './data/projects'

class ErrorBoundaryInner extends Component<{ children: ReactNode; resetKey: string }, { hasError: boolean; prevKey: string }> {
  state = { hasError: false, prevKey: '' }
  static getDerivedStateFromError() { return { hasError: true } }
  static getDerivedStateFromProps(props: { resetKey: string }, state: { hasError: boolean; prevKey: string }) {
    // Reset error state when route changes
    if (props.resetKey !== state.prevKey) {
      return { hasError: false, prevKey: props.resetKey }
    }
    return { prevKey: props.resetKey }
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--ff-sans, system-ui)', color: 'var(--ink, #111)', background: 'var(--bg, #faf9f6)' }}>
          <span style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>PP</span>
          <p style={{ marginBottom: '1rem', opacity: 0.6 }}>Something went wrong.</p>
          <a href="/" style={{ textDecoration: 'underline' }}>Go home</a>
        </div>
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
const WritingPage = lazy(() => import('./pages/WritingPage'))
const WritingArticlePage = lazy(() => import('./pages/WritingPage').then(m => ({ default: m.WritingArticlePage })))

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
          <Route path="/ux-design" element={<CategoryPage />} />
          <Route path="/creative-tech" element={<CategoryPage />} />
          <Route path="/installations" element={<CategoryPage />} />
          <Route path="/brand-visual" element={<CategoryPage />} />
          <Route path="/fintech" element={<CategoryPage />} />
          <Route path="/design-for-good" element={<CategoryPage />} />
          <Route path="/crypto" element={<CategoryPage />} />
          <Route path="/ai-wearables" element={<CategoryPage />} />

          {/* Project pages — auto-generated from src/data/projects.ts */}
          {projectPages.map(({ slug, Component }) => (
            <Route key={slug} path={`/${slug}`} element={<Component />} />
          ))}
          <Route path="/mentra-website" element={<Navigate to="/mentra#cs-website" replace />} />

          {/* Misc pages */}
          <Route path="/playbook" element={<PlaybookPage />} />
          <Route path="/writing" element={<WritingPage />} />
          <Route path="/writing/:slug" element={<WritingArticlePage />} />
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
