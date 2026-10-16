import { Outlet } from 'react-router-dom'
import PortfolioChat from './PortfolioChat'

export default function ExperienceChatLayout() {
  return <><div id="site-zoom-stage"><Outlet /></div><PortfolioChat /></>
}
