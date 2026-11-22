import { addons } from 'storybook/manager-api'
import { create } from 'storybook/theming/create'

const prefersDark =
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-color-scheme: dark)').matches

// Brand the sidebar as the UI kit. The site header bar (with the link back to
// the portfolio) is injected by `managerHead` in main.ts.
addons.setConfig({
  theme: create({
    base: prefersDark ? 'dark' : 'light',
    brandTitle: 'UI Kit',
    brandUrl: './index.html',
    brandTarget: '_self',
    fontBase: '"Geist", ui-sans-serif, system-ui, sans-serif',
    fontCode: '"Geist Mono", ui-monospace, monospace',
    appBorderRadius: 10,
    inputBorderRadius: 8,
  }),
})
