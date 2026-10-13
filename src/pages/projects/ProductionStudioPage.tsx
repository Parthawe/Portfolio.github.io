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
          subtitle="Course notes on coordinating scope, fabrication, software, and exhibition setup."
          info={[
            { label: 'Context', value: 'Production Studio (Seminar), NYU ITP' },
            { label: 'Year', value: '2024' },
            { label: 'Role', value: 'Producer & Design Lead' },
            { label: 'Team', value: '5 collaborators' },
          ]}
        />
        <CsSection id="cs-overview" label="01 &mdash; Overview" title="Coordinating a shared build">
          <CsBody>
            <p>I coordinated five collaborators across concept development, hardware, software, fabrication, and exhibition setup. The recurring production problem was keeping those dependencies aligned as scope and deadlines changed.</p>
            <p>This is a course-process record. The archive still needs the named installation, show documentation, and operational logs to support a complete production case study.</p>
          </CsBody>
        </CsSection>
        <CsSection id="cs-process" label="02 &mdash; Process" title="From brief to exhibition setup">
          <StudyExplorer project="production-studio" />
        </CsSection>
        <CsSection id="cs-lessons" label="03 &mdash; Lessons" title="Scope and handoff">
          <CsBody>
            <p><strong>Record the scope decision.</strong> Keep the essential interaction clear when features are removed, and name the owner of each remaining dependency.</p>
            <p><strong>Write a repeatable handoff.</strong> Setup instructions and integration specifications should let a collaborator reproduce the installation without its original builder.</p>
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
