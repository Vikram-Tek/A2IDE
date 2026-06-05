import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/layout/Providers'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'A2IDE — Cloud IDE Platform',
  description: 'Multi-tenant cloud IDE powered by ADK 2.0 · A2A · Anthropic Claude',
  icons: { icon: '/favicon.svg' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans bg-ide-bg text-ide-text antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
