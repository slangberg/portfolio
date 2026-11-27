import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

/** Small uppercase label shown above headings. */
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-2 font-mono text-xs font-medium tracking-widest text-brand uppercase">
      <span className="h-px w-6 bg-linear-to-r from-brand to-transparent" aria-hidden />
      {children}
    </p>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  href,
  linkLabel = 'View all',
}: {
  eyebrow?: string
  title: string
  href?: string
  linkLabel?: string
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div className="space-y-2">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      </div>
      {href && (
        <Button asChild variant="ghost" size="sm" className="group text-muted-foreground">
          <Link href={href}>
            {linkLabel}
            <ArrowRight
              data-icon="inline-end"
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </Button>
      )}
    </div>
  )
}

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string
  title: string
  description?: string
}) {
  return (
    <div className="reveal mb-12 space-y-4">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h1 className="text-4xl font-semibold tracking-tighter text-balance sm:text-5xl">
        {title}
      </h1>
      {description && (
        <p className="max-w-2xl text-lg text-muted-foreground">{description}</p>
      )}
    </div>
  )
}
