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
        <CsExpandPreview>
        <CsSection id="cs-premise" label="01 &mdash; Premise" title="Personas Are Clean. People Are Not.">
          <CsBody>
            <p>Design education teaches you to create personas: &ldquo;Sarah, 28, marketing manager, uses an iPhone, has 2.3 apps for productivity.&rdquo; These personas are useful fictions. They are also dangerously clean. Real Sarah is exhausted from a newborn, scrolling at 2am with one hand, her screen brightness at minimum to not wake the baby, and she&rsquo;s trying to pay rent on an app that requires two-factor authentication.</p>
            <p>This course dismantles the clean persona and designs for the messy reality: situational disabilities, emotional extremes, cognitive overload, cultural assumptions, and the edge cases that mainstream design ignores.</p>
          </CsBody>
        </CsSection>
        <CsSection id="cs-research" label="02 &mdash; Research" title="What We Found">
          <CsFeatureGrid features={[
            { title: 'Situational Disability Audit', desc: 'We audited 5 popular apps (Venmo, Uber, Duolingo, MyFitnessPal, Headspace) for situational disabilities: one-handed use, bright sunlight, noisy environments, emotional distress. Every app failed at least 3 of 5 scenarios. The most common failure: tiny touch targets that are unreachable with one thumb.' },
            { title: 'Emotional State Mapping', desc: 'Diary study with 12 participants tracking emotional state when using digital products. Key finding: 40% of app usage happens during negative emotional states (boredom, anxiety, loneliness). Yet almost no apps adapt their interface for distressed users. A banking app showing a large negative balance to someone already anxious is actively harmful design.' },
            { title: 'Cultural Assumption Inventory', desc: 'Catalogued 30+ Western cultural assumptions embedded in common UI patterns: left-to-right reading, English-first error messages, credit-card-shaped payment forms, name fields that don\'t support single names or non-Latin characters. For each assumption, we proposed an inclusive alternative.' },
            { title: 'Edge Case Workshop', desc: 'Facilitated a workshop where designers role-played extreme users: a person with tremors trying to use a slider, a non-native English speaker reading error messages, a person in crisis calling a suicide hotline app. The exercise revealed that edge cases aren\'t edge — they\'re just cases that happen to people other than the designer.' },
          ]} />
        </CsSection>
        <CsSection id="cs-impact" label="03 &mdash; Impact on My Practice" title="Messy Became Default">
          <CsBody>
            <p>This course permanently changed how I design. Specific changes:</p>
            <p><strong>ZentiPay&rsquo;s multilingual onboarding</strong> — supporting Hindi, Spanish, Tagalog, and Arabic with RTL layouts wasn&rsquo;t an afterthought. It was a first-principles decision because the research showed that language switching is the #1 trust barrier for migrant workers.</p>
            <p><strong>Mentra&rsquo;s large touch targets</strong> — smart glasses have tiny displays. But the real constraint is that users are often in motion, distracted, or wearing gloves. Every interaction was designed for the worst-case input scenario, not the best.</p>
            <p><strong>This portfolio&rsquo;s accessibility</strong> — WCAG AA compliance, prefers-reduced-motion support, keyboard navigation, semantic HTML. Not because it&rsquo;s required, but because I now understand that accessibility is not an add-on. It&rsquo;s the floor.</p>
          </CsBody>
        </CsSection>
        <CsThanks />
        </CsExpandPreview>

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
