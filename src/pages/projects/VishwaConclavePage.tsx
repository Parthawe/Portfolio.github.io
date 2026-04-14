import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import CsSection from '../../components/case-study/CsSection'
import CsBody from '../../components/case-study/CsBody'
import CsThanks from '../../components/case-study/CsThanks'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'

export default function VishwaConclavePage() {
  return (
    <>
      <Helmet>
        <title>VishwaConclave &middot; Parth Pawar</title>
        <meta name="description" content="Creative direction, branding, and web design for VishwaConclave, one of India's first truly multidisciplinary student-centric conferences. From Junior Designer to Creative Director over three years." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="VishwaConclave · Parth Pawar" />
        <meta property="og:description" content="Creative direction, branding, and web design for India's first multidisciplinary student conference." />
        <meta property="og:image" content="https://parthpawar.com/Portfolio.github.io/Assets/Projects/VishwaConclave/1.jpg" />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#6B2FA0' } as React.CSSProperties}>

        <ProjectHeader
          backLink="/work"
          categorySlug="brand-visual"
          backLabel="Back to Work"
          tags={['Brand', 'Creative Direction', 'Web Design']}
          title="VishwaConclave"
          subtitle="From junior designer to creative director &mdash; building the visual identity for India&rsquo;s first multidisciplinary student conference over three years"
          info={[
            { label: 'Duration', value: 'Dec 2019 – May 2021' },
            { label: 'Role', value: 'Creative Director' },
            { label: 'Organization', value: 'Vishwakarma Institute of Technology, Pune' },
          ]}
        />

        {/* Hero image */}
        <section className="cs-slide reveal">
          <div className="wrap">
            <img src="/Portfolio.github.io/Assets/Projects/VishwaConclave/1.jpg" alt="VishwaConclave brand identity overview showing event posters across three years" loading="eager" />
          </div>
        </section>

        {/* Overview */}
        <CsSection id="cs-overview" label="Overview" title="Strategy Before Style">
          <CsBody>
            <p>VishwaConclave is amongst India&rsquo;s first truly multidisciplinary student-centric conferences, organized by the students of Vishwakarma Institute of Technology, Pune. The conference emphasizes curating an inspirational dialogue from exemplary orators who have excelled in domains centered on nation-building, along with facilitating their interaction with the student community.</p>
            <p>I joined as a Junior Designer in December 2019. Over the course of three years and five events, my responsibilities expanded to Creative Director &mdash; leading Marketing, Social Media, Aesthetics, Design, and Website. What started as executing speaker cards turned into owning the entire visual identity across campaigns, merchandise, recruitment, video production, and web experiences.</p>
          </CsBody>
        </CsSection>

        {/* Events timeline */}
        <CsSection id="cs-events" label="01 &mdash; Events" title="Five Events, Three Years">
          <CsBody>
            <p><strong>Event 00 &mdash; VishwaConclave Revisit (2019)</strong><br />The inaugural event set the tone. &ldquo;The greatest victory is not winning against people, but winning against self.&rdquo; The event was endorsed by Maharashtra&rsquo;s Chief Minister, and the gratifying success of VishwaConclave 2019 laid the groundwork for a larger vision.</p>
            <p><strong>Event 01 &mdash; Narrative (2019)</strong><br />A series of podcasts with real people whose inspirational stories help start conversations that give perspectives surpassing the prevailing notions. Featured speakers included Simon Taufel (cricket umpire), alongside bodyguards, martial arts trainers, businesswomen, and decision makers.</p>
            <p><strong>Event 04 &mdash; Crafting The Decade (2020)</strong><br />The 2020s as a decade of transformation, redistributed power, reimagined consumption, and enhanced technology. Featured speakers Mrinal Kulkarni and Rakesh Godhwani. The event pivoted to a virtual format post-Covid and turned out to be a successful digital-first conference.</p>
            <p><strong>Event 05 &mdash; Accelerate The Paradigm Shift (2021)</strong><br />The most ambitious event &mdash; full creative direction including domain design, video production, website development, social media campaigns, speaker identity systems, Amazon Prime sponsorship campaigns, merchandise design, and a musical experience. Featured Padmashree Uddhab Bharali among other speakers.</p>
          </CsBody>
        </CsSection>

        {/* Narrative & Revisit images */}
        <section className="cs-slide reveal">
          <div className="wrap">
            <img src="/Portfolio.github.io/Assets/Projects/VishwaConclave/2.jpg" alt="VishwaConclave Narrative and Revisit events — speaker cards, podcast series, and social media campaigns" loading="lazy" />
          </div>
        </section>

        {/* Crafting the Decade */}
        <section className="cs-slide reveal">
          <div className="wrap">
            <img src="/Portfolio.github.io/Assets/Projects/VishwaConclave/4.jpg" alt="VishwaConclave Crafting The Decade — speaker campaigns, recruiting team structure across 8 departments" loading="lazy" />
          </div>
        </section>

        {/* Scope */}
        <CsSection id="cs-scope" label="02 &mdash; Scope" title="What Creative Direction Looked Like">
          <CsBody>
            <p>By the final event, creative direction meant owning every touchpoint the audience encountered. The scope included:</p>
            <ul>
              <li><strong>Domain design</strong> &mdash; visual identity for each event theme, from typography to color systems</li>
              <li><strong>Video production</strong> &mdash; speaker announcement reels, event trailers, recap films</li>
              <li><strong>Website &amp; development</strong> &mdash; responsive event site with countdown timers, speaker bios, and registration flows</li>
              <li><strong>Social media campaigns</strong> &mdash; speaker reveal cards, story templates, engagement formats</li>
              <li><strong>Sponsorship collateral</strong> &mdash; Amazon Prime partnership campaign assets</li>
              <li><strong>Merchandise</strong> &mdash; event t-shirts, stickers, branded materials</li>
              <li><strong>Recruitment</strong> &mdash; visual system for 8 team departments (Aesthetics, Curation, Finance, Multimedia, PR &amp; Branding, Research &amp; Curation, Sponsorship, Video Editing)</li>
            </ul>
            <p>Building a team recruitment system was an unexpected design challenge. Each of the eight departments needed its own visual identity within the larger VishwaConclave brand &mdash; distinct enough to attract the right people, cohesive enough to feel like one organization.</p>
          </CsBody>
        </CsSection>

        {/* Paradigm Shift */}
        <section className="cs-slide reveal">
          <div className="wrap">
            <img src="/Portfolio.github.io/Assets/Projects/VishwaConclave/5.webp" alt="VishwaConclave Accelerate The Paradigm Shift — campaigns, website, speakers, merch, and musical experience" loading="lazy" />
          </div>
        </section>

        {/* Growth */}
        <CsSection id="cs-growth" label="03 &mdash; Growth" title="Junior Designer to Creative Director">
          <CsBody>
            <p>The VishwaConclave experience inspired me to stand out by conducting inspiring speaker-moderated sessions, which built my interest in joining and eventually leading the team. I was inspired by the insightful speakers who moderated sessions during the events &mdash; the ideologies presented were thought-provoking, and I wanted to collaborate with the highly driven and meticulous team to learn from them.</p>
            <p>Starting as a Junior Designer, over three years my responsibilities expanded to being in charge of Marketing, Social Media, Aesthetics, Design, and Website. The progression from executing individual assets to directing an entire creative team taught me that design leadership is less about making things look good and more about building systems that empower others to make things look good consistently.</p>
          </CsBody>
        </CsSection>

        {/* Signing off */}
        <section className="cs-slide reveal">
          <div className="wrap">
            <img src="/Portfolio.github.io/Assets/Projects/VishwaConclave/6.jpg" alt="Creative Director signing off — Parth Pawar in VishwaConclave merchandise" loading="lazy" />
          </div>
        </section>

        <CsThanks />

        <BottomNav sections={[
          { id: 'cs-overview', label: 'Overview' },
          { id: 'cs-events', label: 'Events' },
          { id: 'cs-scope', label: 'Scope' },
          { id: 'cs-growth', label: 'Growth' },
        ]} />

      </main>

      <NextProject slug="healthapp" title="Health App" image="/Portfolio.github.io/Assets/Projects/health-app/1.webp" />
      <Footer />
    </>
  )
}
