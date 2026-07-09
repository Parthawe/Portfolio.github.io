import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import CsSection from '../../components/case-study/CsSection'
import CsBody from '../../components/case-study/CsBody'
import CsFeatureGrid from '../../components/case-study/CsFeatureGrid'
import CsThanks from '../../components/case-study/CsThanks'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'

export default function StorytellingPage() {
  return (
    <>
      <Helmet>
        <title>Storytelling &middot; Parth Pawar</title>
        <meta name="description" content="Narrative design explorations — how structure, pacing, and medium shape the stories we tell through products, installations, and interfaces." />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#8b5e3c' } as React.CSSProperties}>

        <ProjectHeader
          backLink="/work"
          categorySlug="creative-tech"
          backLabel="Back to Work"
          tags={['Narrative Design', 'Storytelling', 'Interactive']}
          title="Storytelling"
          subtitle="How structure, pacing, and medium shape the stories we tell &mdash; through products, installations, and interfaces"
          info={[
            { label: 'Context', value: 'Storytelling, NYU ITP' },
            { label: 'Year', value: '2025' },
            { label: 'Role', value: 'Narrative Designer' },
            { label: 'Status', value: 'In Progress' },
          ]}
        />

        <CsSection id="cs-overview" label="01 &mdash; Overview" title="Every Product Tells a Story">
          <CsBody>
            <p>Storytelling at ITP is not a writing workshop. It&rsquo;s a course about narrative as a design material &mdash; how the sequence of information, the rhythm of interaction, and the structure of experience create meaning. Every product, installation, and interface tells a story. This course teaches you to design that story intentionally.</p>
            <p>The premise: the difference between a good product and a great one is rarely features. It&rsquo;s narrative. Apple doesn&rsquo;t sell hardware; they sell the story of what you&rsquo;ll become when you use it. Airbnb doesn&rsquo;t sell rooms; they sell the story of belonging anywhere. The best design is invisible storytelling.</p>
          </CsBody>
        </CsSection>

        <CsSection id="cs-frameworks" label="02 &mdash; Frameworks" title="Narrative Structures in Design">
          <CsFeatureGrid features={[
            { title: 'The Hero\'s Journey in Onboarding', desc: 'Joseph Campbell\u2019s monomyth maps neatly to product onboarding: the user starts in their ordinary world (the problem), crosses a threshold (signup), faces trials (learning the interface), and returns with the goal completed. ZentiPay\u2019s onboarding was redesigned using this framework \u2014 each step explicitly mirrors a narrative beat.' },
            { title: 'Pacing as Information Architecture', desc: 'Film editors know that rhythm creates emotion \u2014 fast cuts for tension, long takes for contemplation. The same applies to interfaces: a dense dashboard feels urgent; generous whitespace feels premium. This portfolio\u2019s pacing \u2014 hero, pause, content, pause, interactive \u2014 is a deliberate narrative rhythm.' },
            { title: 'The Unreliable Narrator in Data Viz', desc: 'Every data visualization is a story told by a narrator (the designer) who chooses what to show and what to hide. The MONIAC simulator makes this explicit: the same economic data, presented through different levers, tells different stories. The user becomes the narrator.' },
            { title: 'Spatial Storytelling', desc: 'In physical installations, the story is the space. Visitors don\u2019t read left-to-right; they wander. The designer\u2019s job is to create a spatial narrative that works regardless of entry point. Black Hole\u2019s five phenomena work in any order because each is self-contained but connects to a larger theme.' },
          ]} />
        </CsSection>

        <CsSection id="cs-application" label="03 &mdash; Application" title="Storytelling Across My Work">
          <CsBody>
            <p>This course reframed every project I&rsquo;d already made. Enigma isn&rsquo;t a neural network sculpture &mdash; it&rsquo;s a story about making the invisible visible, told through cascading light. The Omakase isn&rsquo;t a game &mdash; it&rsquo;s a story about two people competing for the same resource (time), told through sushi. Shuffle isn&rsquo;t a slider interface &mdash; it&rsquo;s a story about the impossibility of balance, told through interdependent tradeoffs.</p>
            <p>The most practical takeaway: <strong>every case study page in this portfolio was rewritten using narrative structure.</strong> Before this course, my project pages were lists of features. Now they&rsquo;re stories with a hook, rising tension, a turning point, and a resolution. The reader doesn&rsquo;t just learn what I built &mdash; they experience why it matters.</p>
          </CsBody>
        </CsSection>

        <CsThanks />

        <BottomNav sections={[
          { id: 'cs-overview', label: 'Overview' },
          { id: 'cs-frameworks', label: 'Frameworks' },
          { id: 'cs-application', label: 'Application' },
        ]} />

      </main>

      <NextProject slug="on-becoming" title="On Becoming" image="/Portfolio.github.io/Assets/images/sea-of-salt.svg" />
      <Footer />
    </>
  )
}
