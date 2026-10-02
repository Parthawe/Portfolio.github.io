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

export default function ApplicationsPage() {
  return (
    <>
      <Helmet>
        <title>Applications &middot; Parth Pawar</title>
        <meta name="description" content="Building functional applications at the intersection of design and engineering — interface, data, and deployment explorations at NYU ITP." />
      </Helmet>
      <Nav />
      <main id="main-content" className="project-main" style={{ '--project-color': '#4285F4' } as React.CSSProperties}>
        <ProjectHeader
          showHeaderSummary={false}
          backLink="/work" categorySlug="creative-tech" backLabel="Back to Work"
          tags={['Full-Stack', 'Product Design', 'Rapid Development']}
          title="Applications"
          subtitle="Two course explorations connecting interface design, shared data, and deployment."
          info={[
            { label: 'Context', value: 'Applications, NYU ITP' },
            { label: 'Year', value: '2023' },
            { label: 'Role', value: 'Designer & Developer' },
            { label: 'Tools', value: 'React, Node.js, MongoDB, Figma, Vercel' },
          ]}
        />
        <CsSection id="cs-overview" label="01 &mdash; Overview" title="Interface, data, and deployment">
          <CsBody>
            <p>These two course explorations connected interface states to persistence and deployment. Building the interface exposed requirements that a static mockup could leave unresolved: simultaneous contributions, moderation, location precision, and recovery from errors.</p>
            <p>Working builds and original usage records are not available in this archive.</p>
          </CsBody>
        </CsSection>
        <CsSection id="cs-projects" label="02 &mdash; Projects" title="Two application concepts">
          <CsFeatureGrid features={[
  {
    "title": "Collective Memory",
    "desc": "A shared story with one sentence per contribution. The notes describe React, Socket.IO, and MongoDB; concurrent edits and moderation are the key product constraints."
  },
  {
    "title": "Mood Map",
    "desc": "A campus-map concept for sharing mood through colored pins, using Mapbox GL. Location precision, consent, and retention need definition before a public deployment."
  }
]} />
        </CsSection>
        <CsSection id="cs-lessons" label="03 &mdash; Lessons" title="Requirements beyond the interface">
          <CsBody>
            <p><strong>Handle real content.</strong> Layouts need to work as contributions change in length and arrive at the same time.</p>
            <p><strong>Design recovery.</strong> Submission, failure, and editing states belong in the flow alongside the successful contribution.</p>
            <p><strong>Define the data boundary.</strong> A shared story needs moderation; a mood map needs limits on location detail and retention. Those requirements remain unresolved in this archive.</p>
          </CsBody>
        </CsSection>
        <CsThanks />

        <BottomNav sections={[
          { id: 'cs-overview', label: 'Overview' },
          { id: 'cs-projects', label: 'Projects' },
          { id: 'cs-lessons', label: 'Lessons' },
        ]} />
      </main>
      <NextProject slug="embodied-web" title="Embodied Web" image="/Assets/images/embodied-web.svg" />
      <Footer />
    </>
  )
}
