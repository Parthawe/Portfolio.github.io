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
          subtitle="A speculative design experience that forces participants to choose between immortality and mortality, through physical pharmaceutical packaging"
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
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/DNA/photos/boxes-closed.png" alt="Two pharmaceutical boxes: Live 50+ Years More (blue) and Embrace Death (red)" loading="lazy" /></div>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/DNA/photos/boxes-open.png" alt="Both boxes opened, revealing inner packaging and booklets" loading="lazy" /></div>
            </div>
          </div>
        </section>

        {/* Overview */}
        <CsSection label="Overview" title="Blue Pill or Red Pill?">
          <CsBody>
            <p>The experience starts with a question: would you take an anti-aging pill to live forever? Participants submit a biological sample (blood or DNA), receive a customized pharmaceutical box, and face a choice: <strong>Live Immortal</strong>, a pill that adds 50+ years to your life through gene editing inspired by the immortal jellyfish, or <strong>Embrace Death</strong>, a booklet documenting humanity's unsuccessful attempts to beat mortality.</p>
            <p>The packaging is real. The pills are real (candy). The decision feels real. That's the point. Speculative design works when the artifact is convincing enough to provoke genuine reflection. A thought experiment on a screen is easy to dismiss. A box in your hands with your name on it is not.</p>
          </CsBody>
        </CsSection>

        {/* Detail photos */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/DNA/photos/card-final-message.png" alt="Card: Final Message for Embracing Death, held in hand" loading="lazy" /></div>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/DNA/photos/pill-pack.webp" alt="Pill blister pack inside the Live Immortal box: Unlock More Life" loading="lazy" /></div>
            </div>
          </div>
        </section>

        {/* The Choice */}
        <CsSection id="cs-choice" label="The Choice" title="Two Paths">
          <CsBody>
            <p><strong>Live Immortal:</strong> A pill derived from gene editing techniques inspired by the biological mechanisms of the immortal jellyfish. The packaging includes a booklet with dosage instructions, precautions, and a narrative about how to integrate an additional 50+ years into your current life. The science is speculative but grounded in real telomere research.</p>
            <p><strong>Embrace Death:</strong> A short book titled "Unsuccessful Efforts of Messy Humans to Beat Death," documenting ten chapters of humanity's failed quests for immortality, from the Epic of Gilgamesh to cryonics to digital mind uploading. The book doesn't argue for death. It simply shows what happens when people try to escape it.</p>
          </CsBody>
        </CsSection>

        {/* Dosage detail */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/DNA/photos/dosage-card.png" alt="Dosage, Duration of Use, and Precautions card from the pill packaging" loading="lazy" /></div>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/DNA/photos/booklet-detail.png" alt="Detail of the inner booklet with instructions and messaging" loading="lazy" /></div>
            </div>
          </div>
        </section>

        {/* Why it matters */}
        <CsSection id="cs-reflection" label="Reflection" title="Why Physical Artifacts Matter in Speculative Design">
          <CsBody style={{ maxWidth: '720px' }}>
            <p>This project taught me that speculative design lives and dies on the conviction of the artifact. A slide deck about immortality ethics is forgettable. A pharmaceutical box with your name on it, real pills inside, and a card that says "Final Message for Embracing Death" is not. The physical object creates a moment of genuine hesitation, and that hesitation is the design working.</p>
            <p>The experience drew on Chinese alchemy (the Pill of Immortality, jindan), modern telomere research, and the philosophical tradition of memento mori. But none of that context matters if the box doesn't feel real in your hands. The craft of the packaging, the weight of the paper, the gradient on the print, those details are what make the speculation feel like a real choice instead of an academic exercise.</p>
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
