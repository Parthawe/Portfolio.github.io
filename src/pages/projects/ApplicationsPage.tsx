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
          subtitle="Building functional products at the intersection of design and engineering &mdash; interface, data, and deployment explorations"
          info={[
            { label: 'Context', value: 'Applications, NYU ITP' },
            { label: 'Year', value: '2023' },
            { label: 'Role', value: 'Designer & Developer' },
            { label: 'Tools', value: 'React, Node.js, MongoDB, Figma, Vercel' },
          ]}
        />
        <CsSection id="cs-overview" label="01 &mdash; Overview" title="Ship It">
          <CsBody>
            <p>This course connected product design to implementation: interface states, data persistence, and deployment. This page summarizes two application explorations; working builds and original usage records are not available in the current archive.</p>
            <p>For a designer, this made the work more concrete. Instead of stopping at Figma, I had to implement the interface, connect data, handle loading states, and see where the idea became brittle. The questions changed from &ldquo;does this look right?&rdquo; to &ldquo;does this still work with real content, real speed, and real mistakes?&rdquo;</p>
          </CsBody>
        </CsSection>
        <CsSection id="cs-projects" label="02 &mdash; Projects" title="Two Application Explorations">
          <CsFeatureGrid features={[
            { title: 'Collective Memory', desc: 'A collaborative storytelling application built around one sentence per contribution. The course notes describe React, Socket.IO, and MongoDB for a shared narrative that updates as contributions arrive. Moderation and concurrent edits are central design constraints.' },
            { title: 'Mood Map', desc: 'A campus map concept for sharing mood through colored pins, using Mapbox GL. Location and emotional information raise privacy questions even when names are omitted. A public deployment, consent process, and usage study are not documented here.' },
          ]} />
        </CsSection>
        <CsSection id="cs-lessons" label="03 &mdash; Lessons" title="What Shipping Teaches You">
          <CsBody>
            <p><strong>Design is negotiation with code.</strong> A clean static layout can fall apart when content is dynamic. Building the interface myself made implementation constraints part of the design process earlier.</p>
            <p><strong>Design for misuse.</strong> A shared story needs moderation across multiple contributions. A mood map needs limits on location precision and retention. These are unresolved product requirements in this summary, not evidence of a completed safety review.</p>
            <p><strong>Deployment is a design decision.</strong> Where you host, how fast it loads, whether it works on a phone, whether it&rsquo;s accessible without an account — these are not engineering details. They are design decisions that determine who can use your product. This course taught me that a beautiful interface nobody can access is not good design.</p>
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
