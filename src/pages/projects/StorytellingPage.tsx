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

export default function StorytellingPage() {
  return (
    <>
      <Helmet>
        <title>Storytelling &middot; Parth Pawar</title>
        <meta name="description" content="Narrative design explorations — how structure, pacing, and medium shape the stories we tell through products, installations, and interfaces." />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#8b5e3c' } as React.CSSProperties}>

        <ProjectHeader
          showHeaderSummary={false}
          backLink="/work"
          categorySlug="creative-tech"
          backLabel="Back to Work"
          tags={['Narrative Design', 'Storytelling', 'Interactive']}
          title="Storytelling"
          subtitle="How structure, pacing, and medium shape the stories we tell &mdash; through products, installations, and interfaces"
          info={[
            { label: 'Context', value: 'Storytelling, NYU ITP' },
            { label: 'Year', value: '2025' },
            { label: 'Role', value: 'Narrative Designer' },
            { label: 'Output', value: 'Narrative framework' },
          ]}
        />

        <CsSection id="cs-overview" label="01 &mdash; Overview" title="Every Product Tells a Story">
          <CsBody>
            <p>This course treated narrative as a design material: the order of information, the timing of an interaction, and the consequence of a choice. These are course reflections rather than a documented before-and-after redesign.</p>
            <p>The premise: features rarely explain themselves. Sequence, pacing, and framing change how people understand a product. I used the course to study how a design story can move from context, to tension, to decision, to consequence without turning into marketing copy.</p>
          </CsBody>
        </CsSection>

        <CsSection id="cs-frameworks" label="02 &mdash; Frameworks" title="Narrative Structures in Design">
          <CsFeatureGrid features={[
            { title: 'The Hero\'s Journey in Onboarding', desc: 'A narrative arc can help organize an onboarding critique: what does someone need, what blocks them, and what changes when they complete a step? It is a framing exercise, not evidence that a specific sequence improves conversion.' },
            { title: 'Pacing as Information Architecture', desc: 'Film editors know that rhythm creates emotion \u2014 fast cuts for tension, long takes for contemplation. The same applies to interfaces: a dense dashboard feels urgent; generous whitespace feels premium. This portfolio\u2019s pacing \u2014 hero, pause, content, pause, interactive \u2014 is a deliberate narrative rhythm.' },
            { title: 'The Unreliable Narrator in Data Viz', desc: 'Every data visualization is a story told by a narrator (the designer) who chooses what to show and what to hide. The MONIAC simulator makes this explicit: the same economic data, presented through different levers, tells different stories. The user becomes the narrator.' },
            { title: 'Spatial Storytelling', desc: 'In physical installations, the story is the space. Visitors don\u2019t read left-to-right; they wander. The designer\u2019s job is to create a spatial narrative that works regardless of entry point. Black Hole\u2019s five phenomena work in any order because each is self-contained but connects to a larger theme.' },
          ]} />
        </CsSection>

        <CsSection id="cs-application" label="03 &mdash; Application" title="Storytelling Across My Work">
          <CsBody>
            <p>In <a href="/enigma" className="project-text-link">Enigma</a>, a drawn letter precedes a cascade of light. In <a href="/shuffle" className="project-text-link">Shuffle</a>, moving one fader changes the others. Both make the consequence of an action part of the explanation.</p>
            <p>For a case study, I now ask whether the reader can connect a constraint to a decision and then inspect what was built. Original drafts or revision artifacts are needed to demonstrate that editorial process; they are not included here.</p>
          </CsBody>
        </CsSection>

        <CsThanks />


        <BottomNav sections={[
          { id: 'cs-overview', label: 'Overview' },
          { id: 'cs-frameworks', label: 'Frameworks' },
          { id: 'cs-application', label: 'Application' },
        ]} />

      </main>

      <NextProject slug="on-becoming" title="On Becoming" image="/Assets/images/on-becoming.svg" />
      <Footer />
    </>
  )
}
