import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import CsSection from '../../components/case-study/CsSection'
import CsBody from '../../components/case-study/CsBody'
import CsImage from '../../components/case-study/CsImage'
import CsCredits from '../../components/case-study/CsCredits'
import CsThanks from '../../components/case-study/CsThanks'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'

export default function BlackHolePage() {
  return (
    <>
      <Helmet>
        <title>Black Hole &middot; Parth Pawar</title>
        <meta name="description" content="Physical models exploring five black hole phenomena — time dilation, spacetime fabric, gravitational lensing, wormholes, and binary mergers. Exhibited at the Horological Society of New York." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Black Hole · Parth Pawar" />
        <meta property="og:description" content="Physical models exploring five black hole phenomena. Exhibited at the Horological Society of New York." />
        <meta property="og:image" content="https://parthpawar.com/Assets/images/black-hole.jpg" />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#1a1a2e' } as React.CSSProperties}>

        <ProjectHeader
          backLink="/work"
          categorySlug="installations"
          backLabel="Back to Work"
          tags={['Physical Computing', 'Fabrication', 'Science Communication']}
          title="Black Hole"
          subtitle="Physical models exploring five phenomena observed near black holes &mdash; from time dilation to gravitational lensing"
          info={[
            { label: 'Context', value: 'NYU ITP' },
            { label: 'Role', value: 'Designer & Fabricator' },
            { label: 'Collaborator', value: 'Saee Joshi' },
            { label: 'Professor', value: 'Jeffrey Feddersen' },
            { label: 'Year', value: '2026' },
          ]}
        />

        {/* Hero — Time Trap */}
        <CsImage src="/Assets/Projects/BlackHole/time-trap.jpg" alt="The Black Hole's Time Trap — circular platform with clocks at different distances demonstrating time dilation" />

        {/* Challenge */}
        <CsSection id="cs-challenge" label="The Challenge" title="Making the Invisible Tangible">
          <CsBody>
            <p>A black hole is a region of spacetime where gravity is so strong that nothing &mdash; not even light &mdash; can escape. These are among the most extreme objects in the universe, yet their effects are entirely invisible to the naked eye. The challenge was to create physical representations of five black hole phenomena that make abstract astrophysics something you can see, touch, and understand intuitively.</p>
            <p>Each model had to be scientifically grounded while remaining accessible to a general audience. The project will be exhibited at the Horological Society of New York&rsquo;s museum this winter, bringing these cosmic phenomena into a space traditionally dedicated to the craft of timekeeping &mdash; a fitting pairing, since black holes fundamentally distort time itself.</p>
          </CsBody>
        </CsSection>

        {/* 01 — Time Trap */}
        <CsSection id="cs-time-trap" label="01 &mdash; Phenomenon" title="The Black Hole&rsquo;s Time Trap">
          <CsBody>
            <p>Near a black hole, time behaves strangely. Gravity stretches and warps spacetime, causing time to slow down dramatically near the black hole compared to far away. If you hover just above the event horizon &mdash; the black hole&rsquo;s point of no return &mdash; minutes for you could be years for a distant observer. The closer you get, the slower time moves.</p>
            <p>The model places clocks at different distances from a central black hole. At each position, the flow of time changes &mdash; closer to the black hole, time slows dramatically; further away, time flows more normally. This fascinating effect, predicted by Einstein&rsquo;s General Relativity, reminds us that even time itself bends under gravity&rsquo;s influence.</p>
          </CsBody>
        </CsSection>

        {/* Time dilation video */}
        <section className="cs-slide reveal">
          <div className="wrap">
            <video
              src="/Assets/Projects/BlackHole/time-dilation.mp4"
              autoPlay
              loop
              muted
              playsInline
              style={{ width: '100%', borderRadius: 'var(--radius-lg)' }}
            />
          </div>
        </section>

        <CsImage src="/Assets/Projects/BlackHole/time-trap.jpg" alt="Time Trap model — clocks at varying distances from a central black hole, each running at different speeds" />

        {/* 02 — Fabric of the Universe */}
        <CsSection id="cs-fabric" label="02 &mdash; Phenomenon" title="The Invisible Fabric of the Universe">
          <CsBody>
            <p>Imagine spacetime as a giant, invisible sheet stretched across the universe. Massive objects like stars and planets sit on this sheet, bending it under their weight. This bending creates what we experience as gravity.</p>
            <p>The model shows how objects like the Sun create &ldquo;dents&rdquo; in this fabric, causing nearby objects to orbit them. The heavier the object, the deeper the dent. Black holes create the deepest dents of all &mdash; so deep that nothing can escape. This concept, from Einstein&rsquo;s General Relativity, explains everything from Earth&rsquo;s orbit to how galaxies form. It is a simple but powerful idea about the invisible forces shaping our universe.</p>
          </CsBody>
        </CsSection>

        <CsImage src="/Assets/Projects/BlackHole/fabric-of-universe.jpg" alt="Fabric of the Universe model — a stool with stretched fabric and a weighted sphere showing spacetime deformation" />

        {/* 03 — Gravitational Lensing + Wormholes */}
        <CsSection id="cs-lensing" label="03 &amp; 04 &mdash; Phenomena" title="Gravity&rsquo;s Grip on Light &amp; Wormholes">
          <CsBody>
            <p>A black hole&rsquo;s influence isn&rsquo;t just about matter &mdash; it bends light itself. This phenomenon, called gravitational lensing, occurs when light from a distant star travels around a massive object, creating distorted, magnified, and sometimes duplicated images. Predicted by Einstein&rsquo;s General Relativity, it allows astronomers to map distant galaxies and black holes themselves, revealing the invisible forces shaping our universe.</p>
            <p>Alongside the lensing model sits a representation of a wormhole &mdash; a hypothetical tunnel connecting two distant points in spacetime. Imagine folding a piece of paper and punching a hole through it: this is how a wormhole works in theory, creating a shortcut for travel across the universe. While wormholes remain a fascinating solution to Einstein&rsquo;s equations, they have not been observed &mdash; yet the physics that predicts them is the same physics we have confirmed through gravitational wave detection.</p>
          </CsBody>
        </CsSection>

        <CsImage src="/Assets/Projects/BlackHole/gravitational-lensing.jpg" alt="Gravitational Lensing and Wormholes model — a glass lens demonstrating light bending and a fabric wormhole model" />

        {/* 04 — Binary Mergers */}
        <CsSection id="cs-mergers" label="05 &mdash; Phenomenon" title="When Giants Collide: Binary Black Hole Mergers">
          <CsBody>
            <p>Binary black holes are pairs of black holes locked in a cosmic dance. As they orbit each other, they spiral closer, releasing energy as ripples in spacetime called gravitational waves. The model shows the final moments of their merger in three stages:</p>
            <ul>
              <li><strong>Inspiral</strong> &mdash; The black holes get closer, spinning faster and emitting stronger gravitational waves.</li>
              <li><strong>Merger</strong> &mdash; They collide, forming a single, larger black hole.</li>
              <li><strong>Ringdown</strong> &mdash; The new black hole settles, releasing faint ripples as it stabilizes.</li>
            </ul>
            <p>This phenomenon, first detected in 2015 by LIGO, confirmed Einstein&rsquo;s predictions and opened a new window into understanding the universe.</p>
          </CsBody>
        </CsSection>

        <CsImage src="/Assets/Projects/BlackHole/binary-mergers.jpg" alt="Binary Black Hole Mergers model — three 3D-printed stages showing Inspiral, Merger, and Ringdown" />

        {/* Exhibition */}
        <CsSection id="cs-exhibition" label="Exhibition" title="Horological Society of New York">
          <CsBody>
            <p>This project will be exhibited at the Horological Society of New York&rsquo;s museum this winter. The pairing is intentional &mdash; black holes are fundamentally about the distortion of time, and the Horological Society is dedicated to the art and science of measuring it. The models bridge astrophysics and horology, inviting visitors to experience cosmic phenomena through the lens of precision craft.</p>
          </CsBody>
        </CsSection>

        {/* Credits */}
        <CsCredits credits={[
          { role: 'Design & Fabrication', name: 'Parth Pawar' },
          { role: 'Applied Mathematics', name: 'Saee Joshi' },
          { role: 'Professor', name: 'Jeffrey J Feddersen' },
        ]} />

        <CsThanks />

        <BottomNav sections={[
          { id: 'cs-challenge', label: 'Challenge' },
          { id: 'cs-time-trap', label: 'Time Trap' },
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
