import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import CsSection from '../../components/case-study/CsSection'
import CsBody from '../../components/case-study/CsBody'
import CsImage from '../../components/case-study/CsImage'
import CsStatGrid from '../../components/case-study/CsStatGrid'
import CsCredits from '../../components/case-study/CsCredits'
import CsThanks from '../../components/case-study/CsThanks'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'

export default function IbmPage() {
  return (
    <>
      <Helmet>
        <title>IBM Cancer Prognosis &middot; Parth Pawar</title>
        <meta name="description" content="Research internship at IBM exploring homomorphic encryption for secure genomic data transfer to identify cancer patient life expectancy without exposing personal health information." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="IBM Cancer Prognosis · Parth Pawar" />
        <meta property="og:description" content="Securely transfer genomic data and identify life expectancy of cancer patients using homomorphic encryption." />
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
          subtitle="Designing a safer way to compute on genomic data, so prognosis models could learn without exposing the patient behind the record"
          info={[
            { label: 'Client', value: 'IBM' },
            { label: 'Duration', value: '8 Months' },
            { label: 'Role', value: 'Research & Engineer' },
            { label: 'Year', value: '2020' },
          ]}
        />

        {/* Hero */}
        <section className="cs-slide reveal">
          <div className="wrap">
            <img src="/Portfolio.github.io/Assets/Projects/CancerPrognosis/photos/hero-illustration.png" alt="Illustration: a line of people walking along a lit path toward a glowing open door" loading="eager" />
          </div>
        </section>

        {/* Overview */}
        <CsSection id="cs-overview" label="Overview" title="Why This Work Mattered">
          <CsBody>
            <p>Cancer prognosis models need access to genomic data, but the more useful that data becomes, the more dangerous it is to expose. Traditional encryption protects records at rest and in transit. The weak point is computation itself, because most systems still decrypt the data before they can analyze it.</p>
            <p>This internship at IBM focused on a harder question: could we keep patient data encrypted through the full prediction pipeline and still produce clinically useful outputs? That made the project as much about trust and system design as it was about machine learning.</p>
          </CsBody>
        </CsSection>

        {/* Problem */}
        <CsSection id="cs-problem" label="01 · Problem" title="The Privacy Paradox">
          <CsBody>
            <p>Most clinical AI pipelines promise privacy, but that promise breaks the moment raw genomic data reaches a server for analysis. At that point, the service can inspect traits, infer identity, and expose some of the most sensitive information a patient can share.</p>
            <p>The design challenge was to remove that compromise. The system needed to preserve model usefulness while ensuring the computation layer never had access to the unencrypted genome it was learning from.</p>
          </CsBody>
        </CsSection>

        {/* Problem statement diagram */}
        <section className="cs-slide reveal">
          <div className="wrap">
            <img src="/Portfolio.github.io/Assets/Projects/ibm/3.jpg" alt="Problem statement diagram: genomic data leaves the hospital over an encrypted channel, but the server decrypts it for computation, exposing personal data to the third-party service" loading="lazy" decoding="async" />
          </div>
        </section>

        {/* Solution */}
        <CsSection id="cs-solution" label="02 · Solution" title="Compute Without Decrypting">
          <CsBody>
            <p>The core bet was homomorphic encryption: a way to run meaningful computation on encrypted data and only decrypt the final result. In simple terms, the model gets to work on the signal without ever seeing the patient in the clear.</p>
            <p>We structured the pipeline in stages. Clinical and genomic inputs were first prepared through feature selection and validation. The selected data was then encrypted with IBM&rsquo;s FHE toolkit, passed through a neural-network workflow, and only decrypted at the point where downstream analysis, clustering, and survival-curve generation needed to be interpreted. The point was not just technical novelty. It was to design a path where privacy remained intact for as long as possible.</p>
          </CsBody>
        </CsSection>

        {/* System flow */}
        <section className="cs-slide reveal">
          <div className="wrap">
            <img src="/Portfolio.github.io/Assets/Projects/ibm/4.jpg" alt="System flow diagram: patient data is preprocessed with random forest feature selection, encrypted with the FHE toolkit, gene scores are computed homomorphically by a neural network, then decrypted, clustered with k-means, and plotted as Kaplan-Meier curves" loading="lazy" decoding="async" />
          </div>
        </section>

        {/* Encryption detail */}
        <section className="cs-slide reveal">
          <div className="wrap">
            <img src="/Portfolio.github.io/Assets/Projects/ibm/5.jpg" alt="Homomorphic encryption diagram: data enters the neural network's hidden layers without being decrypted, and the encrypted output is unlocked only to plot the Kaplan-Meier curve" loading="lazy" decoding="async" />
          </div>
        </section>

        {/* Role */}
        <CsSection id="cs-role" label="03 · My Role" title="Research, Analysis, and System Framing">
          <CsBody>
            <p>My role sat between research and implementation. I worked on understanding the clinical workflow, shaping how the data pipeline should behave, analyzing the genomic inputs, and helping translate the cryptography constraints into a usable prediction system.</p>
            <p>The value of the project was not a polished interface. It was the system logic underneath: what should be encrypted, when it could safely be transformed, how the model output should be interpreted, and where trust could fail if the pipeline was careless.</p>
          </CsBody>
          <div className="cs-label-row">
            <span className="cs-label-row-key">Scope</span>
            <span className="cs-label-row-val">Research, UX, Engineering</span>
          </div>
          <div className="cs-label-row">
            <span className="cs-label-row-key">Tools</span>
            <span className="cs-label-row-val">FHE Toolkit, Python, Java, Neural Networks, Kaplan-Meier</span>
          </div>
        </CsSection>

        {/* Results */}
        <CsSection id="cs-results" label="04 · Results" title="Encrypted In, Useful Out">
          <CsBody>
            <p>The pipeline produced Kaplan-Meier cluster plots: survival curves for seven treatment groups, computed from data that stayed encrypted through the model. The clusters describe how life expectancy differs depending on which group a patient falls into.</p>
            <p>The cost of privacy was measured in seconds, not usefulness. Running the encrypted transfer added a fixed overhead on both ends of the pipeline.</p>
          </CsBody>
          <div style={{ marginTop: 'var(--space-5)' }}>
            <CsImage
              src="/Portfolio.github.io/Assets/Projects/CancerPrognosis/photos/km-clusters-dark.jpg"
              alt="Kaplan-Meier clusters plot: survival probability over time for seven treatment groups, each curve labeled in the legend"
              caption="Kaplan-Meier clusters plot — survival curves for the seven treatment groups produced by the encrypted pipeline."
            />
          </div>
          <CsBody style={{ marginTop: 'var(--space-3)' }}>
            <p>Read plainly, the seven clusters function as risk groups: the curve a patient&rsquo;s data falls into indicates how their expected survival differs from the other groups, which is what makes the output usable for prognosis.</p>
          </CsBody>
          <CsStatGrid stats={[
            { label: 'Client running time, encrypted transfer', value: '42s' },
            { label: 'Server running time, encrypted transfer', value: '28s' },
          ]} />
        </CsSection>

        {/* Credits */}
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
          { id: 'cs-overview', label: 'Overview' },
          { id: 'cs-problem', label: 'Problem' },
          { id: 'cs-solution', label: 'Solution' },
          { id: 'cs-role', label: 'Role' },
          { id: 'cs-results', label: 'Results' },
        ]} />

      </main>

      <NextProject slug="oncall-lens" title="OnCall Lens" image="/Portfolio.github.io/Assets/images/oncall-lens.webp" />
      <Footer />
    </>
  )
}
