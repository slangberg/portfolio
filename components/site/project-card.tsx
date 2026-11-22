import { ArrowUpRight, GitFork, Star } from 'lucide-react'

import type { Project } from '@/content/projects'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { GitHubIcon } from './icons'

export function ProjectCard({ project }: { project: Project }) {
  const hasMeta = project.language || !!project.stars || !!project.forks

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="break-words">{project.title}</CardTitle>
        <CardAction className="text-xs text-muted-foreground tabular-nums">
          {project.year}
        </CardAction>
        {project.description && (
          <CardDescription>{project.description}</CardDescription>
        )}
      </CardHeader>

      {(project.tags.length > 0 || hasMeta) && (
        <CardContent className="space-y-3">
          {project.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          {hasMeta && (
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
              {project.language && (
                <span className="inline-flex items-center gap-1.5">
                  <span
                    className="size-2.5 rounded-full ring-1 ring-foreground/10"
                    style={{ background: project.language.color ?? 'var(--muted-foreground)' }}
                    aria-hidden
                  />
                  {project.language.name}
                </span>
              )}
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
      )}

      {(project.href || project.repo) && (
        <CardFooter className="mt-auto gap-2">
          {project.href && (
            <Button asChild size="sm" variant="outline">
              <a href={project.href} target="_blank" rel="noopener noreferrer">
                Live site
                <ArrowUpRight data-icon="inline-end" />
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
    </Card>
  )
}
