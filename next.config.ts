import path from 'node:path'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Pin the workspace root so a stray lockfile in a parent directory
  // doesn't confuse Turbopack.
  turbopack: { root: path.join(__dirname) },

  // The static Storybook build lives in public/storybook. Storybook uses
  // relative asset paths, so send /storybook to its index.html directly.
  async redirects() {
    return [
      { source: '/storybook', destination: '/storybook/index.html', permanent: false },
    ]
  },
}

export default nextConfig
