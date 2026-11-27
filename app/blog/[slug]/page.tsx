import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

import { baseUrl, siteConfig } from '@/content/site'
import { formatDate, getBlogPost, getBlogPosts } from '@/lib/posts'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { CustomMDX } from '@/components/site/mdx'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return getBlogPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return {}

  const { title, publishedAt: publishedTime, summary: description, image } =
    post.metadata
  const ogImage = image ?? `${baseUrl}/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()

  return (
    <article className="mx-auto max-w-3xl">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : `${baseUrl}/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${baseUrl}/blog/${post.slug}`,
            author: { '@type': 'Person', name: siteConfig.name },
          }),
        }}
      />

      <Button asChild variant="ghost" size="sm" className="-ml-2.5 mb-6 text-muted-foreground">
        <Link href="/blog">
          <ArrowLeft data-icon="inline-start" />
          All posts
        </Link>
      </Button>

      <header className="reveal space-y-5">
        <h1 className="text-4xl font-semibold tracking-tighter text-balance sm:text-5xl">
          {post.metadata.title}
        </h1>
        {post.metadata.summary && (
          <p className="text-lg leading-relaxed text-muted-foreground">
            {post.metadata.summary}
          </p>
        )}
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <time dateTime={post.metadata.publishedAt} className="font-mono text-xs">
            {formatDate(post.metadata.publishedAt, true)}
          </time>
          {post.metadata.tags?.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </header>

      <Separator className="my-10" />

      <div className="prose max-w-none prose-lg dark:prose-invert prose-headings:tracking-tight">
        <CustomMDX source={post.content} />
      </div>
    </article>
  )
}
