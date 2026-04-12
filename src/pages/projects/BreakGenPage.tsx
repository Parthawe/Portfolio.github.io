import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import CsThanks from '../../components/case-study/CsThanks'
import Footer from '../../components/Footer'
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

        {/* Hero */}
        <header className="wrap" style={{ paddingTop: 'clamp(7rem, 14vw, 10rem)', paddingBottom: '2rem' }}>
          <div className="hero-anim hero-anim-1">
            <p style={{ fontFamily: 'var(--mono)', fontSize: 'var(--text-xs)', letterSpacing: 'var(--ls-wide)', textTransform: 'uppercase', color: 'var(--ink-40)', marginBottom: '1rem' }}>
              ITP Thesis &middot; NYU Tisch &middot; Spring 2025
            </p>
          </div>
          <h1 className="hero-anim hero-anim-2" style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 300, letterSpacing: 'var(--ls-tight)', lineHeight: 1.1, marginBottom: '1.5rem' }}>
            BreakGen
          </h1>
          <p className="hero-anim hero-anim-3" style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1rem, 1.8vw, 1.25rem)', fontWeight: 400, fontStyle: 'italic', color: 'var(--ink-50)', maxWidth: '55ch', lineHeight: 1.5 }}>
            An AI-powered platform that turns text prompts into fabrication-ready custom mechanical keyboards. Select key feel, generate AI keycaps, build ergonomic layouts, and receive auto-generated PCBs.
          </p>

          <div className="hero-anim hero-anim-3" style={{ display: 'flex', gap: '2rem', marginTop: '2rem', fontFamily: 'var(--sans)', fontSize: 'var(--text-sm)', color: 'var(--ink-40)' }}>
            <div><strong style={{ color: 'var(--ink)', fontWeight: 600 }}>Role</strong><br />Designer &amp; Developer</div>
            <div><strong style={{ color: 'var(--ink)', fontWeight: 600 }}>Context</strong><br />ITP Thesis, NYU Tisch</div>
            <div><strong style={{ color: 'var(--ink)', fontWeight: 600 }}>Timeline</strong><br />2024-2025</div>
            <div><strong style={{ color: 'var(--ink)', fontWeight: 600 }}>Stack</strong><br />React, Three.js, Meshy AI, KiCad</div>
          </div>
        </header>

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

        {/* The Problem */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-section-label">The Problem</div>
            <h2 className="cs-section-title">Custom keyboards need an engineering degree</h2>
            <div className="cs-body">
              <p>Custom mechanical keyboards are one of the most vibrant hardware subcultures online. But the technical barriers to creating one from scratch are enormous. PCB design requires EDA software expertise. Ergonomic layout planning demands spatial reasoning and engineering knowledge. Firmware configuration assumes programming fluency.</p>
              <p>Most enthusiasts end up buying pre-made boards or waiting months for group buys they can't influence. They never get the keyboard that truly fits their hands, workflow, and aesthetic.</p>
            </div>
          </div>
        </section>

        {/* The Approach */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-section-label">The Approach</div>
            <h2 className="cs-section-title">Break the process into steps anyone can follow</h2>
            <div className="cs-body">
              <p>BreakGen breaks down keyboard creation into an intuitive multi-step flow: choose your switch feel, describe your aesthetic in natural language (AI generates personalized keycap designs via Meshy AI), arrange your layout in a visual 3D editor (React + Three.js), and receive an auto-generated PCB (KiCad) ready for fabrication.</p>
              <p>The name comes from the childhood practice of breaking things apart to understand how they work. That impulse, to crack open a black box and see the mechanism inside, is the same one that drives the mechanical keyboard community.</p>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-section-label">Key Features</div>
            <h2 className="cs-section-title">AI keycaps, 3D layout, auto PCB</h2>
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
          </div>
        </section>

        {/* Outcome */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-section-label">Outcome</div>
            <h2 className="cs-section-title">200+ visitors at ITP Thesis Show</h2>
            <div className="cs-body">
              <p>BreakGen was presented at the ITP Thesis Show at NYU Tisch, Spring 2025. Over 200 visitors interacted with the platform, and multiple working keyboard prototypes were fabricated and demonstrated live.</p>
              <p>The project was advised by Luisa Pereira at NYU's Interactive Telecommunications Program.</p>
            </div>
          </div>
        </section>

        {/* Read the full case study */}
        <section className="cs-section reveal">
          <div className="wrap" style={{ textAlign: 'center', padding: '3rem 0' }}>
            <a href="/keyboard-project" style={{ fontFamily: 'var(--sans)', fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--ink)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
              Read the full case study &rarr;
            </a>
          </div>
        </section>

        <CsThanks />

        <NextProject slug="jugalbandi" title="Jugalbandi" image="/Assets/images/jugalbandi.png" />

      </main>

      <Footer />
    </>
  )
}
