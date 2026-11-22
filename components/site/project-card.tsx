import { ArrowUpRight } from 'lucide-react'

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
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
        <CardAction className="text-xs text-muted-foreground tabular-nums">
          {project.year}
        </CardAction>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-1">
        {project.tags.map((tag) => (
          <Badge key={tag} variant="outline">
            {tag}
          </Badge>
        ))}
      </CardContent>
      {(project.href || project.repo) && (
        <CardFooter className="mt-auto gap-2">
          {project.href && (
            <Button asChild size="sm" variant="outline">
              <a href={project.href} target="_blank" rel="noopener noreferrer">
                Visit
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
