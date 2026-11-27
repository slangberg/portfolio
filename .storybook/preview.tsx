import type { Preview } from '@storybook/nextjs-vite'
import { withThemeByClassName } from '@storybook/addon-themes'
import { Geist, Geist_Mono } from 'next/font/google'

import { TooltipProvider } from '../components/ui/tooltip'
import { prefersDark, storybookTheme } from './theme'
import '../app/global.css'

const geistSans = Geist({ subsets: ['latin'], variable: '--font-sans' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono' })

const systemMode = prefersDark() ? 'dark' : 'light'

// Docs pages without stories never run the theme decorator, so start the
// preview in the system theme; the toolbar switcher takes over from there.
if (typeof document !== 'undefined') {
  document.documentElement.classList.toggle('dark', systemMode === 'dark')
  // Font variables on <html> so docs-page content (not just stories) uses Geist.
  document.documentElement.classList.add(geistSans.variable, geistMono.variable)
}

const preview: Preview = {
  parameters: {
    layout: 'centered',
    controls: { expanded: true, sort: 'requiredFirst' },
    backgrounds: { disable: true },
    docs: { theme: storybookTheme(systemMode) },
    options: {
      storySort: {
        order: ['Introduction', 'Foundations', 'Components', 'Patterns'],
      },
    },
  },
  decorators: [
    (Story, context) => (
      <div className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
        {/* The site's dot grid and glow, behind stories on the canvas only. */}
        {context.viewMode === 'story' && (
          <div
            aria-hidden
            className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[520px] overflow-hidden"
          >
            <div className="backdrop-glow absolute inset-0" />
            <div className="backdrop-grid absolute inset-0" />
          </div>
        )}
        <TooltipProvider>
          <Story />
        </TooltipProvider>
      </div>
    ),
    withThemeByClassName({
      themes: { light: '', dark: 'dark' },
      defaultTheme: systemMode,
    }),
  ],
  tags: ['autodocs'],
}

export default preview
