import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import CsSection from '../../components/case-study/CsSection'
import CsBody from '../../components/case-study/CsBody'
import CsImage from '../../components/case-study/CsImage'
import CsFeatureGrid from '../../components/case-study/CsFeatureGrid'
import CsThanks from '../../components/case-study/CsThanks'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'

export default function CodeForBuildPage() {
  return (
    <>
      <Helmet>
        <title>Code for Build &middot; Parth Pawar</title>
        <meta name="description" content="A compact glimpse of Code for Build, a mobile-first coding education concept that maps HTML/CSS ideas to 3D building blocks." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Code for Build &middot; Parth Pawar" />
        <meta property="og:description" content="A mobile-first coding education concept using 3D building blocks to make HTML/CSS structure easier to understand." />
        <meta property="og:image" content="https://parthawe.github.io/Portfolio.github.io/Assets/images/code-for-build.jpg" />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#2B6CB0' } as React.CSSProperties}>
        <ProjectHeader
          backLink="/work"
          categorySlug="ux-design"
          backLabel="Back to Work"
          tags={['UX', 'Education', '3D']}
          title={'Learn Coding\nBy Building Blocks'}
          subtitle="A mobile-first coding education concept built around visual blocks, not long lessons"
          info={[
            { label: 'Context', value: 'Self initiated' },
            { label: 'Role', value: 'Interaction Designer' },
            { label: 'Year', value: '2021' },
          ]}
          heroImage="/Portfolio.github.io/Assets/Projects/CodeforBuild/photos/phone-hero.png"
          heroAlt="Code for Build hero with 3D block illustrations and mobile mockups"
        />

        <CsSection id="cs-glimpse" label="Glimpse" title="Coding Lessons For A Phone-Only Learner">
          <CsBody>
            <p>This project is best shown as a concept glimpse, not a heavy case study. The starting point was a student persona with curiosity for web development but limited desktop access. I explored how HTML and CSS concepts could be taught on a phone by turning structure into something visual: containers, padding, images, text, and buttons became stackable 3D blocks.</p>
          </CsBody>
          <div className="cs-label-row">
            <span className="cs-label-row-key">Problem</span>
            <span className="cs-label-row-val">Learning web structure on a small phone screen can feel abstract, especially for first-time learners.</span>
          </div>
          <div className="cs-label-row">
            <span className="cs-label-row-key">Method</span>
            <span className="cs-label-row-val">Map code concepts to familiar building blocks, then pair each block with a live preview and 3D model of the page structure.</span>
          </div>
          <div className="cs-label-row" style={{ borderBottom: 'none' }}>
            <span className="cs-label-row-key">Result</span>
            <span className="cs-label-row-val">A visual learning prototype that makes layout concepts easier to inspect before reading code syntax.</span>
          </div>
        </CsSection>

        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/CodeforBuild/photos/persona-research.jpg" alt="Persona research board for a phone-first coding learner" loading="lazy" decoding="async" /></div>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/CodeforBuild/photos/design-system-colors.jpg" alt="3D block color system for Code for Build" loading="lazy" decoding="async" /></div>
            </div>
          </div>
        </section>

        <CsSection id="cs-result" label="Result" title="The Core Interaction">
          <CsBody>
            <p>The useful part of the project is the metaphor. A page is treated like a small physical build: body as the base, containers as pieces, padding as spacing, and content as placed blocks. The learner can move between the rendered screen and the 3D explanation of what the screen is made from.</p>
          </CsBody>
          <CsImage
            src="/Portfolio.github.io/Assets/Projects/CodeforBuild/photos/two-phones.png"
            alt="Two Code for Build app screens showing visual code blocks and a 3D layout explanation"
            caption="The prototype pairs phone UI, block structure, and a 3D layout model so the learner can connect output to structure."
          />
        </CsSection>

        <CsSection id="cs-learning" label="Learning" title="What I Learned">
          <CsFeatureGrid features={[
            { title: 'Metaphors need limits', desc: 'Blocks made layout approachable, but the interface had to avoid showing too many layers at once.' },
            { title: 'Education is pacing', desc: 'The learner needs one clear next concept, not a wall of features or a full visual system upfront.' },
            { title: 'Small screens sharpen hierarchy', desc: 'The phone constraint forced the 3D view, lesson flow, and code explanation to fight for attention. Progressive disclosure became the main design lesson.' },
          ]} />
        </CsSection>

        <CsThanks />

        <BottomNav sections={[
          { id: 'cs-glimpse', label: 'Glimpse' },
          { id: 'cs-result', label: 'Result' },
          { id: 'cs-learning', label: 'Learning' },
        ]} />
      </main>

      <NextProject slug="typeface" title="Butler's Slice" image="/Portfolio.github.io/Assets/images/typeface.webp" />
      <Footer />
    </>
  )
}
