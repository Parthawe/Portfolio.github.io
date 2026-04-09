import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import CsSection from '../../components/case-study/CsSection'
import CsBody from '../../components/case-study/CsBody'
import CsThanks from '../../components/case-study/CsThanks'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'

export default function OnBecomingPage() {
  return (
    <>
      <Helmet>
        <title>On Becoming &middot; Parth Pawar</title>
        <meta name="description" content="A reflective design journal exploring identity, craft, and the evolution from graphic designer to design engineer — written across one semester at NYU ITP." />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#6b7280' } as React.CSSProperties}>

        <ProjectHeader
          backLink="/work"
          categorySlug="creative-tech"
          backLabel="Back to Work"
          tags={['Writing', 'Reflection', 'Design Philosophy']}
          title="On Becoming"
          subtitle="A semester-long reflection on identity, craft, and what it means to evolve from designer to design engineer"
          info={[
            { label: 'Context', value: 'On Becoming, NYU ITP' },
            { label: 'Year', value: '2024' },
            { label: 'Format', value: 'Written Essays + Artifacts' },
          ]}
        />

        <CsSection id="cs-premise" label="01 &mdash; Premise" title="Who Are You Becoming?">
          <CsBody>
            <p>ITP calls itself a &ldquo;Center for the Recently Possible.&rdquo; On Becoming is the course that asks what that means for you personally. Over one semester, you write, make, and present work that interrogates your own trajectory: where you came from, what you&rsquo;re building, and who you&rsquo;re turning into in the process.</p>
            <p>I entered ITP as a UX designer from Pune with a portfolio of mobile apps, branding projects, and client work. By the time I took this course (Fall 2024), I had spent a year building neural network sculptures, arcade games, kinetic installations, and wearable interfaces. The gap between those two identities &mdash; &ldquo;UX designer&rdquo; and &ldquo;whatever I am now&rdquo; &mdash; was the subject of the work.</p>
          </CsBody>
        </CsSection>

        <CsSection id="cs-themes" label="02 &mdash; Themes" title="Three Questions That Shaped the Work">
          <CsBody>
            <p><strong>1. When does a designer become an engineer?</strong> I can solder, 3D print, write firmware, and fabricate enclosures. I can also do user research, wireframing, and brand systems. The tools changed, but did the thinking? I argue the core skill &mdash; making the invisible visible &mdash; hasn&rsquo;t changed at all. Enigma makes neural networks visible through light. ZentiPay makes hidden fees visible through interface design. Same muscle, different material.</p>
            <p><strong>2. What survives the transition between cultures?</strong> Moving from India to New York meant rebuilding every professional relationship, every cultural reference, every assumption about how work gets done. The essay explores what design principles survived the migration intact and which ones had to be rebuilt from scratch.</p>
            <p><strong>3. Is craft enough?</strong> ITP values concept over execution. The art world values concept over execution. But my training was the opposite &mdash; pixel-perfect Figma files, kerning tables, WCAG-compliant color systems. This tension between &ldquo;make it think&rdquo; and &ldquo;make it beautiful&rdquo; defined my two years at ITP. The resolution: they&rsquo;re the same thing. A well-crafted object communicates its concept through its finish.</p>
          </CsBody>
        </CsSection>

        <CsSection id="cs-takeaway" label="03 &mdash; Takeaway" title="The Portfolio as Self-Portrait">
          <CsBody>
            <p>The final artifact from this course was a redesign of this portfolio itself. The argument: a portfolio is not a collection of projects. It&rsquo;s a self-portrait built from the things you chose to make. The sequence matters. The gaps matter. What you leave out reveals as much as what you include.</p>
            <p>Every project in this portfolio is an answer to the question &ldquo;who are you becoming?&rdquo; Mentra answers &ldquo;someone who designs for the body, not just the screen.&rdquo; Enigma answers &ldquo;someone who makes computation physical.&rdquo; ZentiPay answers &ldquo;someone who designs for people the industry ignores.&rdquo; On Becoming was the course that helped me see the thread connecting all of them.</p>
          </CsBody>
        </CsSection>

        <CsThanks />

        <BottomNav sections={[
          { id: 'cs-premise', label: 'Premise' },
          { id: 'cs-themes', label: 'Themes' },
          { id: 'cs-takeaway', label: 'Takeaway' },
        ]} />

      </main>

      <NextProject slug="flow-fields" title="Flow Fields" image="/Assets/images/sea-of-salt.svg" />
      <Footer />
    </>
  )
}
