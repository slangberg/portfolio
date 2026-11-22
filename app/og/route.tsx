import { ImageResponse } from 'next/og'
import { siteConfig } from '@/content/site'

export function GET(request: Request) {
  const url = new URL(request.url)
  const title = url.searchParams.get('title') || siteConfig.name

  return new ImageResponse(
    (
      <div tw="flex flex-col w-full h-full justify-between bg-white p-20">
        <div tw="flex text-2xl text-neutral-500">{siteConfig.name}</div>
        <h1 tw="flex text-7xl font-bold tracking-tight text-neutral-900 leading-tight">
          {title}
        </h1>
        <div tw="flex text-2xl text-neutral-500">{siteConfig.role}</div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
