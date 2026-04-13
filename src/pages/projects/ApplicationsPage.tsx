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
        <meta name="description" content="Building functional applications at the intersection of design and engineering — from concept to deployed product in one semester." />
      </Helmet>
      <Nav />
      <main id="main-content" className="project-main" style={{ '--project-color': '#0ea5e9' } as React.CSSProperties}>
        <ProjectHeader
          backLink="/work" categorySlug="creative-tech" backLabel="Back to Work"
          tags={['Full-Stack', 'Product Design', 'Rapid Development']}
          title="Applications"
          subtitle="Building functional products at the intersection of design and engineering &mdash; from concept to deployed app in one semester"
          info={[
            { label: 'Context', value: 'Applications, NYU ITP' },
            { label: 'Year', value: '2023' },
            { label: 'Role', value: 'Designer & Developer' },
            { label: 'Tools', value: 'React, Node.js, MongoDB, Figma, Vercel' },
          ]}
        />
        <CsSection id="cs-overview" label="01 &mdash; Overview" title="Ship It">
          <CsBody>
            <p>Applications at ITP is the course that bridges the gap between &ldquo;I have an idea&rdquo; and &ldquo;people are using it.&rdquo; Over 14 weeks, you conceive, design, build, and deploy a functional web application. No mockups. No prototypes. A real product with real users.</p>
            <p>For a designer, this was transformative. At a design agency, you hand off Figma files. In this course, you implement them yourself. Every design decision is immediately tested against technical reality: can I actually build this animation? Does this layout work with real data? How does this feel at 3G speed?</p>
          </CsBody>
        </CsSection>
        <CsSection id="cs-projects" label="02 &mdash; Projects" title="Two Deployed Applications">
          <CsFeatureGrid features={[
            { title: 'Collective Memory', desc: 'A collaborative storytelling platform where users contribute one sentence at a time to a shared narrative. Each contribution is anonymous. The story grows organically, taking unexpected turns as different voices add to it. Built with React + Socket.IO for real-time collaboration, MongoDB for persistence. The constraint (one sentence per contribution) forces concision and creates a collective voice that\'s distinct from any individual contributor.' },
            { title: 'Mood Map', desc: 'A campus-wide emotional temperature check. Students anonymously drop a "mood pin" on a map of NYU — color-coded from green (great) to red (struggling). Over time, patterns emerge: the library turns red during finals week, Washington Square stays green on sunny Fridays. The visualization uses Mapbox GL with custom layers, and the anonymization was designed with NYU\'s IRB guidelines in mind. Deployed for two weeks of real usage across ITP.' },
          ]} />
        </CsSection>
        <CsSection id="cs-lessons" label="03 &mdash; Lessons" title="What Shipping Teaches You">
          <CsBody>
            <p><strong>Design is negotiation with code.</strong> The most elegant Figma layout becomes a CSS nightmare when content is dynamic. Learning to design FOR implementation — not despite it — made me a fundamentally better designer. I now prototype in code before I open Figma.</p>
            <p><strong>Real users break everything.</strong> Mood Map worked perfectly in testing. On day one of deployment, someone dropped 47 mood pins in a row, crashing the rate limiter. Collective Memory&rsquo;s moderation system missed a string of profanity because it was spread across three contributions. Real usage is humbling and essential.</p>
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
      <NextProject slug="embodied-web" title="Embodied Web" image="/Portfolio.github.io/Assets/images/sea-of-salt.svg" />
      <Footer />
    </>
  )
}
