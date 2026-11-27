import Image, { type ImageProps } from 'next/image'
import Link from 'next/link'
import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote/rsc'
import React, { type ComponentProps, type ReactNode } from 'react'
import { highlight } from 'sugar-high'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

function Table({ data }: { data: { headers: string[]; rows: string[][] } }) {
  return (
    <table>
      <thead>
        <tr>
          {data.headers.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => (
              <td key={j}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

// Paths that aren't Next.js pages (a static build and a feed), so they need a
// full page load instead of client-side navigation.
const NON_PAGE_PATHS = ['/storybook', '/rss']

function CustomLink({ href = '', ...props }: ComponentProps<'a'>) {
  if (NON_PAGE_PATHS.some((p) => href === p || href.startsWith(`${p}/`))) {
    return <a href={href} {...props} />
  }
  if (href.startsWith('/')) return <Link href={href} {...props} />
  if (href.startsWith('#')) return <a href={href} {...props} />
  return <a href={href} target="_blank" rel="noopener noreferrer" {...props} />
}

function RoundedImage(props: ImageProps) {
  return <Image className="rounded-lg" {...props} alt={props.alt} />
}

function Code({ children, ...props }: ComponentProps<'code'>) {
  const html = highlight(String(children ?? ''))
  return <code dangerouslySetInnerHTML={{ __html: html }} {...props} />
}

/** <Callout>…</Callout> inside MDX renders as a shadcn Card. */
function Callout({ children }: { children: ReactNode }) {
  return (
    <Card className="not-prose my-8 bg-brand/5 ring-brand/20" size="sm">
      <CardContent className="text-sm leading-relaxed [&_a]:font-medium [&_a]:underline [&_a]:decoration-muted-foreground/50 [&_a]:underline-offset-2 [&_a:hover]:decoration-foreground">
        {children}
      </CardContent>
    </Card>
  )
}

function slugify(str: string) {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/&/g, '-and-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
}

function createHeading(level: 1 | 2 | 3 | 4 | 5 | 6) {
  const Heading = ({ children }: { children?: ReactNode }) => {
    const slug = slugify(typeof children === 'string' ? children : String(children))
    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement('a', {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: 'anchor',
          'aria-hidden': true,
        }),
      ],
      children
    )
  }
  Heading.displayName = `Heading${level}`
  return Heading
}

const components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  hr: () => <Separator className="my-8" />,
  a: CustomLink,
  code: Code,
  Image: RoundedImage,
  Table,
  Callout,
  Badge,
  Button,
}

export function CustomMDX(props: MDXRemoteProps) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  )
}
