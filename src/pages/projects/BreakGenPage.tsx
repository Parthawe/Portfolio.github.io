import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import CsThanks from '../../components/case-study/CsThanks'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import ProjectOverview from '../../components/case-study/ProjectOverview'
import CsMediaSpotlight from '../../components/case-study/CsMediaSpotlight'
import CsSection from '../../components/case-study/CsSection'
import CsBody from '../../components/case-study/CsBody'
import CsFeatureGrid from '../../components/case-study/CsFeatureGrid'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'

export default function BreakGenPage() {
  return (
    <>
      <Helmet>
        <title>BreakGen: ITP Thesis &middot; Parth Pawar</title>
        <meta name="description" content="BreakGen, an NYU ITP thesis tool that turns text prompts, 3D layout editing, and PCB export into a guided custom keyboard workflow." />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#6E4AC2' } as React.CSSProperties}>

        <ProjectHeader
          backLink="/work"
          categorySlug="creative-tech"
          backLabel="Back to Work"
          tags={['ITP Thesis', 'AI Hardware', 'Creative Tech']}
          title="BreakGen"
          subtitle="A guided custom keyboard workflow that turns text prompts, 3D layout editing, and PCB export into fabrication-ready hardware."
          info={[
            { label: 'Role', value: 'Designer and Developer' },
            { label: 'Context', value: 'ITP Thesis, NYU Tisch' },
            { label: 'Timeline', value: '2024 to 2025' },
            { label: 'Stack', value: 'React, Three.js, Meshy AI, KiCad' },
          ]}
          liveUrl="https://parthawe.github.io/BreakGen/"
          heroImage="/Assets/Projects/Keyboard/photos/breakgen-launch-live.png"
          heroAlt="BreakGen public launch page showing the product narrative and AI keyboard fabrication platform."
        />

        <CsMediaSpotlight
          id="cs-thesis-film"
          label="Watch first"
          title="Prompt to keyboard"
          lede="A short thesis film shows the complete promise: describe a keyboard, shape it in 3D, and move toward fabrication instead of another moodboard."
          meta={['Vimeo thesis film', 'ITP Thesis', 'AI hardware']}
        >
          <iframe
            src="https://player.vimeo.com/video/1091963037?title=0&byline=0&portrait=0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            loading="lazy"
            title="BreakGen ITP Thesis Presentation"
          />
        </CsMediaSpotlight>

        <ProjectOverview
          id="cs-overview"
          sections={[
            {
              label: 'The Problem',
              content: 'Custom mechanical keyboards are a deep craft community, but the toolchain is still built for experts. PCB design, ergonomic layout planning, firmware, and fabrication all sit behind separate specialist tools, so most people never get from intent to artifact.',
            },
            {
              label: 'The Bet',
              content: 'BreakGen collapses that fragmented pipeline into a guided creative flow: describe what you want, shape the keyboard in 3D, and let the system handle the invisible engineering underneath.',
            },
          ]}
        />

        <CsSection id="cs-problem" label="01 · Problem" title="Custom keyboards still need an engineering degree">
          <CsBody>
              <p>Custom mechanical keyboards are one of the most vibrant hardware subcultures online. But the technical barriers to creating one from scratch are enormous. PCB design requires EDA software expertise. Ergonomic layout planning demands spatial reasoning and engineering knowledge. Firmware configuration assumes programming fluency.</p>
              <p>Most enthusiasts end up buying pre-made boards or waiting months for group buys they can't influence. They never get the keyboard that truly fits their hands, workflow, and aesthetic.</p>
          </CsBody>
        </CsSection>

        <CsSection id="cs-approach" label="02 · Approach" title="Break the process into steps anyone can follow">
          <CsBody>
              <p>BreakGen breaks down keyboard creation into a guided multi-step flow: choose your switch feel, describe your aesthetic in natural language, generate personalized keycap designs via Meshy AI, arrange your layout in a visual 3D editor built with React and Three.js, and receive an auto-generated KiCad PCB ready for fabrication.</p>
              <p>The name comes from the childhood practice of breaking things apart to understand how they work. That impulse, to crack open a black box and see the mechanism inside, is the same one that drives the mechanical keyboard community.</p>
          </CsBody>
        </CsSection>

        <CsSection id="cs-live" label="03 · Live Product" title="A launch page and demo make the thesis inspectable.">
          <CsBody>
            <p>BreakGen now has two public surfaces: a launch page that frames the thesis as a product, and an interactive demo where the workspace, preview chamber, control surface, and export logic can be inspected directly.</p>
          </CsBody>

          <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '2rem' }}>
            <div className="cs-img reveal">
              <img
                src="/Assets/Projects/Keyboard/photos/breakgen-launch-live.png"
                alt="BreakGen public launch page."
                loading="lazy"
              />
            </div>
            <div className="cs-img reveal">
              <img
                src="/Assets/Projects/Keyboard/photos/breakgen-demo-live.png"
                alt="BreakGen interactive demo workspace."
                loading="lazy"
              />
            </div>
          </div>
        </CsSection>

        <CsSection id="cs-features" label="04 · System" title="AI keycaps, 3D layout, auto PCB">
          <CsFeatureGrid features={[
            { title: 'AI Keycap Generation', desc: 'Describe your aesthetic in words. Meshy AI generates unique 3D keycap designs that match your vision.' },
            { title: '3D Layout Editor', desc: 'Drag-and-drop key placement in a Three.js visual editor. See your keyboard take shape in real time.' },
            { title: 'Auto PCB Generation', desc: 'Your visual layout translates directly into a KiCad schematic. No electrical engineering knowledge needed.' },
            { title: 'Physical Prototyping', desc: '3D-printed cases, laser-cut plates, and CNC-machined parts move the design from screen to workbench.' },
          ]} />
        </CsSection>

        <CsSection id="cs-outcome" label="05 · Outcome" title="200+ visitors at the ITP Thesis Show">
            <CsBody>
              <p>BreakGen was presented at the ITP Thesis Show at NYU Tisch, Spring 2025. Over 200 visitors interacted with the platform, and multiple working keyboard prototypes were fabricated and demonstrated live.</p>
            </CsBody>
            <div className="cs-label-row" style={{ marginTop: '2rem' }}>
              <span className="cs-label-row-key">Advisor</span>
              <span className="cs-label-row-val">Luisa Pereira &mdash; NYU Interactive Telecommunications Program</span>
            </div>
        </CsSection>

        {/* Read the full case study */}
        <section className="cs-section reveal" id="cs-full-case">
          <div className="wrap" style={{ textAlign: 'center', padding: '3rem 0' }}>
            <a href="/keyboard-project" style={{ fontFamily: 'var(--sans)', fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--ink)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
              See the earlier physical keyboard study &rarr;
            </a>
          </div>
        </section>

        <CsThanks />

        <BottomNav
          sections={[
            { id: 'cs-thesis-film', label: 'Film' },
            { id: 'cs-overview', label: 'Overview' },
            { id: 'cs-problem', label: 'Problem' },
            { id: 'cs-approach', label: 'Approach' },
            { id: 'cs-live', label: 'Live Product' },
            { id: 'cs-features', label: 'System' },
            { id: 'cs-outcome', label: 'Outcome' },
          ]}
        />

        <NextProject slug="keyboard-project" title="Keyboard Project" image="/Assets/Projects/Keyboard/photos/keyboard-data-hero.webp" />

      </main>

      <Footer />
    </>
  )
}
