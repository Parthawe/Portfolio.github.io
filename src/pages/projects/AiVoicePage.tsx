import { Helmet } from 'react-helmet-async'
import NdaGate from '../../components/NdaGate'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import ProjectOverview from '../../components/case-study/ProjectOverview'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'

export default function AiVoicePage() {
  return (
    <>
      <Helmet>
        <title>AI Voice Selection &middot; Parth Pawar</title>
        <meta name="description" content="Redefining AI Voice Selection For Enterprise, Integrating Emotional Intelligence and Expressive Voice Selection through intuitive, emotionally intelligent interactions." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="AI Voice Interface · Parth Pawar" />
        <meta property="og:description" content="Redefining AI Voice Selection for Enterprise, emotional intelligence and expressive voice design." />
        <meta property="og:image" content="https://parthpawar.com/Portfolio.github.io/Assets/images/nda-cover.svg" />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#4A6FA5' } as React.CSSProperties}>

        <ProjectHeader
          backLink="/work"
          categorySlug="ai"
          backLabel="Back to Work"
          tags={['Product Design', 'AI', 'Voice UX', 'Enterprise']}
          title="Redefining AI Voice Selection For Enterprise"
          subtitle="Redesigned enterprise voice selection around tone, context, and emotional fit instead of static dropdowns and demo lists."
          info={[
            { label: 'Client', value: 'Voice AI client' },
            { label: 'Scope', value: 'Product Design' },
            { label: 'Role', value: 'Product Designer' },
            { label: 'Duration', value: '3 Months' },
            { label: 'Year', value: '2025' },
          ]}
        />

        <ProjectOverview
          sections={[
            {
              label: 'Summary',
              content: 'Enterprise voice platforms often treat selection as a settings problem: choose a name from a list, preview a clip, move on. This concept reframed it as a product-design problem where teams need to evaluate personality, fit, and confidence before they commit a voice to a brand or workflow.',
            },
            {
              label: 'The Challenges',
              content: 'The challenge was to make a technically sophisticated voice platform feel directional rather than overwhelming. The interface had to support fast evaluation, expressive exploration, and deeper customization without collapsing back into generic enterprise controls.',
            },
            {
              label: 'My Role',
              content: 'I defined the product direction for how users discover, compare, and shape voice personalities. That included the concept strategy, interaction systems, and the selection models used to translate abstract brand tone into a more confident decision flow.',
            },
            {
              label: 'Visible Outcome',
              content: 'The public section explains the product framing, the key interaction concepts, and the reasons the standard voice-picker model breaks down. The deeper research, system structure, and richer concept explorations are shared directly after access is approved.',
            },
          ]}
        />

        {/* Tools */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-label-row" style={{ borderBottom: 'none' }}>
              <span className="cs-label-row-key">Tools &amp; Techniques</span>
              <span className="cs-label-row-val">
                <span className="cs-tags" style={{ margin: 0 }}>
                  <span className="cs-tag-item">Figma</span>
                  <span className="cs-tag-item">AI</span>
                  <span className="cs-tag-item">User Research &amp; Testing</span>
                  <span className="cs-tag-item">Emotion-Centric UX Design</span>
                  <span className="cs-tag-item">Voice Prototyping</span>
                  <span className="cs-tag-item">User Flows</span>
                  <span className="cs-tag-item">User Study</span>
                  <span className="cs-tag-item">Workflow Optimization</span>
                </span>
              </span>
            </div>
          </div>
        </section>

        <NdaGate slug="ai-voice" />

        <BottomNav sections={[
          { id: 'cs-overview', label: 'Overview' },
        ]} />


      </main>

      <NextProject slug="ballah-code" title="Ballah Code" image="/Portfolio.github.io/Assets/images/ballah-code.webp" />
      <Footer />
    </>
  )
}
