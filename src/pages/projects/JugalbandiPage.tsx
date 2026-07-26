import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import ProjectQuickSummary from '../../components/case-study/ProjectQuickSummary'
import CsExpandPreview from '../../components/case-study/CsExpandPreview'
import CsMediaSpotlight from '../../components/case-study/CsMediaSpotlight'
import CsSection from '../../components/case-study/CsSection'
import CsBody from '../../components/case-study/CsBody'
import CsFeatureGrid from '../../components/case-study/CsFeatureGrid'
import CsInfoGrid from '../../components/case-study/CsInfoGrid'
import CsThanks from '../../components/case-study/CsThanks'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'

export default function JugalbandiPage() {
  const [viewMode, setViewMode] = useState<'summary' | 'full'>('summary')
  const sections = viewMode === 'summary'
    ? [
        { id: 'cs-summary', label: 'TL;DR' },
        { id: 'cs-film', label: 'Film' },
        { id: 'cs-overview', label: 'Overview' },
      ]
    : [
        { id: 'cs-summary', label: 'TL;DR' },
        { id: 'cs-film', label: 'Film' },
        { id: 'cs-overview', label: 'Overview' },
        { id: 'cs-background', label: 'Background' },
        { id: 'cs-instrument', label: 'The Instrument' },
        { id: 'cs-process', label: 'Process' },
        { id: 'cs-reflection', label: 'Reflection' },
      ]

  const handleViewModeChange = (nextMode: 'summary' | 'full') => {
    if (nextMode === viewMode) return
    setViewMode(nextMode)
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <>
      <Helmet>
        <title>Jugalbandi &middot; Parth Pawar</title>
        <meta name="description" content="A physical computing installation where a neural network performs with a human musician through strings, air pipes, and percussion." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Jugalbandi · Parth Pawar" />
        <meta property="og:description" content="A neural network made audible through a playable acoustic installation." />
        <meta property="og:image" content="https://designwhich.works/Assets/mockups/projects/jugalbandi_16x9.webp" />
      </Helmet>

      <Nav />

      <main
        id="main-content"
        className="project-main"
        style={{
          '--project-color': '#2F6BFF',
          '--case-outer-glow-a': 'rgba(255, 63, 164, 0.36)',
          '--case-outer-glow-b': 'rgba(47, 107, 255, 0.46)',
          '--case-outer-1': '#161335',
          '--case-outer-2': '#211747',
          '--case-outer-3': '#171A3F',
          '--case-hero-blob-a': 'rgba(255, 68, 171, 0.34)',
          '--case-hero-blob-b': 'rgba(47, 107, 255, 0.3)',
          '--case-hero-blob-c': 'rgba(132, 87, 255, 0.24)',
          '--case-hero-blob-glow': 'rgba(255, 132, 208, 0.26)',
        } as React.CSSProperties}
      >

        <ProjectHeader
          backLink="/work"
          categorySlug="creative-tech"
          backLabel="Back to Work"
          tags={['Physical Computing', 'Music', 'Art Installation']}
          title="Jugalbandi"
          subtitle="A playable duet between human improvisation and a neural network expressed through acoustic machines"
          info={[
            { label: 'Year', value: '2024' },
            { label: 'Role', value: 'Interaction designer + fabricator' },
            { label: 'Context', value: 'NYU \u2013 ITP' },
            { label: 'Duration', value: '5 Months' },
          ]}
        />

        <ProjectQuickSummary
          slug="jugalbandi"
          viewMode={viewMode}
          onViewModeChange={handleViewModeChange}
          variant="open"
        />

        <CsMediaSpotlight
          id="cs-film"
          label="Watch first"
          title="Hear the network perform"
          lede="The fastest way into Jugalbandi is the performance: a neural network translated into plucked strings, air pipes, and percussion."
          actionLabel="Play performance"
          meta={['Vimeo performance', 'Physical computing', 'Acoustic AI']}
        >
          <iframe
            src="https://player.vimeo.com/video/996020149?title=0&byline=0&portrait=0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            loading="lazy"
            title="Jugalbandi Performance"
          />
        </CsMediaSpotlight>

        {viewMode === 'full' ? (
        <>
        {/* Instrument overview photos */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <div className="cs-img reveal"><img src="/Assets/Projects/Jugalbandi/Photos/755.png" alt="Hexa-18: hexagonal instrument with wind, string, and percussion faces annotated" loading="lazy" /></div>
              <div className="cs-img reveal"><img src="/Assets/Projects/Jugalbandi/Photos/538A3938_nsquare_23.webp" alt="Hexa-18 top view showing ultrasonic sensors and wind pipes" loading="lazy" /></div>
            </div>
          </div>
        </section>

        </>
        ) : null}

        {/* Overview */}
        <CsSection id="cs-overview" label="Overview" title="A duet in Hindi">
          <CsBody>
            <p>Jugalbandi asks whether a neural network can feel less like code and more like a musical partner. The answer is a live duet between a human performer and acoustic machines.</p>
            <p>One voice is the performer. The other is a model translated into plucked strings, air-driven pipes, and resonant percussion. Exhibited at the ITP Spring Show and Maker Faire Coney Island, the installation made computation audible as timing, pressure, and mechanical behavior.</p>
          </CsBody>
        </CsSection>

        <CsExpandPreview expanded={viewMode === 'full'} onExpand={() => setViewMode('full')}>
        {/* Background */}
        <section className="cs-section reveal" id="cs-background">
          <div className="wrap">
            <p className="cs-section-label">01 &mdash; Background</p>
            <h3 className="cs-section-title">The Concept</h3>
            <CsBody>
              <p>The project builds on <a className="cs-text-link" href="https://pangenerator.com/projects/the-abacus/" target="_blank" rel="noopener noreferrer">The Abacus</a> by <a className="cs-text-link" href="https://pangenerator.com/" target="_blank" rel="noopener noreferrer">panGenerator Studio</a>, but shifts the representation from light to sound. Instead of watching a model process information, visitors hear it move through instrument layers.</p>
              <p>The name comes from the <a className="cs-text-link" href="https://en.wikipedia.org/wiki/Jugalbandi" target="_blank" rel="noopener noreferrer">Hindustani classical tradition</a> of a duet between two lead musicians. Here, the duet is between human improvisation and a machine voice constrained by trained weights, raga logic, and mechanical timing.</p>
            </CsBody>
            <div className="cs-label-row">
              <span className="cs-label-row-key">Inspiration</span>
              <span className="cs-label-row-val">panGenerator Studio &mdash; &ldquo;The Abacus&rdquo;</span>
            </div>
            <div className="cs-label-row">
              <span className="cs-label-row-key">Approach</span>
              <span className="cs-label-row-val">Translate neural network layers into tangible, playable acoustic and electronic mechanisms</span>
            </div>
          </div>
        </section>


        {/* The Instrument */}
        <section className="cs-section reveal" id="cs-instrument">
          <div className="wrap">
            <p className="cs-section-label">02 &mdash; The Instrument</p>
            <h2 className="cs-display">Hexa-18</h2>
            <CsBody>
              <p>Hexa-18 combines wind, string, and percussion into one hexagonal instrument. The geometry gives the sculpture its structure and echoes the node-and-edge diagrams used to describe neural networks.</p>
              <p>Each tier carries a sound family. When the model activates different layers, the object shifts from breath to pluck to texture, turning inference into a physical score.</p>
            </CsBody>
            <CsFeatureGrid features={[
              { title: 'Wind', desc: 'Air-driven pipes of varying heights produce different tonal frequencies, controlled by solenoid valves.' },
              { title: 'String', desc: 'Servo-actuated plucking mechanisms produce melodic sequences through algorithmically composed patterns.' },
              { title: 'Percussion', desc: 'Speaker cones and vibration motors embedded in hexagonal faces create rhythmic, percussive textures.' },
              { title: 'Sculpture', desc: 'The hexagonal form is both a visual art piece and a functional instrument \u2014 each face serves a purpose.' },
            ]} />
          </div>
        </section>

        {/* Hexa-18 detail photos */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
              <div className="cs-img reveal"><img src="/Assets/Projects/Jugalbandi/Photos/538A3968_nsquare_39.png" alt="Hexa-18 close-up: yellow hexagonal surface with sensor holes" loading="lazy" /></div>
              <div className="cs-img reveal"><img src="/Assets/Projects/Jugalbandi/Photos/538A3968_nsquare_39-1.png" alt="Hexa-18 detail: internal wiring and sensor mounting" loading="lazy" /></div>
              <div className="cs-img reveal"><img src="/Assets/Projects/Jugalbandi/Photos/538A4023_nsquare_64.png" alt="Hexa-18 detail: wind pipes from above" loading="lazy" /></div>
            </div>
          </div>
        </section>

        {/* Mechanized Harp */}
        <section className="cs-section reveal">
          <div className="wrap">
            <p className="cs-section-label">03 &mdash; Mechanized Harp</p>
            <h3 className="cs-section-title">Mechanized Harp</h3>
            <CsBody>
              <p>Servo motors pluck tuned strings inside a wooden frame. The harp carries the melodic middle layer: warm, acoustic, and intentionally slower than a screen-based visualization.</p>
              <p>Each string sits inside the selected raga so the machine can improvise without falling out of the musical world.</p>
            </CsBody>
            <div className="cs-label-row">
              <span className="cs-label-row-key">Controller</span>
              <span className="cs-label-row-val">Mega Arduino</span>
            </div>
            <div className="cs-label-row">
              <span className="cs-label-row-key">Actuators</span>
              <span className="cs-label-row-val">Servo Motors</span>
            </div>
            <div className="cs-label-row">
              <span className="cs-label-row-key">Materials</span>
              <span className="cs-label-row-val">Wire Mesh, Harp, Wood Frame</span>
            </div>
          </div>
        </section>

        {/* Harp + Flute photos */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <div className="cs-img reveal"><img src="/Assets/Projects/Jugalbandi/Photos/756.png" alt="Mechanized Harp: Arduino Mega, servo motors, wire mesh, and harp inside wooden frame" loading="lazy" /></div>
              <div className="cs-img reveal"><img src="/Assets/Projects/Jugalbandi/Photos/538A4005_nsquare_57.webp" alt="Mechanized Harp rear view showing wiring, servos, and Arduino board" loading="lazy" /></div>
            </div>
          </div>
        </section>

        {/* Automated Flute */}
        <section className="cs-section reveal">
          <div className="wrap">
            <p className="cs-section-label">04 &mdash; Automated Flute</p>
            <h3 className="cs-section-title">Automated Flute</h3>
            <CsBody>
              <p>An air pump drives the flute while servo-actuated fingers open and close tone holes. The hard part was not electronics, it was embouchure: a few degrees of airflow changed the note completely.</p>
              <p>Lego mechanisms made the finger positions adjustable enough to tune quickly during prototyping.</p>
            </CsBody>
            <CsInfoGrid items={[
              { key: 'Air Source', value: 'Air Pump' },
              { key: 'Actuators', value: 'Servo Motors' },
              { key: 'Controller', value: 'Mega Arduino' },
              { key: 'Structure', value: 'Legos, Clamp, Blowing Hole' },
            ]} />
          </div>
        </section>

        {/* Flute photo */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img reveal"><img src="/Assets/Projects/Jugalbandi/Photos/757.png" alt="Automated Flute: air pump, servo motors, Mega Arduino, Lego finger mechanisms on bamboo flute" loading="lazy" /></div>
          </div>
        </section>

        {/* Rainsticks */}
        <section className="cs-section reveal">
          <div className="wrap">
            <p className="cs-section-label">05 &mdash; Rainsticks</p>
            <h3 className="cs-section-title">Rainsticks</h3>
            <CsBody>
              <p>Servo motors tilt rainsticks to create cascading percussion. The beads never fall the same way twice, which made them a useful physical analogue for probabilistic inference.</p>
              <p>Changing angle and speed controls the density of the sound, from a sparse trickle to a full wash.</p>
            </CsBody>
            <div className="cs-label-row">
              <span className="cs-label-row-key">Actuators</span>
              <span className="cs-label-row-val">Servo Motors</span>
            </div>
          </div>
        </section>

        {/* Rainstick photo */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img reveal"><img src="/Assets/Projects/Jugalbandi/Photos/758.png" alt="Rainsticks: servo motor powered rainstick rotation on wooden frame structure" loading="lazy" /></div>
          </div>
        </section>

        {/* Tools & Process */}
        <section className="cs-section reveal" id="cs-process">
          <div className="wrap">
            <p className="cs-section-label">06 &mdash; Process</p>
            <h3 className="cs-section-title">Tools and Techniques</h3>
            <CsBody>
              <p>A neural network built with ml5.js drives the piece: its layer activations are mapped to the Arduino-controlled instruments &mdash; breath, pluck, and percussion &mdash; and constrained by the selected raga so the machine voice stays inside the musical world.</p>
            </CsBody>
          </div>
        </section>

        {/* Reflection */}
        <section className="cs-section reveal" id="cs-reflection">
          <div className="wrap">
            <p className="cs-section-label">07 &mdash; Reflection</p>
            <h3 className="cs-section-title">What Building Jugalbandi Taught Me</h3>
            <CsBody style={{ maxWidth: '720px' }}>
              <p>The hardest part was the translation layer. A model output has no musical meaning until a designer decides how it should become breath, timing, pitch, and vibration.</p>
              <p>The physical instruments forced restraint. Air pressure, servo latency, string tension, and resonance shaped the composition more than the software did.</p>
              <p>People stayed with the work because they could hear the computation, see the mechanisms move, and feel the machine as an instrument. Embodiment changed comprehension.</p>
            </CsBody>
          </div>
        </section>

        <CsThanks />
        </CsExpandPreview>

        <BottomNav
          sections={sections}
          modeAction={{
            label: viewMode === 'summary' ? 'Full case study' : '2 min summary',
            onClick: () => handleViewModeChange(viewMode === 'summary' ? 'full' : 'summary'),
          }}
        />

      </main>

      <NextProject slug="enigma" title="Enigma" image="/Assets/mockups/projects/enigma_16x9.webp" />
      <Footer />
    </>
  )
}
