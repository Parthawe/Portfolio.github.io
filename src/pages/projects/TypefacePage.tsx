import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'
import GlyphPlayground from '../../components/GlyphPlayground'
import GlyphEditor from '../../components/GlyphEditor'

const TYPEFACE_ASSET = '/Portfolio.github.io/Assets/Projects/Typeface'

const weights = [
  { label: 'Ultralight', value: 200, file: 'Butler Slice UltraLight' },
  { label: 'Regular', value: 400, file: 'Butler Slice Regular' },
  { label: 'Bold', value: 700, file: 'Butler Slice Bold' },
]

const specimens = ['Slice', 'Editorial', 'Sharp serif', 'Parth Pawar']

const alphabetRows = [
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  'abcdefghijklmnopqrstuvwxyz',
  '0123456789&?!',
]

const featureCards = [
  {
    label: '01',
    title: 'A familiar skeleton',
    body: 'The family keeps Butler’s high-contrast serif rhythm, so the voice stays editorial instead of novelty-first.',
  },
  {
    label: '02',
    title: 'A cut through the form',
    body: 'Diagonal slices are applied as a repeatable gesture, with restraint where readability needs to win.',
  },
  {
    label: '03',
    title: 'A complete specimen',
    body: 'Weights, numbers, punctuation, and web files make the project usable beyond a single poster mockup.',
  },
]

