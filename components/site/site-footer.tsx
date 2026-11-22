import { Component } from 'lucide-react'

import { siteConfig } from '@/content/site'
import { Separator } from '@/components/ui/separator'
import { SocialLinks } from './social-links'

export function SiteFooter() {
  return (
    <footer className="mx-auto w-full max-w-3xl px-4 pb-10 print:hidden">
      <Separator className="mb-6" />
      <div className="flex flex-col-reverse items-start justify-between gap-4 sm:flex-row sm:items-center">
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
