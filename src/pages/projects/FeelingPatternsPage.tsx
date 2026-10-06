import RelatedProjectEvidence from '../../components/case-study/RelatedProjectEvidence'
import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import CsSection from '../../components/case-study/CsSection'
import CsBody from '../../components/case-study/CsBody'
import StudyExplorer from '../../components/case-study/StudyExplorer'
import CsThanks from '../../components/case-study/CsThanks'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'

export default function FeelingPatternsPage() {
  return (
    <>
      <Helmet>
        <title>Feeling Patterns &middot; Parth Pawar</title>
        <meta name="description" content="Wearable textile interfaces that explore emotion through tactile patterns — haptic vests, pressure-sensitive fabrics, and sensory communication beyond screens." />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#9c6b8a' } as React.CSSProperties}>

        <ProjectHeader
          heroImage="/Assets/project-illustrations/feeling-patterns-materials.webp"
          heroAlt="Illustration of neoprene, a vibration disc, knitted fabric, conductive thread, and a pressure pad"
          heroCaption="AI-generated material illustration, prepared for this page. It is not a photograph of the original prototypes."
          showHeaderSummary={false}
          backLink="/work"
          categorySlug="creative-tech"
          backLabel="Back to Work"
          tags={['Wearable Tech', 'Haptics', 'Textile Design', 'Emotion']}
          title="Feeling Patterns"
          subtitle="Three wearable-textile studies exploring pulse, vibration, and pressure as communication."
          info={[
            { label: 'Context', value: 'Feeling Patterns, NYU ITP' },
            { label: 'Year', value: '2023' },
            { label: 'Role', value: 'Designer & Fabricator' },
            { label: 'Tools', value: 'Arduino, Conductive Thread, Vibration Motors, Neoprene' },
          ]}
        />

        <CsSection id="cs-concept" label="01 &mdash; Concept" title="Exploring touch as a signal">
          <CsBody>
            <p>The body acts as both input and output: a pulse sensor captures rhythm, a fabric pad captures pressure, and vibration motors return a tactile pattern. The three studies explore different ways to connect those signals.</p>
            <p>Original recordings and recognition-test records are not included in this course archive.</p>
          </CsBody>
        </CsSection>

        <CsSection id="cs-prototypes" label="02 &mdash; Prototypes" title="Three tactile studies">
          <StudyExplorer project="feeling-patterns" />
        </CsSection>

        <CsSection id="cs-insights" label="03 &mdash; Insights" title="Recognition, comfort, and context">
          <CsBody>
            <p>A pattern can communicate rhythm or urgency without carrying the same meaning for every wearer. Placement, sensitivity, movement, and familiarity all affect interpretation.</p>
            <p>The next study would test how many patterns people can distinguish comfortably, including while moving or distracted. This work informed my questions about subtle feedback at <a href="/mentra" className="project-text-link">Mentra</a>.</p>
          </CsBody>
        </CsSection>

        <RelatedProjectEvidence slug="feeling-patterns" />
        <CsThanks />


        <BottomNav sections={[
          { id: 'cs-concept', label: 'Concept' },
          { id: 'cs-prototypes', label: 'Prototypes' },
          { id: 'cs-insights', label: 'Insights' },
        ]} />

      </main>

      <NextProject slug="shuffle" title="Shuffle" image="/Assets/images/shuffle.jpg" />
      <Footer />
    </>
  )
}
