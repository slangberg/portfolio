'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Mail, Menu } from 'lucide-react'
import { cn } from '@/lib/utils'

import { siteConfig } from '@/content/site'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { ThemeToggle } from './theme-toggle'

function isActive(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname.startsWith(href)
}

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 px-4 pt-3 print:hidden">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 rounded-2xl border bg-background/70 py-2 pr-2 pl-3 shadow-[0_8px_30px_-12px_rgb(0_0_0/0.12)] backdrop-blur-xl supports-backdrop-filter:bg-background/55 dark:shadow-[0_8px_30px_-12px_rgb(0_0_0/0.6)]">
        <Link
          href="/"
          className="group flex items-center gap-2.5 font-semibold tracking-tight"
        >
          <Avatar className="size-8 ring-2 ring-brand/30 transition group-hover:ring-brand/60">
            {siteConfig.avatar && (
              <AvatarImage src={siteConfig.avatar} alt="" />
            )}
            <AvatarFallback className="text-xs">{siteConfig.initials}</AvatarFallback>
          </Avatar>
          <span>{siteConfig.name}</span>
        </Link>

        <nav
          className="hidden items-center gap-0.5 rounded-xl bg-muted/60 p-1 sm:flex"
          aria-label="Main"
        >
          {siteConfig.nav.map((item) => {
            const active = isActive(pathname, item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground',
                  active && 'bg-background text-foreground shadow-sm ring-1 ring-foreground/5'
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          {siteConfig.email && (
            <Button asChild className="hidden md:inline-flex">
              <a href={`mailto:${siteConfig.email}`}>
                <Mail data-icon="inline-start" />
                Get in touch
              </a>
            </Button>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="sm:hidden"
                aria-label="Open menu"
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>{siteConfig.name}</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4" aria-label="Mobile">
                {siteConfig.nav.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <Button
                      asChild
                      variant="ghost"
                      size="lg"
                      className={cn(
                        'justify-start',
                        isActive(pathname, item.href) && 'bg-muted'
                      )}
                    >
                      <Link href={item.href}>{item.label}</Link>
                    </Button>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
