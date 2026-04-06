import { lazy, Suspense, Component, type ReactNode } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import RootLayout from './components/RootLayout'

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
const CategoryPage = lazy(() => import('./pages/CategoryPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

// Project pages
const MentraPage = lazy(() => import('./pages/projects/MentraPage'))
const ExecutiveLensPage = lazy(() => import('./pages/projects/ExecutiveLensPage'))
const ClawedChatPage = lazy(() => import('./pages/projects/ClawedChatPage'))
const OnCallLensPage = lazy(() => import('./pages/projects/OnCallLensPage'))
const OrgDashboardPage = lazy(() => import('./pages/projects/OrgDashboardPage'))
const ZentipayPage = lazy(() => import('./pages/projects/ZentipayPage'))
const TransfiPage = lazy(() => import('./pages/projects/TransfiPage'))
const ShufflePage = lazy(() => import('./pages/projects/ShufflePage'))
const RaahiPage = lazy(() => import('./pages/projects/RaahiPage'))
const ThePointCdcPage = lazy(() => import('./pages/projects/ThePointCdcPage'))
const AiVoicePage = lazy(() => import('./pages/projects/AiVoicePage'))
const BallahCodePage = lazy(() => import('./pages/projects/BallahCodePage'))
const OfficeOfDiversityPage = lazy(() => import('./pages/projects/OfficeOfDiversityPage'))
const TheOmakasePage = lazy(() => import('./pages/projects/TheOmakasePage'))
const CueTvPage = lazy(() => import('./pages/projects/CueTvPage'))
const AtpsPage = lazy(() => import('./pages/projects/AtpsPage'))
const TypefacePage = lazy(() => import('./pages/projects/TypefacePage'))
const JugalbandiPage = lazy(() => import('./pages/projects/JugalbandiPage'))
const DrowningPage = lazy(() => import('./pages/projects/DrowningPage'))
const EnigmaPage = lazy(() => import('./pages/projects/EnigmaPage'))
const TedxPage = lazy(() => import('./pages/projects/TedxPage'))
const CodeForBuildPage = lazy(() => import('./pages/projects/CodeForBuildPage'))
const KeyboardProjectPage = lazy(() => import('./pages/projects/KeyboardProjectPage'))
const MakingOfTimePage = lazy(() => import('./pages/projects/MakingOfTimePage'))
const MoniacMachinePage = lazy(() => import('./pages/projects/MoniacMachinePage'))
const RevolvingStagePage = lazy(() => import('./pages/projects/RevolvingStagePage'))
const UvLightPage = lazy(() => import('./pages/projects/UvLightPage'))
const VjSoftwarePage = lazy(() => import('./pages/projects/VjSoftwarePage'))
const BlackHolePage = lazy(() => import('./pages/projects/BlackHolePage'))
const BreakGenPage = lazy(() => import('./pages/projects/BreakGenPage'))
const SeaOfSaltPage = lazy(() => import('./pages/projects/SeaOfSaltPage'))
const BookPage = lazy(() => import('./pages/BookPage'))
const GraveyardPage = lazy(() => import('./pages/GraveyardPage'))
const StudioPage = lazy(() => import('./pages/StudioPage'))

function Loading() {
  return <div className="page-loader"><span className="page-loader-logo">PP</span></div>
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

          {/* Category landing pages */}
          <Route path="/ai" element={<CategoryPage />} />
          <Route path="/ux-design" element={<CategoryPage />} />
          <Route path="/creative-tech" element={<CategoryPage />} />
          <Route path="/installations" element={<CategoryPage />} />
          <Route path="/brand-visual" element={<CategoryPage />} />
          <Route path="/fintech" element={<CategoryPage />} />
          <Route path="/design-for-good" element={<CategoryPage />} />

          {/* Project pages */}
          <Route path="/mentra" element={<MentraPage />} />
          <Route path="/executivelens" element={<ExecutiveLensPage />} />
          <Route path="/clawed-chat" element={<ClawedChatPage />} />
          <Route path="/oncall-lens" element={<OnCallLensPage />} />
          <Route path="/org-dashboard" element={<OrgDashboardPage />} />
          <Route path="/zentipay" element={<ZentipayPage />} />
          <Route path="/transfi-project" element={<TransfiPage />} />
          <Route path="/crypto" element={<CategoryPage />} />
          <Route path="/shuffle" element={<ShufflePage />} />
          <Route path="/raahi-project" element={<RaahiPage />} />
          <Route path="/the-point-cdc" element={<ThePointCdcPage />} />
          <Route path="/ai-voice" element={<AiVoicePage />} />
          <Route path="/ai-wearables" element={<CategoryPage />} />
          <Route path="/ballah-code" element={<BallahCodePage />} />
          <Route path="/office-of-diversity" element={<OfficeOfDiversityPage />} />
          <Route path="/the-omakase" element={<TheOmakasePage />} />
          <Route path="/cuetv" element={<CueTvPage />} />
          <Route path="/atps" element={<AtpsPage />} />
          <Route path="/typeface" element={<TypefacePage />} />
          <Route path="/jugalbandi" element={<JugalbandiPage />} />
          <Route path="/drowning" element={<DrowningPage />} />
          <Route path="/enigma" element={<EnigmaPage />} />
          <Route path="/tedx" element={<TedxPage />} />
          <Route path="/code-for-build" element={<CodeForBuildPage />} />
          <Route path="/keyboard-project" element={<KeyboardProjectPage />} />
          <Route path="/breakgen" element={<BreakGenPage />} />
          <Route path="/making-of-time" element={<MakingOfTimePage />} />
          <Route path="/moniac-machine" element={<MoniacMachinePage />} />
          <Route path="/revolving-stage" element={<RevolvingStagePage />} />
          <Route path="/uv-light" element={<UvLightPage />} />
          <Route path="/vj-software" element={<VjSoftwarePage />} />
          <Route path="/black-hole" element={<BlackHolePage />} />
          <Route path="/sea-of-salt" element={<SeaOfSaltPage />} />
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
