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
        <meta name="description" content="Wearable textile interfaces that translate emotion into tactile patterns — haptic vests, pressure-sensitive fabrics, and sensory communication beyond screens." />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#9c6b8a' } as React.CSSProperties}>

        <ProjectHeader
          backLink="/work"
          categorySlug="creative-tech"
          backLabel="Back to Work"
          tags={['Wearable Tech', 'Haptics', 'Textile Design', 'Emotion']}
          title="Feeling Patterns"
          subtitle="Wearable textile interfaces that translate emotion into tactile patterns &mdash; touch as a language beyond screens"
          info={[
            { label: 'Context', value: 'Feeling Patterns, NYU ITP' },
            { label: 'Year', value: '2023' },
            { label: 'Role', value: 'Designer & Fabricator' },
            { label: 'Tools', value: 'Arduino, Conductive Thread, Vibration Motors, Neoprene' },
          ]}
        />

        <CsSection id="cs-concept" label="01 &mdash; Concept" title="When Touch Becomes Language">
          <CsBody>
            <p>We communicate through screens with text, images, and video &mdash; but none of these channels carry touch. Feeling Patterns explores what happens when you design communication systems built entirely on tactile sensation: pressure, vibration, temperature, and texture.</p>
            <p>The course challenged us to create wearable interfaces where the body is both the display and the input device. Instead of reading a notification on a screen, you feel it as a pattern on your skin. Instead of typing a message, you press a fabric and the pressure translates into meaning on someone else&rsquo;s body.</p>
          </CsBody>
        </CsSection>

        <CsSection id="cs-prototypes" label="02 &mdash; Prototypes" title="Three Tactile Experiments">
          <CsFeatureGrid features={[
            { title: 'Heartbeat Sleeve', desc: 'A knitted sleeve with embedded vibration motors connected to a pulse sensor. Wear both sleeves and you feel each other\u2019s heartbeat on your wrist in real-time. The intimacy is startling \u2014 you become physically aware of another person\u2019s internal rhythm. Tested with pairs at ITP, every participant described it as \u201cemotionally intense.\u201d' },
            { title: 'Mood Vest', desc: 'A neoprene vest with 12 vibration zones mapped to emotional states. An app sends \u201ctactile emojis\u201d \u2014 calm (slow wave from shoulders to waist), excitement (rapid pulses everywhere), comfort (warm pressure at the back). The vocabulary is limited but immediately understood \u2014 most testers correctly identified the emotion after feeling just two patterns.' },
            { title: 'Pressure Letters', desc: 'A fabric pad with a grid of pressure sensors. Press hard in different zones to \u201cwrite\u201d messages that translate to haptic patterns on a receiving pad. Essentially a tactile telegraph \u2014 slow, deliberate, and deeply personal. The constraint of the medium (you can only send simple patterns) forces senders to be more intentional about what they communicate.' },
          ]} />
        </CsSection>

        <CsSection id="cs-insights" label="03 &mdash; Insights" title="What Touch Teaches">
          <CsBody>
            <p>The biggest revelation: <strong>touch is inherently emotional</strong>. You can read a text message ironically or sarcastically. You cannot feel a vibration pattern ironically. Tactile communication bypasses the cognitive layer that makes screen-based communication ambiguous. A slow, warm pulse on your back simply IS comforting &mdash; there&rsquo;s no interpretation needed.</p>
            <p>The design challenge is vocabulary. Screens can display infinite content. A haptic vest has maybe 20 distinguishable patterns before they blur together. The constraint is severe, but it&rsquo;s also what makes the medium powerful &mdash; you can only say things that matter.</p>
            <p>This work directly informed how I think about notification design at <a href="/mentra" style={{ color: 'var(--ink)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>Mentra</a> &mdash; smart glasses that need to communicate without a screen. The haptic patterns I developed in this course became the foundation for Mentra&rsquo;s tactile notification system.</p>
          </CsBody>
        </CsSection>

        <CsThanks />

        <BottomNav sections={[
          { id: 'cs-concept', label: 'Concept' },
          { id: 'cs-prototypes', label: 'Prototypes' },
          { id: 'cs-insights', label: 'Insights' },
        ]} />

      </main>

      <NextProject slug="shuffle" title="Shuffle" image="/Portfolio.github.io/Assets/images/shuffle.jpg" />
      <Footer />
    </>
  )
}
