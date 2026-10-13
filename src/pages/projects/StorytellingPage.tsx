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
          subtitle="Course reflections on sequence, pacing, and the consequences of an interaction."
          info={[
            { label: 'Context', value: 'Storytelling, NYU ITP' },
            { label: 'Year', value: '2025' },
            { label: 'Role', value: 'Narrative Designer' },
            { label: 'Output', value: 'Narrative framework' },
          ]}
        />

        <CsSection id="cs-overview" label="01 &mdash; Overview" title="Ordering information and consequence">
          <CsBody>
            <p>I used this course to examine how context, tension, decisions, and consequences can organize a design story. The same questions apply to an interface sequence and to an installation encountered from several directions.</p>
            <p>These are course reflections. Original drafts and revision artifacts are not included.</p>
          </CsBody>
        </CsSection>

        <CsSection id="cs-frameworks" label="02 &mdash; Frameworks" title="Four ways to structure an experience">
          <StudyExplorer project="storytelling" />
        </CsSection>

        <CsSection id="cs-application" label="03 &mdash; Application" title="Examples from my work">
          <CsBody>
            <p>In <a href="/enigma" className="project-text-link">Enigma</a>, a drawn letter precedes a cascade of light. In <a href="/shuffle" className="project-text-link">Shuffle</a>, moving one fader changes the others. Both make the consequence of an action part of the explanation.</p>
            <p>For a case study, I now ask whether the reader can connect a constraint to a decision and then inspect what was built. Original drafts or revision artifacts are needed to demonstrate that editorial process; they are not included here.</p>
          </CsBody>
        </CsSection>

        <RelatedProjectEvidence slug="storytelling" />
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
