import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import NdaGate from '../../components/NdaGate'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import CsSection from '../../components/case-study/CsSection'
import CsBody from '../../components/case-study/CsBody'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'
export default function MediMorphoPage(){return <><Helmet><title>NYU Langone · Parth Pawar</title><meta name="description" content="A public overview of healthcare UX research into multilingual care and communication." /></Helmet><Nav/><main id="main-content" className="project-main project-main--medimorpho" style={{'--project-color':'#57068c'} as React.CSSProperties}>
<ProjectHeader backLink="/work" backLabel="Back to work" categorySlug="ux-research" tags={['Healthcare UX','Service design','Research']} title="NYU Langone" subtitle="Understanding language and communication across the healthcare journey." showHeaderSummary={false} heroFraming="image" heroImage="/Assets/Projects/MediMorpho/nyu-langone-building-clear.webp" heroAlt="NYU Langone Health building signage" info={[{label:'Contribution',value:'Research, synthesis and system framing'},{label:'Team',value:'5-person NYU team'},{label:'Timeline',value:'January–February 2024'}]}/>
<CsSection id="cs-public-story" label="Overview" title="Communication across the whole visit"><CsBody><p>The project examined how language and system-navigation barriers affect a healthcare visit, from finding care to understanding the next steps.</p><p>Our approach combined ecosystem research and interviews to frame a connected service concept. Interview evidence, synthesis, findings and the report are reserved for private review.</p></CsBody></CsSection>
<NdaGate slug="medimorpho" delivery="withheld"/><BottomNav placement="side" sections={[{id:'cs-public-story',label:'Overview'},{id:'case-study-access-medimorpho',label:'Access'}]}/></main><NextProject slug="raahi-project" title="Raahi" image="/Assets/mockups/projects/raahi-project_16x9.webp"/><Footer/></>}
