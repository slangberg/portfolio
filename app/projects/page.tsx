import type { Metadata } from 'next'
import { ArrowUpRight } from 'lucide-react'

import { siteConfig } from '@/content/site'
import { getAllProjects } from '@/lib/github'
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/site/section-heading'
import { ProjectGrid } from '@/components/site/project-card'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Selected work and side projects.',
}

// Re-fetch pinned repos from GitHub once a day (see lib/github.ts).
export const revalidate = 86400

export default async function ProjectsPage() {
  const projects = await getAllProjects()

  return (
    <section>
      <PageHeader
        eyebrow="Work"
        title="Projects"
        description="Selected work and side projects, including the repos pinned on my GitHub profile."
      />
      <ProjectGrid projects={projects} />
      {siteConfig.githubUsername && (
        <div className="mt-10 flex justify-center">
          <Button asChild variant="outline">
            <a
              href={`https://github.com/${siteConfig.githubUsername}?tab=repositories`}
              target="_blank"
              rel="noopener noreferrer"
            >
              All repositories on GitHub
              <ArrowUpRight data-icon="inline-end" />
            </a>
          </Button>
        </div>
      )}
    </section>
  )
}
