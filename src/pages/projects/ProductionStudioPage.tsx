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
          showHeaderSummary={false}
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
        <CsSection id="cs-overview" label="01 &mdash; Overview" title="Production Notes">
          <CsBody>
            <p className="cs-caption">Course production notes. A named installation, show documentation, and operational logs are needed for a complete production case study.</p>
            <p>ITP students are prolific makers. But most projects are solo. Production Studio is the course that teaches you to produce at scale: lead a team, manage a budget, negotiate with stakeholders, schedule fabrication time, and deliver a polished installation by a hard deadline (ITP Winter Show, December 2024).</p>
            <p>This was the first time I led a team of five people through a full production cycle. The technical skills were the easy part. The hard part: making decisions when the team disagrees, cutting features you love because there isn&rsquo;t time, and maintaining quality when everyone is exhausted during finals week.</p>
          </CsBody>
        </CsSection>
        <CsSection id="cs-process" label="02 &mdash; Process" title="From Brief to Exhibition Setup">
          <CsFeatureGrid features={[
            { title: 'Weeks 1–3: Concept Sprint', desc: 'Bring individual proposals into a shared direction. Record the chosen scope and ownership so fabrication and software work can proceed against the same brief.' },
            { title: 'Weeks 4–7: Prototyping', desc: 'Coordinate hardware, software, and fabrication in parallel. Test their interfaces early: sensor output, physical dimensions, and installation requirements.' },
            { title: 'Weeks 8–11: Integration Hell', desc: 'Resolve integration issues before adding features. A working sensor, enclosure, and visualization still need a shared data format, physical fit, and calibration for the exhibition space.' },
            { title: 'Weeks 12–14: Polish & Show', desc: 'Prepare testing, signage, setup instructions, and documentation. The available course notes do not include a visitor count or uptime log, so this summary does not report a measured exhibition result.' },
          ]} />
        </CsSection>
        <CsSection id="cs-lessons" label="03 &mdash; Lessons" title="What Production Teaches">
          <CsBody>
            <p><strong>Decisions are more valuable than ideas.</strong> A team of five has unlimited ideas. The bottleneck is always decisions. The producer&rsquo;s job is not to have the best ideas — it&rsquo;s to create a process that turns five opinions into one direction, quickly, without resentment.</p>
            <p><strong>Make scope decisions explicit.</strong> Record what is essential to the interaction, what can be removed, and who owns each remaining dependency. A feature cut should leave a complete experience.</p>
            <p><strong>Write the handoff.</strong> Decision logs, integration specifications, and setup instructions let collaborators reproduce the work without relying on the person who built each part.</p>
          </CsBody>
        </CsSection>
        <CsThanks />

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
