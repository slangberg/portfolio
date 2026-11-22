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
  name: 'Sam Langberg',
  initials: 'SL',
  role: 'Senior Front-End Engineer',
  location: 'Decatur, GA',
  email: 'samuel.langberg@gmail.com',
  /** Optional: path under /public, e.g. '/avatar.jpg'. Initials are shown when empty. */
  avatar: '/avatar.jpg',
  description:
    'Front-end engineer with 10+ years building design systems and shared component libraries in React and TypeScript, taking work from early design through documentation and adoption, with accessibility built in.',
  baseUrl: resolveBaseUrl(),
  /** Pinned repos from this GitHub profile are shown on /projects and the home page. */
  githubUsername: 'slangberg',
  links: {
    github: 'https://github.com/slangberg',
    linkedin: 'https://www.linkedin.com/in/samuel-langberg-a2930619/',
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
