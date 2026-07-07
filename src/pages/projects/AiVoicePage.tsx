import { Helmet } from 'react-helmet-async'
import NdaGate from '../../components/NdaGate'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import NdaPublicStory from '../../components/case-study/NdaPublicStory'
import NdaProcess from '../../components/case-study/NdaProcess'
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
        <meta property="og:image" content="https://parthawe.github.io/Portfolio.github.io/Assets/images/nda-cover.svg" />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#4A6FA5' } as React.CSSProperties}>

        <ProjectHeader
          backLink="/work"
          categorySlug="ai"
          backLabel="Back to Work"
          tags={['Product Design', 'AI', 'Voice UX', 'Enterprise']}
          title="Redefining AI Voice Selection For Enterprise"
          subtitle="Reframed enterprise voice selection around tone, context, and emotional fit instead of static demo lists."
          info={[
            { label: 'Client', value: 'Undisclosed (NDA)' },
            { label: 'Scope', value: 'Product Design' },
            { label: 'Role', value: 'Product Designer' },
            { label: 'Year', value: '2025' },
          ]}
        />

        <NdaPublicStory
          slug="ai-voice"
          headline="Voice choice as product judgment."
          lede="The public glimpse shows the core shift: choosing an AI voice is not a dropdown problem, it is a confidence problem."
        />

        <NdaProcess
          decisions={[
            {
              move: 'Reframed voice selection from a dropdown into a confidence decision.',
              why: 'Enterprise buyers are not picking a voice, they are deciding whether to trust it in front of their customers. I designed the choice around tone, context, and emotional fit so the decision matched what was actually at stake.',
            },
            {
              move: 'Replaced static demo lists with context-aware comparison.',
              why: 'A flat list of samples tells you nothing about fit. I let people evaluate voices against the situation they would be used in, turning a guess into an informed, defensible choice.',
            },
            {
              move: 'Designed for the enterprise approval reality, not a solo user.',
              why: 'These decisions get reviewed by teams. I made the reasoning behind a chosen voice visible and shareable so it could survive stakeholder scrutiny, not just one person’s taste.',
            },
          ]}
          shift={{
            before: 'A dropdown of voice samples that left buyers guessing about real-world fit.',
            after: 'A selection experience framed around tone, context, and enterprise confidence.',
          }}
        />

        <NdaGate slug="ai-voice" />

        <BottomNav sections={[
          { id: 'cs-public-story', label: 'Glimpse' },
          { id: 'cs-process', label: 'Process' },
          { id: 'case-study-access-ai-voice', label: 'Access' },
        ]} placement="side" />


      </main>

      <NextProject slug="ballah-code" title="Ballah Code" image="/Portfolio.github.io/Assets/images/ballah-code.webp" />
      <Footer />
    </>
  )
}
