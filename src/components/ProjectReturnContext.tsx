import { createContext, useContext, useRef, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { projectRoutes } from '../data/projectRoutes'
type ReturnTarget = { href: string; label: string }
const work = { href: '/work', label: 'Back to work' }
const collections: Record<string,string> = { '/work':'work','/healthcare':'healthcare','/ai':'AI','/ux-design':'UX design','/ux-research':'UX research','/design-engineering':'design engineering','/design-engineer':'design engineering','/installations':'installations','/brand':'brand','/brand-visual':'brand and visual','/fintech':'fintech','/design-for-good':'design for good','/crypto':'crypto','/ai-wearables':'AI wearables','/experience-preview':'project experiences' }
const Context = createContext<ReturnTarget>(work)
/** Track internal collection origins, including browser back/forward, without trusting referrers or arbitrary URLs. */
export function ProjectReturnProvider({children}:{children:ReactNode}) {
 const location=useLocation()
 const history=useRef(new Map<string,ReturnTarget>())
 const previous=useRef<{path:string;search:string;target:ReturnTarget}|null>(null)
 const prior=previous.current
 const target=history.current.get(location.key) ?? (prior && prior.path !== location.pathname && collections[prior.path] ? {href:prior.path+prior.search,label:`Back to ${collections[prior.path]}`} : prior && projectRoutes.some(project=>`/${project.slug}`===prior.path) ? prior.target : work)
 if (!history.current.has(location.key)) history.current.set(location.key,target)
 previous.current={path:location.pathname,search:location.search,target}
 return <Context.Provider value={target}>{children}</Context.Provider>
}
export const useProjectReturn=()=>useContext(Context)
