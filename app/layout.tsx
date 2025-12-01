import type { Metadata } from 'next'
import { Space_Grotesk, Source_Serif_4 } from 'next/font/google'
import './globals.css'
import MobileNav from './components/MobileNav'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-source-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'De Senior Reservisten - Het Experiment',
    template: '%s | De Senior Reservisten',
  },
  description: '100.000 open vacatures, 2 mannen op leeftijd, 1 intentie, 0 pretenties. Live documentatie van twee 55+ professionals in het wervingsproces van Defensie.',
  keywords: ['Defensie', 'werving', 'leeftijdsdiscriminatie', '55 plus', 'reservisten', 'personeelstekort', 'experiment'],
  authors: [{ name: 'De Senior Reservisten' }],
  openGraph: {
    title: 'De Senior Reservisten - Het Experiment',
    description: '100.000 open vacatures, 2 mannen op leeftijd, 1 intentie, 0 pretenties.',
    type: 'website',
    locale: 'nl_NL',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl" className={`${spaceGrotesk.variable} ${sourceSerif.variable}`}>
      <body className="font-serif bg-primary-light text-neutral-900">
        <header className="bg-primary text-white py-3 md:py-4 px-4 md:px-6 relative">
          <nav className="max-w-6xl mx-auto flex justify-between items-center">
            <a href="/" className="font-sans text-base md:text-xl font-bold hover:text-accent transition">
              DE SENIOR RESERVISTEN
            </a>
            <MobileNav />
          </nav>
        </header>
        <main className="bg-neutral-100">{children}</main>
        <footer className="bg-primary-light text-white py-8">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <p className="font-sans text-sm">DE SENIOR RESERVISTEN</p>
            <p className="text-neutral-300 text-xs mt-4">© 2025</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
