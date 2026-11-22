/**
 * Portfolio projects rendered on /projects. Mark a few as `featured`
 * to show them on the home page.
 */

export type Project = {
  title: string
  description: string
  year: string
  tags: string[]
  href?: string
  repo?: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    title: 'Realtime Dashboard',
    description:
      'Streaming analytics dashboard with live charts, saved views, and role-based sharing.',
    year: '2025',
    tags: ['Next.js', 'WebSockets', 'PostgreSQL'],
    href: 'https://example.com',
    repo: 'https://github.com/your-handle/realtime-dashboard',
    featured: true,
  },
  {
    title: 'Design System',
    description:
      'Accessible component library built on Radix primitives and Tailwind, documented with live examples.',
    year: '2024',
    tags: ['React', 'Radix', 'Tailwind CSS'],
    repo: 'https://github.com/your-handle/design-system',
    featured: true,
  },
  {
    title: 'CLI Toolkit',
    description:
      'A small set of command-line tools for scaffolding and linting TypeScript monorepos.',
    year: '2023',
    tags: ['Node.js', 'TypeScript'],
    repo: 'https://github.com/your-handle/cli-toolkit',
  },
  {
    title: 'Recipe Planner',
    description:
      'Weekly meal planner that builds a shopping list from the recipes you pick.',
    year: '2022',
    tags: ['React Native', 'SQLite'],
    href: 'https://example.com',
  },
]
