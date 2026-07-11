import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import ProjectOverview from '../../components/case-study/ProjectOverview'
import CsSection from '../../components/case-study/CsSection'
import CsBody from '../../components/case-study/CsBody'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'
import CsThanks from '../../components/case-study/CsThanks'

export default function KeyboardProjectPage() {
  return (
    <>
      <Helmet>
        <title>Keyboard Project &middot; Parth Pawar</title>
        <meta
          name="description"
          content="A physical keyboard and data-sculpture study exploring key height, touch, fabrication, and input as spatial information."
        />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Keyboard Project &middot; Parth Pawar" />
        <meta property="og:description" content="A tactile keyboard object that turns input into a readable physical data landscape." />
        <meta property="og:image" content="https://www.designwhich.works/Assets/Projects/Keyboard/photos/keyboard-data-hero.webp" />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#B5A04A' } as React.CSSProperties}>
        <ProjectHeader
          backLink="/work"
          categorySlug="creative-tech"
          backLabel="Back to Work"
          tags={['Creative Tech', 'Data Object', 'Fabrication', 'Physical Interface']}
          title="Keyboard Project"
          subtitle="A tactile data object that turns a keyboard from a flat input device into a physical landscape of height, rhythm, and touch"
          info={[
            { label: 'Role', value: 'Designer & Fabricator' },
            { label: 'Context', value: 'NYU ITP fabrication study' },
            { label: 'Timeline', value: '2024' },
            { label: 'Methods', value: '3D printing, object study, physical prototyping' },
          ]}
          heroImage="/Assets/Projects/Keyboard/photos/keyboard-data-hero.webp"
          heroAlt="Keyboard with lifted keys beside a 3D printed data sculpture."
        />

        <ProjectOverview
          id="cs-overview"
          sections={[
            {
              label: 'Question',
              content: 'What changes when a keyboard stops being invisible infrastructure and becomes a physical surface that can hold information?',
            },
            {
              label: 'Approach',
              content: 'I treated key height as a visual and tactile variable, turning the keyboard into a small landscape that could be read through both sight and touch.',
            },
            {
              label: 'Result',
              content: 'The finished artifact pairs a modified keyboard with a 3D printed data sculpture, making the relationship between input, form, and information tangible.',
            },
          ]}
        />

        <section className="cs-section reveal" id="cs-artifact">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="cs-img reveal">
                <img src="/Assets/Projects/Keyboard/photos/keys-closeup.webp" alt="Close-up of keyboard keys raised on small stems at different heights." loading="lazy" decoding="async" />
              </div>
              <div className="cs-img reveal">
                <img src="/Assets/Projects/Keyboard/photos/data-sculpture.png" alt="3D printed data sculpture made from repeated key-like columns." loading="lazy" decoding="async" />
              </div>
            </div>
          </div>
        </section>

        <CsSection id="cs-concept" label="01 · Concept" title="A keyboard is already a landscape.">
          <CsBody style={{ maxWidth: '720px' }}>
            <p>Most keyboards disappear the moment they work. Your fingers learn the surface, your eyes leave it, and the object becomes infrastructure. This project asks what happens when that familiar surface is made strange again.</p>
            <p>I used key height as the primary design material. Instead of treating the keyboard as a flat grid, I raised each key in proportion to how often it gets pressed, so the object could be read as a topography: rows, peaks, valleys, and interruptions.</p>
            <p>The goal was not to make a faster keyboard. It was to make input visible as a physical pattern, something you could inspect before touching and understand differently after touching.</p>
          </CsBody>
        </CsSection>

        <CsSection id="cs-data" label="02 · Data" title="The heights come from a real count.">
          <CsBody style={{ maxWidth: '720px' }}>
            <p>The topography is not decorative. I wrote a Python script that read a full book manuscript and counted every key press needed to type it: 147,563 letters in total.</p>
            <p>The counts have a shape of their own. E leads with 17,333 presses, followed by T at 13,029 and A at 12,412, while Q appears only 65 times. That distribution became the height map for the object.</p>
            <p>I rebuilt the keyboard as a 3D model in Spline, extruding each key in proportion to its count, then printed the result. The sculpture is the book, read as pressure instead of prose.</p>
          </CsBody>

          <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '2rem', alignItems: 'start' }}>
            <div className="cs-img reveal">
              <img src="/Assets/Projects/Keyboard/photos/letter-frequency-table.jpg" alt="Table listing key press counts for every letter from a to z, with e highest at 17,333." loading="lazy" decoding="async" />
              <figcaption className="cs-img-caption">Output of the counting script: press counts for every letter across the manuscript.</figcaption>
            </div>
            <div className="cs-img reveal">
              <img src="/Assets/Projects/Keyboard/photos/spline-data-model.jpg" alt="Orange 3D render of the keyboard modeled in Spline, each key extruded to a different height." loading="lazy" decoding="async" />
              <figcaption className="cs-img-caption">The Spline model that turned the counts into geometry before printing.</figcaption>
            </div>
          </div>
        </CsSection>

        <CsSection id="cs-process" label="03 · Process" title="From familiar object to fabricated system.">
          <CsBody style={{ maxWidth: '720px' }}>
            <p>The build moved through disassembly, measurement, 3D printing, and reassembly, producing two keyboards: a fully printed model and a modified real one. Each step exposed the keyboard as a stack of constraints: key spacing, switch tolerance, finger clearance, material strength, and visual legibility.</p>
            <p>This project stands on its own as a physical study. It is about seeing an everyday interface as material, not software.</p>
          </CsBody>

          <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginTop: '2rem' }}>
            <div className="cs-img reveal">
              <img src="/Assets/Projects/Keyboard/photos/keyboard-angle.png" alt="Angled view of the raised-key keyboard object." loading="lazy" decoding="async" />
            </div>
            <div className="cs-img reveal">
              <img src="/Assets/Projects/Keyboard/photos/process-grid.png" alt="Grid of 3D printing process photos and prototype stages." loading="lazy" decoding="async" />
            </div>
            <div className="cs-img reveal">
              <img src="/Assets/Projects/Keyboard/photos/fabrication-process.png" alt="Keyboard fabrication process with disassembled parts, keycaps, and layout material." loading="lazy" decoding="async" />
            </div>
          </div>
        </CsSection>

        <CsSection id="cs-outcome" label="04 · Outcome" title="The keyboard became a readable object.">
          <CsBody style={{ maxWidth: '720px' }}>
            <p>The finished project makes a small but important point: interfaces do not have to stay flat to be understandable. When form carries information, the body becomes part of the reading process.</p>
            <p>That lesson became a foundation for later work with fabrication, wearable systems, and BreakGen, where digital decisions needed to survive contact with physical reality.</p>
          </CsBody>
        </CsSection>

        <CsThanks />

        <BottomNav sections={[
          { id: 'cs-overview', label: 'Overview' },
          { id: 'cs-artifact', label: 'Artifact' },
          { id: 'cs-concept', label: 'Concept' },
          { id: 'cs-data', label: 'Data' },
          { id: 'cs-process', label: 'Process' },
          { id: 'cs-outcome', label: 'Outcome' },
        ]} />
      </main>

      <NextProject slug="breakgen" title="BreakGen" image="/Assets/Projects/Keyboard/photos/breakgen-launch-live.png" />
      <Footer />
    </>
  )
}
