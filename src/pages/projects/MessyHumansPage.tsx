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
          subtitle="Course research notes on distraction, anxiety, language, and access in everyday interfaces."
          info={[
            { label: 'Context', value: 'Designing for Messy Humans, NYU ITP' },
            { label: 'Year', value: '2023' },
            { label: 'Role', value: 'Design Researcher' },
            { label: 'Methods', value: 'Contextual Inquiry, Diary Studies, Inclusive Audits' },
          ]}
        />
        <CsSection id="cs-premise" label="01 &mdash; Premise" title="Designing for the moment of use">
          <CsBody>
            <p>Someone may use a product while tired, anxious, distracted, using one hand, or switching languages. These course notes turn those conditions into questions for an interface review.</p>
            <p>This page records review prompts and reflections, rather than a comparative usability study or accessibility certification.</p>
          </CsBody>
        </CsSection>
        <CsSection id="cs-research" label="02 &mdash; Research" title="Four questions for a design review">
          <CsFeatureGrid features={[
  {
    "title": "Can the primary action still be reached?",
    "desc": "Review one-handed use, bright sunlight, noise, and distraction. Check reach, readable feedback, and alternatives to a single input mode."
  },
  {
    "title": "Can someone review and recover?",
    "desc": "For an anxious payment interaction, keep amounts and fees clear, allow a review before committing, and make errors recoverable."
  },
  {
    "title": "Whose conventions does the form assume?",
    "desc": "Check name fields, reading direction, language switching, and payment conventions. Explain requirements without assuming a single naming or language structure."
  },
  {
    "title": "Who needs to take part in the research?",
    "desc": "Use role-play to identify questions, then involve people with relevant lived experience. Simulating an impairment cannot replace accessibility research."
  }
]} />
        </CsSection>
        <CsSection id="cs-impact" label="03 &mdash; Impact on My Practice" title="Applying the questions">
          <CsBody>
            <p><strong>Payments:</strong> review language, fees, and recovery together.</p>
            <p><strong>Wearables:</strong> check whether feedback remains understandable as attention moves between the companion app, physical controls, glasses, and surroundings.</p>
            <p><strong>Implementation:</strong> test keyboard access, semantics, contrast, and reduced motion throughout the build.</p>
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
