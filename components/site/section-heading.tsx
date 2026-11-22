import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function SectionHeading({
  title,
  href,
  linkLabel = 'View all',
}: {
  title: string
  href?: string
  linkLabel?: string
}) {
  return (
    <div className="mb-4 flex items-center justify-between gap-4">
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      {href && (
        <Button asChild variant="ghost" size="sm" className="text-muted-foreground">
          <Link href={href}>
            {linkLabel}
            <ArrowRight data-icon="inline-end" />
          </Link>
        </Button>
      )}
    </div>
  )
}

export function PageHeader({
  title,
  description,
}: {
  title: string
  description?: string
}) {
  return (
    <div className="mb-10 space-y-2">
      <h1 className="text-3xl font-semibold tracking-tight text-balance">{title}</h1>
      {description && <p className="text-muted-foreground">{description}</p>}
    </div>
  )
}
