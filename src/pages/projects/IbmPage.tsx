import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import CsSection from '../../components/case-study/CsSection'
import CsBody from '../../components/case-study/CsBody'
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
        <meta property="og:image" content="https://parthpawar.com/Assets/Projects/CancerPrognosis/photos/hero-illustration.png" />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#054ADA' } as React.CSSProperties}>

        <ProjectHeader
          backLink="/work"
          categorySlug="ux-design"
          backLabel="Back to Work"
          tags={['Research', 'Healthcare AI', 'Encryption']}
          title="IBM Cancer Prognosis"
          subtitle="Helping to secure cancer research &mdash; homomorphic encryption for genomic data transfer and survival prediction"
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
            <img src="/Assets/Projects/CancerPrognosis/photos/hero-illustration.png" alt="IBM Cancer Prognosis — Helping To Secure Cancer Research" loading="eager" />
          </div>
        </section>

        {/* Overview */}
        <CsSection id="cs-overview" label="Overview" title="Securing Genomic Computation">
          <CsBody>
            <p>The most important clinical process for patients with forms of cancer is the accurate estimation of prognosis and survival duration. Patients who volunteer their genomic data run the risk of privacy invasion. Established encryption techniques such as Advanced Encryption Standard (AES) can secure Personal Health Information (PHI) in acquisition and storage, but can only assure secure storage. Ensuring data privacy in computation is a greater challenge.</p>
            <p>This 8-month research internship at IBM explored how to securely transfer genomic data and identify life expectancy of cancer patients &mdash; computing on encrypted data without ever decrypting it.</p>
          </CsBody>
        </CsSection>

        {/* Summary image */}
        <section className="cs-slide reveal">
          <div className="wrap">
            <img src="/Assets/Projects/CancerPrognosis/photos/patient-hospital.png" alt="Project summary — challenges, role, and tools including FHE Toolkit, Homomorphic Encryption, Neural Networks, Python, Java" loading="lazy" />
          </div>
        </section>

        {/* Problem */}
        <CsSection id="cs-problem" label="01 &mdash; Problem" title="The Privacy Paradox">
          <CsBody>
            <p>When genomic data is sent to a server for computation, it must typically be decrypted for processing. This creates a critical vulnerability: third-party services gain access to personal information, can reveal physical traits like eye and skin color, and enable identification of individuals. The data exchange channel may be encrypted in transit, but the server itself sees the raw data.</p>
            <p>The challenge was to make the neural network system both accurate in its cancer prognosis predictions and secure in its handling of sensitive genomic information &mdash; computing meaningful results on data that remains encrypted throughout the entire pipeline.</p>
          </CsBody>
        </CsSection>

        {/* Problem statement diagram */}
        <section className="cs-slide reveal">
          <div className="wrap">
            <img src="/Assets/Projects/CancerPrognosis/photos/genomic-data.png" alt="Problem statement flow — genomic data through encrypted channel to server, showing vulnerability when data is unencrypted during computation" loading="lazy" />
          </div>
        </section>

        {/* Solution */}
        <CsSection id="cs-solution" label="02 &mdash; Solution" title="Homomorphic Encryption Pipeline">
          <CsBody>
            <p>Homomorphic encryption is a form of encryption that allows performing computations on encrypted data without ever decrypting it. The result, when decrypted, matches what you would get from computing on the unencrypted data. This was the key insight that made the entire system possible.</p>
            <p>The system flow processes unencrypted patient data (genomic and clinical) through preprocessing with Random Forest and K-Fold Validation for feature selection. The data is then encrypted using IBM&rsquo;s Fully Homomorphic Encryption (FHE) Toolkit with public key cryptography. A neural network calculates gene scores homomorphically &mdash; on the encrypted data itself. After homomorphic decryption, K-Means clustering groups patients, and the system plots Kaplan-Meier survival curves to recommend cancer therapy.</p>
          </CsBody>
        </CsSection>

        {/* System flow */}
        <section className="cs-slide reveal">
          <div className="wrap">
            <img src="/Assets/Projects/CancerPrognosis/photos/neural-network.png" alt="System flow — from unencrypted data through FHE encryption, neural network computation on encrypted data, decryption, clustering, and Kaplan-Meier survival curves" loading="lazy" />
          </div>
        </section>

        {/* Encryption detail */}
        <section className="cs-slide reveal">
          <div className="wrap">
            <img src="/Assets/Projects/CancerPrognosis/photos/system-architecture.png" alt="Homomorphic encryption in detail — unencrypted data passes through neural network hidden layers while remaining encrypted, outputting Kaplan-Meier curves" loading="lazy" />
          </div>
        </section>

        {/* Role */}
        <CsSection id="cs-role" label="03 &mdash; My Role" title="Research &amp; Engineering">
          <CsBody>
            <p>As a researcher, my responsibilities revolved around collecting data on cancer patients, genomic data, and analyzing the data to be fed to the neural network securely. We were successfully able to securely transfer genomic data and help to identify the life expectancy of cancer patients and suggest treatments to them.</p>
            <p>The scope covered the full pipeline: user research into clinical workflows, data analysis and preprocessing, implementing homomorphic encryption using IBM&rsquo;s FHE Toolkit, designing the system flow architecture, and validating the neural network&rsquo;s accuracy against unencrypted baselines.</p>
          </CsBody>
          <div className="cs-label-row">
            <span className="cs-label-row-key">Scope</span>
            <span className="cs-label-row-val">Research, UX, Engineering</span>
          </div>
          <div className="cs-label-row">
            <span className="cs-label-row-key">Tools</span>
            <span className="cs-label-row-val">FHE Toolkit, Python, Java, Neural Networks, Kaplan-Meier</span>
          </div>
          <div className="cs-label-row">
            <span className="cs-label-row-key">Methods</span>
            <span className="cs-label-row-val">User Research, Data Analysis, Homomorphic Encryption, System Flow</span>
          </div>
        </CsSection>

        {/* Results */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="cs-img reveal"><img src="/Assets/Projects/CancerPrognosis/photos/research-diagram.png" alt="Research methodology: encrypted data flow through neural network layers" loading="lazy" /></div>
              <div className="cs-img reveal"><img src="/Assets/Projects/CancerPrognosis/photos/survival-curves.png" alt="Kaplan-Meier survival curves: 7 treatment groups over time" loading="lazy" /></div>
            </div>
          </div>
        </section>

        <CsThanks />

        <BottomNav sections={[
          { id: 'cs-overview', label: 'Overview' },
          { id: 'cs-problem', label: 'Problem' },
          { id: 'cs-solution', label: 'Solution' },
          { id: 'cs-role', label: 'Role' },
        ]} />

      </main>

      <NextProject slug="sculpture" title="Sculpture" image="/Assets/Projects/Sculpture/1.jpg" />
      <Footer />
    </>
  )
}
