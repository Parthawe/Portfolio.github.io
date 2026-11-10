import { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { siGithub, siInstagram } from 'simple-icons'
import { CONTACT_EMAIL } from '../../config/site'
import '../../styles/mentra-studio.css'

const A = '/Assets/images/mentra/'
const B = '/Assets/Projects/mentra-brand/'
const chapters = [
  { id: 'problems', label: 'Pain Points', color: 'red' },
  { id: 'information-gathering', label: 'Information Gathering', color: 'white' },
  { id: 'goals', label: 'Goal', color: 'green' },
  { id: 'development', label: 'Development', color: 'white' },
  { id: 'impact', label: 'Impact', color: 'green' },
] as const

function BrandIcon({ path }: { path: string }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d={path} fill="currentColor" /></svg>
}

function SocialLinks() {
  return <nav className="ms-social" aria-label="Contact and social profiles">
    <a href={`mailto:${CONTACT_EMAIL}`} aria-label="Email Parth"><span className="ms-envelope" aria-hidden="true" /></a>
    <a href="https://www.linkedin.com/in/parth-pawar-1501/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><span className="ms-linkedin" aria-hidden="true">in</span></a>
    <a href="https://www.instagram.com/designwhich.works" target="_blank" rel="noreferrer" aria-label="Instagram"><BrandIcon path={siInstagram.path} /></a>
    <a href="https://github.com/parthawe" target="_blank" rel="noreferrer" aria-label="GitHub"><BrandIcon path={siGithub.path} /></a>
  </nav>
}

function FirstUseDemo() {
  const [step, setStep] = useState(0)
  const [error, setError] = useState(false)
  const [model, setModel] = useState('Mentra Live')
  const headings = ['Welcome to Mentra. Let’s get your glasses set up.', 'Which glasses are yours?', 'Your glasses are connected.', 'You’re ready. Make them yours.']
  const advance = () => { setError(false); setStep(value => Math.min(value + 1, 3)) }
  return <div className="ms-demo">
    <p className="ms-demo-note">This is a prototype, please feel free to interact.</p>
    <div className="ms-composite">
      <img className="ms-hand" src="/Assets/mentra-studio/phone-hand.png" alt="" width="755" height="1297" />
      <div className="ms-phone" aria-label="Mentra onboarding prototype">
        <div className="ms-phone-status" aria-hidden="true"><span>9:41</span><i /><span>▮▮▮ ▰</span></div>
        <div className="ms-phone-nav"><button aria-label="Previous setup step" disabled={step === 0 && !error} onClick={() => { setError(false); setStep(value => Math.max(0, value - 1)) }}>‹</button><img src={`${B}photos/logo.svg`} alt="Mentra"/><button aria-label="Restart prototype" onClick={() => { setStep(0); setError(false) }}>↺</button></div>
        <div className="ms-progress" role="progressbar" aria-label="Setup progress" aria-valuenow={step + 1} aria-valuemin={1} aria-valuemax={4}>{[0,1,2,3].map(index => <i key={index} className={index <= step ? 'is-done' : ''} />)}</div>
        <div className="ms-phone-content" aria-live="polite">
          <h2>{error ? 'Let’s get you connected.' : headings[step]}</h2>
          {step === 1 && !error ? <fieldset className="ms-models"><legend>Choose your glasses</legend>{['Mentra Live', 'Even Realities G2'].map(name => <label key={name}><input type="radio" name="glasses" checked={model === name} onChange={() => setModel(name)}/><span>{name}</span></label>)}</fieldset> : step === 3 ? <img className="ms-phone-home" src={`${A}deck/home-after.png`} alt="Original Mentra app grid and runtime entry"/> : <div className="ms-product-crop"><img src={`${B}photos/product-front.png`} alt="Mentra smart glasses"/></div>}
          {error && <p className="ms-phone-help">Keep your glasses nearby and powered on. Your model selection is saved.</p>}
          {step === 2 && !error && <p className="ms-phone-help">{model} · Connected</p>}
        </div>
        <div className="ms-phone-actions">
          {step === 0 && <p>Explore the setup sequence.<br/>Pairing is simulated in this prototype.</p>}
          {step === 1 && !error && <button className="ms-help-link" onClick={() => setError(true)}>Having trouble connecting?</button>}
          <button className="ms-phone-primary" onClick={step === 3 ? () => setStep(0) : advance}>{error ? 'Reconnect' : ['Set up my glasses', 'Connect glasses', 'Explore MentraOS', 'Start again'][step]}</button>
        </div>
        <div className="ms-home-indicator" aria-hidden="true" />
      </div>
    </div>
  </div>
}

function Connector({ branch = false }: { branch?: boolean }) {
  return <div className={`ms-connector ${branch ? 'ms-connector--branch' : ''}`} aria-hidden="true"><i/><i/><i/></div>
}

function SectionHeading({ id, label, color }: { id: string; label: string; color: string }) {
  return <h2 id={`${id}-title`} className="ms-section-heading"><span className={`ms-beacon ms-beacon--${color}`} aria-hidden="true"/>{label}</h2>
}

function Evidence({ id, alt, caption }: { id: string; alt: string; caption: string }) {
  return <figure className="ms-evidence"><a href={`/Assets/case-study-slides/mentra/slide-${id}.webp`} target="_blank" rel="noreferrer" aria-label={`Enlarge: ${alt}`}><img src={`/Assets/case-study-slides/mentra/slide-${id}.webp`} alt={alt} width="1920" height="1080" loading="lazy"/></a><figcaption>{caption}<span>↗</span></figcaption></figure>
}

export default function MentraStudioPage() {
  const storyRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState('problems')
  const [phase, setPhase] = useState<'first' | 'runtime'>('first')
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id)
    }, { root: window.matchMedia('(min-width: 1200px)').matches ? storyRef.current : null, rootMargin: '-5% 0px -65% 0px', threshold: 0 })
    chapters.forEach(({id}) => { const node = document.getElementById(id); if (node) observer.observe(node) })
    const hash = window.location.hash.slice(1)
    if (hash) requestAnimationFrame(() => document.getElementById(hash)?.scrollIntoView())
    return () => observer.disconnect()
  }, [])
  return <div className="mentra-studio">
    <Helmet><title>Mentra / Case Study · Parth Pawar</title><meta name="description" content="Designing first use and everyday control for Mentra AI glasses. A product design case study by Parth Pawar."/><meta name="robots" content="noindex"/></Helmet>
    <a className="ms-skip" href="#experience">Skip to the prototype</a>
    <aside className="ms-brief">
      <header className="ms-header"><Link to="/" className="ms-mark" aria-label="Parth Pawar homepage"><i/><i/></Link><Link className="ms-next-project" to="/mentra-miniapps">Next Project <span>➝</span></Link></header>
      <div className="ms-brief-body"><div className="ms-hatch-rail" aria-hidden="true"/><div className="ms-brief-scroll">
        <div className="ms-introduction"><span className="ms-label">Case Study</span><h1>Designing Mentra AI<br className="ms-desktop-break"/> Glasses Onboarding</h1></div>
        <div className="ms-context"><h2>Context</h2><p>Mentra builds AI smart glasses and the software that connects them to everyday use. MentraOS brings the glasses, companion app, and MiniApp ecosystem together as one product.</p></div>
        <div className="ms-context"><h2>Description</h2><p>First use took 9 minutes and 40 seconds. Even after setup, wearers struggled to understand what was running, which sensors were active, and how to regain control. As Head of Design, I led research, testing, and delivery across onboarding, pairing, the companion app, and runtime controls. The work extended into the MiniApp ecosystem and launch website, giving people a clearer path from unboxing to everyday use.</p></div>
        <dl className="ms-meta"><div><dt>Role</dt><dd>Head of Design</dd></div><div><dt>Timeline</dt><dd>Q3 ’25–Present</dd></div><div><dt>Company</dt><dd><a href="https://mentraglass.com" target="_blank" rel="noreferrer">Mentra ↗</a></dd></div><div><dt>Team</dt><dd className="ms-team">2 founders<br/>8 engineers</dd></div><div><dt>Platforms</dt><dd>Glasses<br/>Mobile & web</dd></div><div><dt>Impact</dt><dd className="ms-impact-label">Improved activation</dd></div></dl>
        <nav className="ms-chapters" aria-label="Case study chapters"><span className="ms-label">Breakdown</span>{chapters.map(({id,label,color}) => <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined} onClick={() => setActive(id)}><span className={`ms-beacon ms-beacon--${color}`} aria-hidden="true"/><span>{label}</span><span className="ms-chevron" aria-hidden="true">›</span></a>)}</nav>
        <Link className="ms-original" to="/mentra">Original case study ↗</Link>
      </div></div>
      <footer className="ms-brief-footer"><Link to="/work">PARTH PAWAR</Link><span>COPYRIGHT PARTH PAWAR {new Date().getFullYear()}</span></footer>
    </aside>
    <SocialLinks/>
    <main id="main-content" className="ms-story" ref={storyRef} tabIndex={-1}>
      <div className="ms-story-inner">
        <section id="experience" className="ms-opening" aria-label="Interactive Mentra experience"><FirstUseDemo/><Connector/></section>
        <section id="problems" className="ms-section ms-problems" aria-labelledby="problems-title">
          <SectionHeading {...chapters[0]}/>
          <div className="ms-baselines"><div className="ms-blueprint ms-corner--left"><strong>9m 40s</strong><span>Time to first value</span></div><div className="ms-blueprint ms-corner--top"><strong>61%</strong><span>Complete pairing</span></div><div className="ms-blueprint ms-corner--right"><strong>52%</strong><span>MiniApp task completion</span></div></div>
          <div className="ms-blueprint ms-problem-statement">Wearers couldn’t tell what was running or how to regain control.</div>
          <p className="ms-source-note">Source-reported baselines from separate first-use and runtime phases.</p>
        </section>
        <Connector branch/>
        <section id="information-gathering" className="ms-section" aria-labelledby="information-gathering-title">
          <SectionHeading {...chapters[1]}/>
          <div className="ms-audit ms-blueprint"><div className="ms-audit-phone"><img src={`${A}deck/home-before.png`} width="343" height="727" alt="Original device-led home screen before the runtime redesign" loading="lazy"/></div><div className="ms-audit-findings"><div className="ms-panel-cap" aria-hidden="true"><span>+</span></div><div className="ms-audit-copy"><span>First-use & runtime audit</span><article><h3>Setup took too long</h3><p>Reaching first value took 9 minutes and 40 seconds.</p></article><article><h3>Device controls led the home screen</h3><p>A large device card and active/inactive lists competed with app discovery.</p></article><article><h3>Running apps needed a home</h3><p>Count, app identity, data access, and stop controls needed one place.</p></article></div></div></div>
        </section>
        <Connector/>
        <section id="goals" className="ms-section" aria-labelledby="goals-title"><SectionHeading {...chapters[2]}/><div className="ms-goal ms-blueprint"><div><span>Goal</span><h3>Make first use clear and everyday control easy to find.</h3></div><div><span>KPIs</span><ul><li>Time to first value</li><li>Pairing completion</li><li>MiniApp task completion</li><li>7-day return</li></ul></div></div></section>
        <Connector/>
        <section id="development" className="ms-section" aria-labelledby="development-title"><SectionHeading {...chapters[3]}/>
          <div className="ms-development-intro"><h3>Connect before exploring</h3><p>Give setup and pairing a dedicated sequence before everyday app use.</p></div>
          <Evidence id="97-5038" alt="Original Mentra setup sequence" caption="Setup / Original design"/>
          <Evidence id="77-2532" alt="Original Mentra pairing progression" caption="Pairing / Original design"/>
          <div className="ms-development-row ms-blueprint"><div className="ms-development-copy"><span>Updates</span><article><h3>Give apps the home screen</h3><p>Replace the dominant device panel with an app grid.</p></article><article><h3>Bring runtime into one drawer</h3><p>Keep running count, app identity, data access, and stop controls together.</p></article><article><h3>Keep recovery specific</h3><p>Lost connection leads to Reconnect. Blocked permission leads to Settings.</p></article></div><div className="ms-runtime-phone"><img src={`${A}deck/home-after.png`} alt="Redesigned Mentra home screen with app grid and bottom runtime entry" loading="lazy"/></div></div>
          <div className="ms-screen-pair"><figure><figcaption>Before</figcaption><img src={`${A}deck/home-before.png`} alt="Device-led Mentra home screen" loading="lazy"/></figure><figure><figcaption>After</figcaption><img src={`${A}deck/home-after.png`} alt="App-led Mentra home screen" loading="lazy"/></figure></div>
          <Evidence id="0-65" alt="Qualitative comparison of persistent dock, card switcher, and selected bottom drawer" caption="Development / Qualitative tradeoffs"/>
          <Evidence id="0-66" alt="Bottom runtime drawer showing running count, active app, data access and stop controls" caption="Runtime / Selected system"/>
          <Evidence id="500-3981" alt="Listening, working and clarification states for Mentra AI" caption="Feedback / Listening, working, unsure"/>
          <Evidence id="500-3980" alt="Recovery actions for connection, permission, device and request failures" caption="Recovery / Preserve intent and offer a next action"/>
        </section>
        <Connector/>
        <section id="impact" className="ms-section ms-results" aria-labelledby="impact-title"><SectionHeading {...chapters[4]}/>
          <div className="ms-outcome ms-blueprint"><span>Product evaluation</span><h3>First use improved.<br/>Runtime became the next problem.</h3></div>
          <div className="ms-phase-switch" role="group" aria-label="Evaluation phase"><button aria-pressed={phase === 'first'} onClick={() => setPhase('first')}>First use</button><button aria-pressed={phase === 'runtime'} onClick={() => setPhase('runtime')}>Runtime</button></div>
          <div className="ms-results-table" aria-live="polite">{(phase === 'first' ? [['Time to first value','9m 40s → 5m 10s'],['Pairing completion','61% → 84%'],['7-day return','22% → 23%']] : [['MiniApp task completion','52% → 78%'],['7-day return','22% → 41%']]).map(([label,value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div>
          <p className="ms-source-note">Source-reported results from separate phases. Study dates, cohort sizes, and comparison conditions are not public. Runtime results do not isolate the drawer’s effect.</p>
          <Evidence id={phase === 'first' ? '329-8449' : '329-8363'} alt={phase === 'first' ? 'Original first-use phase results' : 'Original runtime phase results'} caption="Impact / Original results slide"/>
          <div className="ms-outcome ms-blueprint"><span>Learning</span><h3>Getting connected was only the beginning.</h3><p>First-use return moved from 22% to 23%. Understanding and controlling the running system became the next design priority.</p></div>
          <Link className="ms-followup" to="/mentra-miniapps">Explore the MiniApp ecosystem <span>↗</span></Link>
        </section>
        <Connector/>
        <footer className="ms-story-footer"><h2>Have more questions?<br/>Let’s set up a call</h2><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL} ↗</a><div><Link to="/mentra">Original case study ↗</Link><a href="#experience">Back to top ↑</a></div><p>Layout and phone-in-hand presentation adapted from <a href="https://jayson.studio/2026/onboarding" target="_blank" rel="noreferrer">Jayson Hahn’s onboarding case study</a>. Mentra content and product assets from the existing portfolio. The playable demo is a new adaptation with simulated pairing.</p></footer>
      </div>
    </main>
  </div>
}
