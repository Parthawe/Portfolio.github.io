import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import CsSection from '../../components/case-study/CsSection'
import CsBody from '../../components/case-study/CsBody'
import CsFeatureGrid from '../../components/case-study/CsFeatureGrid'
import CsThanks from '../../components/case-study/CsThanks'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'

export default function IntroCompMediaPage() {
  return (
    <>
      <Helmet>
        <title>Computational Media &middot; Parth Pawar</title>
        <meta name="description" content="Creative coding explorations in p5.js — generative portraits, interactive typography, data-driven landscapes, and algorithmic pattern systems." />
      </Helmet>
      <Nav />
      <main id="main-content" className="project-main" style={{ '--project-color': '#e84393' } as React.CSSProperties}>
        <ProjectHeader
          backLink="/work" categorySlug="creative-tech" backLabel="Back to Work"
          tags={['Creative Coding', 'p5.js', 'Generative']}
          title="Computational Media"
          subtitle="Weekly creative coding sketches in p5.js &mdash; learning to think algorithmically through visual experiments"
          info={[
            { label: 'Context', value: 'Intro to Computational Media, NYU ITP' },
            { label: 'Year', value: '2023' },
            { label: 'Role', value: 'Creative Coder' },
            { label: 'Tools', value: 'p5.js, JavaScript, HTML Canvas' },
          ]}
        />
        <CsSection id="cs-overview" label="01 &mdash; Overview" title="Code as Sketchbook">
          <CsBody>
            <p>ICM at ITP is the course that teaches designers to think computationally. Every week, a new prompt: loops, conditionals, functions, objects, arrays, pixels, sound, video. Every week, a new sketch. The constraint: express the concept visually, in p5.js, in one week.</p>
            <p>Coming from Figma and Illustrator, writing code to draw felt backwards. But the payoff was immediate: code can do things static tools cannot. Randomness. Infinite variation. Response to input. Emergence from simple rules. By week 4, I stopped thinking of code as a tool and started thinking of it as a medium.</p>
          </CsBody>
        </CsSection>
        <CsSection id="cs-sketches" label="02 &mdash; Selected Sketches" title="Seven Experiments">
          <CsFeatureGrid features={[
            { title: 'Generative Portraits', desc: 'Faces built from randomized ellipses, bezier curves, and noise-driven features. No two are alike. The uncanny valley between recognizable and alien is where the interesting work happens.' },
            { title: 'Interactive Typography', desc: 'Letters that respond to the mouse — hover over a word and each character scatters, rotates, and reforms. Typography as a living system rather than a static arrangement.' },
            { title: 'Data Landscape', desc: 'NYC weather data (temperature, humidity, wind) mapped to a procedural landscape. Hot days = red terrain, windy days = jagged peaks, calm days = smooth rolling hills. A year of weather as a single panorama.' },
            { title: 'Pixel Sorting', desc: 'Webcam feed with pixels sorted by brightness in real-time. Creates a glitch aesthetic where your face dissolves into horizontal bands of color. The algorithm treats the camera as a data source, not an image.' },
            { title: 'Recursive Trees', desc: 'L-system grammar generating branching structures. Adjust parameters with sliders: branch angle, depth, thickness decay. The same algorithm produces trees, coral, lightning, and river deltas.' },
            { title: 'Sound Visualizer', desc: 'Microphone input drives a particle system — volume controls particle count, frequency spectrum controls color. Speak softly: blue, sparse. Shout: red, explosive. Sing: the whole spectrum at once.' },
            { title: 'Cellular Automata', desc: 'Conway\'s Game of Life with a twist: cells have color memory. Each generation inherits a blend of parent colors, creating evolving chromatic patterns from simple birth/death rules.' },
          ]} />
        </CsSection>
        <CsSection id="cs-reflection" label="03 &mdash; What It Opened" title="The Beginning of Everything">
          <CsBody>
            <p>ICM was the foundation for everything that came after at ITP. Enigma&rsquo;s neural network visualization, Flow Fields&rsquo; particle system, the Embodied Web experiments, even the interactive elements in this portfolio &mdash; all of them trace back to skills learned in those weekly p5.js sketches.</p>
            <p>The most important lesson wasn&rsquo;t technical. It was learning to be comfortable with code that produces unexpected results. In Figma, every pixel is deliberate. In generative art, the best outcomes are the ones you didn&rsquo;t plan. That shift &mdash; from control to collaboration with the system &mdash; changed how I approach design entirely.</p>
          </CsBody>
        </CsSection>
        <CsThanks />
        <BottomNav sections={[
          { id: 'cs-overview', label: 'Overview' },
          { id: 'cs-sketches', label: 'Sketches' },
          { id: 'cs-reflection', label: 'Reflection' },
        ]} />
      </main>
      <NextProject slug="flow-fields" title="Flow Fields" image="/Portfolio.github.io/Assets/images/sea-of-salt.svg" />
      <Footer />
    </>
  )
}
