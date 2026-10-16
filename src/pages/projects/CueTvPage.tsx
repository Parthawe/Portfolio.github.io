import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import NdaGate from '../../components/NdaGate'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import CsSection from '../../components/case-study/CsSection'
import CsBody from '../../components/case-study/CsBody'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'
export default function CueTvPage(){return <><Helmet><title>CueTV · Parth Pawar</title><meta name="description" content="A public overview of product design for a specialist performing-arts streaming catalogue." /></Helmet><Nav/><main id="main-content" className="project-main project-main--cuetv" style={{'--project-color':'#C8102E'} as React.CSSProperties}>
<ProjectHeader backLink="/work" backLabel="Back to work" categorySlug="ux-design" tags={['Product design','Streaming']} title="CueTV" subtitle="Discovery and playback for a specialist performing-arts catalogue." showHeaderSummary={false} heroFraming="image" heroImage="/Assets/Projects/cuetv-public/refresh/hero-devices.png" heroAlt="CueTV across television, laptop, tablet, phone and remote" liveUrl="https://www.cuetv.online" info={[{label:'Client',value:'Operabase'},{label:'Role',value:'Product designer'},{label:'Duration',value:'7 months'},{label:'Year',value:'2021'}]}/>
<CsSection id="cs-public-story" label="Overview" title="Help an audience find its performance"><CsBody><p>CueTV brings opera, ballet, symphonies and classical music to a specialist audience. My work covered the discovery and playback experience across devices, alongside the product’s campaign system.</p><p>The design connected browsing and viewing around the catalogue. Detailed screens, research and project decisions are available only through private review.</p></CsBody></CsSection>
<NdaGate slug="cuetv" delivery="withheld"/><BottomNav placement="side" sections={[{id:'cs-public-story',label:'Overview'},{id:'case-study-access-cuetv',label:'Access'}]}/></main><NextProject slug="executivelens" title="ExecutiveLens" image="/Assets/images/executivelens.webp"/><Footer/></>}
