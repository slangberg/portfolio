import type { Metadata } from 'next'
import { projects } from '@/content/projects'
import { PageHeader } from '@/components/site/section-heading'
import { ProjectCard } from '@/components/site/project-card'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Selected work and side projects.',
}

export default function ProjectsPage() {
  return (
    <section>
      <PageHeader title="Projects" description="Selected work and side projects." />
      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  )
}
