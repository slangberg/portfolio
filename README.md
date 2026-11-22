# Portfolio · Blog · Resume

A personal site built on Next.js 16 (App Router). It started from Vercel's
[blog starter](https://github.com/vercel/examples/tree/main/solutions/blog), and
every UI element comes from a **colocated [shadcn/ui](https://ui.shadcn.com)
library** that lives in this repo.

- **Home**: intro, featured projects, recent posts
- **/projects**: project cards
- **/blog**: MDX posts with syntax highlighting, an RSS feed and generated OG images
- **/resume**: experience, skills and education, with print/PDF-friendly styles
- Light, dark and system theme, plus a responsive mobile menu
- Sitemap, robots.txt, JSON-LD, Vercel Analytics and Speed Insights

## Make it yours

All of the content lives in `content/`:

| File                  | What it controls                                                 |
| --------------------- | ---------------------------------------------------------------- |
| `content/site.ts`     | Name, role, bio, email, social links, nav, avatar                |
| `content/resume.ts`   | Summary, experience, education, skills, optional PDF             |
| `content/projects.ts` | Projects (`featured: true` puts a project on the home page)      |
| `content/posts/*.mdx` | Blog posts (frontmatter: `title`, `publishedAt`, `summary`, `tags`) |

### Pinned GitHub projects

`/projects` and the home page list the repos pinned on the GitHub profile set
in `githubUsername` (`content/site.ts`), followed by any extra entries in
`content/projects.ts`. Repos show their description, language, stars and forks,
plus a **Live site** button when the repo has a homepage URL set.

GitHub only exposes pinned repos through its GraphQL API, which needs a token:

- **With `GITHUB_TOKEN` set** (for example as a Vercel environment variable),
  pins are fetched at build time and refreshed once a day. A fine-grained token
  with **no permissions** is enough, because the repos are public.
- **Without it**, the site uses the snapshot in `content/pinned-repos.json`.
  Refresh the snapshot with `npm run sync:pinned` (uses `gh auth token` if
  `GITHUB_TOKEN` isn't set) and commit it.

Put images such as an avatar or a resume PDF in `public/`, then point to them
from the config.

Inside MDX you can use `<Callout>`, `<Badge>`, `<Button>`, `<Image>` and
`<Table data={{ headers, rows }} />`.

## Project structure

```
app/                 routes (pages, og, rss, sitemap, robots)
components/ui/       shadcn/ui components (owned source, edit freely)
components/site/     site components composed from components/ui
content/             your data and posts
lib/                 utils (cn) and the post loader
components.json      shadcn config (style: radix-nova, base color: neutral)
```

### Adding shadcn components

The library is colocated, so components are copied into `components/ui` and
you can edit them like any other source file:

```bash
npx shadcn@latest add accordion tabs
```

Theme tokens (colors, radius, fonts) live in `app/global.css`. To restyle the
whole site, edit the `:root` and `.dark` variables there or paste in a theme
from ui.shadcn.com/themes.

## Storybook (UI kit)

Every component in `components/ui` has a colocated `*.stories.tsx` file. The
Foundations stories (colors, type, radius) and the Introduction page live in
`components/stories/`.

```bash
npm run storybook        # dev server on http://localhost:6006
npm run build-storybook  # static build into public/storybook
```

`npm run build`, which is what Vercel runs, builds Storybook into
`public/storybook` first and then builds Next.js. The UI kit is served at
**`/storybook`** on the deployed site and linked from the footer. The build
output is gitignored.

## Develop

```bash
npm install
npm run dev
```

## Deploy on Vercel

1. Push this folder to a GitHub, GitLab or Bitbucket repo.
2. Import it at vercel.com/new. Vercel detects Next.js automatically, so no
   other configuration is needed.
3. Optional: set `NEXT_PUBLIC_SITE_URL` (for example `https://yourname.dev`) if
   you use a custom domain. Otherwise the site falls back to Vercel's
   `VERCEL_PROJECT_PRODUCTION_URL` when it builds canonical URLs, the sitemap
   and RSS.

You can also deploy from the CLI with `npx vercel`.
