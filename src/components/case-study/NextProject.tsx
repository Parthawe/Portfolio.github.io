import { Link } from "react-router-dom";

interface NextProjectProps {
  slug: string;
  title: string;
  image: string;
}

export default function NextProject({ slug, title, image }: NextProjectProps) {
  return (
    <Link className="next-project" to={`/${slug}`}>
      <div className="wrap next-project-inner">
        <div>
          <div className="next-project-label">Next Project</div>
          <div className="next-project-title">{title}</div>
        </div>
        <div className="next-project-img">
          <img src={image} alt={title} loading="lazy" />
        </div>
      </div>
    </Link>
  );
}
