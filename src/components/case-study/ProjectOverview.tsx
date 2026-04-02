interface ProjectOverviewProps {
  id?: string;
  sections: { label: string; content: string }[];
}

export default function ProjectOverview({ id, sections }: ProjectOverviewProps) {
  return (
    <div className="wrap project-overview reveal" id={id}>
      <div className="proj-overview-grid">
        {sections.map((s) => (
          <div key={s.label}>
            <h2 className="section-label">{s.label}</h2>
            <p className="proj-desc">{s.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
