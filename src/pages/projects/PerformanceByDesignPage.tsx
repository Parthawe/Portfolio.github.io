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
          backLink="/work"
          categorySlug="creative-tech"
          backLabel="Back to Work"
          tags={['Experience Design', 'Lighting', 'Spatial Design', 'Live Events']}
          title="Performance by Design"
          subtitle="Designing the invisible systems behind live performances &mdash; lighting, spatial choreography, and audience flow"
          info={[
            { label: 'Context', value: 'Performance by Design, NYU ITP' },
            { label: 'Year', value: '2023' },
            { label: 'Role', value: 'Experience Designer' },
            { label: 'Tools', value: 'DMX Lighting, QLab, Spatial Audio, Projection' },
          ]}
        />

        <CsSection id="cs-concept" label="01 &mdash; Concept" title="The Design Nobody Sees">
          <CsBody>
            <p>Great performance design is invisible. When lighting, sound, staging, and audience flow work perfectly, nobody notices them &mdash; they just feel the experience. This course taught me to design those invisible systems: the 200ms lighting fade that marks a scene transition, the spatial audio that guides attention without words, the floor plan that ensures every audience member has a clear sightline.</p>
            <p>The fundamental shift from screen design: in live performance, you design for a three-dimensional space where the audience IS part of the system. You can&rsquo;t scroll. You can&rsquo;t go back. Every moment is experienced once, in real time, and the designer&rsquo;s job is to make each one land.</p>
          </CsBody>
        </CsSection>

        <CsSection id="cs-work" label="02 &mdash; Work" title="Three Performance Pieces">
          <CsFeatureGrid features={[
            { title: 'Light as Narrator', desc: 'A 10-minute piece performed in total darkness, where the only storytelling element is light. No actors, no dialogue \u2014 just DMX-controlled LEDs creating scenes: a sunrise across 180 seconds, a storm in 30 seconds of strobing, and a slow fade to nothing. The audience filled in the narrative themselves. Showed me that suggestion is more powerful than exposition.' },
            { title: 'Audience as Performer', desc: 'Designed the flow for a 50-person immersive experience where audience members moved between four rooms. Each room had a different sensory focus: visual, auditory, tactile, olfactory. The design challenge was pacing \u2014 how long before a room feels \u201ccomplete\u201d and you naturally want to move? Answer: 4 minutes for most people, regardless of content.' },
            { title: 'Reactive Stage', desc: 'A performance stage with embedded pressure sensors that triggered lighting and sound changes based on where performers stood and how they moved. Fast movement: aggressive red light and percussive sound. Stillness: cool blue ambient tone. The performers learned to \u201cplay\u201d the stage as an instrument, creating a feedback loop between body, light, and sound.' },
          ]} />
        </CsSection>

        <CsSection id="cs-reflection" label="03 &mdash; Reflection" title="What Live Taught Me About Digital">
          <CsBody>
            <p>Performance design changed how I approach screen-based work. Three lessons that transferred directly:</p>
            <p><strong>Timing is design.</strong> A 200ms transition feels different from a 400ms one. In live performance, a late lighting cue can break the illusion. That made me more precise about animation timing, feedback, and rhythm in interfaces.</p>
            <p><strong>Attention is a resource.</strong> In a theatre, every light, sound, and movement competes for the same audience focus. The same principle applies to UI: each element needs a job, or it becomes noise.</p>
            <p><strong>The body remembers.</strong> Audiences at immersive performances remember physical sensations &mdash; the temperature of a room, the texture of a wall they touched &mdash; more vividly than anything they saw on a screen. This insight drives my interest in physical computing and tangible interfaces.</p>
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
