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

export default function FlowFieldsPage() {
  return (
    <>
      <Helmet>
        <title>Flow Fields &middot; Parth Pawar</title>
        <meta name="description" content="A small generative-art study using Perlin noise, particle movement, and tuned visual constraints to create organic flow-field patterns." />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#4f8cff' } as React.CSSProperties}>
        <ProjectHeader
          backLink="/work"
          categorySlug="creative-tech"
          backLabel="Back to Work"
          tags={['Generative Art', 'p5.js', 'Perlin Noise']}
          title="Flow Fields"
          subtitle="A compact generative-art study about turning invisible vector fields into visible motion"
          info={[
            { label: 'Context', value: 'Creative coding study' },
            { label: 'Year', value: '2024' },
            { label: 'Role', value: 'Creative coder' },
            { label: 'Tools', value: 'p5.js, JavaScript, noise fields' },
          ]}
          heroImage="/Assets/images/flow-fields.svg"
          heroAlt="Abstract flow-field pattern made from dense moving particles."
        />

        <CsSection id="cs-glimpse" label="01 &mdash; Glimpse" title="Make the Field Legible">
          <CsBody>
            <p>The problem was simple: a flow field is mathematically interesting, but invisible until something moves through it. I wanted the viewer to feel the shape of that hidden system without needing an explanation of vectors, noise, or simulation.</p>
            <p>The method was to release thousands of particles into a Perlin-noise field, then tune speed, opacity, reset behavior, and color so the system revealed currents instead of becoming visual static.</p>
          </CsBody>
        </CsSection>

        <CsSection id="cs-learnings" label="02 &mdash; Learning" title="What I Learned">
          <CsFeatureGrid features={[
            {
              title: 'Rules shape the feeling',
              desc: 'Small changes to velocity, trail length, and particle lifetime changed the emotional tone of the piece more than color did.',
            },
            {
              title: 'Constraint beats decoration',
              desc: 'The sketch worked best when I removed extra styling and let the motion expose the structure of the field.',
            },
            {
              title: 'Systems need pacing',
              desc: 'A generative piece still needs rhythm. Reset timing and density control kept the image alive without becoming chaotic.',
            },
          ]} />
        </CsSection>

        <CsSection id="cs-impact" label="03 &mdash; Impact" title="Why It Stays in the Portfolio">
          <CsBody>
            <p>This is a small project, so it should stay small. Its value is not a big case study; it shows a useful habit: turning an abstract system into something readable through motion, feedback, and restraint.</p>
          </CsBody>
        </CsSection>

        <CsThanks />

        <BottomNav sections={[
          { id: 'cs-glimpse', label: 'Glimpse' },
          { id: 'cs-learnings', label: 'Learning' },
          { id: 'cs-impact', label: 'Impact' },
        ]} />
      </main>

      <NextProject slug="embodied-web" title="Embodied Web" image="/Assets/images/embodied-web.svg" />
      <Footer />
    </>
  )
}
