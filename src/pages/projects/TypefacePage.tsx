import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import CsBody from '../../components/case-study/CsBody'
import CsImage from '../../components/case-study/CsImage'
import CsCredits from '../../components/case-study/CsCredits'
import NextProject from '../../components/case-study/NextProject'

export default function TypefacePage() {
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

        {/* Hero */}
        <CsImage src="/Assets/Projects/Typeface/Desktop/1.jpg" alt="Butler's Slice typeface cover with project details on purple gradient" />

        {/* The Concept */}
        <section className="cs-section reveal">
          <div className="wrap">
            <h2 className="cs-display">the concept</h2>
            <CsBody style={{ maxWidth: '680px' }}>
              <p>Butler&rsquo;s Slice &mdash; is a free display font created as a customised Butler font by Slicing alphabets.</p>
            </CsBody>
          </div>
        </section>

        {/* The Inspiration */}
        <section className="cs-section reveal">
          <div className="wrap">
            <h2 className="cs-display">the inspiration</h2>
            <CsBody>
              <p>Butler&rsquo;s Slice was inspired by elements which have been fine cut.</p>
            </CsBody>
          </div>
        </section>

        {/* The Character Set */}
        <section className="cs-section reveal">
          <div className="wrap">
            <h2 className="cs-display">the character set</h2>
            <div className="cs-two-col">
              <CsBody>
                <p>Butler&rsquo;s Slice consists of 26 letters of Uppercase and 26 letters of a Lowercase, 10 numbers. with 3 weights Ultralight, Regular and Bold.</p>
              </CsBody>
              <div>
                <p className="cs-display" style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', margin: 0 }}>Butler&rsquo;s Slice</p>
              </div>
            </div>
          </div>
        </section>

        {/* Types of Slices */}
        <CsImage src="/Assets/Projects/Typeface/Desktop/3.jpg" alt="Character specimens, Ag in three weights, types of slices: Angle, Vertical, and Linear" />

        {/* The Glyphs */}
        <section className="cs-section reveal">
          <div className="wrap">
            <h2 className="cs-display">the glyphs looks</h2>
            <div style={{ marginTop: '2rem' }}>
              <p style={{ fontSize: 'clamp(1.8rem,5vw,4rem)', lineHeight: 1.3, letterSpacing: '0.02em', fontFamily: 'var(--display)', color: 'var(--ink-40)', margin: '0 0 1.5rem' }}>
                Aa&ensp;<span style={{ color: 'var(--project-color)' }}>Bb</span>&ensp;Cc&ensp;Dd&ensp;Ee&ensp;Ff&ensp;Gg&ensp;Hh
              </p>
              <hr style={{ border: 'none', borderTop: '1px solid var(--ink-08)', margin: '0 0 1.5rem' }} />
              <p style={{ fontSize: 'clamp(1.8rem,5vw,4rem)', lineHeight: 1.3, letterSpacing: '0.02em', fontFamily: 'var(--display)', color: 'var(--ink-40)', margin: '0 0 1.5rem' }}>
                Ii&ensp;Jj&ensp;Kk&ensp;Ll&ensp;Mm&ensp;Nn&ensp;Oo&ensp;Pp
              </p>
              <hr style={{ border: 'none', borderTop: '1px solid var(--ink-08)', margin: '0 0 1.5rem' }} />
              <p style={{ fontSize: 'clamp(1.8rem,5vw,4rem)', lineHeight: 1.3, letterSpacing: '0.02em', fontFamily: 'var(--display)', color: 'var(--ink-40)', margin: '0 0 1.5rem' }}>
                Qq&ensp;Rr&ensp;Ss&ensp;Tt&ensp;Uu&ensp;Vv&ensp;Ww&ensp;Xx
              </p>
              <hr style={{ border: 'none', borderTop: '1px solid var(--ink-08)', margin: '0 0 1.5rem' }} />
              <p style={{ fontSize: 'clamp(1.8rem,5vw,4rem)', lineHeight: 1.3, letterSpacing: '0.02em', fontFamily: 'var(--display)', color: 'var(--ink-40)', margin: 0 }}>
                Yy&ensp;Zz
              </p>
            </div>
          </div>
        </section>

        {/* The Weights */}
        <CsImage src="/Assets/Projects/Typeface/Desktop/5.jpg" alt="The weights, Bold, Regular, Ultralight with character grid on purple background" />

        {/* The Usage */}
        <CsImage src="/Assets/Projects/Typeface/Desktop/6.jpg" alt="Packaging mockups showing Butler's Slice on various products" />

        {/* How Butler's Slice Works */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-two-col">
              <div>
                <h2 className="cs-display">how<br />Butler&rsquo;s Slice works</h2>
              </div>
              <CsBody style={{ marginTop: 'auto' }}>
                <p>Have a look on how Butler works in different sizes and purposes</p>
              </CsBody>
            </div>
          </div>
        </section>

        <section className="cs-section reveal" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <p style={{ fontFamily: 'var(--display)', fontSize: 'clamp(4rem,12vw,12rem)', lineHeight: 1, letterSpacing: '-0.02em', color: 'var(--ink)', margin: 0 }}>A<span style={{ color: 'var(--project-color)' }}>b</span>cdefgh</p>
          </div>
        </section>

        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-label-row">
              <span className="cs-label-row-key">in headlines</span>
              <span className="cs-label-row-val">The typeface is display, so it works great in big and extremely big sizes</span>
            </div>
            <div style={{ textAlign: 'right', paddingTop: '0.5rem' }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.8rem', color: 'var(--ink-40)' }}>330pt</span>
            </div>
          </div>
        </section>

        <section className="cs-section reveal">
          <div className="wrap">
            <p style={{ fontFamily: 'var(--display)', fontSize: 'clamp(2.5rem,6vw,5rem)', lineHeight: 1.15, letterSpacing: '-0.03em', color: 'var(--ink)', margin: 0 }}>Typography is the craft of endowing human language with a durable visual form.</p>
          </div>
        </section>

        {/* Short texts */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-label-row">
              <span className="cs-label-row-key">in short texts</span>
              <span className="cs-label-row-val">Butler&rsquo;s Slice is suitable for short sentences and fazes</span>
            </div>
            <div style={{ textAlign: 'right', paddingTop: '0.5rem' }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.8rem', color: 'var(--ink-40)' }}>140pt</span>
            </div>
          </div>
        </section>

        <section className="cs-section reveal">
          <div className="wrap">
            <CsBody style={{ maxWidth: '680px' }}>
              <p>&ldquo;In a badly designed book, the letters mill and stand like starving horses in a field. In a book designed by rote, they sit like stale bread and mutton on the page. In a well-made book, where designer, compositor and printer have all done their jobs, no matter how many thousands of lines and pages, the letters are alive. They dance in their seats. Sometimes they rise and dance in the margins and aisles.&rdquo;</p>
              <p>&mdash; Robert Bringhurst, The Elements of Typographic Style</p>
            </CsBody>
          </div>
        </section>

        {/* Long texts */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-label-row">
              <span className="cs-label-row-key">in long texts</span>
              <span className="cs-label-row-val">You can use it however you like. I&rsquo;m not here to tell you what to do.</span>
            </div>
            <div style={{ textAlign: 'right', paddingTop: '0.5rem' }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.8rem', color: 'var(--ink-40)' }}>45pt</span>
            </div>
          </div>
        </section>

        {/* The Numbers */}
        <section className="cs-section reveal">
          <div className="wrap">
            <h2 className="cs-display">the numbers</h2>
            <div style={{ marginTop: '2rem' }}>
              <p style={{ fontFamily: 'var(--display)', fontSize: 'clamp(4rem,12vw,10rem)', lineHeight: 1.2, letterSpacing: '0.02em', color: 'var(--ink)', margin: 0 }}>
                0&ensp;<span style={{ color: 'var(--project-color)' }}>1</span>&ensp;2&ensp;3&ensp;4
              </p>
              <p style={{ fontFamily: 'var(--display)', fontSize: 'clamp(4rem,12vw,10rem)', lineHeight: 1.2, letterSpacing: '0.02em', color: 'var(--ink)', margin: 0 }}>
                5&ensp;6&ensp;<span style={{ color: 'var(--project-color)' }}>7</span>&ensp;8&ensp;9
              </p>
            </div>
          </div>
        </section>

        {/* Reflections */}
        <section className="cs-section reveal">
          <div className="wrap">
            <p className="cs-section-label">Reflections</p>
            <h2 className="cs-section-title">What Designing a Typeface Taught Me</h2>
            <CsBody style={{ maxWidth: '720px' }}>
              <p>Designing Butler&rsquo;s Slice was an exercise in constraint. Every glyph needed to maintain legibility while incorporating the diagonal slice motif&mdash;and the two goals constantly fought each other. Some letters (A, K, X) accepted slices naturally because their geometry already contained angles. Others (O, S, C) required creative reinterpretation to make the slice feel intentional rather than destructive.</p>
              <p>The biggest lesson was that type design is systems thinking at the smallest scale. A single glyph means nothing in isolation&mdash;it only works when every character in the set shares the same visual logic. Adjusting the slice angle on one letter meant revisiting every other letter to maintain consistency. This is the same challenge I encounter in product design: every component must cohere with the whole system.</p>
            </CsBody>
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

      </main>

      <NextProject slug="atps" title="ArtTown Podcast" image="/Assets/images/atps.png" />
      <Footer />
    </>
  )
}
