import type { StorybookConfig } from '@storybook/nextjs-vite'
import { siteConfig } from '../content/site.ts'

const HEADER_HEIGHT = 48

/**
 * A slim header bar above the Storybook UI that mirrors the portfolio's header
 * and links back to the site. It lives in the manager's <head> because the
 * manager is a prebuilt app with no slot of our own above it.
 */
function siteHeader() {
  const escape = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  const name = escape(siteConfig.name)
  const nav = siteConfig.nav
    .filter(({ href }) => href !== '/') // "Back to portfolio" covers home
    .map(
      ({ href, label }) =>
        `<a class="sb-site-header__link" href="${href}" target="_top">${escape(label)}</a>`
    )
    .join('')

  return /* html */ `
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Geist+Mono&display=swap" rel="stylesheet" />
<style>
  :root {
    --sb-site-bg: #ffffff;
    --sb-site-fg: #171717;
    --sb-site-muted: #737373;
    --sb-site-hover: #f5f5f5;
    --sb-site-border: #e5e5e5;
  }
  @media (prefers-color-scheme: dark) {
    :root {
      --sb-site-bg: #0a0a0a;
      --sb-site-fg: #fafafa;
      --sb-site-muted: #a3a3a3;
      --sb-site-hover: #262626;
      --sb-site-border: rgb(255 255 255 / 0.1);
    }
  }
  .sb-site-header {
    position: fixed;
    inset: 0 0 auto 0;
    z-index: 1000;
    height: ${HEADER_HEIGHT}px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 0 16px;
    background: var(--sb-site-bg);
    color: var(--sb-site-fg);
    border-bottom: 1px solid var(--sb-site-border);
    font: 14px/1.4 "Geist", ui-sans-serif, system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  .sb-site-header__brand {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
    color: inherit;
    text-decoration: none;
    font-weight: 600;
    letter-spacing: -0.01em;
    white-space: nowrap;
  }
  .sb-site-header__brand:hover .sb-site-header__name { color: var(--sb-site-muted); }
  .sb-site-header__sep { color: var(--sb-site-border); font-weight: 400; }
  .sb-site-header__kit { color: var(--sb-site-muted); font-weight: 500; }
  .sb-site-header__nav { display: flex; align-items: center; gap: 4px; }
  .sb-site-header__link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    height: 32px;
    padding: 0 10px;
    border-radius: 8px;
    color: var(--sb-site-muted);
    text-decoration: none;
    font-weight: 500;
    white-space: nowrap;
    transition: background-color 120ms, color 120ms;
  }
  .sb-site-header__link:hover { background: var(--sb-site-hover); color: var(--sb-site-fg); }
  .sb-site-header__link:focus-visible,
  .sb-site-header__brand:focus-visible {
    outline: 2px solid var(--sb-site-muted);
    outline-offset: 2px;
    border-radius: 8px;
  }
  .sb-site-header__back { color: var(--sb-site-fg); }
  .sb-site-header__back svg { width: 16px; height: 16px; }
  /* On small screens keep just the brand and the back link. */
  @media (max-width: 640px) {
    .sb-site-header__nav .sb-site-header__link:not(.sb-site-header__back) { display: none; }
    .sb-site-header__sep, .sb-site-header__kit { display: none; }
  }
  /* Push the Storybook app below the header. */
  #root {
    position: fixed !important;
    inset: ${HEADER_HEIGHT}px 0 0 0 !important;
    height: auto !important;
  }
</style>
<script>
  document.addEventListener('DOMContentLoaded', function () {
    if (document.querySelector('.sb-site-header')) return;
    var header = document.createElement('header');
    header.className = 'sb-site-header';
    header.innerHTML =
      '<a class="sb-site-header__brand" href="/" target="_top" aria-label="${name} — portfolio home">' +
        '<span class="sb-site-header__name">${name}</span>' +
        '<span class="sb-site-header__sep" aria-hidden="true">/</span>' +
        '<span class="sb-site-header__kit">UI Kit</span>' +
      '</a>' +
      '<nav class="sb-site-header__nav" aria-label="Portfolio">' +
        ${JSON.stringify(nav)} +
        '<a class="sb-site-header__link sb-site-header__back" href="/" target="_top">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>' +
          'Back to portfolio' +
        '</a>' +
      '</nav>';
    document.body.prepend(header);
  });
</script>`
}

const config: StorybookConfig = {
  framework: '@storybook/nextjs-vite',
  stories: ['../components/**/*.mdx', '../components/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-themes',
    '@storybook/addon-a11y',
  ],
  core: { disableTelemetry: true },
  managerHead: (head) => `${head}\n${siteHeader()}`,
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
