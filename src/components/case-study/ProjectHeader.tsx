import { Link } from 'react-router-dom'

interface ProjectHeaderProps {
  backLink: string
  backLabel: string
  tags: string[]
  title: string
  subtitle: string
  info: { label: string; value: string }[]
  heroImage?: string
  heroAlt?: string
  liveUrl?: string
}

export default function ProjectHeader({
  backLink,
  backLabel,
  tags,
  title,
  subtitle,
  info,
  heroImage,
  heroAlt,
  liveUrl,
}: ProjectHeaderProps) {
  return (
    <div className="wrap project-header">
      <div className="proj-back">
        <Link to={backLink} className="back-link">
          &larr; {backLabel}
        </Link>
      </div>
      <div className="proj-meta">
        <div className="proj-tags">
          {tags.map((tag) => (
            <span key={tag} className="proj-tag">
              {tag}
            </span>
          ))}
        </div>
        <h1 className="proj-title hero-anim hero-anim-1">{title}</h1>
        <p className="proj-subtitle hero-anim hero-anim-2">{subtitle}</p>
        <div className="proj-info-row hero-anim hero-anim-3">
          {info.map((item) => (
            <div key={item.label} className="proj-info-item">
              <span className="proj-info-label">{item.label}</span>
              <span className="proj-info-val">{item.value}</span>
            </div>
          ))}
        </div>
        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="proj-live-link hero-anim hero-anim-4"
          >
            Visit Live Site
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
        )}
      </div>
      {heroImage && (
        <div className="proj-hero-img hero-anim hero-anim-4">
          <img src={heroImage} alt={heroAlt || ''} />
        </div>
      )}
    </div>
  )
}
