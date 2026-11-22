/**
 * Site-wide configuration. Edit this file to make the site yours —
 * everything in the header, footer, home page, metadata and RSS feed
 * reads from here.
 */

function resolveBaseUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL
  // Set automatically by Vercel for production deployments.
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }
  return 'http://localhost:3000'
}

export const siteConfig = {
  name: 'Your Name',
  initials: 'YN',
  role: 'Software Engineer',
  location: 'City, Country',
  email: 'you@example.com',
  /** Optional: path under /public, e.g. '/avatar.jpg'. Initials are shown when empty. */
  avatar: '',
  description:
    'Software engineer building fast, accessible products for the web. I write about the tools and ideas I use every day.',
  baseUrl: resolveBaseUrl(),
  /** Pinned repos from this GitHub profile are shown on /projects and the home page. */
  githubUsername: 'slangberg',
  links: {
    github: 'https://github.com/slangberg',
    linkedin: 'https://www.linkedin.com/in/your-handle',
    x: '',
  },
  nav: [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/blog', label: 'Blog' },
    { href: '/resume', label: 'Resume' },
  ],
} as const

export const baseUrl = siteConfig.baseUrl
