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
import EnigmaInteractive from '../../components/EnigmaInteractive'

export default function EnigmaPage() {
  return (
    <>
      <Helmet>
        <title>Enigma &middot; Parth Pawar</title>
        <meta name="description" content="A 200-neuron light sculpture that makes a letter-recognition neural network visible through physical LEDs." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Enigma &middot; Parth Pawar" />
        <meta property="og:description" content="A physical light sculpture that makes neural-network activity visible." />
        <meta property="og:image" content="https://parthawe.github.io/Portfolio.github.io/Assets/images/enigma.jpg" />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#3A3A40' } as React.CSSProperties}>

        <ProjectHeader
          backLink="/work"
          categorySlug="creative-tech"
          backLabel="Back to Work"
          tags={['Creative Technology', 'AI', 'Installation']}
          title="Enigma"
          subtitle="A 200-neuron light sculpture that makes a neural network visible"
          info={[
            { label: 'Year', value: '2023' },
            { label: 'Role', value: 'Creator' },
          ]}
        />

        <CsMediaSpotlight
          id="cs-film"
          label="Watch first"
          title="Light as inference"
          lede="The film shows the main idea faster than text can: a handwritten letter becomes a visible cascade through 200 physical neurons."
          meta={['Vimeo demo', '200 LEDs', 'EMNIST letters']}
        >
          <iframe
            src="https://player.vimeo.com/video/895893649?h=d78737dcdb&badge=0&autopause=0&player_id=0&app_id=58479"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            loading="lazy"
            title="Enigma"
          />
        </CsMediaSpotlight>

        {/* Interactive */}
        <CsSection id="cs-interactive" label="Interactive" title="See the Network Think">
          <CsBody>
            <p>Draw a letter or press any key A to Z. The simulation shows what the sculpture made physical: input pixels, hidden layers, and the final prediction lighting up as a network path.</p>
          </CsBody>
          <div className="cs-label-row">
            <span className="cs-label-row-key">Network</span>
            <span className="cs-label-row-val">28 input &rarr; 12 hidden &rarr; 8 hidden &rarr; 26 output (A&ndash;Z)</span>
          </div>
          <div style={{ marginTop: 'var(--space-5)' }}>
            <EnigmaInteractive />
          </div>
        </CsSection>

        {/* Hero photos */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/Enigma/photos/person-viewing.webp" alt="Viewer standing before the Enigma sculpture as it recognizes the letter A" loading="lazy" decoding="async" /></div>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/Enigma/photos/full-sculpture-c.webp" alt="Full Enigma sculpture recognizing letter C, 200 neurons illuminated" loading="lazy" decoding="async" /></div>
            </div>
          </div>
        </section>

        {/* Detail photos */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/Enigma/photos/alphabet-layer.webp" alt="Alphabet output layer: A through Z labeled neurons glowing" loading="lazy" decoding="async" /></div>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/Enigma/photos/wire-detail.webp" alt="Wire connections between neuron layers, silver wires crossing" loading="lazy" decoding="async" /></div>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/Enigma/photos/neuron-closeup.webp" alt="Close-up: ping pong ball neurons with bokeh wire connections" loading="lazy" decoding="async" /></div>
            </div>
          </div>
        </section>

        {/* Wide shot */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/Enigma/photos/full-sculpture-wide.webp" alt="Enigma sculpture wide shot: full neural network with alphabet output layer visible" loading="lazy" decoding="async" /></div>
          </div>
        </section>

        <CsExpandPreview>
        {/* Concept */}
        <CsSection id="cs-concept" label="01 &mdash; Concept" title="200 Neurons of Light">
          <CsBody>
            <p>Enigma makes a neural network visible. A visitor writes a letter, and 200 LEDs reveal the model&rsquo;s pathway from input to prediction.</p>
            <p>The wall-mounted panel turns the model structure into space: input on one edge, hidden layers through the center, alphabet output on the other. When a letter is submitted, light moves through the sculpture in real time.</p>
            <p>The project builds on <a href="https://pangenerator.com/projects/the-abacus/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ink)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>The Abacus</a> by <a href="https://pangenerator.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ink)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>panGenerator Studio</a>, extending the idea from digit recognition to the full alphabet.</p>
          </CsBody>
        </CsSection>


        {/* Technology */}
        <CsSection id="cs-technology" label="02 &mdash; Technology" title="From Model to Light">
          <CsBody>
            <p>The model is a feedforward neural network trained on EMNIST letters. Its input, hidden, and output layers are physically represented by rows of LEDs.</p>
            <p>A tablet captures the drawn letter, a laptop preprocesses it into a 28 by 28 matrix, and an Arduino Mega drives the LED activation sequence. Brighter LEDs show stronger activations.</p>
            <p>The full loop finishes in under a second, so visitors can connect their gesture to the model&rsquo;s prediction while the computation is still visible.</p>
          </CsBody>
        </CsSection>


        {/* Exhibition */}
        <CsSection id="cs-exhibition" label="03 &mdash; Exhibition" title="ITP Winter Show 2023">
          <CsBody>
            <p>Enigma was exhibited at the ITP Winter Show 2023, NYU&rsquo;s flagship end-of-semester showcase where the Interactive Telecommunications Program opens its doors to the public. The show draws thousands of visitors over two days &mdash; designers, engineers, artists, families, and curious New Yorkers &mdash; making it an ideal venue to test how a broad audience engages with a piece about machine learning.</p>
            <p>Visitors wrote letters on a tablet and watched the prediction ripple across the sculpture. Many repeated the same letter to see how different handwriting changed the path.</p>
            <p>The strongest reaction was recognition: people expected AI to feel opaque, but the lit pathways made the network feel structured and learnable.</p>
            <p>Enigma explores computation through light. Its sibling project, <a href="/Portfolio.github.io/jugalbandi" style={{ color: 'var(--ink)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>Jugalbandi</a>, explores the same neural network architecture through sound &mdash; each hidden layer mapped to a different acoustic instrument. Together they show how the same invisible process can be made tangible through different senses.</p>
          </CsBody>

          <figure className="cs-img reveal" style={{ maxWidth: '640px', margin: '2.5rem auto 0' }}>
            <img src="/Portfolio.github.io/Assets/Projects/Enigma/photos/tablet-input.jpg" alt="A visitor's hand mid-stroke on the tablet, which prompts: Please draw one Alphabet" loading="lazy" decoding="async" />
            <figcaption className="cs-img-caption">Where every interaction started: the tablet prompt read &ldquo;Please draw one Alphabet,&rdquo; and the stroke propagated through 200 neurons before the visitor lifted their finger.</figcaption>
          </figure>
        </CsSection>


        {/* Thanks */}
        <CsThanks />

        </CsExpandPreview>

        <BottomNav sections={[
          { id: 'cs-film', label: 'Film' },
          { id: 'cs-interactive', label: 'Interactive' },
          { id: 'cs-concept', label: 'Concept' },
          { id: 'cs-technology', label: 'Technology' },
          { id: 'cs-exhibition', label: 'Exhibition' },
        ]} />

      </main>

      <NextProject slug="shuffle" title="Shuffle" image="/Portfolio.github.io/Assets/mockups/projects/shuffle_16x9.webp" />
      <Footer />
    </>
  )
}
