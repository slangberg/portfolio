import type { Metadata } from 'next'
import { Download, Mail, MapPin } from 'lucide-react'

import { siteConfig } from '@/content/site'
import { education, experience, resumePdf, skills, summary } from '@/content/resume'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { PrintButton } from '@/components/site/print-button'
import { getSocialLinks } from '@/components/site/social-links'

export const metadata: Metadata = {
  title: 'Resume',
  description: `Experience, skills and education of ${siteConfig.name}.`,
}

function ResumeSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-4 sm:grid-cols-[9rem_1fr] sm:gap-8 print:grid-cols-[8rem_1fr] print:gap-6">
      <h2 className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
        {title}
      </h2>
      <div className="min-w-0">{children}</div>
    </section>
  )
}

export default function ResumePage() {
  const contacts = getSocialLinks().filter((l) => l.label !== 'Email')

  return (
    <div className="space-y-10 print:space-y-6 print:text-[13px]">
      <header className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">{siteConfig.name}</h1>
          <p className="text-lg text-muted-foreground">{siteConfig.role}</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-3.5" />
              {siteConfig.location}
            </span>
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center gap-1.5 hover:text-foreground"
            >
              <Mail className="size-3.5" />
              {siteConfig.email}
            </a>
            {contacts.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-foreground"
              >
                <Icon className="size-3.5" />
                {href.replace(/^https?:\/\/(www\.)?/, '')}
              </a>
            ))}
          </div>
        </div>
        <div className="flex gap-2 print:hidden">
          {resumePdf && (
            <Button asChild>
              <a href={resumePdf} download>
                <Download data-icon="inline-start" />
                Download PDF
              </a>
            </Button>
          )}
          <PrintButton />
        </div>
      </header>

      <Separator />

      <ResumeSection title="Summary">
        <p className="leading-relaxed">{summary}</p>
      </ResumeSection>

      <ResumeSection title="Experience">
        <ol className="space-y-4">
          {experience.map((job) => (
            <li key={`${job.company}-${job.start}`}>
              <Card className="print:break-inside-avoid print:bg-transparent print:py-0 print:ring-0">
                <CardContent className="space-y-3 print:px-0">
                  <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                    <div>
                      <h3 className="font-medium">{job.role}</h3>
                      <p className="text-muted-foreground">
                        {job.url ? (
                          <a
                            href={job.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline-offset-2 hover:underline"
                          >
                            {job.company}
                          </a>
                        ) : (
                          job.company
                        )}
                        {job.location && ` · ${job.location}`}
                      </p>
                    </div>
                    <p className="shrink-0 text-sm text-muted-foreground tabular-nums">
                      {job.start} — {job.end}
                    </p>
                  </div>
                  <ul className="list-disc space-y-1 pl-4 marker:text-muted-foreground">
                    {job.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                  {job.stack && (
                    <div className="flex flex-wrap gap-1">
                      {job.stack.map((tech) => (
                        <Badge key={tech} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </li>
          ))}
        </ol>
      </ResumeSection>

      <ResumeSection title="Skills">
        <dl className="space-y-3">
          {Object.entries(skills).map(([group, items]) => (
            <div key={group} className="flex flex-col gap-1.5 sm:flex-row sm:gap-4">
              <dt className="w-24 shrink-0 text-sm font-medium">{group}</dt>
              <dd className="flex flex-wrap gap-1">
                {items.map((skill) => (
                  <Badge key={skill} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </ResumeSection>

      <ResumeSection title="Education">
        <ul className="space-y-3">
          {education.map((edu) => (
            <li
              key={edu.school}
              className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline"
            >
              <div>
                <h3 className="font-medium">{edu.degree}</h3>
                <p className="text-muted-foreground">{edu.school}</p>
                {edu.notes && <p className="text-sm text-muted-foreground">{edu.notes}</p>}
              </div>
              <p className="shrink-0 text-sm text-muted-foreground tabular-nums">
                {edu.start} — {edu.end}
              </p>
            </li>
          ))}
        </ul>
      </ResumeSection>
    </div>
  )
}
