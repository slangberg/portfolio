/**
 * Resume data rendered on /resume (and summarised on the home page).
 *
 * Street address and phone number are intentionally left out: this file is
 * published on the site and in a public repo.
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

export type EarlierExperience = {
  company: string
  role: string
  location?: string
  start: string
  end: string
  description: string
}

export type Education = {
  school: string
  degree: string
  start?: string
  end: string
  notes?: string
}

export const summary =
  'Senior Front-End Engineer with 10+ years building and maintaining production design systems and shared component libraries, evolving them through real-world use across multiple teams and product surfaces. Deep expertise in React, TypeScript, HTML, and CSS, taking interactive, responsive work from early design through implementation, documentation, and adoption. Experienced designing flexible component APIs, primitives, and theming and token architecture that give product teams meaningful control while preserving accessibility (WCAG, WAI-ARIA) and maintainability. Holds a high bar for design-code parity through component documentation sites, visual-regression testing, and close partnership with designers on ambiguous system-level tradeoffs. Has built multi-brand theming and internationalization systems supporting global, localized experiences, and uses AI-assisted development tools as a regular part of engineering work with clear judgment about validating their output. Formally trained in web design, which informs the visual and interaction judgment behind the systems built.'

export const experience: Experience[] = [
  {
    company: 'Momentive Software',
    role: 'Senior Software Engineer, AI (React)',
    location: 'Remote',
    start: 'Jun 2026',
    end: 'Present',
    highlights: [
      'Architected and built React-based UI for AI-powered analytics across a multi-tenant, multi-product SaaS platform, translating complex data models into clear, performant user-facing experiences.',
      'Designed and developed interfaces supporting integrations across 25+ product offerings, establishing component and API patterns that scaled consistently across a large and diverse product surface.',
      'Collaborated cross-functionally with product, design, and backend teams to define frontend architecture and deliver AI-driven features in a fast-moving, enterprise software environment.',
    ],
    stack: ['React', 'TypeScript', 'Vite', 'Node.js', 'REST APIs', 'Tailwind CSS', 'shadcn/ui', 'TanStack Table & Query', 'Claude Code'],
  },
  {
    company: 'RoadSync',
    role: 'Senior Front-End Engineer',
    location: 'Atlanta, GA',
    start: 'Oct 2024',
    end: 'May 2026',
    highlights: [
      'Built testing infrastructure and led unit test coverage initiatives using React Testing Library and Enzyme, establishing team-wide patterns and improving code quality and CI/CD confidence.',
      'Assisted in architecting and owned the build of a mobile-first React application with live data feeds.',
      'Contributed to the architecture and ongoing development of two React component design systems.',
      'Used AI-assisted development tools as a regular part of engineering work, championing adoption across the team while validating their output and holding code quality standards.',
      'Provided development support and feature contributions for Flutter mobile applications.',
      'Developed a proof of concept for a native app using React Native.',
    ],
    stack: ['React', 'TypeScript', 'Go', 'Flutter', 'Vite', 'Node.js', 'Vitest', 'Playwright', 'Azure DevOps', 'Claude Code'],
  },
  {
    company: 'Converge Technology Solutions',
    role: 'Senior Front-End Engineer',
    location: 'Atlanta, GA',
    start: 'Jun 2024',
    end: 'Oct 2024',
    highlights: [
      'Built performant UIs and Remix/Express.js backend services for identity and access management systems serving financial institutions.',
      'Enhanced the existing React component design system and maintained comprehensive Vitest/Playwright test coverage across all contributions.',
      'Translated client business requirements into detailed technical implementation plans, bridging product and engineering.',
    ],
    stack: ['React', 'TypeScript', 'Remix', 'Tailwind CSS', 'Vite', 'Express.js', 'Node.js', 'Vitest', 'Playwright', 'Azure DevOps'],
  },
  {
    company: 'LifeLoop',
    role: 'Senior Software Engineer',
    location: 'Greenwood Village, CO',
    start: 'Mar 2023',
    end: 'Apr 2024',
    highlights: [
      'Contributed to full-stack feature development (React, React Native, Node.js, Express, MongoDB) and optimized the React Native mobile app for performance and branding.',
      'Enhanced the React component design system and expanded Cypress test coverage, improving QA reliability and developer experience.',
      'Collaborated with UX and marketing on a full application rebrand and supported REST-based third-party integration design.',
      'Analyzed and resolved software defects reported by support and customers, maintaining high product quality and customer satisfaction.',
      'Guided other developers on when to compose existing design system components versus extend the system, improving adoption and consistency.',
    ],
    stack: ['React', 'TypeScript', 'Redux', 'Webpack', 'Node.js', 'MongoDB', 'Jest', 'Cypress', 'React Native', 'Express', 'Azure Cloud Services'],
  },
  {
    company: 'NCR Corporation',
    role: 'Senior UI Software Engineer',
    location: 'Atlanta, GA',
    start: 'Jan 2023',
    end: 'Mar 2023',
    highlights: [
      'Assisted in architecting next-gen React-based digital banking web applications and designed a client-side async API service layer aligned with new back-end architecture.',
      'Facilitated product stakeholder alignment, documented existing functionality, and supported platform migration planning.',
      'Integrated and enhanced an MUI-based design system for digital banking web applications, improving component consistency and accessibility.',
    ],
    stack: ['React', 'TypeScript', 'Material UI', 'Front-End Architecture', 'Software Documentation'],
  },
  {
    company: 'OfficeSpace Software',
    role: 'Lead Software Engineer',
    location: 'Atlanta, GA',
    start: 'May 2021',
    end: 'Oct 2022',
    highlights: [
      'Architected the next generation of the core OfficeSpace web application and React component design system; led a team of three front-end engineers.',
      'Represented development in product planning, conducted code quality assessments, and authored company-wide style guides and onboarding documentation.',
      'Managed a suite of Node packages for the React UI component and utility library powering the core application.',
      'Architected WCAG-compliant, i18n-ready internationalization and partnered closely with UX to shape component behavior, responsive states, and interaction detail across an accessible design system.',
      'Developed a D3.js proof of concept for a complex, responsive floor plan visualization.',
    ],
    stack: ['React', 'TypeScript', 'Redux', 'Webpack', 'Vite', 'D3.js', 'Node.js', 'i18n', 'WAI-ARIA', 'WCAG', 'Styled-Components', 'Material UI', 'Styleguidist', 'Jest', 'React Testing Library'],
  },
  {
    company: 'Honeywell',
    role: 'Advanced Cloud Front-End Engineer',
    location: 'Atlanta, GA',
    start: 'Oct 2017',
    end: 'May 2021',
    highlights: [
      'Architected and managed a federated micro-frontend ecosystem using Webpack Module Federation across multiple React applications.',
      'Designed and maintained the component APIs and Node package architecture behind a shared React UI library consumed across enterprise and industrial applications.',
      'Built visual-regression testing infrastructure and the i18n and theming systems that let shared components stay consistent while supporting differentiated art direction across multi-brand applications.',
      'Ensured WAI-ARIA and WCAG compliance across all UI components, and built the Storybook/Styleguidist documentation sites teams used to discover, understand, and adopt them.',
      'Managed offshore development output, mentored junior developers, and migrated Angular 2 applications to React and MobX.',
      'Developed a proof of concept for a native app using React Native.',
    ],
    stack: ['React', 'TypeScript', 'Redux', 'Webpack Module Federation', 'MobX', 'Highcharts', 'Node.js', 'i18n', 'WAI-ARIA', 'WCAG', 'Styled-Components', 'Semantic UI', 'Storybook', 'Styleguidist', 'Jest', 'React Testing Library', 'Visual Regression Testing', 'CI/CD'],
  },
  {
    company: 'SolTech Inc',
    role: 'Front-End Developer',
    location: 'Atlanta, GA',
    start: 'Sep 2015',
    end: 'Sep 2017',
    highlights: [
      'Built front-end interfaces for React, Angular, and jQuery enterprise applications with Webpack/Gulp build systems.',
      'Wrote unit tests (Jasmine/Karma), led performance optimizations, and integrated async API data across cross-functional teams.',
    ],
    stack: ['Angular 1 & 2', 'React', 'TypeScript', 'Node.js', 'Express', 'Gulp', 'Webpack', 'jQuery', 'HTML5', 'CSS3', 'SASS', 'Karma', 'ES6'],
  },
  {
    company: 'RentPath, LLC',
    role: 'Front-End Developer',
    location: 'Atlanta, GA',
    start: 'Mar 2014',
    end: 'Aug 2015',
    highlights: [
      'Built front-end for multiple consumer web properties and a proprietary CMS platform, co-authoring shared SASS/HTML style guides adopted across every property.',
      'Implemented A/B and multivariate testing via Optimizely and integrated async data with backend teams.',
    ],
    stack: ['JavaScript', 'jQuery', 'Ruby on Rails', 'HTML5', 'CSS3', 'SASS', 'CoffeeScript', 'Git', 'Photoshop', 'Illustrator'],
  },
]

export const earlierExperience: EarlierExperience[] = [
  {
    company: 'EverSpark Interactive',
    role: 'In-House Developer',
    location: 'Atlanta, GA',
    start: 'Jun 2013',
    end: 'Jan 2014',
    description:
      'Front-end development, WordPress theme and plugin development, HTML/CSS/JavaScript, and CMS implementation in an agency environment.',
  },
]

export const education: Education[] = [
  {
    school: 'New England Institute of Art',
    degree: 'BA, Web Design and Interactive Media',
    end: 'May 2013',
    notes: 'GPA 3.8',
  },
  {
    school: 'Ithaca College',
    degree: 'BS, Integrated Marketing Communications',
    end: 'May 2010',
    notes: 'Magna Cum Laude · GPA 3.7',
  },
]

export const skills: Record<string, string[]> = {
  'Front-End Core': ['React', 'TypeScript', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'SASS', 'Redux', 'TanStack Query & Table'],
  'Frameworks & Tooling': ['Remix', 'Next.js', 'Vite', 'Webpack', 'Tailwind CSS'],
  'Design Systems': ['Storybook', 'Styleguidist', 'Design Tokens & Theming', 'Material UI', 'Styled-Components', 'Semantic UI', 'shadcn/ui'],
  Accessibility: ['WAI-ARIA', 'WCAG compliance'],
  Testing: ['Jest', 'Vitest', 'Cypress', 'Playwright', 'React Testing Library', 'Enzyme', 'Visual Regression Testing'],
  Mobile: ['React Native', 'Flutter'],
  'Back-End': ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'REST APIs'],
  'DevOps & Cloud': ['Azure DevOps', 'Azure Cloud Services', 'Docker', 'CI/CD Pipelines'],
  'AI & Emerging': ['LangChain', 'Claude Code', 'OpenAI', 'Prompt Engineering', 'AI-assisted development'],
  Additional: ['D3.js', 'Highcharts', 'i18n / Internationalization', 'Webpack Module Federation'],
}

/** Optional: put a PDF in /public and set its path here to show a download button. */
export const resumePdf = ''
