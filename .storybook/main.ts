import type { StorybookConfig } from '@storybook/nextjs-vite'
import { siteConfig } from '../content/site.ts'
import { palette } from './palette.ts'

const HEADER_HEIGHT = 56

/**
 * A header bar above the Storybook UI that mirrors the portfolio's header and
 * links back to the site. It lives in the manager's <head> because the
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
  const avatar = siteConfig.avatar
    ? `<img class="sb-site-header__avatar" src="${siteConfig.avatar}" alt="" onerror="this.remove()" />`
    : ''
  const { light: l, dark: d } = palette

  return /* html */ `
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Geist+Mono&display=swap" rel="stylesheet" />
<style>
  :root {
    --sb-site-bg: ${l.bg};
    --sb-site-fg: ${l.fg};
    --sb-site-muted: ${l.mutedFg};
    --sb-site-pill: ${l.muted};
    --sb-site-active: ${l.card};
    --sb-site-border: ${l.border};
    --sb-site-brand: ${l.brand};
    --sb-site-brand-2: ${l.brand2};
  }
  @media (prefers-color-scheme: dark) {
    :root {
      --sb-site-bg: ${d.bg};
      --sb-site-fg: ${d.fg};
      --sb-site-muted: ${d.mutedFg};
      --sb-site-pill: ${d.muted};
      --sb-site-active: ${d.card};
      --sb-site-border: ${d.border};
      --sb-site-brand: ${d.brand};
      --sb-site-brand-2: ${d.brand2};
    }
  }
  html, body { background: var(--sb-site-bg); }
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
    padding: 0 12px 0 16px;
    background:
      radial-gradient(40% 140% at 10% 0%, color-mix(in srgb, var(--sb-site-brand) 12%, transparent), transparent 70%),
      var(--sb-site-bg);
    color: var(--sb-site-fg);
    border-bottom: 1px solid var(--sb-site-border);
    font: 14px/1.4 "Geist", ui-sans-serif, system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  /* Accent hairline under the bar. */
  .sb-site-header::after {
    content: "";
    position: absolute;
    inset: auto 0 -1px 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--sb-site-brand) 30%, var(--sb-site-brand-2) 70%, transparent);
    opacity: 0.5;
  }
  .sb-site-header__brand {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    min-width: 0;
    color: inherit;
    text-decoration: none;
    font-weight: 600;
    letter-spacing: -0.02em;
    white-space: nowrap;
  }
  .sb-site-header__avatar {
    width: 30px;
    height: 30px;
    border-radius: 999px;
    object-fit: cover;
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--sb-site-brand) 35%, transparent);
    transition: box-shadow 150ms;
  }
  .sb-site-header__brand:hover .sb-site-header__avatar {
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--sb-site-brand) 70%, transparent);
  }
  .sb-site-header__sep { color: var(--sb-site-border); font-weight: 400; }
  .sb-site-header__kit {
    background: linear-gradient(100deg, var(--sb-site-brand), var(--sb-site-brand-2));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  .sb-site-header__right { display: flex; align-items: center; gap: 8px; }
  .sb-site-header__nav {
    display: flex;
    align-items: center;
    gap: 2px;
    padding: 4px;
    border-radius: 12px;
    background: var(--sb-site-pill);
  }
  .sb-site-header__link {
    display: inline-flex;
    align-items: center;
    height: 28px;
    padding: 0 12px;
    border-radius: 8px;
    color: var(--sb-site-muted);
    text-decoration: none;
    font-weight: 500;
    white-space: nowrap;
    transition: background-color 120ms, color 120ms;
  }
  .sb-site-header__link:hover { color: var(--sb-site-fg); background: var(--sb-site-active); }
  .sb-site-header__back {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    height: 34px;
    padding: 0 12px 0 10px;
    border-radius: 10px;
    background: var(--sb-site-fg);
    color: var(--sb-site-bg);
    text-decoration: none;
    font-weight: 500;
    white-space: nowrap;
    transition: opacity 120ms;
  }
  .sb-site-header__back:hover { opacity: 0.85; }
  .sb-site-header__back svg { width: 16px; height: 16px; }
  .sb-site-header a:focus-visible {
    outline: 2px solid var(--sb-site-brand);
    outline-offset: 2px;
  }
  /* On small screens keep just the brand and the back link. */
  @media (max-width: 720px) {
    .sb-site-header__nav, .sb-site-header__sep, .sb-site-header__kit { display: none; }
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
        ${JSON.stringify(avatar)} +
        '<span>${name}</span>' +
        '<span class="sb-site-header__sep" aria-hidden="true">/</span>' +
        '<span class="sb-site-header__kit">UI Kit</span>' +
      '</a>' +
      '<div class="sb-site-header__right">' +
        '<nav class="sb-site-header__nav" aria-label="Portfolio">' + ${JSON.stringify(nav)} + '</nav>' +
        '<a class="sb-site-header__back" href="/" target="_top">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>' +
          'Back to portfolio' +
        '</a>' +
      '</div>';
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
