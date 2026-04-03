import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import ProjectOverview from '../../components/case-study/ProjectOverview'
import CsSection from '../../components/case-study/CsSection'
import CsBody from '../../components/case-study/CsBody'
import CsFeatureGrid from '../../components/case-study/CsFeatureGrid'
import CsSteps from '../../components/case-study/CsSteps'
import CsCallout from '../../components/case-study/CsCallout'
import CsPullquote from '../../components/case-study/CsPullquote'
import CsImage from '../../components/case-study/CsImage'
import CsNumList from '../../components/case-study/CsNumList'
import CsThanks from '../../components/case-study/CsThanks'
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
        <meta property="og:image" content="https://parthpawar.com/Assets/images/ai-voice.png" />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#4A6FA5' } as React.CSSProperties}>

        <ProjectHeader
          backLink="/work"
          categorySlug="ai"
          backLabel="Back to Work"
          tags={['Product Design', 'AI', 'Voice UX', 'Enterprise']}
          title="Redefining AI Voice Selection For Enterprise"
          subtitle="Integrating Emotional Intelligence and Expressive Voice Selection: A Reimagined AI Voice Experience"
          info={[
            { label: 'Client', value: 'Voice AI (NDA)' },
            { label: 'Scope', value: 'Product Design' },
            { label: 'Role', value: 'Product Designer' },
            { label: 'Duration', value: '3 Months' },
            { label: 'Year', value: '2025' },
          ]}
          heroImage="/Assets/Projects/AI VOICE/AI.jpg"
          heroAlt="AI Voice Selection, hero"
        />

        <ProjectOverview
          sections={[
            {
              label: 'Summary',
              content: 'The reimagined AI voice matching experience helps enterprise teams and creatives select AI voices through intuitive, emotionally intelligent interactions. Instead of static dropdowns, users explore, test, and build voices through personalized, context-aware systems. This approach balances technical power with playful creativity and emotional alignment.',
            },
            {
              label: 'The Challenges',
              content: 'Bridging the gap between enterprise-grade AI voice tools and intuitive, emotion-driven UX. Replacing dropdown-based selection with expressive, guided exploration. Supporting both fast onboarding and deep customization for varied user needs.',
            },
            {
              label: 'My Role',
              content: 'Product Design Strategy: Leading concept definition for how users engage with AI voice personalities.\nInteraction & System Design: Designing DNA-based and mood-based systems for selecting and shaping voice outputs.',
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

        <CsImage src="/Assets/Projects/AI VOICE/1.png" alt="AI Voice Selection, project overview slide" />
        <p className="cs-caption">Project overview, the challenge of reimagining enterprise AI voice selection from static dropdowns to emotionally intelligent, expressive interactions.</p>

        {/* Research */}
        <section className="cs-section reveal" id="cs-research">
          <div className="wrap">
            <span className="cs-section-label">Research</span>
            <h2 className="cs-display">The voices are world-class. The discovery experience isn&rsquo;t.</h2>
            <CsBody>
              <p>AI&rsquo;s voices are human-like, expressive, and built for real-world business applications &mdash; but the way customers discover and choose them doesn&rsquo;t do them justice.</p>
            </CsBody>

            <h3 className="cs-section-subtitle">Design Process</h3>
            <div className="cs-process-flow">
              <span className="cs-process-pill">Empathize</span>
              <span className="cs-process-pill">Define</span>
              <span className="cs-process-pill">Ideate</span>
              <span className="cs-process-pill">Prototype</span>
              <span className="cs-process-pill">Test</span>
            </div>

            <CsCallout style={{ marginTop: '2.5rem' }}>
              <p>Comparative UX analysis across three platforms (Rime, Central, Simple) revealed critical gaps in Entry Point design, First-Time Flow, Voice Discovery UX, Customization &amp; Personality Fit, and Onboarding Support &mdash; confirming the need for a fundamentally new approach to voice selection.</p>
            </CsCallout>
          </div>
        </section>

        <CsImage src="/Assets/Projects/AI VOICE/2.png" alt="Comparative UX analysis and market research across voice AI platforms" />
        <p className="cs-caption">Comparative UX analysis across three competing platforms revealed critical gaps in voice discovery, onboarding flow, and personality customization.</p>

        {/* Define */}
        <section className="cs-section reveal" id="cs-define">
          <div className="wrap">
            <span className="cs-section-label">Define</span>
            <h2 className="cs-display" style={{ maxWidth: '28ch' }}>How might we help Enterprise Teams select an expressive AI voice that aligns with brand tone?</h2>

            <h3 className="cs-section-subtitle">Pain Points</h3>
            <CsFeatureGrid features={[
              { title: 'Unintuitive', desc: "Current voice selection relies on static lists and dropdowns that don't convey personality or tone." },
              { title: 'Uncontextualized', desc: 'Voices are presented without context for how they sound in real-world use cases or brand scenarios.' },
              { title: 'Fragmented', desc: 'The selection process is scattered across multiple screens and lacks a cohesive flow.' },
              { title: 'Impersonal', desc: "No emotional connection or personality fit between the user's needs and the voice options." },
              { title: 'Rigid', desc: 'Minimal customization options and no ability to shape or tweak voices to match brand identity.' },
            ]} />

            <h3 className="cs-section-subtitle" style={{ marginTop: '3rem' }}>Customer Journey Map</h3>
            <CsBody>
              <p>Mapped the Enterprise Manager journey across five phases:</p>
            </CsBody>
            <CsSteps steps={[
              { num: '1', title: 'Awareness', desc: 'Enterprise manager discovers AI voice platform and begins evaluating options for their brand.' },
              { num: '2', title: 'Exploration', desc: 'Browses available voices, listens to samples, and tries to match voices to brand requirements.' },
              { num: '3', title: 'Evaluation', desc: 'Shortlists voices, tests them in context, and compares options against brand tone guidelines.' },
              { num: '4', title: 'Selection', desc: 'Finalizes voice choice, customizes parameters, and confirms the voice for implementation.' },
              { num: '5', title: 'Handoff to Tech', desc: 'Exports voice configuration and hands off to engineering team for integration.' },
            ]} />
          </div>
        </section>

        <CsImage src="/Assets/Projects/AI VOICE/3.png" alt="Problem definition, pain points, and customer journey map" />
        <p className="cs-caption">Five pain points distilled from research, mapped against an enterprise manager&rsquo;s journey from awareness through handoff to engineering.</p>

        {/* Concept A */}
        <section className="cs-section reveal" id="cs-concept-a">
          <div className="wrap">
            <span className="cs-section-label">Ideate &mdash; Concept A</span>
            <h2 className="cs-display">Voice DNA Builder</h2>
            <CsBody>
              <p>Instead of picking a name from a list, users &ldquo;build&rdquo; a voice by choosing parameters that form into a helix: Emotion, Accent, Pace, and Texture. The system animates a DNA strand building in real time, and a voice is generated from it.</p>
            </CsBody>

            <h3 className="cs-section-subtitle">Layout Architecture</h3>
            <CsFeatureGrid features={[
              { title: 'Left Panel', desc: 'Navigation and voice persona selection panel for quick access to saved configurations.' },
              { title: 'Center Stage', desc: 'DNA strand visualization with parameter sliders for Emotion, Accent, Pace, and Texture.' },
              { title: 'Right Panel', desc: 'Transcript display and voice preview controls for real-time testing of configurations.' },
              { title: 'Bottom Right', desc: 'Interactive global map for picking regional accents with cultural context.' },
            ]} />
          </div>
        </section>

        <CsImage src="/Assets/Projects/AI VOICE/4.png" alt="Voice DNA Builder, sketch and final dark UI mockup" />
        <p className="cs-caption">Concept A: Voice DNA Builder, from initial sketch to high-fidelity dark UI. Users build a voice through parameter sliders that form an animated DNA helix.</p>

        {/* Concept B */}
        <section className="cs-section reveal" id="cs-concept-b">
          <div className="wrap">
            <span className="cs-section-label">Ideate &mdash; Concept B</span>
            <h2 className="cs-display">Mood-Based Voice Matching</h2>
            <CsBody>
              <p>User speaks a sentence, the AI analyzes tone, pacing, and emotion, then suggests three voices that match or balance their energy. The system adapts to the user, not the other way around.</p>
            </CsBody>

            <h3 className="cs-section-subtitle">Three Stages</h3>
            <CsSteps steps={[
              { num: '1', title: 'User Speaks', desc: 'User delivers an initial speech prompt. The silhouette pulses in response to vocal input.' },
              { num: '2', title: 'Voice-Matching Logic', desc: 'AI processes emotion, pacing, and tone from the speech to identify matching voice profiles.' },
              { num: '3', title: 'Persona Suggestions', desc: "Dynamic voice personas appear with mood-match summaries, showing how each voice aligns with the user's energy." },
            ]} />
          </div>
        </section>

        <CsImage src="/Assets/Projects/AI VOICE/5.png" alt="Mood-Based Voice Matching, sketch and final dark UI mockup" />
        <p className="cs-caption">Concept B: Mood-Based Voice Matching, the user speaks, the AI analyzes emotion and tone, then suggests three voices that match their energy.</p>

        {/* Voice DNA Deep Dive */}
        <section className="cs-section reveal" id="cs-voice-dna">
          <div className="wrap">
            <span className="cs-section-label">Deep Dive &mdash; Voice DNA Builder</span>
            <h2 className="cs-display">Build a voice, don&rsquo;t just pick one.</h2>
            <CsBody>
              <p>Instead of picking a name, users &ldquo;build&rdquo; a voice by choosing parameters into a helix: Emotion, Accent, Pace, Texture. The system animates a DNA strand building in real time, and a voice is generated from it.</p>
            </CsBody>

            <h3 className="cs-section-subtitle">Key Features</h3>
            <CsFeatureGrid features={[
              { title: 'Current Voice Persona', desc: 'Live preview of the active voice persona with visual identity and personality traits.' },
              { title: 'Transcript Panel', desc: 'Real-time transcript display for accessibility and review of voice output.' },
              { title: 'Search Place', desc: 'Quickly search and filter through available voice parameters and presets.' },
              { title: 'Global Map', desc: 'Interactive world map for selecting regional accents with cultural depth.' },
              { title: 'DNA Parameters', desc: 'Multiple configurable parameters that feed into the voice DNA strand.' },
              { title: 'Parameter Sliders', desc: 'Intuitive sliders for fine-tuning each voice characteristic in real time.' },
            ]} />
          </div>
        </section>

        <CsImage src="/Assets/Projects/AI VOICE/6.png" alt="Voice DNA Builder, detailed feature breakdown and UI" />
        <p className="cs-caption">DNA Builder deep dive, six key features including live persona preview, transcript panel, global accent map, and real-time parameter sliders.</p>

        {/* UX Benefits, DNA Builder */}
        <section className="cs-section reveal">
          <div className="wrap">
            <span className="cs-section-label">UX Benefits &mdash; Voice DNA Builder</span>
            <h2 className="cs-display">Creative freedom meets technical power.</h2>

            <h3 className="cs-section-subtitle">Persona Movement States</h3>
            <CsBody>
              <p>Two options for persona movements across Listen, Think, and Talk states &mdash; bringing the voice character to life through dynamic visual feedback.</p>
            </CsBody>

            <h3 className="cs-section-subtitle" style={{ marginTop: '2.5rem' }}>UX Benefits</h3>
            <ul className="cs-list">
              <li>Intuitive sliders for emotional tone</li>
              <li>Interactive map for cultural depth</li>
              <li>Dynamic persona summary</li>
              <li>Transcript panel for accessibility</li>
              <li>Infinite combinations for highly personalized voices</li>
              <li>Exploratory flow encourages creative play</li>
              <li>Character-driven design</li>
            </ul>

            <h3 className="cs-section-subtitle" style={{ marginTop: '2.5rem' }}>Visual &amp; Tone</h3>
            <CsCallout>
              <p>Dark theme matches the product identity. Accent red used sparingly for emphasis. DNA strand glows in motion. Font and layout are clear, functional, minimal.</p>
            </CsCallout>
          </div>
        </section>

        <CsImage src="/Assets/Projects/AI VOICE/7.png" alt="Persona movements and UX benefits for Voice DNA Builder" />
        <p className="cs-caption">Persona movement states (Listen, Think, Talk) bring the voice character to life. The DNA Builder balances creative freedom with technical control.</p>

        {/* Mood Matching Deep Dive */}
        <section className="cs-section reveal" id="cs-mood">
          <div className="wrap">
            <span className="cs-section-label">Deep Dive &mdash; Mood-Based Voice Matching</span>
            <h2 className="cs-display">The system adapts to you.</h2>
            <CsBody>
              <p>User speaks a sentence. AI analyzes tone, pacing, and emotion, then suggests three voices that match or balance their energy. It flips the script: the system adapts to the user, not the other way around. Responsive onboarding based on emotion.</p>
            </CsBody>

            <h3 className="cs-section-subtitle">Three Screens</h3>
            <CsSteps steps={[
              { num: '1', title: 'Listening Mode', desc: '"Speak your mind" \u2014 a glowing circle pulses as it captures the user\'s voice input.' },
              { num: '2', title: 'Thinking Mode', desc: 'A silhouette appears as the AI processes emotion and generates matching voice profiles.' },
              { num: '3', title: 'Talking Mode', desc: 'Three voice suggestions appear with a red/orange gradient, alongside transcript details and mood-match summaries.' },
            ]} />
          </div>
        </section>

        <CsImage src="/Assets/Projects/AI VOICE/8.png" alt="Mood-Based Voice Matching, three screens: listening, thinking, talking" />
        <p className="cs-caption">Mood Matching&rsquo;s three-stage flow: a glowing circle captures voice input, a silhouette processes emotion, and three matched personas appear with mood summaries.</p>

        {/* UX Benefits, Mood Matching */}
        <section className="cs-section reveal">
          <div className="wrap">
            <span className="cs-section-label">UX Benefits &mdash; Mood-Based Matching</span>
            <h2 className="cs-display">Voice-first. Emotionally intelligent.</h2>

            <CsBody>
              <p>Different persona silhouettes to choose from, each representing a distinct voice character and personality.</p>
            </CsBody>

            <h3 className="cs-section-subtitle" style={{ marginTop: '2rem' }}>UX Benefits</h3>
            <ul className="cs-list">
              <li>Voice-first onboarding &mdash; no clicks, just speak</li>
              <li>Emotionally intelligent matching</li>
              <li>Simplified discovery with three great matches</li>
              <li>Transcript support for accessibility</li>
              <li>Personality-focused selection</li>
              <li>Exploratory, not fixed &mdash; encourages iteration</li>
              <li>Visually guided experience</li>
            </ul>

            <h3 className="cs-section-subtitle" style={{ marginTop: '2.5rem' }}>Visual &amp; Tone</h3>
            <CsCallout>
              <p>Dark background with warm gradient halos. Persona silhouettes are character-driven, giving each voice a visual identity. Accent red used sparingly. Micro-animation stages bring the matching process to life.</p>
            </CsCallout>
          </div>
        </section>

        <CsImage src="/Assets/Projects/AI VOICE/9.png" alt="Persona silhouettes and UX benefits for Mood-Based Voice Matching" />
        <p className="cs-caption">Persona silhouettes give each voice a visual identity. Voice-first onboarding eliminates clicks entirely &mdash; users just speak, and the system adapts.</p>

        {/* Validate */}
        <section className="cs-section reveal" id="cs-validate">
          <div className="wrap">
            <span className="cs-section-label">Validate</span>
            <h2 className="cs-display">A/B Testing: DNA Builder vs. Mood Matching</h2>
            <CsBody>
              <p>Tested Prototype A (Voice DNA Builder) against Prototype B (Mood-Based Voice Matching) with 7 participants via WhatsApp.</p>
            </CsBody>

            <h3 className="cs-section-subtitle">Results</h3>
            <CsFeatureGrid features={[
              { title: 'Ease of Onboarding', desc: 'Winner: Mood Matching (B) \u2014 5 out of 7 participants preferred its voice-first, low-friction entry.' },
              { title: 'Personalization & Control', desc: 'Winner: DNA Builder (A) \u2014 6 out of 7 participants valued the deep customization options.' },
              { title: 'Visual Engagement', desc: 'Winner: DNA Builder (A) \u2014 5 out of 7 found the DNA strand animation more visually compelling.' },
              { title: 'Emotional Connection', desc: 'Winner: Mood Matching (B) \u2014 4 out of 7 felt stronger emotional resonance with voice-first input.' },
              { title: 'Clarity of Steps', desc: 'Winner: Mood Matching (B) \u2014 4 out of 7 found the three-stage flow easier to follow.' },
              { title: 'Fun & Playfulness', desc: 'Winner: DNA Builder (A) \u2014 6 out of 7 enjoyed the creative, exploratory interactions.' },
            ]} />

            <CsCallout style={{ marginTop: '2.5rem' }}>
              <p><strong>Overall Winner: Voice DNA Builder (Prototype A)</strong> for its customization depth and creative freedom. Recommendation: Use Mood-Based Matching as an emotional onboarding layer, then let users graduate to Voice DNA Builder for full control.</p>
            </CsCallout>

            <CsPullquote
              quote="The DNA Builder made me feel like I was crafting a character, not picking from a dropdown. I actually wanted to keep tweaking it \u2014 that never happens with voice tools."
              cite="A/B Test Participant, Enterprise Product Manager"
            />

            <h3 className="cs-section-subtitle" style={{ marginTop: '3rem' }}>Reflections</h3>
            <CsBody>
              <p>Working on the AI voice matching platform gave me the opportunity to deeply explore how voice can evolve from a utility into an expressive interface for emotion, identity, and brand storytelling.</p>
            </CsBody>
          </div>
        </section>

        <CsImage src="/Assets/Projects/AI VOICE/10.png" alt="A/B testing results and reflections" />
        <p className="cs-caption">A/B test results across 7 participants: DNA Builder won on customization, playfulness, and visual engagement; Mood Matching won on onboarding ease and emotional connection.</p>

        {/* Reflections */}
        <CsSection id="cs-reflections" label="Reflections" title="Designing for a voice-first world">
          <CsNumList items={[
            <><strong>Voice-first design strips away visual scaffolding.</strong> There is no layout to guide the eye, no button to make obvious, no color to signal state. Every decision has to land through sound, timing, and language alone. This project taught me how much we rely on visual crutches in interface design &mdash; and how liberating it can be to design for a purely temporal medium where pacing and tone carry the entire experience.</>,
            <><strong>The line between helpful AI and intrusive AI is thinner than you think.</strong> An emotionally intelligent system that adapts to your voice is powerful, but it can easily tip into feeling surveillance-like if the user does not feel in control. The more capable the AI, the more deliberate the design needs to be about transparency, consent, and letting people opt out gracefully.</>,
            <><strong>Two concepts are better than one.</strong> Building both the DNA Builder and the Mood Matcher forced each idea to be sharper. A/B testing revealed that neither concept alone was the answer &mdash; the best experience layers mood-based onboarding into DNA-based customization. Competing prototypes made the final recommendation stronger than any single direction could have been.</>,
            <><strong>Intelligence without restraint is not good design.</strong> Enterprise teams need to trust the system before they deploy it to their customers. That trust is built through visible controls, transparent matching logic, and the ability to override every suggestion. The most sophisticated AI features in this project were the ones that showed their work.</>,
          ]} />
        </CsSection>

        <CsThanks />

        <CsImage src="/Assets/Projects/AI VOICE/11.png" alt="Credits and thank you slide" />
        <p className="cs-caption">Final recommendation: layer Mood-Based Matching as the emotional onboarding, then graduate users to the Voice DNA Builder for full creative control.</p>

        <BottomNav sections={[
          { id: 'cs-research', label: 'Research' },
          { id: 'cs-define', label: 'Define' },
          { id: 'cs-concept-a', label: 'Concept A' },
          { id: 'cs-concept-b', label: 'Concept B' },
          { id: 'cs-voice-dna', label: 'Voice DNA' },
          { id: 'cs-mood', label: 'Mood Matching' },
          { id: 'cs-validate', label: 'Validate' },
          { id: 'cs-reflections', label: 'Reflections' },
        ]} />

      </main>

      <NextProject slug="ballah-code" title="Ballah Code" image="/Assets/images/ballah-code.png" />
      <Footer />
    </>
  )
}
