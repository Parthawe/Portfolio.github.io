import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import CsSection from '../../components/case-study/CsSection'
import CsBody from '../../components/case-study/CsBody'
import CsImage from '../../components/case-study/CsImage'
import CsStatGrid from '../../components/case-study/CsStatGrid'
import CsFeatureGrid from '../../components/case-study/CsFeatureGrid'
import CsCredits from '../../components/case-study/CsCredits'
import CsThanks from '../../components/case-study/CsThanks'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'

export default function IbmPage() {
  return (
    <>
      <Helmet>
        <title>IBM Cancer Prognosis &middot; Parth Pawar</title>
        <meta name="description" content="A compact glimpse of an IBM research internship exploring homomorphic encryption for cancer prognosis without exposing genomic data." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="IBM Cancer Prognosis · Parth Pawar" />
        <meta property="og:description" content="Research glimpse: encrypted genomic computation, prognosis clusters, and what I learned about privacy-preserving AI." />
        <meta property="og:image" content="https://parthawe.github.io/Portfolio.github.io/Assets/Projects/CancerPrognosis/photos/hero-illustration.png" />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#6929C4' } as React.CSSProperties}>
        <ProjectHeader
          backLink="/work"
          categorySlug="ux-design"
          backLabel="Back to Work"
          tags={['Research', 'Healthcare AI', 'Encryption']}
          title="IBM Cancer Prognosis"
          subtitle="A research glimpse into computing on sensitive genomic data without exposing the patient record"
          info={[
            { label: 'Client', value: 'IBM' },
            { label: 'Role', value: 'Research & Engineering' },
            { label: 'Duration', value: '8 Months' },
            { label: 'Year', value: '2020' },
          ]}
        />

        <section className="cs-slide reveal">
          <div className="wrap">
            <img src="/Portfolio.github.io/Assets/Projects/CancerPrognosis/photos/hero-illustration.png" alt="Illustration of people walking toward a glowing open door" loading="eager" />
          </div>
        </section>

        <CsSection id="cs-glimpse" label="Glimpse" title="Encrypted Data, Useful Prognosis">
          <CsBody>
            <p>This project is a research glimpse, not a polished product case study. During an IBM internship, our team explored whether cancer prognosis workflows could compute on genomic data while keeping the raw patient record encrypted. The useful story is the system constraint: privacy should not disappear the moment analysis begins.</p>
          </CsBody>
          <div className="cs-label-row">
            <span className="cs-label-row-key">Problem</span>
            <span className="cs-label-row-val">Genomic data is clinically valuable, but exposing it during computation creates serious privacy risk.</span>
          </div>
          <div className="cs-label-row">
            <span className="cs-label-row-key">Method</span>
            <span className="cs-label-row-val">Use homomorphic encryption so selected genomic features could pass through analysis without being decrypted mid-pipeline.</span>
          </div>
          <div className="cs-label-row" style={{ borderBottom: 'none' }}>
            <span className="cs-label-row-key">Result</span>
            <span className="cs-label-row-val">A research pipeline that produced survival-cluster outputs while keeping sensitive data protected through the key computation step.</span>
          </div>
        </CsSection>

        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/ibm/4.jpg" alt="Encrypted cancer prognosis system flow diagram" loading="lazy" decoding="async" /></div>
              <div className="cs-img reveal"><img src="/Portfolio.github.io/Assets/Projects/ibm/5.jpg" alt="Homomorphic encryption model diagram for prognosis workflow" loading="lazy" decoding="async" /></div>
            </div>
          </div>
        </section>

        <CsSection id="cs-result" label="Result" title="What Came Out">
          <CsBody>
            <p>The output was not a consumer interface. It was evidence that the encrypted workflow could still produce interpretable prognosis groups. The Kaplan-Meier cluster plot became the clearest artifact because it showed the final clinical-style interpretation rather than only the encryption mechanics.</p>
          </CsBody>
          <CsImage
            src="/Portfolio.github.io/Assets/Projects/CancerPrognosis/photos/km-clusters-dark.jpg"
            alt="Kaplan-Meier survival cluster plot for seven prognosis groups"
            caption="Kaplan-Meier clusters - the useful output of the pipeline, showing survival probability across seven groups."
          />
          <CsStatGrid stats={[
            { label: 'Encrypted client runtime', value: '42s' },
            { label: 'Encrypted server runtime', value: '28s' },
          ]} />
        </CsSection>

        <CsSection id="cs-learning" label="Learning" title="What I Learned">
          <CsFeatureGrid features={[
            { title: 'Privacy is a system property', desc: 'It is not enough to encrypt data in storage. The risky moment is often the computation itself.' },
            { title: 'Trust needs diagrams', desc: 'For complex technical work, the system flow is part of the UX because it helps reviewers understand where risk enters and exits.' },
            { title: 'Research can still tell a small story', desc: 'The project does not need a fake product narrative. The story is the constraint, the method, and the interpretable output.' },
          ]} />
        </CsSection>

        <section className="cs-section reveal">
          <div className="wrap">
            <CsCredits credits={[
              { role: 'IBM Mentors', name: 'Amrin, Varsha' },
              { role: 'College Mentor', name: 'Virendra Pawar' },
              { role: 'Research', name: 'Parth Pawar' },
              { role: 'Engineers', name: 'Sakshi Oswal, Mitanshu Bhoot, Saurabh Rane, Tarun Meditya' },
            ]} />
          </div>
        </section>

        <CsThanks />

        <BottomNav sections={[
          { id: 'cs-glimpse', label: 'Glimpse' },
          { id: 'cs-result', label: 'Result' },
          { id: 'cs-learning', label: 'Learning' },
        ]} />
      </main>

      <NextProject slug="oncall-lens" title="OnCall Lens" image="/Portfolio.github.io/Assets/images/oncall-lens.webp" />
      <Footer />
    </>
  )
}
