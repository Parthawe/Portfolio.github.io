import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import ProjectOverview from '../../components/case-study/ProjectOverview'
import CsSection from '../../components/case-study/CsSection'
import CsBody from '../../components/case-study/CsBody'
import CsFeatureGrid from '../../components/case-study/CsFeatureGrid'
import CsImage from '../../components/case-study/CsImage'
import CsInfoGrid from '../../components/case-study/CsInfoGrid'
import CsStatGrid from '../../components/case-study/CsStatGrid'
import CsCallout from '../../components/case-study/CsCallout'
import CsCredits from '../../components/case-study/CsCredits'
import CsThanks from '../../components/case-study/CsThanks'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'

const SITE_SCREENSHOT = '/Portfolio.github.io/Assets/Projects/website-screenshot/screencapture-mentraglass-2026-03-25-13_33_13.webp'
const MENTRA = '/Portfolio.github.io/Assets/images/mentra'

export default function MentraWebsitePage() {
  return (
    <>
      <Helmet>
        <title>Mentra Website &middot; Parth Pawar</title>
        <meta name="description" content="Marketing website for Mentra Glass, translating a new AI smart-glasses category into a clearer launch story, product demo, specs, pricing, and developer ecosystem." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Mentra Website · Parth Pawar" />
        <meta property="og:description" content="Launch website for AI smart glasses with an app store, designed to turn skepticism into purchase intent." />
        <meta property="og:image" content={`https://parthpawar.com${SITE_SCREENSHOT}`} />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#00B869' } as React.CSSProperties}>
        <ProjectHeader
          backLink="/work"
          categorySlug="brand"
          backLabel="Back to Work"
          tags={['Website', 'Launch', 'Conversion', 'AI Wearables']}
          title="Mentra Website"
          subtitle="A launch site that explains why AI smart glasses need an app store, then makes the product feel concrete enough to buy."
          info={[
            { label: 'Company', value: 'Mentra' },
            { label: 'Role', value: 'Head of UI/UX — site strategy, design, product story, and launch assets' },
            { label: 'Platform', value: 'Web' },
            { label: 'Timeline', value: 'Q1 2026' },
            { label: 'Status', value: 'Live product site' },
          ]}
          liveUrl="https://www.mentra.glass"
          heroImage={SITE_SCREENSHOT}
          heroAlt="Mentra Glass marketing website showing the launch story, product sections, app store, specifications, and pricing."
        />

        <ProjectOverview
          id="cs-overview"
          sections={[
            {
              label: 'The Job',
              content: 'Mentra Glass asks users to believe in a category most people have not personally tried: open-source AI smart glasses with a MiniApp ecosystem. The website had to move visitors from curiosity to confidence without relying on a hands-on demo.',
            },
            {
              label: 'The Challenge',
              content: 'The site had to speak to multiple audiences at once: early adopters comparing hardware, developers evaluating the platform, and skeptical buyers trying to understand why this is not just another camera on a pair of glasses.',
            },
            {
              label: 'My Role',
              content: 'I shaped the product narrative, page structure, visual hierarchy, proof points, launch imagery, and the way OS, app store, specs, and pricing were sequenced. The goal was not a decorative landing page. It was a working sales and education surface for a shipping product.',
            },
          ]}
        />

        <CsStatGrid stats={[
          { label: 'Launch price', value: '$299' },
          { label: 'Primary claim', value: 'App store' },
          { label: 'Product story', value: 'Hardware + OS' },
          { label: 'Site status', value: 'Live' },
        ]} />

        <CsImage src={SITE_SCREENSHOT} alt="Full-page capture of the Mentra Glass website, including hero, product proof, ecosystem, specifications, and pricing." />

        <CsSection id="cs-strategy" label="Strategy" title="The Website Had To Sell A Category, Not Just A Device">
          <CsBody>
            <p>Most hardware pages can assume the visitor already understands the category. Smart glasses do not get that luxury. The first job was to make the product legible: what it is, what it does, why an app store matters, and why an open platform is different from a closed camera wearable.</p>
            <p>The structure deliberately moves from product promise to product proof. It starts with the simplest category frame, then uses real hardware imagery, OS surfaces, MiniApp examples, specs, and pricing to remove uncertainty step by step.</p>
          </CsBody>
          <CsFeatureGrid features={[
            { title: 'Make the thesis obvious', desc: 'The site leads with the idea that smart glasses become useful when they have an app ecosystem, not just better hardware.' },
            { title: 'Show product reality early', desc: 'Real renders, product photos, display surfaces, and specs appear before the page asks for commitment.' },
            { title: 'Serve buyers and builders', desc: 'Consumer-facing value props sit alongside the OS, MiniApp Store, and developer-platform story.' },
            { title: 'Reduce novelty risk', desc: 'Pricing, weight, battery, prescription readiness, and backing details make the product feel less speculative.' },
          ]} />
        </CsSection>

        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-img-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="cs-img reveal"><img src={`${MENTRA}/render-transparent.webp`} alt="Transparent Mentra Glass render showing internal components and camera module." loading="lazy" /></div>
              <div className="cs-img reveal"><img src={`${MENTRA}/appstore-hero.webp`} alt="Mentra companion app and app store surfaces showing active apps and glasses status." loading="lazy" /></div>
            </div>
          </div>
        </section>

        <CsSection id="cs-architecture" label="Information Architecture" title="From Skepticism To Specifics">
          <CsBody>
            <p>The page sequence is built around visitor objections. First: what is this? Then: why should I care? Then: what can it do today? Then: will it fit my life? Finally: what does it cost and why is this credible?</p>
          </CsBody>
          <CsInfoGrid items={[
            { key: 'Hero', value: 'Defines the product and the app-store thesis in the first viewport.' },
            { key: 'Product proof', value: 'Shows the glasses, the OS, and the companion experience instead of leaning on abstract claims.' },
            { key: 'MiniApp ecosystem', value: 'Explains the platform layer through concrete use cases: captions, translation, notes, AI, and utilities.' },
            { key: 'Specs', value: 'Answers practical buyer questions: price, weight, battery, camera field of view, prescription readiness, and OS model.' },
            { key: 'Conversion', value: 'Places purchase intent after enough proof has accumulated, not before.' },
          ]} />
        </CsSection>

        <CsSection id="cs-design" label="Design System" title="Launch Polish Without Losing Product Clarity">
          <CsBody>
            <p>The visual system borrows from the broader Mentra brand: one green, restrained typography, product-first imagery, and interface surfaces that feel technical without becoming developer-only. The site needed to feel premium, but the design could not obscure the core job: helping people understand what they are buying.</p>
          </CsBody>
          <CsFeatureGrid features={[
            { title: 'Product imagery leads', desc: 'The glasses and OS surfaces carry the page; decorative abstraction stays secondary.' },
            { title: 'Specs stay scannable', desc: 'Hardware details are treated as buyer reassurance, not buried at the end as fine print.' },
            { title: 'Developer story stays visible', desc: 'The open-source OS and MiniApp Store appear as product differentiators, not separate documentation.' },
          ]} />
        </CsSection>

        <CsSection id="cs-impact" label="Outcome" title="A Live Surface For A Shipping Product">
          <CsBody>
            <p>The site became the public front door for Mentra Glass: a place where the hardware, OS, MiniApp Store, specs, pricing, and credibility signals could be read as one product story. It supports press, buyers, developers, and hiring conversations without needing a separate explanation deck.</p>
          </CsBody>
          <CsCallout>
            <p>The important design move was sequencing: explain the new category first, prove the product second, then ask for action only after the visitor has enough concrete evidence to trust the claim.</p>
          </CsCallout>
        </CsSection>

        <CsSection label="Credits" title="Team">
          <CsCredits credits={[
            { role: 'Design', name: 'Parth Pawar' },
            { role: 'Company', name: 'Mentra' },
            { role: 'Surfaces', name: 'Website, product narrative, launch imagery, specs, conversion flow' },
          ]} />
        </CsSection>

        <CsThanks contactCta style={{ marginTop: '4rem' }} />

        <BottomNav
          sections={[
            { id: 'cs-overview', label: 'Overview' },
            { id: 'cs-strategy', label: 'Strategy' },
            { id: 'cs-architecture', label: 'Architecture' },
            { id: 'cs-design', label: 'Design' },
            { id: 'cs-impact', label: 'Outcome' },
          ]}
          liveUrl="https://www.mentra.glass"
        />
      </main>

      <NextProject slug="mentra-brand" title="Mentra Brand & Packaging" image="/Portfolio.github.io/Assets/Projects/mentra-brand/photos/render-both-frames.webp" />
      <Footer />
    </>
  )
}
