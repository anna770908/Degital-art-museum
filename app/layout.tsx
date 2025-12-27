import type { Metadata } from 'next'
import { Crimson_Text } from 'next/font/google'
import './globals.css'

const crimson = Crimson_Text({ subsets: ['latin'], weight: ['400', '600'] })

export const metadata: Metadata = {
  title: 'My Museum Journal',
  description: 'A quiet journal for your museum visits',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={crimson.className}>{children}</body>
    </html>
  )
}