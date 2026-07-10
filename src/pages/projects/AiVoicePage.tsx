import { Helmet } from 'react-helmet-async'
import NdaGate from '../../components/NdaGate'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import NdaPublicStory from '../../components/case-study/NdaPublicStory'
import NdaProcess from '../../components/case-study/NdaProcess'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'

const AI_VOICE_PROCESS_VISUALS = [
  {
    src: '/Portfolio.github.io/Assets/mockups/projects/ai-voice_16x9.webp',
    alt: 'AI Voice Selection product mockup showing an enterprise voice interface.',
    label: 'Voice selection surface',
  },
]

export default function AiVoicePage() {
  return (
    <>
      <Helmet>
        <title>AI Voice Selection &middot; Parth Pawar</title>
        <meta name="description" content="Enterprise AI voice selection framed around tone, context, scenario testing, and reviewer confidence." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="AI Voice Interface · Parth Pawar" />
        <meta property="og:description" content="Enterprise AI voice selection framed around tone, context, scenario testing, and reviewer confidence." />
        <meta property="og:image" content="https://parthawe.github.io/Portfolio.github.io/Assets/images/nda-cover.svg" />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#4A6FA5' } as React.CSSProperties}>

        <ProjectHeader
          backLink="/work"
          categorySlug="ai"
          backLabel="Back to Work"
          tags={['Product Design', 'AI', 'Voice UX', 'Enterprise']}
          title="AI Voice Selection For Enterprise"
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
          intro="I treated voice selection as a product-confidence problem: compare fit, test context, and make the choice defensible for a team."
          visuals={AI_VOICE_PROCESS_VISUALS}
          decisions={[
            {
              move: 'Move beyond a voice dropdown.',
              why: 'Frame the choice around trust, tone, and customer context.',
            },
            {
              move: 'Compare voices in real scenarios.',
              why: 'Let teams judge fit against the moments the voice will handle.',
            },
            {
              move: 'Make the final choice explainable.',
              why: 'Give teams a reasoned selection they can share and approve.',
            },
          ]}
          shift={{
            before: 'A list of samples that left buyers guessing about fit.',
            after: 'A selection flow built around tone, context, and team confidence.',
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