export default function TypefacePage() {
  const [weightIdx, setWeightIdx] = useState(1)
  const [specimenIdx, setSpecimenIdx] = useState(0)
  const activeWeight = weights[weightIdx]
  const activeSpecimen = specimens[specimenIdx]
  const specimenStyle = {
    fontFamily: 'var(--tf-slice)',
    fontWeight: activeWeight.value,
  }

  return (
    <>
      <Helmet>
        <title>Butler&rsquo;s Slice &middot; Typeface &middot; Parth Pawar</title>
        <meta
          name="description"
          content="A specimen-first case study for Butler's Slice, a free display typeface created by cutting into the Butler serif family."
        />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Butler's Slice · Parth Pawar" />
        <meta
          property="og:description"
          content="Interactive type specimen, glyph playground, vector editor, and downloadable font files."
        />
        <meta property="og:image" content="https://parthawe.github.io/Portfolio.github.io/Assets/Projects/Typeface/photos/hero-title.jpg" />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main typeface-page" style={{ '--project-color': '#5B63D3' } as React.CSSProperties}>
        <section className="tf-hero" id="tf-overview">
          <div className="tf-hero-shell">
            <div className="tf-kicker-row">
              <Link to="/work" className="tf-back-link">
                Back to Work
              </Link>
              <span>Typeface / 2022</span>
              <span>Free display family</span>
            </div>

            <h1>Butler&rsquo;s Slice</h1>

            <div className="tf-hero-grid">
              <p className="tf-lede">
                A display serif cut for editorial scale, built as a usable specimen with three weights, web files,
                and interactive glyph tools.
              </p>

              <aside className="tf-font-card" aria-label="Typeface summary">
                <div>
                  <span className="tf-card-label">Family</span>
                  <strong>Butler&rsquo;s Slice</strong>
                </div>
                <div>
                  <span className="tf-card-label">Current weight</span>
                  <strong>{activeWeight.label}</strong>
                </div>
                <div>
                  <span className="tf-card-label">Files</span>
                  <strong>9 web + print files</strong>
                </div>
                <a href={`${TYPEFACE_ASSET}/butlers-slice.zip`} download className="tf-download-link">
                  Download family
                </a>
              </aside>
            </div>

            <div className="tf-live-specimen" aria-label="Live type specimen">
              <div className="tf-specimen-toolbar">
                <div className="tf-toolbar-group">
                  <span>Sample</span>
                  <div className="tf-chip-row">
                    {specimens.map((sample, index) => (
                      <button
                        type="button"
                        key={sample}
                        className={index === specimenIdx ? 'is-active' : ''}
                        onClick={() => setSpecimenIdx(index)}
                        aria-pressed={index === specimenIdx}
                      >
                        {sample}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="tf-toolbar-group">
                  <span>Weight</span>
                  <div className="tf-chip-row">
                    {weights.map((weight, index) => (
                      <button
                        type="button"
                        key={weight.label}
                        className={index === weightIdx ? 'is-active' : ''}
                        onClick={() => setWeightIdx(index)}
                        aria-pressed={index === weightIdx}
                      >
                        {weight.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <motion.p
                key={`${activeSpecimen}-${activeWeight.value}`}
                className="tf-specimen-word"
                style={specimenStyle}
                initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0)' }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                {activeSpecimen}
              </motion.p>

              <div className="tf-specimen-footer">
                <span>{activeWeight.file}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="tf-section" id="tf-origin">
          <div className="tf-section-head">
            <p className="tf-section-kicker">Origin</p>
            <h2>Named after a knife, not a font menu.</h2>
          </div>
          <div className="tf-split-section" style={{ paddingTop: 0 }}>
            <div className="tf-split-copy">
              <p>
                Butler&rsquo;s Slice started with objects that had been cut with intent &mdash; the clean bevel of a
                kitchen blade, the rhythmic grooves of a hand-carved plate. The question was whether that
                physical gesture could survive translation into letterforms: a cut that reads as deliberate
                craft, not damage. Butler, a high-contrast serif, gave the slice something worth cutting into.
              </p>
            </div>
            <figure style={{ margin: 0 }}>
              <img
                src={`${TYPEFACE_ASSET}/photos/inspiration-cut.jpg`}
                alt="Original inspiration board: a chef's knife on a cutting board and a hand-carved wooden plate with fine parallel cuts"
                loading="lazy"
                decoding="async"
                style={{ width: '100%', borderRadius: 'var(--radius-md, 12px)' }}
              />
              <figcaption style={{ marginTop: '0.6rem', fontSize: '0.8rem', opacity: 0.55 }}>
                The original inspiration board &mdash; elements that have been fine cut.
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="tf-image-stage" aria-label="Typeface cover specimen">
          <img src={`${TYPEFACE_ASSET}/photos/hero-title.jpg`} alt="Butler's Slice cover specimen" loading="lazy" />
        </section>

        <section className="tf-section tf-feature-section" id="tf-concept">
          <div className="tf-section-head">
            <p className="tf-section-kicker">Concept</p>
            <h2>The slice is a rule, not decoration.</h2>
          </div>
          <div className="tf-feature-grid">
            {featureCards.map(card => (
              <article className="tf-feature-card" key={card.title}>
                <span>{card.label}</span>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="tf-split-section">
          <div className="tf-split-copy">
            <p className="tf-section-kicker">Weights</p>
            <h2>Three voices, one cut language.</h2>
            <p>
              Ultralight carries the most air, Regular works for expressive short phrases, and Bold gives the slice
              enough mass to survive posters, packaging, and tight crops.
            </p>
          </div>
          <div className="tf-weight-stack">
            {weights.map(weight => (
              <article key={weight.label} className="tf-weight-row">
                <span>{weight.label}</span>
                <strong style={{ fontFamily: 'var(--tf-slice)', fontWeight: weight.value }}>
                  Ag
                </strong>
                <em>{weight.value}</em>
              </article>
            ))}
          </div>
        </section>

        <section className="tf-image-grid" aria-label="Typeface specimen images">
          <figure>
            <img src={`${TYPEFACE_ASSET}/photos/slice-types.jpg`} alt="Slice construction examples across glyphs" loading="lazy" />
            <figcaption>Slice construction</figcaption>
          </figure>
          <figure>
            <img src={`${TYPEFACE_ASSET}/photos/weights-grid.jpg`} alt="Butler's Slice weights grid" loading="lazy" />
            <figcaption>Weight comparison</figcaption>
          </figure>
          <figure>
            <img src={`${TYPEFACE_ASSET}/photos/glyph-detail.jpg`} alt="Close-up detail of a sliced glyph" loading="lazy" />
            <figcaption>Glyph detail</figcaption>
          </figure>
          <figure>
            <img src={`${TYPEFACE_ASSET}/photos/specimen-usage.jpg`} alt="Butler's Slice applied to packaging mockups" loading="lazy" />
            <figcaption>Application</figcaption>
          </figure>
        </section>

        <section className="tf-section tf-glyph-section" id="tf-glyphs">
          <div className="tf-section-head">
            <p className="tf-section-kicker">Glyph set</p>
            <h2>Scan the family before testing it.</h2>
          </div>
          <div className="tf-glyph-board">
            {alphabetRows.map(row => (
              <div className="tf-glyph-row" key={row}>
                {row.split('').map(char => (
                  <span key={char} style={specimenStyle}>
                    {char}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </section>

        <section className="tf-tool-section" id="tf-playground">
          <div className="tf-tool-intro">
            <p className="tf-section-kicker">Playground</p>
            <h2>Type into the specimen.</h2>
            <p>Switch weight, size, and source font. Click a glyph to inspect the character at display scale.</p>
          </div>
          <GlyphPlayground />
        </section>

        <section className="tf-tool-section" id="tf-editor">
          <div className="tf-tool-intro">
            <p className="tf-section-kicker">Vector editor</p>
            <h2>Pull the points.</h2>
            <p>The editor loads the font outline and lets you drag the real bezier points in the browser.</p>
          </div>
          <GlyphEditor />
        </section>

        <section className="tf-section" id="tf-usage">
          <div className="tf-section-head">
            <p className="tf-section-kicker">Usage</p>
            <h2>Where the slice earns its keep.</h2>
          </div>
          <div className="tf-metric-grid">
            <article className="tf-metric">
              <span>Short texts</span>
              <strong style={{ fontFamily: 'var(--tf-slice)', fontWeight: 700 }}>140pt</strong>
              <p>Headlines, posters, covers &mdash; the cuts read as intent at display scale.</p>
            </article>
            <article className="tf-metric">
              <span>Long texts</span>
              <strong style={{ fontFamily: 'var(--tf-slice)', fontWeight: 400 }}>45pt</strong>
              <p>Pull quotes and ledes hold up; below that, hand the page to a workhorse text face.</p>
            </article>
            <article className="tf-metric">
              <span>Pairing</span>
              <strong>Sans</strong>
              <p>A quiet grotesque for body copy lets the slice stay the loudest voice on the page.</p>
            </article>
          </div>
        </section>

        <section className="tf-download-section" id="tf-download">
          <p className="tf-section-kicker">Download</p>
          <h2 style={specimenStyle}>Use Butler&rsquo;s Slice</h2>
          <p>
            Includes OTF, WOFF, and WOFF2 files for Ultralight, Regular, and Bold. Best for expressive titles,
            covers, posters, and short editorial moments.
          </p>
          <a href={`${TYPEFACE_ASSET}/butlers-slice.zip`} download className="tf-primary-download">
            Download font family
          </a>
        </section>

        <BottomNav
          sections={[
            { id: 'tf-overview', label: 'Overview' },
            { id: 'tf-origin', label: 'Origin' },
            { id: 'tf-concept', label: 'Concept' },
            { id: 'tf-glyphs', label: 'Glyphs' },
            { id: 'tf-playground', label: 'Play' },
            { id: 'tf-editor', label: 'Edit' },
            { id: 'tf-download', label: 'Download' },
          ]}
        />
      </main>

      <NextProject slug="mentra-brand" title="Mentra Brand & Packaging" image="/Portfolio.github.io/Assets/Projects/mentra-brand/photos/render-both-frames.webp" />
      <Footer />
    </>
  )
}
