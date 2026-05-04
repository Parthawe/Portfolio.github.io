import { useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { projects } from "../../data/projects";

interface NextProjectProps {
  slug: string;
  title: string;
  image: string;
}

export default function NextProject({ slug, title, image }: NextProjectProps) {
  const project = projects.find(pr => pr.slug === slug)
  const prefetch = useCallback(() => {
    if (project?.page) project.page()
  }, [project])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6 }}
    >
      <Link className="next-project" to={`/${slug}`} onMouseEnter={prefetch} onFocus={prefetch}>
        <div className="wrap next-project-inner">
          <div>
            <div className="next-project-label">Next Project</div>
            <div className="next-project-title">{title}</div>
            {project?.tag && <div className="next-project-meta">{project.tag}</div>}
            {project?.desc && <p className="next-project-desc">{project.desc}</p>}
          </div>
          <div className="next-project-img">
            <img src={image} alt={title} loading="lazy" decoding="async" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
