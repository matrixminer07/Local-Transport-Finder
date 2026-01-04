import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'
import AuthProvider from '@/components/providers/AuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Local Transport Finder - Know Your Routes',
  description: 'Community-driven navigation for local transport in small-town India. Find shared autos, buses, and e-rickshaw routes with verified fares.',
  keywords: 'local transport, shared auto, bus routes, India, navigation, community',
  authors: [{ name: 'Local Transport Finder Team' }],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  themeColor: '#2563EB',
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster position="top-center" richColors />
        </AuthProvider>
      </body>
    </html>
  )
}
