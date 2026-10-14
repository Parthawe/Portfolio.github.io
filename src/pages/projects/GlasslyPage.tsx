import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import ProjectQuickSummary from '../../components/case-study/ProjectQuickSummary'
import CsExpandPreview from '../../components/case-study/CsExpandPreview'
import CsImage from '../../components/case-study/CsImage'
import CsThanks from '../../components/case-study/CsThanks'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'
import GlasslyDemo from '../../components/GlasslyDemo'
import '../../styles/glassly-case-study.css'

const base = '/Assets/Projects/Glassly'
const sections = [
  { id: 'cs-summary', label: 'Overview' },
  { id: 'glassly-product', label: 'Product story' },
  { id: 'glassly-demo', label: 'Try the demo' },
  { id: 'glassly-hardware', label: 'Hardware & miniapps' },
  { id: 'glassly-brand', label: 'Brand system' },
  { id: 'glassly-interaction', label: 'Interaction rules' },
  { id: 'glassly-delivery', label: 'Delivery' },
]

export default function GlasslyPage() {
  const [viewMode, setViewMode] = useState<'summary' | 'full'>('summary')
  return <>
    <Helmet>
      <title>Glassly · Parth Pawar</title>
      <meta name="description" content="Glassly: product storytelling, brand guidelines and a working website demo for a wearable miniapp platform. Original interfaces and design evidence." />
      <meta property="og:title" content="Glassly · Parth Pawar" />
      <meta property="og:type" content="article" />
      <meta property="og:image" content="https://designwhich.works/Assets/Projects/Glassly/cover.webp" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="900" />
    </Helmet>
    <Nav />
    <main id="main-content" className="project-main project-main--glassly" style={{'--project-color':'#004DFC'} as React.CSSProperties}>
      <ProjectHeader backLink="/work" backLabel="Back to work" categorySlug="ai-wearables"
        tags={['Wearables','Product website','Brand system','Design engineering']}
        title="Glassly" subtitle="Making a wearable miniapp platform understandable before someone puts on the glasses."
        info={[{label:'Scope',value:'Product story, brand system and website'},{label:'Period',value:'2026'},{label:'Surfaces',value:'Web, phone and glasses demonstration'}]}
        heroExperience="visual" visualHeroImage={`${base}/cover.webp`} visualHeroAlt="Glassly identity with Even Realities G2 partner hardware"
        visualSummary="Miniapps on your phone. Useful information in view on your glasses."
        liveUrl="https://glassly.ai" liveLabel="Open Glassly" showHeaderSummary={false} />
      <ProjectQuickSummary slug="glassly" title="Project overview" viewMode={viewMode} onViewModeChange={setViewMode} variant="open" proofLimit={0} />
      <CsExpandPreview expanded={viewMode==='full'} onExpand={()=>setViewMode('full')} cta="Read the full case study" previewImage={`${base}/website-hero.webp`} sectionIds={sections.map(section=>section.id)}>
        <section id="glassly-product" className="glassly-case-section"><div className="wrap">
          <h2>Explain the platform through everyday use</h2>
          <div className="glassly-case-intro"><p>Glassly connects miniapps on a phone to supported wearable hardware. The website needed to explain that relationship before asking visitors to explore devices or request early access.</p><p>The story starts with captions, directions and notifications. A wide product image gives the hardware room; a separate sample caption shows the idea without pretending to reproduce the optics of a lens.</p></div>
          <CsImage src={`${base}/website-hero.webp`} aspectRatio="1440 / 744" alt="Original Glassly homepage with the platform headline, Even Realities G2 photograph and a separately labelled sample caption" caption="Original website. Glassly is the platform; Even Realities makes the pictured hardware." />
        </div></section>
        <section id="glassly-demo" className="glassly-case-section"><div className="wrap">
          <h2>Let people see what a miniapp changes</h2>
          <p className="glassly-case-intro">Choose Home, Captions, Navigation, Notifications, Assist or Terminal. The original website demonstration changes the phone interface and glasses output together. Manual selection pauses playback, and the larger mirror keeps the selected scene.</p>
          <GlasslyDemo />
        </div></section>
        <section id="glassly-hardware" className="glassly-case-section"><div className="wrap">
          <h2>Separate the platform from the device</h2>
          <p className="glassly-case-intro">The product story moves from “start with your phone” to supported wearables, then to miniapps and the developer path. Hardware keeps its manufacturer identity. The device catalog distinguishes available hardware, accessories and coming-soon integrations.</p>
          <CsImage src={`${base}/devices.webp`} aspectRatio="1326 / 1083" alt="Original Glassly device catalog with manufacturer names and category filters" caption="Device availability reflects the captured website, rather than a permanent compatibility promise." />
          <CsImage src={`${base}/miniapps.webp`} aspectRatio="1326 / 686" alt="Original Glassly miniapp section showing the phone interface and descriptions of useful miniapps" />
          <CsImage src={`${base}/developers.webp`} aspectRatio="1326 / 494" alt="Original Glassly developer section linking builders to the miniapp SDK documentation" />
        </div></section>
        <section id="glassly-brand" className="glassly-case-section"><div className="wrap">
          <h2>One identity, with room for the hardware</h2>
          <p className="glassly-case-intro">Cobalt carries primary actions; pale blue gives the product a quiet stage; midnight frames the demonstration. Helvetica Neue uses light headings and regular body text. Scale and spacing establish hierarchy without making every label bold.</p>
          <CsImage src={`${base}/brand-8.webp`} aspectRatio="16 / 9" alt="Original Glassly brand guidelines: cobalt, accent blue, pale blue, paper, midnight and ink palette" />
          <CsImage src={`${base}/brand-10.webp`} aspectRatio="16 / 9" alt="Original Glassly typography guidelines specifying Helvetica Neue Light 300 and Regular 400" />
          <CsImage src={`${base}/brand-13.webp`} aspectRatio="16 / 9" alt="Original Glassly product imagery guidelines with hardware attribution and honest sample captions" />
        </div></section>
        <section id="glassly-interaction" className="glassly-case-section"><div className="wrap">
          <h2>Use motion to explain arrival and feedback</h2>
          <p className="glassly-case-intro">The glasses enter once. Frosted details stay confined to captions and controls. Keyboard focus remains visible, and reduced motion removes decorative transitions and demo autoplay. The product names stay consistent: Glassly App, Glassly Miniapp SDK and Glassly Miniapp Store.</p>
          <CsImage src={`${base}/brand-17.webp`} aspectRatio="16 / 9" alt="Original Glassly guidelines for subtle grain, bounded frosted details and readable text" />
          <CsImage src={`${base}/brand-18.webp`} aspectRatio="16 / 9" alt="Original Glassly motion guidelines: a single 760ms product entrance, brief control feedback and reduced-motion support" />
          <CsImage src={`${base}/brand-20.webp`} aspectRatio="16 / 9" alt="Original Glassly voice and product naming guidelines" />
        </div></section>
        <section id="glassly-delivery" className="glassly-case-section"><div className="wrap">
          <h2>What the work delivers</h2>
          <p className="glassly-case-intro">A website that moves from product explanation to a working demonstration, device discovery, miniapps and a developer path. The accompanying brand guidelines connect visual decisions to implementation rules. This case study documents those artifacts; it does not claim a measured increase in adoption or conversion.</p>
          <CsImage src={`${base}/brand-15.webp`} aspectRatio="16 / 9" alt="Original Glassly layout guidelines defining the desktop and mobile reading order and website section sequence" />
          <div className="glassly-case-actions"><a href={`${base}/brand-guidelines.pdf`} target="_blank" rel="noopener noreferrer">Read the original brand guidelines ↗</a><a href="https://glassly.ai" target="_blank" rel="noopener noreferrer">Visit Glassly ↗</a></div>
        </div></section>
        <CsThanks contactCta />
      </CsExpandPreview>
      <BottomNav sections={viewMode==='full'?sections:[sections[0]]} liveUrl="https://glassly.ai" modeAction={{label:viewMode==='full'?'Quick overview':'Full case study',onClick:()=>setViewMode(viewMode==='full'?'summary':'full')}} />
    </main>
    <NextProject slug="mentra" title="Mentra" image="/Assets/mockups/projects/mentra_16x9.webp" />
    <Footer />
  </>
}
