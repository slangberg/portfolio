import Image from 'next/image'
import { ArrowRight, ArrowUpRight, Check, GitFork, Star } from 'lucide-react'

import { cn } from '@/lib/utils'
import type { Project } from '@/content/projects'
import { siteConfig } from '@/content/site'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { GitHubIcon } from './icons'
import { Spotlight } from './spotlight'

/** Lays out project cards: featured ones span the row, and an odd last card fills it. */
export function ProjectGrid({ projects }: { projects: Project[] }) {
  const regular = projects.filter((p) => !p.featured)
  const lastRegular = regular.at(-1)

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {projects.map((project, i) => (
        <ProjectCard
          key={project.repo ?? project.title}
          project={project}
          index={i}
          className={cn(
            (project.featured ||
              (regular.length % 2 === 1 && project === lastRegular)) &&
              'sm:col-span-2'
          )}
        />
      ))}
    </div>
  )
}

export function ProjectCard({
  project,
  className,
  index = 0,
}: {
  project: Project
  className?: string
  index?: number
}) {
  const hasStats = !!project.stars || !!project.forks
  const wide = project.featured && project.preview

  return (
    <Spotlight
      className={cn('reveal', className)}
      style={{ '--i': index } as React.CSSProperties}
    >
      <Card className={cn('gap-0 py-0', wide && 'sm:grid sm:grid-cols-[1fr_1.1fr]')}>
        <div className="flex flex-col">
          <CardHeader className="gap-2 pt-5">
            <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
              {project.featured ? (
                <Badge className="border-brand/30 bg-brand/10 text-brand">Featured</Badge>
              ) : project.language ? (
                <span className="inline-flex items-center gap-1.5">
                  <span
                    className="size-2 rounded-full ring-1 ring-foreground/10"
                    style={{ background: project.language.color ?? 'var(--muted-foreground)' }}
                    aria-hidden
                  />
                  {project.language.name}
                </span>
              ) : (
                <span />
              )}
              <span className="font-mono tabular-nums">{project.year}</span>
            </div>
            <CardTitle className="text-lg font-semibold tracking-tight break-words">
              {project.title}
            </CardTitle>
            {project.description && (
              <CardDescription className="leading-relaxed">
                {project.description}
              </CardDescription>
            )}
          </CardHeader>

          <CardContent className="space-y-3 pt-4 pb-5">
            {project.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="font-normal">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
            {hasStats && (
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                {!!project.stars && (
                  <span className="inline-flex items-center gap-1" title="Stars">
                    <Star className="size-3.5" aria-hidden />
                    {project.stars}
                    <span className="sr-only">stars</span>
                  </span>
                )}
                {!!project.forks && (
                  <span className="inline-flex items-center gap-1" title="Forks">
                    <GitFork className="size-3.5" aria-hidden />
                    {project.forks}
                    <span className="sr-only">forks</span>
                  </span>
                )}
              </div>
            )}
          </CardContent>

          {(project.href || project.repo) && (
            <CardFooter className="mt-auto gap-2 bg-transparent px-5 py-3">
              {project.href && (
                <Button asChild size="sm" variant={project.featured ? 'default' : 'outline'}>
                  {/* Plain <a> for internal paths too: /storybook is a static build, not a route. */}
                  <a
                    href={project.href}
                    {...(!project.href.startsWith('/') && {
                      target: '_blank',
                      rel: 'noopener noreferrer',
                    })}
                  >
                    {project.hrefLabel ?? 'Live site'}
                    {project.href.startsWith('/') ? (
                      <ArrowRight data-icon="inline-end" />
                    ) : (
                      <ArrowUpRight data-icon="inline-end" />
                    )}
                  </a>
                </Button>
              )}
              {project.repo && (
                <Button asChild size="sm" variant="ghost">
                  <a href={project.repo} target="_blank" rel="noopener noreferrer">
                    <GitHubIcon data-icon="inline-start" />
                    Source
                  </a>
                </Button>
              )}
            </CardFooter>
          )}
        </div>

        {wide &&
          (project.preview === 'components' ? (
            <ComponentsPreview />
          ) : (
            project.preview && <ImagePreview {...project.preview} />
          ))}
      </Card>
    </Spotlight>
  )
}

/** Screenshot panel for a featured card. */
function ImagePreview({ image, alt }: { image: string; alt: string }) {
  return (
    <div className="relative hidden min-h-64 overflow-hidden border-l bg-muted/40 sm:block print:hidden">
      <Image
        src={image}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 520px, 50vw"
        className="object-cover object-center transition-transform duration-500 group-hover/card:scale-[1.03]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 ring-1 ring-foreground/5 ring-inset"
      />
    </div>
  )
}

/** Decorative specimen sheet of real UI kit components for the featured card. */
function ComponentsPreview() {
  return (
    <div
      aria-hidden
      inert
      className="relative hidden min-h-64 overflow-hidden border-l bg-muted/40 sm:block print:hidden"
    >
      <div className="backdrop-grid absolute inset-0 [mask-image:none]" />
      <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_70%_20%,color-mix(in_oklch,var(--brand)_18%,transparent),transparent_70%)]" />

      <div className="relative flex h-full flex-col justify-center gap-4 p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Button size="sm">Primary</Button>
          <Button size="sm" variant="outline">
            Outline
          </Button>
          <Button size="sm" variant="secondary">
            Secondary
          </Button>
        </div>

        <div className="w-full max-w-72 rotate-[-1.5deg] rounded-xl border bg-card p-3 shadow-lg shadow-black/5">
          <div className="flex items-center gap-3">
            <Avatar>
              {siteConfig.avatar && <AvatarImage src={siteConfig.avatar} alt="" />}
              <AvatarFallback>{siteConfig.initials}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1 space-y-1.5">
              <div className="h-2 w-24 rounded-full bg-foreground/80" />
              <div className="h-2 w-16 rounded-full bg-muted-foreground/40" />
            </div>
            <span className="relative inline-flex h-5 w-9 items-center rounded-full bg-brand p-0.5">
              <span className="ml-auto size-4 rounded-full bg-white shadow" />
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <Badge>Badge</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">
            <Check /> Accessible
          </Badge>
        </div>
      </div>
    </div>
  )
}
