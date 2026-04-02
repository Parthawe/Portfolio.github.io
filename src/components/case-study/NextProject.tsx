import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface NextProjectProps {
  slug: string;
  title: string;
  image: string;
}

export default function NextProject({ slug, title, image }: NextProjectProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6 }}
    >
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
    </motion.div>
  );
}
