import Link from 'next/link'
import { ArrowRight, FileText, MapPin } from 'lucide-react'

import { siteConfig } from '@/content/site'
import { projects } from '@/content/projects'
import { experience } from '@/content/resume'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { PostList } from '@/components/site/post-list'
import { ProjectCard } from '@/components/site/project-card'
import { SectionHeading } from '@/components/site/section-heading'
import { SocialLinks } from '@/components/site/social-links'

export default function HomePage() {
  const featured = projects.filter((p) => p.featured).slice(0, 2)
  const current = experience[0]

  return (
    <div className="space-y-16">
      <section className="space-y-6">
        <Avatar className="size-16">
          {siteConfig.avatar && (
            <AvatarImage src={siteConfig.avatar} alt={siteConfig.name} />
          )}
          <AvatarFallback className="text-lg">{siteConfig.initials}</AvatarFallback>
        </Avatar>
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {siteConfig.name}
          </h1>
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-muted-foreground">
            <span>{siteConfig.role}</span>
            {current && (
              <>
                <span aria-hidden>·</span>
                <span>{current.company}</span>
              </>
            )}
            <span aria-hidden>·</span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="size-3.5" />
              {siteConfig.location}
            </span>
          </p>
          <p className="max-w-prose leading-relaxed">{siteConfig.description}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button asChild>
            <Link href="/projects">
              View projects
              <ArrowRight data-icon="inline-end" />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/resume">
              <FileText data-icon="inline-start" />
              Resume
            </Link>
          </Button>
          <Separator orientation="vertical" className="mx-1 h-6!" />
          <SocialLinks />
        </div>
      </section>

      {featured.length > 0 && (
        <section>
          <SectionHeading title="Featured projects" href="/projects" />
          <div className="grid gap-4 sm:grid-cols-2">
            {featured.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </section>
      )}

      <section>
        <SectionHeading title="Recent writing" href="/blog" />
        <PostList limit={3} />
      </section>
    </div>
  )
}
