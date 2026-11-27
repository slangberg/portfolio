import { ArrowUpRight, Component, Mail } from 'lucide-react'

import { siteConfig } from '@/content/site'
import { Button } from '@/components/ui/button'
import { LinkedInIcon } from './icons'
import { SocialLinks } from './social-links'

export function SiteFooter() {
  return (
    <footer className="mx-auto w-full max-w-5xl px-4 pb-10 print:hidden">
      {siteConfig.email && (
        <div className="relative mb-10 overflow-hidden rounded-3xl border bg-card px-6 py-10 sm:px-10">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_100%_0%,color-mix(in_oklch,var(--brand)_14%,transparent),transparent_70%)]"
          />
          <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
                Let&apos;s <span className="text-gradient">build something</span> together.
              </h2>
              <p className="max-w-md text-muted-foreground">
                Open to conversations about design systems, front-end architecture
                and accessibility.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button asChild size="lg">
                <a href={`mailto:${siteConfig.email}`}>
                  <Mail data-icon="inline-start" />
                  Email me
                </a>
              </Button>
              {siteConfig.links.linkedin && (
                <Button asChild size="lg" variant="outline">
                  <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer">
                    <LinkedInIcon data-icon="inline-start" />
                    LinkedIn
                    <ArrowUpRight data-icon="inline-end" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col-reverse items-start justify-between gap-4 border-t pt-6 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}
          </p>
          <span aria-hidden>·</span>
          {/* Plain <a>: Storybook is a static build in public/, not a Next route. */}
          <a
            href="/storybook"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
          >
            <Component className="size-3.5" />
            UI kit
          </a>
        </div>
        <SocialLinks rss />
      </div>
    </footer>
  )
}
