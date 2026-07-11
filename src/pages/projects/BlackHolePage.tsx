import { lazy, Suspense, useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import CsExpandPreview from '../../components/case-study/CsExpandPreview'
import CsSection from '../../components/case-study/CsSection'
import CsBody from '../../components/case-study/CsBody'
import CsImage from '../../components/case-study/CsImage'
import CsCredits from '../../components/case-study/CsCredits'
import CsThanks from '../../components/case-study/CsThanks'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'
import { TimeDilation, GravLensing, BinaryMerger } from '../../components/BlackHoleInteractives'

const SpacetimeFabricScene = lazy(() => import('../../components/SpacetimeFabricScene'))

function useIsMobile() {
  const [mobile, setMobile] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
  )
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const onChange = (e: MediaQueryListEvent) => setMobile(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return mobile
}

export default function BlackHolePage() {
  const IS_MOBILE = useIsMobile()
  return (
    <>
      <Helmet>
        <title>Black Hole &middot; Parth Pawar</title>
        <meta name="description" content="Physical models exploring five black hole phenomena, time dilation, spacetime fabric, gravitational lensing, wormholes, and binary mergers. Exhibited at the Horological Society of New York." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Black Hole · Parth Pawar" />
        <meta property="og:description" content="Physical models exploring five black hole phenomena. Exhibited at the Horological Society of New York." />
        <meta property="og:image" content="https://www.designwhich.works/Assets/images/black-hole.jpg" />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#2E2E33' } as React.CSSProperties}>

        <ProjectHeader
          backLink="/work"
          categorySlug="installations"
          backLabel="Back to Work"
          tags={['Physical Computing', 'Fabrication', 'Science Communication']}
          title="Black Hole"
          subtitle="Five physical models that make black hole phenomena legible through form, mechanism, and interaction"
          info={[
            { label: 'Context', value: 'NYU ITP' },
            { label: 'Role', value: 'Designer & Fabricator' },
            { label: 'Collaborator', value: 'Saee Joshi' },
            { label: 'Professor', value: 'Jeffrey Feddersen' },
            { label: 'Year', value: '2025' },
          ]}
        />

        {/* Hero */}
        <CsImage src="/Assets/Projects/black-hole-assets/time-trap.jpg" alt="The Black Hole's Time Trap, circular platform with clocks at different distances demonstrating time dilation" />

        <section className="cs-slide reveal" id="cs-film">
          <div className="wrap">
            <video src="/Assets/Projects/black-hole-assets/time-dilation.mp4" autoPlay loop muted playsInline
              style={{ width: '100%', borderRadius: 'var(--radius-lg)' }} />
          </div>
        </section>

        {/* Overview */}
        <CsSection id="cs-challenge" label="The Challenge" title="Making the Invisible Tangible">
          <CsBody>
            <p>Black holes are culturally famous and physically unintuitive. Most people can repeat the words time dilation or gravitational lensing without ever building a working mental model of what those phenomena feel like. This project turns that gap into the design problem.</p>
            <p>I built five physical models that let audiences encounter black hole behavior through movement, weight, distortion, and mechanism instead of diagrams alone. The goal was not spectacle. It was understanding that could survive after the visitor walked away.</p>
          </CsBody>
        </CsSection>

        {/* ═══ 01: TIME DILATION ═══ */}
        <CsExpandPreview>
        <CsSection id="cs-time-trap" label="01 &mdash; Phenomenon" title="The Black Hole&rsquo;s Time Trap">
          <CsBody>
            <p>Near a black hole, gravity stretches spacetime, causing time to slow down dramatically. If you hover just above the event horizon, minutes for you could be years for a distant observer. The closer you get, the slower time moves.</p>
          </CsBody>
          <div className="cs-label-row">
            <span className="cs-label-row-key">Slider</span>
            <span className="cs-label-row-val">Drag to move the clock closer to or farther from the black hole &mdash; watch the second hand slow down</span>
          </div>
          <div style={{ marginTop: 'var(--space-4)' }}>
            <TimeDilation />
          </div>
        </CsSection>

        {/* ═══ 02: SPACETIME FABRIC ═══ */}
        <CsSection id="cs-fabric" label="02 &mdash; Phenomenon" title="The Invisible Fabric of the Universe">
          <CsBody>
            <p>Imagine spacetime as a giant, invisible sheet stretched across the universe. Massive objects sit on this sheet, bending it under their weight. This bending creates what we experience as gravity. Black holes create the deepest dents of all.</p>
          </CsBody>
          <div className="cs-label-row">
            <span className="cs-label-row-key">Drag</span>
            <span className="cs-label-row-val">Move masses to see spacetime deform in real-time</span>
          </div>
          <div className="cs-label-row">
            <span className="cs-label-row-key">Click</span>
            <span className="cs-label-row-val">Add a new mass (up to 3) &middot; Double-click to remove</span>
          </div>
          <div style={{ marginTop: 'var(--space-4)' }}>
            {IS_MOBILE ? (
              <div style={{
                width: '100%', aspectRatio: '16 / 10',
                borderRadius: 'var(--radius-lg)', overflow: 'hidden',
                position: 'relative', border: '1px solid rgba(255,255,255,0.06)',
              }}>
                <img src="/Assets/Projects/black-hole-assets/fabric-of-universe.jpg" alt="Spacetime fabric model" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(135deg, rgba(5,5,16,0.7), rgba(26,26,46,0.5))',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center', gap: 'var(--space-2)',
                  color: '#fff', textAlign: 'center', padding: 'var(--space-6)',
                }}>
                  <span style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.2rem, 3vw, 1.6rem)', fontWeight: 300 }}>Interactive spacetime fabric</span>
                  <span style={{ fontFamily: 'var(--sans)', fontSize: 'var(--text-xs)', opacity: 0.6 }}>Available on desktop</span>
                </div>
              </div>
            ) : (
              <Suspense fallback={
                <div style={{
                  width: '100%', aspectRatio: '16 / 10', borderRadius: 'var(--radius-lg)',
                  background: '#050508', border: '1px solid rgba(255,255,255,0.06)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(255,255,255,0.2)', fontFamily: 'var(--mono)', fontSize: 'var(--text-2xs)',
                }}>
                  Loading spacetime fabric&#8230;
                </div>
              }>
                <SpacetimeFabricScene />
              </Suspense>
            )}
          </div>
        </CsSection>

        <CsImage src="/Assets/Projects/black-hole-assets/fabric-of-universe.jpg" alt="Fabric of the Universe physical model" />

        {/* ═══ 03 & 04: GRAVITATIONAL LENSING + WORMHOLE ═══ */}
        <CsSection id="cs-lensing" label="03 &amp; 04 &mdash; Phenomena" title="Gravity&rsquo;s Grip on Light &amp; Wormholes">
          <CsBody>
            <p>A black hole bends light itself. Gravitational lensing creates distorted, magnified, and duplicated images of distant stars. The faint ring of light around a black hole &mdash; the Einstein ring &mdash; is where photons orbit the mass.</p>
          </CsBody>
          <div className="cs-label-row">
            <span className="cs-label-row-key">Drag</span>
            <span className="cs-label-row-val">Move the black hole through the star field &mdash; watch stars distort and the Einstein ring form</span>
          </div>
          <div className="cs-label-row">
            <span className="cs-label-row-key">Mass</span>
            <span className="cs-label-row-val">Increase mass to see stronger lensing effects</span>
          </div>
          <div style={{ marginTop: 'var(--space-4)' }}>
            <GravLensing />
          </div>
        </CsSection>

        <CsImage src="/Assets/Projects/black-hole-assets/gravitational-lensing.jpg" alt="Gravitational Lensing and Wormholes physical model" />

        {/* ═══ 05: BINARY MERGER ═══ */}
        <CsSection id="cs-mergers" label="05 &mdash; Phenomenon" title="When Giants Collide: Binary Black Hole Mergers">
          <CsBody>
            <p>Binary black holes spiral closer, releasing energy as gravitational waves. The simulation shows three stages: <strong>Inspiral</strong> (orbiting closer), <strong>Merger</strong> (collision), and <strong>Ringdown</strong> (settling).</p>
          </CsBody>
          <div style={{ marginTop: 'var(--space-4)' }}>
            <BinaryMerger />
          </div>
        </CsSection>

        <CsImage src="/Assets/Projects/black-hole-assets/binary-mergers.jpg" alt="Binary Black Hole Mergers physical model, three stages" />

        {/* Exhibition */}
        <CsSection id="cs-exhibition" label="Exhibition" title="Horological Society of New York">
          <CsBody>
            <p>The models were built for exhibition at the <a href="https://www.hsny.org/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ink)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>Horological Society of New York</a>&rsquo;s museum. The pairing is intentional &mdash; black holes are fundamentally about the distortion of time, and the Horological Society is dedicated to the art and science of measuring it.</p>
          </CsBody>
        </CsSection>

        <CsCredits credits={[
          { role: 'Design & Fabrication', name: 'Parth Pawar' },
          { role: 'Applied Mathematics', name: 'Saee Joshi' },
          { role: 'Professor', name: 'Jeffrey J Feddersen' },
        ]} />

        <CsThanks />

        </CsExpandPreview>

        <BottomNav sections={[
          { id: 'cs-film', label: 'Film' },
          { id: 'cs-challenge', label: 'Overview' },
          { id: 'cs-time-trap', label: 'Time Dilation' },
          { id: 'cs-fabric', label: 'Fabric' },
          { id: 'cs-lensing', label: 'Lensing' },
          { id: 'cs-mergers', label: 'Mergers' },
          { id: 'cs-exhibition', label: 'Exhibition' },
        ]} />

      </main>

      <NextProject slug="making-of-time" title="Making of Time" image="/Assets/images/making-of-time.jpg" />
      <Footer />
    </>
  )
}
