import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import CsSection from '../../components/case-study/CsSection'
import CsBody from '../../components/case-study/CsBody'
import CsFeatureGrid from '../../components/case-study/CsFeatureGrid'
import CsThanks from '../../components/case-study/CsThanks'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'

export default function PerformanceByDesignPage() {
  return (
    <>
      <Helmet>
        <title>Performance by Design &middot; Parth Pawar</title>
        <meta name="description" content="Designing live performance experiences — lighting cues, spatial choreography, audience flow, and the invisible systems that make events feel magical." />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#b8860b' } as React.CSSProperties}>

        <ProjectHeader
          showHeaderSummary={false}
          backLink="/work"
          categorySlug="creative-tech"
          backLabel="Back to Work"
          tags={['Experience Design', 'Lighting', 'Spatial Design', 'Live Events']}
          title="Performance by Design"
          subtitle="Course studies in lighting cues, spatial choreography, and audience attention."
          info={[
            { label: 'Context', value: 'Performance by Design, NYU ITP' },
            { label: 'Year', value: '2023' },
            { label: 'Role', value: 'Experience Designer' },
            { label: 'Tools', value: 'DMX Lighting, QLab, Spatial Audio, Projection' },
          ]}
        />

        <CsSection id="cs-concept" label="01 &mdash; Concept" title="Directing attention in a room">
          <CsBody>
            <p>The studies used lighting, sound, and spatial arrangement to direct attention during live performance. I explored how a cue signals a transition and how the room changes what an audience can see and hear.</p>
            <p>Original cue sheets and recordings are not included in this course archive.</p>
          </CsBody>
        </CsSection>

        <CsSection id="cs-work" label="02 &mdash; Work" title="Three performance studies">
          <CsFeatureGrid features={[
  {
    "title": "Light as narrator",
    "desc": "DMX-controlled LEDs suggest scenes through brightness, color, and timing. The study asks what a cue can communicate without dialogue."
  },
  {
    "title": "Audience as performer",
    "desc": "Rooms combine visual, auditory, tactile, and olfactory cues. The pacing question is how to signal a transition while allowing visitors to move at different speeds."
  },
  {
    "title": "Reactive stage",
    "desc": "Pressure sensors trigger lighting and sound as performers move. Movement changes become inputs to a shared body, light, and sound feedback loop."
  }
]} />
        </CsSection>

        <CsSection id="cs-reflection" label="03 &mdash; Reflection" title="Timing and feedback">
          <CsBody>
            <p><strong>Timing:</strong> a cue needs to arrive when the action makes it meaningful. I carried that attention to timing into interface transitions and feedback.</p>
            <p><strong>Attention:</strong> light, sound, and movement compete for focus. Each needs a clear role in the sequence.</p>
            <p>For documented scenic and lighting work, see <a href="/drowning" className="project-text-link">Drowning</a>.</p>
          </CsBody>
        </CsSection>

        <CsThanks />


        <BottomNav sections={[
          { id: 'cs-concept', label: 'Concept' },
          { id: 'cs-work', label: 'Work' },
          { id: 'cs-reflection', label: 'Reflection' },
        ]} />

      </main>

      <NextProject slug="drowning" title="Drowning" image="/Assets/images/drowning.jpg" />
      <Footer />
    </>
  )
}
