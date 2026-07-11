import { Helmet } from 'react-helmet-async'
import NdaGate from '../../components/NdaGate'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import CsImage from '../../components/case-study/CsImage'
import CsSection from '../../components/case-study/CsSection'
import NdaPublicStory from '../../components/case-study/NdaPublicStory'
import NdaProcess from '../../components/case-study/NdaProcess'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'

const AI_VOICE_ASSET = '/Portfolio.github.io/Assets/Projects/ai-voice'
const aiVoiceAsset = (file: string) => `${AI_VOICE_ASSET}/${file}`

const AI_VOICE_PUBLIC_VISUALS = [
  {
    src: aiVoiceAsset('cover.png'),
    alt: 'Voice Matching interface showing three enterprise voice persona options.',
    label: 'Voice matching concept',
  },
]

const AI_VOICE_PROCESS_VISUALS = [
  {
    src: aiVoiceAsset('voice-dna-builder.png'),
    alt: 'Voice DNA Builder interface showing tone sliders, persona preview, transcript, and global voice search.',
    label: 'Voice DNA builder',
  },
  {
    src: aiVoiceAsset('journey-map.png'),
    alt: 'Enterprise manager journey map for selecting and handing off an AI voice.',
    label: 'Enterprise selection journey',
  },
  {
    src: aiVoiceAsset('mood-based-matching.png'),
    alt: 'Mood-based voice matching flow showing initial state, suggestions, persona stages, and transcript interaction.',
    label: 'Mood-based matching flow',
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

      <main id="main-content" className="project-main project-main--ai-voice" style={{ '--project-color': '#3F82D8' } as React.CSSProperties}>

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
          heroExperience="visual"
          heroTone="ai"
          visualHeroImage={aiVoiceAsset('cover.png')}
          visualHeroAlt="Voice Matching enterprise interface cover with three suggested voice personas."
          visualSummary="Reframed enterprise voice selection around tone, context, and emotional fit instead of static demo lists."
        />

        <NdaPublicStory
          slug="ai-voice"
          headline="Voice choice as product judgment."
          lede="The core shift: choosing an AI voice is not a dropdown problem, it is a confidence problem."
          visuals={AI_VOICE_PUBLIC_VISUALS}
        />

        <NdaProcess
          title="From demo list to decision system"
          intro="I treated voice selection as a product-confidence problem: compare fit, test context, and make the choice defensible for non-technical enterprise teams."
          visuals={AI_VOICE_PROCESS_VISUALS}
          decisions={[
            {
              move: 'Audit the voice-selection market.',
              why: 'Rime, ElevenLabs, and Cartesia showed a gap between strong voice technology and guided enterprise decision-making.',
            },
            {
              move: 'Map the manager journey.',
              why: 'The handoff to technical teams exposed the real pain: decision-makers needed a fast way to explain why one voice fit the brand.',
            },
            {
              move: 'Prototype a Voice DNA builder.',
              why: 'Tone, speed, vocal quality, accent, and pitch became adjustable signals instead of hidden model attributes.',
            },
            {
              move: 'Use mood-based matching.',
              why: 'A listen-think-talk flow helped teams move from vague taste to scenario-based voice suggestions.',
            },
          ]}
          shift={{
            before: 'A list of samples that left buyers guessing about fit and asking technical teams to validate taste.',
            after: 'A selection flow built around persona, tone parameters, transcript context, and team confidence.',
          }}
        />

        <CsSection id="cs-ai-voice-research" label="Research" title="The gap was guidance, not generation">
          <div className="ai-voice-section-copy">
            <p>
              The audit showed three different failure modes: developer-first entry points, no public self-serve
              path, and demo tools that were powerful but not framed for non-technical evaluators.
            </p>
            <p>
              That changed the design brief. The product did not need another audio sample grid. It needed a
              guided way for enterprise managers to compare tone, scenario fit, and handoff confidence.
            </p>
          </div>
          <CsImage
            className="ai-voice-blue-img ai-voice-media--wide"
            src={aiVoiceAsset('competitor-audit.png')}
            alt="Competitive audit comparing Rime.ai, ElevenLabs, and Cartesia across onboarding, voice discovery, customization, and support."
            caption="Competitive audit: the opportunity was a clearer selection experience."
            aspectRatio="16 / 10"
          />
        </CsSection>

        <CsSection id="cs-ai-voice-journey" label="Journey" title="The enterprise manager needed a defensible choice">
          <div className="ai-voice-section-copy">
            <p>
              The journey map made the risk visible: the user starts curious, becomes unsure during exploration,
              then has to justify a subjective voice choice to brand and engineering teams.
            </p>
            <p>
              The strongest design direction was to turn voice selection into evidence: persona, transcript,
              scenario, and adjustable parameters all visible in one place.
            </p>
          </div>
          <CsImage
            className="ai-voice-blue-img ai-voice-media--wide"
            src={aiVoiceAsset('journey-map.png')}
            alt="Customer journey map for an enterprise manager selecting an AI voice for a support line."
            caption="Journey map: confidence drops when exploration has no guided feedback loop."
            aspectRatio="16 / 9"
          />
        </CsSection>

        <CsSection id="cs-ai-voice-system" label="System" title="Voice DNA made the choice inspectable">
          <div className="ai-voice-artifact-grid">
            <CsImage
              className="ai-voice-blue-img"
              src={aiVoiceAsset('voice-dna-builder.png')}
              alt="Voice DNA Builder interface with persona, sliders, transcript, and global map."
              caption="Builder surface"
              aspectRatio="3 / 4"
            />
            <CsImage
              className="ai-voice-blue-img"
              src={aiVoiceAsset('annotated-builder.png')}
              alt="Annotated Voice DNA Builder showing current persona, transcript, search place, global map, and parameters."
              caption="Interface anatomy"
              aspectRatio="3 / 4"
            />
            <CsImage
              className="ai-voice-blue-img"
              src={aiVoiceAsset('mood-based-matching.png')}
              alt="Mood-based voice matching flow with stages and persona suggestions."
              caption="Mood matching flow"
              aspectRatio="3 / 4"
            />
            <CsImage
              className="ai-voice-blue-img"
              src={aiVoiceAsset('persona-movement.png')}
              alt="Persona movement states for listen, think, and talk voice interaction."
              caption="Persona movement states"
              aspectRatio="3 / 4"
            />
          </div>
        </CsSection>

        <NdaGate slug="ai-voice" />

        <BottomNav sections={[
          { id: 'cs-public-story', label: 'Glimpse' },
          { id: 'cs-process', label: 'Process' },
          { id: 'cs-ai-voice-research', label: 'Research' },
          { id: 'cs-ai-voice-journey', label: 'Journey' },
          { id: 'cs-ai-voice-system', label: 'System' },
        ]} placement="side" />


      </main>

      <NextProject slug="ballah-code" title="Ballah Code" image="/Portfolio.github.io/Assets/images/ballah-code.webp" />
      <Footer />
    </>
  )
}
