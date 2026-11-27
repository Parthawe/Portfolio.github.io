import CsScreenExplorer from '../../components/case-study/CsScreenExplorer'
import '../../components/case-study/service-decisions.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
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
import { scrollEvidenceViewport } from '../../components/case-study/evidenceKeyboard'
import '../../styles/glassly-case-study.css'

const base = '/Assets/Projects/Glassly'
const sections = [
  { id: 'cs-summary', label: 'Overview' },
  { id: 'glassly-product', label: 'Product story' },
  { id: 'glassly-hardware', label: 'App, widget and hardware' },
  { id: 'glassly-demo', label: 'Try the demo' },
  { id: 'glassly-brand', label: 'Brand system' },
  { id: 'glassly-interaction', label: 'Interaction rules' },
  { id: 'glassly-delivery', label: 'Delivery' },
]

export default function GlasslyPage() {
  const [viewMode, setViewMode] = useState<'summary' | 'full'>('full')
  return <>
    <Helmet>
      <title>Glassly · Parth Pawar</title>
      <meta name="description" content="Glassly website design connecting phone-first miniapps, a home-screen widget, compatible glasses and the developer path, with the selected homepage and earlier design artifacts." />
      <link rel="canonical" href="https://designwhich.works/glassly" />
      <meta property="og:title" content="Glassly · Parth Pawar" />
      <meta property="og:type" content="article" />
      <meta property="og:image" content="https://designwhich.works/Assets/Projects/Glassly/homepage-hero.webp" />
      <meta property="og:image:width" content="2328" />
      <meta property="og:image:height" content="1356" />
    </Helmet>
    <Nav />
    <main id="main-content" className="project-main project-main--glassly" style={{'--project-color':'#004DFC'} as React.CSSProperties}>
      <ProjectHeader backLink="/work" backLabel="Back to work" categorySlug="ai-wearables"
        tags={['Product website','Brand system','Design engineering']}
        title="Glassly" subtitle="Making a wearable miniapp platform understandable before someone puts on the glasses."
        info={[{label:'Role',value:'Product story, brand system and website'},{label:'Context',value:'Web, phone and glasses demonstration'},{label:'Year',value:'2026'}]}
        heroExperience="visual" heroFraming="image" visualHeroImage={`${base}/homepage-hero.webp`} visualHeroAlt="Selected Glassly homepage with an outlined glasses hero, Download the app and Explore the demo actions, and partner hardware names"
        heroCaption="Opening of the selected Glassly homepage. The full capture is available in the case study."
        visualSummary="Miniapps on your phone. Useful information in view on your glasses."
        liveUrl="https://glassly.ai" liveLabel="Glassly website" showHeaderSummary={false} />
      <ProjectQuickSummary slug="glassly" title="Project overview" viewMode={viewMode} onViewModeChange={setViewMode} variant="open" proofLimit={0} />
      <div className="wrap glassly-case-actions">
        <Link className="glass-action" to="/glassly/onboarding">Explore the Glassly onboarding study ↗</Link>
        <Link className="glass-action" to="/glassly/onboarding#pairing-recovery">Try the pairing recovery ↗</Link>
        <a className="glass-action" href={`${base}/homepage-supplied.webp`} target="_blank" rel="noopener noreferrer">Open the full homepage ↗</a>
      </div>
      <CsExpandPreview expanded={viewMode==='full'} onExpand={()=>setViewMode('full')} cta="Read the full case study" previewImage={`${base}/homepage-hero.webp`} sectionIds={sections.map(section=>section.id)}>
        <section id="glassly-product" className="glassly-case-section"><div className="wrap">
          <h2>Start with the phone, then explain the glasses</h2>
          <div className="glassly-case-intro"><p>The homepage puts “Download the app” and “Explore the demo” beside the explanation of phone-based miniapps. It then shows the Store, a home-screen widget, the relationship between the app and accessories, and the hardware catalog.</p><p>I wanted people to understand what they could do on their phone before choosing glasses. The Store and Android widget sections give that path concrete interfaces, while manufacturer names keep the hardware identities clear.</p></div>
          <details className="service-source-details">
            <summary>Inspect the full Glassly homepage</summary>
            <p className="glassly-case-note">Scroll through the complete capture. Use the arrow keys or Page Down when the image viewport is focused.</p>
            <div className="glassly-homepage-capture" tabIndex={0} aria-label="Full selected Glassly homepage, scroll to inspect" onKeyDown={scrollEvidenceViewport}>
              <CsImage src={`${base}/homepage-supplied.webp`} alt="Full selected Glassly homepage from the smart-glasses hero through miniapp Store, Android widget, ecosystem, hardware catalog, SDK quickstart, community, FAQ and footer" />
            </div>
            <div className="glassly-case-actions"><a className="glass-action" href={`${base}/homepage-supplied.webp`} target="_blank" rel="noopener noreferrer">Open the complete capture ↗</a></div>
          </details>
        </div></section>
        <section id="glassly-hardware" className="glassly-case-section"><div className="wrap">
          <h2>Connect discovery, everyday access and hardware</h2>
          <p className="glassly-case-intro">The selected homepage moves from finding a miniapp to keeping it available on the home screen. The ecosystem section explains where the app runs and how glasses and accessories connect. The developer path follows that product explanation.</p>
          <div className="glassly-homepage-explorer">
          <CsScreenExplorer format="landscape" label="Inspect sections of the selected Glassly homepage" screens={[
            {title:'Miniapp Store',label:'Browse, install and use',src:`${base}/homepage-store.webp`,alt:'Selected Glassly homepage Store section with an iPhone miniapp preview and Browse, Install and Use steps',caption:'Selected homepage section. The Store preview is labelled illustrative.',decision:{question:'What can someone do before connecting glasses?',choice:'Explain miniapp discovery through Browse, Install and Use.',evidence:'The section places the phone-first explanation beside an iPhone Store preview.'}},
            {title:'Home-screen widget',label:'Keep miniapps in reach',src:`${base}/homepage-widget.webp`,alt:'Selected Glassly homepage Android widget showing glasses connection, battery and running miniapps beside Open, Widget, Pin and Launch steps',caption:'Selected homepage section.',decision:{question:'How does someone get back to a running miniapp?',choice:'Show the widget and pinned-app path on the home screen.',evidence:'The Android example pairs the widget with Open, Widget, Pin and Launch steps.',limit:'This capture presents the interaction. Live widget behavior has not been retested.'}},
            {title:'Ecosystem',label:'App and connected hardware',src:`${base}/homepage-ecosystem.webp`,alt:'Selected Glassly ecosystem section connecting miniapps, the Glassly App and glasses and accessories',caption:'Selected homepage section.',decision:{question:'Which part runs the miniapp?',choice:'Place the Glassly App between miniapps and connected hardware.',evidence:'The diagram names Miniapps, Glassly App, and Glasses & accessories.'}},
            {title:'Hardware',label:'Devices and manufacturers',src:`${base}/homepage-hardware.webp`,alt:'Selected Glassly hardware catalog with Even Realities, Mentra, RayNeo, MemoMind and Nimo names and separate hardware category tabs',caption:'Selected homepage section. Product listings reflect the capture.',decision:{question:'Which hardware belongs to which maker?',choice:'Keep manufacturer names beside device names and separate catalog categories.',evidence:'The catalog distinguishes Smart glasses, Accessories and Coming soon.',limit:'The capture does not verify current availability or compatibility.'}},
            {title:'Developer SDK',label:'Quickstart and example',src:`${base}/homepage-developer.webp`,alt:'Selected Glassly developer section with Start building, Quickstart, Install CLI, Publish and Update controls beside a miniapp code example',caption:'Selected homepage section.',decision:{question:'What can a developer do after understanding the platform?',choice:'Show a quickstart and example miniapp beside the developer action.',evidence:'The section includes setup commands and a registerMiniapp example.',limit:'The displayed commands are source imagery. This case study has not run the SDK.'}},
          ]} />
          </div>
        </div></section>
        <section id="glassly-demo" className="glassly-case-section"><div className="wrap">
          <h2>Show the phone and glasses together</h2>
          <p className="glassly-case-intro">Choose Home, Captions, Navigation, Notifications, Assist or Terminal. This earlier website demonstration changes the phone interface and glasses output together. Manual selection pauses playback, and the larger mirror keeps the selected scene.</p>
          <GlasslyDemo />
        </div></section>
        <section id="glassly-brand" className="glassly-case-section"><div className="wrap">
          <h2>Carry the brand rules into the product story</h2>
          <p className="glassly-case-intro">The earlier brand guide records the palette, typography, hardware attribution and illustrative-content rules. The selected homepage carries the cobalt actions into a lighter grid, outlined glasses and device presentations. The guide remains an earlier project artifact.</p>
          <CsImage src={`${base}/brand-13.webp`} aspectRatio="16 / 9" alt="Original Glassly imagery rules: natural proportions, separate sample captions and Even Realities hardware attribution" />
          <details id="glassly-interaction" className="service-source-details">
            <summary>Inspect the visual and interaction guidelines</summary>
            <CsScreenExplorer format="landscape" label="Choose an original Glassly guideline" screens={[
              {title:'Palette',label:'Brand guide · 8',src:`${base}/brand-8.webp`,alt:'Original Glassly color palette',caption:'Cobalt actions, pale-blue product surfaces and midnight demonstration background.'},
              {title:'Typography',label:'Brand guide · 10',src:`${base}/brand-10.webp`,alt:'Original Helvetica Neue typography rules',caption:'Light headings and regular body text, with size and spacing establishing hierarchy.'},
              {title:'Layout',label:'Brand guide · 15',src:`${base}/brand-15.webp`,alt:'Original desktop and mobile Glassly layout guidelines',caption:'Original desktop and mobile reading order.'},
              {title:'Effects',label:'Brand guide · 17',src:`${base}/brand-17.webp`,alt:'Original Glassly grain and frosted-detail guidelines',caption:'Frosted details are confined to captions and controls.'},
              {title:'Motion',label:'Brand guide · 18',src:`${base}/brand-18.webp`,alt:'Original Glassly entrance, control feedback and reduced-motion guidelines',caption:'A single product entrance, brief feedback and reduced-motion behavior.'},
              {title:'Naming',label:'Brand guide · 20',src:`${base}/brand-20.webp`,alt:'Original Glassly voice and product naming guidelines',caption:'Consistent names for the App, Miniapp SDK and Miniapp Store.'},
            ]} />
          </details>
        </div></section>
        <section id="glassly-delivery" className="glassly-case-section"><div className="wrap">
          <h2>Delivered artifacts and open questions</h2>
          <p className="glassly-case-intro">The case study brings together the selected homepage, its Store and widget presentations, the hardware and developer paths, an earlier six-scene demonstration and the original brand guide. The captured website and illustrative demos document the design. Adoption, conversion and live hardware behavior still need evaluation.</p>
          <div className="glassly-case-actions"><a className="glass-action" href={`${base}/brand-guidelines.pdf`} target="_blank" rel="noopener noreferrer">Read the original brand guidelines ↗</a><a className="glass-action" href="https://glassly.ai" target="_blank" rel="noopener noreferrer">Glassly website ↗</a></div>
          <p className="cs-caption">The complete capture is the visual reference for this case study. The external website may show a different revision.</p>
        </div></section>
        <CsThanks contactCta />
      </CsExpandPreview>
      <BottomNav sections={viewMode==='full'?sections:[sections[0]]} modeAction={{label:viewMode==='full'?'Quick overview':'Full case study',onClick:()=>setViewMode(viewMode==='full'?'summary':'full')}} />
    </main>
    <NextProject slug="mentra" title="Mentra" image="/Assets/mockups/projects/mentra_16x9.webp" />
    <Footer />
  </>
}
