import type { StorybookConfig } from '@storybook/nextjs-vite'

const config: StorybookConfig = {
  framework: '@storybook/nextjs-vite',
  stories: ['../components/**/*.mdx', '../components/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-themes',
    '@storybook/addon-a11y',
  ],
  core: { disableTelemetry: true },
  viteFinal: async (viteConfig) => {
    // Output goes into public/storybook, so Vite must not copy public/ itself.
    viteConfig.publicDir = false
    viteConfig.build ??= {}
    // Storybook's manager/preview bundles are large by design.
    viteConfig.build.chunkSizeWarningLimit = 2000
    viteConfig.build.rollupOptions ??= {}
    viteConfig.build.rollupOptions.onwarn = (warning, warn) => {
      // shadcn components start with "use client", which is meaningful to
      // Next.js but harmless noise for Vite. Hide those warnings.
      if (warning.code === 'MODULE_LEVEL_DIRECTIVE') return
      if (warning.code === 'SOURCEMAP_ERROR') return
      warn(warning)
    }
    return viteConfig
  },
}

export default config
