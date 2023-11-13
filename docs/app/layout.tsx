import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import packageJson from '../../package.json'

const inter = Inter({ subsets: ['latin'] })

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: `${packageJson.name} - one hook - endless options to choose from`,
  description: packageJson.description,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
