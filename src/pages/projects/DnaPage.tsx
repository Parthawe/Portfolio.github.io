import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import CsExpandPreview from '../../components/case-study/CsExpandPreview'
import CsSection from '../../components/case-study/CsSection'
import CsBody from '../../components/case-study/CsBody'
import CsImage from '../../components/case-study/CsImage'
import CsFeatureGrid from '../../components/case-study/CsFeatureGrid'
import CsThanks from '../../components/case-study/CsThanks'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'

export default function DnaPage() {
  return (
    <>
      <Helmet>
        <title>DNA: Speculative Design &middot; Parth Pawar</title>
        <meta name="description" content="A compact glimpse of a speculative design artifact asking whether people would take a pill to live longer." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="DNA: Speculative Design &middot; Parth Pawar" />
        <meta property="og:description" content="Speculative pharmaceutical packaging exploring immortality, mortality, and choice." />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#2E5BFF' } as React.CSSProperties}>
        <ProjectHeader
          backLink="/work"
          categorySlug="creative-tech"
          backLabel="Back to Work"
          tags={['Speculative Design', 'Bioart']}
          title="Would You Take a Pill to Live Forever?"
          subtitle="A speculative artifact that makes immortality feel like a product choice"
          info={[
            { label: 'Context', value: 'NYU ITP' },
            { label: 'Role', value: 'Creator' },
            { label: 'Year', value: '2024' },
          ]}
        />

        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="cs-img reveal"><img src="/Assets/Projects/DNA/photos/boxes-closed.webp" alt="Two speculative pharmaceutical boxes: Live 50+ Years More and Embrace Death" loading="lazy" /></div>
              <div className="cs-img reveal"><img src="/Assets/Projects/DNA/photos/boxes-open.png" alt="Open pharmaceutical boxes with inserts, cards, and pill packaging" loading="lazy" /></div>
            </div>
          </div>
        </section>

        <CsSection id="cs-glimpse" label="Glimpse" title="A Thought Experiment You Have To Hold">
          <CsBody>
            <p>This is a compact speculative design project. Instead of writing about the ethics of anti-aging, I built two believable pharmaceutical artifacts: one promising extended life, the other asking the participant to accept mortality. The value is in the moment of hesitation created by the object.</p>
          </CsBody>
          <div className="cs-label-row">
            <span className="cs-label-row-key">Problem</span>
            <span className="cs-label-row-val">Immortality debates often stay abstract, which makes the ethical tension easy to dodge.</span>
          </div>
          <div className="cs-label-row">
            <span className="cs-label-row-key">Method</span>
            <span className="cs-label-row-val">Turn the question into packaging, dosage cards, warnings, and physical choice architecture.</span>
          </div>
          <div className="cs-label-row" style={{ borderBottom: 'none' }}>
            <span className="cs-label-row-key">Result</span>
            <span className="cs-label-row-val">A finished artifact set that made people negotiate with the scenario instead of simply agreeing or disagreeing with it.</span>
          </div>
        </CsSection>

        <CsExpandPreview
          cta="Open the artifact details"
          note="Dosage cards, packaging proof, impact notes, and the final message card."
        >
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="cs-img reveal"><img src="/Assets/Projects/DNA/photos/dosage-card.webp" alt="Dosage and precautions card for the speculative pill" loading="lazy" /></div>
              <div className="cs-img reveal"><img src="/Assets/Projects/DNA/photos/pill-pack.webp" alt="Speculative pill blister pack labeled Unlock More Life" loading="lazy" /></div>
            </div>
          </div>
        </section>

        <CsSection id="cs-impact" label="Impact" title="Why The Artifact Worked">
          <CsFeatureGrid features={[
            { title: 'The fiction felt close', desc: 'The pharmaceutical format made the future feel near enough to take seriously.' },
            { title: 'The choice was visible', desc: 'Two boxes turned a broad ethics prompt into a direct decision between extension and acceptance.' },
            { title: 'The detail carried the argument', desc: 'Warnings, dosage language, and print finish did more work than a long explanation could.' },
          ]} />
        </CsSection>

        <CsSection id="cs-learning" label="Learning" title="What I Learned">
          <CsBody>
            <p>Speculative design needs enough realism to make the audience uneasy. If the artifact feels unfinished, people treat the scenario like fiction. When the details feel familiar, they start asking what they would actually do. That was the main lesson: the object carries the argument before the text does.</p>
          </CsBody>
          <CsImage
            src="/Assets/Projects/DNA/photos/card-final-message.webp"
            alt="Final message card from the Embrace Death artifact"
            caption="The supporting cards shifted the project from a prop into a small decision system."
          />
        </CsSection>

        <CsThanks />

        </CsExpandPreview>

        <BottomNav sections={[
          { id: 'cs-glimpse', label: 'Glimpse' },
          { id: 'cs-impact', label: 'Impact' },
          { id: 'cs-learning', label: 'Learning' },
        ]} />
      </main>

      <NextProject slug="uv-light" title="UV Light" image="/Assets/images/uv-light.jpg" />
      <Footer />
    </>
  )
}
