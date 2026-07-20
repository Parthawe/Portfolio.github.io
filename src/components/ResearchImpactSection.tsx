import { Link } from 'react-router-dom'
import FigmaFrameLabel from './FigmaFrameLabel'

const evidenceStats = [
  { value: '20', label: 'Primary interviews', detail: 'Flagship healthcare study' },
  { value: '16', label: 'Multilingual participants', detail: 'People with limited English proficiency' },
  { value: '04', label: 'Healthcare professionals', detail: 'Clinical and care-system perspectives' },
  { value: '04', label: 'Research contexts', detail: 'Health, transit, housing, and streaming' },
] as const

const decisions = [
  {
    project: 'NYU Langone',
    href: '/medimorpho',
    finding: 'Translation alone did not resolve uncertainty across the care journey.',
    change: 'A shared encounter model for language identification, live understanding, and post-visit recap.',
  },
  {
    project: 'Raahi',
    href: '/raahi-project',
    finding: 'Riders experienced transit as one journey, not a collection of disconnected screens.',
    change: 'A connected service spanning app, kiosk, vehicle, route information, and wayfinding.',
  },
  {
    project: 'VJ Parivar',
    href: '/vj-software',
    finding: 'Parking was a spatial, high-consequence choice hidden inside an administrative flow.',
    change: 'A map-first booking experience that makes the physical decision visible before commitment.',
  },
  {
    project: 'CueTV',
    href: '/cuetv',
    finding: 'Specialist arts audiences browse with intent that generic entertainment categories miss.',
    change: 'Precise discovery paired with a repeatable audience re-engagement system.',
  },
] as const

const methods = [
  'Study framing',
  'User interviews',
  'Contextual inquiry',
  'Affinity mapping',
  'Journey mapping',
  'Task analysis',
  'Audience research',
  'Prototype validation',
] as const

export default function ResearchImpactSection() {
  return (
    <section className="research-impact" aria-labelledby="research-impact-title">
      <FigmaFrameLabel name="Research evidence" />

      <div className="research-impact__intro">
        <p className="research-impact__eyebrow"><i aria-hidden="true" /> Evidence → decision</p>
        <h2 id="research-impact-title">Research is useful when it changes what gets built.</h2>
        <p>
          I frame studies around the decision at risk, trace findings back to evidence,
          and translate synthesis into a product or service direction teams can act on.
        </p>
      </div>

      <dl className="research-impact__stats" aria-label="Verified research scale">
        {evidenceStats.map((stat) => (
          <div key={stat.label}>
            <dt>{stat.value}</dt>
            <dd>
              <strong>{stat.label}</strong>
              <span>{stat.detail}</span>
            </dd>
          </div>
        ))}
      </dl>

      <div className="research-impact__ledger">
        <div className="research-impact__ledger-head" aria-hidden="true">
          <span>Context</span>
          <span>Signal found</span>
          <span>Decision changed</span>
        </div>
        {decisions.map((decision, index) => (
          <Link key={decision.project} to={decision.href} className="research-impact__row figma-hover">
            <span className="research-impact__project"><i>{String(index + 1).padStart(2, '0')}</i>{decision.project}</span>
            <span>{decision.finding}</span>
            <strong>{decision.change}<b aria-hidden="true">↗</b></strong>
          </Link>
        ))}
      </div>

      <div className="research-impact__methods" aria-label="Research methods represented">
        <span>Methods represented</span>
        <ul>
          {methods.map((method) => <li key={method}>{method}</li>)}
        </ul>
      </div>
    </section>
  )
}
