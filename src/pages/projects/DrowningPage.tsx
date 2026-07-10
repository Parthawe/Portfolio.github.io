import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import CsExpandPreview from '../../components/case-study/CsExpandPreview'
import CsMediaSpotlight from '../../components/case-study/CsMediaSpotlight'
import CsSection from '../../components/case-study/CsSection'
import CsBody from '../../components/case-study/CsBody'
import CsThanks from '../../components/case-study/CsThanks'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'
import LightingSlider from '../../components/LightingSlider'

export default function DrowningPage() {
  return (
    <>
      <Helmet>
        <title>Drowning &middot; Parth Pawar</title>
        <meta name="description" content="Scenic design for stage production inspired by abandoned greenhouse aesthetics, a set design and creative technology project." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Drowning · Parth Pawar" />
        <meta property="og:description" content="Scenic design for stage production inspired by abandoned greenhouse aesthetics." />
        <meta property="og:image" content="https://parthawe.github.io/Portfolio.github.io/Assets/images/drowning.jpg" />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#5D7B6F' } as React.CSSProperties}>

        <ProjectHeader
          backLink="/work"
          categorySlug="installations"
          backLabel="Back to Work"
          tags={['Set Design', 'Creative Technology']}
          title="Drowning"
          subtitle="Scenic design for stage production inspired by abandoned greenhouse aesthetics"
          info={[
            { label: 'Year', value: '2024' },
            { label: 'Role', value: 'Set Designer' },
          ]}
        />

        <CsMediaSpotlight
          id="cs-film"
          label="Watch first"
          title="A room losing air"
          lede="The film shows what the set does best: a greenhouse that feels beautiful, fragile, and slowly enclosing the performers."
          meta={['Vimeo performance', 'Set design', 'Lighting states']}
        >
          <iframe
            src="https://player.vimeo.com/video/1026164956"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            loading="lazy"
            title="Drowning"
          />
        </CsMediaSpotlight>

        {/* Interactive, early proof */}
        <CsSection id="cs-lighting" label="Interactive" title="Light Transforms the Space">
          <CsBody>
            <p>Drag the slider to see the same set change state. The scenic design only works because structure, texture, and light are designed together.</p>
          </CsBody>
          <div style={{ marginTop: 'var(--space-4)' }}>
            <LightingSlider
              beforeSrc="https://freight.cargo.site/w/2880/i/N2050663334867775366614256779798/1.webp"
              afterSrc="https://freight.cargo.site/w/2880/i/J2050663334978455831056514089494/5.webp"
              beforeLabel="Unlit stage"
              afterLabel="Greenhouse revealed"
            />
          </div>
        </CsSection>

        {/* Overview */}
        <CsSection label="Overview" title="Abandoned Greenhouse">
          <CsBody>
            <p>Drowning needed a black-box set that felt sheltering and suffocating at the same time. The abandoned greenhouse gave the production that contradiction: cracked transparency, overgrown life, and a room that seemed to close in as the play progressed.</p>
            <p>The build had to fit a 28&prime; by 22&prime; theater, strike in under four hours, and work without a fly system. Every panel, plant, and light angle had to carry both atmosphere and logistics.</p>
          </CsBody>
        </CsSection>

        {/* Concept */}
        <CsExpandPreview>
        <section className="cs-section reveal" id="cs-concept">
          <div className="wrap">
            <p className="cs-section-label">01 &mdash; Concept</p>
            <h3 className="cs-section-title">Concept</h3>
            <CsBody>
              <p>The set needed to feel protective and suffocating at once. I used abandoned greenhouse references for that tension: cracked transparency, overgrowth, corrosion, and light that never feels fully clean.</p>
              <p>The final direction became a partial enclosure of frosted panels, salvaged frames, and trailing plants. It kept sightlines open while making the room feel like it was slowly closing in.</p>
            </CsBody>
          </div>
          <div className="wrap">
            <img src="https://freight.cargo.site/w/2880/i/N2050663334867775366614256779798/1.webp" alt="Drowning, concept" loading="lazy" />
          </div>
          <div className="wrap">
            <img src="https://freight.cargo.site/w/2880/i/Q2050663335033796063277642744342/2.jpg" alt="Drowning, concept detail" loading="lazy" />
          </div>
        </section>

        {/* Design */}
        <section className="cs-section reveal" id="cs-design">
          <div className="wrap">
            <p className="cs-section-label">02 &mdash; Design</p>
            <h3 className="cs-section-title">Design</h3>
            <CsBody>
              <p>The stage was built as layers: debris and vegetation in front, glass and steel through the middle, and a lit scrim behind. That gave the lighting designer depth without needing a fly system.</p>
              <p>The structure used steel pipe, reclaimed window frames, frosted acrylic, and live plants. The practical goal was simple: strong enough for actors, modular enough to strike quickly, atmospheric from every seat.</p>
            </CsBody>
          </div>
          <div className="wrap">
            <img src="https://freight.cargo.site/w/2880/i/W2050663335015349319203933192726/3.webp" alt="Drowning, design" loading="lazy" />
          </div>
          <div className="wrap">
            <img src="https://freight.cargo.site/w/2880/i/F2050663334996902575130223641110/4.webp" alt="Drowning, design detail" loading="lazy" />
          </div>
        </section>

        {/* Production */}
        <section className="cs-section reveal" id="cs-production">
          <div className="wrap">
            <p className="cs-section-label">03 &mdash; Production</p>
            <h3 className="cs-section-title">Production</h3>
            <CsBody>
              <p>The build moved from concept to opening in seven weeks, including three weeks of construction and one week of tech. The lighting and set teams tuned the greenhouse together so every surface could catch, fracture, or hide light.</p>
              <p>The quiet work was safety: stable frames, softened edges, hidden handholds, and low-light navigation. The set had to feel unstable without ever being unsafe.</p>
            </CsBody>
          </div>
          <div className="wrap">
            <img src="https://freight.cargo.site/w/2880/i/J2050663334978455831056514089494/5.webp" alt="Drowning, production" loading="lazy" />
          </div>
          <div className="wrap">
            <img src="https://freight.cargo.site/w/2880/i/N2050663334960009086982804537878/6.jpg" alt="Drowning, production detail" loading="lazy" />
          </div>
        </section>

        {/* Reflections */}
        <CsSection label="04, Reflections" title="Designing for Physical Space">
          <CsBody>
            <p><strong>Materials push back.</strong> Salvaged frames, steel pipe, and live plants forced the design to hold intent while accepting imperfection.</p>
            <p><strong>Scale changes the idea.</strong> The model looked balanced, but the full-size canopy created the compression the play needed.</p>
            <p><strong>Constraints clarified the work.</strong> Budget, strike time, and transport pushed the set toward a modular system that looked more honest than a polished custom build.</p>
          </CsBody>
        </CsSection>

        <CsThanks />

        </CsExpandPreview>

        <BottomNav sections={[
          { id: 'cs-film', label: 'Film' },
          { id: 'cs-lighting', label: 'Lighting' },
          { id: 'cs-concept', label: 'Concept' },
          { id: 'cs-design', label: 'Design' },
          { id: 'cs-production', label: 'Production' },
        ]} />

      </main>

      <NextProject slug="tedx" title="TEDx VIT Pune" image="/Portfolio.github.io/Assets/images/tedx.jpg" />
      <Footer />
    </>
  )
}
