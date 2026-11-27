import { addons } from 'storybook/manager-api'

import { prefersDark, storybookTheme } from './theme'

// Theme the Storybook UI with the site's palette, following the OS setting
// like the site does. The site header bar (with the link back to the
// portfolio) is injected by `managerHead` in main.ts.
addons.setConfig({
  theme: storybookTheme(prefersDark() ? 'dark' : 'light'),
})
