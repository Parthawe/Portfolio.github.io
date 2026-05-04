import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import ProjectQuickSummary from '../../components/case-study/ProjectQuickSummary'
import CsSection from '../../components/case-study/CsSection'
import CsBody from '../../components/case-study/CsBody'
import CsFeatureGrid from '../../components/case-study/CsFeatureGrid'
import CsSteps from '../../components/case-study/CsSteps'
import CsInfoGrid from '../../components/case-study/CsInfoGrid'
import CsCredits from '../../components/case-study/CsCredits'
import CsThanks from '../../components/case-study/CsThanks'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'

export default function JugalbandiPage() {
  const [viewMode, setViewMode] = useState<'summary' | 'full'>('summary')
  const sections = viewMode === 'summary'
    ? [
        { id: 'cs-summary', label: 'TL;DR' },
        { id: 'cs-overview', label: 'Overview' },
      ]
    : [
        { id: 'cs-summary', label: 'TL;DR' },
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
        <meta name="description" content="Jugalbandi showcases a unique blend of traditional analog mechanical instruments and modern digital MIDI instruments, a physical computing art installation created at NYU ITP." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Jugalbandi · Parth Pawar" />
        <meta property="og:description" content="Blending traditional analog instruments with modern digital MIDI, a physical computing installation." />
        <meta property="og:image" content="https://parthpawar.com/Portfolio.github.io/Assets/images/jugalbandi.webp" />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#8B4513' } as React.CSSProperties}>

        <ProjectHeader
          backLink="/work"
          categorySlug="creative-tech"
          backLabel="Back to Work"
          tags={['Physical Computing', 'Music', 'Art Installation']}
          title="Jugalbandi"
          subtitle="A duet between traditional analog instruments and modern digital MIDI \u2014 where neural networks become playable music"
          info={[
            { label: 'Year', value: '2024' },
            { label: 'Role', value: 'Artist' },
            { label: 'Context', value: 'NYU \u2013 ITP' },
            { label: 'Duration', value: '5 Months' },
          ]}
          showHeaderSummary={false}
        />

        <ProjectQuickSummary
          slug="jugalbandi"
          viewMode={viewMode}
          onViewModeChange={handleViewModeChange}
        />

        {viewMode === 'full' ? (
        <>
        {/* Instrument overview photos */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/Jugalbandi/Photos/755.png" alt="Hexa-18: hexagonal instrument with wind, string, and percussion faces annotated" loading="lazy" /></div>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/Jugalbandi/Photos/538A3938_nsquare_23.webp" alt="Hexa-18 top view showing ultrasonic sensors and wind pipes" loading="lazy" /></div>
            </div>
          </div>
        </section>

        {/* Performance Video */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: 'var(--radius-lg)', background: 'var(--ink-04)' }}>
              <iframe
                src="https://player.vimeo.com/video/996020149?title=0&byline=0&portrait=0"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                loading="lazy"
                title="Jugalbandi Performance"
              />
            </div>
          </div>
        </section>
        </>
        ) : null}

        {/* Overview */}
        <CsSection id="cs-overview" label="Overview" title="A duet in Hindi">
          <CsBody>
            <p>Jugalbandi (meaning &ldquo;a duet&rdquo; in Hindi) showcases a unique blend of traditional analog mechanical instruments and modern digital MIDI instruments. The project is a physical computing art installation that materialises the inner workings of neural networks into tangible, playable musical instruments.</p>
            <p>In Indian classical music, a jugalbandi is a performance where two lead musicians engage in a dialogue, trading phrases, responding to each other&rsquo;s improvisations, and building toward a shared climax. This installation reimagines that tradition: one &ldquo;musician&rdquo; is a human performer, and the other is a neural network expressed through mechanized acoustic instruments. The conversation between them unfolds in real time, with the network&rsquo;s outputs driving physical sound-making devices that respond to the performer&rsquo;s gestures.</p>
            <p>Exhibited at the ITP Spring Show and Maker Faire Coney Island in 2024, Jugalbandi invited audiences to witness computation as something audible and embodied rather than abstract and screen-bound. The installation occupied a darkened stage where visitors could watch servos pluck strings, solenoids drive air through pipes, and vibration motors pulse against resonant surfaces &mdash; all choreographed by a live neural network.</p>
            <p>Where <a href="/enigma" style={{ color: 'var(--ink)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>Enigma</a> makes a neural network visible through 200 illuminated neurons, Jugalbandi makes one audible through mechanical instruments. Both projects share the same conviction: that computation becomes comprehensible when it passes through the body &mdash; through your eyes in Enigma, through your ears here. The medium changes. The thesis doesn&rsquo;t.</p>
          </CsBody>
        </CsSection>

        {viewMode === 'full' ? (
        <>
        {/* Background */}
        <section className="cs-section reveal" id="cs-background">
          <div className="wrap">
            <p className="cs-section-label">01 &mdash; Background</p>
            <h3 className="cs-section-title">The Concept</h3>
            <CsBody>
              <p>The genesis of this project drew inspiration from <a href="https://pangenerator.com/projects/the-abacus/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ink)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>The Abacus</a> by <a href="https://pangenerator.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ink)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>panGenerator Studio</a>. While the Abacus focused on recognizing digits, Jugalbandi operates on a similar concept but transforms neural network processes into acoustic and electronic sound. The name comes from the <a href="https://en.wikipedia.org/wiki/Jugalbandi" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ink)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>Hindustani classical tradition</a> of jugalbandi &mdash; a duet where two musicians engage in a musical conversation, trading phrases, responding to each other, building toward a shared climax. Here, the duet is between human and machine. The core question: what if you could hear a machine think?</p>
              <p>The installation is a 1:1 interactive physical representation of a real, functioning deep learning network, manifested through musical instruments rather than visual displays. Each hidden layer of the network corresponds to a different instrument or actuator group, so as data propagates through the model, you hear it move &mdash; from the airy tones of the flute layer, through the plucked melodies of the harp, to the percussive textures of the rainsticks. The final output layer produces a MIDI note on the Hexa-18 controller, completing the chain from raw input to musical expression.</p>
              <p>The concept also draws deeply from the Indian classical tradition of raga-based improvisation, where a performer follows a set of ascending and descending note patterns but is free to embellish and interpret within those constraints. Similarly, the neural network operates within its trained weights, yet produces outputs that feel spontaneous and alive when expressed through mechanical instruments whose physical tolerances introduce subtle variations in timing, pitch, and dynamics.</p>
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
            <p className="cs-section-label">03 &mdash; The Instrument</p>
            <h2 className="cs-display">Hexa-18</h2>
            <CsBody>
              <p>Hexa-18 is a custom-built hexagonal instrument that combines three distinct sound-making mechanisms into a single sculptural form &mdash; wind, string, and percussion. Each face of the polyhedron serves a different acoustic or electronic function, and the geometry itself became a design constraint that shaped the instrument&rsquo;s voice.</p>
              <p>The name references its eighteen active faces across three hexagonal tiers, each tier dedicated to one of the three sound families. The form factor was chosen both for structural rigidity &mdash; hexagons tessellate efficiently and distribute mechanical stress &mdash; and for its visual resonance with the node-and-edge diagrams commonly used to illustrate neural networks. When all three tiers are active simultaneously, the instrument produces a layered, polyphonic texture that shifts as the neural network&rsquo;s internal state evolves.</p>
              <p>Building the Hexa-18 required extensive prototyping in laser-cut acrylic and plywood, with multiple iterations to solve acoustic coupling problems. Early versions suffered from unwanted resonance between the percussion and string tiers, which was addressed by introducing damping layers of neoprene foam between each hexagonal platform. The final instrument stands roughly 1.2 meters tall and weighs approximately 15 kilograms, designed to be both visually striking under stage lighting and structurally stable enough to withstand the vibrations of a full performance.</p>
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
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/Jugalbandi/Photos/538A3968_nsquare_39.png" alt="Hexa-18 close-up: yellow hexagonal surface with sensor holes" loading="lazy" /></div>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/Jugalbandi/Photos/538A3968_nsquare_39-1.png" alt="Hexa-18 detail: internal wiring and sensor mounting" loading="lazy" /></div>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/Jugalbandi/Photos/538A4023_nsquare_64.png" alt="Hexa-18 detail: wind pipes from above" loading="lazy" /></div>
            </div>
          </div>
        </section>

        {/* Mechanized Harp */}
        <section className="cs-section reveal">
          <div className="wrap">
            <p className="cs-section-label">04 &mdash; Components</p>
            <h3 className="cs-section-title">Mechanized Harp</h3>
            <CsBody>
              <p>The mechanized harp is built inside a wooden frame and uses servo motors to pluck individual strings automatically. An Arduino Mega controls the timing and sequencing of each pluck, allowing for algorithmically composed melodies that respond to the neural network&rsquo;s hidden layer activations in real time.</p>
              <p>Each string is tuned to a note within the selected raga, so regardless of which combination the network triggers, the output remains harmonically consistent. The servo arms are fitted with flexible nylon picks that approximate the timbre of a finger pluck, and the tension of each string was calibrated by hand to ensure consistent volume across the register. Getting the servos to release cleanly without damping the string prematurely was one of the most time-consuming mechanical challenges of the entire build.</p>
              <p>In performance, the harp functions as the melodic voice of the network&rsquo;s middle layers &mdash; a kind of singing commentary on the data flowing through the system. Its tone is warm and organic, providing a counterpoint to the sharper electronic sounds of the MIDI output layer and grounding the installation in something recognizably acoustic and human.</p>
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
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/Jugalbandi/Photos/756.png" alt="Mechanized Harp: Arduino Mega, servo motors, wire mesh, and harp inside wooden frame" loading="lazy" /></div>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/Jugalbandi/Photos/538A4005_nsquare_57.webp" alt="Mechanized Harp rear view showing wiring, servos, and Arduino board" loading="lazy" /></div>
            </div>
          </div>
        </section>

        {/* Automated Flute */}
        <section className="cs-section reveal">
          <div className="wrap">
            <p className="cs-section-label">05 &mdash; Component</p>
            <h3 className="cs-section-title">Automated Flute</h3>
            <CsBody>
              <p>The automated flute uses an air pump to push air through the blowing hole, while servo motors actuated by Lego mechanisms open and close the finger holes to produce different notes. The entire assembly is controlled by a Mega Arduino that receives pitch commands from the neural network&rsquo;s early convolutional layers.</p>
              <p>Achieving a clean, playable tone from an automated flute proved to be the project&rsquo;s most demanding engineering challenge. The angle of airflow across the blowing hole had to be precise to within a few degrees; even small shifts caused the note to drop out entirely or jump to an overtone. A custom 3D-printed nozzle was designed to direct air at the correct embouchure angle, and a PWM-controlled pump allowed dynamic control of air pressure so that the instrument could play both soft and loud passages.</p>
              <p>The Lego-based finger mechanisms were chosen for rapid prototyping and easy adjustment. Each finger assembly uses a small servo arm pressing a silicone pad over the tone hole, creating an airtight seal. The use of Lego allowed quick iteration on lever ratios and mounting positions without the lead time of custom fabrication, and the playful materiality of the Lego bricks added an unexpected visual charm to the instrument that audiences responded to warmly.</p>
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
            <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/Jugalbandi/Photos/757.png" alt="Automated Flute: air pump, servo motors, Mega Arduino, Lego finger mechanisms on bamboo flute" loading="lazy" /></div>
          </div>
        </section>

        {/* Rainsticks */}
        <section className="cs-section reveal">
          <div className="wrap">
            <p className="cs-section-label">06 &mdash; Component</p>
            <h3 className="cs-section-title">Rainsticks</h3>
            <CsBody>
              <p>The rainstick module is mounted on a wooden structure and uses servo motors to tilt and rotate cardboard rainsticks, producing cascading percussive sounds. A dedicated circuit board coordinates the timing of each tilt to layer rhythmic patterns that mirror the activation density of the network&rsquo;s pooling layers.</p>
              <p>Rainsticks were chosen for their inherently stochastic sound &mdash; the beads tumbling through internal pins produce a texture that is never exactly the same twice, much like the probabilistic nature of neural network inference. By varying the tilt angle and speed, the installation controls the density and duration of the cascading sound, from a sparse trickle to a dense, enveloping wash. This made the rainsticks an ideal physical analogue for the pooling layers, which compress and summarize information.</p>
              <p>The wooden mounting frame was designed to hold four rainsticks at different angles, each driven by its own servo. The cardboard tubes were filled with a mixture of rice grains and small glass beads to produce a richer frequency spectrum than either material alone. Tuning the fill amount and pin density inside each stick was an iterative, hands-on process that blended craft with computation &mdash; a fitting metaphor for the project as a whole.</p>
            </CsBody>
            <div className="cs-label-row">
              <span className="cs-label-row-key">Actuators</span>
              <span className="cs-label-row-val">Servo Motors</span>
            </div>
            <div className="cs-label-row">
              <span className="cs-label-row-key">Structure</span>
              <span className="cs-label-row-val">Wooden Frame</span>
            </div>
            <div className="cs-label-row">
              <span className="cs-label-row-key">Sound Source</span>
              <span className="cs-label-row-val">Rainsticks</span>
            </div>
            <div className="cs-label-row">
              <span className="cs-label-row-key">Electronics</span>
              <span className="cs-label-row-val">Circuit Board</span>
            </div>
          </div>
        </section>

        {/* Rainstick photo */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/Jugalbandi/Photos/758.png" alt="Rainsticks: servo motor powered rainstick rotation on wooden frame structure" loading="lazy" /></div>
          </div>
        </section>

        {/* Remaining detail shots */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/Jugalbandi/Photos/538A3968_nsquare_39-2.png" alt="Detail: hexagonal body construction" loading="lazy" /></div>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/Jugalbandi/Photos/538A3968_nsquare_39-3.png" alt="Detail: sensor and wiring close-up" loading="lazy" /></div>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/Jugalbandi/Photos/538A4023_nsquare_64-1.png" alt="Detail: component assembly" loading="lazy" /></div>
            </div>
          </div>
        </section>

        {/* Tools & Process */}
        <section className="cs-section reveal" id="cs-process">
          <div className="wrap">
            <p className="cs-section-label">07 &mdash; Process</p>
            <h3 className="cs-section-title">Tools and Techniques</h3>
            <div className="cs-tags">
              <span className="cs-tag-item">Neural Networks</span>
              <span className="cs-tag-item">Machine Learning (ML5.JS)</span>
              <span className="cs-tag-item">Fabrication</span>
              <span className="cs-tag-item">Data Analysis</span>
              <span className="cs-tag-item">Dataset</span>
              <span className="cs-tag-item">Critical Thinking</span>
              <span className="cs-tag-item">Physical Computing</span>
              <span className="cs-tag-item">Electronics</span>
            </div>
            <CsSteps steps={[
              { num: '1', title: 'Research & Data', desc: 'Studied neural network architectures and built custom training datasets for musical pattern recognition.' },
              { num: '2', title: 'Prototyping', desc: 'Designed and fabricated mechanical instrument prototypes using Arduino, servos, and found materials.' },
              { num: '3', title: 'Integration', desc: 'Connected ML models to physical actuators, mapping network outputs to musical notes and rhythms.' },
              { num: '4', title: 'Performance', desc: 'Staged a live performance where the artist and machine played together as a duet \u2014 Jugalbandi.' },
            ]} />
          </div>
        </section>

        {/* Reflection */}
        <section className="cs-section reveal" id="cs-reflection">
          <div className="wrap">
            <p className="cs-section-label">08 &mdash; Reflection</p>
            <h3 className="cs-section-title">What Building Jugalbandi Taught Me</h3>
            <CsBody style={{ maxWidth: '720px' }}>
              <p>Jugalbandi was the project where I learned that the hardest part of interdisciplinary work is not the technology&mdash;it is the translation layer between domains. Making a neural network &ldquo;play music&rdquo; sounds straightforward until you realize that the network&rsquo;s output (a probability distribution across 10 digits) has no inherent musical meaning. The design challenge was not building the instrument; it was defining the mapping between abstract computation and physical sound in a way that felt musically coherent rather than arbitrary.</p>
              <p>The mechanical instruments themselves taught me about material constraints. The automated flute, for instance, required precise air pressure to produce clean tones&mdash;too little and the note was breathy, too much and it overblew into a harmonic. Servo motors introduced timing latency that made fast passages impossible. These physical limitations forced compositional choices: slow, contemplative pieces that worked within the mechanism&rsquo;s capabilities rather than fighting them.</p>
              <p>Exhibiting at ITP Spring Show and Maker Faire Coney Island showed me that people engage differently with computational art when it has a physical presence. Visitors who would scroll past a screen-based neural network visualization spent 10+ minutes with Jugalbandi because they could hear the computation, see the mechanisms move, and feel the vibrations. Embodiment changes comprehension.</p>
            </CsBody>
          </div>
        </section>

        {/* Credits */}
        <section className="cs-section reveal">
          <div className="wrap">
            <p className="cs-section-label">09 &mdash; Team</p>
            <h3 className="cs-section-title">Credits</h3>
            <CsCredits credits={[
              { role: 'Artist', name: 'Parth' },
              { role: 'Mentor', name: 'David Rios' },
              { role: 'Mentor', name: 'Phil Caridi' },
              { role: 'Shot & InFrame', name: 'Virendra Pawar' },
            ]} />

            <h4 className="cs-section-subtitle">Abacus Inspiration Credits</h4>
            <CsCredits credits={[
              { role: 'Studio', name: 'panGenerator' },
              { role: 'Team', name: 'Krzysztof Cybulski' },
              { role: 'Team', name: 'Krzysztof Goli\u0144ski' },
              { role: 'Team', name: 'Jakub Ko\u017Aniewski' },
              { role: 'Team', name: 'Wojciech Stokowiec' },
            ]} />
          </div>
        </section>

        <CsThanks />
        </>
        ) : null}

        <BottomNav
          sections={sections}
          modeAction={{
            label: viewMode === 'summary' ? 'Full case study' : '2 min summary',
            onClick: () => handleViewModeChange(viewMode === 'summary' ? 'full' : 'summary'),
          }}
        />

      </main>

      <NextProject slug="vj-software" title="VJ Software" image="/Portfolio.github.io/Assets/images/vj.jpg" />
      <Footer />
    </>
  )
}
