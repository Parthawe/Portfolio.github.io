import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import CsThanks from '../../components/case-study/CsThanks'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import ProjectOverview from '../../components/case-study/ProjectOverview'
import CsSection from '../../components/case-study/CsSection'
import CsBody from '../../components/case-study/CsBody'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'

export default function BreakGenPage() {
  return (
    <>
      <Helmet>
        <title>BreakGen: ITP Thesis &middot; Parth Pawar</title>
        <meta name="description" content="BreakGen. ITP Thesis at NYU Tisch, Spring 2025. An AI-powered platform that turns text prompts into fabrication-ready custom mechanical keyboards." />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#5C6B3A' } as React.CSSProperties}>

        <ProjectHeader
          backLink="/work"
          categorySlug="creative-tech"
          backLabel="Back to Work"
          tags={['ITP Thesis', 'AI Hardware', 'Creative Tech']}
          title="BreakGen"
          subtitle="An AI-powered platform that turns text prompts into fabrication-ready custom mechanical keyboards, from layout to PCB."
          info={[
            { label: 'Role', value: 'Designer and Developer' },
            { label: 'Context', value: 'ITP Thesis, NYU Tisch' },
            { label: 'Timeline', value: '2024 to 2025' },
            { label: 'Stack', value: 'React, Three.js, Meshy AI, KiCad' },
          ]}
        />

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
            {
              label: 'The Outcome',
              content: 'The thesis was shown live at NYU ITP, where visitors could design keyboards in minutes and see physical prototypes that proved the pipeline was not a concept demo, but a buildable system.',
            },
          ]}
        />

        {/* Thesis Video, full width */}
        <section className="wrap reveal" style={{ paddingBottom: '3rem' }}>
          <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: 'var(--radius-lg)', background: 'var(--ink-04)' }}>
            <iframe
              src="https://player.vimeo.com/video/1091963037?title=0&byline=0&portrait=0"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              loading="lazy"
              title="BreakGen ITP Thesis Presentation"
            />
          </div>
        </section>

        <CsSection id="cs-problem" label="01 · Problem" title="Custom keyboards still need an engineering degree">
          <CsBody>
              <p>Custom mechanical keyboards are one of the most vibrant hardware subcultures online. But the technical barriers to creating one from scratch are enormous. PCB design requires EDA software expertise. Ergonomic layout planning demands spatial reasoning and engineering knowledge. Firmware configuration assumes programming fluency.</p>
              <p>Most enthusiasts end up buying pre-made boards or waiting months for group buys they can't influence. They never get the keyboard that truly fits their hands, workflow, and aesthetic.</p>
          </CsBody>
        </CsSection>

        <CsSection id="cs-approach" label="02 · Approach" title="Break the process into steps anyone can follow">
          <CsBody>
              <p>BreakGen breaks down keyboard creation into an intuitive multi-step flow: choose your switch feel, describe your aesthetic in natural language (AI generates personalized keycap designs via Meshy AI), arrange your layout in a visual 3D editor (React + Three.js), and receive an auto-generated PCB (KiCad) ready for fabrication.</p>
              <p>The name comes from the childhood practice of breaking things apart to understand how they work. That impulse, to crack open a black box and see the mechanism inside, is the same one that drives the mechanical keyboard community.</p>
          </CsBody>
        </CsSection>

        <CsSection id="cs-features" label="03 · System" title="AI keycaps, 3D layout, auto PCB">
            <div className="cs-feature-grid">
              <div className="cs-feature-card">
                <h3 className="cs-feature-title">AI Keycap Generation</h3>
                <p className="cs-feature-desc">Describe your aesthetic in words. Meshy AI generates unique 3D keycap designs that match your vision.</p>
              </div>
              <div className="cs-feature-card">
                <h3 className="cs-feature-title">3D Layout Editor</h3>
                <p className="cs-feature-desc">Drag-and-drop key placement in a Three.js visual editor. See your keyboard take shape in real-time.</p>
              </div>
              <div className="cs-feature-card">
                <h3 className="cs-feature-title">Auto PCB Generation</h3>
                <p className="cs-feature-desc">Your visual layout translates directly into a KiCad schematic. No electrical engineering knowledge needed.</p>
              </div>
              <div className="cs-feature-card">
                <h3 className="cs-feature-title">Physical Prototyping</h3>
                <p className="cs-feature-desc">3D printed cases, laser-cut plates, CNC-machined parts. From screen to workbench.</p>
              </div>
            </div>
        </CsSection>

        <CsSection id="cs-outcome" label="04 · Outcome" title="200+ visitors at the ITP Thesis Show">
            <CsBody>
              <p>BreakGen was presented at the ITP Thesis Show at NYU Tisch, Spring 2025. Over 200 visitors interacted with the platform, and multiple working keyboard prototypes were fabricated and demonstrated live.</p>
              <p>The project was advised by Luisa Pereira at NYU's Interactive Telecommunications Program.</p>
            </CsBody>
        </CsSection>

        {/* Read the full case study */}
        <section className="cs-section reveal" id="cs-full-case">
          <div className="wrap" style={{ textAlign: 'center', padding: '3rem 0' }}>
            <a href="/keyboard-project" style={{ fontFamily: 'var(--sans)', fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--ink)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
              Read the full case study &rarr;
            </a>
          </div>
        </section>

        <CsThanks />

        <BottomNav
          sections={[
            { id: 'cs-overview', label: 'Overview' },
            { id: 'cs-problem', label: 'Problem' },
            { id: 'cs-approach', label: 'Approach' },
            { id: 'cs-features', label: 'System' },
            { id: 'cs-outcome', label: 'Outcome' },
          ]}
        />

        <NextProject slug="jugalbandi" title="Jugalbandi" image="/Portfolio.github.io/Assets/images/jugalbandi.webp" />

      </main>

      <Footer />
    </>
  )
}
