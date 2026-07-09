import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
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
        <meta name="description" content="Enigma is an interactive light sculpture that embodies a real functioning deep learning network, using 200 illuminated neurons to elucidate the complexity of neural networks." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Enigma &middot; Parth Pawar" />
        <meta property="og:description" content="Interactive light sculpture embodying a real functioning deep learning network." />
        <meta property="og:image" content="https://parthawe.github.io/Portfolio.github.io/Assets/images/enigma.jpg" />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#3A3A40' } as React.CSSProperties}>

        <ProjectHeader
          backLink="/work"
          categorySlug="ai"
          backLabel="Back to Work"
          tags={['Creative Technology', 'AI', 'Installation']}
          title="Enigma"
          subtitle="Interactive light sculpture embodying a real functioning deep learning network"
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

        {/* Concept */}
        <CsSection id="cs-concept" label="01 &mdash; Concept" title="200 Neurons of Light">
          <CsBody>
            <p>Enigma makes a neural network visible. A visitor writes a letter, and 200 LEDs reveal the model&rsquo;s pathway from input to prediction.</p>
            <p>The piece takes the form of a large wall-mounted panel, roughly four feet wide and three feet tall, with each LED node suspended at a precise position corresponding to a neuron in the network&rsquo;s layers. Acrylic rods and custom-fabricated mounts hold the LEDs in place, creating a three-dimensional constellation of light that reveals the structure of the model &mdash; input layer at one edge, hidden layers in the center, and output layer at the opposite edge. When the network is idle, the sculpture glows softly; when it is processing, light cascades through the layers in real time, making the flow of information something viewers can see and feel.</p>
            <p>The project builds on <a href="https://pangenerator.com/projects/the-abacus/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ink)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>The Abacus</a> by <a href="https://pangenerator.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ink)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>panGenerator Studio</a>, extending the idea from digit recognition to the full alphabet.</p>
          </CsBody>
        </CsSection>


        {/* Technology */}
        <CsSection id="cs-technology" label="02 &mdash; Technology" title="From Model to Light">
          <CsBody>
            <p>At the core of Enigma is a fully connected feedforward neural network trained on the EMNIST letters dataset to recognize handwritten alphabetic characters. The model consists of an input layer, two hidden layers, and an output layer &mdash; each layer physically represented by a row of LEDs on the sculpture. After training, the learned weights and biases are exported and loaded onto the hardware so the sculpture can perform inference locally, without any cloud dependency.</p>
            <p>The hardware stack centers on an Arduino Mega microcontroller that orchestrates the entire visualization pipeline. A companion laptop captures handwritten input from a tablet, preprocesses the image into a 28 by 28 pixel grayscale matrix, and transmits the flattened pixel values to the Arduino over serial communication. The Arduino then performs a forward pass through the network, computing activations layer by layer. Each of the 200 LEDs is driven by TLC5940 constant-current LED drivers daisy-chained together, giving individual brightness control over every node with 12-bit resolution.</p>
            <p>As the forward pass executes, each neuron&rsquo;s activation value is mapped to an LED brightness level, so viewers see the data literally flow from the input layer through the hidden layers to the output. Highly activated neurons glow brightly while low-activation neurons remain dim, revealing which pathways the network relies on for a given character. The entire cycle &mdash; from drawing a letter to seeing the network&rsquo;s prediction light up at the output layer &mdash; completes in under a second, so viewers can connect their gesture to the machine&rsquo;s computation without waiting.</p>
          </CsBody>
        </CsSection>


        {/* Exhibition */}
        <CsSection id="cs-exhibition" label="03 &mdash; Exhibition" title="ITP Winter Show 2023">
          <CsBody>
            <p>Enigma was exhibited at the ITP Winter Show 2023, NYU&rsquo;s flagship end-of-semester showcase where the Interactive Telecommunications Program opens its doors to the public. The show draws thousands of visitors over two days &mdash; designers, engineers, artists, families, and curious New Yorkers &mdash; making it an ideal venue to test how a broad audience engages with a piece about machine learning.</p>
            <p>Visitors interacted with Enigma by writing letters on a tablet stationed in front of the sculpture. As soon as a character was submitted, the network came alive: light rippled from the input layer through the hidden layers and converged on the output, where the predicted letter glowed brightest. Many visitors wrote the same letter repeatedly, noticing how different handwriting styles activated different pathways. Others tested edge cases &mdash; ambiguous letters, symbols, or scribbles &mdash; to see how the network responded to unexpected input.</p>
            <p>The most consistent reaction was surprise at how structured and purposeful the light patterns looked. Viewers frequently remarked that they expected AI to feel random or opaque, but watching activations cascade through defined pathways gave them an immediate sense that the network had learned real structure. Several visitors described the experience as the first time neural networks &ldquo;made sense&rdquo; to them. The exhibition reinforced the project&rsquo;s central thesis: making computation physically visible can bridge the gap between technical explanation and practical understanding.</p>
            <p>Enigma explores computation through light. Its sibling project, <a href="/Portfolio.github.io/jugalbandi" style={{ color: 'var(--ink)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>Jugalbandi</a>, explores the same neural network architecture through sound &mdash; each hidden layer mapped to a different acoustic instrument. Together they show how the same invisible process can be made tangible through different senses.</p>
          </CsBody>

          <figure className="cs-img reveal" style={{ maxWidth: '640px', margin: '2.5rem auto 0' }}>
            <img src="/Portfolio.github.io/Assets/Projects/Enigma/photos/tablet-input.jpg" alt="A visitor's hand mid-stroke on the tablet, which prompts: Please draw one Alphabet" loading="lazy" decoding="async" />
            <figcaption className="cs-img-caption">Where every interaction started: the tablet prompt read &ldquo;Please draw one Alphabet,&rdquo; and the stroke propagated through 200 neurons before the visitor lifted their finger.</figcaption>
          </figure>
        </CsSection>


        {/* Thanks */}
        <CsThanks />

        <BottomNav sections={[
          { id: 'cs-film', label: 'Film' },
          { id: 'cs-interactive', label: 'Interactive' },
          { id: 'cs-concept', label: 'Concept' },
          { id: 'cs-technology', label: 'Technology' },
          { id: 'cs-exhibition', label: 'Exhibition' },
        ]} />

      </main>

      <NextProject slug="making-of-time" title="Making of Time" image="/Portfolio.github.io/Assets/images/making-of-time.jpg" />
      <Footer />
    </>
  )
}
