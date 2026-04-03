import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import CsSection from '../../components/case-study/CsSection'
import CsBody from '../../components/case-study/CsBody'
import CsFeatureGrid from '../../components/case-study/CsFeatureGrid'
import CsStatGrid from '../../components/case-study/CsStatGrid'
import CsPullquote from '../../components/case-study/CsPullquote'
import CsCredits from '../../components/case-study/CsCredits'
import CsThanks from '../../components/case-study/CsThanks'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'

export default function BallahCodePage() {
  return (
    <>
      <Helmet>
        <title>Ballah Code &middot; Parth Pawar</title>
        <meta name="description" content="Ballah Code, AI-native desktop IDE where the AI works as a senior engineer, not a chatbot. Case study by Parth Pawar, Creator & Designer." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Ballah Code &middot; Parth Pawar" />
        <meta property="og:description" content="AI-native desktop IDE where the AI works as a senior engineer, not a chatbot." />
        <meta property="og:image" content="https://parthpawar.com/Assets/images/ballah-code.png" />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#E04832' } as React.CSSProperties}>

        <ProjectHeader
          backLink="/work"
          categorySlug="ai"
          backLabel="Back to Work"
          tags={['Dev Tools', 'AI']}
          title="Ballah Code"
          subtitle="AI-native desktop IDE where the AI works as a senior engineer &mdash; not a chatbot"
          info={[
            { label: 'Role', value: 'Creator & Designer' },
            { label: 'Timeline', value: '2026' },
            { label: 'Type', value: 'Dev Tools \u00b7 AI' },
            { label: 'Team', value: 'Solo / Founder' },
          ]}
          heroImage="/Assets/images/ballah-code.png"
          heroAlt="Ballah Code, AI-native desktop IDE"
        />

        {/* 01, Overview */}
        <CsSection id="cs-overview" label="01 &mdash; Overview" title="A Development Environment That Treats AI as a Senior Engineer">
          <CsBody>
            <p>Ballah Code is a native desktop development environment that treats AI as a trusted senior engineer architect &mdash; not a disposable chatbot. The AI plans, writes specifications, delegates to workers, reviews output, and maintains decision records. Core philosophy: context is sacred, documents are first-class, and your time is spent on decisions, not management.</p>
          </CsBody>

          <div className="cs-slide reveal">
            <img src="/Assets/images/ballah-code.png" alt="Desktop app interface" loading="lazy" style={{ borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', width: '100%', height: 'auto' }} />
          </div>
          <p className="cs-caption">Desktop app interface &mdash; the AI-native development environment</p>
        </CsSection>

        {/* 02, The Problem */}
        <CsSection id="cs-problem" label="02 &mdash; The Problem" title="Context Is Disposable and AI Is Replaceable">
          <CsBody>
            <p>Existing AI coding tools treat context as disposable and AI as replaceable. Every conversation starts from zero. There&rsquo;s no persistent memory of why decisions were made, no living documents that evolve with the codebase, and no structured delegation between architect-level thinking and implementation-level execution.</p>
          </CsBody>

          <CsPullquote
            quote="Every conversation starts from zero. There is no persistent memory of why decisions were made, no living documents that evolve with the codebase."
          />
        </CsSection>

        {/* 03, Design Decisions */}
        <CsSection id="cs-decisions" label="03 &mdash; Design Decisions" title="Two-Process Architecture, One Seamless Experience">
          <CsBody>
            <p>The interface is built around a two-process architecture: a Bun backend handling AI calls, file system operations, and tool execution, connected to a React frontend in a native WebKit webview via typed RPC. The UI centers on a multi-workspace, multi-chat layout &mdash; file explorer with git awareness on the left, chat tabs in the center, and an integrated terminal at the bottom. Every interaction is designed to keep the developer in flow state while giving the AI full context.</p>
          </CsBody>
        </CsSection>

        {/* 04, Technical Architecture */}
        <CsSection id="cs-architecture" label="04 &mdash; Technical Architecture" title="Native Performance, Minimal Footprint">
          <CsBody>
            <p>Built with Electrobun for tiny ~14MB bundles and native performance. Features 17 production-ready AI tools (read, write, search, execute, diagnose, screenshot), a custom agentic loop using direct Anthropic Messages API streaming (not framework abstractions), prompt caching for long contexts, and workspace multiplexing for parallel workstreams. The standalone @ballah/agent package can run in CLI, desktop, or any frontend.</p>
          </CsBody>

          <CsStatGrid stats={[
            { label: 'Bundle Size', value: '~14MB' },
            { label: 'AI Tools', value: '17' },
            { label: 'Runtime', value: 'Bun' },
            { label: 'Framework', value: 'Electrobun' },
          ]} />
        </CsSection>

        {/* 05, Key Features */}
        <CsSection id="cs-features" label="05 &mdash; Key Features" title="Built for Real Engineering Workflows">
          <CsFeatureGrid features={[
            { title: 'Multi-Workspace, Multi-Chat', desc: 'Persistent history across workspaces and chat sessions. Switch between projects without losing context or conversation state.' },
            { title: '17 AI Tools', desc: 'Production-ready tools for code interaction \u2014 read, write, search, execute, diagnose. The AI operates on your codebase with the same access a senior engineer would have.' },
            { title: 'Custom Streaming Agent Loop', desc: 'Direct Anthropic Messages API streaming with per-step token logging. No framework abstractions between you and the model.' },
            { title: 'Typed RPC Bridge', desc: 'Type-safe communication between the Bun backend and the React webview. Full end-to-end type safety from AI response to UI render.' },
            { title: 'Integrated Terminal', desc: 'PTY session management with full terminal emulation. The AI can execute commands, and you can see everything it does in real time.' },
            { title: 'Cost Tracking & Model Flexibility', desc: 'Real-time progress indicators and cost tracking per conversation. Switch between Claude, Gemini, and OpenAI on a per-chat basis.' },
          ]} />
        </CsSection>

        {/* 06, Results & Status */}
        <CsSection id="cs-results" label="06 &mdash; Results &amp; Status" title="Functional Core, Ambitious Roadmap">
          <CsBody>
            <p>Core desktop app is functional with all 17 tools operational, streaming AI agent loop, terminal integration, and settings persistence. The project includes an evaluation harness benchmarking against SWE-PolyBench. Living documents, architect/worker delegation, and decision ledger are in the roadmap.</p>
          </CsBody>

          <CsFeatureGrid features={[
            { title: 'Shipped', desc: '17 AI tools, streaming agent loop, multi-workspace UI, terminal integration, settings persistence, evaluation harness.' },
            { title: 'On the Roadmap', desc: 'Living documents, architect/worker delegation, decision ledger, and expanded benchmark coverage.' },
          ]} />
        </CsSection>

        {/* Credits */}
        <section className="cs-section reveal">
          <div className="wrap">
            <span className="cs-section-label">Credits</span>
            <h2 className="cs-section-title">Team</h2>
            <CsCredits credits={[
              { role: 'Creator & Designer', name: 'Parth Pawar' },
              { role: 'Project', name: 'Ballah Code' },
              { role: 'Tools', name: 'Electrobun, Bun, React, TypeScript, Anthropic Claude, Tailwind CSS' },
              { role: 'Platform', name: 'Desktop (macOS)' },
            ]} />
          </div>
        </section>

        {/* Thanks */}
        <CsThanks />

        <BottomNav sections={[
          { id: 'cs-overview', label: 'Overview' },
          { id: 'cs-problem', label: 'The Problem' },
          { id: 'cs-decisions', label: 'Design Decisions' },
          { id: 'cs-architecture', label: 'Architecture' },
          { id: 'cs-features', label: 'Key Features' },
          { id: 'cs-results', label: 'Results & Status' },
        ]} />

      </main>

      <NextProject slug="keyboard-project" title="BreakGen" image="/Assets/images/keyboard.jpg" />
      <Footer />
    </>
  )
}
