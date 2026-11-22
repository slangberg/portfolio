#!/usr/bin/env node
/**
 * Refresh content/pinned-repos.json from your GitHub profile's pinned repos.
 * This snapshot is what the site shows when GITHUB_TOKEN isn't set.
 *
 * Uses GITHUB_TOKEN if set, otherwise falls back to `gh auth token`.
 *   npm run sync:pinned
 */
import { execSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')

const siteSource = readFileSync(path.join(root, 'content/site.ts'), 'utf8')
const login = siteSource.match(/githubUsername:\s*['"]([^'"]+)['"]/)?.[1]
if (!login) {
  console.error('Set githubUsername in content/site.ts first.')
  process.exit(1)
}

let token = process.env.GITHUB_TOKEN
if (!token) {
  try {
    token = execSync('gh auth token', { encoding: 'utf8' }).trim()
  } catch {
    console.error('Set GITHUB_TOKEN or sign in with `gh auth login`.')
    process.exit(1)
  }
}

const query = `query ($login: String!) {
  user(login: $login) {
    pinnedItems(first: 6, types: [REPOSITORY]) {
      nodes {
        ... on Repository {
          name description url homepageUrl stargazerCount forkCount pushedAt
          primaryLanguage { name color }
          repositoryTopics(first: 8) { nodes { topic { name } } }
        }
      }
    }
  }
}`

const res = await fetch('https://api.github.com/graphql', {
  method: 'POST',
  headers: {
    Authorization: `bearer ${token}`,
    'Content-Type': 'application/json',
    'User-Agent': 'portfolio-site',
  },
  body: JSON.stringify({ query, variables: { login } }),
})
const json = await res.json()
if (!res.ok || json.errors) {
  console.error('GitHub API error:', json.errors ?? res.status)
  process.exit(1)
}

const repos = json.data.user.pinnedItems.nodes.map((n) => ({
  name: n.name,
  description: n.description,
  url: n.url,
  homepageUrl: n.homepageUrl || null,
  stars: n.stargazerCount,
  forks: n.forkCount,
  language: n.primaryLanguage,
  topics: n.repositoryTopics.nodes.map((t) => t.topic.name),
  pushedAt: n.pushedAt,
}))

writeFileSync(
  path.join(root, 'content/pinned-repos.json'),
  JSON.stringify(repos, null, 2) + '\n'
)
console.log(`Saved ${repos.length} pinned repos for @${login}:`)
for (const r of repos) console.log(`  - ${r.name}`)
