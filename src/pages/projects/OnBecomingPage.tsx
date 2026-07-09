import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import CsSection from '../../components/case-study/CsSection'
import CsBody from '../../components/case-study/CsBody'
import CsPullquote from '../../components/case-study/CsPullquote'
import CsThanks from '../../components/case-study/CsThanks'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'

export default function OnBecomingPage() {
  return (
    <>
      <Helmet>
        <title>On Becoming &middot; Parth Pawar</title>
        <meta name="description" content="A reflective essay on artistic identity — finding the thread that connects neural network sculptures, salt-grinding story machines, and fintech payment flows into a single practice." />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#6b7280' } as React.CSSProperties}>

        <ProjectHeader
          backLink="/work"
          categorySlug="creative-tech"
          backLabel="Back to Work"
          tags={['Writing', 'Reflection', 'Artistic Voice']}
          title="On Becoming"
          subtitle="Finding the thread that connects neural network sculptures, salt-grinding story machines, and fintech payment flows into a single practice"
          info={[
            { label: 'Context', value: 'On Becoming, NYU ITP' },
            { label: 'Year', value: '2024' },
            { label: 'Format', value: 'Written Essay' },
          ]}
        />

        {/* The Question */}
        <CsSection id="cs-question" label="01 &mdash; The Question" title="What Do You Make?">
          <CsBody>
            <p>People ask me this at every portfolio review, every studio visit, every dinner party. And I never have a clean answer. I make neural network sculptures out of 200 LED ping-pong balls. I design payment flows for migrant workers sending money home. I build arcade games from laser-cut plywood and RGB buttons. I grind salt with a story slider. I watch clocks slow down near imaginary black holes.</p>
            <p>For two years I thought this was a problem &mdash; a lack of focus, a portfolio that confused recruiters, an inability to &ldquo;pick a lane.&rdquo; On Becoming was the course that taught me the opposite: the confusion IS the lane. The thread connecting every project is not a medium or an industry. It&rsquo;s a single obsessive question.</p>
          </CsBody>
        </CsSection>

        <CsPullquote quote="How can I design a system that makes an invisible concept tangible enough that you can't help but understand it?" />

        {/* The Thread */}
        <CsSection id="cs-thread" label="02 &mdash; The Thread" title="Making the Invisible Tangible">
          <CsBody>
            <p>Once I saw it, I couldn&rsquo;t unsee it. Every project I&rsquo;ve made &mdash; from Pune to New York, from client work to thesis installations &mdash; is about the same thing: <strong>taking something invisible and making it pass through the body</strong>.</p>
            <p><a href="/Portfolio.github.io/enigma" style={{ color: 'var(--ink)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>Enigma</a> takes neural network computation (invisible) and turns it into cascading light (embodied). You don&rsquo;t read about how a network classifies letters. You watch light ripple across 200 neurons as the decision forms.</p>
            <p><a href="/Portfolio.github.io/sea-of-salt" style={{ color: 'var(--ink)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>Why the Sea is Salt</a> takes narrative consequence (invisible) and turns it into grinding salt (embodied). Every inch you advance the story produces real salt on the platform. Reading becomes making.</p>
            <p><a href="/Portfolio.github.io/zentipay" style={{ color: 'var(--ink)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>ZentiPay</a> takes hidden fees (invisible) and turns them into an upfront fee breakdown (embodied in the interface). The principle is simple: financial trust depends on what the interface makes visible before a user commits.</p>
            <p><a href="/Portfolio.github.io/shuffle" style={{ color: 'var(--ink)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>Shuffle</a> takes the invisible tradeoffs of student life and turns them into weighted tokens on an LED grid. Pick one up, place it somewhere, and watch the grid respond. The cost of saying &ldquo;yes&rdquo; to one thing becomes physically visible as a shift elsewhere.</p>
            <p><a href="/Portfolio.github.io/jugalbandi" style={{ color: 'var(--ink)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>Jugalbandi</a> takes neural network inference (invisible) and turns it into music you can hear. Each hidden layer becomes an instrument, so data moving through the model becomes a sequence of sound.</p>
            <p>The medium changes every time. Light, salt, sound, money, tokens, sliders, clocks, fabric, buttons. But the question never does: <em>how do I make you understand this through your body, not just your brain?</em></p>
          </CsBody>
        </CsSection>

        {/* The Method */}
        <CsSection id="cs-method" label="03 &mdash; The Method" title="Medium as Meaning">
          <CsBody>
            <p>The choice of medium is never arbitrary. It IS the concept.</p>
            <p>Neural networks are represented as <strong>light</strong> because activation is easier to understand when it is visible. Salt represents narrative because stories <strong>accumulate</strong> and leave residue. Mechanical watches represent time because each tick is a controlled release of stored energy, a <a href="/Portfolio.github.io/making-of-time" style={{ color: 'var(--ink)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>small mechanical proof of timing</a>. The <a href="/Portfolio.github.io/moniac-machine" style={{ color: 'var(--ink)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>MONIAC</a> uses flowing water to represent money because economic systems are easier to reason about when their flows are visible.</p>
            <p>I don&rsquo;t illustrate concepts. I find the medium that already embodies the concept&rsquo;s logic and then build a system where you can experience that logic directly.</p>
          </CsBody>
        </CsSection>

        {/* The Tension */}
        <CsSection id="cs-tension" label="04 &mdash; The Tension" title="Rigor vs. Imagination">
          <CsBody>
            <p>There&rsquo;s a tension in my practice that I used to think was a flaw. The fintech work demands rigor because mistakes in a payment flow have real consequences. The ITP work demands imagination because projects like a <a href="/Portfolio.github.io/black-hole" style={{ color: 'var(--ink)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>physical model of spacetime curvature</a> do not arrive with standard interface patterns.</p>
            <p>On Becoming taught me that the tension is the practice. The projects where I&rsquo;ve done my best work are the ones that need both: <a href="/Portfolio.github.io/mentra" style={{ color: 'var(--ink)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>Mentra</a> needs imagination for a see-through interface and rigor because interruptions in the real world have safety implications. <a href="/Portfolio.github.io/the-omakase" style={{ color: 'var(--ink)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>The Omakase</a> needs imagination for the cabinet concept and rigor so the game loop feels fair from the first round to the last.</p>
            <p>Imagination without rigor produces art that doesn&rsquo;t work. Rigor without imagination produces products that don&rsquo;t matter. I need both at the same time, in every project, always.</p>
          </CsBody>
        </CsSection>

        <CsPullquote quote="You do not understand until your body is involved. That's the thesis. Everything else is method." />

        {/* The Name */}
        <CsSection id="cs-name" label="05 &mdash; The Name" title="What Do I Call This?">
          <CsBody>
            <p>I&rsquo;ve tried &ldquo;design engineer.&rdquo; It&rsquo;s accurate but incomplete. I&rsquo;ve tried &ldquo;creative technologist.&rdquo; It&rsquo;s broad but vague. I&rsquo;ve tried &ldquo;interaction designer.&rdquo; It misses the physical computing, the fabrication, the set design, the watchmaking.</p>
            <p>The closest I&rsquo;ve come: I build <strong>translation layers</strong>. Systems of medium, constraint, and interaction that turn invisible concepts into visceral experiences. The domain doesn&rsquo;t matter. The material doesn&rsquo;t matter. What matters is whether, after you interact with the thing I built, you understand something you didn&rsquo;t understand before &mdash; and you understand it in your body, not just your head.</p>
            <p>I don&rsquo;t know if that fits on a business card. But it fits on a portfolio.</p>
          </CsBody>
        </CsSection>

        <CsThanks />

        <BottomNav sections={[
          { id: 'cs-question', label: 'The Question' },
          { id: 'cs-thread', label: 'The Thread' },
          { id: 'cs-method', label: 'Method' },
          { id: 'cs-tension', label: 'Tension' },
          { id: 'cs-name', label: 'The Name' },
        ]} />

      </main>

      <NextProject slug="enigma" title="Enigma" image="/Portfolio.github.io/Assets/images/enigma.jpg" />
      <Footer />
    </>
  )
}
