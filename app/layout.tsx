import './global.css'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

import { cn } from '@/lib/utils'
import { baseUrl, siteConfig } from '@/content/site'
import { TooltipProvider } from '@/components/ui/tooltip'
import { SiteFooter } from '@/components/site/site-footer'
import { SiteHeader } from '@/components/site/site-header'
import { ThemeProvider } from '@/components/site/theme-provider'

const geistSans = Geist({ subsets: ['latin'], variable: '--font-sans' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${siteConfig.name} — ${siteConfig.role}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: baseUrl,
    siteName: siteConfig.name,
    locale: 'en_US',
    type: 'website',
    images: [{ url: `/og?title=${encodeURIComponent(siteConfig.name)}` }],
  },
  alternates: {
    types: { 'application/rss+xml': `${baseUrl}/rss` },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(geistSans.variable, geistMono.variable)}
    >
      <body className="relative isolate flex min-h-svh flex-col antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[640px] overflow-hidden print:hidden"
            >
              <div className="backdrop-glow absolute inset-0" />
              <div className="backdrop-grid absolute inset-0" />
            </div>
            <SiteHeader />
            <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-14 sm:py-20 print:py-0">
              {children}
            </main>
            <SiteFooter />
          </TooltipProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
