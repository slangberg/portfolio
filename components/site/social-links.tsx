import { Mail, Rss } from 'lucide-react'
import type { ComponentType, SVGProps } from 'react'

import { siteConfig } from '@/content/site'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { GitHubIcon, LinkedInIcon, XIcon } from './icons'

type LinkItem = {
  label: string
  href: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
  external?: boolean
}

export function getSocialLinks({ rss = false } = {}): LinkItem[] {
  const { links, email } = siteConfig
  const items: LinkItem[] = [
    { label: 'GitHub', href: links.github, icon: GitHubIcon, external: true },
    { label: 'LinkedIn', href: links.linkedin, icon: LinkedInIcon, external: true },
    { label: 'X', href: links.x, icon: XIcon, external: true },
    { label: 'Email', href: email ? `mailto:${email}` : '', icon: Mail },
  ]
  if (rss) items.push({ label: 'RSS', href: '/rss', icon: Rss })
  return items.filter((item) => item.href)
}

export function SocialLinks({ rss = false }: { rss?: boolean }) {
  return (
    <div className="flex items-center gap-1">
      {getSocialLinks({ rss }).map(({ label, href, icon: Icon, external }) => (
        <Tooltip key={label}>
          <TooltipTrigger asChild>
            <Button asChild variant="ghost" size="icon" aria-label={label}>
              <a
                href={href}
                {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
              >
                <Icon className="size-4" />
              </a>
            </Button>
          </TooltipTrigger>
          <TooltipContent>{label}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  )
}
