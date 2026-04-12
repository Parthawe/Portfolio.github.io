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
  const prefetch = useCallback(() => {
    const p = projects.find(pr => pr.slug === slug)
    if (p?.page) p.page()
  }, [slug])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6 }}
    >
      <Link className="next-project" to={`/${slug}`} onMouseEnter={prefetch}>
        <div className="wrap next-project-inner">
          <div>
            <div className="next-project-label">Next Project</div>
            <div className="next-project-title">{title}</div>
          </div>
          <div className="next-project-img">
            <img src={image} alt={title} loading="lazy" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
