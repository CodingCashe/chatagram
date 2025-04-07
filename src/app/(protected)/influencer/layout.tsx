import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Yazil | influencers',
  description: 'Grow your business',
  generator: 'Yazil',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
