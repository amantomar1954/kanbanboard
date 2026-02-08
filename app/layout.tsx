import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import './globals.css'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'kanbanboard',
  description: 'kanbanboard',
  generator: 'kanbanboard',
}

import { Toaster } from 'sonner'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased text-stone-900 bg-stone-50">
        <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-stone-100 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center">
            <h1 className="text-xl font-bold tracking-tight text-stone-900">
              kanbanboard
            </h1>
          </div>
        </header>
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  )
}
