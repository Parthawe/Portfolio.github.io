import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import CsExpandPreview from "../../components/case-study/CsExpandPreview"
import CsSection from '../../components/case-study/CsSection'
import CsBody from '../../components/case-study/CsBody'
import CsFeatureGrid from '../../components/case-study/CsFeatureGrid'
import CsThanks from '../../components/case-study/CsThanks'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'

export default function ProductionStudioPage() {
  return (
    <>
      <Helmet>
        <title>Production Studio &middot; Parth Pawar</title>
        <meta name="description" content="Collaborative production at scale — managing creative teams, scope, and stakeholders to ship an installation from concept to ITP Winter Show." />
      </Helmet>
      <Nav />
      <main id="main-content" className="project-main" style={{ '--project-color': '#7c3aed' } as React.CSSProperties}>
        <ProjectHeader
          backLink="/work" categorySlug="creative-tech" backLabel="Back to Work"
          tags={['Project Management', 'Team Leadership', 'Exhibition']}
          title="Production Studio"
          subtitle="Leading a creative team from concept to exhibition &mdash; scope management, stakeholder alignment, and shipping under pressure"
          info={[
            { label: 'Context', value: 'Production Studio (Seminar), NYU ITP' },
            { label: 'Year', value: '2024' },
            { label: 'Role', value: 'Producer & Design Lead' },
            { label: 'Team', value: '5 collaborators' },
          ]}
        />
        <CsExpandPreview>
        <CsSection id="cs-overview" label="01 &mdash; Overview" title="The Course About Making Things Happen">
          <CsBody>
            <p>ITP students are prolific makers. But most projects are solo. Production Studio is the course that teaches you to produce at scale: lead a team, manage a budget, negotiate with stakeholders, schedule fabrication time, and deliver a polished installation by a hard deadline (ITP Winter Show, December 2024).</p>
            <p>This was the first time I led a team of five people through a full production cycle. The technical skills were the easy part. The hard part: making decisions when the team disagrees, cutting features you love because there isn&rsquo;t time, and maintaining quality when everyone is exhausted during finals week.</p>
          </CsBody>
        </CsSection>
        <CsSection id="cs-process" label="02 &mdash; Process" title="14 Weeks, 5 People, 1 Show">
          <CsFeatureGrid features={[
            { title: 'Weeks 1–3: Concept Sprint', desc: 'Five people, five different visions. The producer\'s first job: converge. We ran a structured ideation sprint — individual pitches, dot voting, synthesis. The winning concept combined elements from three proposals. The two people whose ideas weren\'t selected became the strongest advocates once they saw their DNA in the final direction.' },
            { title: 'Weeks 4–7: Prototyping', desc: 'Parallel workstreams: hardware prototyping (Arduino, sensors), software development (p5.js visualization), and fabrication (laser cutting, 3D printing). Weekly integration meetings ensured the streams stayed compatible. The biggest risk: the physical enclosure and the software had to fit together, and neither was done yet.' },
            { title: 'Weeks 8–11: Integration Hell', desc: 'The phase every production goes through: nothing works together. The sensor data was in the wrong format. The enclosure was 2mm too small. The projection mapping was calibrated for the studio, not the show floor. This is where production management matters — triage ruthlessly, fix the critical path first, accept imperfect everywhere else.' },
            { title: 'Weeks 12–14: Polish & Show', desc: 'Final push: user testing with 10 ITP students, bug fixes, signage, documentation. The installation ran for 2 days at the Winter Show. 200+ visitors interacted with it. Zero crashes. The team celebrated by sleeping for 14 hours.' },
          ]} />
        </CsSection>
        <CsSection id="cs-lessons" label="03 &mdash; Lessons" title="What Production Teaches">
          <CsBody>
            <p><strong>Decisions are more valuable than ideas.</strong> A team of five has unlimited ideas. The bottleneck is always decisions. The producer&rsquo;s job is not to have the best ideas — it&rsquo;s to create a process that turns five opinions into one direction, quickly, without resentment.</p>
            <p><strong>Cut scope, not quality.</strong> We cut three planned features in week 10. Each cut was painful. But the installation that shipped was polished, reliable, and complete. A smaller thing that works is always better than a larger thing that doesn&rsquo;t.</p>
            <p><strong>Documentation is production.</strong> If it&rsquo;s not written down, it didn&rsquo;t happen. Meeting notes, decision logs, integration specs, setup instructions — the unglamorous writing that makes a 5-person project possible. This is the skill that transferred most directly to professional work.</p>
          </CsBody>
        </CsSection>
        <CsThanks />
        </CsExpandPreview>

        <BottomNav sections={[
          { id: 'cs-overview', label: 'Overview' },
          { id: 'cs-process', label: 'Process' },
          { id: 'cs-lessons', label: 'Lessons' },
        ]} />
      </main>
      <NextProject slug="black-hole" title="Black Hole" image="/Assets/images/black-hole.jpg" />
      <Footer />
    </>
  )
}
