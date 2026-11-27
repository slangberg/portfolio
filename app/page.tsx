import Link from 'next/link'
import { ArrowRight, FileText, MapPin } from 'lucide-react'

import { siteConfig } from '@/content/site'
import { getAllProjects } from '@/lib/github'
import { experience } from '@/content/resume'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { PostList } from '@/components/site/post-list'
import { ProjectGrid } from '@/components/site/project-card'
import { SectionHeading } from '@/components/site/section-heading'
import { SocialLinks } from '@/components/site/social-links'

// Re-fetch pinned repos from GitHub once a day (see lib/github.ts).
export const revalidate = 86400

const stats = [
  { value: '10+', label: 'Years building UI' },
  { value: '25+', label: 'Products supported' },
  { value: 'WCAG', label: 'Accessibility first' },
]

const toolkit = [
  'React',
  'TypeScript',
  'Next.js',
  'Tailwind CSS',
  'Storybook',
  'Radix',
  'Vite',
  'Playwright',
  'Node.js',
  'D3.js',
]

export default async function HomePage() {
  const all = await getAllProjects()
  const featured = [
    ...all.filter((p) => p.featured),
    ...all.filter((p) => !p.featured).slice(0, 4),
  ]
  const current = experience[0]
  const reveal = (i: number) => ({ '--i': i }) as React.CSSProperties

  return (
    <div className="space-y-24 sm:space-y-28">
      <section className="grid items-center gap-10 md:grid-cols-[1fr_auto] md:gap-16">
        <div className="space-y-7">
          {current && (
            <p
              className="reveal inline-flex items-center gap-2 rounded-full border bg-background/60 py-1 pr-3 pl-2 text-sm text-muted-foreground backdrop-blur"
              style={reveal(0)}
            >
              <span className="relative flex size-2 shrink-0">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              <span>
                <span className="hidden sm:inline">{current.role.split(',')[0]} at </span>
                <span className="sm:hidden">Currently at </span>
                <span className="font-medium text-foreground">{current.company}</span>
              </span>
            </p>
          )}

          <div className="space-y-5">
            <h1
              className="reveal text-4xl font-semibold tracking-tighter text-balance sm:text-6xl sm:leading-[1.05]"
              style={reveal(1)}
            >
              <span className="sr-only">{siteConfig.name}, </span>
              Design systems and interfaces{' '}
              <span className="text-gradient">built to scale.</span>
            </h1>
            <p
              className="reveal max-w-xl text-lg leading-relaxed text-muted-foreground"
              style={reveal(2)}
            >
              I&apos;m <span className="font-medium text-foreground">{siteConfig.name}</span>,{' '}
              {siteConfig.description.charAt(0).toLowerCase() + siteConfig.description.slice(1)}
            </p>
          </div>

          <div className="reveal flex flex-wrap items-center gap-2" style={reveal(3)}>
            <Button asChild size="lg" className="group">
              <Link href="/projects">
                View projects
                <ArrowRight
                  data-icon="inline-end"
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/resume">
                <FileText data-icon="inline-start" />
                Resume
              </Link>
            </Button>
            <div className="ml-1">
              <SocialLinks />
            </div>
          </div>
        </div>

        <div className="reveal relative mx-auto md:mx-0" style={reveal(2)}>
          <div
            aria-hidden
            className="absolute -inset-6 rounded-[2.5rem] bg-linear-to-br from-brand/40 to-brand-2/30 opacity-70 blur-2xl"
          />
          <div className="relative rounded-[2rem] bg-linear-to-br from-brand/60 via-border to-brand-2/60 p-px shadow-2xl shadow-brand/10">
            <Avatar className="size-48 rounded-[calc(2rem-1px)] bg-card after:hidden sm:size-56">
              {siteConfig.avatar && (
                <AvatarImage
                  src={siteConfig.avatar}
                  alt={siteConfig.name}
                  className="rounded-[calc(2rem-1px)]"
                />
              )}
              <AvatarFallback className="rounded-[calc(2rem-1px)] text-4xl">
                {siteConfig.initials}
              </AvatarFallback>
            </Avatar>
          </div>
          <p className="absolute -bottom-4 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full border bg-background/80 px-3 py-1 text-xs whitespace-nowrap text-muted-foreground shadow-sm backdrop-blur">
            <MapPin className="size-3.5" />
            {siteConfig.location}
          </p>
        </div>

        <dl className="reveal grid grid-cols-3 divide-x rounded-2xl border bg-card/60 backdrop-blur md:col-span-2" style={reveal(4)}>
          {stats.map((stat) => (
            <div key={stat.label} className="px-4 py-5 sm:px-6">
              <dt className="text-xs text-muted-foreground sm:text-sm">{stat.label}</dt>
              <dd className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {featured.length > 0 && (
        <section>
          <SectionHeading eyebrow="Selected work" title="Projects" href="/projects" />
          <ProjectGrid projects={featured} />
        </section>
      )}

      <section className="grid gap-10 md:grid-cols-[1fr_1.4fr]">
        <div className="space-y-4">
          <SectionHeading eyebrow="Toolkit" title="What I work with" />
          <p className="-mt-2 text-muted-foreground">
            The tools I reach for most. The full list is on my{' '}
            <Link href="/resume" className="font-medium text-foreground underline decoration-brand/50 underline-offset-4 hover:decoration-brand">
              resume
            </Link>
            .
          </p>
          <ul className="flex flex-wrap gap-2">
            {toolkit.map((tool) => (
              <li
                key={tool}
                className="rounded-lg border bg-card px-3 py-1.5 text-sm shadow-xs transition-colors hover:border-brand/40"
              >
                {tool}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <SectionHeading eyebrow="Writing" title="Recent posts" href="/blog" />
          <PostList limit={3} />
        </div>
      </section>
    </div>
  )
}
