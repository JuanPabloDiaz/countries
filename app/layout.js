import './globals.css'
import { Inter } from 'next/font/google'
import { Navigation, Footer } from '@/components'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata = {
  title: 'Country Hub | Explore Countries Around the Globe',
  description: 'Discover information about countries around the world, their flags, capitals, and more.',
  keywords: 'countries, flags, world, capitals, geography, nations',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Navigation />
        <div className="flex-grow">{children}</div>
        <Footer />
      </body>
    </html>
  )
}
