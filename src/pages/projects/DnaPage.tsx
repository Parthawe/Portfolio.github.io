import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import CsSection from '../../components/case-study/CsSection'
import CsBody from '../../components/case-study/CsBody'
import CsThanks from '../../components/case-study/CsThanks'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'

export default function DnaPage() {
  return (
    <>
      <Helmet>
        <title>DNA: Speculative Design &middot; Parth Pawar</title>
        <meta name="description" content="Would you take a pill to live forever? A speculative design experience exploring immortality, mortality, and the ethics of anti-aging through physical pharmaceutical packaging." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="DNA: Speculative Design &middot; Parth Pawar" />
        <meta property="og:description" content="Speculative pharmaceutical packaging exploring immortality and mortality through bioart." />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#1A6B7A' } as React.CSSProperties}>

        <ProjectHeader
          backLink="/work"
          categorySlug="creative-tech"
          backLabel="Back to Work"
          tags={['Speculative Design', 'Bioart', 'Physical Computing']}
          title="Would You Take a Pill to Live Forever?"
          subtitle="A speculative pharmaceutical artifact that turns the fantasy of immortality into a physical choice someone has to hold, read, and hesitate over"
          info={[
            { label: 'Year', value: '2024' },
            { label: 'Role', value: 'Creator' },
            { label: 'Context', value: 'NYU ITP' },
          ]}
        />

        {/* Product photos */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/DNA/photos/boxes-closed.webp" alt="Two pharmaceutical boxes: Live 50+ Years More (blue) and Embrace Death (red)" loading="lazy" /></div>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/DNA/photos/boxes-open.png" alt="Both boxes opened, revealing inner packaging and booklets" loading="lazy" /></div>
            </div>
          </div>
        </section>

        {/* Overview */}
        <CsSection label="Overview" title="A Speculation That Needed to Feel Real">
          <CsBody>
            <p>The project begins with a familiar fantasy: what if medicine could give you fifty more years? Instead of presenting that question as a poster or a deck, I built it as a pharmaceutical decision. Participants receive a customized box and must choose between <strong>Live Immortal</strong>, a speculative anti-aging treatment, and <strong>Embrace Death</strong>, a companion artifact that argues for accepting finitude rather than engineering past it.</p>
            <p>The point was not to predict the future of biotech. It was to make the ethics feel immediate. Speculative design becomes stronger when the object is credible enough to make someone pause before answering. A thought experiment on screen can be shrugged off. A boxed treatment in your hand cannot.</p>
          </CsBody>
        </CsSection>

        {/* Detail photos */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/DNA/photos/card-final-message.webp" alt="Card: Final Message for Embracing Death, held in hand" loading="lazy" /></div>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/DNA/photos/pill-pack.webp" alt="Pill blister pack inside the Live Immortal box: Unlock More Life" loading="lazy" /></div>
            </div>
          </div>
        </section>

        {/* The Choice */}
        <CsSection id="cs-choice" label="The Choice" title="Two Believable Futures">
          <CsBody>
            <p><strong>Live Immortal</strong> is framed like a real intervention: dosage card, warnings, language of efficacy, and a biologically plausible story rooted in gene editing and longevity research. Everything in that path is designed to feel like a product that just crossed the line from experimental to available.</p>
            <p><strong>Embrace Death</strong> takes the opposite route. It is not anti-science, and it is not a joke option. It is a deliberately serious artifact about humanity&rsquo;s repeated attempts to outrun mortality, from myth to cryonics to digital afterlife fantasies. Together, the two paths turn an abstract debate into a choice architecture.</p>
          </CsBody>
        </CsSection>

        {/* Dosage detail */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/DNA/photos/dosage-card.webp" alt="Dosage, Duration of Use, and Precautions card from the pill packaging" loading="lazy" /></div>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/DNA/photos/booklet-detail.webp" alt="Detail of the inner booklet with instructions and messaging" loading="lazy" /></div>
            </div>
          </div>
        </section>

        {/* Why it matters */}
        <CsSection id="cs-reflection" label="Reflection" title="Why the Artifact Had to Carry the Argument">
          <CsBody style={{ maxWidth: '720px' }}>
            <p>This project taught me that speculative design succeeds or fails on conviction. If the artifact feels flimsy, the argument stays theoretical. If the artifact feels finished, the participant starts negotiating with the scenario instead of observing it from a safe distance.</p>
            <p>The references mattered, Chinese alchemy, telomere research, memento mori, but only after the object earned attention. The real design work was in the details that made the fiction believable: print quality, dosage language, booklet tone, and the unsettling familiarity of pharmaceutical packaging. That is what turned the project from a concept into a decision.</p>
          </CsBody>
        </CsSection>

        <CsThanks />

        <BottomNav sections={[
          { id: 'cs-choice', label: 'The Choice' },
          { id: 'cs-reflection', label: 'Reflection' },
        ]} />

      </main>

      <NextProject slug="uv-light" title="UV Light" image="/Portfolio.github.io/Assets/images/uv-light.jpg" />
      <Footer />
    </>
  )
}
