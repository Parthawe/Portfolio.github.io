import { useParams, Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useEffect } from 'react'
import { projects } from '@/data/projects'
import { ProjectHeader } from '@/components/project/ProjectHeader'
import { ReadingProgress } from '@/components/project/ReadingProgress'
import { SectionRenderer } from '@/components/project/SectionRenderer'
import { NextProject } from '@/components/project/NextProject'
import { BottomNav } from '@/components/project/BottomNav'

export function ProjectPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = slug ? projects[slug] : undefined

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!project) {
    return <Navigate to="/404" replace />
  }

  return (
    <>
      <Helmet>
        <title>{project.title} · Parth Pawar</title>
        <meta name="description" content={project.description} />
        {project.ogImage && <meta property="og:image" content={project.ogImage} />}
      </Helmet>

      <ReadingProgress color={project.projectColor} />
      {project.bottomNavSections && project.bottomNavSections.length > 0 && (
        <BottomNav sections={project.bottomNavSections} projectColor={project.projectColor} />
      )}

      <ProjectHeader project={project} />

      {project.sections.length > 0 && (
        <SectionRenderer sections={project.sections} projectColor={project.projectColor} />
      )}

      {project.nextProject && (
        <NextProject
          slug={project.nextProject.slug}
          title={project.nextProject.title}
          image={project.nextProject.image}
        />
      )}
    </>
  )
}
