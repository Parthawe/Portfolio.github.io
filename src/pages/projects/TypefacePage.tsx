import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import Nav from '../../components/Nav'
import CsThanks from '../../components/case-study/CsThanks'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import CsBody from '../../components/case-study/CsBody'
import CsImage from '../../components/case-study/CsImage'
import CsCredits from '../../components/case-study/CsCredits'
import NextProject from '../../components/case-study/NextProject'
import GlyphPlayground from '../../components/GlyphPlayground'
import GlyphEditor from '../../components/GlyphEditor'

export default function TypefacePage() {
  /* Animate between "Butler" and "Butler's Slice" in the hero */
  const [showSlice, setShowSlice] = useState(false)
  useEffect(() => {
    const id = setInterval(() => setShowSlice(s => !s), 3000)
    return () => clearInterval(id)
  }, [])

  return (
    <>
      <Helmet>
        <title>Butler&rsquo;s Slice &middot; Parth Pawar</title>
        <meta name="description" content="Butler's Slice is a free variable display typeface created as a customised Butler font by slicing alphabets. Designed for editorial applications with three weights: Ultralight, Regular, and Bold." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Butler's Slice · Parth Pawar" />
        <meta property="og:description" content="Free variable display typeface, customised Butler font with three weights for editorial applications." />
        <meta property="og:image" content="https://parthpawar.com/Assets/images/typeface.jpg" />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#744210' } as React.CSSProperties}>

        <ProjectHeader
          backLink="/work"
          categorySlug="brand-visual"
          backLabel="Back to Work"
          tags={['Typography', 'Type Design', 'Art']}
          title="Butler\u2019s Slice"
          subtitle="A free display typeface created by slicing alphabets"
          info={[
            { label: 'Year', value: '2022' },
            { label: 'Role', value: 'Designer of Typeface' },
            { label: 'Duration', value: '1 Month' },
            { label: 'Tools', value: 'Glyphs App, FontForge, Adobe Illustrator' },
          ]}
        />

        {/* ── Hero: animated morph between Butler → Butler's Slice ── */}
        <section className="cs-section reveal">
          <div className="wrap" style={{ textAlign: 'center', padding: '4rem 0' }}>
            <div style={{ position: 'relative', minHeight: 'clamp(80px, 15vw, 160px)' }}>
              <AnimatePresence mode="wait">
                <motion.p
                  key={showSlice ? 'slice' : 'butler'}
                  style={{
                    fontFamily: showSlice ? '"Butlers Slice", Georgia, serif' : 'Georgia, "Times New Roman", serif',
                    fontSize: 'clamp(3rem, 10vw, 9rem)',
                    fontWeight: 400,
                    lineHeight: 1,
                    letterSpacing: '-0.03em',
                    color: 'var(--ink)',
                    margin: 0,
                  }}
                  initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -20, filter: 'blur(4px)' }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  {showSlice ? "Butler's Slice" : 'Butler'}
                </motion.p>
              </AnimatePresence>
            </div>
            <motion.span
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 'var(--text-2xs)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase' as const,
                color: 'var(--ink-30)',
                display: 'block',
                marginTop: '1rem',
              }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {showSlice ? 'sliced · display typeface' : 'original · serif typeface'}
            </motion.span>
          </div>
        </section>

        {/* Hero image */}
        <CsImage src="/Assets/Projects/Typeface/photos/hero-title.jpg" alt="Butler's Slice typeface cover" />

        {/* The Concept */}
        <section className="cs-section reveal">
          <div className="wrap">
            <h2 className="cs-display">the concept</h2>
            <CsBody style={{ maxWidth: '680px' }}>
              <p>Butler&rsquo;s Slice is a free display font created as a customised Butler font by slicing alphabets. Inspired by elements which have been fine cut &mdash; precision blades, diamond facets, architectural edges.</p>
            </CsBody>
          </div>
        </section>

        {/* Types of Slices */}
        <CsImage src="/Assets/Projects/Typeface/photos/slice-types.jpg" alt="Character specimens, Ag in three weights, types of slices" />

        {/* ── Interactive Playground ── */}
        <section className="cs-section reveal">
          <div className="wrap">
            <h2 className="cs-display">try it yourself</h2>
            <CsBody style={{ maxWidth: '680px', marginBottom: '2rem' }}>
              <p>Type anything to see it rendered in Butler&rsquo;s Slice. Switch weights, resize, click individual glyphs to inspect them. Toggle between the original Butler and the sliced version to see the difference.</p>
            </CsBody>
          </div>
        </section>

        <GlyphPlayground />

        {/* ── Vector Editor ── */}
        <section className="cs-section reveal">
          <div className="wrap">
            <h2 className="cs-display">pull the points</h2>
            <CsBody style={{ maxWidth: '680px', marginBottom: '2rem' }}>
              <p>Explore the actual vector outlines of Butler&rsquo;s Slice. Each letter is built from bezier curves &mdash; drag the anchor points and control handles to reshape any glyph in real time.</p>
            </CsBody>
          </div>
        </section>

        <GlyphEditor />

        {/* The Weights */}
        <CsImage src="/Assets/Projects/Typeface/photos/weights-grid.jpg" alt="The weights: Bold, Regular, Ultralight" />

        {/* The Usage */}
        <CsImage src="/Assets/Projects/Typeface/photos/specimen-usage.jpg" alt="Packaging mockups showing Butler's Slice" />

        {/* How it works in context */}
        <section className="cs-section reveal">
          <div className="wrap">
            <h2 className="cs-display">in context</h2>
          </div>
        </section>

        <section className="cs-section reveal" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="cs-label-row">
              <span className="cs-label-row-key">in headlines</span>
              <span className="cs-label-row-val">Display typeface, works great at big sizes</span>
            </div>
            <p style={{ fontFamily: '"Butlers Slice", Georgia, serif', fontSize: 'clamp(4rem,12vw,12rem)', lineHeight: 1, letterSpacing: '-0.02em', color: 'var(--ink)', margin: '1rem 0 0' }}>A<span style={{ color: 'var(--project-color)' }}>b</span>cdefgh</p>
          </div>
        </section>

        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-label-row">
              <span className="cs-label-row-key">in short texts</span>
              <span className="cs-label-row-val">Suitable for short sentences and phrases</span>
            </div>
            <p style={{ fontFamily: '"Butlers Slice", Georgia, serif', fontSize: 'clamp(2.5rem,6vw,5rem)', lineHeight: 1.15, letterSpacing: '-0.03em', color: 'var(--ink)', margin: '1rem 0 0' }}>Typography is the craft of endowing human language with a durable visual form.</p>
          </div>
        </section>

        {/* The Numbers */}
        <section className="cs-section reveal">
          <div className="wrap">
            <h2 className="cs-display">the numbers</h2>
            <p style={{ fontFamily: '"Butlers Slice", Georgia, serif', fontSize: 'clamp(4rem,12vw,10rem)', lineHeight: 1.2, letterSpacing: '0.02em', color: 'var(--ink)', margin: '2rem 0 0' }}>
              0&ensp;<span style={{ color: 'var(--project-color)' }}>1</span>&ensp;2&ensp;3&ensp;4
            </p>
            <p style={{ fontFamily: '"Butlers Slice", Georgia, serif', fontSize: 'clamp(4rem,12vw,10rem)', lineHeight: 1.2, letterSpacing: '0.02em', color: 'var(--ink)', margin: 0 }}>
              5&ensp;6&ensp;<span style={{ color: 'var(--project-color)' }}>7</span>&ensp;8&ensp;9
            </p>
          </div>
        </section>

        {/* Reflections */}
        <section className="cs-section reveal">
          <div className="wrap">
            <p className="cs-section-label">Reflections</p>
            <h2 className="cs-section-title">What Designing a Typeface Taught Me</h2>
            <CsBody style={{ maxWidth: '720px' }}>
              <p>Designing Butler&rsquo;s Slice was an exercise in constraint. Every glyph needed to maintain legibility while incorporating the diagonal slice motif &mdash; and the two goals constantly fought each other. Some letters (A, K, X) accepted slices naturally because their geometry already contained angles. Others (O, S, C) required creative reinterpretation.</p>
              <p>The biggest lesson was that type design is systems thinking at the smallest scale. A single glyph means nothing in isolation &mdash; it only works when every character in the set shares the same visual logic. This is the same challenge I encounter in product design: every component must cohere with the whole system.</p>
            </CsBody>
          </div>
        </section>

        {/* Download CTA */}
        <section className="cs-section reveal">
          <div className="wrap" style={{ textAlign: 'center', padding: '3rem 0' }}>
            <a
              href="/Assets/Projects/Typeface/butlers-slice.zip"
              download
              className="cta-v2-btn"
              style={{ fontFamily: '"Butlers Slice", Georgia, serif' }}
            >
              Download Butler&rsquo;s Slice &darr;
            </a>
          </div>
        </section>

        {/* Credits */}
        <section className="cs-section cs-thanks reveal">
          <div className="wrap">
            <h2 className="cs-thanks-title">Thank You</h2>
            <CsCredits credits={[
              { role: 'Designer of Typeface', name: 'Parth Pawar' },
              { role: 'Project Type', name: 'Self Initiative' },
              { role: 'Tools', name: 'Glyphs App, FontForge, Adobe Illustrator' },
            ]} />
          </div>
        </section>

      <CsThanks />

      </main>

        <NextProject slug="atps" title="ArtTown Podcast" image="/Assets/images/atps.png" />
      <Footer />
    </>
  )
}
