/**
 * Hex versions of the site's OKLCH tokens in app/global.css. Storybook's own
 * UI (sidebar, toolbar, docs pages) can't read CSS variables, so the values
 * are mirrored here. Update both places if the palette changes.
 */
export const palette = {
  light: {
    bg: '#fbfcfd',
    fg: '#0f0f14',
    card: '#ffffff',
    muted: '#f3f3f6',
    mutedFg: '#62626c',
    border: '#e2e2e7',
    brand: '#5957ed',
    brand2: '#00a1c4',
  },
  dark: {
    bg: '#08080b',
    fg: '#f5f5f7',
    card: '#0e0e12',
    muted: '#18181c',
    mutedFg: '#9d9da7',
    border: '#1e1e22',
    brand: '#8d98ff',
    brand2: '#47d2e8',
  },
} as const

export type Mode = keyof typeof palette
