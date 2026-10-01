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
          showHeaderSummary={false}
          backLink="/work"
          categorySlug="creative-tech"
          backLabel="Back to Work"
          tags={['Wearable Tech', 'Haptics', 'Textile Design', 'Emotion']}
          title="Feeling Patterns"
          subtitle="Wearable textile interfaces that explore emotion through tactile patterns &mdash; touch as a language beyond screens"
          info={[
            { label: 'Context', value: 'Feeling Patterns, NYU ITP' },
            { label: 'Year', value: '2023' },
            { label: 'Role', value: 'Designer & Fabricator' },
            { label: 'Tools', value: 'Arduino, Conductive Thread, Vibration Motors, Neoprene' },
          ]}
        />

        <CsSection id="cs-concept" label="01 &mdash; Concept" title="When Touch Becomes Language">
          <CsBody>
            <p className="cs-caption">Course exploration. Original prototype recordings and recognition-test records are not included in this archive.</p>
            <p>We communicate through screens with text, images, and video &mdash; but none of these channels carry touch. Feeling Patterns explores what happens when you design communication systems built entirely on tactile sensation: pressure, vibration, temperature, and texture.</p>
            <p>The course challenged us to create wearable interfaces where the body is both the display and the input device. Instead of reading a notification on a screen, you feel it as a pattern on your skin. Instead of typing a message, you press a fabric and the pressure translates into meaning on someone else&rsquo;s body.</p>
          </CsBody>
        </CsSection>

        <CsSection id="cs-prototypes" label="02 &mdash; Prototypes" title="Three Tactile Experiments">
          <CsFeatureGrid features={[
            { title: 'Heartbeat Sleeve', desc: 'A knitted sleeve connects a pulse sensor to vibration motors, translating a heartbeat into a rhythm on the wrist. The experiment explores whether another person’s pulse can become a useful tactile signal.' },
            { title: 'Mood Vest', desc: 'A neoprene vest uses vibration zones to explore a small vocabulary of patterns: a slow wave, rapid pulses, and localized feedback. Emotional labels were design intentions; recognition and comfort would need testing across different wearers.' },
            { title: 'Pressure Letters', desc: 'A fabric pad maps pressure in different zones to patterns on a receiving pad. The constraint is deliberate: the sender composes a simple tactile sequence instead of a text message.' },
          ]} />
        </CsSection>

        <CsSection id="cs-insights" label="03 &mdash; Insights" title="What Touch Teaches">
          <CsBody>
            <p>A tactile pattern can carry rhythm and urgency, but its meaning is not universal. Placement, sensitivity, context, and prior experience affect how someone reads it. These explorations did not establish a validated emotional vocabulary.</p>
            <p>The next design question is how many patterns a wearer can distinguish comfortably, and whether those distinctions hold while moving or distracted. That requires a documented recognition study, not just distinct motor sequences.</p>
            <p>The work gave me a reference for subtle wearable feedback at <a href="/mentra" className="project-text-link">Mentra</a>: when to use touch alongside the glasses display, and when a signal needs a clearer explanation.</p>
          </CsBody>
        </CsSection>

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
