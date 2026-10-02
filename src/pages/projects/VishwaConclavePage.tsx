import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import CsExpandPreview from '../../components/case-study/CsExpandPreview'
import CsSection from '../../components/case-study/CsSection'
import CsBody from '../../components/case-study/CsBody'
import CsImage from '../../components/case-study/CsImage'
import CsThanks from '../../components/case-study/CsThanks'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'

export default function VishwaConclavePage() {
  return (
    <>
      <Helmet>
        <title>VishwaConclave &middot; Parth Pawar</title>
        <meta name="description" content="Creative direction, branding, and web design for VishwaConclave, a multidisciplinary student-led conference. From Junior Designer to Creative Director over three years." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="VishwaConclave · Parth Pawar" />
        <meta property="og:description" content="Creative direction, branding, and web design for a multidisciplinary student-led conference." />
        <meta property="og:image" content="https://designwhich.works/Assets/Projects/VishwaConclave/1.jpg" />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#7B2FBF' } as React.CSSProperties}>

        <ProjectHeader
          backLink="/work"
          categorySlug="brand-visual"
          backLabel="Back to Work"
          tags={['Brand', 'Creative Direction', 'Web Design']}
          showHeaderSummary={false}
          heroImage="/Assets/Projects/VishwaConclave/1.jpg"
          heroAlt="VishwaConclave identity and event posters across 2019–2021"
          title="VishwaConclave"
          subtitle="Three years of conference identity and event work, from junior designer to creative director."
          info={[
            { label: 'Duration', value: 'Dec 2019 – May 2021' },
            { label: 'Role', value: 'Junior designer → Creative director' },
            { label: 'Organization', value: 'Vishwakarma Institute of Technology, Pune' },
          ]}
        />

        {/* Overview */}
        <CsSection id="cs-overview" label="Overview" title="From individual assets to creative direction">
          <CsBody>
            <p>VishwaConclave is a multidisciplinary student-led conference organized by students at Vishwakarma Institute of Technology, Pune. The event brings speakers from different fields into conversation with the student community, so the design system had to make each theme feel distinct while still belonging to one larger platform.</p>
            <p>I joined as a Junior Designer in 2019. Across three years and five events, I grew into Creative Director for marketing, social, aesthetics, design, and web.</p>
            <p>What started with speaker cards became ownership of the full identity across campaigns, merchandise, recruitment, video, and digital experiences.</p>
          </CsBody>
        </CsSection>

        <CsExpandPreview
          cta="Open the campaign archive"
          note="Event timeline, identity systems, campaign assets, scope, growth notes, and final sign-off."
        >
        <CsSection id="cs-events" label="Events" title="Selected events, 2019–2021">
          <CsBody>
            <h3>2019 · Revisit and Narrative</h3>
            <p>The inaugural conference and the Narrative conversation series needed speaker cards, podcast artwork, and social campaigns. These boards show the early event identities.</p>
          </CsBody>
          <CsImage src="/Assets/Projects/VishwaConclave/2.jpg" alt="Narrative and Revisit speaker cards, podcast artwork, and social campaigns" caption="2019: speaker and conversation formats within the event identity." />
          <CsBody>
            <h3>2020 · Crafting the Decade</h3>
            <p>The conference moved to a virtual format. The design work extended across speaker campaigns and recruitment material for eight team departments.</p>
          </CsBody>
          <CsImage src="/Assets/Projects/VishwaConclave/4.jpg" alt="Crafting the Decade speaker campaigns and recruitment structure" caption="2020: event communication and team recruitment within one system." />
          <CsBody>
            <h3>2021 · Accelerate the Paradigm Shift</h3>
            <p>My scope expanded to creative direction across the website, speaker campaigns, sponsorship collateral, merchandise, video, and musical experience.</p>
          </CsBody>
          <CsImage src="/Assets/Projects/VishwaConclave/5.webp" alt="Accelerate the Paradigm Shift campaigns, website, speaker material, and merchandise" caption="2021: the identity extends across digital communication and physical event material." />
        </CsSection>

        {/* Scope */}
        <CsSection id="cs-scope" label="02 &mdash; Scope" title="The scope of creative direction">
          <CsBody>
            <p>By the final event, creative direction meant owning every touchpoint the audience encountered. The scope included:</p>
            <ul className="cs-list">
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

        {/* Growth */}
        <CsSection id="cs-growth" label="03 &mdash; Growth" title="Junior Designer to Creative Director">
          <CsBody>
            <p>I started by making individual assets, then gradually took responsibility for the system around them: campaign direction, social media, event aesthetics, design operations, and the website. The shift was not just more output; it was learning how to make a team move with one visual language.</p>
            <p>That progression taught me that design leadership is less about making every artifact personally and more about building a clear system that lets other people create consistently.</p>
          </CsBody>
        </CsSection>

        {/* Signing off */}
        <section className="cs-slide reveal">
          <div className="wrap">
            <img data-project-preview src="/Assets/Projects/VishwaConclave/6.jpg" alt="Creative Director signing off — Parth Pawar in VishwaConclave merchandise" loading="lazy" />
          </div>
        </section>

        <CsThanks />

        </CsExpandPreview>

        <BottomNav sections={[
          { id: 'cs-overview', label: 'Overview' },
          { id: 'cs-events', label: 'Events' },
          { id: 'cs-scope', label: 'Scope' },
          { id: 'cs-growth', label: 'Growth' },
        ]} />

      </main>

      <NextProject slug="mentra" title="Mentra" image="/Assets/mockups/projects/mentra_16x9.webp" />
      <Footer />
    </>
  )
}
