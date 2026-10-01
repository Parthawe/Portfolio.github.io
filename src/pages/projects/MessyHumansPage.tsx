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

export default function MessyHumansPage() {
  return (
    <>
      <Helmet>
        <title>Designing for Messy Humans &middot; Parth Pawar</title>
        <meta name="description" content="Inclusive design research — designing for edge cases, emotional states, situational disabilities, and the humans that personas miss." />
      </Helmet>
      <Nav />
      <main id="main-content" className="project-main" style={{ '--project-color': '#059669' } as React.CSSProperties}>
        <ProjectHeader
          showHeaderSummary={false}
          backLink="/work" categorySlug="creative-tech" backLabel="Back to Work"
          tags={['Inclusive Design', 'Research', 'Accessibility', 'Ethics']}
          title="Designing for Messy Humans"
          subtitle="Inclusive design research &mdash; edge cases, emotional states, and the humans that personas always miss"
          info={[
            { label: 'Context', value: 'Designing for Messy Humans, NYU ITP' },
            { label: 'Year', value: '2023' },
            { label: 'Role', value: 'Design Researcher' },
            { label: 'Methods', value: 'Contextual Inquiry, Diary Studies, Inclusive Audits' },
          ]}
        />
        <CsSection id="cs-premise" label="01 &mdash; Premise" title="Personas Are Clean. People Are Not.">
          <CsBody>
            <p>A persona rarely captures the moment someone uses a product: tired, distracted, using one hand, or switching languages. This course examined how those conditions change the decisions an interface needs to support.</p>
            <p>This course dismantles the clean persona and designs for the messy reality: situational disabilities, emotional extremes, cognitive overload, cultural assumptions, and the edge cases that mainstream design ignores.</p>
          </CsBody>
        </CsSection>
        <CsSection id="cs-research" label="02 &mdash; Research" title="Questions to Carry into a Design Review">
          <CsFeatureGrid features={[
            { title: 'Situational Disability Audit', desc: 'Review interfaces under one-handed use, bright sunlight, noise, and distraction. Check whether primary actions remain reachable and feedback remains readable. These are audit prompts, not a published comparative scorecard.' },
            { title: 'Emotional State Mapping', desc: 'Consider how anxiety, fatigue, and uncertainty change an interaction. For a payment flow, that means clear amounts, recoverable errors, and time to review before committing. The course notes do not establish a population-level usage statistic.' },
            { title: 'Cultural Assumption Inventory', desc: 'Check name fields, reading direction, language switching, and payment conventions. A form should explain its requirements without assuming that every person shares the designer’s language or naming structure.' },
            { title: 'Edge Case Workshop', desc: 'Use role-play to find questions for research, then test with people who have relevant lived experience. Simulating an impairment can expose an awkward control; it cannot substitute for accessibility research.' },
          ]} />
        </CsSection>
        <CsSection id="cs-impact" label="03 &mdash; Impact on My Practice" title="Messy Became Default">
          <CsBody>
            <p>This course permanently changed how I design. Specific changes:</p>
            <p><strong>Payments:</strong> review language choice, fee clarity, and error recovery together. These became questions to bring into product work; this page does not establish their relative impact on trust.</p>
            <p><strong>Wearables:</strong> consider the companion app, physical controls, and glasses display together. Feedback needs to remain understandable while attention moves between the device and the environment.</p>
            <p><strong>Accessibility:</strong> check keyboard access, semantics, contrast, and reduced-motion behavior throughout implementation. These practices require ongoing testing and do not, by themselves, establish WCAG conformance.</p>
          </CsBody>
        </CsSection>
        <CsThanks />

        <BottomNav sections={[
          { id: 'cs-premise', label: 'Premise' },
          { id: 'cs-research', label: 'Research' },
          { id: 'cs-impact', label: 'Impact' },
        ]} />
      </main>
      <NextProject slug="raahi-project" title="Raahi" image="/Assets/images/raahi.jpg" />
      <Footer />
    </>
  )
}
