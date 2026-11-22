import fs from 'node:fs'
import path from 'node:path'

export type PostMetadata = {
  title: string
  publishedAt: string
  summary: string
  image?: string
  tags?: string[]
}

export type Post = {
  slug: string
  metadata: PostMetadata
  content: string
}

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts')

function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/
  const match = frontmatterRegex.exec(fileContent)
  const block = match?.[1] ?? ''
  const content = fileContent.replace(frontmatterRegex, '').trim()
  const metadata: Record<string, unknown> = {}

  for (const line of block.trim().split('\n')) {
    const [key, ...rest] = line.split(': ')
    if (!key) continue
    let value = rest.join(': ').trim().replace(/^['"](.*)['"]$/, '$1')
    if (key.trim() === 'tags') {
      metadata.tags = value
        .replace(/^\[|\]$/g, '')
        .split(',')
        .map((t) => t.trim().replace(/^['"](.*)['"]$/, '$1'))
        .filter(Boolean)
      continue
    }
    metadata[key.trim()] = value
  }

  return { metadata: metadata as PostMetadata, content }
}

export function getBlogPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return []
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => path.extname(file) === '.mdx')
    .map((file) => {
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf-8')
      const { metadata, content } = parseFrontmatter(raw)
      return { slug: path.basename(file, '.mdx'), metadata, content }
    })
    .sort(
      (a, b) =>
        new Date(b.metadata.publishedAt).getTime() -
        new Date(a.metadata.publishedAt).getTime()
    )
}

export function getBlogPost(slug: string) {
  return getBlogPosts().find((post) => post.slug === slug)
}

export function formatDate(date: string, includeRelative = false) {
  const currentDate = new Date()
  const targetDate = new Date(date.includes('T') ? date : `${date}T00:00:00`)

  const fullDate = targetDate.toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
  if (!includeRelative) return fullDate

  const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear()
  const monthsAgo = currentDate.getMonth() - targetDate.getMonth()
  const daysAgo = currentDate.getDate() - targetDate.getDate()

  let relative = 'Today'
  if (yearsAgo > 0) relative = `${yearsAgo}y ago`
  else if (monthsAgo > 0) relative = `${monthsAgo}mo ago`
  else if (daysAgo > 0) relative = `${daysAgo}d ago`

  return `${fullDate} (${relative})`
}
