import type { Metadata } from 'next'
import { PageHeader } from '@/components/site/section-heading'
import { PostList } from '@/components/site/post-list'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Notes and essays on software, tools and craft.',
}

export default function BlogPage() {
  return (
    <section>
      <PageHeader
        title="Blog"
        description="Notes and essays on software, tools and craft."
      />
      <PostList />
    </section>
  )
}
