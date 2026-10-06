import { projectRecords } from '../../data/projectRecords'

export default function ProjectRecord({ slug }: { slug: string }) {
  const record = projectRecords[slug]
  if (!record) return null
  return <div className="project-record">
    <span>{record.kind}</span>
    <details>
      <summary>About the material</summary>
      <p>{record.evidence}</p>
      {record.boundary && <p>{record.boundary}</p>}
    </details>
  </div>
}
