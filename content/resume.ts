/**
 * Resume data rendered on /resume (and summarised on the home page).
 * Replace the placeholder entries with your own.
 */

export type Experience = {
  company: string
  role: string
  location?: string
  start: string
  end: string
  url?: string
  highlights: string[]
  stack?: string[]
}

export type Education = {
  school: string
  degree: string
  start: string
  end: string
  notes?: string
}

export const summary =
  'Product-minded engineer with experience shipping web applications end to end — from data models and APIs to polished, accessible interfaces. Comfortable leading projects, mentoring, and working closely with design.'

export const experience: Experience[] = [
  {
    company: 'Acme Corp',
    role: 'Senior Software Engineer',
    location: 'Remote',
    start: '2023',
    end: 'Present',
    url: 'https://example.com',
    highlights: [
      'Led the rebuild of the customer dashboard in Next.js, cutting page load time by 45%.',
      'Designed a shared component library adopted by four product teams.',
      'Mentored three engineers and ran the frontend guild.',
    ],
    stack: ['TypeScript', 'React', 'Next.js', 'PostgreSQL'],
  },
  {
    company: 'Globex',
    role: 'Software Engineer',
    location: 'City, Country',
    start: '2020',
    end: '2023',
    highlights: [
      'Built and owned the billing service handling millions of monthly transactions.',
      'Introduced end-to-end testing and cut production incidents by a third.',
    ],
    stack: ['Node.js', 'GraphQL', 'AWS'],
  },
  {
    company: 'Initech',
    role: 'Junior Developer',
    start: '2018',
    end: '2020',
    highlights: [
      'Shipped internal tools that automated weekly reporting for the ops team.',
    ],
    stack: ['Python', 'Django'],
  },
]

export const education: Education[] = [
  {
    school: 'State University',
    degree: 'B.Sc. Computer Science',
    start: '2014',
    end: '2018',
  },
]

export const skills: Record<string, string[]> = {
  Languages: ['TypeScript', 'JavaScript', 'Python', 'SQL'],
  Frontend: ['React', 'Next.js', 'Tailwind CSS', 'Accessibility'],
  Backend: ['Node.js', 'PostgreSQL', 'GraphQL', 'REST'],
  Tooling: ['Vercel', 'AWS', 'Docker', 'GitHub Actions'],
}

/** Optional: put a PDF in /public and set its path here to show a download button. */
export const resumePdf = ''
